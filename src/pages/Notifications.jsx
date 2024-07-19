import { Button, Divider, Space, Tabs, Typography } from "antd";
import { LuChevronLeft } from "react-icons/lu";

import ContentBox from "../components/ContentBox";

const { Title } = Typography;

function Notifications() {
  const commentsData = [
    { key: "1", title: "Comment 1", content: "Content of Comment 1" },
    { key: "2", title: "Comment 2", content: "Content of Comment 2" }
  ];
  const comments = commentsData.map((comment, i) => (
    <li key={comment.key}>
      <div>
        <Title level={3}>{comment.title}</Title>
        <p>{comment.content}</p>
        {i < commentsData.length - 1 && <Divider />}
      </div>
    </li>
  ));
  const items = [
    { key: "1", label: "Post Replies", children: <ul>{comments}</ul> }
  ];

  return (
    <>
      <Space size="middle">
        <Button>
          <LuChevronLeft />
        </Button>
        <Title level={1}>Notifications</Title>
      </Space>
      <ContentBox>
        <Tabs defaultActiveKey="1" items={items} />
      </ContentBox>
    </>
  );
}

export default Notifications;
