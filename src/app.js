const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Weather App</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fabian Goh'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
        
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Fabian Goh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Fabian Goh',
        message: 'this is some helpful text.'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you have to provide an address'
        })
    } 
    geocode(req.query.address, (error, {longtitude, latitude, location} = {}) => {
        if (error)   {
            // const addressinfo = req.query.address
            {
                return res.send({error: 'the address provided' +req.query.address +' not found'})
                //return res.send({ error })
            }}
                forecast(longtitude, latitude, (error, forecastdata) => {
                if (error) {return console.log('Error', error)
            } else {
                res.send({
                    forcast: forecastdata,
                    location,
                    address: req.query.address
                })
            }
            })
        
        }
    )
        
})
        



       
    
    
    


// app.com
// app.com/help
// app.com/about
//another error page for site ie article not found
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        name: 'Fabian Goh',
        errormessage: 'Article Not Found.'
    })
})


//404 page, match anything that is not match so far
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        name: 'Fabian Goh',
        errormessage: '404 Page Not Found.'
    })
})


// app.listen(3000, () => {
//     console.log('server started on port 3000.')
// })

app.listen(port, () => {
    console.log('server started on port ' +port)
})