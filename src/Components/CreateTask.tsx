// import { navigate } from 'raviger';
import React, { useState } from 'react';
import { Status, Task_api } from '../types/apiTypes';
import { createTask } from '../utils/apiUtils';

export default function CreateTask(props: {
  boardID: number;
  statuses: Status[];
}) {
  const [taskState, setTaskState] = useState<Task_api>({
    title: '',
    description: '',
    status: 0,
    due_date: '',
    board: props.boardID,
  });

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
      const data = await createTask(taskState, props.boardID);
      alert('Task created succesfully!');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error);
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
          />
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
          >
            <option value="" hidden>
              {' '}
              --- Select an option ---{' '}
            </option>
            {props.statuses.map((stat) => (
              <option value={stat.id} key={stat.id}>
                {stat.title}
              </option>
            ))}
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
