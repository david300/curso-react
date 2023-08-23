import { useCallback, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({search, sort})

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies(search)
    }, 300)
  ,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    debouncedGetMovies({search})
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies({search: newSearch})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='search' onChange={handleChange} value={search} placeholder='Avengers, Star Wars, The Matrix...' type='text'/>
          <input type='checkbox' onChange={handleSort} checked={sort}></input>
          <button type='submit'>Buscar</button>
        </form>
      </header>
      {error && (<p style={{color: 'red'}}>{error}</p>) }
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
