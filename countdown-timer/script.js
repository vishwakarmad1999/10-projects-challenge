setInterval(() => {
    let now = new Date()
    let bday = new Date('23 Oct 2020')

    let currentTime = now.getTime()
    let scheduledTime = bday.getTime()

    let remainingTime = scheduledTime - currentTime
    if (remainingTime < 0) {
        document.getElementById("days-text").innerHTML = 0
        document.getElementById("hours-text").innerHTML = 0 
        document.getElementById("min-text").innerHTML = 0
        document.getElementById("sec-text").innerHTML = 0
    } else {
        let seconds = Math.floor(remainingTime / 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        let days = Math.floor(hours / 24)
    
        seconds %= 60
        minutes %= 60
        hours %= 24
    
        seconds = seconds < 10 ? ("0" + seconds) : seconds
        minutes = minutes < 10 ? ("0" + minutes) : minutes
        hours = hours < 10 ? ("0" + hours) : hours
    
        document.getElementById("days-text").innerHTML = days
        document.getElementById("hours-text").innerHTML = hours
        document.getElementById("min-text").innerHTML = minutes
        document.getElementById("sec-text").innerHTML = seconds
    }
}, 1000)