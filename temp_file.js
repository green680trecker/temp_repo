import { useState } from 'react';

function My_Sq({ x, onSqClick }) {
    return (
        <button className="square" onClick={onSqClick}>
            {x}
        </button>
    );
}

function My_board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <My_Sq x={squares[0]} onSqClick={() => handleClick(0)} />
                <My_Sq x={squares[1]} onSqClick={() => handleClick(1)} />
                <My_Sq x={squares[2]} onSqClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <My_Sq x={squares[3]} onSqClick={() => handleClick(3)} />
                <My_Sq x={squares[4]} onSqClick={() => handleClick(4)} />
                <My_Sq x={squares[5]} onSqClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <My_Sq x={squares[6]} onSqClick={() => handleClick(6)} />
                <My_Sq x={squares[7]} onSqClick={() => handleClick(7)} />
                <My_Sq x={squares[8]} onSqClick={() => handleClick(8)} />
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSq = history[currentMove];

    function handleUndo() {
        if (currentMove > 0) {
            setCurrentMove(currentMove - 1);
        }
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>

        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <My_board xIsNext={xIsNext} squares={currentSq} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={handleUndo} disabled={currentMove === 0}>
                    Undo
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
