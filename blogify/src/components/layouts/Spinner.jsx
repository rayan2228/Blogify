import { PulseLoader } from "react-spinners";
const Spinner = ({ colorCode = "fff" }) => {
  return <PulseLoader color={`#${colorCode}`} />;
};

export default Spinner;
