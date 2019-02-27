const express = require('express');
const app = express();

let session = require('express-session');
app.use(session({   secret : 'happy jungle',
                    resave: false,
                    saveUninitialized:false,
                    cookie: { maxAge: 60000 }}))
app.get('/', getArray);
app.get('/add', arrayAdd);
app.get('/sort', arraySort);
app.get('/clear', clearArray);
app.get('/remove', arrayRemove);
app.listen(process.env.PORT, process.env.IP, startHandler())

function startHandler()
{
  console.log("Server listening on port", process.env.PORT);
}

function clearArray(req, res)
{
    req.session.songs = []
    getArray(req, res);
}

function arrayAdd(req, res)
{
    if(req.session.songs != undefined)
        req.session.songs.push(req.query.song);
    getArray(req,res);
}

function arraySort(req, res)
{
    if(req.session.songs != undefined)
        req.session.songs.sort();
    getArray(req,res);
}

function arrayRemove(req, res)
{
    if(req.session.songs != undefined)
        req.session.songs.splice(req.session.songs.indexOf(req.query.song), 1);
    getArray(req, res);
    
}

function getArray(req, res)
{
    if (req.session.songs == undefined)
        clearArray(req, res);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({'songs':req.session.songs}));
    res.end('');
}