"use client";
import { Depth } from "@/components/depth/Depth";
import { MarketBar } from "@/components/MarketBar";
import { SwapUI } from "@/components/SwapUI";
import { TradeView } from "@/components/TradeView";
import { useParams } from "next/navigation";
import { RecoilRoot } from "recoil";
export default function Page() {
  const { market } = useParams();
  return (
    <div className="flex flex-row flex-1">
      <RecoilRoot>
        <div className="flex flex-col flex-1">
          <MarketBar market={market as string} />
          <div className="flex flex-row h-[620px] border-y border-slate-800">
            <div className="flex flex-col flex-1">
              <TradeView market={market as string} />
            </div>
            <div className="w-[1px] flex-col border-slate-800 border-l"></div>
            <div className="flex flex-col w-[250px] overflow-hidden">
              <Depth market={market as string} />
            </div>
          </div>
        </div>
        <div className="w-[1px] flex-col border-slate-800 border-l"></div>
        <div>
          <div className="flex flex-col w-[250px]">
            <SwapUI market={market as string} />
          </div>
        </div>
      </RecoilRoot>
    </div>
  );
}
