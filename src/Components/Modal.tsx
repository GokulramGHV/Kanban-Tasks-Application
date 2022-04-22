import { ReactNode } from 'react';

export default function Modal(props: {
  modalTitle: string;
  modalId: string;
  children: ReactNode;
}) {
  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id={props.modalId}
      tabIndex={-1}
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-semibold leading-normal text-gray-800"
              id="exampleModalScrollableLabel"
            >
              {props.modalTitle}
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
