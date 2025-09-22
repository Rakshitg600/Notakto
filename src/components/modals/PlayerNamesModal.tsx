import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import {styles} from '../../styles/playerNamesModal';
import type { PlayerNamesModalProps } from '../../services/types';


const PlayerNamesModal = ({ visible, onSubmit, initialNames }: PlayerNamesModalProps) => {
  const [player1, setPlayer1] = useState(initialNames?.[0] || 'Player 1');
  const [player2, setPlayer2] = useState(initialNames?.[1] || 'Player 2');
  const handleSubmit = () => {
    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      Alert.alert('Duplicate Names', 'Player 1 and Player 2 cannot have the same name.');
      return;
    }
    onSubmit(player1 || 'Player 1', player2 || 'Player 2');
  };
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
            onPress={handleSubmit}
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


export default PlayerNamesModal;
