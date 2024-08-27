"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Primary, Success } from "./common/Button";
function Appbar() {
  const route = usePathname();
  const router = useRouter();
  return (
    <div className="text-white border-b border-slate-800">
      <div className="flex justify-between items-center p-4">
        <div className="flex">
          <div className="pl-4 text-2xl font-semibold ">
            <Link href={"/"}>Quix</Link>
          </div>
          <div
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${
              route.startsWith("/markets") ? "text-white" : "text-slate-500"
            }`}
            onClick={() => router.push("/markets")}
          >
            Markets
          </div>
          <div
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${
              route.startsWith("/trade") ? "text-white" : "text-slate-500"
            }`}
            onClick={() => router.push("/trade/BTC_USDC")}
          >
            Trade
          </div>
        </div>
        <div className="flex ">
          <Primary>Sign in</Primary>
          <Success>Sign up</Success>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
