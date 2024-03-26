
const express = require('express');
const app = express();
const PORT = 3000;

const usuarios = {
  "usuarios": [
      "Juan",
      "Jocelyn",
      "Astrid",
      "Maria",
      "Ignacia",
      "Javier",
      "Brian"
  ]
};

const validarUsuario = (req, res, next) => {
  try {
    const usuario = req.params.usuario;
    const encontrado = usuarios.usuarios.includes(usuario);
    if (encontrado) {
      next();
    } else {
      res.sendFile(__dirname + '/public/assets/img/who.jpeg');
    }
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
};

app.use(express.static('public'));

app.get('/abracadabra/juego/:usuario', validarUsuario, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/abracadabra/usuarios', (req, res) => {
  try {
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/abracadabra/conejo/:n', (req, res) => {
  try {
    const numeroRandom = Math.floor(Math.random() * 4) + 1;
    console.log(numeroRandom);
    const n = parseInt(req.params.n);
    n === numeroRandom
      ? res.sendFile(__dirname + '/public/assets/img/conejito.jpg')
      : res.sendFile(__dirname + '/public/assets/img/voldemort.jpg');
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.get("*", (req, res) => {
  res.send("Esta pagina no existe");
});

app.listen(PORT, () => {
  console.log("Servidor levantado correctamente en el puerto: ", PORT);
});
