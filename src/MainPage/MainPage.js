import styles from './MainPage.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PartyMenu from '../PartyMenu/PartyMenu';
import 'bootstrap/dist/css/bootstrap.min.css';

import Happiness from '../HUD/Happiness';
import Experience from '../HUD/Experience';
import Energy from '../HUD/Energy';


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
import trainButton from '../Utilities/buttons/train_button.png'
import feedButton from '../Utilities/buttons/feed_button.png'
import partyButton from '../Utilities/buttons/party_button.png'



function MainPage() {
  const navigate = useNavigate();
  const { pokeId } = useParams();
  const playAreaPlaceholder = document.getElementById('.play-area');
  const [showParty, setShowParty] = useState(false);
  const handlePartyVisible = () => setShowParty(!showParty);
  const [partyPopUpMenu, setPartyPopUpMenu] = useState();
  const [showHelp, setShowHelp] = useState(false);
  const handleHelpVisible = () => setShowHelp(!showHelp);
  const [pokemonData, setPokemonData] = useState(null);
  const [background, setBackground] =useState();

  let bgArray = [beachImg, caveImg, checkImg, cityImg, cragImg, desertImg, forestImg, savannahImg, seafloorImg, skyImg, snowImg, volcanoImg, beachImg]
  let bgTemp = bgArray[Math.round(Math.random() * bgArray.length)];
  
  useEffect(() => {
    fetchData(5);
  }, [])

  useEffect(() => {
    setBackground(bgTemp);
  }, [])

  const levelUp = () => {
    let newLevel = Math.max(pokemonData.data.attributes.level +1, 1)
    alert("Your Pokemon Has Leveled Up!")
    fetch(`https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/${pokemonData.data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xp: 0,
        level: newLevel
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response)
      return response.json();

    })
    .then(data => {
      console.log("Update success:", data);
      setPokemonData(data);
    })
    .catch(error => {
      console.error("Update Failed:", error);
    });  
  };

  const handleTrain = () => {
    let newEnergy = Math.max(pokemonData.data.attributes.energy -10, 0)
    let newXp = Math.min(pokemonData.data.attributes.xp +5, 100)
    if(pokemonData.data.attributes.energy < 10){
      alert("Your Pokemon is too exhausted to train, feed them to boost their energy")
      return
    }

    fetch(`https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/${pokemonData.data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xp: newXp,
        energy: newEnergy
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Update success:", data);
      setPokemonData(data);
    })
    .catch(error => {
      console.error("Update Failed:", error);
    });

    if(newXp > 99){
      levelUp()
      return
    }
    
  };

  function fetchData(identifier) {
  
  
    fetch(`https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/${identifier}`)

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
  
  const updateEnergy = () => {
    let newEnergy = Math.min(pokemonData.data.attributes.energy +10, pokemonData.data.attributes.max_energy)
    if(pokemonData.data.attributes.energy === pokemonData.data.attributes.max_energy){
      alert("Your Pokemon is Stuffed!!! Try training to burn off some energy")
      return;
    }
    fetch(`https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/${pokemonData.data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ energy: newEnergy })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Energy updated:", data);
      setPokemonData(data)
    })
    .catch(error => console.error("Error updating energy:", error));
  };

  function playWithCurrentPokemon() {
  
    let pokemonSprite = document.getElementById("currentRender")

    pokemonSprite.classList.remove('jump')
    setTimeout(() => {
      pokemonSprite.classList.add('jump');
    }, 50);

    let pkmnCry = new Audio(pokemonData.data.attributes.cry_url)
 
    let newHappiness = Math.min(pokemonData.data.attributes.happiness + 5, 100);
if(pokemonData.data.attributes.happiness === 100){
      pkmnCry.play();
      alert("Your Pokemon is overstimulated, try playing with it later")
      return
    }
    fetch(
      `https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/${pokemonData.data.id}`,
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
        setPokemonData(data)
      })
      .catch((error) => console.log("error:", error));
  }

  return (
    <div className="App">
      <div className='play-container' style={{ backgroundImage: `url(${background})` }}>
        {pokemonData && pokemonData.data ? (
          <div className="playArea">
            <section className="ui-info">
            <button className="help-button" onClick={handleHelpVisible}>
              <Modal style={{ display: 'block', position: 'center' }}
                show={showHelp} onHide={handleHelpVisible}>
                <Modal.Header closeButton>
                  <Modal.Title>Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              <p>Hello, Trainer, and welcome to the world of Poke-gachi!
              Here, your Pokémon thrive with your care and attention. You can feed, train, and play with your Pokémon. With a little love and care, they can even level up!</p>
              <p>Each of your Pokemon has a finite amount of energy (EN).
              Training your Pokémon helps them earn experience (XP), but uses up energy, so keep an eye on its Energy Bar.
              Be careful not to overdo it and leave them entirely exhausted, though, or your Pokémon might become too tired to train, meaning it will be unable to earn experience.</p>
              <p>When your Pokémon gains enough experience, they'll level up, increasing their maximum energy limit!
              You can increase your Pokémon’s <i>current</i> energy by feeding it, giving it the energy it needs to grow.</p>
              <p>Lastly, you can interact with your Pokemon! While exhausting a Pokemon can make them unhappy, playing with them does just the opposite, helping them increases their happiness (HL)!</p>
              <p>Click the Party button to view and manage your Pokémon, ensuring every team member gets the attention they deserve.</p>
              <p>Take care, dear Trainer, and don't forget to appreciate your Pokemon just as much as they appreciate you!</p>                
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleHelpVisible}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              </button>

              <section className='HUD'>
                <div className="HappinessBar">
                  <Happiness
                    current ={pokemonData.data.attributes.happiness}
                    max={100}
                  />
                </div>
                <div className="EnergyBar">
                  <Energy 
                    current ={pokemonData.data.attributes.energy}
                    max={pokemonData.data.attributes.max_energy}
                  />
                </div>
                <div className="ExperienceBar">
                  <Experience 
                    current ={pokemonData.data.attributes.xp}
                    max={100}
                  />
                </div>
              </section>
            </section>

            <section className="pokemon-display">
              <img id="currentRender" className="pokemon-sprite" src={pokemonData.data.attributes.gif_url} alt={pokemonData.data.attributes.name} onClick={playWithCurrentPokemon} />
              <h2 className="pokemon-name-level">{pokemonData.data.attributes.name}, Level: {pokemonData.data.attributes.level}</h2>
            </section>

            <section className="button-row">
              <button className='train-button' onClick={handleTrain}>
                <img src={trainButton} alt="train your pokemon"/>  
              </button>

              <button className='feed-button' onClick={updateEnergy}>
                <img src={feedButton} alt="feed your pokemon"></img>  
              </button>

              <button className='party-button' onClick={handlePartyVisible}>
                <img src={partyButton} alt="view your party"></img>  
                <Modal style={{ display: 'block', position: 'center' }}
                  show={showParty} onHide={handlePartyVisible}>
                  <Modal.Header closeButton>
                    <Modal.Title>Party</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <PartyMenu fetchSpecificPokemon={fetchData}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handlePartyVisible}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </button>
            </section>
          </div> 
        ) : (
          <h1 className="pokemon-load-error">Loading Pokémon data...</h1>
        )}
      </div>
    </div>
  );
};
export default MainPage;
