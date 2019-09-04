const mv = require('./utils/migrationsverket')

// Every 60 Seconds
// 999 beeps
mv.checkForSlots(60000, 999)