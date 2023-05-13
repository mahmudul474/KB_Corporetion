import React from "react";
 
import {FcNext } from 'react-icons/fc';

const CategoryArrows = (props) => {
  const { className, style, onClick, arrowType } = props;
  return (
    <div className={className} style={{ ...style }}>
      <div onClick={onClick}>
        {arrowType === "prev" ? 'hello' : <FcNext/>}
      </div>
    </div>
  );
};

   export default CategoryArrows