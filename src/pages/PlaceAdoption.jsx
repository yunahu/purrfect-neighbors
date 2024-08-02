import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  message,
  Select,
  Tooltip,
  Typography,
  Upload
} from "antd";
import { useEffect, useState } from "react";
import { FaCat, FaPaw } from "react-icons/fa";
import { LuMapPin, LuUpload, LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/useSearch";
import styled from "styled-components";

import ContentBox from "../components/ContentBox";
import animal from "../data/animal.json";

const { Title, Text } = Typography;

const FormColumn = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

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
  width: 20rem !important;
  height: 20rem;
  font-size: 50px;
  &:hover {
    background-color: var(--color-brand-100);
    color: white;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
  width: 20rem !important;
  height: 20rem !important;
  object-fit: cover;
`;

const CenteredDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledFlex = styled(Flex)`
  width: 100%;
  gap: 1rem;
`;

const StyledSelect = styled(Select)`
  width: 27rem !important;
`;

function PlaceAdoption() {
  const navigate = useNavigate();
  const { setGeolocation, setFilter } = useSearch();
  const types = animal.types;
  const breedOptions = animal.breeds;

  const [form] = Form.useForm();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [type, setType] = useState("");
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    form.setFieldsValue({ breed: null });
    if (type) {
      setBreeds(breedOptions[type]);
    } else {
      setBreeds([]);
    }
  }, [type]);

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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/pets/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(values)
        }
      );

      if (response.ok) {
        message.success("Pet placed for adoption!");

        form.resetFields();

        setGeolocation((prev) => ({...prev, latitude: location.latitude, longitude: location.longitude}));
        setFilter((prev) => ({ ...prev, selection:"pets" }));

        setLocation({ latitude: null, longitude: null });
        setImageUrl(null);

        navigate("/explore");
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
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/pets/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

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
          <StyledFlex>
            <FormColumn>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the pet."
                  }
                ]}
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
              <StyledFlex>
                <Form.Item name="type">
                  <StyledSelect
                    placeholder="Type (optional)"
                    suffixIcon={<FaCat />}
                    onChange={(value) => {
                      setType(value);
                    }}
                    options={types?.map((type) => ({
                      value: type,
                      label: type
                    }))}
                    allowClear
                  />
                </Form.Item>
                <Form.Item name="breed">
                  <StyledSelect
                    placeholder="Breed (optional)"
                    suffixIcon={<FaPaw />}
                    options={breeds?.map((breed) => ({
                      value: breed,
                      label: breed
                    }))}
                    allowClear
                  />
                </Form.Item>
              </StyledFlex>
            </FormColumn>
            <FormColumn>
              <CenteredDiv>
                {imageUrl ? (
                  <>
                    <StyledImage src={imageUrl} alt="Uploaded pet" />
                    <Button
                      type="text"
                      icon={<LuX />}
                      shape="round"
                      aria-label="Click to remove image."
                      onClick={() => {
                        setImageUrl(null);
                      }}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <Upload
                      name="file"
                      showUploadList={false}
                      customRequest={({ file }) => handleUpload(file)}
                      accept="image/*"
                    >
                      <StyledButton icon={<LuUpload />} loading={uploading} />
                    </Upload>
                    <Text type="danger" style={{ marginTop: "5px" }}>
                      *Do not include private info in uploaded images.
                    </Text>
                  </>
                )}
              </CenteredDiv>
            </FormColumn>
          </StyledFlex>
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
                    <LuMapPin /> Latitude: {location.latitude}, Longitude:{" "}
                    {location.longitude}
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
