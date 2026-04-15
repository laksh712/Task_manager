import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import { Modal } from "react-bootstrap";
function App() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
    },
    {
      id: 4,
      title: "Task 4",
      description: "Description 4",
    },
  ]);

  const editTask = (id) => {
    setShowEditModal(true);
    setSelectedTask(taskList.find((task) => task.id === id));
  };

  const saveDescripton = () => {
    if (!selectedTask.id) {
      return setTaskList([
        ...taskList,
        {
          id: taskList.length + 1,
          title: `Task ${taskList.length + 1}`,
          description: selectedTask.description,
        },
      ]);
    } else {
      return setTaskList(
        taskList.map((task) => {
          if (task.id === selectedTask.id) {
            return {
              ...task,
              description: selectedTask.description,
            };
          }
          return task;
        }),
      );
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <button
            onClick={() => {
              setSelectedTask(null);
              setShowEditModal(true);
            }}
          >
            Add Task
          </button>
        </div>
        {taskList.map((task, index) => {
          return (
            <div key={index} className="d-flex gap-3 mt-2">
              <div>{`${task?.title} - ${task?.description}`}</div>
              <button onClick={() => editTask(task?.id)}>+</button>
            </div>
          );
        })}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          {selectedTask ? "Edit Task" : "Add Task"}
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              placeholder="Task description"
              defaultValue={selectedTask?.description}
              onChange={(e) => {
                return setSelectedTask({
                  ...selectedTask,
                  description: e.target.value,
                });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              saveDescripton();
              setShowEditModal(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setShowEditModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
