import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default Loader;
