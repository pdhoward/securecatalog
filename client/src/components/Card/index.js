import React from "react";
import "./style.css";
//word-break: break-all;
function Card(props) {
  return (
    <div className="card">      
      <div className="content">
        <ul>          
          <li style={{overflowWrap: 'break-word'}}>
            <strong>Encrypted Password:</strong> {props.password}
          </li>
          <li>
            <strong>Joke:</strong> {props.joke}
          </li>
        </ul>
      </div>     
    </div>
  );
}

export default Card;