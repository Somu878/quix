import { Ticker } from "@/utils/types";
import React from "react";
import assetData from "../public/assets.json";
import AssetChip from "./AssetChip";

function MarketsTable() {
  return (
    <div className="mt-3  bg-zinc-950 w-full h-auto rounded-sm">
      <div className="w-full flex flex-col ">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="table-h text-left">
                Name <div className="w-20"></div>
              </th>
              <th className="table-h text-right">Price</th>
              <th className="table-h text-right">Market Cap</th>
              <th className="table-h text-right">24h Volume</th>
              <th className="table-h text-right">24h Change</th>
              <th className="table-h text-right">24h Price</th>
            </tr>
          </thead>
          <tbody>
            {/* <AssetChip
              key={assetData[0].symbol}
              name={assetData[0].name}
              symbol={assetData[0].symbol}
              icon={assetData[0].icon}
              link={assetData[0].link}
            /> */}
            {assetData.map((asset) => (
              <AssetChip
                key={asset.symbol}
                name={asset.name}
                symbol={asset.symbol}
                icon={asset.icon}
                link={asset.link}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketsTable;
//ticker: Partial<Ticker>
