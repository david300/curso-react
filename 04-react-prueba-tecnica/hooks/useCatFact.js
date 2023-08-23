import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export const useCatFact = () => {
    const [fact, setFact] = useState()
    const refreshFact = () => {
        getRandomFact().then(fact => setFact(fact))
    }

    //para recuperar la cita al cargar la página
    useEffect(refreshFact, [])
    return { fact, refreshFact }
}