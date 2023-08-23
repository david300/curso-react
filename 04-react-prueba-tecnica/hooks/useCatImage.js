import { useEffect, useState } from "react"

export const useCatImage = ({ fact }) => {
    const [imgUrl, setImgUrl ] = useState()
    useEffect(() => {
        if(!fact) return

        const firstword = fact.split(' ', 3).join(' ')
        const dataRandom = Math.floor(Math.random() * 900)
        fetch(`https://picsum.photos/v2/list?page=${dataRandom}&limit=1`)
            .then(res => res.json())
            .then(data => {
                const { download_url } = data[0]
                setImgUrl(download_url)
            })
            .catch(e => {
                console.log('Ocurrió un error: ', e)
            })
    }, [fact])

    return { imgUrl }
}