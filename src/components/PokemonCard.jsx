import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../index.css';
const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
      if (pokemon.types[0].type.name === 'rock') {
        setBackgroundColor('orange');
      } else if (pokemon.types[0].type.name === 'fighting') {
        setBackgroundColor('red');
      }
    };

    loadPokemon();
  }, []);

  const handleBack = () => {
    if (pokemon.types[0].type.name === 'rock') {
      setBackgroundColor('orange');
    } else if (pokemon.types[0].type.name === 'fighting') {
      setBackgroundColor('red');
    }
  };

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className="hover:cursor-pointer border rounded-3xl mt-5 text-center flex items-center flex-row-reverse p-4 bg-red-500 gap-16"
          style={handleBack()}
        >
          <header>
            <div style={{ width: 200 }} className="w-full ml-3 mr-3">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="ml-5 mr-5 w-60"
              />
            </div>
          </header>

          <section>
            <section>
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>

              <p>
                Tipo: <span>{pokemon.types[0].type.name}</span>
              </p>
            </section>

            <section>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className="p-1 ">
                    {stat.stat.name.toUpperCase()}: <span>{stat.base_stat}</span>
                  </h3>
                  <p></p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
