const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request");
const geocode = require("./utils/geocode");

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// Setup Handlebars engine, views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statcic directory to server
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res)=>{ 
    res.render('index', {
        title: 'Weather App',
        name: 'Abhishek Kumar'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Abhishek Kumar'
    })
})

app.get('/about', (req, res)=>{ 
    res.render('about', {
        title: 'About Page',
        name: 'Abhishek Kumar'
    })
})

app.get('/weather', (req, res)=>{
    let address = req.query.address
    if(!address){
        return res.send({
             error: 'You must provide an address'
         })
     }

    //  geocode(address, (error, data) => {
    //     if (data === undefined) {
    //       res.send({error}) 
    //     } else
    //       wheather(data.latitude, data.longitude, data.location, (data, error) => {
    //         if (data === undefined) {
    //           res.send({error}) 
    //         } else res.send(data)
    //       });
    //   });

    geocode(address, (error, data) => {
        if (data === undefined) {
          res.send({error}) 
        // console.log(error)
        } else (
            res.send(data)
            // console.log(data)
            );
      });

     
}) 

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Help article not found.',
        name: 'Abhishek Kumar'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Page not found.',
        name: 'Abhishek Kumar'
    })
})

app.listen(port, ()=>{
    console.log('Server Started on ' + port)
})