import { useEffect, useState } from 'react'
import './App.css'
import  TarjetaPeli  from './components/TarjetaPeli'

export function App() {
  const [pelicula, setPelicula] = useState()
  
  useEffect(() => {
    recuperarPeliculas("cars")
  }, [])

  function ListarPeliculas(data) {
    const peliculas = data?.Search || []
    console.log(peliculas)
    return peliculas.map(pelicula =>  (

      <TarjetaPeli key={pelicula.imdbID} title={pelicula.Title} year={pelicula.Year} foto={pelicula.Poster}  />
    ))
  }

  

  function recuperarPeliculas(titulo) {
    fetch(`https://www.omdbapi.com/?apikey=b5d1bbbc&s=${titulo}&type=movie`)
      .then(res => res.json())
      .then(data => {
        if(!data.Search) {
          console.log("no hay peli")
        }
        else {
          console.log("si hay peli")
          setPelicula(data)
          console.log(pelicula)
        }
      })
  }

  const handleOnChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    recuperarPeliculas(event.target.value)
  }

  return (
    <>
      {pelicula &&<div>
        <h1>Buscador de pelis</h1>
        <form>
          <input onChange={handleOnChange} type="text" />
          <button type='submit'>
            buscar
          </button>
        </form>

        <div>
          {
            ListarPeliculas(pelicula)
          }
        </div>
      </div>}    
    </>
  )
}