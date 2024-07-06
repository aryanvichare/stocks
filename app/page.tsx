import { ThemeToggle } from "@/components/theme-toggle";
import { getStockData } from "@/lib/getStockData";
import { InteractiveStockChart } from "@/components/InteractiveStockChart";

export default async function Home() {
  const stockData = await getStockData("NVDA");

  return (
    <div className='flex min-h-screen mx-auto max-w-screen-lg flex-col items-center pt-6 pb-12 lg:px-12 px-3'>
      <nav className='w-full flex flex-row justify-end'>
        <ThemeToggle />
      </nav>
      <main className='w-full pt-24'>
        <InteractiveStockChart chartData={stockData} />
      </main>
    </div>
  );
}
