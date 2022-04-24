import React, { useEffect, useState } from 'react';
import EditTask from '../Components/EditTask';
import Modal from '../Components/Modal';
import { Pagination, Task_api } from '../types/apiTypes';
import { listTodos, updateTodo } from '../utils/apiUtils';

const fetchTodos = async (
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

export default function TodoView() {
  const [tasksState, setTasksState] = useState<Task_api[]>([]);

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
      </div>

      <div className="grid grid-cols-3 gap-5 mx-5">
        {tasksState.map((task: Task_api) => (
          <React.Fragment key={task.id}>
            <div
              // className="bg-white shadow-md rounded-lg px-4 py-3 mt-2 mb-4"
              className={
                task.completed
                  ? 'bg-gray-200 rounded-lg px-4 py-3 mt-2 mb-4'
                  : 'bg-white shadow-md rounded-lg px-4 py-3 mt-2 mb-4'
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

              <p className="mt-2">
                <span
                  className={task.completed ? 'line-through text-gray-500' : ''}
                >
                  {task.description}
                </span>
              </p>
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
                      // removeTask(
                      //   task.board as number,
                      //   task.id as number
                      // );
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
            {/* <Modal
                      modalTitle="Edit Task"
                      modalId={`TaskEdit${task.id}`}
                    >
                      <EditTask task={task} statuses={statusState} />
                    </Modal> */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
