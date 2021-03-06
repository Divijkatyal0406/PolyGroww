import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { MarketCard } from "../components/MarketCard";
import Navbar from "../components/Navbar";
import { useData } from "../contexts/DataContext";
import styles from "../styles/Home.module.css";

export interface MarketProps {
  id: string;
  title: string;
  imageHash: string;
  totalAmount: string;
  totalYes: string;
  totalNo: string;
}

export default function Home() {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const getMarkets = useCallback(async () => {
    var totalMarkets = await polymarket.methods
      .totalMarkets()
      .call({ from: account });

    var dataArray: MarketProps[] = [];
    for (var i = 0; i < totalMarkets; i++) {
      var data = await polymarket.methods.markets(i).call({ from: account });
      dataArray.push({
        id: data.id,
        title: data.market,
        imageHash: data.creatorImageHash,
        totalAmount: data.totalAmount,
        totalYes: data.totalYesAmount,
        totalNo: data.totalNoAmount,
      });
    }
    setMarkets(dataArray);
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarkets();
    });
  }, [loading]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Polymarket</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow max-w-5xl">
        <div className="w-full flex flex-col flex-grow pt-1">
          <div className="relative text-gray-500 focus-within:text-gray-400 w-full">
            <span className="absolute inset-y-0 left-0 flex items-center px-3">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="search"
              name="q"
              className="w-full py-3 px-3 text-base text-gray-700 bg-gray-100 rounded-md pl-10 focus:outline-none"
              placeholder="Search markets..."
              autoComplete="off"
            />
          </div>
          <span className="font-bold my-3 text-lg">Market</span>
          <div className="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-2">
            {markets.map((market) => {
              return (
                <MarketCard
                  id={market.id}
                  key={market.id}
                  title={market.title}
                  totalAmount={market.totalAmount}
                  totalYes={market.totalYes}
                  totalNo={market.totalNo}
                  imageHash={market.imageHash}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}