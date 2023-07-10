import { useEffect, useState } from "react";
import { API_KEY } from "./API/apiconf";
import { API_URL } from "./API/apiconf";
import { URL_IMAGE } from "./API/apiconf";
import {IMAGE_PATH} from "./API/apiconf";
import YouTube from 'react-youtube';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
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



    /*let pagina = 1;
  
    const btnAnterior = (e)=>{
      if(pagina > 1){
          pagina -= 1;
          cargarPeliculas();
      }
  }
  
      const btnSiguiente = (e)=>{
          if(pagina < 1000){
              pagina += 1;
              cargarPeliculas();
          }
    }
  
    const cargarPeliculas = async() => {
  
      try{
          const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
          console.log(respuesta);
  
          if(respuesta.status === 200){
              const datos = await respuesta.json();
  
              let peliculas = "";
              datos.results.forEach(pelicula => {
                  peliculas += `
                      <div class="pelicula">
                          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" >
                          <h3 class="titulo"> ${pelicula.title} </h3>
                          
                      </div>
                  
                  `;
              }); 
          
              document.getElementById("contenedor").innerHTML = peliculas;  
          }
  
          //verificación de mensaje de error para dar al usuario
          else if(respuesta.status === 401){console.log("key incorrecta");}
          else if(respuesta.status === 404){console.log("no disponible");}
          else {console.log("no tengo idea del error")}
      }
  
      catch(error){
          console.log(error.message);
          //acciones por si no funciona
      }
    }  
  
    cargarPeliculas();*/
  
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
           {/* {<div className="row m-5">
                {movies.map((movie) =>(
                    <div key={movie.id} className="col-md-3 mb-3">
                        <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%"/>
                        <h4 className="text-center">{movie.title}</h4>

                    </div>

                ))}
                </div>}*/}

        </div>
          {/*<div className="contenedor bg" id="contenedor"></div>
          <div className="paginacion">
              <button onClick={btnAnterior}>Anterior</button>
              <button onClick={btnSiguiente} id="btnSiguiente">Siguiente</button>
          </div>*/}
      </div>
    )
  }
  
  export default Peliculas;