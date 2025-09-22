import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import {styles} from '../styles/cell';
import { CellProps } from '../services/types';

const Cell = ({ boardIndex, cellIndex, value, onPress, disabled, boardSize }: CellProps) => {
  const screenWidth = Dimensions.get('window').width;
  const cellSize = (screenWidth * 0.9) / boardSize - 10;

  return (
    <TouchableOpacity
      style={[styles.cell, { width: cellSize, height: cellSize }]}
      onPress={() => onPress(boardIndex, cellIndex)}
      disabled={disabled || !!value}
      activeOpacity={0.7}
    >
      <Text style={[styles.cellText, { fontSize: cellSize * 0.4 }]}>{value}</Text>
    </TouchableOpacity>
  );
};


export default Cell;
