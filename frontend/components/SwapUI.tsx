"use client";
import { useState } from "react";
import Image from "next/image";
export function SwapUI({ market }: { market: string }) {
  const [quantity, setQuantity] = useState<string>();
  const [buyPrice, setBuyPrice] = useState<string>();
  const [activeTab, setActiveTab] = useState("Buy");
  const [type, setType] = useState("limit");
  const [asset, m] = market.split("_");
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row h-[60px]">
          <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
          <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-3">
            <div className="flex flex-row flex-0 gap-5 undefined">
              <LimitButton type={type} setType={setType} />
              <MarketButton type={type} setType={setType} />
            </div>
          </div>
          <div className="flex flex-col px-3">
            <div className="flex flex-col flex-1 gap-3 text-baseTextHighEmphasis">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between flex-row ">
                  <p className="text-xs font-normal ">Available Balance</p>
                  <p className="font-medium text-xs text-baseTextHighEmphasis">
                    00.00 USDC
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-normal text-baseTextMedEmphasis">
                  Price
                </p>
                <div className="flex flex-col relative">
                  <input
                    step="0.01"
                    placeholder="0"
                    className="h-12 rounded-lg border-2 border-gray-800 border-solid bg-transparent  pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0"
                    type="text"
                    onChange={(e) => setBuyPrice(e.target.value)}
                    value={buyPrice}
                  />
                  <div className="flex flex-row absolute right-1 top-1 p-2">
                    <div className="relative">
                      <Image
                        src={`https://backpack.exchange/coins/${m.toLowerCase()}.svg`}
                        className="w-6 h-6"
                        alt={"Icon"}
                        width={25}
                        height={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-xs font-normal text-baseTextMedEmphasis">
                Quantity
              </p>
              <div className="flex flex-col relative">
                <input
                  step="0.01"
                  placeholder="0"
                  className="h-12 rounded-lg border-2 border-solid border-gray-800 bg-transparent pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0"
                  type="text"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
                <div className="flex flex-row absolute right-1 top-1 p-2">
                  <div className="relative">
                    <Image
                      src={`https://backpack.exchange/coins/${asset.toLowerCase()}.svg`}
                      alt="icon"
                      className="w-6 h-6"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-center flex-row mt-2 gap-6">
                  <div className="flex items-center justify-center flex-row rounded-full px-[6px] py-[4px] text-xs cursor-pointer bg-gray-600 hover:bg-gray-400">
                    25%
                  </div>
                  <div className="flex items-center justify-center flex-row rounded-full px-[6px] py-[4px] text-xs cursor-pointer  bg-gray-600 hover:bg-gray-400">
                    50%
                  </div>
                  <div className="flex items-center justify-center flex-row rounded-full px-[6px] py-[4px] text-xs cursor-pointer  bg-gray-600 hover:bg-gray-400">
                    75%
                  </div>
                  <div className="flex items-center justify-center flex-row rounded-full px-[6px] py-[4px] text-xs cursor-pointer  bg-gray-600 hover:bg-gray-400">
                    Max
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm font-normal text-baseTextMedEmphasis">
                Order Value
              </p>
              <div className="flex flex-col relative">
                <input
                  step="0.01"
                  placeholder="0"
                  className="h-12 rounded-lg border-2 border-solid border-gray-800 bg-transparent pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0"
                  type="text"
                  value={
                    (Number(buyPrice), quantity) &&
                    Number(buyPrice) * Number(quantity)
                  }
                />
                <div className="flex flex-row absolute right-1 top-1 p-2">
                  <div className="relative">
                    <Image
                      src={`https://backpack.exchange/coins/${m.toLowerCase()}.svg`}
                      alt="icon"
                      className="w-6 h-6"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`font-semibold  focus:ring-blue-200 focus:none focus:outline-none text-center h-12 rounded-xl text-base px-4 py-2 my-4  text-white active:scale-98 ${
                activeTab === "Buy" ? "bg-green-600" : "bg-red-500"
              }`}
              data-rac=""
            >
              {activeTab}
            </button>
            <div className="flex justify-between flex-row mt-1">
              <div className="flex flex-row gap-2">
                <div className="flex items-center">
                  <input
                    className="text-blue-600 bg-gray-700 border-gray-600 appearance-none rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 h-5 w-5"
                    id="postOnly"
                    type="checkbox"
                    data-rac=""
                  />
                  <label className="ml-2 text-xs">Post Only</label>
                </div>
                <div className="flex items-center">
                  <input
                    className="text-blue-600 bg-gray-700 appearance-none border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 h-5 w-5"
                    id="ioc"
                    type="checkbox"
                  />
                  <label className="ml-2 text-xs">IOC</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LimitButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("limit")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${
          type === "limit"
            ? "border-accentBlue text-baseTextHighEmphasis"
            : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
        }`}
      >
        Limit
      </div>
    </div>
  );
}

function MarketButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("market")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${
          type === "market"
            ? "border-accentBlue text-baseTextHighEmphasis"
            : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
        } `}
      >
        Market
      </div>
    </div>
  );
}

function BuyButton({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div
      className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${
        activeTab === "Buy"
          ? "border-b-green-500 bg-green-500  bg-opacity-[16%]"
          : "border-b-slate-800 hover:border-b-slate-400"
      }`}
      onClick={() => setActiveTab("Buy")}
    >
      <p className={`text-center text-sm font-semibold text-green-500 `}>Buy</p>
    </div>
  );
}

function SellButton({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div
      className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${
        activeTab === "Sell"
          ? "border-b-red-500 bg-red-500 bg-opacity-[16%]"
          : "border-b-slate-800 hover:border-b-slate-400"
      }`}
      onClick={() => setActiveTab("Sell")}
    >
      <p className={`text-center text-sm font-semibold text-red-500`}>Sell</p>
    </div>
  );
}
