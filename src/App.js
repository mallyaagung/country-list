import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CountryList from "./features/country/CountryList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CountryList />} />
      </Route>
    </Routes>
  );
}

export default App;
