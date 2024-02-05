import { useEffect, useState } from "react";
import { fetchOddsData } from "../pages/api/fetchOdds"; // Adjust the import path as necessary

export default function Odds() {
  const [oddsData, setOddsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOddsData();
      const processedData = data.map((match) => {
        const outcomes = {};

        match.bookmakers.forEach((bookmaker) => {
          const h2hMarket = bookmaker.markets.find((market) => market.key === "h2h"); // Find the "h2h" market
          if (h2hMarket) {
            h2hMarket.outcomes.forEach((outcome) => {
              // If this outcome hasn't been added or the current price is higher, update it
              if (!outcomes[outcome.name] || outcomes[outcome.name].price < outcome.price) {
                outcomes[outcome.name] = { bookmaker: bookmaker.title, price: outcome.price };
              }
            });
          }
        });

        // Add the highest outcomes to the match object
        return { ...match, highestOutcomes: outcomes };
      });

      setOddsData(processedData);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {oddsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {oddsData.map((match) => {
            const outcomeValues = Object.values(match.highestOutcomes);
            const calculationResult =
              outcomeValues.length >= 3
                ? (1 - ((1 / outcomeValues[0].price) + 1 / outcomeValues[1].price + 1 / outcomeValues[2].price)) * 100
                : 'Not enough data'; // Adjust based on your data's needs

            // Define CSS classes for highlighting
            const highlightClass = calculationResult > 0 ? 'text-green-500' : 'text-red-500';

            return (
              <div key={match.id} className="p-4 shadow-lg rounded-lg bg-white flex">
                <div className="flex-grow">
                  <h2 className="text-lg font-bold">{match.sport_title}</h2>
                  <p>{new Date(match.commence_time).toLocaleString()}</p>
                  <p>{match.home_team} vs {match.away_team}</p>
                  <div>
                    {Object.entries(match.highestOutcomes).map(([outcomeName, outcomeInfo]) => (
                      <p key={outcomeName}>
                        {outcomeName}: {outcomeInfo.price} ({outcomeInfo.bookmaker})
                      </p>
                    ))}
                  </div>
                </div>
                <div className={`flex-shrink-0 pl-4 ${highlightClass}`}>
                  <p className="font-semibold">Calculation:</p>
                  <p>{calculationResult}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
