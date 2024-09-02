import { formatDate } from "@/utils/helpers";
import { getTrades } from "@/utils/httpClient";
import { Trade } from "@/utils/types";
import React, { useEffect, useState } from "react";

function TradesTable({ market }: { market: string }) {
  const [trades, setTrades] = useState<Trade[] | null>(null);
  useEffect(() => {
    getTrades(market).then((data: Trade[]) => setTrades(data));
    console.log(trades);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-0.5">
      {trades?.map((i) => (
        <Tradek
          key={i.id}
          time={formatDate(String(i.timestamp))}
          price={i.price}
          quantity={i.quantity}
        />
      ))}
    </div>
  );
}

export default TradesTable;
function Tradek({
  price,
  quantity,
  time,
}: {
  time: string;
  price: string;
  quantity: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-between text-xs w-full px-1">
        <div>{price}</div>
        <div>{quantity}</div>
        <div>{time}</div>
      </div>
    </div>
  );
}
