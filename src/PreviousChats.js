import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { FaTrash } from 'react-icons/fa6'

const PreviousChats = ({ chats, setChats, currentChat, setCurrentChat }) => {
  const [isCurrentChatDeleted, setisCurrentChatDeleted] = useState(false)
  const handleSwitchChat = (chatId) => {
    setCurrentChat(chatId)
  }

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter((id) => id !== chatId)
    setChats(updatedChats)
    if (currentChat === chatId) {
      setisCurrentChatDeleted(!isCurrentChatDeleted)
    }
  }
  useEffect(() => {
    handleCreateNewChat()
  }, [isCurrentChatDeleted])

  const handleCreateNewChat = () => {
    const newChatId = Date.now().toString()
    setChats([...chats, newChatId])
    setCurrentChat(newChatId)
  }

  return (
    <div
      style={{
        height: '100vh',
        minWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
        backgroundColor: '#F0F0F0',
      }}
    >
      <button
        style={{
          margin: '6px auto',
          padding: '10px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '4px',
          fontSize: '18px',
          backgroundColor: '#F1F6F9',
          border: '3px solid #9BA4B4',
        }}
        onClick={handleCreateNewChat}
      >
        <GrAdd /> <span style={{ marginLeft: '4px' }}>New Chat</span>
      </button>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {chats.map((chatId, idx) => (
          <div
            className={`chat-item ${
              currentChat === chatId ? 'active-chat' : ''
            }`}
            style={{
              margin: '5px',
              cursor: 'pointer',
              fontSize: '20px',
              borderRadius: '4px',
              minWidth: '250px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div key={chatId} onClick={() => handleSwitchChat(chatId)}>
              Chat {chatId}
            </div>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 0,
              }}
              onClick={() => handleDeleteChat(chatId)}
            >
              <FaTrash style={{ fontSize: '16px' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreviousChats
