import React from "react";

const Pagination = ({ itemPerPage, totalItem, currentPage, paginate }) => {
  const pageNumbers = [];

  const maxPagesToShow = 5; // Adjust the number of pages to show before using a triple dot

  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  let displayedPages = pageNumbers;

  if (pageNumbers.length > maxPagesToShow) {
    if (currentPage <= Math.floor(maxPagesToShow / 2)) {
      displayedPages = pageNumbers.slice(0, maxPagesToShow);
    } else if (
      currentPage >
      pageNumbers.length - Math.floor(maxPagesToShow / 2)
    ) {
      displayedPages = pageNumbers.slice(pageNumbers.length - maxPagesToShow);
    } else {
      displayedPages = pageNumbers.slice(
        currentPage - Math.floor(maxPagesToShow / 2) - 1,
        currentPage + Math.floor(maxPagesToShow / 2)
      );
    }
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-4 mt-4">
        <li>
          <a
            onClick={() => paginate(currentPage - 1)}
            className={`px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ${
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Previous
          </a>
        </li>
        {displayedPages.map((number, index) => (
          <li key={index}>
            <a
              onClick={() => paginate(number)}
              className={`px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ${
                number === currentPage ? "bg-gray-400" : "cursor-pointer"
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            onClick={() => paginate(currentPage + 1)}
            className={`px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ${
              currentPage === pageNumbers.length
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
