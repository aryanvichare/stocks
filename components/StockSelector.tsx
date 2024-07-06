import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companies } from "@/lib/stock-data";

export function StockSelector() {
  return (
    <div className='w-full flex justify-end'>
      <Select>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Select a stock' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies.map((company) => (
              <SelectItem key={company.ticker} value={company.name}>
                {company.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
