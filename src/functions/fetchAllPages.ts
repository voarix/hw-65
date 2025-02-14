import axiosApi from "../axiosApi.ts";

export const fetchAllPages = async () => {
    try {
      const response = await axiosApi(`pages.json`);
      if (response.data) {
        const objPages = response.data;
        const objKeys = Object.keys(objPages);
        return objKeys.map((id) => ({
          id: id,
          ...objPages[id],
        }));
      }
      return [];
    } catch (e) {
      console.error("Error fetching pages:", e);
      return [];
    }
  };