const mv = require('./utils/migrationsverket')

// Every 60 Seconds and 999 beeps
mv.checkForFreeSlots(60000, 999)