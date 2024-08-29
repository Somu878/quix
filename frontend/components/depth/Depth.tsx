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

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();
  const [asset, m] = market.split("_");
  useEffect(() => {
    getDepth(market).then((d) => {
      setBids(d.bids.reverse());
      setAsks(d.asks);
    });

    getTicker(market).then((t) => setPrice(t.lastPrice));
    // getTrades(market).then(t => setPrice(t[0].price));
    // getKlines(market, "1h", 1640099200, 1640100800).then(t => setPrice(t[0].close));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}
