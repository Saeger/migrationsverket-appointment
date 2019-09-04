const beep = require('beepbeep')
const request = require('request')

const migrationSverketBaseUrl = 'https://www.migrationsverket.se/ansokanbokning/valjtyp?sprak=en'
const migrationsverketStockholm = `${migrationSverketBaseUrl}&bokningstyp=2&enhet=Z209&sokande=1`
const migrationsverketUppsala = `${migrationSverketBaseUrl}&bokningstyp=2&enhet=MUP1&sokande=1`

const mvAppointmentRequest = async (url, cityName, beepTimes) => {
    await request(url, { json: false }, (error, { body }) => {
        if (error || !body) {
            console.log('Unable to connect to migrationsverket website or to retrieve it\'s content. Trying again...')
        } else {
            if (body.includes('No time slots available')) {
                return console.log(`No slots available for ${cityName}`, new Date())
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