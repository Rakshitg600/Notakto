import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      padding: 20,
      width: '100%',
      maxWidth: 400,
      backgroundColor: 'black',
    },
    title: {
      fontSize: 35,
      fontFamily: 'pixelfont',
      color: 'white',
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      padding: 15,
      marginVertical: 5,
      backgroundColor: 'blue',
    },
    buttonText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'pixelfont',
      textAlign: 'center',
    },
    cancelText:{
      color: 'white',
      fontSize: 35,
      fontFamily: 'pixelfont',
      textAlign: 'center',
    },
    cancelButton: {
      marginTop: 15,
      backgroundColor: 'red',
      padding: 12,
    },
    difficultyText: {
      color: '#333',
      fontSize: 14,
    },
  });
