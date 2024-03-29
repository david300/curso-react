import withoutResults from '../mocks/no-results.json'
import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    }
    catch {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  }, [])
 
  /*const getSortedMovies = () => {
    const sortedMovies = sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies  

    return sortedMovies
  }*/

  //useMemo lo uso para que solo vuelva a renderizar (o sea, sólo se ejecuta si...) 
  //si es que cambia sort o movies
  const sortedMovies = useMemo(() => {
    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies  
  }, [sort, movies])
 
  return { movies: sortedMovies, loading, getMovies }
}