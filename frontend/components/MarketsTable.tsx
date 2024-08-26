import { Ticker } from "@/utils/types";
import React from "react";
import Image from "next/image";
import AssetChip from "./common/AssetChip";

function MarketsTable() {
  return (
    <div className="mt-3 bg-gray-900 w-full h-auto rounded-b">
      <div className="w-full flex flex-col ">
        <table className="w-full table-auto">
          <tr>
            <th className="table-h text-left">
              Name <div className="w-20"></div>
            </th>
            <th className="table-h text-right">Price</th>
            <th className="table-h text-right">Market Cap</th>
            <th className="table-h text-right">24h Change</th>
            <th className="table-h text-right">24h Price</th>
            <th className="table-h text-right">24h Price</th>
          </tr>
          <tbody>
            <AssetChip />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketsTable;
//ticker: Partial<Ticker>
