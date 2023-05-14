import '../styles/BattleShip.css';
import { useEffect, useRef } from 'react'

function BattleShip() {

    const piecesRef = useRef(null);
    const gameBoardRef = useRef(null);
    let angle = 0;
    // May change later (games are usually 10 x 10)
    const width = 10;

    function flipShips() {
        angle = (angle === 90) ? 0 : 90;
        console.log(angle);
        const pieces = piecesRef.current.querySelectorAll('.ship-preview');
        pieces.forEach(ship => ship.style.transform = `rotate(${angle}deg)`);
    }

    function createBoard() {
        const boardColors = ['aqua', 'lightcoral']
        for(let i=1; i < 3; i++) {
            const gameBoardContainer = document.createElement('div');
            gameBoardContainer.classList.add('game-board');
            gameBoardContainer.style.backgroundColor = boardColors[i-1];
            gameBoardContainer.id = `player${i}`
            gameBoardRef.current.append(gameBoardContainer);

            for (let i=0; i < width * width; i++) {
                const block = document.createElement('div');
                block.classList.add('block');
                block.id = i;
                gameBoardContainer.append(block);
            }
        }
    }

    return (
      <>
        <div className="game-info">
            <span id="turn-display"></span>
            <span id="info"></span>
        </div>

        <div ref={gameBoardRef} className="game-container d-flex justify-content-between mb-4"></div>

        <div ref={piecesRef} className="pieces-container d-flex align-items-center">
            <div className="destroyer ship-preview" draggable="true"></div>
            <div className="submarine ship-preview" draggable="true"></div>
            <div className="cruiser ship-preview" draggable="true"></div>
            <div className="battleship ship-preview" draggable="true"></div>
            <div className="carrier ship-preview" draggable="true"></div>
        </div>

        <button id="flip-button" onClick={flipShips}>FLIP</button>
        <button id="start-button" onClick={createBoard}>START</button>
      </>
  );
}

export default BattleShip;
