import ModalWrapper from "./ModalWrapper";

const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="relative p-4 text-center bg-gray-800 rounded-lg shadow sm:p-5">
        <svg
          className="text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="mb-4 text-gray-300">
          Are you sure you want to delete this?
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={onClose}
            type="button"
            className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            type="submit"
            onClick={onConfirm}
            className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;
