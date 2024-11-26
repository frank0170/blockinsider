"use client";

import React from "react";
import "./pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (arg: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPaginationRange = () => {
    const range: (number | string)[] = [];

    const showDots = (start: number, end: number): void => {
      range.push(start);
      if (start + 1 < end) range.push("...");
      range.push(end);
    };

    if (totalPages <= 6) {
      // If total pages are less than or equal to 6, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // If current page is near the beginning
        for (let i = 1; i <= 3; i++) range.push(i);
        showDots(4, totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end
        showDots(1, totalPages - 3);
        for (let i = totalPages - 2; i <= totalPages; i++) range.push(i);
      } else {
        // If current page is in the middle
        showDots(1, currentPage - 1);
        range.push(currentPage);
        showDots(currentPage + 1, totalPages);
      }
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {paginationRange.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="dots">
            {page}
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
