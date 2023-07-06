let socket = io()
let chatBox = document.getElementById("chatBox");


Swal.fire({
    title: 'Bienvenido',
    input: 'text',
    text: 'Favor de ingresar nombre de usuario',
    inputValidator: value => {
        return !value.trim() && 'Por favor, ingrese un nombre de usuario'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    document.getElementById('user').innerHTML = user + ':'
    
})


chatBox.addEventListener('keyup', event => {
    if (event.key === "Enter") {
      if (chatBox.value.trim().length > 0) {
        let newMessage = {
          user,
          message: chatBox.value,
        };

        socket.emit("message", newMessage);

        chatBox.value = '';
      }
    }
  })

  socket.on("logs", (data) => {
    const divLogs = document.getElementById("messagesLogs");
    let messages = "";
    data.reverse().forEach((message) => {
      messages += ` <div class="gradient p-2 my-2 rounded-2">
      <p><strong><i>${message.user}</i>:</strong> ${message.message}</p>
      </div>`;
    });
    divLogs.innerHTML = messages;
  })
