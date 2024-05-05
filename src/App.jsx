import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './assets/components/Square.jsx';
import { WinnerModal } from './assets/components/WinnerModal.jsx';
import { TURNS, checkWinner, checkEndGame, saveGameToLocalStorage, ResetLocalStorage } from './Logic.js';

function App() {
  // Posiciones del tablero.
  const [board, setBoard] = useState(() => {
    // Si hay una partida guardada.
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  // Turno altual.
  const [turn, setTurn] = useState(() => {
    // Si hay una partida guardada.
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  // Tener al ganador: null (no hay ganador) y false (hay un empate).
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    // Resetear todos los estados.
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    // Resetear el localStorage.
    ResetLocalStorage();
  };

  // Método para actualizar el tablero y cambiar el turno.
  const updateBoard = (index) => {
    // No actualizar esta posición si ya tiene algo.
    if (board[index] || winner) return;
    // Actualizar el tablero.
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Cambiar el turno.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Revisar si hay un ganador.
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);  // Ha habido un empete.
    }
  };

  // Guardar partida cada vez que cambie el tablero y el turn.
  useEffect(() => {
    console.log('Efecto');
    saveGameToLocalStorage(board, turn);
  }, [board, turn]);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App