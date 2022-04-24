import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
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
  editTask,
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

const ChangeTask = async (task: Task_api) => {
  try {
    const data = await editTask(task, task.board as number, task.id as number);
  } catch (error) {
    console.log(error);
  }
};

export default function TasksView() {
  const params = useParams();
  const [tasksState, setTasksState] = useState<Task_api[]>([]);
  const [statusState, setStatusState] = useState<Status[]>([]);
  const [boardName, setBoardName] = useState('');
  const [changedTask, setChangedTask] = useState<Task_api>({
    title: '',
    description: '',
    status: 0,
    due_date: '',
    board: 0,
    priority: '',
  });
  // const [state, setState] = useState<Kanban[]>([]);

  useEffect(() => {
    fetchTasks(Number(params.boardID), setTasksState);
    fetchStatus(setStatusState);
    getBoardTitle(setBoardName, Number(params.boardID));
  }, [params.boardID]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      ChangeTask(changedTask);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [changedTask]);

  // useEffect(() => {
  //   console.log(statusState);
  // }, [statusState]);

  const onDragEndFunc = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setTasksState((state) =>
      state.map((tsk) => {
        if (Number(result.draggableId) === tsk.id) {
          let changedTsk: Task_api = {
            ...tsk,
            order: destination.index,
            status: Number(destination.droppableId),
            status_object: statusState.filter(
              (stat) => stat.id === Number(destination.droppableId)
            )[0],
          };
          setChangedTask(changedTsk);
          return changedTsk;
        } else {
          return tsk;
        }
      })
    );
  };

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
        <DragDropContext onDragEnd={onDragEndFunc}>
          {statusState.map((stat: Status) => (
            <React.Fragment key={stat.id}>
              <Droppable droppableId={`${stat.id}`}>
                {(provided) => (
                  <div
                    className="bg-slate-100 border-2 border-gray-300 shadow-lg rounded-xl py-4 px-6"
                    style={{ minHeight: '72vh' }}
                    key={stat.id}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
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
                      .sort((a, b) => (a.order as number) - (b.order as number))
                      .map((task: Task_api, index) => (
                        <React.Fragment key={task.id}>
                          <Draggable draggableId={`${task.id}`} index={index}>
                            {(provided) => (
                              <div
                                className="bg-white shadow-md rounded-lg px-4 py-3 mt-2 mb-4"
                                key={task.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="flow-root">
                                  <div className="float-left">
                                    <div className="flex items-center text-xl font-semibold">
                                      {task.title}
                                      <span className="text-xs bg-indigo-400 px-2 py-1.5 text-white rounded-md scale-90 ml-2">
                                        {task.priority}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="float-right">
                                    <button
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#TaskEdit${task.id}`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-slate-600 hover:text-slate-800 smooth-effect"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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
                                          state.filter(
                                            (tsk) => tsk.id !== task.id
                                          )
                                        );
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-slate-600 hover:text-slate-800 smooth-effect"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>

                                <p className="mt-2">{task.description}</p>
                                <hr className="my-2" />
                                <div className="flow-root text-sm mt-2">
                                  <span className="float-left">
                                    <span className="font-semibold">
                                      Due By:
                                    </span>{' '}
                                    {task.due_date}
                                  </span>
                                  <span className="float-right">
                                    <span className="font-semibold">
                                      Created:
                                    </span>{' '}
                                    {task.created_date?.slice(0, 10)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                          <Modal
                            modalTitle="Edit Task"
                            modalId={`TaskEdit${task.id}`}
                          >
                            <EditTask task={task} statuses={statusState} />
                          </Modal>
                        </React.Fragment>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Modal modalTitle="Edit Stage" modalId={`StageEdit${stat.id}`}>
                <EditStage
                  stageID={stat.id as number}
                  stageDesc={stat.description}
                  stageTitle={stat.title}
                />
              </Modal>
            </React.Fragment>
          ))}
        </DragDropContext>
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
