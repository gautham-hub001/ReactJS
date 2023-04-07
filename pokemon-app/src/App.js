import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  // code that needs to be run whenever currentPageUrl gets updated
  useEffect(() => {
    let cancel;

    setLoading(true);
    axios.get(currentPageUrl, {cancelToken: new axios.CancelToken(c => cancel = c)}).then(res => {
      setLoading(false);
      setPrevPageUrl(res.data.previous);
      setNextPageUrl(res.data.next);
      setPokemon(res.data.results.map(p=>p.name));
    });

    return () => cancel();
  }, [currentPageUrl]); // whenever currentPageUrl gets updated, useEffect() gets triggered.

  if(loading) return "Loading..................";

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination gotoNextPage={nextPageUrl? gotoNextPage: null} gotoPrevPage={prevPageUrl? gotoPrevPage: null}/>
    </>
  );
} 

export default App;
