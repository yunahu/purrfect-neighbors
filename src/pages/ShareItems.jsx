import { Button, Flex, Form, Input, Space, Typography } from "antd";
import { LuChevronLeft, LuMapPin } from "react-icons/lu";

import ContentBox from "../components/ContentBox";

const { Title } = Typography;

function ShareItems() {
  return (
    <>
      <Space>
        <Button>
          <LuChevronLeft />
        </Button>
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
              <Button
                type="text"
                icon={<LuMapPin />}
                aria-label="Click to add location"
              >
                Add Location
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                aria-label="Click to share"
              >
                Share
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </ContentBox>
    </>
  );
}

export default ShareItems;
