"use client";
import { MarketBar } from "@/components/MarketBar";
import { useParams } from "next/navigation";
export default function Page() {
  const { market } = useParams();
  return (
    <div className="flex flex-row flex-1">
      <MarketBar market={market as string} />
    </div>
  );
}
