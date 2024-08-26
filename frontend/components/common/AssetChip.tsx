import Image from "next/image";
export default function AssetChip() {
  return (
    <tr className=" cursor-pointer border-t border-gray-800 hover:bg-blend- px-4">
      <td className="text-left  px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center">
            {" "}
            <Image
              src={"/usdc.webp"}
              alt="icon"
              width={30}
              height={30}
              loading="lazy"
              className="rounded-full outline-baseBackgroundL1"
            />
          </div>
          <div className="flex flex-col">
            <div>Bitcoin</div>
            <div className="text-xs font-semibold text-gray-600">BTC</div>
          </div>
        </div>
      </td>
      <td className="text-right px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        $8282
      </td>
      <td className="text-right px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        $1.2T
      </td>
      <td className="text-right px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        $899K
      </td>
      <td className="px-2 py-3 text-right first:pl-7 first:pr-0 last:pl-0 last:pr-7">
        -1.114%
      </td>
      <td className="px-2 py-3 first:pl-7 text-right  first:pr-0 last:pl-0 last:pr-7">
        -
      </td>
    </tr>
  );
}
