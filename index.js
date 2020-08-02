const express = require('express');
const app = express();

let fetch = require('node-fetch');

function getCryptos(code){
    return fetch('https://api.nexchange.io/en/api/v1/currency/').then(cryptoData=>cryptoData.json()).then(cryptoData=>{
        return code ? cryptoData.filter(crypto => crypto.code == code) : cryptoData;
    }).catch(err=>console.log(err));
}

function handleIndexRequest(req,res){
    const name = req.query.name || 'Stranger';

    res.render('home' ,{name});
}

app.set('view engine', 'ejs');
app.get('/', (req,res)=>{
    const code = req.query.code;

    getCryptos(code).then(cryptoData=>{
        res.render('home',{cryptoData});
    }).catch(err=>console.log(err))
});

app.listen(3000, () => {
    console.log('Success, running at 3000)');
});