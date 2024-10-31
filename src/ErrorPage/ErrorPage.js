import './ErrorPage.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function ErrorPage() {
console.log(useParams());

  return (
    <div className="App">
      <header className="App-header">
        <p>
          You shouldn't see this in the final version! 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default ErrorPage;
