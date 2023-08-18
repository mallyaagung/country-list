import React, { useState } from "react";
import { useGetAllCountryQuery } from "../api/apiSlice";
import Pagination from "../../components/Pagination";

const CountryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [search, setSearch] = useState("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllCountryQuery();

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    setCurrentPage(1);
  };

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const lastPost = currentPage * itemPerPage;
    const firstPost = lastPost - itemPerPage;
    const filteredItems = data.filter((res) =>
      res.name.common.toLowerCase().includes(search)
    );
    const currentPost = search
      ? filteredItems.slice(firstPost, lastPost)
      : data.slice(firstPost, lastPost);

    content = currentPost.map((res, index) => {
      const currency = res.currencies ? Object.keys(res.currencies) : [];
      const formattedCurrencies = currency
        .map((currencyCode) => {
          const currencyName = res.currencies[currencyCode].name;
          return `${currencyCode} (${currencyName})`;
        })
        .join(", ");

      const language = res.languages ? Object.keys(res.languages) : [];

      const formattedLanguage = language
        .map((languageCode) => {
          if (languageCode && res.languages[languageCode]) {
            return `${languageCode} (${res.languages[languageCode]})`;
          } else {
            return "";
          }
        })
        .join(", ");

      return (
        <tr key={index}>
          <td className="border border-slate-700">
            <img src={res.flags.png} className="p-2" alt="Flag" />
          </td>
          <td className="border border-slate-700 p-2">{res.name.common}</td>
          <td className="border border-slate-700 p-2">{res.capital}</td>
          <td className="border border-slate-700 p-2">{formattedCurrencies}</td>
          <td className="border border-slate-700 p-2">{formattedLanguage}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden items-center my-5 mx-5">
        <input
          className="w-1/2 mb-2 p-2 border border-slate-500 rounded"
          type="text"
          placeholder="Search Country"
          value={search}
          onChange={handleSearch}
        />
        <table className="h-min w-full table-fixed border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600 w-1/4">Flags</th>
              <th className="border border-slate-600 w-3/4">Name</th>
              <th className="border border-slate-600 w-3/4">Capital City</th>
              <th className="border border-slate-600 w-3/4">Currencies</th>
              <th className="border border-slate-600 w-3/4">Languages</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
      <Pagination
        itemPerPage={itemPerPage}
        totalItem={data?.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default CountryList;
