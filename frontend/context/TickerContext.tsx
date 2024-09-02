// TickerContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { Ticker } from "@/utils/types";
import { getTicker } from "@/utils/httpClient";
import { SignalingManager } from "@/utils/SignalManager";

// Create the context
const TickerContext = createContext<{
  ticker: Ticker | null;
  setTicker: React.Dispatch<React.SetStateAction<Ticker | null>>;
} | null>(null);

// Create the provider component
export const TickerProvider = ({
  children,
  market,
}: {
  children: React.ReactNode;
  market: string;
}) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then(setTicker);
    SignalingManager.getInstance().registerCallback(
      "ticker",
      (data: Partial<Ticker>) => {
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          raise:
            Number(prevTicker?.lastPrice ?? 0) <= Number(data?.lastPrice ?? 0),
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        }));
      },
      `TICKER-${market}`
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);

  return (
    <TickerContext.Provider value={{ ticker, setTicker }}>
      {children}
    </TickerContext.Provider>
  );
};

// Custom hook to use the TickerContext
export const useTicker = () => {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error("useTicker must be used within a TickerProvider");
  }
  return context;
};
