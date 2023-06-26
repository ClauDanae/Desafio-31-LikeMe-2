const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

//Agregar post
const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    try {
        const result = await pool.query(consulta, values)
        console.log("Post agregado con éxito 😮")
    } catch (error) {
        console.log(error)
    }
}

//Consultar post
const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

//Consultar post
const getPost = async (id) => {
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id])
    console.log(rows)
    return rows[0]
}
// Actualización de post 

const actualizarPost = async (id, likes) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values = [likes, id];
    await pool.query(consulta, values);
    return 'Post modificado 😯'
}

// Eliminar post = DELETE

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    await pool.query(consulta, values);
    return 'Post eliminado 🥺'
}

module.exports = { agregarPost, getPosts, getPost, actualizarPost, eliminarPost }