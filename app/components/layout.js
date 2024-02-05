import Head from 'next/head';
import Header from '../components/Header.js';
import Footer from '../components/footer.js';

export default function Layout({
  children,
  title = 'Digital Publishing Platform',
  description = 'A minimal digital publishing platform'
}) {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <div>
        <Header />
          <main>
            {children}
          </main>
        <Footer />
        </div>
    </>
  );
}