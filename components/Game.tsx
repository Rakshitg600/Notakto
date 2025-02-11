import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Dimensions,
  Animated, Easing, TouchableWithoutFeedback
} from 'react-native';
import Board from './Board';

type GameProps = {
  currentPlayer: string;
  boards: string[][];
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isBoardDead: (board: string[]) => boolean;
  undoMove: () => void;
  resetGame: () => void;
  exitToMenu: () => void;
  gameMode: 'vsComputer' | 'vsPlayer' | null;
  numberOfBoards: number;
  onBoardConfigPress: () => void;
  difficulty?: number;
  onDifficultyPress?: () => void;
  boardSize: number;
  onResetNames: () => void;
  onUndo: () => void;
  onSkip: () => void;
  coins: number;
  experience: number;
  canUndo: boolean;
  gameHistoryLength: number;
};

type AnimatedButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  width?: number;
};

const AnimatedButton = ({ onPress, label, disabled = false, width }: AnimatedButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start(() => {
      if (!disabled) onPress();
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width }}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <View style={[styles.menuButton, disabled && styles.disabledButton]}>
          <Text style={styles.menuButtonText}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const Game = (props: GameProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = Dimensions.get('window');

  const toggleMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!isMenuOpen) setIsMenuOpen(true);
    });
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setIsMenuOpen(false));
  };

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{props.currentPlayer}</Text>
        {props.gameMode === 'vsComputer' && (
          <View style={styles.economyInfo}>
            <Text style={styles.economyText}>Coins: {props.coins}</Text>
            <Text style={styles.economyText}>XP: {props.experience}</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.boardsContainer}>
        {props.boards.map((board, index) => (
          <Board
            key={index}
            boardIndex={index}
            boardState={board}
            makeMove={props.makeMove}
            isDead={props.isBoardDead(board)}
            boardSize={props.boardSize}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <AnimatedButton onPress={toggleMenu} label="Game Settings ⚙️" width={screenWidth * 0.9} />
      </View>

      {isMenuOpen && (
        <>
          <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.overlayBackground} />
            </TouchableWithoutFeedback>
          </Animated.View>

          <Animated.View style={[styles.menuContainer, { transform: [{ translateY: menuTranslateY }] }]}>
            <View style={styles.menuPanel}>
              <AnimatedButton onPress={props.onBoardConfigPress} label="Game Configuration" width={screenWidth * 0.8} />
              {props.gameMode === 'vsPlayer' && <AnimatedButton onPress={props.onResetNames} label="Reset Names" width={screenWidth * 0.8} />}
              {props.gameMode === 'vsComputer' && (
                <>
                  <AnimatedButton
                    onPress={props.onUndo}
                    label="Undo (100 coins)"
                    disabled={!props.canUndo}
                    width={screenWidth * 0.8}
                  />
                  <AnimatedButton
                    onPress={props.onSkip}
                    label="Skip a Move (200 coins)"
                    width={screenWidth * 0.8}
                  />
                  <AnimatedButton
                    onPress={props.onDifficultyPress!}
                    label={`AI Level: ${props.difficulty}`}
                    width={screenWidth * 0.8}
                  />
                </>
              )}

              <AnimatedButton onPress={props.resetGame} label="Reset Game" width={screenWidth * 0.8} />
              <AnimatedButton onPress={props.exitToMenu} label="Main Menu" width={screenWidth * 0.8} />
              <AnimatedButton onPress={closeMenu} label="Return to Game" width={screenWidth * 0.8} />
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    //padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 38,
    fontFamily: 'Pixelify_Sans',
    color: '#FF0000',
    textShadowColor: '#FFFF00',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
  },
  economyInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  economyText: {
    color: '#FFF',
    fontSize: 16,
  },
  boardsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footer: {
    alignItems: 'center',
  },
  menuButton: {
    paddingVertical: 15,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#0000FF',
    alignItems: 'center',
    marginHorizontal: 0
  },
  disabledButton: {
    backgroundColor: '#555',
    borderColor: '#888',
  },
  menuButtonText: {
    fontSize: 20,
    fontFamily: 'Pixelify_Sans',
    color: '#FFFFFF',
  },
  overlayBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    padding: 16,
  },
  menuPanel: {
    alignItems: 'center',
    gap: 10,
  },
});

export default Game;
