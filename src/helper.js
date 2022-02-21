const initialState = Array(10).fill().map( () => Array(10).fill(false));

function createGameOfLifeSim(){
  let state = initialState

  function getNumberOfNeighbors(rowIdx, colIdx){
    const neighborIndices = [
      [rowIdx - 1, colIdx - 1],
      [rowIdx - 1, colIdx],
      [rowIdx - 1, colIdx + 1],
      [rowIdx, colIdx - 1],
      [rowIdx, colIdx + 1],
      [rowIdx + 1, colIdx - 1],
      [rowIdx + 1, colIdx],
      [rowIdx + 1, colIdx + 1],
    ]

    const neighbors = neighborIndices
      .map(([row, col]) => state?.[row]?.[col] )
      .filter(Boolean).length

      return neighbors.length;
  }
  const randomBool = () => Boolean(Math.round(Math.random()))

  return {
    tick() {
      const nextState = state.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const neighbors = getNumberOfNeighbors(rowIdx, colIdx)

          if(!cell) return neighbors === 3;
          switch (neighbors) {
            case 2:
            case 3:
              return true
            default:
              return false
          }
        })
      })

      state = nextState

      return this;
    },
    getState(){
      return state;
    },
    randomize() {
      state = state.map(row => row.map(randomBool))
      return this
    },
    toggleCell(rowIdx, colIdx) {
      state[rowIdx][colIdx] = !state[rowIdx][colIdx]
      state = state.map(row => row.map(x => x))
      return this
    },
  }
}

export default createGameOfLifeSim