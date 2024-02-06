import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout title="Home page" description="Home">
      <div className="text-center">
        <Link href="/odds">
          <p className="text-lg text-blue-500 hover:underline">Go to Odds Page</p>
        </Link>
      </div>
    </Layout>
  );
}
