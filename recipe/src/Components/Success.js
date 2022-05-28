import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Success !!</h3>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Return Home
        </button>
      </div>
    </>
  );
};

export default Success;
