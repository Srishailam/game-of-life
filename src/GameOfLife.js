import React from "react"
import createGameOfLifeSim from "./helper"



const INTERVAL = 150

function GameOfLife() {
  const simRef = React.useRef(createGameOfLifeSim())
  const [grid, setGrid] = React.useState(simRef.current.getState())
  const [gameState, setGameState] = React.useState('paused')

  React.useEffect(() => {
    if (gameState === 'paused') return

    const intervalId = setInterval(() => {
      setGrid(simRef.current.tick().getState())
    }, INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [gameState])

  const handleGameStateToggle = React.useCallback(() => {
    setGameState(s => (s === 'paused' ? 'running' : 'paused'))
  }, [])

  const handleRandomize = React.useCallback(() => {
    setGrid(simRef.current.randomize().getState())
  }, [])

  const handleToggleCell = React.useCallback(
    (rowIdx, colIdx) => () => {
      setGrid(simRef.current.toggleCell(rowIdx, colIdx).getState())
    },
    []
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} style={{ display: 'flex' }}>
              {row.map((cell, colIdx) => {
                return (
                  <button
                    style={{width: '10px', height: '10px'}}
                    key={colIdx}
                    onClick={handleToggleCell(rowIdx, colIdx)}
                    type="button"
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleGameStateToggle} type="button">
          {gameState === 'paused' ? 'Start' : 'Stop'}
        </button>
        <button onClick={handleRandomize} type="button">
          Randomize
        </button>
      </div>
    </div>
  )
}

export default GameOfLife