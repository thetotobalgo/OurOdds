import { useEffect, useState } from "react";
import { fetchOddsData } from "../pages/api/fetchOdds"; // Adjust the import path as necessary
import Layout from "@/components/Layout";

export default function Odds() {
    const [oddsData, setOddsData] = useState([]);
    const [region, setRegion] = useState("eu"); // Default region is "eu", can be changed

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOddsData(region);
                const processedData = data.map((match) => {
                    const outcomes = {};

                    match.bookmakers.forEach((bookmaker) => {
                        const h2hMarket = bookmaker.markets.find((market) => market.key === "h2h");
                        if (h2hMarket) {
                            h2hMarket.outcomes.forEach((outcome) => {
                                if (!outcomes[outcome.name] || outcomes[outcome.name].price < outcome.price) {
                                    outcomes[outcome.name] = { bookmaker: bookmaker.title, price: outcome.price };
                                }
                            });
                        }
                    });

                    return { ...match, highestOutcomes: outcomes };
                });

                setOddsData(processedData);
            } catch (error) {
                console.error("Error fetching odds data", error);
                setOddsData([]); // Clear odds data in case of an error
            }
        };

        fetchData();
    }, [region]);

    return (
        <Layout title="odds page" description="Home">
            <div className="flex flex-col items-center justify-center ">
                <div className="mb-4">
                    <button onClick={() => setRegion("eu")} className={`mr-2 ${region === "eu" ? "bg-yellow-500" : ""}`}>EU Region</button>
                    <button onClick={() => setRegion("uk")} className={`mr-2 ${region === "uk" ? "bg-yellow-500" : ""}`}>UK Region</button>
                    <button onClick={() => setRegion("us")} className={`mr-2 ${region === "us" ? "bg-yellow-500" : ""}`}>US Region</button>
                </div>


                {oddsData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {oddsData.map((match) => {
                            const outcomeValues = Object.values(match.highestOutcomes);
                            const calculationResult =
                                outcomeValues.length >= 3
                                    ? ((1 - ((1 / outcomeValues[0].price) + 1 / outcomeValues[1].price + 1 / outcomeValues[2].price)) * 100).toFixed(1)
                                    : 'Not enough data';


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
                                        <p>{calculationResult}%</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Layout>
    );
}
