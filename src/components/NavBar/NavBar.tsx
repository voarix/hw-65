import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IPage, IPageApi } from "../../types";

const NavBar = () => {
  const [pages, setPages] = useState<IPage[]>([]);

  const fetchAllPages = useCallback(async () => {
    try {
      const response = await axiosApi<IPageApi>("pages.json");
      if (response.data) {
        const objPages = response.data;
        const objKeys = Object.keys(objPages);
        const pagesArray = objKeys.map((key: string) => {
          return {
            id: key,
            ...objPages[key],
          };
        });
        setPages(pagesArray);
      } else {
        setPages([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    void fetchAllPages();
  }, [fetchAllPages]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary shadow">
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <h1>Static Pages</h1>
          </NavLink>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {pages.length
                ? pages.map((page) => (
                    <li className="nav-item" key={page.id}>
                      <NavLink className="nav-link" to={`/pages/${page.id}`}>
                        {page.title}
                      </NavLink>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
