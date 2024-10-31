import './MainPage.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="App">
      <header className="App-header">
        
          We'll be putting the main page here. Further routing will act similarly. 
          <Link to={`/Main/${params}/Stats`}>
          For example, click here to navigate to the stats page.
          </Link>
          <Link to={`/Main/${params}/Train`}>Or click here to navigate to the training page.</Link>
      </header>
    </div>
  );
}

export default MainPage;
