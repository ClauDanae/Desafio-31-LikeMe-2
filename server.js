// Levantando el servidor
const express = require('express');
const app = express();
const { agregarPost, getPosts, getPost, actualizarPost, eliminarPost } = require('./post');
const cors = require('cors')

app.listen(3001, console.log("¡Servidor encendido en el puerto 3001!"));
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

//Consultar post
app.get('/posts', async (req, res) => {
    const likeme = await getPosts()
    res.json(likeme)
})

//Agregar post
app.post('/posts', async (req, res) => {
    try {
        const { titulo, url, descripcion, likes } = req.body
        await agregarPost(titulo, url, descripcion, likes)
        res.send("Post agregado con éxito");
    }
    catch (error) {
        res.send(error)
    }
})
// Modificar post
app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
    var post = await getPost(id) 
    //const { likes } = req.query; <--- si modifico desde la URL
    var likes = post.likes
    console.log('likes =>' + likes);
    if (likes == undefined) {
        likes = 0
    }
    likes = likes + 1
    console.log('id =>' + id);
    const resp = await actualizarPost(id, likes);
    res.send(resp);
})

// Eliminar post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const resp = await eliminarPost(id);
    res.send("Post eliminado con éxito 🥺")
})