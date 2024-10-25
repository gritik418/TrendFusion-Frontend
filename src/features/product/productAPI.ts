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
