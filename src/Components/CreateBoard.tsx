// import { navigate } from 'raviger';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Board } from '../types/apiTypes';
import { createBoard } from '../utils/apiUtils';

export default function CreateBoard() {
  const [board, setBoard] = useState<Board>({
    title: '',
    description: '',
  });

  // const [errors, setErrors] = useState<Errors<Form>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBoard({ ...board, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const validationErrors = validateForm(form);
    // setErrors(validationErrors);
    // if (Object.keys(validationErrors).length === 0) {

    try {
      const data = await createBoard(board);
      alert('Board created succesfully!');
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
            value={board.title}
            onChange={(e) => {
              setBoard({ ...board, title: e.target.value });
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
            value={board.description}
            onChange={(e) => {
              setBoard({ ...board, description: e.target.value });
            }}
            className="input-elem w-full"
          />
          {/* {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )} */}
        </div>

        <button
          className="btn w-full mt-2"
          type="submit"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Add Board
        </button>
      </form>
    </div>
  );
}
