import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    waitingContainer: {
        alignItems: 'center',
        gap: 20,
    },
    waitingText: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'pixelvt',
    },
    turnText: {
        fontSize: 50,
        marginBottom: 20,
        fontFamily: 'pixelvt',
        color: 'red',
    },
    boardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 20,
        gap: 50,
    },
    board: {
        width: 320,
        height: 320,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'black',
    },
    blockedBoard: {
        opacity: 0.5,
    },
    cell: {
        width: '33.333%',
        height: '33.333%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'black',
    },
    cellText: {
        fontSize: 100,
        fontFamily: 'pixelvt',
        color: 'red',
    },
    footer: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
        backgroundColor: 'red',
    },
    footerText: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'pixelfont',
    },
});
