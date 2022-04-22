import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Status, Task_api } from '../types/apiTypes';
import { listStatus, listTasks } from '../utils/apiUtils';

// interface Kanban {
//   statusTitle: string;
//   statusID: number;
//   tasks: Task_api[];
// }

const fetchTasks = async (
  boardID: number,
  setTasksStateCB: React.Dispatch<React.SetStateAction<Task_api[]>>
) => {
  try {
    const data: Pagination<Task_api> = await listTasks(boardID);
    setTasksStateCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

const fetchStatus = async (
  setStatusState: React.Dispatch<React.SetStateAction<Status[]>>
) => {
  try {
    const data: Pagination<Status> = await listStatus();
    setStatusState(data.results);
  } catch (error) {
    console.log(error);
  }
};

export default function TasksView() {
  const params = useParams();
  const [tasksState, setTasksState] = useState<Task_api[]>([]);
  const [statusState, setStatusState] = useState<Status[]>([]);
  // const [state, setState] = useState<Kanban[]>([]);

  useEffect(() => {
    fetchTasks(Number(params.boardID), setTasksState);
    fetchStatus(setStatusState);
  }, []);

  // useEffect(() => {
  //   console.log(tasksState);
  // }, [tasksState]);

  // useEffect(() => {
  //   console.log(statusState);
  // }, [statusState]);

  return (
    <div className="grid grid-cols-3 gap-5">
      {statusState.map((stat: Status) => (
        <div className="bg-yellow-200 h-screen mt-5" key={stat.id}>
          <h1>{stat.title}</h1>
          {tasksState
            .filter((task) => task.status_object?.id === stat.id)
            .map((task: Task_api) => (
              <div className="bg-blue-200" key={task.id}>
                <h1>{task.title}</h1>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
