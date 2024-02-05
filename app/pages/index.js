import { useEffect, useState } from "react";
import { fetchOddsData } from "../pages/api/fetchOdds"; // Adjust the import path as necessary
import Odds from "../pages/odds"; // Adjust the import path as necessary
import Layout from "../components/Layout"; // Adjust the import path as necessary


export default function Home() {
  
  return (
    <Layout title="Home page" description="Home">
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Odds />
    </main>
    </Layout>
  );
}