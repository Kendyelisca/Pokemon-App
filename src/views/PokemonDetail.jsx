import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import '../index.css';
const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  return (
    <div>
      {pokemon && (
        <>
          <h1 className="bright text-4xl font-bold font-serif text-center">
            {pokemon.name}
          </h1>
          <div className="flex flex-row justify-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-8/12"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
