import { cn } from "@/lib/utils"
import { fetchChartData } from "@/lib/yahoo-finance/fetchChartData"
import type { Interval, Range } from "@/types/yahoo-finance"
import AreaClosedChart from "./AreaClosedChart"
import { fetchQuote } from "@/lib/yahoo-finance/fetchQuote"
import Actions from '../../app/stocks/[ticker]/components/Actions';

interface StockGraphProps {
  ticker: string
  range: Range
  interval: Interval
}

const rangeTextMapping = {
  "1d": "",
  "1w": "Past Week",
  "1m": "Past Month",
  "3m": "Past 3 Months",
  "1y": "Past Year",
}

function calculatePriceChange(qouteClose: number, currentPrice: number) {
  const firstItemPrice = qouteClose || 0
  return ((currentPrice - firstItemPrice) / firstItemPrice) * 100
}

async function convertToINR(amount: number, currency: string) {
  if (currency === "INR") return amount; // No need to convert if already in INR

  // Replace YOUR_API_KEY with the actual API key from ExchangeRate-API
  const response = await fetch(`https://v6.exchangerate-api.com/v6/327f0f5f7de02a18dfde3b60/latest/${currency}`);
  const data = await response.json();

  if (data.result === "success") {
    const conversionRate = data.conversion_rates["INR"]; // Get INR conversion rate
    return amount * conversionRate;
  } else {
    console.error("Error fetching conversion rate");
    return amount; // Return the original amount if conversion fails
  }
}

export default async function StockChart({
  ticker,
  range,
  interval,
}: StockGraphProps) {
  const chartData = await fetchChartData(ticker, range, interval)
  const quoteData = await fetchQuote(ticker)

  const [chart, quote] = await Promise.all([chartData, quoteData])

  const priceChange =
    chart.quotes.length &&
    calculatePriceChange(
      Number(chart.quotes[0].close),
      Number(chart.meta.regularMarketPrice)
    )

  const ChartQuotes = chart.quotes
    .map((quote) => ({
      date: quote.date,
      close: quote.close?.toFixed(2),
    }))
    .filter((quote) => quote.close !== undefined && quote.date !== null)

  // Provide a default currency if quote.currency is undefined
const currency = quote.currency || "USD"; // Replace "USD" with your desired fallback

// Convert regularMarketPrice, postMarketPrice, and preMarketPrice to INR
const regularMarketPriceINR = await convertToINR(Number(quote.regularMarketPrice), currency);
const postMarketPriceINR = quote.postMarketPrice ? await convertToINR(Number(quote.postMarketPrice), currency) : null;
const preMarketPriceINR = quote.preMarketPrice ? await convertToINR(Number(quote.preMarketPrice), currency) : null;
  return (
    <>
      <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        <div>
          <Actions ticker={decodeURIComponent(ticker)} amount={regularMarketPriceINR ? parseFloat(regularMarketPriceINR.toFixed(2)) : 0}/>
        </div>
        <div className="h-[27.5rem] w-full" >
          <div>
            <div className="space-x-1 text-muted-foreground">
              <span className="font-bold text-primary">{quoteData.symbol}</span>
              <span>·</span>
              <span>
                {quoteData.fullExchangeName === "NasdaqGS"
                  ? "NASDAQ"
                  : quoteData.fullExchangeName}
              </span>
              <span>{quoteData.shortName}</span>
            </div>

            <div className="flex flex-row items-end justify-between">
              <div className="space-x-1">
                <span className="text-nowrap">
                  <span className="text-xl font-bold">
                    ₹{regularMarketPriceINR.toFixed(2)}
                  </span>
                  <span className="font-semibold">
                    {quote.regularMarketChange &&
                    quote.regularMarketChangePercent !== undefined ? (
                      quote.regularMarketChange > 0 ? (
                        <span className="text-green dark:text-green">
                          +{quote.regularMarketChange.toFixed(2)} (+
                          {quote.regularMarketChangePercent.toFixed(2)}%)
                        </span>
                      ) : (
                        <span className="text-red dark:text-red">
                          {quote.regularMarketChange.toFixed(2)} (
                          {quote.regularMarketChangePercent.toFixed(2)}%)
                        </span>
                      )
                    ) : null}
                  </span>
                </span>
                <span className="inline space-x-1 font-semibold text-muted-foreground">
                  {quote.hasPrePostMarketData && postMarketPriceINR && (
                    <>
                      <span>·</span>
                      <span>
                        Post-Market: ₹{postMarketPriceINR.toFixed(2)}
                      </span>
                      <span>
                        {quote.postMarketChange &&
                        quote.postMarketChangePercent !== undefined ? (
                          quote.postMarketChange > 0 ? (
                            <span className="text-green dark:text-green">
                              +{quote.postMarketChange.toFixed(2)} (+
                              {quote.postMarketChangePercent.toFixed(2)}%)
                            </span>
                          ) : (
                            <span className="text-red dark:text-red">
                              {quote.postMarketChange.toFixed(2)} (
                              {quote.postMarketChangePercent.toFixed(2)}%)
                            </span>
                          )
                        ) : null}
                      </span>
                    </>
                  )}
                  {quote.hasPrePostMarketData && preMarketPriceINR && (
                    <>
                      <span>·</span>
                      <span>
                        Pre-Market: ₹{preMarketPriceINR.toFixed(2)}
                      </span>
                      <span>
                        {quote.preMarketChange &&
                        quote.preMarketChangePercent !== undefined ? (
                          quote.preMarketChange > 0 ? (
                            <span className="text-green dark:text-green">
                              +{quote.preMarketChange.toFixed(2)} (+
                              {quote.preMarketChangePercent.toFixed(2)}%)
                            </span>
                          ) : (
                            <span className="text-red dark:text-red">
                              {quote.preMarketChange.toFixed(2)} (
                              {quote.preMarketChangePercent.toFixed(2)}%)
                            </span>
                          )
                        ) : null}
                      </span>
                    </>
                  )}
                </span>
              </div>
              <span className="space-x-1 whitespace-nowrap font-semibold">
                {priceChange !== 0 && rangeTextMapping[range] !== "" && (
                  <span
                    className={cn(
                      priceChange > 0
                        ? "text-green dark:text-green"
                        : "text-red dark:text-red-500"
                    )}
                  >
                    {priceChange > 0
                      ? `+${priceChange.toFixed(2)}%`
                      : `${priceChange.toFixed(2)}%`}
                  </span>
                )}
                <span className="text-muted-foreground">
                  {rangeTextMapping[range]}
                </span>
              </span>
            </div>
          </div>
          {chart.quotes.length === 0 && (
            <div className="flex h-full items-center justify-center text-center text-neutral-500">
              No data available
            </div>
          )}
          {chart.quotes.length > 0 && (
            <AreaClosedChart chartQuotes={ChartQuotes} range={range} />
          )}
        </div>
      </div>
    </>
  )
}
