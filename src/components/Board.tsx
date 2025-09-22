import React from 'react';
import { View } from 'react-native';
import Cell from './Cell';
import type {BoardProps } from '../services/types';
import {styles} from '../styles/board';


const Board = ({ boardIndex, boardState, makeMove, isDead, boardSize }: BoardProps) => {
  return (
    <View style={[styles.board, isDead && styles.deadBoard]}>
      {Array.from({ length: boardSize }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: boardSize }).map((__, col) => {
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



export default Board;
