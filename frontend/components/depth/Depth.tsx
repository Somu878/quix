"use client";

import { useEffect, useState } from "react";
import {
  getDepth,
  getKlines,
  getTicker,
  getTrades,
} from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AsksTable";
import TradesTable from "./TradesTable";
import { SignalingManager } from "@/utils/SignalManager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();
  const [activeTab, setActiveTab] = useState("Book");
  const [asset, m] = market.split("_");
  useEffect(() => {
    getDepth(market).then((d) => {
      setBids(d.bids.reverse());
      setAsks(d.asks);
    })
    getTicker(market).then((t) => setPrice(t.lastPrice));
    // SignalingManager.getInstance().registerCallback("depth", (data: any) => {
    //   setBids(data.bids);
    //   setAsks(data.asks);
    // }, `DEPTH-${market}`);
    // SignalingManager.getInstance().sendMessage({
    //   method: "SUBSCRIBE",
    //   params: [`depth.${market}`],
    // getTrades(market).then(t => setPrice(t[0].price));
    // getKlines(market, "1h", 1640099200, 1640100800).then(t => setPrice(t[0].close));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // return () => {
    //   SignalingManager.getInstance().deRegisterCallback(
    //     "depth",
    //     `DEPTH-${market}`
    //   );
    //   SignalingManager.getInstance().sendMessage({
    //     method: "UNSUBSCRIBE",
    //     params: [`depth.${market}`],
    //   });
    // };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 px-2">
        <BookButton type={activeTab} setType={setActiveTab} />
        <TradesButton type={activeTab} setType={setActiveTab} />
      </div>
      {activeTab == "Trade" ? (
        <div>
          <div className="flex gap-4 text-xs p-1">
            <div className="text-white">Price ({m})</div>
            <div className="text-slate-500">Qty({asset})</div>
          </div>
          <TradesTable market={market as string} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between text-xs p-1">
            <div className="text-white">Price ({m})</div>
            <div className="text-slate-500">Size({asset})</div>
            <div className="text-slate-500">Total({asset})</div>
          </div>
          {asks && <AskTable asks={asks} />}
          {price && <div className="font-semibold pl-1">{price}</div>}
          {bids && <BidTable bids={bids} />}
        </div>
      )}
    </div>
  );
}

function BookButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center"
      onClick={() => setType("Book")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${
          type === "Book"
            ? "border-accentBlue text-baseTextHighEmphasis"
            : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
        }`}
      >
        Book
      </div>
    </div>
  );
}

function TradesButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center"
      onClick={() => setType("Trade")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${
          type === "Trade"
            ? "border-accentBlue text-baseTextHighEmphasis"
            : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
        } `}
      >
        Trades
      </div>
    </div>
  );
}
