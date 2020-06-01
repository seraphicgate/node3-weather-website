const weatherForm = document.querySelector('form')
const search = document.querySelector('input[name="input2"]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('Searching for :' +location)
    messageOne.textContent = 'Loading..... Please wait'
    messageTwo.textContent = ''
    
    // Before Heroku initialization
    // fetch('http://localhost:3000/weather?address='+location).then((response) => {
        //console.log(response)
    // After Heroku Initialization
        fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
             // return console.log('Error: ' + data.error)
             messageOne.textContent = 'Error: ' + data.error
             
            }
            else {
            //console.log(data.location)
            messageOne.textContent = 'Location: ' +data.location
            //console.log(data.forcast)
            messageTwo.textContent = 'Forecast: ' +data.forcast
            }
        })
    })
})
