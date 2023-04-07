import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../index.css';
import Loader from './Loader/Loader';
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

      setTimeout(() => {
        setPokemon(pokemonInfo);
      }, 2000);
    };

    loadPokemon();
  }, []);
  // background color management
  useEffect(() => {
    const handleBack = () => {
      if (pokemon && pokemon.types[0].type.name === 'rock') {
        setBackgroundColor('grey');
      } else if (pokemon && pokemon.types[0].type.name === 'fighting') {
        setBackgroundColor('rgba(200,20,20,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'poison') {
        setBackgroundColor('rgba(100,150,20,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'ground') {
        setBackgroundColor('rgba(60,150,120,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'rock') {
        setBackgroundColor('rgba(60,0,120,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'normal') {
        setBackgroundColor('rgba(60,150,0,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'bug') {
        setBackgroundColor('rgba(0,50,120,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'ghost') {
        setBackgroundColor('rgba(60,10,120,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'steel') {
        setBackgroundColor('rgba(60,150,20,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'fire') {
        setBackgroundColor('rgba(60,50,120,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'water') {
        setBackgroundColor('rgba(0,150,120,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'grass') {
        setBackgroundColor('rgba(10,40,1110,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'electric') {
        setBackgroundColor('rgba(90,100,40,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'psychic') {
        setBackgroundColor('rgba(30,30,30,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'ice') {
        setBackgroundColor('rgba(20,90,10,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'dragon') {
        setBackgroundColor('rgba(60,50,20,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'fairy') {
        setBackgroundColor('rgba(60,30,20,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'shadow') {
        setBackgroundColor('rgba(90,150,20,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'dark') {
        setBackgroundColor('rgba(60,150,220,0.6)');
      } else if (pokemon && pokemon.types[0].type.name === 'flying') {
        setBackgroundColor('rgba(60,40,120,0.6)');
      }
    };

    handleBack();
  }, [pokemon]);

  return (
    <>
      {pokemon ? (
        <article
          onClick={handleClickNavigate}
          className="hover:cursor-pointer border rounded-3xl mt-5 text-center flex items-center flex-row-reverse p-2 text-white straight "
          style={{ backgroundColor }}
        >
          <header className="part1">
            <div className=" mages">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className=" abs2"
              />
              <img src={'./pokeback8.png'} className="abs" alt="pokemon spinner" />
            </div>
          </header>

          <section className="part2">
            <section>
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>

              <p className="text text3 ">
                Tipo: <span>{pokemon.types[0].type.name}</span>
              </p>
            </section>

            <section className="text2">
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className="text w-40">
                    {stat.stat.name}: <span>{stat.base_stat}</span>
                  </h3>
                  <p></p>
                </section>
              ))}
            </section>
          </section>
        </article>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PokemonCard;
