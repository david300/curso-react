import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x:0, y:0 })

  useEffect(() => {
    console.log('effect', {enabled})
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({
        x: clientX,
        y: clientY
      });
    }
    if(enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return() => {
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // [] -> sólo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cuando se renderiza el componente

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={
        {
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`
        }
      }></div>
      <button onClick={() => { setEnabled(!enabled) }}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      { mounted && <FollowMouse /> }
      <button onClick={() => { setMounted(!mounted) }}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  )
}

export default App