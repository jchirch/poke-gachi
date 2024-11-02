import './MainPage.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import beachImg from '../Utils/Images/Box_Beach_BDSP.png'
import caveImg from '../Utils/Images/Box_Cave_BDSP.png'
import checkImg from '../Utils/Images/Box_Checks_BDSP.png'
import cityImg from '../Utils/Images/Box_City_BDSP.png'
import cragImg from '../Utils/Images/Box_Crag_BDSP.png'
import desertImg from '../Utils/Images/Box_Desert_BDSP.png'
import forestImg from '../Utils/Images/Box_Forest_BDSP.png'
import savannahImg from '../Utils/Images/Box_Savanna_BDSP.png'
import seafloorImg from '../Utils/Images/Box_Seafloor_BDSP.png'
import skyImg from '../Utils/Images/Box_Sky_BDSP.png'
import snowImg from '../Utils/Images/Box_Snow_BDSP.png'
import volcanoImg from '../Utils/Images/Box_Volcano_BDSP.png'




function MainPage() {
  const navigate = useNavigate();
  const params = useParams();
  const playAreaPlaceholder = document.getElementById('.play-area');
  let bgArray = [beachImg, caveImg, checkImg, cityImg, cragImg, desertImg, forestImg, savannahImg, seafloorImg, skyImg, snowImg, volcanoImg]

  let bgTemp = cityImg;
  bgTemp = bgArray[Math.round(Math.random() * bgArray.length)];
  if (playAreaPlaceholder) {
    playAreaPlaceholder.style.backgroundImage = bgTemp;
  } return (
    <div className="App">
      <header className="App-header">

        We'll be putting the main page here. Further routing will act similarly.
        <br />
        <Link to={`/Main/${params}/Stats`}>
          For example, click here to navigate to the stats page.
        </Link>
        <br />
        <Link to={`/Main/${params}/Train`}>Or click here to navigate to the training page.</Link>
      </header>

      <div className='play-container'>
        <div className={`play-area-${Math.round(Math.random() * bgArray.length)}`} >
          <button type="button" className='help-button'>
            Help
          </button>
        </div>
      </div>



    </div>
  );
}

export default MainPage;
