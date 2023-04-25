import Sounds from "./sounds.js"

export default function Timer({
    minutesDisplay,
    secondsDisplay,
    resetControls,
}) {
    let timerTimeOut
    let minutes = Number(minutesDisplay.textContent)

    function countDown() {
        timerTimeOut = setTimeout(() => {
            let seconds = Number(secondsDisplay.textContent)
            let minutes = Number(minutesDisplay.textContent)
            let isFinished = minutes <= 0 && seconds <= 0

            if (isFinished) {
                resetControls()
                reset()

                Sounds().timeEnd()
                return
            }

            if (seconds <= 0) {
                seconds = 60

                --minutes
            }

            --seconds

            updateDisplay(minutes, seconds)

            countDown()
        }, 1000)

    }

    function updateDisplay(minutes, seconds) {
        minutesDisplay.textContent = String(minutes).padStart(2, '0')
        secondsDisplay.textContent = String(seconds).padStart(2, '0')
    }

    function reset() {
        updateDisplay(minutes, 0)
        clearTimeout(timerTimeOut)
    }

    function updateMinutes(newMinutes) {
        minutes = newMinutes
    }

    function hold() {
        clearTimeout(timerTimeOut)
    }

    return {
        countDown,
        updateDisplay,
        reset,
        updateMinutes,
        hold
    }
}



