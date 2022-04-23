import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateStage from '../Components/CreateStage';
import CreateTask from '../Components/CreateTask';
import EditStage from '../Components/EditStage';
import EditTask from '../Components/EditTask';
import Modal from '../Components/Modal';
import { Pagination, Status, Task_api } from '../types/apiTypes';
import {
  deleteStage,
  deleteTask,
  getBoard,
  listStatus,
  listTasks,
} from '../utils/apiUtils';

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

const getBoardTitle = async (
  setBoardNameCB: React.Dispatch<React.SetStateAction<string>>,
  boardID: number
) => {
  try {
    const data = await getBoard(boardID);
    setBoardNameCB(data.title);
  } catch (error) {
    console.log(error);
  }
};

const removeTask = async (boardID: number, taskID: number) => {
  try {
    // eslint-disable-next-line
    const data = await deleteTask(boardID, taskID);
    alert('Deleted Task Successfully!');
  } catch (error) {
    console.log(error);
  }
};

const removeStage = async (stageID: number) => {
  try {
    // eslint-disable-next-line
    const data = await deleteStage(stageID);
    alert('Deleted Stage Successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default function TasksView() {
  const params = useParams();
  const [tasksState, setTasksState] = useState<Task_api[]>([]);
  const [statusState, setStatusState] = useState<Status[]>([]);
  const [boardName, setBoardName] = useState('');
  // const [state, setState] = useState<Kanban[]>([]);

  useEffect(() => {
    fetchTasks(Number(params.boardID), setTasksState);
    fetchStatus(setStatusState);
    getBoardTitle(setBoardName, Number(params.boardID));
  }, [params.boardID]);

  // useEffect(() => {
  //   console.log(tasksState);
  // }, [tasksState]);

  // useEffect(() => {
  //   console.log(statusState);
  // }, [statusState]);

  return (
    <div className="p-3">
      <div className="flex items-center w-full">
        <h1 className="flex-1 text-4xl font-bold m-7">{boardName}</h1>

        <button
          className="mr-5 rounded-lg border-2 border-indigo-500 text-indigo-500 font-medium px-4 py-2 hover:bg-indigo-500 hover:text-white smooth-effect"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#NewTask"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {' '}
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            New Task
          </div>
        </button>
        <button
          className="mr-10 rounded-lg border-2 border-indigo-500 text-indigo-500 font-medium px-4 py-2 hover:bg-indigo-500 hover:text-white smooth-effect"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#NewStage"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {' '}
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            New Stage
          </div>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mx-5">
        {statusState.map((stat: Status) => (
          <React.Fragment key={stat.id}>
            <div
              className="bg-slate-100 border-2 border-gray-300 shadow-lg rounded-xl py-4 px-6 "
              key={stat.id}
            >
              <div className="flex items-center">
                <h2 className="flex-1 text-2xl text-slate-700 font-semibold">
                  {stat.title}
                </h2>

                <div className="p-3">
                  <div className="group relative">
                    <button className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    </button>
                    <nav
                      tabIndex={0}
                      className="border bg-white invisible shadow-lg rounded-lg w-fit absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
                    >
                      <ul className="py-1">
                        <li>
                          <button
                            type="button"
                            className="block px-4 py-2 hover:bg-gray-100 w-full"
                            data-bs-toggle="modal"
                            data-bs-target={`#StageEdit${stat.id}`}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full"
                            onClick={(_) => {
                              removeStage(stat.id as number);
                              setStatusState((state) =>
                                state.filter((st) => st.id !== stat.id)
                              );
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-300 border border-gray-300 mb-4" />
              {tasksState
                .filter((task) => task.status_object?.id === stat.id)
                .map((task: Task_api) => (
                  <React.Fragment key={task.id}>
                    <div className="bg-blue-200 my-2" key={task.id}>
                      <h1>
                        {task.title}{' '}
                        <span>
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#TaskEdit${task.id}`}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          <button
                            className="ml-2"
                            onClick={(_) => {
                              removeTask(
                                task.board as number,
                                task.id as number
                              );
                              setTasksState((state) =>
                                state.filter((tsk) => tsk.id !== task.id)
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </h1>
                      <p>{task.description}</p>
                    </div>
                    <Modal
                      modalTitle="Edit Task"
                      modalId={`TaskEdit${task.id}`}
                    >
                      <EditTask task={task} statuses={statusState} />
                    </Modal>
                  </React.Fragment>
                ))}
            </div>
            <Modal modalTitle="Edit Stage" modalId={`StageEdit${stat.id}`}>
              <EditStage
                stageID={stat.id as number}
                stageDesc={stat.description}
                stageTitle={stat.title}
              />
            </Modal>
          </React.Fragment>
        ))}
      </div>

      <Modal modalTitle="Create Task" modalId="NewTask">
        <CreateTask boardID={Number(params.boardID)} statuses={statusState} />
      </Modal>

      <Modal modalTitle="Create Stage" modalId="NewStage">
        <CreateStage />
      </Modal>
    </div>
  );
}
