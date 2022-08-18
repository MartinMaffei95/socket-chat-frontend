import { useState } from 'react';
import io from 'socket.io-client';
let socket;

export const connect = (user) => {
  socket = io('http://localhost:3005');
  socket.emit('sendUserData', user);
};

export const sendAction = (message) => {
  //Emitiendo Mensaje al SOCKET
  socket.emit('message', {
    username: message.username,
    message: message.message,
    //   sendDate: '',
  });
};

export const getMessagesAction = () => {
  //Recibiendo mensajes del SOCKET
  socket &&
    socket.on('messages', (messages) => {
      return messages;
    });
};
