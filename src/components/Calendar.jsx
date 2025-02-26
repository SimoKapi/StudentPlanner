import './Calendar.css'
import { useState, useMemo } from 'react';
import taskManager from '../main/taskManager.js'

function Calendar() {
    const d = new Date()
    const [score, setScore] = useState(0)
    const [selectedYear, setSelectedYear] = useState(d.getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(d.getMonth())
    const [selectedDay, setSelectedDay] = useState(d.getDate() - 1)

    function finishTask(task) {
        if (!task.finished) {
            task.finished = true
            taskManager.totalPoints += task.value
            setScore(score + task.value)
        }
    }

    function cycleMonth(by) {
        const newMonth = (selectedMonth + by + taskManager.months.length) % taskManager.months.length
        setSelectedMonth(newMonth)
        // setSelectedDay(0)
    }

    function cycleYear(by) {
        const newYear = selectedYear + by
        if (newYear <= d.getFullYear() + 1) setSelectedYear(selectedYear + by)
    }

    const dayElements = useMemo(() => {
        return taskManager.months[selectedMonth].days.map((day, index) => 
        <div key={index} className={`aspect-10/10 rounded-xl p-2 flex flex-col justify-start md:text-xl text-md transition ease-in-out duration-100 ${index == selectedDay ? "bg-calendar-selected" : "bg-calendar hover:bg-calendar-shade"} ${(index == 0 ? " col-start-5" : "")}`} onClick={() => setSelectedDay(index)}>
            <span className="text-right">{day.index}</span>
            <hr className="text-secondary"/>
            <div className="inline-block">
                {day.tasks.map((task, taskIndex) => 
                    <div key={taskIndex} className={`w-3 aspect-square inline-block rounded-full bg-success`}></div>
                )}
            </div>
        </div>
        )
    })

    const taskElements = useMemo(() => {
        return taskManager.months[selectedMonth].days[selectedDay].tasks.map((task, index) =>
        <li className={"flex flex-row hover:line-through " + (task.finished ? "line-through" : "")} onClick={() => finishTask(task)} key={index}>
            <span className={`font-bold mr-2 ${task.color}`}>{task.subject}</span>{task.label}<br/>
            {task.timeFrom} - {task.timeTo} ({task.value} points)
        </li>
        )
    })

    return (
        <div className="flex lg:flex-row flex-col">
            <div className="rounded-lg overflow-hidden shadow-lg flex-3/5 select-none">
                <div className="flex flex-row justify-start bg-secondary">
                    <h1 className="text-left text-5xl p-3 pt-5 pb-5 flex-9/10">{taskManager.months[selectedMonth].label} {selectedYear}</h1>
                    <button className="btn hover:scale-115 transition ease-in-out duration-100" onClick={() => cycleMonth(-1)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button className="btn hover:scale-115 transition ease-in-out duration-100" onClick={() => cycleMonth(1)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-7">
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Sun</div>
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Mon</div>
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Tue</div>
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Wed</div>
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Thu</div>
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Fri</div>
                    <div className="pl-2 pr-2 pt-1 pb-1 text-right">Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-1.5 2gap-[1px]">
                    {dayElements}
                </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg flex-2/5 p-2 ml-5">
                <div className="w-full h-full relative bg-paper text-paper-text px-4 py-2 notebook">
                    <ul className="notebook-holes">
                        <li/><li/><li/><li/><li/>
                    </ul>
                    <h1 className="text-2xl font-bold">Tasks - {selectedDay + 1}.{selectedMonth + 1}.{selectedYear}</h1>
                    <ul className="list-disc list-inside text-[18px]">
                        {taskElements}
                    </ul>
                    <div className="totalScore text-red-800">
                        <p className="scoreNumber">{score}</p>
                        <p className="text-3xl">Today's score</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar