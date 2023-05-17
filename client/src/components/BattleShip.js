import '../styles/BattleShip.css';
import { useEffect, useRef } from 'react'


// May change later (games are usually 10 x 10)
const width = 10;
let angle = 0;
class Ship {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}

const destroyer = new Ship('destroyer', 2);
const submarine = new Ship('submarine', 3);
const cruiser = new Ship('cruiser', 3);
const battleship = new Ship('battleship', 4);
const carrier = new Ship('carrier', 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];
let notDropped;


function checkValidity(allBoardBlocks, isVertical, startInd, ship) {
    let valid, shipBlocks = [];
    let validStart = Number(isVertical ? startInd <= width * width - width * ship.length ? startInd : 
                    startInd - ship.length * width + width :
                    // horizontal
                    startInd <= width * width - ship.length ? startInd : width * width - ship.length)

    for (let i=0; i < ship.length; i++) {
        if(isVertical) {
            shipBlocks.push(allBoardBlocks[validStart + i * width]);
        } else {
            shipBlocks.push(allBoardBlocks[validStart + i]);
        }
    }

    if(isVertical) {
        shipBlocks.every((_shipBlock, index) => {
            // console.log(shipBlocks[0].id, 90 + (width * index + 1));
            valid = shipBlocks[0].id < 90 + (width * index + 1)});
    } else {
        shipBlocks.every((_shipBlock, index) => {
            // console.log(shipBlocks[0].id % width, width - (shipBlocks.length - (index + 1)));
            valid = shipBlocks[0].id % width < width - (shipBlocks.length - (index + 1))});
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));

    return { shipBlocks, valid, notTaken }
}

function addShipPiece(user, ship, startId) {
    const allBoardBlocks = document.querySelectorAll(`#${user} div`);

    let randomStartInd = Math.floor(Math.random() * width * width);
    let isVertical = user === 'player1' ? angle === 90 : Math.random() < 0.5;

    let startInd = startId ? startId : randomStartInd
    
    const { shipBlocks, valid, notTaken } = checkValidity(allBoardBlocks, isVertical, startInd, ship);

    if (valid && notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add(ship.name);
            shipBlock.classList.add('taken');
        })
    } else {
        if (user === 'player2') addShipPiece(user, ship, startId);
        if (user === 'player1') notDropped = true;
    }
}

function highlightArea(startInd, ship) {
    const allBoardBlocks = document.querySelectorAll('#player1 div');
    let isVertical = angle === 90;
    const { shipBlocks, valid, notTaken } = checkValidity(allBoardBlocks, isVertical, startInd, ship);
    if (valid && notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add('hover');
            setTimeout(() => shipBlock.classList.remove('hover'), 300);
        })
    }
}


