import React, { useEffect, useState } from 'react'
import './Chat.css'
import { IoSendSharp } from 'react-icons/io5'
import axios from 'axios'

const Chat = ({ chats, setChats, currentChat, setCurrentChat }) => {
  const [inputValue, setInputValue] = useState('')
  const [chatHistory, setChatHistory] = useState({})
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    handleCreateNewChat()
  }, [])
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleCreateNewChat = () => {
    const newChatId = Date.now().toString()
    setChats([...chats, newChatId])
    setCurrentChat(newChatId)
  }

  const handleSendMessage = async () => {
    if (!currentChat || inputValue.trim() === '') {
      return
    }

    const newMessage = { text: inputValue, sender: 'user' }

    setChatHistory((prevHistory) => ({
      ...prevHistory,
      [currentChat]: [...(prevHistory[currentChat] || []), newMessage],
    }))

    setisLoading(true)

    const res = await axios.post(
      'https://api-v2.longshot.ai/custom/api/generate/instruct',
      { text: inputValue },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer b8284cd0f1cef9d61bda6afc2afabcaacb76035f',
        },
      }
    )
    setisLoading(false)

    const chatbotResponse = {
      text: res.data.copies[0].content,
      sender: 'chatbot',
    }
    setChatHistory((prevHistory) => ({
      ...prevHistory,
      [currentChat]: [...prevHistory[currentChat], chatbotResponse],
    }))

    setInputValue('')
  }

  return (
    <div style={{ backgroundColor: '', width: '100%' }}>
      <div className="chat-container">
        {currentChat && (
          <div style={{ width: '100%' }}>
            <div className="chat-window">
              {chatHistory[currentChat]?.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            {isLoading ? <div className="loader"></div> : ''}
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                style={{ width: '10%', background: 'transparent' }}
              >
                <IoSendSharp
                  style={{
                    fontSize: '20px',
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
