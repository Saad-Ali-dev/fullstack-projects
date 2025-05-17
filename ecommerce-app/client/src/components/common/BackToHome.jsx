import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function BackToHome() {
  return (
    <Link
      to="/"
      className="text-indigo-600 hover:text-indigo-500 flex justify-center items-center "
    >
      <IoIosArrowBack />
      <p>Go Back To Home</p>
    </Link>
  );
}
