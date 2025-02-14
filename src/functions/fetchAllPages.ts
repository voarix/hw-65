import axiosApi from "../axiosApi.ts";
import { IPageApi } from "../types";

export const fetchAllPages = async () => {
    try {
      const response = await axiosApi<IPageApi>(`pages.json`);
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