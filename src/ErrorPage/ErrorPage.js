import './ErrorPage.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function ErrorPage({error}) {
  const navigate = useNavigate();
  const { code } = useParams(error);
  const errorCode = error || code

console.log("Got error code: ", errorCode)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You shouldn't see this in the final version! 
        </p>

      </header>
    </div>
  );
}

export default ErrorPage;
