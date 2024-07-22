import { Button } from "antd";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();
  return (
    <Button
      shape="round"
      size="large"
      icon={<LuChevronLeft style={{ verticalAlign: "middle" }} />}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
}

export default Back;
