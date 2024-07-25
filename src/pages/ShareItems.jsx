import React, { useState } from "react";

import { Button, Flex, Form, Input, Space, Tooltip, Typography, message } from "antd";
import { LuMapPin } from "react-icons/lu";

import Back from "../components/Back";
import ContentBox from "../components/ContentBox";

const { Title } = Typography;

function ShareItems() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const onFinish = async (values) => {
    if (!location.latitude || !location.longitude) {
      message.error("Please add the location.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donations/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Item shared successfully!");
        form.resetFields();
        setLocation({ latitude: null, longitude: null });
      } else {
        message.error("Failed to share item. Please try again later.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const handleAddLocation = () => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          form.setFieldsValue({ latitude, longitude });
          message.success("Location added successfully!");
        },
        (error) => {
          message.error("Unable to retrieve your location.");
        }
      );

    } else {
      message.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <>
      <Space size="middle">
        <Back />
        <Title level={1}>Share Items</Title>
      </Space>
      <ContentBox>
        <Form form={form} onFinish={onFinish}>
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
          <Form.Item name="latitude" hidden>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="longitude" hidden>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between">
              <Tooltip title="Add location">
                <Button
                  type="text"
                  icon={<LuMapPin />}
                  shape="round"
                  aria-label="Click to add location"
                  onClick={handleAddLocation}
              >
                  Add Location
                </Button>
              </Tooltip>
              {location.latitude && location.longitude && (
                <Form.Item>
                  <Typography.Text>Latitude: {location.latitude} </Typography.Text>
                  <Typography.Text>Longitude: {location.longitude}</Typography.Text>
                </Form.Item>
              )}
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
