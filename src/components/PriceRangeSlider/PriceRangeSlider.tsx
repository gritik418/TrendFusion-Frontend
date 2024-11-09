import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FilterObject } from "@/app/search/page";

const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  filterOptions,
  setFilterOptions,
}: {
  minPrice: number;
  maxPrice: number;
  filterOptions: FilterObject;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterObject>>;
}) => {
  const [value, setValue] = React.useState<number[]>([minPrice, maxPrice]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    let values: number[] = newValue as number[];

    setFilterOptions({ ...filterOptions, min: values[0], max: values[1] });
  };

  React.useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <Box>
      <Slider
        value={value}
        min={minPrice}
        max={maxPrice}
        onChange={handleChange}
        valueLabelDisplay="auto"
        className="text-xs"
      />
    </Box>
  );
};

export default PriceRangeSlider;
