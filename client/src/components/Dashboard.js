import React, { useState } from "react"
import { useAuth, useChat } from "../hooks"

export default (props) => {
  const { username, signout } = useAuth()
  const [message, setMessage] = useState("")
  const { messages, users, add } = useChat()

  function handleSubmit(e) {
    e.preventDefault()
    add({ message, username })
    setMessage("")
  }

  return (
    <div className="dashboardContainer">
      <div className="dashGreeting">
        <h1>Hello, {username}!</h1>
      </div>

      <div className="dashMain">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="submitButton" type="submit">
            Submit
          </button>
        </form>
        <div className="chatContainer">
          <div className="users">
            {users.map((u, i) => (
              <p className="displayName">{u.username}</p>
            ))}
          </div>
          <div className="messaging">
            {messages.map((msg, i) => (
              <p className="actualMessage" key={"message" + i}>
                {msg.username} : {msg.message}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="signOutButton">
        <button className="signOut" onClick={(e) => signout()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
