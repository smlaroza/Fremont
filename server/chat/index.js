module.exports = function(io) {
  const users = []

  io.on("connection", (socket) => {
    socket.on("login", (username) => {
      users.push({
        username,
        id: socket.id
      })

      io.emit("users", users)
    })
    socket.on("message", (message) => {
      io.emit("message", message)
    })

    socket.on("disconnect", () => {
      users = users.filter((user) => user.id !== socket.id)
      io.emit("users", users)
      console.log("disconnected")
    })
  })
}
