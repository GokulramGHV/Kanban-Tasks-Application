import React from 'react';
import dateFormat from 'dateformat';
import { useEffect, useState } from 'react';
import 'tw-elements';
import { listStatus, listTodos, me } from '../utils/apiUtils';
import { Pagination, Status, Task_api } from '../types/apiTypes';
import ModalSpinner from '../Components/SpinnerModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchStatus = async (
  setStatusState: React.Dispatch<React.SetStateAction<Status[]>>,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const data: Pagination<Status> = await listStatus();
    setIsLoading(false);
    setStatusState(data.results);

    setActiveTab(data.results[0].id as number);
  } catch (error) {
    console.log(error);
  }
};

const fetchTasks = async (
  setTasksState: React.Dispatch<React.SetStateAction<Task_api[]>>,
  setCount: React.Dispatch<
    React.SetStateAction<{
      completed: number;
      pending: number;
      total: number;
    }>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const data: Pagination<Task_api> = await listTodos();
    setIsLoading(false);
    setTasksState(data.results);

    let totalCount = data.results.length;
    let comp = 0;
    let incomp = 0;
    for (let i = 0; i < totalCount; i++) {
      if (data.results[i].completed) comp++;
      else incomp++;
    }
    setCount({ completed: comp, pending: incomp, total: totalCount });
  } catch (error) {
    console.log(error);
  }
};

const getName = async (
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const data = await me();
    setIsLoading(false);
    setUsername(data.username);
  } catch (error: any) {
    // setErrors(error.non_field_errors);
    console.log(error);
  }
};

export default function Home() {
  const now = new Date();
  const [username, setUsername] = useState('');
  const [count, setCount] = useState({ completed: 0, pending: 0, total: 0 });
  const [statusState, setStatusState] = useState<Status[]>([]);
  const [tasksState, setTasksState] = useState<Task_api[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    getName(setUsername, setIsLoading);
    fetchStatus(setStatusState, setActiveTab, setIsLoading);
    fetchTasks(setTasksState, setCount, setIsLoading);
    if (localStorage.getItem('loggedin')) {
      notifySuccess('Logged In Successfully!');
      localStorage.removeItem('loggedin');
    }
  }, []);

  return (
    <div className="p-3">
      <div className="m-7">
        <h2 className="text-lg text-gray-600 font-medium">
          {String(dateFormat(now, 'dddd, mmmm dS yyyy'))}
        </h2>
        <h1 className="text-3xl font-semibold mt-2 text-gray-700">
          Good Evening, {username}!
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2 mx-7 gap-7">
        <div className="bg-slate-50 border-2 border-gray-300 shadow-md rounded-lg py-4 px-6 ">
          <h3 className="text-xl font-semibold text-gray-700">
            Completed Tasks
          </h3>
          <h4 className="text-3xl font-bold text-gray-700 mt-10">
            {count.completed}
          </h4>
          <h5 className="text-gray-500 font-medium mt-1">Tasks Count</h5>
        </div>

        <div className="bg-slate-50 border-2 border-gray-300 shadow-md rounded-lg py-4 px-6 ">
          <h3 className="text-xl font-semibold text-gray-700">
            Incomplete Tasks
          </h3>
          <h4 className="text-3xl font-bold text-gray-700 mt-10">
            {count.pending}
          </h4>
          <h5 className="text-gray-500 font-medium mt-1">Tasks Count</h5>
        </div>

        <div className="bg-slate-50 border-2 border-gray-300 shadow-md rounded-lg py-4 px-6 ">
          <h3 className="text-xl font-semibold text-gray-700">Total Tasks</h3>
          <h4 className="text-3xl font-bold text-gray-700 mt-10">
            {count.total}
          </h4>
          <h5 className="text-gray-500 font-medium mt-1">Tasks Count</h5>
        </div>
      </div>

      <div className="mt-10 mx-7">
        <h2 className="text-2xl font-bold text-gray-700">My Tasks</h2>

        <div className="flex gap-7">
          {statusState.map((stage) => (
            <div className="mt-7">
              <button
                className="text-xl font-medium mb-1"
                onClick={(_) => {
                  setActiveTab(stage.id as number);
                }}
              >
                {stage.title}
              </button>
              <div
                className={`h-1 rounded-full bg-indigo-500 ${
                  activeTab !== stage.id && 'hidden'
                }`}
              ></div>
            </div>
          ))}
        </div>
        <hr className=" border-gray-300" />

        <div className="grid grid-cols-1 gap-4 mt-5">
          {tasksState
            .filter((tsk) => tsk.status_object?.id === activeTab)
            .map((task) => (
              <div className="bg-slate-50 drop-shadow-md rounded-lg py-4 px-6 ">
                <div className="grid grid-cols-5 items-center">
                  <div className="flex">
                    <h3 className="text-lg font-medium text-gray-700">
                      {task.title}
                    </h3>

                    <span className="text-sm bg-indigo-400 px-2 py-1.5 text-white rounded-md scale-75 ml-2">
                      {task.priority}
                    </span>
                  </div>

                  <h3 className="text-sm">
                    <span className="font-semibold">Completed: </span>
                    {task.completed ? 'True' : 'False'}
                  </h3>

                  <h3 className="text-sm">
                    <span className="font-semibold">Board: </span>
                    {task.board_object?.title}
                  </h3>
                  <h3 className="text-sm">
                    <span className="font-semibold">Due Date: </span>
                    {task.due_date}
                  </h3>

                  <h3 className="text-sm">
                    <span className="font-semibold">Last Modified: </span>
                    {task.modified_date?.slice(0, 10)}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isLoading && <ModalSpinner open={true} />}
    </div>
  );
}
