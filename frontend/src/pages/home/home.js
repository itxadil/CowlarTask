import React from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactRoundedImage from "react-rounded-image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import background from "../../assets/images/bgImg.jpg";
import Apis from "../../configapi/apis";
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
  profileImageContainer: {
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
  },
  profileImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    boxShadow: "0 10px 10px rgba(10, 10, 10, 0.5)",
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
    boxShadow: "0px 200px 200px rgba(0, 0, 0, 0.3)",
    width: "90%",
    background: "#C4A484",
    border: "2px solid white",
    "&::placeholder": {
      color: "white",
      fontWeight: "bolder",
    },
  },
  addButton: {
    marginLeft: theme.spacing(1),
    height: "55px",
    borderRadius: "10px",
    boxShadow: "0px 200px 200px rgba(0, 0, 0, 0.3)",
  },
  tasksDiv: {
    boxShadow: "0px 200px 200px rgba(0, 0, 0, 0.3)",
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
    marginBottom: "-10px",
  },
  taskContainer: {
    display: "flex",
    alignItems: "center",
  },
  Line: {
    width: "100%",
    marginBottom: "-10px",
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
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
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
}));
function Todo() {
  // use styles declared above
  const classes = useStyles();
  // hooks for state management
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [showDeleteButtonId, setShowDeleteButtonId] = useState(null);
  //below useEffect is for getting data from database
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${Apis.task}`);
      setTasksList(response.data);
    };
    getData();
  }, []);
  const completionNotification = () =>
    toast.success("The task is successfully marked as completed");
  const errorNotification = () =>
    toast.error("Task feild is empty.!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  // below useEffect is for adding the task in todi list by presing enter key
  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);
      if (event.key === "Enter") {
        if (task !== "") {
          event.preventDefault();
          handleAddTask();
        } else {
          errorNotification();
        }
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  const notify = () => toast.success("Task added successfully!");
  const notifyDelete = () => toast.success("Task deleted successfully!");
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
        .patch(`${Apis.task}/${taskId}`, {
          completed: selectedTask.completed,
          completedTime: selectedTask.completed
            ? new Date().toLocaleString()
            : null,
        })
        .then(() => {
          console.log("Task updated successfully");
        })
        .catch((e) => {
          console.log("Error updating task:", e);
        });

      setTasksList(updatedTasksList);
      {
        selectedTask.completed && completionNotification();
      }
    }
  };
  // adding task into todo list by clicking on add button (you can also add item by pressing enetr key)
  const handleAddTask = async () => {
    const newTask = {
      task: task,
      completed: false,
      completedTime: null,
      creationTime: new Date().toLocaleString(),
    };
    await axios
      .post(`${Apis.task}`, newTask)
      .then((response) => {
        setTasksList(response.data);
        setTask("");
        notify();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // handle deletion of selected task
  const handleDelete = async (task) => {
    await axios
      .delete(`${Apis.task}/${task}`)
      .then((response) => {
        console.log("!Deleted");
        setTasksList(response.data);
        notifyDelete();
        setShowDeleteButtonId(null);
      })
      .catch((e) => {
        console.log("ISSUE", e);
      });
  };
  return (
    // root of the page where Iam showing image on background of the page
    <div className={classes.root}>
      <div className={classes.roundedImageContainer}>
        <div className={classes.profileImageContainer}>
          <ReactRoundedImage
            className={classes.profileImage}
            image={profileImg}
            roundedColor="#BFCCB5"
            imageWidth={120}
            imageHeight={120}
            roundedSize="5"
          />
        </div>
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
                  <h4
                    style={{
                      marginLeft: "20px",
                      fontFamily: "sans-serif",
                      fontWeight: "normal",
                    }}
                  >
                    {task.task}
                  </h4>
                </div>
                {showDeleteButtonId === task._id ? ( 
                  <div style={{ display: "flex", flexDirection: "row"}}>
                    <Button
                      id={task._id}
                      style={{ color: "#C4A484", fontWeight: "bolder" }}
                      onClick={() => setShowDeleteButtonId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      id={task._id}
                      style={{ color: "#C4A484", fontWeight: "bolder" }}
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      id={task._id}
                      className={classes.moreVertButton}
                      onClick={() => setShowDeleteButtonId(task._id)}
                    >
                      <MoreVertIcon
                        style={{ marginLeft: "-10px", color: "gray" }}
                      />
                      <MoreVertIcon
                        style={{ marginLeft: "-10px", color: "gray" }}
                      />
                    </Button>
                  </>
                )}
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
        {task !== "" ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={handleAddTask}
          >
            Add
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={handleAddTask}
            disabled
          >
            Add
          </Button>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Todo;
