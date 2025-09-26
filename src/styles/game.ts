import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  activityIndicator: {
    marginRight: 8,
  },
  gradientContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: -30,
  },
  economyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  economyText: {
    fontSize: 35,
    color: 'red',
    fontFamily: 'pixelvt',
  },
  header: {
    fontSize: 80,
    fontFamily: 'pixelvt',
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  boardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: 'blue',
  },
  footerText:{
    fontSize: 35,
    color: 'white',
    fontFamily: 'pixelfont',
  },
  menuButton: {
    paddingVertical: 18,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'pixelvt',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayBackground: {
    flex: 1,
  },
  menuPanel: {
    padding: 10,
  },
  menuContent: {
    paddingHorizontal: 5,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: '#555',
    borderColor: '#888',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
