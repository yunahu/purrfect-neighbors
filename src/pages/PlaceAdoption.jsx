import React, { useState } from "react";

import { Button, Flex, Form, Input, Tooltip, Typography, Upload, message } from "antd";
import { LuMapPin, LuUpload } from "react-icons/lu";

import ContentBox from "../components/ContentBox";

const { Title } = Typography;

function PlaceAdoption() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onFinish = async (values) => {
    if (!location.latitude || !location.longitude) {
      message.error("Please add the location.");
      return;
    }

    if (!imageUrl) {
        message.error("Please upload an image.");
        return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/create`, {
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
        setImageUrl(null);
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

  const handleUpload = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok) {
        const url = await response.text();
        setImageUrl(url);
        form.setFieldsValue({ imageUrl: url });
        message.success("Image uploaded.");
      } else {
        message.error("Failed to upload image.");
      }
    } catch (error) {
        message.error("An error occurred. Please try again.");
    } finally {
        setUploading(false);
    }
  };

  return (
    <>
      <Title level={1}>Place Adoption</Title>
      <ContentBox>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input the name of the pet." }]}
          >
            <Input
              size="large"
              placeholder="Name"
              aria-label="Name"
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
            <Upload
              name="file"
              showUploadList={false}
              customRequest={({ file }) => handleUpload(file)}
              accept="image/*"
            >
              <Button
                icon={<LuUpload />}
                loading={uploading}
                shape="round"
              >
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="imageUrl" hidden>
            <Input type="text" />
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

export default PlaceAdoption;
