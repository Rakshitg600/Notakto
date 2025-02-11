import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


type WinnerModalProps = {
  visible: boolean;
  winner: string;
  onPlayAgain: () => void;
  onMenu: () => void;
};

const WinnerModal = ({ visible, winner, onPlayAgain, onMenu }: WinnerModalProps) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Game Over!</Text>
          <Text style={styles.winnerText}>{(winner=='You')?(`You won!`):(`${winner} wins`)}</Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  winnerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 0,
    minWidth: 100,
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#0000FF',
  },
  menuButton: {
    backgroundColor: '#0000FF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WinnerModal;