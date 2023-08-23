import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App() {
    const [name, setName] = useState('midudev')
    console.log('render with name: ');

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Angel Durán',
            isFollowing: false
        },
        {
            userName: 'pheralb',
            name: 'Pablo H,',
            isFollowing: true
        },
        {
            userName: 'pacodezs',
            name: 'Paco Dezs',
            isFollowing: false
        },
    ]

    return (
        <section className='App'>
            {
                users.map(user => {
                    const { userName, name, isFollowing } = user
                    return (
                        <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
                            <strong>{name}</strong>
                        </TwitterFollowCard>
                    ) 
                })
            }
        </section>
    )
}