import React, { useState } from "react";

import { Button, Flex, Form, Input, Tooltip, Typography, message } from "antd";
import { LuMapPin } from "react-icons/lu";

import ContentBox from "../components/ContentBox";

import styled from "styled-components";

const { Title, Text } = Typography;

const LocationDisplay = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
`;

const StyledText = styled(Text)`
  color: var(--color-brand-100);
  margin-left: 1.75rem;
  svg {
    margin-right: 0.5rem;
  }
`;

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

  const handleAddLocation = async () => {
    if (navigator.geolocation) {

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        form.setFieldsValue({ latitude, longitude });

        message.success("Location added successfully!");
      } catch (error) {
        message.error("Unable to retrieve your location.");
      }

    } else {
      message.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <>
      <Title level={1}>Share Items</Title>
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
              <LocationDisplay>
                {location.latitude && location.longitude ? (
                  <StyledText>
                    <LuMapPin /> Latitude: {location.latitude}, Longitude: {location.longitude}
                  </StyledText>
                ) : (
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
                )}
              </LocationDisplay>
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
