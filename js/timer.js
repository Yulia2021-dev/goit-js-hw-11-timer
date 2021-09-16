import refs from './refs.js'

class CountdownTimer {
  constructor(targetDate) {
    this.finishDate = targetDate.getTime()
    this.intervalId = null
    this.delta = 0
    this.delay = 1000
  }

  start() {
    this.intervalId = setInterval(() => {
      this.delta = this.finishDate - Date.now()
      const time = this.getTimeCount(this.delta)
      this.insertData(time)
      this.clearTimer(this.delta)
    }, this.delay)
  }

  pad(value) {
    return String(value).padStart(2, '0')
  }

  insertData(data) {
    refs.days.textContent = this.pad(data[0])
    refs.hours.textContent = this.pad(data[1])
    refs.minutes.textContent = this.pad(data[2])
    refs.seconds.textContent = this.pad(data[3])
  }

  getTimeCount(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    const secs = Math.floor((time % (1000 * 60)) / 1000)
    return [days, hours, mins, secs]
  }

  clearTimer(time) {
    if (time < 0) {
      clearInterval(this.intervalId)
      refs.timer.textContent = 'Time up'
    }
  }
}

new CountdownTimer(new Date('December 31, 2021 00:00:00')).start()

// timer.start()
