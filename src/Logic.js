// Turnos.
export const TURNS = {
  X: "❌",
  O: "⚪",
};

// Combinaciones ganadoras.
export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Método para chequear el ganador.
export const checkWinner = (boardToCheck) => {
  // Revisamos todas las combinaciones ganadoras, para ver si X u O ganó.
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // No hay ganador.
  return null;
};

export const checkEndGame = (newBoard) => {
  // Revisamos si hay empate. Sino hay más espacios vacíos en el tablero.
  return newBoard.every((square) => square !== null);
};

// Guardar partida en el LocalStorage.
export const saveGameToLocalStorage = (newBoard, newTurn) => {
  window.localStorage.setItem("board", JSON.stringify(newBoard));
  window.localStorage.setItem("turn", newTurn);
};

// Resetear el localStorage.
export const ResetLocalStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
