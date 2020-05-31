request = require('request')
chalk = require('chalk')

const forecast = (longi, lati, callback) => {
   // const aa = 1.325
   // const bb = 103.899
    const urlweather = 'http://api.weatherstack.com/current?access_key=92587fc17a6de4097439b08094dfe5dc&query='+longi +','+lati +'&units=m'
        request({url: urlweather, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to locate location: "' +a +' ' +b +'" please try again', undefined)
        } else {callback (undefined,'Weather Description is: '+ body.current.weather_descriptions[0] +'. It is currently ' +body.current.temperature +' degree and there is a ' +body.current.precip + '% chance of raining in ' +body.location.country)
        }
    })
}

module.exports = forecast
    
    
    
//         if (error) {callback ('Unable to connect to weather service', undefined)
//     }else if (data.body.error) {callback({
//         errorCode: data.body.error.code,
//         errorType: data.body.error.type
//     }, undefined)
//     } 
//     else callback (undefined, {
//         weather_descriptions: data.body.current.weather_descriptions[0],
//         Temperature: data.body.current.temperature,
//         precip: data.body.current.precip
//     })
//     })
//     console.log('Error', error)
//     console.log('Data', data)
// }