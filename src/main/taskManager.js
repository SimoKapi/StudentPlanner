class Month {
    constructor(label, days, index) {
        this.label = label;
        this.days = days;
        this.index = index;
    }
}

class Day {
    constructor(index, tasks = []) {
        this.tasks = tasks;
        this.index = index;
    }
}

class Task {
    constructor(label, subject, timeFrom, timeTo, value, finished = false) {
        this.label = label;
        this.subject = subject;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.value = value;
        this.finished = finished;
    }
}

class taskManager {
    months = []
    days = []
    tasks = []
    totalPoints = 0
    valueFactor = 1/6

    constructor() {
        this.tasks = [
            new Task("Paper 1 practice", "ENG", 524, "text-red-500", 25),
            new Task("Paper 3 mock", "ECON", 521, "text-blue-500", 40),
            new Task("Study", "Physics", 2341, "text-green-500", 5),
            new Task("Homework", "Math", 429, "text-orange-500", 10),
        ]

        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => 
            new Month(month, Array.from({ length: 31 }, (_, i) => i + 1).map(day => 
                new Day(day, [])
            ), index)
        )
    }

    addTask(category, date, timeFrom, timeTo, taskSpec) {
        const realDate = new Date(date)
        this.months[realDate.getMonth()].days[realDate.getDate() - 1].tasks.push(new Task(
            taskSpec, category, timeFrom, timeTo, this.calculateValue(timeFrom, timeTo)
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