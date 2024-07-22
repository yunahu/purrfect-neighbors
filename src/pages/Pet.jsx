import { Space, Typography } from "antd";

import Back from "../components/Back";
import ContentBox from "../components/ContentBox";

const { Title } = Typography;

function Pet() {
  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>Pet Product</Title>
      </Space>
      <ContentBox></ContentBox>
    </>
  );
}

export default Pet;
