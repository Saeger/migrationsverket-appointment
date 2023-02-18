import beep from "beepbeep";
import axios from "axios";

const migrationsverketBaseUrl =
  "https://www.migrationsverket.se/ansokanbokning/valjtyp?sprak=en";
const migrationsverketStockholm = `${migrationsverketBaseUrl}&bokningstyp=2&enhet=Z209&sokande=1`;
const migrationsverketUppsala = `${migrationsverketBaseUrl}&bokningstyp=2&enhet=MUP1&sokande=1`;
const migrationsverketÖrebro = `${migrationsverketBaseUrl}&bokningstyp=2&enhet=MAOM&sokande=1`;

const mvAppointmentRequest = async (
  url: string,
  cityName: string,
  beepTimes: number = 999
) => {
  const response = await axios.get(url);

  if (response.data.includes("there are no available time slots")) {
    return console.log(`No slots available for ${cityName} on ${new Date()}`);
  } else {
    beep(beepTimes);
    console.log(
      `Slots found in ${cityName}! Click the link below to book it right now:\n${url}`
    );
  }
};

export const checkForFreeSlots = async (time: number, beepTimes: number) => {
  await mvAppointmentRequest(migrationsverketStockholm, "Stockholm", beepTimes);
  await mvAppointmentRequest(migrationsverketUppsala, "Uppsala", beepTimes);
  await mvAppointmentRequest(migrationsverketÖrebro, "Örebro", beepTimes);

  setTimeout(() => checkForFreeSlots(time, beepTimes), time);
};
