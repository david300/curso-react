import { useState } from 'react'
import './TwitterFollowCard.css'
export function TwitterFollowCard({ children, userName = 'unknown', initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const imageSrc = `https://unavatar.io/${userName}`
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'is-following' : ''

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' alt="Avatar de Midudev" src={imageSrc}></img>
                <div className='tw-followCard-info'>
                    {children}
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCard-button-text'>{text}</span>
                    <span className='tw-followCard-button-text-unfollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>        
    )
}