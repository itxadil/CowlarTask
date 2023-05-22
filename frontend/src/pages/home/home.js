import React from "react";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import axios from "axios";
import ReactRoundedImage from "react-rounded-image";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import background from "../../assets/images/bgImg.jpg";
import profileImg from "../../assets/images/profileImg.jpeg";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
// styles for the page using material UI
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  },
  roundedImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: "20px",
  },
  profileImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: "#C4A484",
    width: "100%",
    margin: "auto",
    marginTop: "50px",
    borderRadius: "7px",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
    },
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    fontSize: "20px",
    color: "white",
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
  },
  input: {
    marginRight: theme.spacing(1),
    border: "2px solid white",
    "&::placeholder": {
      color: "white",
    },
  },
  addButton: {
    marginLeft: theme.spacing(1),
    height: "55px",
  },
  tasksDiv: {
    marginTop: "20px",
    borderRadius: "8px",
    background: "white",
    width: "100%",
    margin: "auto",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
    },
  },
  addItem: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1),
    width: "100%",
    margin: "auto",
    borderRadius: "7px",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
    },
  },
  placeholder: {
    color: "white",
    opacity: 2.5,
  },
  listTasks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    marginBottom:'-10px'
  },
  taskContainer: {
    display: "flex",
    alignItems: "center",
  },
  Line: {
    width: "100%",
    marginBottom:'-10px'
  },
  deleteButton: {
    height: "30px",
    border: "none",
    color: "blue",
  },
  radioButtonContainer: {
    position: "relative",
    display: "inline-block",
    marginRight: theme.spacing(1),
    cursor: "pointer",
    userSelect: "none",
  },
  radioButtonInput: {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
  },
  radioButtonCheckmark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "2px solid #ccc",
    backgroundColor: "#fff",
    marginLeft: "10px",
  },
  radioButtonChecked: {
    backgroundColor: "#C4A484",
  },
  radioButtonCheckmarkIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "10px",
    color: "#fff",
  },
  empty: {
    marginTop: "20px",
    borderRadius: "8px",
    background: "white",
    width: "100%",
    height: "100px",
    paddingTop: "40px",
    textAlign: "center",
    margin: "auto",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
    },
  },
  modal: {
    backgroundColor: "#C4A484",
    borderRadius: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    width: "100%",
    height: "200px",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "37.33%",
    },
  },
}));
function Todo() {
  // use styles declared above
  const classes = useStyles();
  // hooks for state management
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [show, setShow] = useState(false);
  const [findTask, setFindTask] = useState("");
  const handleClose = () => setShow(false);
  // opening the modal for confirmation of task deletion
  const handleShow = (e) => {
    tasksList.map((task) => {
      if ((task._id = e.currentTarget.id)) {
        console.log("!Task found", task._id);
        setFindTask(task._id);
      } else {
        console.log("NOT found");
      }
    });
    setShow(true);
  };
  //below useEffect is for getting data from database
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3500/task");
      setTasksList(response.data);
    };
    getData();
  }, []);
  // below useEffect is for adding the task in todi list by presing enter key
  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);
      if (event.key === "Enter") {
        if (task !== "") {
          event.preventDefault();
          handleAddTask();
        } else {
          alert("Please enter the task");
        }
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  const handleInputChange = (event) => {
    setTask(event.target.value);
  };
  // handling selection of checkboxes for completion of tasks
  const handleTaskSelection = async (taskId) => {
    const updatedTasksList = [...tasksList];
    const selectedTask = updatedTasksList.find((task) => task._id === taskId);

    if (selectedTask) {
      selectedTask.completed = !selectedTask.completed;
      await axios
        .patch(`http://localhost:3500/task/${taskId}`, {
          completed: selectedTask.completed,
        })
        .then(() => {
          console.log("Task updated successfully");
        })
        .catch((e) => {
          console.log("Error updating task:", e);
        });
      setTasksList(updatedTasksList);
    }
  };
  // adding task into todo list by clicking on add button (you can also add item by pressing enetr key)
  const handleAddTask = () => {
    const newTask = {
      task: task,
      completed: false,
      completedTime: null,
      creationTime: new Date().toLocaleString(),
    };
    const response = axios.post("http://localhost:3500/task", newTask);
    window.location.reload();
    console.log(response);
  };
  // handle deletion of selected task
  const handleDelete = async (e) => {
    await axios
      .delete(`http://localhost:3500/task/${findTask}`)
      .then(() => {
        console.log("!Deleted");
      })
      .catch((e) => {
        console.log("ISSUE", e);
      });
    setShow(false);
    window.location.reload();
  };
  return (
    // root of the page where Iam showing image on background of the page
    <div className={classes.root}>
      <div className={classes.roundedImageContainer}>
        <ReactRoundedImage
          className={classes.profileImage}
          image={profileImg}
          roundedColor="#C4A484"
          imageWidth={120}
          imageHeight={120}
          roundedSize="10"
        />
      </div>
      <Toolbar>
        <div className={classes.container}>
          <IconButton
            color="inherit"
            aria-label="menu"
            className={classes.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={classes.title}>
            To do today
          </Typography>
          <IconButton color="inherit" className={classes.arrowIcon}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </Toolbar>
      {tasksList.length !== 0 ? (
        <div
          style={{
            overflowY: tasksList.length > 5 ? "scroll" : "hidden",
            height: "350px",
            overflowX: tasksList.length > 5 ? "scroll" : "hidden",
          }}
          className={classes.tasksDiv}
        >
          {tasksList.map((task, index) => (
            <div key={task._id}>
              <div className={classes.listTasks}>
                <div className={classes.taskContainer}>
                  <label className={classes.radioButtonContainer}>
                    <input
                      id={task._id}
                      type="radio"
                      className={classes.radioButtonInput}
                      checked={task.completed}
                      onClick={() => handleTaskSelection(task._id)}
                    />
                    <div
                      className={`${classes.radioButtonCheckmark} ${
                        task.completed ? classes.radioButtonChecked : ""
                      }`}
                    >
                      {task.completed && (
                        <span className={classes.radioButtonCheckmarkIcon}>
                          &#10003;
                        </span>
                      )}
                    </div>
                  </label>
                  <h4 style={{ marginLeft: "20px", fontFamily: "sans-serif", fontWeight:'normal'  }}>
                    {task.task}
                  </h4>
                </div>
                <Button
                  id={task._id}
                  className={classes.deleteButton}
                  onClick={handleShow}
                >
                 <MoreVertIcon style={{marginLeft:'-10px', color:'gray'}}/>
                 <MoreVertIcon style={{marginLeft:'-10px', color:'gray'}}/>
                </Button>
              </div>
              {index !== tasksList.length - 1 && (
                <hr className={classes.Line} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.empty}>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            Oops! No tasks added in To do today
          </h3>
        </div>
      )}
      <div className={classes.addItem}>
        <TextField
          variant="outlined"
          className={classes.input}
          placeholder="Add task"
          value={task}
          onChange={handleInputChange}
          inputProps={{
            style: { color: "white" },
            placeholder: "Add task",
            classes: {
              placeholder: classes.placeholder,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={handleAddTask}
          disabled={task == ""}
        >
          Add
        </Button>
      </div>
      <Modal className={classes.modal} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "25px",
              fontWeight: "bolder",
              fontFamily: "monospace",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            Delete task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "monospace",
            marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          Are you sure you want to delete the task !
        </Modal.Body>
        <Modal.Footer
          style={{ marginTop: "20px", float: "right", marginRight: "20px" }}
        >
          <Button
            style={{ backgroundColor: "gray", marginRight: "20px" }}
            variant="secondary"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            style={{ backgroundColor: "gray" }}
            variant="primary"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Todo;
