
// main functions for Glorified Chronometer (GC)


// constants
const HOUR_IN_A_DAY = 24
const HOUR_IN_A_DAY_GC = 28
const FIRST_DAY_OF_WEEK = 0 // sunday
const DAY_IN_A_WEEK_GC = 6
let timeGC


const formatTime = (value) => {
    return ("0" + value).slice(-2)
}

/**
 * calculates what logical day of week it is based on DAY_IN_A_WEEK_GC.
 * @returns {dayOfWeekGC, percentage} object.
 */
const getDayOfTheWeekGC = () => {

    const now = new Date()
    const hourFromStartOfWeek = now.getDay() * HOUR_IN_A_DAY + now.getHours()
    const dayOfWeekGC = hourFromStartOfWeek / HOUR_IN_A_DAY_GC
    // console.log(`gc day of the week: ${dayOfWeekGC}`)

    const percentageDayOfWeekGC = dayOfWeekGC * 100 / DAY_IN_A_WEEK_GC
    return { day: Math.floor(dayOfWeekGC), percentage: percentageDayOfWeekGC }
}



/**
 * calculates current time based on HOUR_IN_A_DAY_GC.
 * @returns {hour, minute, second} object
 */
const calculateCurrentTimeGC = () => {
    const timeInUTC = new Date()

    // second and minute can be extracted using built in functions
    const second = timeInUTC.getSeconds()
    const minute = timeInUTC.getMinutes()

    const totalSec = Math.floor(timeInUTC / 1000)
    const totalMin = Math.floor(totalSec / 60)
    const totalHr = Math.floor(totalMin / 60)
    const calculatedHrGC = (totalHr % HOUR_IN_A_DAY_GC)

    const hour = (calculatedHrGC - new Date().getTimezoneOffset() / 60) % HOUR_IN_A_DAY_GC

    console.log(`GC Time -> ${hour} : ${minute} : ${second}`)


    return { hour, minute, second }

}

/**
 * updates the hour, minute and second texts.
 */
const setdigitalClockText = () => {
    $("#hour").html(formatTime(timeGC.hour));
    $("#minute").html(formatTime(timeGC.minute));
    $("#second").html(formatTime(timeGC.second));
}

const setDayElements = () => {
    const { day, percentage } = getDayOfTheWeekGC()
    const roundedPercentage = Math.floor(percentage)

    // set element here.
    $("#week-percentage-slider").width(`${percentage}%`)
}


/**
 * gets timeGC calculated and updates ui.
 */
const clockTicker = () => {
    // only updating every minute;
    // no need to calculate everything every second
    if (timeGC.second < 59) {
        timeGC.second += 1
    } else {
        timeGC = calculateCurrentTimeGC()
    }

    setdigitalClockText()
}






/**
 * starting point of the clock.
 */
const start = () => {

    timeGC = calculateCurrentTimeGC()
    setDayElements()

    setInterval(() => {
        clockTicker();

        // update the date hourly
        if (timeGC.minute === 0) {
            setDayElements()
        }
    }, 1000)
}



start()

