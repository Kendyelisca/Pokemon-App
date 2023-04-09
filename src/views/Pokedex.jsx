import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/UsePagination';
import { ImPrevious } from 'react-icons/im';
import { ImNext } from 'react-icons/im';
import '../index.css';
import { Form } from 'react-router-dom';
const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 100);
  const [isOn, setIsOn] = useState(false);
  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };
  const handleAppear = () => {
    setIsOn(!isOn);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      // Submit the form when enter key is pressed
      event.target.form.submit();
    }
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
        <div>
          <button
            className=" fixed border p-1 round rounded-md left-8 bottom-10 bg-red-500 text-white"
            onClick={handleAppear}
          >
            types
          </button>
        </div>
        <div className="flex flex-row justify-center gap-2 m-16 pb-10 ">
          <button onClick={pokemonsPagination.previousPage}>
            <ImPrevious />
          </button>{' '}
          {pokemonsPagination.pages.map((page) => (
            <button
              key={page}
              onClick={() => pokemonsPagination.changePageTo(page)}
              className={
                pokemonsPagination.currentPage === page
                  ? ' border rounded-full p-1 text-center bg-white hover:bg-white hover:text-red-700'
                  : ''
              }
            >
              {page}
            </button>
          ))}
          <button onClick={pokemonsPagination.nextPage}>
            <ImNext />
          </button>
        </div>

        <div className="-mt-24">
          <Form className="mb-5">
            <div className="search">
              <h3 className="text-white font-semibold pb-7">Filter for search</h3>
              <div className="flex flex-row justify-between">
                <div className="flex gap-3 items-end -mt-8">
                  <input
                    type="text"
                    name="pokemon_name"
                    className="shadow-md border border-blue h-6 lookup"
                    value={pokemonName}
                    onChange={handleNameChange}
                  />{' '}
                  <button
                    className=" bg-white text-black pl-1 pr-1 hover:bg-red-400 rounded"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
                <div
                  className="selectwrapper"
                  style={{ display: isOn ? 'block' : 'none' }}
                >
                  <button
                    onClick={handleAppear}
                    className="absolute text-white font-bold text-xl right-6 top-4 hover:bg-red-500 border border-rose-50 p-2 rounded-md"
                  >
                    X
                  </button>
                  <select
                    name="pokemon_type"
                    value={pokemonType}
                    onChange={(e) => {
                      e.preventDefault();
                      handleTypeChange(e);
                      e.target.form.submit();
                    }}
                    onKeyPress={handleKeyPress}
                    className="border border-red-400 rounded type-select"
                  >
                    <option value="">Types</option>
                    {types.map((type) => (
                      <option key={type.url} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
