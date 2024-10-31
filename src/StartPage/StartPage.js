import './StartPage.css'
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function StartPage() {
let UserVal = "userval";
  const navigate = useNavigate();
 
  

  return (
    <div className="StartPage">
      <header className="Start-Header">
        <p onClick={()=>navigate(`/Main/${UserVal}`)}>
          Successfully navigated to start page. Click here to go further.
        </p>
      </header>
    </div>
  );
}

export default StartPage;
