import { useCatFact } from '../hooks/useCatFact'
import { useCatImage } from '../hooks/useCatImage'

export function Facts() {
    const { fact, refreshFact } = useCatFact()
    const { imgUrl } = useCatImage({ fact })

    const handleClick = () => {
        refreshFact()
    }

    return (
        <>
            <button onClick={handleClick}>Get New Fact</button>
            <section>
                {fact && <p>{fact}</p>}
                {imgUrl && <img src={imgUrl} alt="image random of picsum" style={{width: 500}}></img>}
            </section>
        </>
        
    )
}