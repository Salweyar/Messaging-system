import React, { Component } from "react";
import MessageItem from './messageItem';

//Component define to populate auth user messages
 const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  availableUser,
  onRemoveMessage,
}) => {
  return (
    <ul className="chat">
      {messages.map((message) => (
        <MessageItem
          authUser={authUser}
          availableUser={availableUser}
          key={message.id}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
  );
};

export default MessageList;