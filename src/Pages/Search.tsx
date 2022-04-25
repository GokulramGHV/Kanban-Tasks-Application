import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Task_api } from '../types/apiTypes';
import { fetchTodos } from './TodoView';

export default function SearchView() {
  // eslint-disable-next-line
  let [searchParams, setSearchParams] = useSearchParams();
  const [tasksState, setTasksState] = useState<Task_api[]>([]);

  let searchTerm = searchParams.get('term');

  useEffect(() => {
    fetchTodos(setTasksState);
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div className="p-3">
      <h1 className="m-7 text-3xl font-bold">Search Results</h1>
      <div className="grid grid-cols-1 gap-4 mt-5 mx-7">
        {tasksState.filter((tsk) =>
          tsk.title.toLowerCase().includes(String(searchTerm))
        ).length === 0 && (
          <h5 className="text-xl text-gray-700">No results found!</h5>
        )}
        {tasksState
          .filter((tsk) => tsk.title.toLowerCase().includes(String(searchTerm)))
          .map((task) => (
            <div
              className="bg-slate-50 drop-shadow-md rounded-lg py-4 px-6 "
              key={task.id}
            >
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
  );
}
