import React from "react";

function FilterComponent({ searchItem, setSearchItem }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks to filter..."
        className="form-control"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </div>
  );
}

export default FilterComponent;
