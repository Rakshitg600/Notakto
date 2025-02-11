import type { BoardState, DifficultyLevel, BoardSize } from './types';

const MAX_DEPTH = 4; // Maximum allowed search depth

const getWinPatterns = (size: number) => {
  const patterns = [];
  // Rows
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({length: size}, (_, j) => i * size + j));
  }
  // Columns
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({length: size}, (_, j) => i + j * size));
  }
  // Diagonals
  patterns.push(Array.from({length: size}, (_, i) => i * (size + 1)));
  patterns.push(Array.from({length: size}, (_, i) => (i + 1) * (size - 1)));
  return patterns;
};

const evaluateBoard = (board: BoardState, boardSize: number) => {
  const winPatterns = getWinPatterns(boardSize);
  let score = 0;
  
  winPatterns.forEach(pattern => {
    const xCount = pattern.filter(i => board[i] === 'X').length;
    const empty = pattern.filter(i => board[i] === '').length;
    
    if (xCount === pattern.length) score += 100;
    if (xCount === pattern.length - 1 && empty === 1) score += 10;
    if (xCount === pattern.length - 2 && empty === 2) score += 1;
  });
  
  return score;
};

const isBoardDead = (board: BoardState, boardSize: number) => {
  return getWinPatterns(boardSize).some(pattern =>
    pattern.every(index => board[index] === 'X')
  );
};

const getValidMoves = (boards: BoardState[], boardSize: number) => {
  const validMoves: { boardIndex: number; cellIndex: number }[] = [];
  
  boards.forEach((board, boardIndex) => {
    if (!isBoardDead(board, boardSize)) {
      board.forEach((cell, cellIndex) => {
        if (cell === '') validMoves.push({ boardIndex, cellIndex });
      });
    }
  });
  
  return validMoves;
};

const updateBoards = (boards: BoardState[], move: { boardIndex: number; cellIndex: number }) => {
  return boards.map((b, i) => 
    i === move.boardIndex ? [
      ...b.slice(0, move.cellIndex),
      'X',
      ...b.slice(move.cellIndex + 1)
    ] : [...b]
  );
};

export const findBestMove = (
  boards: BoardState[],
  difficulty: DifficultyLevel,
  boardSize: BoardSize
) => {
  const validMoves = getValidMoves(boards, boardSize);
  if (validMoves.length === 0) return null;

  const depth = Math.min(difficulty + 1, MAX_DEPTH);
  let bestScore = -Infinity;
  const bestMoves: typeof validMoves = [];

  for (let currentDepth = 1; currentDepth <= depth; currentDepth++) {
    const stack: any[] = [{
      boards,
      depth: currentDepth,
      isMaximizing: true,
      alpha: -Infinity,
      beta: Infinity,
      moveHistory: []
    }];

    while (stack.length > 0) {
      const { boards: currentBoards, depth, isMaximizing, alpha, beta, moveHistory } = stack.pop()!;
      if (depth === 0 || currentBoards.every((b: BoardState) => isBoardDead(b, boardSize))) {

       const score = evaluateBoard(currentBoards[0], boardSize);
        if (moveHistory.length > 0) {
          const move = moveHistory[0];
          if (score > bestScore) {
            bestScore = score;
            bestMoves.length = 0;
            bestMoves.push(move);
          } else if (score === bestScore) {
            bestMoves.push(move);
          }
        }
        continue;
      }

      const moves = getValidMoves(currentBoards, boardSize);
      if (isMaximizing) {
        let value = -Infinity;
        let localAlpha = alpha;
        
        for (const move of moves) {
          const newBoards = updateBoards(currentBoards, move);
          stack.push({
            boards: newBoards,
            depth: depth - 1,
            isMaximizing: false,
            alpha: localAlpha,
            beta,
            moveHistory: [move, ...moveHistory]
          });
          
          // Update value based on previous results
          if (bestScore > value) value = bestScore;
          if (value >= beta) break;
          localAlpha = Math.max(localAlpha, value);
        }
      } else {
        let value = Infinity;
        let localBeta = beta;
        
        for (const move of moves) {
          const newBoards = updateBoards(currentBoards, move);
          stack.push({
            boards: newBoards,
            depth: depth - 1,
            isMaximizing: true,
            alpha,
            beta: localBeta,
            moveHistory: [move, ...moveHistory]
          });
          
          // Update value based on previous results
          if (bestScore < value) value = bestScore;
          if (value <= alpha) break;
          localBeta = Math.min(localBeta, value);
        }
      }
    }
  }

  return bestMoves.length > 0 
    ? bestMoves[Math.floor(Math.random() * bestMoves.length)]
    : validMoves[Math.floor(Math.random() * validMoves.length)];
};