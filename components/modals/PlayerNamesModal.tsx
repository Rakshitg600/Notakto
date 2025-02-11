import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';

type PlayerNamesModalProps = {
  visible: boolean;
  onSubmit: (p1: string, p2: string) => void;
  initialNames?: [string, string];
};

const PlayerNamesModal = ({ visible, onSubmit, initialNames }: PlayerNamesModalProps) => {
  const [player1, setPlayer1] = useState(initialNames?.[0] || 'Player 1');
  const [player2, setPlayer2] = useState(initialNames?.[1] || 'Player 2');
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Player Names</Text>

          <TextInput
            style={styles.input}
            placeholder="Player 1 Name"
            value={player1}
            onChangeText={setPlayer1}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Player 2 Name"
            value={player2}
            onChangeText={setPlayer2}
            autoCapitalize="words"
          />

          <TouchableOpacity 
            onPress={() => onSubmit(player1 || 'Player 1', player2 || 'Player 2')}
          >
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Start Game</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'black',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white',
    color:'red'
  },
  modalButton: {
    padding: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#0000FF',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlayerNamesModal;
