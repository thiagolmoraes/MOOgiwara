/*
    for all connections related packets
*/
import io, { Socket } from 'socket.io-client';
import Phaser from 'phaser';
import Player from '../game/player';

// The initial connection to the server
export function connectToServer(): Socket {
  // Use environment variable for server URL, fallback to localhost for development
  const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
  console.log('[CONNECTION] Connecting to server at:', serverUrl);
  const socket = io(serverUrl);
  
  socket.on('connect', () => {
    console.log('[CONNECTION] Connected to server, socket ID:', socket.id);
  });
  
  socket.on('disconnect', () => {
    console.log('[CONNECTION] Disconnected from server');
  });
  
  socket.on('connect_error', (error) => {
    console.error('[CONNECTION] Connection error:', error);
  });
  
  // TODO: Tell server what the user put in the username field
  return socket;
}

// The server sends a packet to the client to match the client with another player
export function waitForGame(scene: Phaser.Scene, io: Socket) {
  console.log('[GAME] Waiting for game match...');
  
  if (!io.connected) {
    console.error('[GAME] Socket is not connected! Cannot queue for game.');
    return;
  }
  
  io.emit('queue');
  console.log('[GAME] Queue request sent to server');
  
  io.on('start', (data) => {
    console.log('[GAME] Game start received:', data);
    // TODO: Initialise the player's and opponent's decks given from the server
    const player = new Player(data.name, data.lobbyId, io);
    const opponent = new Player(data.opponentName, data.lobbyId, io); // Passing the client to the opponent even though it's not used
    console.debug(data);

    // TODO: Initialise the player's and opponent's decks given from the server
    scene.scene.start('game-board', {
      player: player,
      opponent: opponent,
      deckList: data.deckList,
      opponentDeckList: data.opponentDeckList,
    });
  });
  
  // Add error handling
  io.on('error', (error) => {
    console.error('[GAME] Socket error:', error);
  });
}
