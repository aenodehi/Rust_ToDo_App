import React from "react";


import ICON from "./SVG/ICON";

const CheckBox = ({ toggleCompleted, index, todo}) => {
  return (
    <label class="container">
      <input
        checked={todo.complete}
        type="checkbox"
        onChange={() => toggleCompleted(index)}
      />
      <ICON />
    </label>
  );
};

export default CheckBox;