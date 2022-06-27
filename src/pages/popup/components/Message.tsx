import checkCircle from "../../../assests/icons/check-circle.svg";
import exclamationMarkCircle from "../../../assests/icons/exclamation-mark-circle.svg";
import loadingSpinner from "../../../assests/icons/loading-spinner.svg";
import informationIcon from "../../../assests/icons/information.svg"

const Message = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error" | "info" | "loading";
}) => {
  return (
    <div
      className={`${
        type === "success"
          ? "border-t-success"
          : type === "error"
          ? "border-t-error"
          : type === "loading"
          ? "border-t-gray-500"
          : "border-t-secondary"
      } p-4 bg-opaqueWhite border-t-4 border-solid flex items-start gap-2`}
    >
      <img
        src={checkCircle}
        width="25"
        style={{ display: type === "success" ? "block" : "none" }}
      />
      <img
        src={exclamationMarkCircle}
        width="25"
        style={{ display: type === "error" ? "block" : "none" }}
      />
      <img
        src={loadingSpinner}
        className="animate-spin"
        width="25"
        style={{ display: type === "loading" ? "block" : "none" }}
      />
      <img
        src={informationIcon}
        width="25"
        style={{ display: type === "info" ? "block" : "none" }}
      />
      <p className="leading-6">{message}</p>
    </div>
  );
};

export default Message;
