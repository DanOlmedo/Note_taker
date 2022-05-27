const fs = require('fs');
const express = require('express');
const path = require('path');
var uniqid = require('uniqid'); 

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(express.static('public'));

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/notes.html'))
})

app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', (error,data) => {
        if(error) { 
            throw error;
        }
        res.sendFile(path.join(__dirname,'./db/db.json'))
    })
})

app.post('/api/notes', (req,res) => {
    let newNote = req.body;
    newNote.id = uniqid();
    console.log(newNote);
    
    fs.readFile('./db/db.json', (error,data) => {
        let parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);

        let newDB = JSON.stringify(parsedNotes);
        fs.writeFile('./db/db.json', newDB, error => {
            if(error) {
                throw error;
            }
            console.log(newDB)
            console.log('New data added')
        })
    });  
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'))
})

// app.listen(process.env.PORT || port, () => console.log(`App listening at https://localhost:${port}`));

const PORT = 3001;

app.listen(PORT, () => console.log(`App listening at http://localhost:${port}`));