const ModalWrapper = () => {
  return (
    <section className="absolute top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/50 backdrop-blur-sm">
      {/* Search Container */}
      <div className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
        <a href="./index.html">
          <img
            src="./assets/icons/close.svg"
            alt="Close"
            className="absolute w-8 h-8 cursor-pointer right-2 top-2"
          />
        </a>
      </div>
    </section>
  );
};

export default ModalWrapper;
