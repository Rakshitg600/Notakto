import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import {styles} from '../../styles/winnerModal';
import type { WinnerModalProps } from '../../services/types';


const WinnerModal = ({ visible, winner, onPlayAgain, onMenu }: WinnerModalProps) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Game Over!</Text>
          <Text style={styles.winnerText}>{(winner === 'You') ? ('You won!') : (`${winner} wins`)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPlayAgain}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Play Again</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={onMenu}>
              <View style={[styles.button, styles.menuButton]}>
                <Text style={styles.buttonText}>Main Menu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
);

export default WinnerModal;
