import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Page from "./components/Page/Page.tsx";
import NewPage from "./Containers/NewPage.tsx";
import EditPage from "./Containers/EditPage.tsx";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container mt-5">
        <Routes>
          <Route path="/pages/:pageName" element={<Page />} />
          <Route path="/pages/add-page" element={<NewPage />} />
          <Route path="/pages/admin" element={<EditPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
