import { Alert, AlertTitle } from "./ui/alert";
import { FaInfoCircle } from "react-icons/fa";

const AlertMessage = ({ message, type }: { message: string[]; type: any }) => {
  return (
    <Alert
      className={`rounded-none ${
        type === "error" ? "bg-red-500" : "bg-green-500 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="text-xl w-[44px] h-[44px] flex justify-center items-center">
          <FaInfoCircle className="text-white" />
        </div>
        <AlertTitle className="text-white flex-1 font-secondary text-base leading-snug">
          <ul>
            {message.map((m, index) =>
              type === "error" ? (
                <li key={index}>
                  {index + 1} - {m}
                </li>
              ) : (
                <li key={index}>{m}</li>
              )
            )}
          </ul>
        </AlertTitle>
      </div>
    </Alert>
  );
};

export default AlertMessage;
