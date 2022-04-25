// import { navigate } from 'raviger';
import React, { useState } from 'react';
import { Status } from '../types/apiTypes';
import { editStage } from '../utils/apiUtils';

export default function EditStage(props: {
  stageID: number;
  stageTitle: string;
  stageDesc: string;
}) {
  const [stage, setStage] = useState<Status>({
    title: props.stageTitle,
    description: props.stageDesc,
  });

  // const [errors, setErrors] = useState<Errors<Form>>({});

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setStage({ ...stage, [name]: value });
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const validationErrors = validateForm(form);
    // setErrors(validationErrors);
    // if (Object.keys(validationErrors).length === 0) {

    try {
      // eslint-disable-next-line
      const data = await editStage(stage, props.stageID);
      alert('Stage edited succesfully!');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error while editing a stage... make sure you've filled all the fields!");
    }
    // }
  };

  // useEffect(() => {
  //   fetchStage(setStage, props.boardID);
  // }, [props.boardID]);

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
            value={stage.title}
            onChange={(e) => {
              setStage({ ...stage, title: e.target.value });
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
            value={stage.description}
            onChange={(e) => {
              setStage({ ...stage, description: e.target.value });
            }}
            className="input-elem w-full"
            required
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
          Edit Stage
        </button>
      </form>
    </div>
  );
}
