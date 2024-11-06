import './PartyMenu.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function PartyMenu() {
  const [pokemonPartyData, setPokemonPartyData] = useState(null);

  function fetchData() {
    fetch("http://127.0.0.1:3000/api/v1/trainers/1/pokemons/2")
      .then(response => {
        console.log("Received response:", response);
        return response.json()
      })
      .then(data => {
        console.log("Parsed data:", data);
        setPokemonPartyData(data);
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [])

  // if (pokemon1) {
  //   console.log(pokemon1);
  // }
  return (
    <div className="party-menu">
      <header className="party-header">
        Your Pokémon!
      </header>

      {pokemonPartyData ? (
        <div className="pokemon-party-list">
          {/* <ul className="pokemon-party-member"> */}
            <li className='pokemon-party-member'><a href='#'><img src={pokemonPartyData.data.attributes.small_img}/> {pokemonPartyData.data.attributes.name}, Level: {pokemonPartyData.data.attributes.level}</a></li>
            {/* <li className='pokemon-party-member'> </li>
            <li className='pokemon-party-member'> </li>
            <li className='pokemon-party-member'> </li>
            <li className='pokemon-party-member'> </li>
            <li className='pokemon-party-member'> </li> */}
          {/* </ul> */}
        </div>
      ) : (
        <h1 className="pokemon-load-error">Loading Pokémon data...</h1>
      )}
    </div>
  );
}

export default PartyMenu;
