import { ThemeToggle } from "@/components/theme-toggle";
import { getStockData } from "@/lib/get-stock-data";
import { InteractiveStockChart } from "@/components/InteractiveStockChart";
import { StockSelector } from "@/components/StockSelector";

export default async function Home() {
  const stockData = await getStockData("NVDA");

  return (
    <div className='min-h-screen pt-6 pb-12 lg:px-12 px-3'>
      <nav className='w-full flex flex-row justify-end'>
        <ThemeToggle />
      </nav>
      <main className='w-full pt-24 flex flex-col gap-4 mx-auto max-w-screen-lg flex-col items-center'>
        <StockSelector />
        <InteractiveStockChart chartData={stockData} />
      </main>
    </div>
  );
}
