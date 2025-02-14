import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Page from "./components/Page/Page.tsx";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container mt-5">
        <Routes>
          <Route path="/pages/:pageName" element={<Page />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
