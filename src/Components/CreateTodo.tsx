// import { navigate } from 'raviger';
import React, { useEffect, useState } from 'react';
import { Board, Pagination, Status, Task_api } from '../types/apiTypes';
import { createTodo, listBoards, listStatus } from '../utils/apiUtils';

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

const fetchBoards = async (
  setBoardState: React.Dispatch<React.SetStateAction<Board[]>>
) => {
  try {
    const data: Pagination<Status> = await listBoards();
    setBoardState(data.results);
  } catch (error) {
    console.log(error);
  }
};

export default function CreateTodo() {
  const [taskState, setTaskState] = useState<Task_api>({
    title: '',
    description: '',
    status: 0,
    due_date: '',
    board: 0,
    priority: '',
  });

  const [statusState, setStatusState] = useState<Status[]>([]);
  const [boardState, setBoardState] = useState<Board[]>([]);

  useEffect(() => {
    fetchStatus(setStatusState);
    fetchBoards(setBoardState);
  }, []);

  // const [errors, setErrors] = useState<Errors<Form>>({});

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setBoard({ ...board, [name]: value });
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const validationErrors = validateForm(form);
    // setErrors(validationErrors);
    // if (Object.keys(validationErrors).length === 0) {

    try {
      // eslint-disable-next-line
      const data = await createTodo(taskState);
      alert('Task created succesfully!');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(
        " An error has occured while trying to create a task... make sure you've filled all the fields!"
      );
    }
    // }
  };

  return (
    <div className="w-full">
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            // className={`${errors.title ? 'text-red-500' : ''}`}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={taskState.title}
            onChange={(e) => {
              setTaskState({ ...taskState, title: e.target.value });
            }}
            className="flex-1 input-elem w-full"
            required
          />
          {/* {errors.title && <p className="text-red-500">{errors.title}</p>} */}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            // className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={taskState.description}
            onChange={(e) => {
              setTaskState({ ...taskState, description: e.target.value });
            }}
            className="input-elem w-full"
            required
          />
          {/* {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )} */}
        </div>

        <div className="mb-4">
          <label
            htmlFor="due_date"
            // className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            id="due_date"
            value={taskState.due_date}
            onChange={(e) => {
              setTaskState({ ...taskState, due_date: e.target.value });
            }}
            className="input-elem w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="board"
            // className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Board
          </label>

          <select
            name="board"
            id="board"
            className="input-elem w-full"
            onChange={(e) => {
              setTaskState({ ...taskState, board: Number(e.target.value) });
            }}
            required
          >
            <option value="" hidden>
              {' '}
              --- Select an option ---{' '}
            </option>
            {boardState.map((board) => (
              <option value={board.id} key={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            // className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Stage
          </label>

          <select
            name="status"
            id="status"
            className="input-elem w-full"
            onChange={(e) => {
              setTaskState({ ...taskState, status: Number(e.target.value) });
            }}
            required
          >
            <option value="" hidden>
              {' '}
              --- Select an option ---{' '}
            </option>
            {statusState.map((stat) => (
              <option value={stat.id} key={stat.id}>
                {stat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            // className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Priority
          </label>

          <select
            name="priority"
            id="priority"
            className="input-elem w-full"
            onChange={(e) => {
              setTaskState({ ...taskState, priority: e.target.value });
            }}
            required
          >
            <option value="" hidden>
              {' '}
              --- Select an option ---{' '}
            </option>
            <option value="High" key={1}>
              High
            </option>
            <option value="Medium" key={2}>
              Medium
            </option>
            <option value="Low" key={3}>
              Low
            </option>
          </select>
        </div>

        <button
          className="btn w-full mt-2"
          type="submit"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
