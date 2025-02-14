import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IPage } from "../../types";
import Loader from "../../UI/Loader.tsx";
import { fetchAllPages } from "../../functions/fetchAllPages.ts";

const NavBar = () => {
  const [pages, setPages] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(false);


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

  useEffect(() => {
    void fetchPages();
  }, [fetchPages]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary shadow">
        <div className="container">
          <h1 style={{color: "white"}}>Static Pages</h1>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {loading ? (
                <Loader/>
              ) : (
                pages.map((page) => (
                  <li className="nav-item" key={page.id}>
                    <NavLink className="nav-link" to={`/pages/${page.id}`}>
                      {page.title}
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
