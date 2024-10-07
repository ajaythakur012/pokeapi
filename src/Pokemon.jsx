import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCards } from "./Pokemoncards";

export const Pokemon =()=>{
    const [pokemon  , setPokemon]=useState([]);
    const [loading, setLoading]= useState(true);
    const [error,setError]=useState(null)
    const [search, setSearch]=useState("")
    const [page,setPage]=useState(1);
    
    const API="https://pokeapi.co/api/v2/pokemon?limit=300"
    const fetchPokemon = async() => {
     
        try {
            const res = await fetch(API)
            const data = await res.json();
            console.log(data);

            const detailedPokemonData = data.results.map(async(curPokemon)=>{
               const res = await fetch(curPokemon.url)
                const data = await res.json();
            return data;
                
            });
          //  console.log(detailedPokemonData);

            const detailedResponses =await Promise.all(detailedPokemonData)
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false)
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
            
            
        }

    }

    const handleScroll = () =>{
        if(window.innerHeight + document.documentElement.scrollTop != document.documentElement.offsetHeight || loading){
            return;
        }

    }




   useEffect(()=>{

 fetchPokemon();

   },[]);

   //search functionality
   const searchData=pokemon.filter((curPokemon)=> curPokemon.name.toLowerCase().includes(search.toLowerCase()));

   if(loading){
    return (
        <div>
            <h1 >Loading........</h1>
        </div>
        
    );
   }
   if(error){
    return (
        <div >
            <h1 >{error.message}</h1>
        </div>
        
    );

   }


    return (
        <>
            <section className="container ">
                <header >
        <h1 >Let's catch  Pokémon</h1>
        </header>
        <div className="pokemon-search ">
            <input type="text" placeholder="search Pokemon"  value={search} onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        <div >
            <ul className="cards">
                
                   { /*pokemon.map((curPokemon)=>*/}
                   {searchData.map((curPokemon)=>{
                    return (<PokemonCards key={curPokemon.id} pokemonData ={curPokemon} />);

                   }) }
                        
                
            </ul>
        </div>
        </section>
        </>

    );
};