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
    const socket = io()
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