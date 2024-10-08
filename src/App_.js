import { useState } from "react";
//value almacena el valor y setValue es una función que se puede usar para cambiar el valor.
//   const [value, setValue] = useState(null);

//   function handleClick() {
//     setValue('X');
//   }
// return <button className="square">X</button>//devuelve un boton

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
/**
 * La función handleClick crea una copia de la matriz squares (nextSquares)
 *  con el método JavaScript slice() Array. Luego, handleClick actualiza
 * la matriz nextSquares para agregar X al primer cuadrado (índice [0]).
 */

//Componente padre
export default function Board() {
  //funcion llamada board
  const [xIsNext, setXIsnext] = useState(true);
  //VARIABLE DE ESTADO, MATRIZ DE 9 ELEMENTOS
  //Array(9).fill(null) crea una matriz con nueve elementos y establece cada uno de ellos en null
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    //comprobando primero si el cuadrado ya tiene un valor X u O.
    if (calculateWinner(squares) ||squares[i]) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares); //ACTUALIZA LA MATRIZ Y LE AGREGA x a l primer cuadarado indice 0
    setXIsnext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        ></Square>
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        ></Square>
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        ></Square>
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        ></Square>
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        ></Square>
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        ></Square>
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        ></Square>
      </div>
    </>
  );
}
// función de ayuda llamada calculateWinner
// que toma una matriz de 9 cuadrados, busca un ganador y devuelve 'X', 'O' o null según corresponda.
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
