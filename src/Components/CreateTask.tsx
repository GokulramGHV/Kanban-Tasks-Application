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
    priority: '',
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line
      const data = await createTask(taskState, props.boardID);
      
      window.location.reload();
    } catch (error) {
      alert(
        "An error has occured, please make sure you've filled all the fields!"
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
            <option hidden> --- Select an option --- </option>
            {props.statuses.map((stat) => (
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
            <option hidden> --- Select an option --- </option>
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

        <div className="mb-4">
          <label
            htmlFor="order"
            // className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Index (in Stage)
          </label>
          <input
            type="number"
            name="order"
            id="order"
            value={String(taskState.order)}
            onChange={(e) => {
              setTaskState({ ...taskState, order: Number(e.target.value) });
            }}
            className="input-elem w-full"
            required
          />
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
