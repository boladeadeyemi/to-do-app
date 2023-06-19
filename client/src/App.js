import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItems";
import { useEffect, useState } from "react";

const App = () => {
  const userEmail = "bolade@test.com";
  const [task, setTask] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTask(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getData, []);

  console.log(task);

  //sort by dates
  const sortedTasks = task?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listName={"🌴Holiday tick list"} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default App;
