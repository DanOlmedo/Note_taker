const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req,res) => {
    res.send('test')
})

app.listen(process.env.PORT || port, () => console.log('App listening at https://localhost:${port}'));