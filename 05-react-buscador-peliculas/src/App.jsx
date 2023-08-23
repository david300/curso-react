import { useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState } from 'react'
import { useEffect } from 'react'

const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '4287ad07'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)
  const counter = useRef(0) //Dato que persiste entre renders

  useEffect(() => {
    if(isFirstInput.current) {
      isFirstInput.current = search === '' 
      return
    }

    if(search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if(search.length < 3) {
      setError('La búsqueda debe tener al menos 3 carácteres')
      return
    }

    setError('')
  }, [search])

  return { search, updateSearch, error}
}

function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    //Recupero el dato de query del formulario
    const { search } = Object.fromEntries(new window.FormData(event.target))
    if(search === '') return
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='search' onChange={handleChange} value={search} placeholder='Avengers, Star Wars, The Matrix...' type='text'/>
          <button type='submit'>Buscar</button>
        </form>
      </header>
      {error && (<p style={{color: 'red'}}>{error}</p>) }
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
