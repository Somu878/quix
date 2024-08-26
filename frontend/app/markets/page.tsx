import MarketsTable from "@/components/MarketsTable";

function page() {
  return (
    <div className="flex  flex-col justify-center items-center p-5">
      <div className="w-5/6">
        <div className="pl-2 text-xl text-left">Markets</div>
        <MarketsTable />
      </div>
    </div>
  );
}

export default page;
