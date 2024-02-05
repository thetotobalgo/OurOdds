import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { fetchOddsData } from "../pages/api/fetchOdds";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [oddsData, setOddsData] = useState([]); // This line should already be correct based on your previous code

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOddsData();
      setOddsData(data);
    };

    fetchData();
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      {oddsData.length > 0 ? (
        oddsData.map((match) => (
          <div key={match.id} className="my-4 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold">{match.sport_title}</h2>
            <p>{new Date(match.commence_time).toLocaleString()}</p>
            <p>{match.home_team} vs {match.away_team}</p>
            {match.bookmakers.map((bookmaker) => (
              <div key={bookmaker.key}>
                <h3 className="font-semibold">{bookmaker.title}</h3>
                {bookmaker.markets.map((market) => (
                  <div key={market.key}>
                    {market.outcomes.map((outcome) => (
                      <p key={outcome.name}>{outcome.name}:: {outcome.price}</p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
