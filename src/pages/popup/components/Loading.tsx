import loadingSpinner from "../../../assests/icons/loading-spinner.svg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center my-16">
      <img src={loadingSpinner} className="animate-spin" width="32" />
    </div>
  );
};

export default Loading;
