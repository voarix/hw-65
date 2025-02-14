import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPage } from "../types";
import axiosApi from "../axiosApi.ts";
import PageForm from "../components/PageForm/PageForm.tsx";
import Loader from "../UI/Loader.tsx";

const EditPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitAddNewPost = async (page: IPage) => {
    try {
      setLoading(true);
      await axiosApi.put(`pages/${page.id}.json`, page);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    console.log(page);
  };

  let form = (<PageForm onSubmitAdd={onSubmitAddNewPost} isEdit />);

  if (loading) form = <Loader/>;
  return (
    <div>
      {form}
    </div>
  );
};

export default EditPage;