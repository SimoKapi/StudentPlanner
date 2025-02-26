import Calendar from "../components/Calendar"
import Jumbotron from "../components/Jumbotron"
import Modal from "../components/Modal"
import { useState, useEffect, useRef } from "react"
import taskManager from '../main/taskManager.js'

function Dashboard({ scrollPosition }) {
  const d = new Date()

  const contentTop = useRef(null)
  const [height, setHeight] = useState("100vh")
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false)
  const defaultFormData = {
    category: "",
    date: `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate()}`,
    timeFrom: "12:00",
    timeTo: "12:00",
    taskSpec: ""
  }
  const [newTaskFormData, setNewTaskFormData] = useState(defaultFormData)

  function toggleModal() {
    setNewTaskModalOpen(!newTaskModalOpen)
  }

  useEffect(() => {
    if (scrollPosition > 10) {
      setHeight("30vh")
    } else {
      setHeight("100vh")
    }
  }, [scrollPosition])

  function addTask() {
    taskManager.addTask(newTaskFormData.category, newTaskFormData.date, newTaskFormData.timeFrom, newTaskFormData.timeTo, newTaskFormData.taskSpec)
    toggleModal()
    setNewTaskFormData(defaultFormData)
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTaskFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function scrollToContentTop() {
    contentTop.current.scrollIntoView({behavior: "smooth", block: "start"})
  }

  return (
    <div className="min-h-[200vh]">
      <div className={"w-full flex justify-center flex-col transition ease-in-out duration-300 h-[100vh] relative"} >
        <Jumbotron className="ml-15 mr-15 mb-3">
          <h1 className="text-5xl font-bold">Hello</h1>
          <p className="text-2xl">You have {taskManager.totalPoints} points</p>
        </Jumbotron>
        <button href="#test" onClick={scrollToContentTop} className="absolute bottom-10 w-full justify-center flex animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </button>
      </div>
      <div className="pt-5" ref={contentTop}>
        <Calendar />
        <button className="btn p-2 bg-primary hover:bg-accent transition ease-in-out duration-300 text-lg w-1/2 mx-auto block mt-5" onClick={toggleModal}>Add deadline</button>
        <Modal isOpen={newTaskModalOpen} toggleModal={toggleModal}>
          <h1 className="text-2xl md:text-5xl font-bold mb-3">Add a new deadline/task</h1>
          <hr className="text-primary"></hr>
          <form className="mt-5 text-left w-full md:w-1/2 m-auto">
            <label htmlFor="category-select">Category: </label>
            <select name="category" id="category-select" className="bg-primary" onChange={handleInputChange}>
              <option></option>
              <option>Czech</option>
              <option>ENG</option>
              <option>Chemistry</option>
              <option>Econ</option>
              <option>Arts</option>
            </select>
            <br/>
            <div className="w-1/2">
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" className="bg-background-shade p-2 m-1 text-primary" step="900" onChange={handleInputChange} value={newTaskFormData.date}/>
            </div>
            <div className="w-1/2">
              <label htmlFor="timeFrom">From:</label>
              <input type="time" id="timeFrom" name="timeFrom" className="bg-background-shade p-2 m-1 text-primary" step="900" onChange={handleInputChange} value={newTaskFormData.timeFrom}/>
            </div>
            <div className="w-1/2">
              <label htmlFor="timeTo">To:</label>
              <input type="time" id="timeTo" name="timeTo" className="bg-background-shade p-2 m-1 text-primary" step="900" onChange={handleInputChange} value={newTaskFormData.timeTo}/>
            </div>
            <input name="taskSpec" type="text" className="bg-background-shade p-2 mt-2 mb-5 w-full rounded-md" placeholder="Task specification" onChange={handleInputChange}/>
            <button type="button" onClick={addTask} className="btn bg-primary text-text-dark block mx-auto w-full mt-0">Save</button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Dashboard
