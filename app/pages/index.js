import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout title="Home page" description="Home">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to OurOdds</h1>
        <p className="text-lg text-gray-600 mb-8">An arbitrage calculator app</p>
      </div>
    </Layout>
  );
}
