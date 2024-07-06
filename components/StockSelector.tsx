"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companies } from "@/lib/stock-data";

export function StockSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTicker = searchParams.get("ticker") || "NVDA";

  const handleStockChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("ticker", value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className='w-full flex justify-end'>
      <Select value={currentTicker} onValueChange={handleStockChange}>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Select a stock' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies.map((company) => (
              <SelectItem key={company.ticker} value={company.ticker}>
                {company.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
