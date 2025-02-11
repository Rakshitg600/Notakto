import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TutorialModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TutorialModal = ({ visible, onClose }: TutorialModalProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>How to Play Notakto</Text>
        
        <Text style={styles.modalText}>
          • Both players use X marks{"\n"}
          • Game is played on three 3x3 boards{"\n"}
          • Players alternate placing Xs{"\n"}
          • Any board with 3 Xs in a row becomes dead{"\n"}
          • Last player to make a valid move loses{"\n"}
          • Strategy: Force opponent to make final move!
        </Text>

        <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
          <View style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Got It!</Text>
          </View>
        </TouchableOpacity>
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
    padding: 20,
    borderRadius: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: 'white'
  },
  modalTitle: {
    fontSize: 26,
    fontFamily: 'Pixelify_Sans',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FF0000',
    textShadowColor: '#FFFF00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Pixelify_Sans',
    lineHeight: 26,
    marginBottom: 20,
    color:'black',
    textAlign: 'center',
  },
  modalButton: {
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Pixelify_Sans',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TutorialModal;
