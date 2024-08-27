"use client";
import { formatCurrency, generateTotalSupply } from "@/utils/helpers";
import { getKlines } from "@/utils/httpClient";
import { KLine, klineData, Assetchip } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";

export default function AssetChip(chipData: Assetchip) {
  const router = useRouter();
  const [klineData, setKlineData] = useState<klineData | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getKlines(
          chipData.symbol + "_" + "USDC",
          "1h",
          Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24) / 1000), // timestamp for 7 days ago
          Math.floor(new Date().getTime() / 1000) // current timestamp
        );
        if (res && res.length > 0) {
          const priceGraph = res.map((i) => Number(i.close));

          const latestData: Partial<KLine> = res[res.length - 1];

          const oldestData: Partial<KLine> = res[0];
          const totalVolume = res.reduce((sum, item) => {
            const volume = Number(item.volume);
            return sum + (isNaN(volume) ? 0 : volume);
          }, 0);
          const change24 = (
            ((Number(latestData?.close) - Number(oldestData?.close)) /
              Number(oldestData?.close)) *
            100
          ).toFixed(2);
          const totalsupply =
            Number(generateTotalSupply()) * Number(latestData?.close);

          setKlineData((prev) => ({
            price: latestData?.close ?? prev?.price ?? " ",
            marketCap: formatCurrency(totalsupply) ?? prev?.marketCap ?? " ",
            volume:
              formatCurrency(Number(totalVolume * Number(latestData?.close))) ??
              prev?.volume ??
              " ",
            change: Number(change24) ?? prev?.change ?? " ",
            price24: priceGraph ?? prev?.price24 ?? [],
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [chipData.symbol]);
  const data = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ],
    datasets: [
      {
        data: klineData?.price24,
        fill: false,
        borderColor: Number(klineData?.change) > 0 ? "green" : "red",
        tension: 0.2,
      },
    ],
  };
  return (
    <tr
      className="cursor-pointer border-t border-gray-800 hover:bg-slate-950"
      onClick={() => router.push(chipData.link)}
    >
      <td className="text-left px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={chipData.icon}
              alt="icon"
              width={30}
              height={30}
              loading="lazy"
              className="rounded-full outline-baseBackgroundL1"
            />
          </div>
          <div className="flex flex-col">
            <div>{chipData.name}</div>
            <div className="text-xs font-semibold text-gray-600">
              {chipData.symbol}
            </div>
          </div>
        </div>
      </td>
      <td className="text-right px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        {klineData?.price ? `$${klineData.price}` : "-"}
      </td>
      <td className="text-right px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        {klineData?.marketCap ? `$${klineData.marketCap}` : "-"}
      </td>
      <td className="text-right px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        {klineData?.volume ? `$${klineData.volume}` : "-"}
      </td>
      <td
        className={`px-2 py-3 text-right first:pl-7 first:pr-0 last:pl-0 last:pr-7 ${
          Number(klineData?.change) > 0 ? "text-green-500" : "text-red-500"
        } `}
      >
        {klineData?.change ? `${klineData.change}%` : "0"}
      </td>
      <td className=" py-2 flex justify-center items-center first:pl-0  last:pl-0   ">
        {klineData?.price24 ? <LineChart data={data} /> : "-"}
      </td>
    </tr>
  );
}
