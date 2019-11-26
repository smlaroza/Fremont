import React, { useState } from "react"
import { useAuth } from "../hooks"
import { Link } from "react-router-dom"

export default (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { reg } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    reg(username, password).then((resp) => {
      props.history.push("/")
    })
  }

  return (
    <div className="loginContainer">
      <div className="userAndPw">
        <form onSubmit={handleSubmit}>
          <div className="userLogin">
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="userPassword">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="lButtonContainer">
            <button className="loginButton" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="registerLink">
          <Link to="/register">Go To Register</Link>
          <div className="loginLink">
            <Link to="/login">Go To Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
