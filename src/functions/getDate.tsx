import type { FormattedDate } from '../types/dateTypes';

export const getDate = () => {
    const today = new Date();
    // Format minutes
    let minutes = today.getMinutes().toString();
    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }
    const time = today.getHours().toString() + ":" + minutes;
    let formattedToday: FormattedDate = { time: time };

    const day = today.getDay();
    const month = today.getMonth();
    const date = today.getDate().toString();

    // Translate day to Swedish and add to date
    switch(day) {
        case 0: {
            formattedToday.day = "Söndag";
            break;
        }
        case 1: {
            formattedToday.day = "Måndag";
            break;
        }
        case 2: {
            formattedToday.day = "Tisdag";
            break;
        }
        case 3: {
            formattedToday.day = "Onsdag";
            break;
        }
        case 4: {
            formattedToday.day = "Torsdag";
            break;
        }
        case 5: {
            formattedToday.day = "Fredag";
            break;
        }
        case 6: {
            formattedToday.day = "Lördag";
            break;
        }
    }

    // Translate month to Swedish and add to date
    switch (month) {
        case 0: {
            formattedToday.date = date + " januari";
            break;
        }
        case 1: {
            formattedToday.date = date + " februari";
            break;
        }
        case 2: {
            formattedToday.date = date + " mars";
            break;
        }
        case 3: {
            formattedToday.date = date + " april";
            break;
        }
        case 4: {
            formattedToday.date = date + " maj";
            break;
        }
        case 5: {
            formattedToday.date = date + " juni";
            break;
        }
        case 6: {
            formattedToday.date = date + " juli";
            break;
        }
        case 7: {
            formattedToday.date = date + " augusti";
            break;
        }
        case 8: {
            formattedToday.date = date + " september";
            break;
        }
        case 9: {
            formattedToday.date = date + " oktober";
            break;
        }
        case 10: {
            formattedToday.date = date + " november";
            break;
        }
        case 11: {
            formattedToday.date = date + " december";
            break;
        }
    }

    return formattedToday;
}