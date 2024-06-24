import React, { useState } from 'react'
import './App.css'
import Chat from './Chat'
import PreviousChats from './PreviousChats'

function App() {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  console.log(currentChat)
  return (
    <div className="App">
      <PreviousChats
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <Chat
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
    </div>
  )
}

export default App
