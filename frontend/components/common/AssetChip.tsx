"use client";
import { formatCurrency, generateTotalSupply } from "@/utils/helpers";
import { getKlines } from "@/utils/httpClient";
import { KLine } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
          const latestData: Partial<KLine> = res[res.length - 1];

          const oldestData: Partial<KLine> = res[0];
          const totalVolume = res.reduce((sum, item) => {
            const volume = Number(item.volume); // Convert string to number
            return sum + (isNaN(volume) ? 0 : volume); // Add to sum, handle NaN cases
          }, 0);
          const change24 = (
            ((Number(latestData?.close) - Number(oldestData?.close)) /
              Number(oldestData?.close)) *
            100
          ).toFixed(2);
          const totalsupply =
            Number(generateTotalSupply()) * Number(latestData?.close);
          console.log(latestData, oldestData, change24, totalVolume);

          setKlineData((prev) => ({
            price: latestData?.close ?? prev?.price ?? " ",
            marketCap: formatCurrency(totalsupply) ?? prev?.marketCap ?? " ",
            volume:
              formatCurrency(Number(totalVolume * Number(latestData?.close))) ??
              prev?.volume ??
              " ",
            change: Number(change24) ?? prev?.change ?? " ",
            price24: latestData?.close ?? prev?.price24 ?? " ",
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [chipData.symbol]);

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
          Number(klineData?.change) > 0 ? "text-white" : "text-red-500"
        } `}
      >
        {klineData?.change ? `${klineData.change}%` : "-"}
      </td>
      <td className=" py-3 first:pl-7 text-right first:pr-0 last:pl-0 last:pr-2">
        {klineData?.price24 ? `${klineData.price24}` : "-"}
      </td>
    </tr>
  );
}

interface Assetchip {
  name: string;
  symbol: string;
  icon: string;
  link: string;
}

interface klineData {
  price: string;
  marketCap: string;
  volume: string;
  change: Number;
  price24: string;
}
