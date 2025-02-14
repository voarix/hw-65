import { useState } from "react";
import axiosApi from "../axiosApi.ts";
import Loader from "../UI/Loader.tsx";
import PageForm from "../components/PageForm/PageForm.tsx";
import { IPage } from "../types";
import { useNavigate } from "react-router-dom";

const NewPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitAddNewPage = async (newPage: IPage) => {
    try {
      setLoading(true);
      await axiosApi.put(`pages/${newPage.id}.json`, newPage);
      console.log(newPage);
      navigate(`/pages/${newPage.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    console.log(newPage);
  };

  let form = (<PageForm onSubmitAdd={onSubmitAddNewPage}/>);

  if (loading) form = <Loader/>;

  return (
    <>
      {form}
    </>
  );
};

export default NewPage;