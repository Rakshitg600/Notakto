import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import type { BoardState } from '../types';

type BoardProps = {
  boardIndex: number;
  boardState: BoardState;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isDead: boolean;
  boardSize: number;
};

const Board = ({ boardIndex, boardState, makeMove, isDead, boardSize }: BoardProps) => {
  return (
    <View style={[styles.board, isDead && styles.deadBoard]}>
      {Array.from({ length: boardSize }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: boardSize }).map((_, col) => {
            const cellIndex = row * boardSize + col;
            return (
              <Cell
                key={cellIndex}
                boardIndex={boardIndex}
                cellIndex={cellIndex}
                value={boardState[cellIndex]}
                onPress={makeMove}
                disabled={isDead}
                boardSize={boardSize}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 0,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deadBoard: {
    opacity: 0.6,
    backgroundColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;