import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      padding: 20,
      width: '80%',
      backgroundColor: 'blue',
    },
    modalTitle: {
      fontSize: 30,
      fontFamily: 'pixelfont',
      marginBottom: 15,
      textAlign: 'center',
      color: 'red',
    },
    modalText: {
      fontSize: 20,
      lineHeight: 24,
      marginBottom: 20,
      color: 'white',
      fontFamily: 'pixelvt',
    },
    modalButton: {
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: 'red',
    },
    modalButtonText: {
      color: 'white',
      fontSize: 25,
      fontFamily: 'pixelfont',
    },
  });
