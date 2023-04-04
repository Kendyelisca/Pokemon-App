import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/UsePagination';
import { Form } from 'react-router-dom';
import '../index.css';
const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 30);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="w-full">
      <div className="fixed top-0 w-full bg-red-500 z-40 pl-3 pr-7">
        <p className="text-center mt-2 ml-10 -mb-14">
          <span className="text-white-500 font-semibold text-white text-3xl">
            Welcome {user},
          </span>
          here you'll find your favorite pokemon.
        </p>

        <div className="flex flex-row gap-2 m-20">
          {pokemonsPagination.pages.map((page) => (
            <button
              key={page}
              onClick={() => pokemonsPagination.changePageTo(page)}
              className={
                pokemonsPagination.currentPage === page
                  ? ' border rounded p-1 bg-white hover:bg-white hover:text-red-700'
                  : ''
              }
            >
              {page}
            </button>
          ))}
        </div>

        <div className="-mt-24">
          <Form className="mb-5">
            <h3 className="text-whites p-5">Filter for search</h3>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-3 ml-20">
                <input
                  type="text"
                  name="pokemon_name"
                  className="shadow-md border border-blue h-6"
                  value={pokemonName}
                  onChange={handleNameChange}
                />
                <select
                  name="pokemon_type"
                  value={pokemonType}
                  onChange={handleTypeChange}
                  className="border border-red-400 rounded"
                >
                  <option value="">-All-</option>
                  {types.map((type) => (
                    <option key={type.url} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="bg-white text-black p-1 hover:bg-red-400 rounded absolute "
                type="submit"
              >
                Search
              </button>
            </div>
          </Form>
        </div>
      </div>
      <section className="allcard mt-44">
        {pokemonsPagination.listSlice.length ? (
          pokemonsPagination.listSlice.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemonData={pokemon} />
          ))
        ) : (
          <p>
            There's no pokemon of type "{pokemonType}" and with the name "{pokemonName}"
          </p>
        )}
      </section>
    </div>
  );
};

export default Pokedex;
