import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import type { BoardSize, BoardConfigModalProps } from '../../services/types';
import {styles} from '../../styles/boardconfigmodel';


const BoardConfigModal = ({visible, currentBoards, currentSize, onConfirm, onCancel}: BoardConfigModalProps) => {
  const [selectedBoards, setSelectedBoards] = useState(currentBoards);
  const [selectedSize, setSelectedSize] = useState<BoardSize>(currentSize);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <Text style={styles.sectionTitle}>Number of Boards</Text>
          <View style={styles.buttonGroup}>
            {[1, 2, 3, 4, 5].map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.sizeButton, selectedBoards === num && styles.selected]}
                onPress={() => setSelectedBoards(num)}
              >
                <Text style={styles.buttonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Board Size</Text>
          <View style={styles.buttonGroup}>
            {([2, 3, 4, 5] as BoardSize[]).map(size => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, selectedSize === size && styles.selected]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.buttonText}>{size}x{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onConfirm(selectedBoards, selectedSize)}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default BoardConfigModal;
