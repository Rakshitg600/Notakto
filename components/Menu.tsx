import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';


const BUTTONS = [
  { label: 'Play vs Player', action: 'vsPlayer' as const },
  { label: 'Play vs Computer', action: 'vsComputer' as const },
  { label: 'Tutorial', action: 'tutorial' as const },
];

const Menu: React.FC<{ startGame: (mode: 'vsPlayer' | 'vsComputer') => void; showTutorial: () => void }> = ({ startGame, showTutorial }) => {
  const buttonScales = useRef(BUTTONS.map(() => new Animated.Value(0))).current;
  const titleTranslateY = useRef(new Animated.Value(-50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.stagger(150,
      buttonScales.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [buttonScales, titleOpacity, titleTranslateY]);

  const handlePressIn = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = (anim: Animated.Value, action: any) => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start(() => {
      if (action === 'tutorial') {
        showTutorial();
      } else {
        startGame(action);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [{ translateY: titleTranslateY }],
            opacity: titleOpacity,
          },
        ]}
      >
        <Text style={styles.title}>Notakto</Text>
      </Animated.View>
      {BUTTONS.map((button, index) => (
        <Animated.View
          key={button.label}
          style={[styles.buttonWrapper, { transform: [{ scale: buttonScales[index] }] }]}
        >
          <TouchableWithoutFeedback
            onPressIn={() => handlePressIn(buttonScales[index])}
            onPressOut={() => handlePressOut(buttonScales[index], button.action)}
          >
            <View style={styles.menuButton}>
              <Text style={styles.menuButtonText}>{button.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      ))}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Pixelify_Sans',
    color: '#FF0000',
    textShadowColor: '#FFFF00',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    letterSpacing: 2,
  },
  buttonWrapper: {
    marginVertical: 10,
  },
  menuButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 0,
    width: width * 0.7,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#0000FF',
    shadowColor: 'none',
  },
  menuButtonText: {
    fontSize: 20,
    fontFamily: 'Pixelify_Sans',
    color: '#FFFFFF',
  },
});

export default Menu;
