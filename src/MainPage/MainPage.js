import './MainPage.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PartyMenu from '../PartyMenu/PartyMenu';
import 'bootstrap/dist/css/bootstrap.min.css';

import beachImg from '../Utilities/Images/Box_Beach_BDSP.png'
import caveImg from '../Utilities/Images/Box_Cave_BDSP.png'
import checkImg from '../Utilities/Images/Box_Checks_BDSP.png'
import cityImg from '../Utilities/Images/Box_City_BDSP.png'
import cragImg from '../Utilities/Images/Box_Crag_BDSP.png'
import desertImg from '../Utilities/Images/Box_Desert_BDSP.png'
import forestImg from '../Utilities/Images/Box_Forest_BDSP.png'
import savannahImg from '../Utilities/Images/Box_Savanna_BDSP.png'
import seafloorImg from '../Utilities/Images/Box_Seafloor_BDSP.png'
import skyImg from '../Utilities/Images/Box_Sky_BDSP.png'
import snowImg from '../Utilities/Images/Box_Snow_BDSP.png'
import volcanoImg from '../Utilities/Images/Box_Volcano_BDSP.png'




function MainPage() {
  const navigate = useNavigate();
  const params = useParams();
  const playAreaPlaceholder = document.getElementById('.play-area');

  const [showParty, setShowParty] = useState(false);

  const handlePartyVisible = () => setShowParty(!showParty);
  const [partyPopUpMenu, setPartyPopUpMenu] = useState();

  const [showHelp, setShowHelp] = useState(false);

  const handleHelpVisible = () => setShowHelp(!showHelp);
  const [pokemonData, setPokemonData] = useState(null);


  let bgArray = [beachImg, caveImg, checkImg, cityImg, cragImg, desertImg, forestImg, savannahImg, seafloorImg, skyImg, snowImg, volcanoImg]
  let bgTemp = cityImg;
  bgTemp = bgArray[Math.round(Math.random() * bgArray.length)];

  function fetchData() {

    fetch("http://127.0.0.1:3000/api/v1/trainers/1/pokemons/2") 
    .then(response => { 
      console.log("Received response:", response); 
      return response.json()})
      .then(data => { 
        console.log("Parsed data:", data); 
        setPokemonData(data); 
      })
      .catch(error => { 
        console.error('Fetch operation failed:', error);
        });
  }

  useEffect(() => {
    fetchData();

  }, [])

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

        
      {pokemonData && pokemonData.data ? (
          <div className="pokemon-details">
            <h2>{pokemonData.data.attributes.name}</h2>
            <p>Description: {pokemonData.data.attributes.description}</p>
            <img src={pokemonData.data.attributes.gif_url} alt={pokemonData.data.attributes.name} />
            <audio controls src={pokemonData.data.attributes.cry_url}>Your browser does not support the audio tag.</audio>
            <p>Level: {pokemonData.data.attributes.level}</p>
            <p>XP: {pokemonData.data.attributes.xp}</p>
            <p>Energy: {pokemonData.data.attributes.energy} / {pokemonData.data.attributes.max_energy}</p>
            <p>Happiness: {pokemonData.data.attributes.happiness}</p>
            <p>Trainer ID: {pokemonData.data.attributes.trainer_id}</p>
          </div>
        ) : (
          <p>Loading Pokémon data...</p>
        )}
        
        <div className={`play-area-${Math.round(Math.random() * bgArray.length)}`} >
          <div className='button-containers-1'>
            <button type="button" className='help-button' onClick={handleHelpVisible}>
              ?
              <Modal style={{ display: 'block', position: 'center' }}

                show={showHelp} onHide={handleHelpVisible}>
                <Modal.Header closeButton>
                  <Modal.Title>Help</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                  Help page will go here
                  {/* <PartyMenu pokemon1={"pokemon1"} pokemon2={"pokemon2"} pokemon3={"pokemon3"} /> */}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleHelpVisible}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </button>
          </div>
          <div className='button-containers-2'>

            <button type="button" className='train-button'>
              Train
            </button>
          </div>
          <div className='button-containers-3'>

            <button type="button" className='stats-button'>
              Stats
            </button>
          </div>
          <div className='button-containers-4'>
            <button type="button" className='feed-button'>
              Feed
            </button>
          </div>
          <div className='button-containers-5'>
            <button type="button" className='party-button' onClick={handlePartyVisible}>
              Party
              <Modal style={{ display: 'block', position: 'center' }}
                show={showParty} onHide={handlePartyVisible}>
                <Modal.Header closeButton>
                  <Modal.Title>Party</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PartyMenu pokemon1={"pokemon1"} pokemon2={"pokemon2"} pokemon3={"pokemon3"} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handlePartyVisible}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainPage;
