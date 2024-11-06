import yahooFinance from "yahoo-finance2";
import { Card, CardContent } from "../../../../components/ui/card";
import ReadMoreText from "../../../../components/ui/read-more-text";
import Link from "next/link";

export default async function CompanySummaryCard({
  ticker,
}: {
  ticker: string;
}) {
  try {
    // Replace %5E with ^ in the ticker symbol
    const correctedTicker = ticker.replace("%5E", "^");

    const data = await yahooFinance.quoteSummary(correctedTicker, {
      modules: ["summaryProfile"],
    });

    if (!data.summaryProfile) {
      console.error("No summaryProfile data found");
      return null;
    }

    const {
      longBusinessSummary,
      sector,
      industryDisp,
      country,
      fullTimeEmployees,
      website,
    } = data.summaryProfile;

    return (
      <Card className="group relative min-h-max overflow-hidden">
        <div className="absolute z-0 h-full w-full bg-gradient-to-t from-neutral-50 via-neutral-200 to-neutral-50 bg-size-200 bg-pos-0 blur-2xl transition-all duration-500 group-hover:bg-pos-100 dark:via-blue-950" />

        <CardContent className=" flex h-full w-full flex-col items-start justify-center gap-6 py-10 text-sm lg:flex-row">
          <div className=" max-w-2xl text-pretty font-medium">
            <ReadMoreText text={longBusinessSummary ?? ""} truncateLength={500} />
          </div>
          {sector && industryDisp && country && fullTimeEmployees && website && (
            <div className=" min-w-fit font-medium text-muted-foreground">
              <div>
                Sector: <span className="text-foreground ">{sector}</span>
              </div>
              <div>
                Industry: <span className="text-foreground ">{industryDisp}</span>
              </div>
              <div>
                Country: <span className="text-foreground ">{country}</span>
              </div>
              <div>
                Employees:{" "}
                <span className="text-foreground ">
                  {fullTimeEmployees?.toLocaleString("en-US")}
                </span>
              </div>
              <div>
                Website:{" "}
                <span className="text-foreground ">
                  {website && (
                    <Link
                      href={website}
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      {website}
                    </Link>
                  )}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("Failed to fetch company summary", error);
    return null;
  }
}

