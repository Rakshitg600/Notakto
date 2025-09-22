import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import {styles} from '../../styles/tutorialModal';
import type { TutorialModalProps } from '../../services/types';


const TutorialModal = ({ visible, onClose }: TutorialModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>How   to   Play Notakto</Text>

        <Text style={styles.modalText}>
          • Both players use X marks{'\n'}
          • Game is played on three 3x3 boards{'\n'}
          • Players alternate placing Xs{'\n'}
          • Any board with 3 Xs in a row becomes dead{'\n'}
          • Last player to make a valid move loses{'\n'}
          • Strategy: Force opponent to make final move!
        </Text>

        <TouchableOpacity onPress={onClose}>
          <View style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Close    Tutorial</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


export default TutorialModal;
