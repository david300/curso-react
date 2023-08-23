import { useEffect, useRef, useState } from "react"

export function useSearch() {
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