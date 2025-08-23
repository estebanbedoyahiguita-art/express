require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send(`
        <h1> Curso Expresss.js  v2<h1>
        <p>Esto es una aplicación node.js con express.js<p>
        <p> Corre en el puerto : ${PORT}<p>

    `);
});

app.get('/users/:id', (req, res) =>{
    const userId= req.params.id;
    res.send(`Mostrar la información del usuario con ID: ${userId}`);
});

app.get('/search', (req, res) =>{
    const terms = req.query.termino || 'No especificado';
    const category = req.query.categoria || 'Todas';

    res.send(`
        <h2>Resultados de Busqueda: <h2>
        <p> Termino: ${terms}<p>
        <p>Categoria: ${category}<p>
    `)
})

app.listen(PORT, ()=>{
    console.log(`Servidor:http://localhost:${PORT}`);
}); 