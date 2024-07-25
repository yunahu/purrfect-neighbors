import { Button } from "antd";
import { LuChevronLeft } from "react-icons/lu";

function Back({ onClick }) {
  return (
    <Button
      shape="round"
      size="large"
      icon={<LuChevronLeft style={{ verticalAlign: "middle" }} />}
      onClick={onClick}
    >
      Back
    </Button>
  );
}

export default Back;
