"use client";

import React, { useState } from "react";
import "./dropdown.css";

interface DropdownProps {
  options: number[];
  selectedOption: number;
  setSelectedOption: (arg: number) => void;
}

export const Dropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="flex justify-center items-center gap-[8px]">
      <span className="text-[#aaa7a7]">Items per row:</span>
      <div className="dropdown-container">
        <div
          className={`dropdown-display ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedOption || "Select an option"}
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.map((option) => (
              <div
                key={option}
                className="dropdown-option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the custom dropdown
const styles = `
  .dropdown-container {
    position: relative;
    display: inline-block;
    font-family: Arial, sans-serif;
  }

  .dropdown-display {
    padding: 5px 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 12px;
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dropdown-display.open {
    background-color: #e0e0e0;
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    z-index: 10;
    margin-top: 5px;
    max-height: 200px;
    overflow-y: auto;
    width: 200px;  /* Make options list same width */
  }

  .dropdown-option {
    padding: 12px 20px; /* Added more padding for better spacing */
    cursor: pointer;
    color: black;
    font-size: 14px;
  }

  .dropdown-option:hover {
    background-color: #8800ff;
    color: white;
  }

  .dropdown-option.active {
    background-color: #8800ff;
    color: white;
  }

  .dropdown-option:active {
    background-color: #6600cc;
  }

  .dropdown-option:disabled {
    color: #999;
    cursor: not-allowed;
  }
`;

export const applyDropdownStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};
