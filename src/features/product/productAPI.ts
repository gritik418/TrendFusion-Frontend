import axios from "axios";

export const getSuggestions = async (searchQuery: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/suggestion?searchQuery=${searchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error: any) {
    return error.respponse.data;
  }
};

export const searchProducts = async (
  searchQuery: string,
  minPrice?: number,
  maxPrice?: number
) => {
  try {
    const { data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/product/search?searchQuery=${searchQuery}${
        minPrice ? `&min=${minPrice}` : ""
      }${maxPrice ? `&max=${maxPrice}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error: any) {
    return error.respponse.data;
  }
};
