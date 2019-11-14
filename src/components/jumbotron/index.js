import React from "react";
import "./style.css";

const Jumbotron = (props) => {
  return (
    <div className = "jumbotron">
      <div className = "instructions"> {props.instructions} </div>
    </div>
  )
}

export default Jumbotron;