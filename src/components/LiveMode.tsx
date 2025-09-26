import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { io } from 'socket.io-client';
import {styles} from '../styles/livemode';
import { LiveProps } from '../services/types';
import { SERVER_URL } from '@env';

const socket = io(SERVER_URL);

const LiveMode = ({ onClose }: LiveProps) => {
    const [boards, setBoards] = useState(Array(3).fill('').map(() => ({ grid: Array(9).fill(''), blocked: false })));
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [gameState, setGameState] = useState<'searching' | 'playing'>('searching');

    useEffect(() => {
        socket.connect();
        socket.emit('joinGame');

        socket.on('gameStart', (data: { roomId: string; firstTurn: string }) => {
            setRoomId(data.roomId);
            setGameState('playing');
            setIsMyTurn(socket.id === data.firstTurn);
        });

        socket.on('updateBoards', (data: { boards: any[]; nextTurn: string }) => {
            setBoards(data.boards);
            setIsMyTurn(socket.id === data.nextTurn);
        });

        socket.on('gameOver', (data: { loser: string }) => {
            Alert.alert(data.loser === socket.id ? 'You Lost!' : 'You Won!');
            resetGame();
        });

        socket.on('opponentDisconnected', () => {
            Alert.alert('Opponent Disconnected!', 'Searching for new match...');
            resetGame();
        });

        return () => { socket.disconnect(); };
    }, []);

    const handleMove = (boardIndex: number, cellIndex: number) => {
        if (!isMyTurn || boards[boardIndex].blocked || boards[boardIndex].grid[cellIndex] !== '' || !roomId) {return;}
        socket.emit('makeMove', { roomId, boardIndex, cellIndex });
    };

    const resetGame = () => {
        setBoards(Array(3).fill('').map(() => ({ grid: Array(9).fill(''), blocked: false })));
        setGameState('searching');
        socket.emit('joinGame');
    };

    return (
        <View style={styles.container}>
            {gameState === 'playing' ? (
                <>
                    <Text style={styles.turnText}>{isMyTurn ? 'Your Turn' : "Opponent's Turn"}</Text>
                    <ScrollView contentContainerStyle={styles.boardsContainer}>
                        {boards.map((board, boardIndex) => (
                            <View key={boardIndex} style={[styles.board, board.blocked && styles.blockedBoard]}>
                                {board.grid.map((cell, cellIndex) => (
                                    <TouchableOpacity
                                        key={cellIndex}
                                        style={styles.cell}
                                        onPress={() => handleMove(boardIndex, cellIndex)}
                                        disabled={!isMyTurn || board.blocked || cell !== ''}
                                    >
                                        <Text style={styles.cellText}>{cell}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </>
            ) : (
                <View style={styles.waitingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.waitingText}>Searching for opponent...</Text>
                </View>
            )}
            <View style={styles.footer}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.footerText}>Leave</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LiveMode;
