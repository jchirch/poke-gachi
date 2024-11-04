import './PartyMenu.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function PartyMenu({pokemon1, pokemon2, pokemon3}) {
  if(pokemon1){
console.log(pokemon1);
  }
  return (
    <div className="party-menu">
      <header className="party-header">
       Your Team!
       </header>
        
        <ul className='list-of-pokemon'>
          <li>
            {/* Display stats of the pokemon here, including name, sprite, etc.  */}
          </li>
          <li></li>
          <li></li>
          
        </ul>
    </div>
  );
}

export default PartyMenu;
