require('dotenv').config();
const { error } = require('console');
const express = require('express');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const {validateUser, validarUser} = require('./Utils/validation');

const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, 'users.json');

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
});

app.post('/form',(req, res)=>{
    const name = req.body.nombre || 'Anonimo';
    const email = req.body.email || 'No proporcionado';
    res.json({
        message :'Datos recibidos',
        data:{
            name,
            email
        }
    });
});

app.post('/api/data',(req,res) => {

    const data = req.body;
    if(!data || Object.keys(data).length === 0 ){
        return res.status(400).json({error: 'No se recibieron datos'})
    }

    res.status(201).json({
        message: 'Datos  JSON recibidos',
        data
    });
}); 

app.get('/users', (req, res)=>{
   fs.readFile(userFilePath, 'utf-8', (err, data)=>{
    if(err){
        return res.status(500).json({error: 'Error con la conexion de datos '});
    }
    const users = JSON.parse(data);
    res.json(users);
   });
});

app.post('/users',(req, res) =>{
    const newUser = req.body;
    fs.readFile(userFilePath, 'utf-8', (err, data) =>{
        if(err){
            return res.status(500).json({error: 'Error con conexión de datos.'});
        }

        const users = JSON.parse(data);

        const validation = validateUser(newUser, users);
        if (!validation.isValid){
            return res.status(400).json({error: validation.error})
        }

        users.push(newUser);
        fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err)=> {
            if(err){
                return res.status(500).json({error:'Error al guardar el usuario '});
            }
            res.status(201).json(newUser);
        });
    });
});

app.put('/users/:id', (req, res) =>{
    const userId = parseInt(req.params.id, 10);
    const updateUser = req.body;

    fs.readFile(userFilePath, 'utf-8',(err, data) =>{
        if(err){
            return res.status(500).json({error: 'Error con conexión de datos.'})
        }
        let users = JSON.parse(data);

        const validation = validateUser(updateUser, users);
        if (!validation.isValid){
            return res.status(400).json({error: validation.error})
        }

        users = users.map(user => user.id === userId ? {...user, ...updateUser}: user);

        fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err) =>{
            if (err){
                return res.status(500).json({error: 'Error al actualizar usuario'})
            }
            res.json(updateUser);
        })
    })
})

app.listen(PORT, ()=>{
    console.log(`Servidor:http://localhost:${PORT}`);
}); 