import React, { useEffect, useState } from 'react';
import CreateTodo from '../Components/CreateTodo';
import EditTask from '../Components/EditTask';
import EditTodo from '../Components/EditTodo';
import Modal from '../Components/Modal';
import { Pagination, Task_api } from '../types/apiTypes';
import { deleteTodo, listTodos, updateTodo } from '../utils/apiUtils';

export const fetchTodos = async (
  setTasksStateCB: React.Dispatch<React.SetStateAction<Task_api[]>>
) => {
  try {
    const data: Pagination<Task_api> = await listTodos();
    setTasksStateCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

const UpdateTodos = async (todoID: number, todo: Task_api) => {
  try {
    const data = await updateTodo(todoID, todo);
  } catch (error) {
    console.log(error);
  }
};

const removeTodo = async (taskID: number) => {
  try {
    // eslint-disable-next-line
    const data = await deleteTodo(taskID);
    alert('Deleted Task Successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default function TodoView() {
  const [tasksState, setTasksState] = useState<Task_api[]>([]);
  const [activeView, setActiveView] = useState(1);

  useEffect(() => {
    fetchTodos(setTasksState);
  }, []);

  return (
    <div className="p-3">
      <div className="flex items-center w-full">
        <h1 className="flex-1 text-4xl font-bold m-7">To do</h1>

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
            Add New
          </div>
        </button>

        <div className="inline-flex rounded-md mr-7" role="group">
          <button
            type="button"
            onClick={(_) => setActiveView(1)}
            className={`${
              activeView === 1
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-indigo-500'
            } smooth-effect py-2 px-4 text-sm font-medium  rounded-l-lg border-2 border-indigo-500 hover:bg-indigo-600 hover:text-white`}
          >
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(_) => setActiveView(2)}
            className={`${
              activeView === 2
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-indigo-500'
            } smooth-effect py-2 px-4 text-sm font-medium  rounded-r-lg border-2 border-indigo-500 hover:bg-indigo-600 hover:text-white`}
          >
            <svg
              className=" h-5 w-5"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M3.875 5.3125H20.125C20.987 5.3125 21.8136 5.65491 22.4231 6.2644C23.0326 6.8739 23.375 7.70055 23.375 8.5625V13.4375C23.375 14.2995 23.0326 15.1261 22.4231 15.7356C21.8136 16.3451 20.987 16.6875 20.125 16.6875H3.875C3.01305 16.6875 2.1864 16.3451 1.5769 15.7356C0.96741 15.1261 0.625 14.2995 0.625 13.4375V8.5625C0.625 7.70055 0.96741 6.8739 1.5769 6.2644C2.1864 5.65491 3.01305 5.3125 3.875 5.3125ZM3.875 6.9375C3.44402 6.9375 3.0307 7.10871 2.72595 7.41345C2.4212 7.7182 2.25 8.13152 2.25 8.5625V13.4375C2.25 13.8685 2.4212 14.2818 2.72595 14.5865C3.0307 14.8913 3.44402 15.0625 3.875 15.0625H20.125C20.556 15.0625 20.9693 14.8913 21.274 14.5865C21.5788 14.2818 21.75 13.8685 21.75 13.4375V8.5625C21.75 8.13152 21.5788 7.7182 21.274 7.41345C20.9693 7.10871 20.556 6.9375 20.125 6.9375H3.875ZM0.625 1.25C0.625 1.03451 0.710602 0.827849 0.862976 0.675476C1.01535 0.523102 1.22201 0.4375 1.4375 0.4375H22.5625C22.778 0.4375 22.9847 0.523102 23.137 0.675476C23.2894 0.827849 23.375 1.03451 23.375 1.25C23.375 1.46549 23.2894 1.67215 23.137 1.82452C22.9847 1.9769 22.778 2.0625 22.5625 2.0625H1.4375C1.22201 2.0625 1.01535 1.9769 0.862976 1.82452C0.710602 1.67215 0.625 1.46549 0.625 1.25ZM0.625 20.75C0.625 20.5345 0.710602 20.3278 0.862976 20.1755C1.01535 20.0231 1.22201 19.9375 1.4375 19.9375H22.5625C22.778 19.9375 22.9847 20.0231 23.137 20.1755C23.2894 20.3278 23.375 20.5345 23.375 20.75C23.375 20.9655 23.2894 21.1722 23.137 21.3245C22.9847 21.4769 22.778 21.5625 22.5625 21.5625H1.4375C1.22201 21.5625 1.01535 21.4769 0.862976 21.3245C0.710602 21.1722 0.625 20.9655 0.625 20.75Z"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mx-5">
        {activeView === 1 &&
          tasksState.map((task: Task_api) => (
            <React.Fragment key={task.id}>
              <div
                // className="bg-white shadow-md rounded-lg px-4 py-3 mt-2 mb-4"
                className={
                  task.completed
                    ? 'bg-gray-200 rounded-lg px-4 py-3 mt-2 mb-4 flex flex-col'
                    : 'bg-white shadow-md rounded-lg px-4 py-3 mt-2 mb-4 flex flex-col'
                }
                key={task.id}
              >
                <div className="flow-root">
                  <div className="float-left">
                    <div className="flex items-center text-xl font-semibold">
                      <span
                        className={
                          task.completed ? 'line-through text-gray-500' : ''
                        }
                      >
                        {task.title}
                      </span>

                      <span className="text-xs bg-indigo-400 px-2 py-1.5 text-white rounded-md scale-90 ml-2">
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div className="float-right">
                    <input
                      type="checkbox"
                      className="text-indigo-500 border-2 border-gray-300 rounded-full p-2  mr-2 smooth-effect hover:border-indigo-500 hover:ring-indigo-500 focus:ring-indigo-500 focus:border-indigo-500"
                      value={String(task.completed)}
                      checked={task.completed as boolean}
                      onChange={(e) => {
                        let todo: Task_api = task;
                        setTasksState((state) =>
                          state.map((tsk) => {
                            if (tsk.id === task.id) {
                              todo = {
                                ...tsk,
                                completed: e.target.value === 'false',
                                status: task.status_object?.id as number,
                              };
                              console.log(todo);
                              UpdateTodos(task.id as number, todo);
                              return todo;
                            } else return tsk;
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2 flex-grow">
                  <span
                    className={
                      task.completed ? 'line-through text-gray-500' : ''
                    }
                  >
                    {task.description}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flow-root text-sm mt-2">
                  <span className="float-left">
                    <div className="flex items-center gap-2">
                      <div
                        className={
                          task.completed
                            ? 'line-through text-gray-500 font-semibold inline-block'
                            : 'font-semibold inline-block'
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>{' '}
                      <div
                        className={
                          task.completed
                            ? 'line-through text-gray-500 font-medium'
                            : 'font-medium'
                        }
                      >
                        {task.due_date}
                      </div>
                    </div>
                  </span>
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
                        removeTodo(task.id as number);
                        setTasksState((state) =>
                          state.filter((tsk) => tsk.id !== task.id)
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
              </div>
              <Modal modalTitle="Edit Task" modalId={`TaskEdit${task.id}`}>
                <EditTodo task={task} />
              </Modal>
            </React.Fragment>
          ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-5 mx-7">
        {activeView === 2 &&
          tasksState.map((task) => (
            <React.Fragment key={task.id}>
              <div
                // className="bg-slate-50 drop-shadow-md rounded-lg py-4 px-6 "
                className={
                  task.completed
                    ? 'bg-gray-200 rounded-lg px-6 py-4 mb-2'
                    : 'bg-white shadow-md rounded-lg px-6 py-4 mb-2'
                }
              >
                <div className="grid grid-cols-6 gap-5 items-center">
                  <div className="flex items-center col-span-2">
                    <div className="">
                      <input
                        type="checkbox"
                        className="text-indigo-500 border-2 border-gray-300 rounded-full p-2  mr-4 smooth-effect hover:border-indigo-500 hover:ring-indigo-500 focus:ring-indigo-500 focus:border-indigo-500"
                        value={String(task.completed)}
                        checked={task.completed as boolean}
                        onChange={(e) => {
                          let todo: Task_api = task;
                          setTasksState((state) =>
                            state.map((tsk) => {
                              if (tsk.id === task.id) {
                                todo = {
                                  ...tsk,
                                  completed: e.target.value === 'false',
                                  status: task.status_object?.id as number,
                                };
                                console.log(todo);
                                UpdateTodos(task.id as number, todo);
                                return todo;
                              } else return tsk;
                            })
                          );
                        }}
                      />
                    </div>

                    <div className="overflow-text">
                      <h3 className="text-lg font-medium text-gray-700">
                        <span
                          className={
                            task.completed ? 'line-through text-gray-500' : ''
                          }
                        >
                          {task.title}
                        </span>
                      </h3>

                      <div
                        className={
                          task.completed
                            ? 'line-through text-gray-500 overflow-text'
                            : 'text-gray-600 overflow-text'
                        }
                      >
                        {/* <span className="text-ellipsis"> */}
                        {task.description}
                        {/* </span> */}
                      </div>
                    </div>

                    <span className="text-sm bg-indigo-400 px-2 py-1.5 text-white rounded-md scale-75 ml-2">
                      {task.priority}
                    </span>
                  </div>

                  <h3 className="text-sm">
                    <span
                      className={
                        task.completed ? 'line-through text-gray-500' : ''
                      }
                    >
                      <span className="font-semibold">Board: </span>
                      {task.board_object?.title}
                    </span>
                  </h3>

                  <h3 className="text-sm">
                    <span
                      className={
                        task.completed ? 'line-through text-gray-500' : ''
                      }
                    >
                      <span className="font-semibold">Stage: </span>
                      {task.status_object?.title}
                    </span>
                  </h3>

                  <h3 className="text-sm">
                    <span
                      className={
                        task.completed ? 'line-through text-gray-500' : ''
                      }
                    >
                      <span className="font-semibold">Due Date: </span>
                      {task.due_date}
                    </span>
                  </h3>

                  <div className="flex justify-center gap-2">
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
                        removeTodo(task.id as number);
                        setTasksState((state) =>
                          state.filter((tsk) => tsk.id !== task.id)
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
              </div>
              <Modal modalTitle="Edit Task" modalId={`TaskEdit${task.id}`}>
                <EditTodo task={task} />
              </Modal>
            </React.Fragment>
          ))}
      </div>

      <Modal modalTitle="Create Task" modalId="NewTask">
        <CreateTodo />
      </Modal>
    </div>
  );
}