function BattleShip() {

    const piecesRef = useRef(null);
    const gameBoardRef = useRef(null);
    const gameInfo = useRef(null);

    let draggedShip;
    let gameOver = false;
    let player1Hits = [];
    let player2Hits = [];

    useEffect(() => {
        createBoard();
        // const optionShips = Array.from(piecesRef.current.children);
        // optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

        // const allPlayer1Blocks = document.querySelectorAll('#player1 div');
        // allPlayer1Blocks.forEach(playerBlock => {
        //     playerBlock.addEventListener('dragover', dragOver);
        //     playerBlock.addEventListener('drop', dropShip);
        // });
    }, []);

    // TODO: change all the gameInfo.current.querySelector (no need to call it every time)
    function startGame() {
        if (piecesRef.current.children.length !== 0) {
            gameInfo.current.querySelector('#info').textContent = 'Please place all your pieces first!';
        } else {
            const allBoardBlocks = document.querySelectorAll('#player2 div');
            allBoardBlocks.forEach(block => block.addEventListener('click', handleClick));
        }
    }
    
    function handleClick(e) {
        if (!gameOver) {
            if (e.target.classList.contains('taken')) {
                e.target.classList.add('hit');
                gameInfo.current.querySelector('#info').textContent = 'You hit a ship!';
                let classes = Array.from(e.target.classList);
                classes = classes.filter(className => className !== 'block' && className !== 'hit' && className !== 'taken');
                player1Hits.push(...classes);
                console.log(player1Hits);
                return;
            } else {
                e.target.classList.add('miss');
                gameInfo.current.querySelector('#info').textContent = 'You missed!';
            }
            const allBoardBlocks = document.querySelectorAll('#player2 div');
            allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)));
            // TODO: change to handle if multiplayer
            setTimeout(computerTurn, 3000);
        }
    }

    function computerTurn() {
        if (!gameOver) {
            gameInfo.current.querySelector('#turn-display').textContent = 'Computers Turn';
            gameInfo.current.querySelector('#info').textContent = 'Thinking...';

            setTimeout(() => {
                let randomInd = Math.floor(Math.random() * width * width);
                const allBoardBlocks = document.querySelectorAll('#player1 div');

                if(allBoardBlocks[randomInd].classList.contains('taken') && allBoardBlocks[randomInd].classList.contains['hit']) {
                    computerTurn();
                    return;
                } else if (allBoardBlocks[randomInd].classList.contains('taken') && !allBoardBlocks[randomInd].classList.contains('boom')) {
                    allBoardBlocks[randomInd].classList.add('hit');
                    gameInfo.current.querySelector('#info').textContent = 'The computer hit you!';
                    let classes = Array.from(allBoardBlocks[randomInd].classList);
                    classes = classes.filter(className => className !== 'block' && className !== 'hit' && className !== 'taken');
                    player2Hits.push(...classes);
                    console.log(player1Hits);
                } else {
                    gameInfo.current.querySelector('#info').textContent = 'The computer missed!';
                    allBoardBlocks[randomInd].classList.add('miss');
                }
            }, 3000);

            setTimeout(() => {
                gameInfo.current.querySelector('#info').textContent = 'Your Turn!';
                gameInfo.current.querySelector('#turn-display').textContent = 'Your Turn!';
                const allBoardBlocks = document.querySelectorAll('#player2 div');
                allBoardBlocks.forEach(block => block.addEventListener('click', handleClick));
            }, 6000);
        }
    }

    function dragStart(e) {
        notDropped = false;
        draggedShip = e.target;
    }

    function dragOver(e) {
        e.preventDefault();
        const ship = ships[draggedShip.id]
        highlightArea(e.target.id, ship)
    }

    function dropShip(e) {
        const startId = e.target.id;
        const ship = ships[draggedShip.id]
        addShipPiece('player1', ship, startId);
        if (!notDropped) {
            draggedShip.remove();
        }
    }

    function flipShips() {
        angle = (angle === 90) ? 0 : 90;
        console.log(angle);
        const pieces = piecesRef.current.querySelectorAll('.ship-preview');
        pieces.forEach(ship => ship.style.transform = `rotate(${angle}deg)`);
    }

    function createBoard() {
        if (gameBoardRef.current.children.length === 0) {
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

            const optionShips = Array.from(piecesRef.current.children);
            optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

            const allPlayer1Blocks = document.querySelectorAll('#player1 div');
            allPlayer1Blocks.forEach(playerBlock => {
                playerBlock.addEventListener('dragover', dragOver);
                playerBlock.addEventListener('drop', dropShip);
            });
            // TODO: Change later for multiplayer (this auto creates computer player board)
            ships.forEach(ship => addShipPiece('player2', ship));
        }
    }

    return (
      <>
        <div ref={gameInfo} className="game-info">
            <p>Turn: <span id="turn-display"></span></p>
            <p>Info: <span id="info"></span></p>
        </div>

        <div ref={gameBoardRef} className="game-container d-flex justify-content-between mb-4"></div>

        <div ref={piecesRef} className="pieces-container d-flex align-items-center">
            <div id="0" className="destroyer destroyer-inventory ship-preview" draggable="true"></div>
            <div id="1" className="submarine submarine-inventory ship-preview" draggable="true"></div>
            <div id="2" className="cruiser cruiser-inventory ship-preview" draggable="true"></div>
            <div id="3" className="battleship battleship-inventory ship-preview" draggable="true"></div>
            <div id="4" className="carrier carrier-inventory ship-preview" draggable="true"></div>
        </div>

        <button id="flip-button" onClick={flipShips}>FLIP</button>
        <button id="start-button" onClick={startGame}>START</button>
      </>
  );
}

export default BattleShip;
