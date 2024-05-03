import { useEffect, useState } from 'react'
import './App.css'
import  TarjetaPeli  from './components/TarjetaPeli'

export function App() {
  const [pelicula, setPelicula] = useState()
  const [busqueda, setBusqueda] = useState()
  
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
          // console.log("si hay peli")
          // console.log(pelicula)
          setPelicula(data)
        }
      })
  }

  const handleOnChange = (event) => {
    event.preventDefault()
    // console.log(event.target.value)
    // recuperarPeliculas(event.target.value)
    setBusqueda(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    // console.log(event.target.value)
    recuperarPeliculas(busqueda)
  }

  return (
    <>
      {pelicula &&<div className='flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-semibold m-5'>Buscador de películas</h1>
        <form onSubmit={handleOnSubmit} className='flex flex-row items-center gap-5 mt-4'>
          <input onChange={handleOnChange} type="text" className='w-64 h-11 text-lg' placeholder='Introduce una pelicula' />
          <button type='submit' className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-32">
            buscar
          </button>
        </form>
      </div>}    
      {pelicula &&<div >
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-3 mb-5">
          {
            ListarPeliculas(pelicula)
          }
        </ul>
      </div>}
    </>
  )
}