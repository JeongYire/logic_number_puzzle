import React, { useState } from 'react'
import GameBoard from './gameBoard'
import GameScreen from './gameScreen'
import ToolBoard from './toolBoard'


function App() {

  return (
    <>
      <GameScreen>
        <React.Fragment>
          <GameBoard />
          <ToolBoard />
        </React.Fragment>
      </GameScreen>
    </>
  )
}

export default App
