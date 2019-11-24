import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import socket from "../../../lib/socket"

const ADD_MESSAGE = "chat/ADD_MESSAGE"
const GET_USERS = "chat/GET_USERS"

//INITIAL STATE

const initialState = {
  messages: [],
  users: []
}

//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    case GET_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

function getUsers(users) {
  return {
    type: GET_USERS,
    payload: users
  }
}

//ACTION CREATORS

function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  }
}

export function useChat() {
  const dispatch = useDispatch()
  const messages = useSelector((appState) => appState.chatState.messages)
  const users = useSelector((appState) => appState.chatState.users)
  const add = (message) => socket.emit("message", message)

  useEffect(() => {
    socket.on("message", (message) => {
      dispatch(addMessage(message))
    })

    socket.on("users", (users) => {
      dispatch(getUsers(users))
    })
    // // CLEANUP (UNSUB)
    // return () => {
    //   socket.off("message", message)
    // }
  }, [dispatch])

  return { add, messages, users }
}
