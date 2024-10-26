import axios from "axios";

export const getUser = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    return error.respponse.data;
  }
};
