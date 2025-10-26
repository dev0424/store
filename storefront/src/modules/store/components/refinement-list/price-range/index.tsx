import React, { useCallback, useEffect, useState } from "react";
import { Slider } from "radix-ui";
import Input from "@modules/common/components/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@lib/hooks/use-debounce";
import { ProductPriceRange } from "@types/product";

const DEFAULT_MIN_PRICE = 1;
const DEFAULT_MAX_PRICE = 10000;

type Props = {
  minPrice?: string;
  maxPrice?: string;
  priceRange: ProductPriceRange;
};

const PriceRange = ({ minPrice, maxPrice, priceRange }: Props) => {
  const min = minPrice ? parseInt(minPrice) : DEFAULT_MIN_PRICE;

  const max = maxPrice
    ? parseInt(maxPrice)
    : (priceRange?.max_price ?? DEFAULT_MAX_PRICE);

  const [range, setRange] = useState<number[]>([min, max]);
  const [isDirty, setIsDirty] = useState(false);

  const debouncedPriceRange = useDebounce(range);

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
    setRange((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
    setIsDirty(true);
  };

  const onSliderChange = (range: number[]) => {
    setRange(range);
    setIsDirty(true);
  };

  useEffect(() => {
    if (isDirty) {
      setQueryParams(debouncedPriceRange);
    }
  }, [debouncedPriceRange, isDirty]);

  return (
    <div className="flex flex-col gap-3">
      <p className="font-black">Prix</p>
      <div className="flex flex-col gap-6">
        <div className="flex w-60 items-center gap-2">
          <Input
            label="Min (€)"
            name="from"
            type="number"
            value={range[0]}
            onChange={(e) => onInputChange(0, Number(e.target.value))}
          />
          <span>-</span>
          <Input
            label="Max (€)"
            name="to"
            type="number"
            value={range[1]}
            onChange={(e) => onInputChange(1, Number(e.target.value))}
          />
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          min={DEFAULT_MIN_PRICE}
          max={priceRange?.max_price ?? DEFAULT_MAX_PRICE}
          step={1}
          value={range}
          onValueChange={onSliderChange}
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
