export default function Alert(props: {
  alertBody: string;
  alertBgColor: string;
  alertTextColor: string;
  open: boolean;
}) {
  return (
    <div
      className={`alert ${
        props.alertBgColor
      } rounded-lg py-5 px-6 mb-3 text-base ${
        props.alertTextColor
      } inline-flex items-center w-full alert-dismissible fade ${
        props.open ? 'show' : 'hidden'
      }`}
      role="alert"
    >
      {props.alertBody}
      <button
        type="button"
        className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
