import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import socket from "../../../lib/socket"

//ACTION DEFINITIONS

const LOGIN_PENDING = "auth/LOGIN_PENDING"
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS"
const LOGIN_FAILURE = "auth/LOGIN_FAILURE"
const LOGOUT = "auth/LOGOUT"

//INITIAL STATE

const initialState = {
  username: "",
  isAuthenticated: false,
  loading: false
}

//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        username: action.payload
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, username: "" }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

//ACTIONS
function login(username, password, dispatch) {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", { username, password })
      .then((resp) => {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${resp.data.token}`
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: username
        })
        socket.emit("login", username)
        resolve()
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_FAILURE
        })
        reject()
      })
  })
}

function register(username, password, dispatch) {
  return new Promise((resolve, reject) => {
    axios
      .post("/register", { username, password })
      .then((resp) => {
        login(username, password, dispatch).then(() => {
          resolve()
        })
      })
      .catch((e) => {
        reject()
      })
  })
}

function logout() {
  axios.defaults.headers.common = { Authorization: "" }
  return {
    type: LOGOUT
  }
}

export function useAuth() {
  const username = useSelector((appState) => appState.authState.username)
  const isAuthenticated = useSelector(
    (appState) => appState.authState.isAuthenticated
  )
  const dispatch = useDispatch()
  const signin = (username, password) => {
    dispatch({ type: LOGIN_PENDING })
    return login(username, password, dispatch)
  }
  const reg = (username, password) => {
    return register(username, password, dispatch)
  }
  const signout = () => dispatch(logout())

  return { isAuthenticated, username, signin, signout, reg }
}
