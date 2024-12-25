import { Pagination, PaginationItem, Stack } from "@mui/material";

import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const SearchPagination = ({
  page,
  maxPages,
  setPage,
}: {
  page: number;
  maxPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };
  return (
    <Stack spacing={2} className="flex items-center mt-8">
      <Pagination
        count={maxPages}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            slots={
              {
                previous: BsArrowLeftSquareFill,
                next: BsArrowRightSquareFill,
              } as any
            }
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default SearchPagination;
