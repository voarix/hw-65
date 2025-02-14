import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IPageId } from "../../types";

const Page = () => {
  const [page, setPage] = useState<IPageId | null>(null);
  const {pageName} = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosApi<IPageId>(`/pages/${pageName}.json`);
      if (response.data) {
        setPage(response.data);
      } else {
        setPage(null);
      }
    } catch (e) {
      console.error(e);
    }
  }, [pageName]);
  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (!page) {
    return <p>No content</p>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
};

export default Page;
