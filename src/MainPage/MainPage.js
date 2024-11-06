import styles from './MainPage.css';
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
import helpButton from '../Utilities/buttons/Help_button.png'



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
  const [playAnim, setPlayAnim] = useState(0);


  let bgArray = [beachImg, caveImg, checkImg, cityImg, cragImg, desertImg, forestImg, savannahImg, seafloorImg, skyImg, snowImg, volcanoImg]
  let bgTemp = cityImg;
  bgTemp = bgArray[Math.round(Math.random() * bgArray.length)];

  function fetchData() {

    fetch("https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2")
      .then(response => {
        console.log("Received response:", response);
        return response.json()
      })
      .then(data => {
        console.log("Parsed data:", data);
        setPokemonData(data);
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  }

  useEffect(() => {
    console.log("rerender")
    fetchData();

  },[])

  // function triggerHops(){
  //   setPlayAnim(1);
  //   console.log(playAnim);
  // }
  function playWithCurrentPokemon() {
  
    console.log(playAnim)
    setPlayAnim(1);

    console.log(playAnim)

    let pkmnCry = new Audio(pokemonData.data.attributes.cry_url)
    pkmnCry.play();
    let newHappiness = Math.min(pokemonData.data.attributes.happiness + 5, 100);
    fetch(
      "https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2",
      {
        method: "PATCH",
        body: JSON.stringify({ happiness: newHappiness }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("response: ", data);
        setPokemonData(data)
      })
      .catch((error) => console.log("error:", error));
      console.log(playAnim)

  }
  

=
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

          {pokemonData && pokemonData.data ? (

            <div className="pokemon-details">
              <div className='pokemon-bars'>
                <p className="pokemon-experience-bar">XP: {pokemonData.data.attributes.xp}</p>
                <p className="pokemon-energy-bar">Energy: {pokemonData.data.attributes.energy} / {pokemonData.data.attributes.max_energy}</p>
                <p className="pokemon-happiness-bar">Happiness: {pokemonData.data.attributes.happiness}</p>
              </div>
              <div className='pokemon-image-name-level'>
                <img className='pokemon-sprite' src={pokemonData.data.attributes.gif_url} alt={pokemonData.data.attributes.name} onClick={()=> playWithCurrentPokemon()}  />
                <h2 className="pokemon-name-level">{pokemonData.data.attributes.name}, Level: {pokemonData.data.attributes.level}</h2>
              </div>
              {/* <audio controls src={pokemonData.data.attributes.cry_url}>Your browser does not support the audio tag.</audio> */}
              {/* <p>Description: {pokemonData.data.attributes.description}</p> */}
              {/* <p>Trainer ID: {pokemonData.data.attributes.trainer_id}</p> */}
            </div>
          ) : (
            <h1 className="pokemon-load-error">Loading Pokémon data...</h1>
          )}

          <div className="button-row">
            <button type="button" className='train-button'>
              Train
            </button>
            <button type="button" className='stats-button'>
              Stats
            </button>
            <button type="button" className='feed-button'>
              Feed
            </button>
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
            <img className='help-button' src={helpButton} onClick={handleHelpVisible}>

            </img>
            <Modal style={{ display: 'block', position: 'center' }}
              show={showHelp} onHide={handleHelpVisible}>
              <Modal.Header closeButton>
                <Modal.Title>Help</Modal.Title>
              </Modal.Header>
              <Modal.Body>
Hello, Trainer, and welcome to the world of Poke-gachi!<br/>
Here, your Pokémon thrive with your care and attention. You can feed, train, and play with your Pokémon. With a little love and care, they can even level up!<br/>
Each of your Pokemon has a finite amount of energy (EN).<br/>
Training your Pokémon helps them earn experience (XP), but uses up energy, so keep an eye on its Energy Bar.<br/>
Be careful not to overdo it and leave them entirely exhausted, though, or your Pokémon might become too tired to train, meaning it will be unable to earn experience.<br/>
When your Pokémon gains enough experience, they'll level up, increasing their maximum energy limit!<br/>
You can increase your Pokémon’s <i>current</i> energy by feeding it, giving it the energy it needs to grow.<br/>
Lastly, you can interact with your Pokemon! While exhausting a Pokemon can make them unhappy, playing with them does just the opposite, helping them increases their happiness (HL)!<br/>
Click the Party button to view and manage your Pokémon, ensuring every team member gets the attention they deserve.<br/>
 Take care, dear Trainer, and don't forget to appreciate your Pokemon just as much as they appreciate you!                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleHelpVisible}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
