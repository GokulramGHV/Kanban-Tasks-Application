// import { navigate } from 'raviger';
import React, { useState } from 'react';
import { Status, Task_api } from '../types/apiTypes';
import { editTask } from '../utils/apiUtils';

export default function EditTask(props: {
  task: Task_api;
  statuses: Status[];
}) {
  const [taskState, setTaskState] = useState<Task_api>({
    title: props.task.title,
    description: props.task.description,
    status: props.task.status_object?.id as number,
    due_date: props.task.due_date,
    board: props.task.board,
    priority: props.task.priority,
    order: props.task.order,
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
      const data = await editTask(
        taskState,
        props.task.board as number,
        props.task.id as number
      );
      alert('Task edited succesfully!');
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
            value={taskState.status}
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
            value={taskState.priority}
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
            value={taskState.order as number}
            onChange={(e) => {
              setTaskState({ ...taskState, order: Number(e.target.value) });
            }}
            className="input-elem w-full"
          />
        </div>

        <button
          className="btn w-full mt-2"
          type="submit"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Edit Task
        </button>
      </form>
    </div>
  );
}
