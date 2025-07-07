import React, { useCallback, useEffect, useState } from "react";
import { Slider } from "radix-ui";
import Input from "@modules/common/components/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@lib/hooks/use-debounce";

// TODO fetch max price from products
const MIN_PRICE = 1;
const MAX_PRICE = 10000;

type Props = {
  minPrice?: string;
  maxPrice?: string;
};
const PriceRange = ({ minPrice, maxPrice }: Props) => {
  const [priceRange, setPriceRange] = useState<number[]>([
    minPrice ? parseInt(minPrice) : MIN_PRICE,
    maxPrice ? parseInt(maxPrice) : MAX_PRICE,
  ]);
  const debouncedPriceRange = useDebounce(priceRange);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (range: number[]) => {
      const params = new URLSearchParams(searchParams);
      params.set("minPrice", range[0].toString());
      params.set("maxPrice", range[1].toString());

      return params.toString();
    },
    [searchParams],
  );

  const setQueryParams = (range: number[]) => {
    const query = createQueryString(range);
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const onInputChange = (index: 0 | 1, value: number) => {
    setPriceRange((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  useEffect(() => {
    // Debounce state update to avoid too many rerenders
    setQueryParams(debouncedPriceRange);
  }, [debouncedPriceRange]);

  return (
    <div className="flex flex-col gap-3">
      <p className="font-black">Price</p>
      <div className="flex flex-col gap-6">
        <div className="flex w-60 items-center gap-2">
          <Input
            label="From"
            name="from"
            type="number"
            value={priceRange[0]}
            onChange={(e) => onInputChange(0, Number(e.target.value))}
          />
          <span>-</span>
          <Input
            label="To"
            name="to"
            type="number"
            value={priceRange[1]}
            onChange={(e) => onInputChange(1, Number(e.target.value))}
          />
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1}
          value={priceRange}
          onValueChange={(range) => setPriceRange(range)}
        >
          <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-200">
            <Slider.Range className="absolute h-full rounded-full bg-accent-primary" />
          </Slider.Track>
          <Slider.Thumb className="hover:bg-violet3 block size-5 cursor-pointer rounded-full border border-gray-400 bg-white focus:shadow-[0_0_0_1px] focus:outline-none" />
          <Slider.Thumb className="hover:bg-violet3 block size-5 cursor-pointer rounded-full border border-gray-400 bg-white focus:shadow-[0_0_0_1px] focus:outline-none" />
        </Slider.Root>
      </div>
    </div>
  );
};

export default PriceRange;
