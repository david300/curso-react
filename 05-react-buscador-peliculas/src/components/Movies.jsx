export function ListOfMovies({ movies }) {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <li className='movie' key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title}></img>
                    </li>
                ))
            }
        </ul>
    )
}

export const NoMoviesResults = () => {
    return (
        <p>No se encontraron peliculas para ésta búsqueda</p>
    )
}

export function Movies ({ movies }) {
    const hasResult = movies?.length > 0
    return (
        hasResult ?
        (
            <ListOfMovies movies={movies} />
        )
        :
        (
            <NoMoviesResults />
        )
    )
}