// import { unstable_noStore as noStore } from "next/cache"
import yahooFinance from "yahoo-finance2"

export async function fetchQuote(ticker: string) {

  try {
    const decodedTicker = decodeURIComponent(ticker);
    
    const response = await yahooFinance.quote(decodedTicker);
    return response;
  }  catch (error) {
    throw new Error("Failed to fetch stock quote.")
  }
}
