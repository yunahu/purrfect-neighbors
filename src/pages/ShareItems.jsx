import { Button, Flex, Form, Input, Space, Tooltip, Typography } from "antd";
import { LuMapPin } from "react-icons/lu";

import Back from "../components/Back";
import ContentBox from "../components/ContentBox";

const { Title } = Typography;

function ShareItems() {
  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>Share Items</Title>
      </Space>
      <ContentBox>
        <Form>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please input the title." }]}
          >
            <Input
              size="large"
              placeholder="Title"
              aria-label="Title"
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input the description." }
            ]}
          >
            <Input.TextArea
              placeholder="Description"
              rows={4}
              aria-label="Description"
              showCount
              maxLength={1000}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between">
              <Tooltip title="Add location">
                <Button
                  type="text"
                  icon={<LuMapPin />}
                  shape="round"
                  aria-label="Click to add location"
                >
                  Add Location
                </Button>
              </Tooltip>
              <Tooltip title="Submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  aria-label="Click to share"
                >
                  Share
                </Button>
              </Tooltip>
            </Flex>
          </Form.Item>
        </Form>
      </ContentBox>
    </>
  );
}

export default ShareItems;
