// pages/games.js or any other file in pages directory
import Layout from "../components/layout";

import { useEffect, useState } from 'react';

export default function GamesPage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const res = await fetch('/api/games');
            const data = await res.json();
            setGames(data);
        };

        fetchGames();
    }, []);

    return (
        <Layout title="odds page" description="Home">
            <div>
                <h1>Games with Highest Odds</h1>
                {games.map((game, index) => (
                    <div key={index}>
                        <p>Team1: {game.team1}, Team2: {game.team2}, Highest Odds: {game.odds.join(', ')}, Sources: {game.source.join(', ')}, Margin: {game.margin}%</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
