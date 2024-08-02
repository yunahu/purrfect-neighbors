import { Modal, Typography } from "antd";
import { useEffect } from "react";
import styled from "styled-components";

const { Title, Text, Link } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 300px;
    border-radius: 10px;
    box-shadow: var(--shadow-lg);
    padding: 0;
    overflow: hidden;
  }

  .ant-modal-close {
    top: 10px;
    right: 10px;
    background-color: #fff;
    border-radius: 50%;
    &:hover {
      color: #fff;
      background-color: var(--color-brand-100);
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 1.6rem;
  max-height: 120px;
  overflow: auto;
`;

const ImageWrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const Popup = ({ open, onClose, position, content }) => {
  const { title, description, image, link } = content;

  const modalWidth = 320;
  const modalHeight = image ? 400 : 200;

  useEffect(() => {
    if (open && position) {
      const modalContainer = document.querySelector(".ant-modal");
      if (modalContainer) {
        modalContainer.style.position = "absolute";

        const mapContainerRect = modalContainer.parentElement.getBoundingClientRect();

        let top = position.y;
        let left = position.x;

        if (position.x + modalWidth > mapContainerRect.right) {
          left = mapContainerRect.right - modalWidth;
        }
        if (position.y + modalHeight > mapContainerRect.bottom) {
          top = mapContainerRect.bottom - modalHeight;
        }

        modalContainer.style.top = `${top}px`;
        modalContainer.style.left = `${left}px`;

      }
    }
  }, [open, position]);

  return (
    <StyledModal open={open} onCancel={onClose} footer={null}>
      {image && (
        <ImageWrapper>
          <img src={image} alt={title} />
        </ImageWrapper>
      )}
      <ContentWrapper>
        <Title level={4}>
          {title} <Link href={link}>See Details</Link>
        </Title>
        <Text>{description}</Text>
      </ContentWrapper>
    </StyledModal>
  );
};

export default Popup;
