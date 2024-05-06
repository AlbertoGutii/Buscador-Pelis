import { useEffect, useState } from 'react'
import './App.css'
import  TarjetaPeli  from './components/TarjetaPeli'

export function App() {
  const [pelicula, setPelicula] = useState()
  const [busqueda, setBusqueda] = useState()
  const [errorMessage, setErrorMessage] = useState()
  
  useEffect(() => {
    recuperarPeliculas()
  }, [])

  useEffect(() => {
    if (busqueda !== undefined && busqueda !== null && busqueda.trim() !== '') {
      const timer = setTimeout(() => {
        recuperarPeliculas(busqueda)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [busqueda])

  function ListarPeliculas(data) {
    const peliculas = data?.Search || []
    // console.log(peliculas)
    return peliculas.map(pelicula =>  (
      <TarjetaPeli key={pelicula.imdbID} title={pelicula.Title} year={pelicula.Year} foto={pelicula.Poster}  />
    ))
  }

  function recuperarPeliculas(titulo) {
    fetch(`https://www.omdbapi.com/?apikey=b5d1bbbc&s=${titulo}&type=movie`)
      .then(res => res.json())
      .then(data => {
        if(!data.Search) {
          setErrorMessage("No se ha encontrado ninguna película")
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
    console.log(busqueda)
    if(busqueda === null || busqueda === "") {
      setErrorMessage("Debes introducir datos para poder hacer una busqueda")
    }
    else {
      recuperarPeliculas(busqueda)
    }
  }

  return (
    <>
      {pelicula &&<div className='flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-semibold m-5'>Buscador de películas</h1>
        <form onSubmit={handleOnSubmit} className='flex flex-row items-center gap-5 mt-4'>
          <input onChange={handleOnChange} type="text" className='w-64 h-11 text-lg p-2' placeholder='Introduce una pelicula' />
          <button type='submit' className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-32">
            buscar
          </button>
        </form>
      </div>}    
      {pelicula &&<div >
        {errorMessage && <div>{errorMessage}</div>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-3 mb-5 justify-items-center items-center">
          {
            ListarPeliculas(pelicula)
          }
        </ul>
      </div>}
    </>
  )
}