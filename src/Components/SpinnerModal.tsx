import 'tw-elements';

export default function ModalSpinner(props: { open: boolean }) {
  return (
    <div
      className={`${
        props.open ? 'flex' : 'hidden'
      }  justify-center items-center fixed top-0 h-screen w-full bg-gray-100`}
    >
      <div className="flex justify-center items-center mr-56">
        <div
          className="spinner-border  animate-spin inline-block w-16 h-16 border-6 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
