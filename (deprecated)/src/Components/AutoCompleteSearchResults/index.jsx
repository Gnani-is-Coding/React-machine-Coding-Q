import React, { useEffect } from "react";
import { useState } from "react";

const demoData = [
  "How to add a new item to a list in React",
  "How create a component in React",
  "How to pass data in React",
  "Explain component lifecycle in React",
];

function AutoCompleteSearchResults() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(demoData);

  const handleSearchChange = (e) => {
    console.log("function called");
    const filteredData = demoData.filter((obj) =>
      obj.toLowerCase().includes(searchInput.toLowerCase())
    );

    // setSearchInput(filteredData);
    setData(filteredData);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      //Debouncing
      handleSearchChange();
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <ul>
        {data.map((obj, i) => (
          <li key={`object-${i}`}>{obj}</li>
        ))}
      </ul>
    </div>
  );
}

export default AutoCompleteSearchResults;
