import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'black',
      padding: 20,
      width: '90%',
    },
    sectionTitle: {
      fontSize: 35,
      fontFamily: 'pixelfont',
      marginVertical: 10,
      color: 'red',
    },
    buttonGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 15,
    },
    sizeButton: {
      padding: 12,
      backgroundColor: 'blue',
      minWidth: 60,
      alignItems: 'center',
    },
    selected: {
      backgroundColor: 'red',
    },

    buttonText: {
      color: 'white',
      fontFamily: 'pixelfont',
      fontSize: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    cancelButton: {
      backgroundColor: 'blue',
      padding: 12,
      flex: 1,
      marginRight: 8,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: 'blue',
      padding: 12,
      flex: 1,
      alignItems: 'center',
    },
  });
