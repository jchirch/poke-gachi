import './StartPage.css'
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function StartPage() {
let UserVal = "userval";
  const navigate = useNavigate();
 
  

  return (
    <div className="StartPage">
      <header className="start-header">
        
        <Link className="start-words" to={`/Main/${UserVal}`}>
          Current element is the start page.<br/>
          Click here to advance to the game!
        </Link>
      </header>

    </div>
  );
}

export default StartPage;
