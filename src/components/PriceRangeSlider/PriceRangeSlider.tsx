import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FilterObject } from "@/app/search/page";

const PriceRangeSlider = ({
  maxPrice,
  minPrice,
  filterOptions,
  setFilterOptions,
}: {
  minPrice: number;
  maxPrice: number;
  filterOptions: FilterObject;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterObject>>;
}) => {
  const [value, setValue] = React.useState<number>(maxPrice);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);

    setFilterOptions({ ...filterOptions, max: newValue as number });
  };

  return (
    <Box>
      <Slider
        value={value}
        max={maxPrice}
        min={minPrice}
        onChange={handleChange}
        valueLabelDisplay="auto"
        className="text-xs"
        defaultValue={maxPrice}
      />
    </Box>
  );
};

export default PriceRangeSlider;
