import { useEffect, useState } from "react";
import { API_KEY } from "./API/apiconf";
import { API_URL } from "./API/apiconf";
import { URL_IMAGE } from "./API/apiconf";
import {IMAGE_PATH} from "./API/apiconf";
import YouTube from 'react-youtube';

import axios from "axios";



function Peliculas() {

    //Constantes de estado
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey]= useState ("");
    const [trailer, setTrailer]= useState ("null");
    const [movie, setMovie]= useState ({title:"Loading Movies"});
    const [playing, setPlaying] = useState(false);

    //Funcion de peticion
    const fetchMovies = async(searchKey) =>{
        const type = searchKey ? "search" : "discover"
        const {data: {results},}
        =await axios.get(`${API_URL}/${type}/movie`,{
            params:{
                api_key: API_KEY,
                query: searchKey,
            },
        });
        setMovies(results)
        setMovie(results[0])

        if(results.length){
            await fetchMovie(results[0].id)
        }
    }



    //Peticion de una sola pelicula
    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "videos",
          },
        });
    
        if (data.videos && data.videos.results) {
          const trailer = data.videos.results.find(
            (vid) => vid.name === "Official Trailer"
          );
          setTrailer(trailer ? trailer : data.videos.results[0]);
        }
        //return data
        setMovie(data);
      };


    //Funcion para seleccionar la pelicula
    const selectMovie = async (movie) => {
        fetchMovie(movie.id);
    
        setMovie(movie);
        window.scrollTo(0, 0);
    };

    //Buscar Peliculas
    const searchMovies= (e) =>{
        e.preventDefault();
        fetchMovies(searchKey)
    }
    

    useEffect(()=>{
        fetchMovies();
    },[])




  
    return (
        

      <div className="export">
        {/*buscador*/}
        <form className="container mb-4" onSubmit={searchMovies}>
            <input type='search' placeholder='search' onChange={(e)=>setSearchKey(e.target.value)}/>
            <button><i class="fa fa-magnifying-glass" />search</button>
        </form>

        {/*contenedor del baner */}
        <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

        {/*Muestra los posters*/}
        <div className="conatiner mt-3">
            <div className="row m-5">
            {movies.map((movie) => (
                <div
                key={movie.id}
                className="col-md-3 mb-3"
                onClick={() => selectMovie(movie)}
                >
                <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt=""
                    height={600}
                    width="100%"
                />
                <h4 className="text-center">{movie.title}</h4>
                </div>
            ))}
            </div>
         

        </div>
          
      </div>
    )
  }
  
  export default Peliculas;