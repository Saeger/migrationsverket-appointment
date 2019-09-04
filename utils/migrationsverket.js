const beep = require('beepbeep')
const request = require('request')

const migrationSverketBaseUrl = 'https://www.migrationsverket.se/ansokanbokning/valjtyp?sprak=en'
const migrationsverketStockholm = `${migrationSverketBaseUrl}&bokningstyp=2&enhet=Z209&sokande=1`
const migrationsverketUppsala = `${migrationSverketBaseUrl}&bokningstyp=2&enhet=MUP1&sokande=1`

const mvAppointmentRequest = async (url, cityName, beepTimes) => {
    await request({ url, json: false }, (error, { body }) => {
        if (error) {
            console.log('Unable to connect to migrationsverket website!')
        } else {
            if (body.includes('No time slots available')) {
                return console.log(`No slots available for ${cityName}`, new Date())
            }
            beep(beepTimes)
            console.log(url)
        }
    })
}

const checkForSlots = async (time, beepTimes) => {
    await mvAppointmentRequest(migrationsverketStockholm, 'Stockholm', beepTimes)
    await mvAppointmentRequest(migrationsverketUppsala, 'Uppsala', beepTimes)

    setTimeout(() => checkForSlots(), time)
}

module.exports = { checkForSlots }