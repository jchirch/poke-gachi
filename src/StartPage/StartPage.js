import './StartPage.css'
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import playButton from "../Utilities/buttons/play_button.png"

function StartPage() {
let UserVal = "userval";
  const navigate = useNavigate();

  return (
    <div className="StartPage">
      <section className="start-area">
        
        <Link className="click-here" to={`/Main/${UserVal}`}>
          <img src={playButton}></img>
        </Link>
      </section>

    </div>
  );
}

export default StartPage;
