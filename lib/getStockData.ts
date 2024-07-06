const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SYMBOL&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

export interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export async function getStockData(
  ticker: string = "NVDA"
): Promise<StockData[]> {
  const res = await fetch(BASE_URL.replace("SYMBOL", ticker), {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();
  const timeSeries = data["Time Series (Daily)"];

  if (!timeSeries) {
    throw new Error("Failed to fetch stock data");
  }

  const stockDataArray: StockData[] = Object.entries(timeSeries).map(
    ([date, values]: [string, any]) => ({
      date,
      open: values["1. open"],
      high: values["2. high"],
      low: values["3. low"],
      close: values["4. close"],
      volume: values["5. volume"],
    })
  );

  return stockDataArray.reverse();
}
