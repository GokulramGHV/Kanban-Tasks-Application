import React, { useEffect, useState } from 'react';
import Modal from '../Components/Modal';
import { Board, Pagination } from '../types/apiTypes';
import { deleteBoard, listBoards } from '../utils/apiUtils';
import 'tw-elements';
import CreateBoard from '../Components/CreateBoard';
import EditBoard from '../Components/EditBoard';
import { Link } from 'react-router-dom';

const fetchBoards = async (
  setBoardsStateCB: React.Dispatch<React.SetStateAction<Board[]>>
) => {
  try {
    const data: Pagination<Board> = await listBoards();
    setBoardsStateCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

const removeBoard = async (boardID: number) => {
  try {
    // eslint-disable-next-line
    const data = await deleteBoard(boardID);
    alert('Deleted Board Successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default function BoardsView() {
  const [boardsState, setBoardsState] = useState<Board[]>([]);
  // const [editBoardState, setEditBoardState] = useState<Board>({
  //   id: 0,
  //   title: '',
  //   description: '',
  // });

  useEffect(() => {
    fetchBoards(setBoardsState);
  }, []);

  useEffect(() => {
    console.log(boardsState);
  }, [boardsState]);

  return (
    <div className="p-3">
      <div className="flex items-center w-full">
        <h1 className="flex-1 text-4xl font-bold m-10">My Boards</h1>

        <button
          className="mr-10 rounded-lg border-2 border-indigo-500 text-indigo-500 font-medium px-4 py-2 hover:bg-indigo-500 hover:text-white smooth-effect"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#NewBoard"
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
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              />
            </svg>
            New Board
          </div>
        </button>
      </div>

      {/* All the boards are displayed here */}
      <section className="grid lg:grid-cols-3 grid-cols-2 mx-10 my-7 gap-5">
        {boardsState.map((board) => (
          <React.Fragment key={board.id}>
            <div
              className="flex flex-col z-0 bg-white drop-shadow-md rounded-xl py-4 px-6 "
              // key={board.id}
            >
              <div className="flex">
                <h2 className="flex-1 text-2xl text-slate-700 font-semibold">
                  {board.title}
                </h2>
                <button
                  className="text-gray-600 rounded-full px-1"
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="dropdown"
                  // data-bs-target="#boardoptions"
                  aria-controls="boardoptions"
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                <ul
                  className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg drop-shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                  aria-labelledby="boardoptions"
                >
                  <li>
                    <button
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      data-bs-toggle="modal"
                      data-bs-target={`#EditBoard${board.id}`}
                      // onClick={(_) =>
                      //   setEditBoardState({
                      //     id: board.id,
                      //     title: board.title,
                      //     description: board.description,
                      //   })
                      // }
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(_) => {
                        removeBoard(board.id as number);
                        setBoardsState(
                          boardsState.filter((b: Board) => b.id !== board.id)
                        );
                      }}
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>

              <hr className="mt-3" />
              <div className="mt-3 flex-grow" aria-label="board description">
                <p>{board.description}</p>
              </div>
              <hr className="my-3" />
              <div className="flex w-full items-center">
                <div className="flex-1">
                  <span className="text-gray-600 text-sm font-semibold">
                    Created Date:
                  </span>{' '}
                  <span className="ml-2 text-gray-600 text-sm">
                    {board.created_date?.slice(0, 10)}
                  </span>
                </div>
                <Link to={`/boards/${board.id}/tasks`} className="btn text-sm">
                  Open
                </Link>
              </div>
            </div>
            <Modal
              modalTitle="Edit Board"
              modalId={`EditBoard${board.id}`}
              // key={board.id}
            >
              <EditBoard
                boardID={board.id as number}
                boardTitle={board.title}
                boardDesc={board.description}
              />
            </Modal>
          </React.Fragment>
        ))}
      </section>

      <Modal modalTitle="Create Board" modalId="NewBoard">
        <CreateBoard />
      </Modal>
    </div>
  );
}
