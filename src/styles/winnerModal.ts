import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
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
      fontSize: 50,
      fontFamily: 'pixelvt',
      marginBottom: 10,
      color: 'red',
    },
    winnerText: {
      fontSize: 30,
      color: 'red',
      fontFamily: 'pixelvt',
      marginBottom: 25,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 12,
      paddingHorizontal: 20,
      minWidth: 100,
      alignItems: 'center',
    },
    menuButton: {
      backgroundColor: 'blue',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
