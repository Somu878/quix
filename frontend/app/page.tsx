import LineChart from "@/components/LineChart";

export default function Home() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
      <h2>Line Chart Example</h2>
      <LineChart data={data} />
    </main>
  );
}
