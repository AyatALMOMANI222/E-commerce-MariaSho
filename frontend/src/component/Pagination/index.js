import React from "react";
import "./style.scss";
const Pagination = ({ totalElements, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalElements / 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </div>
  );
};

export default Pagination;
