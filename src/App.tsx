import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, InteractionManager } from 'react-native';
// Components
import Menu from './components/Menu';
import Game from './components/Game';
import TutorialModal from './components/modals/TutorialModal';
import PlayerNamesModal from './components/modals/PlayerNamesModal';
import WinnerModal from './components/modals/WinnerModal';
import BoardConfigModal from './components/modals/BoardConfigModal';
import { DifficultyModal } from './components/modals/DifficultyModal';
// Services, styles, etc.
import { findBestMove } from './services/ai';
import { loadEconomy, saveEconomy, calculateRewards } from './services/economyUtils';
import type { BoardState, GameMode, DifficultyLevel, BoardSize } from './services/types';
import { styles } from './styles/app';
import { playMoveSound, playWinSound } from './services/sounds';
import { useCoins, useXP } from './services/store';
// Firebase module
import { signInWithGoogle, signOutUser, onAuthStateChangedListener, saveEconomyToFirestore, loadEconomyFromFirestore } from './services/firebase';
import Sound from 'react-native-sound';

const App = () => {
  // Game State
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameHistory, setGameHistory] = useState<BoardState[][]>([]);
  const [numberOfBoards, setNumberOfBoards] = useState(3);
  const [boardSize, setBoardSize] = useState<BoardSize>(3);
  const [showBoardConfig, setShowBoardConfig] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1);
  const [showDifficultyModal, setShowDifficultyModal] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [backgroundSound, setBackgroundSound] = useState<Sound | null>(null);

  // Economy State
  const { coins, setCoins } = useCoins();
  const { XP, setXP } = useXP();

  // Player State
  const [player1Name, setPlayer1Name] = useState<string>('Player 1');
  const [player2Name, setPlayer2Name] = useState<string>('Player 2');

  // Modal States
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');

  // Auth user
  const [user, setUser] = useState<any>(null);

  // Game logic functions moved above AI useEffect

  const isBoardDead = useCallback((board: BoardState) => {
    const size = boardSize;
    for (let i = 0; i < size; i++) {
      const row = board.slice(i * size, (i + 1) * size);
      const col = Array.from({ length: size }, (_, j) => board[i + j * size]);
      if (row.every(c => c === 'X') || col.every(c => c === 'X')) {
        return true;
      }
    }
    const diag1 = Array.from({ length: size }, (_, i) => board[i * (size + 1)]);
    const diag2 = Array.from({ length: size }, (_, i) => board[(i + 1) * (size - 1)]);
    return diag1.every(c => c === 'X') || diag2.every(c => c === 'X');
  }, [boardSize]);

  const handleMove = useCallback((boardIndex: number, cellIndex: number) => {
    if (boards[boardIndex][cellIndex] !== '' || isBoardDead(boards[boardIndex])) {
      return;
    }

    const newBoards = boards.map((board, idx) =>
      idx === boardIndex
        ? [
            ...board.slice(0, cellIndex),
            'X',
            ...board.slice(cellIndex + 1),
          ]
        : [...board]
    );

    playMoveSound(mute);
    setBoards(newBoards);
    setGameHistory([...gameHistory, newBoards]);

    if (newBoards.every(board => isBoardDead(board))) {
      const loser = currentPlayer;
      const winningPlayer = loser === 1 ? 2 : 1;
      const isHumanWinner = gameMode === 'vsComputer' && winningPlayer === 1;
      const isComputerWinner = gameMode === 'vsComputer' && winningPlayer === 2;
      const rewards = calculateRewards(isHumanWinner, difficulty, numberOfBoards, boardSize);

      if (isHumanWinner) {
        setCoins(coins + rewards.coins);
        setXP(XP + rewards.xp);
      }
      if (isComputerWinner) {
        setXP(Math.round(XP + rewards.xp * 0.25));
      }
      const winnerName = winningPlayer === 1 ? player1Name : player2Name;
      setWinner(winnerName);
      setShowWinnerModal(true);
      playWinSound(mute);
      return;
    }

    setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
  }, [
    boards,
    coins,
    currentPlayer,
    difficulty,
    gameHistory,
    gameMode,
    isBoardDead,
    mute,
    numberOfBoards,
    player1Name,
    player2Name,
    setCoins,
    setXP,
    setBoards,
    setGameHistory,
    setShowWinnerModal,
    setWinner,
    XP,
    boardSize,
  ]);

  // Initialize background music on mount
  useEffect(() => {
    const sound = new Sound(
      require('../android/app/src/main/res/raw/background.mp3'), // Update path as needed
      error => {
        if (error) {
          console.log('Failed to load background music', error);
          return;
        }
        sound.setNumberOfLoops(-1); // Infinite loop
        setBackgroundSound(sound);
        sound.play();
      }
    );

    return () => {
      if (sound) {
        sound.stop(() => sound.release());
      }
    };
  }, []);

  // Handle mute/unmute of background music
  useEffect(() => {
    if (!backgroundSound) {
      return;
    }

    if (mute) {
      backgroundSound.pause();
    } else {
      backgroundSound.play();
    }
  }, [mute, backgroundSound]);

  // Load economy data and initialize game
  useEffect(() => {
    const loadData = async () => {
      try {
        const economyData = await loadEconomy();
        setCoins(economyData.coins);
        setXP(economyData.experience);
        resetGame(numberOfBoards, boardSize);
      } catch (error) {
        console.error('Failed to load data:', error);
        setCoins(1000);
        setXP(0);
        resetGame(numberOfBoards, boardSize);
      }
    };
    loadData();
  }, [numberOfBoards, boardSize, setCoins, setXP]);

  // Reset game when board configuration changes
  useEffect(() => {
    resetGame(numberOfBoards, boardSize);
  }, [numberOfBoards, boardSize]);

  // Subscribe to Firebase Auth state changes
  useEffect(() => {
    const subscriber = onAuthStateChangedListener(async (usr: { uid: string }) => {
      setUser(usr);
      if (usr) {
        const cloudData = (await loadEconomyFromFirestore(usr.uid)) as
          | { coins: number; experience: number }
          | null;
        if (cloudData) {
          setCoins(cloudData.coins);
          setXP(cloudData.experience);
        } else {
          const localData = await loadEconomy();
          setCoins(localData.coins);
          setXP(localData.experience);
        }
      } else {
        const localData = await loadEconomy();
        setCoins(localData.coins);
        setXP(localData.experience);
      }
    });
    return () => subscriber();
  }, [setCoins, setXP]);

  // Save economy data locally and to Firestore if signed in
  useEffect(() => {
    saveEconomy(coins, XP);
    if (user) {
      saveEconomyToFirestore(user.uid, coins, XP);
    }
  }, [coins, XP, user]);

  // AI Move Handler
  useEffect(() => {
    if (gameMode === 'vsComputer' && currentPlayer === 2) {
      const timeout = setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          const move = findBestMove(boards, difficulty, boardSize, numberOfBoards);
          if (move) {
            handleMove(move.boardIndex, move.cellIndex);
          }
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, boards, difficulty, boardSize, numberOfBoards, handleMove]);

  const resetGame = (num: number, size: BoardSize) => {
    const initialBoards = Array(num)
      .fill(null)
      .map(() => Array(size * size).fill(''));
    setBoards(initialBoards);
    setCurrentPlayer(1);
    setGameHistory([initialBoards]);
    setShowWinnerModal(false);
  };

  const handleBoardConfigChange = (num: number, size: BoardSize) => {
    setNumberOfBoards(Math.min(5, Math.max(1, num)));
    setBoardSize(size);
    setShowBoardConfig(false);
    resetGame(num, size);
  };

  const handleUndo = () => {
    if (gameHistory.length >= 3) {
      if (coins >= 100) {
        setCoins(coins - 100);
        setBoards(gameHistory[gameHistory.length - 3]);
        setGameHistory(h => h.slice(0, -2));
      } else {
        Alert.alert('Insufficient Coins', 'You need at least 100 coins to undo!');
      }
    } else {
      Alert.alert('No Moves', 'There are no moves to undo!');
    }
  };

  const handleSkip = () => {
    if (coins >= 200) {
      setCoins(coins - 200);
      setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
    } else {
      Alert.alert('Insufficient Coins', 'You need at least 200 coins to skip a move!');
    }
  };

  // Authentication handlers
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Data loading handled by auth state listener
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setCoins(1000);
      setXP(0);
      saveEconomy(1000, 0); // Ensure local storage reflects reset
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {gameMode ? (
        <Game
          currentPlayer={currentPlayer === 1 ? player1Name : player2Name}
          boards={boards}
          makeMove={handleMove}
          isBoardDead={isBoardDead}
          onUndo={handleUndo}
          undoMove={handleUndo}
          resetGame={() => resetGame(numberOfBoards, boardSize)}
          exitToMenu={() => {
            setGameMode(null);
          }}
          gameMode={gameMode}
          numberOfBoards={numberOfBoards}
          boardSize={boardSize}
          onBoardConfigPress={() => setShowBoardConfig(true)}
          difficulty={difficulty}
          onDifficultyPress={() => setShowDifficultyModal(true)}
          coins={coins}
          experience={XP}
          canUndo={coins >= 100}
          onResetNames={() => setShowNameModal(true)}
          gameHistoryLength={gameHistory.length}
          onSkip={handleSkip}
          canSkip={coins >= 200}
          toggleMute={() => setMute(!mute)}
          isMuted={mute}
          onAddCoins={amount => setCoins(coins + amount)}
        />
      ) : (
        <Menu
          startGame={mode => {
            if (mode === 'vsPlayer') {
              setShowNameModal(true);
            } else if (mode === 'vsComputer') {
              setPlayer1Name('You');
              setPlayer2Name('Computer');
            }
            setGameMode(mode);
            resetGame(numberOfBoards, boardSize);
          }}
          showTutorial={() => setShowTutorial(true)}
          signIn={handleSignIn}
          signOut={handleSignOut}
          signed={!!user}
        />
      )}

      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />
      <PlayerNamesModal
        visible={showNameModal}
        onSubmit={(p1, p2) => {
          setPlayer1Name(p1 || 'Player 1');
          setPlayer2Name(p2 || 'Player 2');
          setShowNameModal(false);
        }}
        initialNames={[player1Name, player2Name]}
      />
      <WinnerModal
        visible={showWinnerModal}
        winner={winner}
        onPlayAgain={() => {
          setShowWinnerModal(false);
          resetGame(numberOfBoards, boardSize);
        }}
        onMenu={() => {
          setShowWinnerModal(false);
          setGameMode(null);
        }}
      />
      <BoardConfigModal
        visible={showBoardConfig}
        currentBoards={numberOfBoards}
        currentSize={boardSize}
        onConfirm={handleBoardConfigChange}
        onCancel={() => setShowBoardConfig(false)}
      />
      <DifficultyModal
        visible={showDifficultyModal}
        onSelect={level => {
          setDifficulty(level as DifficultyLevel);
          setShowDifficultyModal(false);
          resetGame(numberOfBoards, boardSize);
        }}
        onClose={() => setShowDifficultyModal(false)}
      />
    </View>
  );
};

export default App;
