import React, { useState } from "react";

import { Button, Flex, Form, Input, Tooltip, Typography, Upload, Image, message } from "antd";
import { LuMapPin, LuUpload } from "react-icons/lu";

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

const StyledButton = styled(Button)`
  color: var(--color-brand-100);
  background-color: white;
  border: 1px solid var(--color-brand-100);
  border-radius: 20px !important;
  width: 10rem !important;
  height: 10rem;
  font-size: 24px;
  &:hover {
    background-color: var(--color-brand-100);
    color: white;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
  width: 10rem !important;
  height: 10rem !important;
  object-fit: cover;
`

const FilenameText = styled(Text)`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  margin-top: 0.5rem;
  color: var(--color-brand-100);
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 8rem;
`;

const FormItemRow = styled.div`
  display: flex;
  gap: 1rem;
`;

function PlaceAdoption() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
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
        message.success("Pet placed for adoption!");

        form.resetFields();
        setLocation({ latitude: null, longitude: null });
        setImageUrl(null);
        setFileName(null);
      } else {
        message.error("Failed to place adoption. Please try again later.");
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

  const handleUpload = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
  
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

        setFileName(file.name);

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
          <FormItemRow>
            <Form.Item name="type">
              <Input
                size="large"
                placeholder="Type (optional)"
                aria-label="Type"
                showCount
                maxLength={100}
              />
            </Form.Item>
            <Form.Item name="breed">
              <Input
                size="large"
                placeholder="Breed (optional)"
                aria-label="Breed"
                showCount
                maxLength={100}
              />
            </Form.Item>
          </FormItemRow>
          <CenteredDiv>
          {imageUrl ? (
              <StyledImage src={imageUrl} alt="Uploaded pet" />
            ) : (
              <Upload
                name="file"
                showUploadList={false}
                customRequest={({ file }) => handleUpload(file)}
                accept="image/*"
              >
                <StyledButton
                  icon={<LuUpload />}
                  loading={uploading}
                  shape="round"
                />
              </Upload>
            )}
            <FilenameText visible={!!fileName}>{fileName}</FilenameText>
          </CenteredDiv>
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

export default PlaceAdoption;
