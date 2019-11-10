const beep = require('beepbeep')
const request = require('request')
const dateFormat = require('dateformat')

const migrationsverketBaseUrl = 'https://www.migrationsverket.se/ansokanbokning/valjtyp?sprak=en'
const migrationsverketStockholm = `${migrationsverketBaseUrl}&bokningstyp=2&enhet=Z209&sokande=1`
const migrationsverketUppsala = `${migrationsverketBaseUrl}&bokningstyp=2&enhet=MUP1&sokande=1`

const mvAppointmentRequest = async (url, cityName, beepTimes) => {
    await request(url, { json: false }, (error, { body }) => {
        if (error || !body) {
            console.log('Unable to connect to migrationsverket website or to retrieve it\'s content. Trying again...')
        } else {
            if (body.includes('No time slots available')) {
                return console.log(`No slots available for ${cityName} on`, dateFormat(new Date(),"dddd, mmmm dS, yyyy, h:MM:ss TT"))
            } else if (body.includes('A technical error has unfortunately occurred')) {
                return console.log(`Website is under maintenance for ${cityName}`)
            }
            beep(beepTimes)
            console.log(url)
        }
    })
}

const checkForFreeSlots = async (time, beepTimes) => {
    await mvAppointmentRequest(migrationsverketStockholm, 'Stockholm', beepTimes)
    await mvAppointmentRequest(migrationsverketUppsala, 'Uppsala', beepTimes)

    setTimeout(() => checkForFreeSlots(time, beepTimes), time)
}

module.exports = { checkForFreeSlots }