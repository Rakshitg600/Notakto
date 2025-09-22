import React from 'react';
import { Modal, View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/difficultymodal';
import { DifficultyModalProps } from '../../services/types';


export const DifficultyModal = ({ visible, onSelect, onClose }: DifficultyModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>

        {[1, 2, 3, 4, 5].map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.button]}
            onPress={() => onSelect(level)}
          >
            <Text style={styles.buttonText}>
              Level {level}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
