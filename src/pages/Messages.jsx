import { Badge, Divider, Tabs, Typography } from "antd";

import ContentBox from "../components/ContentBox";
import DMs from "../components/DMs";

const { Title } = Typography;
const { TabPane } = Tabs;

function Messages() {
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

  return (
    <>
      <Title level={1}>Messages</Title>
      <ContentBox>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<Badge count={0}>Direct messages</Badge>} key="1">
            <DMs />
          </TabPane>
          <TabPane
            tab={<Badge dot={commentsData.length > 0}>Comments</Badge>}
            key="2"
          >
            <ul>{comments}</ul>
          </TabPane>
        </Tabs>
      </ContentBox>
    </>
  );
}

export default Messages;
