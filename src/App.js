import { useState, useEffect } from "react";
import "./styles.css";
import Header from "./Header";
import Footer from "./Footer";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winnerInfo }) {
  function handleClick(i) {
    if (winnerInfo || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let status = winnerInfo
    ? `Ganador: ${winnerInfo.winner}`
    : `Siguiente Jugador: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">

        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const [winnerModal, setWinnerModal] = useState({ show: false, winner: null });

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winnerInfo = calculateWinner(currentSquares);

  // Mostrar el modal cuando haya un ganador
  useEffect(() => {
    if (winnerInfo && !winnerModal.show) {
      setWinnerModal({ show: true, winner: winnerInfo.winner });
    }
  }, [winnerInfo, winnerModal.show]);

  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: null },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    const description =
      move > 0 ? `Ir a la jugada #${move}` : "Ir al inicio del juego";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = ascending ? moves : moves.slice().reverse();

  // Función para cerrar el modal
  // Función para cerrar el modal
  function closeModal() {
    setWinnerModal({ show: false, winner: null });
  }

  return (

    <div>   
      <Header />


      <div className="game">

        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winnerInfo={winnerInfo}
          />
        </div>
        <div className="game-info">
          <button onClick={() => setAscending(!ascending)}>
            {ascending ? "Orden descendente" : "Orden ascendente"}
          </button>
          <ol>{sortedMoves}</ol>
        </div>

        {/* Modal */}
        {winnerModal.show && (
          <div id="winnerModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p id="winnerMessage">¡Felicidades Ganaste!: {winnerModal.winner}!</p>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>

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
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Game;
