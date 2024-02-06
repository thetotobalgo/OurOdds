import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/footer'; // Ensure the import path matches the case of your filename

export default function Layout({ children, title = 'Digital Publishing Platform', description = 'A minimal digital publishing platform' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center w-full">
          <div className="w-full">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
