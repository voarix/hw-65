import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPage } from "../../types";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../UI/Loader.tsx";
import { fetchAllPages } from "../../functions/fetchAllPages.ts";

interface PageFormData {
  isEdit?: boolean;
  idPage?: string;
  onSubmitAdd: (quote: IPage) => void;
}

const initialForm = {
  id: "",
  title: "",
  content: "",
};

const PageForm: React.FC<PageFormData>  = ({isEdit = false, idPage, onSubmitAdd}) => {
  const [form, setForm] = useState<IPage>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<IPage[]>([]);
  const navigate = useNavigate();

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPages = await fetchAllPages();
      setPages(fetchedPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOnePage = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi(`quotes/${idPage}.json`);

      if (!response.data) {
        navigate("/");
        return;
      }
      setForm(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [idPage, navigate]);

  useEffect(() => {
    void fetchPages();
    if (isEdit) {
      void fetchOnePage();
    }
  }, [fetchPages, fetchOnePage, isEdit]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAdd(form);
    setForm(initialForm);
  };

  const onChangeInputMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <>
      {loading ? <Loader/> :
        <div className="mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="mb-4">{isEdit ? "Edit" : "Add new"} page</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="id">
                    Your id
                  </label>
                  {isEdit ? (
                    <select
                      className="form-control"
                      required
                      name="id"
                      id="id"
                      value={form.id}
                      onChange={onChangeInputMessage}
                    >
                      <option value="" disabled>
                        Choose page
                      </option>
                      {pages.length > 0 ? (
                        pages.map((page) => (
                          <option key={page.id} value={page.id}>
                            {page.title}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>No pages yet</option>
                      )}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="id"
                      id="id"
                      value={form.id}
                      onChange={onChangeInputMessage}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="title"
                    id="title"
                    value={form.title}
                    onChange={onChangeInputMessage}
                  />
                </div>
                <label htmlFor="content">Content</label>
                <textarea
                  className="form-control mt-2"
                  rows={5}
                  required
                  value={form.content}
                  name="content"
                  id="content"
                  onChange={onChangeInputMessage}
                ></textarea>
                <button type="submit" className="btn btn-primary mt-3">
                  {isEdit ? "Edit" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PageForm;