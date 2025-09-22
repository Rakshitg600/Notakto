import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    padding: 20,
    width: '80%',
    backgroundColor: 'black',
  },
  modalTitle: {
    fontSize: 30,
    fontFamily: 'pixelvt',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: 'pixelvt',
    backgroundColor: 'white',
    color: 'red',
  },
  modalButton: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'pixelvt',
  },
});
