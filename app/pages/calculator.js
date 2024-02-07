import Layout from '@/components/layout';
import { useState } from 'react';

export default function ArbitrageCalculator() {
    const [odds, setOdds] = useState({ way1: 1.7, way2: 2.5, way3: 2.5 });
    const [amount, setAmount] = useState(100);
    const [bets, setBets] = useState({ way1: 0, way2: 0, way3: 0 });
    const [profit, setProfit] = useState(0);

    const calculateBets = () => {
        // Calculate the total value based on the odds
        const V = 1 / odds.way1 + 1 / odds.way2 + 1 / odds.way3;
        const bet1 = (amount / odds.way1) / V;
        const bet2 = (amount / odds.way2) / V;
        const bet3 = (amount / odds.way3) / V;
        const profit1 = bet1 * odds.way1 - amount;
        const profit2 = bet2 * odds.way2 - amount;
        const profit3 = bet3 * odds.way3 - amount;

        setBets({ way1: bet1, way2: bet2, way3: bet3 });
        setProfit(profit1); // Assumes profit is the same for all outcomes if arbitrage exists
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateBets();
    };

    const handleOddsChange = (e) => {
        setOdds({ ...odds, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleAmountChange = (e) => {
        setAmount(parseFloat(e.target.value));
    };

    const profitability = ((profit / amount) * 100).toFixed(2);

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="way1">1 way odds:</label>
                        <input
                            type="number"
                            id="way1"
                            name="way1"
                            value={odds.way1}
                            onChange={handleOddsChange}
                            className="border-2 rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="way2">2 way odds:</label>
                        <input
                            type="number"
                            id="way2"
                            name="way2"
                            value={odds.way2}
                            onChange={handleOddsChange}
                            className="border-2 rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="way3">3 way odds:</label>
                        <input
                            type="number"
                            id="way3"
                            name="way3"
                            value={odds.way3}
                            onChange={handleOddsChange}
                            className="border-2 rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="amount">Total Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="border-2 rounded p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Calculate
                    </button>
                    <div className="flex justify-between items-center">
                        <div>Bet 1: ${bets.way1.toFixed(2)}</div>
                        <div>Bet 2: ${bets.way2.toFixed(2)}</div>
                        <div>Bet 3: ${bets.way3.toFixed(2)}</div>
                    </div>
                    <div className="text-lg">
                        Profit: ${profit.toFixed(2)} (Profitability: {profitability}%)
                    </div>
                </form>
            </div>
        </Layout>
    );
}
