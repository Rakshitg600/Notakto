import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 80,
    color: 'white',
    textShadowColor: '#FFCC00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 50,
    fontFamily: 'pixelfont',
  },
  menuButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'blue',
    width: '85%',
  },
  menuButtonText: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'pixelfont',
  },
});
