import Authenticator from "../main/authenticator.js"

class Year {
    constructor(year, months) {
        this.year = year
        this.months = months
    }
}

class Month {
    constructor(label, days, index, firstDay = 0) {
        this.label = label;
        this.days = days;
        this.index = index;
        this.firstDay = firstDay;
    }
}

class Day {
    constructor(index, tasks = []) {
        this.tasks = tasks;
        this.index = index;
    }
}

class Task {
    constructor(label, subject, timeFrom, timeTo, value, id, finished = false) {
        this.label = label;
        this.subject = subject;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.value = value;
        this.id = id;
        this.finished = finished;
    }
}

class taskManager {
    date = new Date()

    years = []
    totalPoints = 0
    valueFactor = 1/6

    constructor() {
        this.years = []
        for (let year = this.date.getFullYear() - 1; year <= this.date.getFullYear() + 1; year++) {
            const months = this.generateSequence(12).map((month) => {
                return new Month(this.monthToName(month - 1), this.generateSequence(this.daysInMonth(year, month)).map((day) => {
                    return new Day(day)
                }), month, this.getFirstDay(year, month))
            })
            const yearClass = new Year(year, months)
            this.years.push(yearClass)
        }
    }

    generateSequence(length) {
        return Array.from(Array(length), (_, i) => i + 1)
    }

    daysInMonth(year, month) {
        return new Date(year, month, 0).getDate()
    }

    getFirstDay(year, month) {
        return new Date(year, month, 1).getDay()
    }

    monthToName(month) {
        const date = new Date()
        date.setMonth(month)
        return date.toLocaleString("default", { month: "long" })
    }

    finishTask(id, value = 0) {
        Authenticator.updateDeadline(id, {finished: true})
        Authenticator.updateScore(value)
    }

    clearTasks() {
        this.years.forEach((year) => {
            year.months.forEach((month) => {
                month.days.forEach((day) => {
                    day.tasks = []
                })
            })
        })
    }

    addTask(category, date, timeFrom, timeTo, taskSpec, id, finished) {
        const realDate = new Date(date)
        const yearIndex = this.years.findIndex(year => year.year === realDate.getFullYear())
        this.years[yearIndex].months[realDate.getMonth()].days[realDate.getDate() - 1].tasks.push(new Task(
            taskSpec, category, timeFrom, timeTo, this.calculateValue(timeFrom, timeTo), id, finished
        ))
    }

    calculateValue(timeFrom, timeTo) {
        let [hours1, minutes1] = timeFrom.split(":").map(Number)
        let [hours2, minutes2] = timeTo.split(":").map(Number)

        let totalMinutes1 = minutes1 + hours1 * 60
        let totalMinutes2 = minutes2 + hours2 * 60

        let diffMinutes = Math.abs(totalMinutes1 - totalMinutes2)

        return Math.floor(diffMinutes * this.valueFactor)
    }
}

export default new taskManager()