import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants' 
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import './App.css'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(
    () => {
      const boardFromStorage = window.localStorage.getItem('board')
       
      if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
    }
  )
  const [winner, setWinner] = useState(null)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    console.log('Turno: ', turnFromStorage)
    return turnFromStorage ?? TURNS.X
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const checkWinner = (boardToChek) => {
    //revisamos toda las combinaciones ganadoras
    //para ver si hay un ganador
    for(const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToChek[a] &&
        boardToChek[a] === boardToChek[b] &&
        boardToChek[a] === boardToChek[c]
      ) {
        return boardToChek[a]
      }
    }
    return null
  }

  return (
    <main className='board'>
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}>
                  { board[index] }
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
