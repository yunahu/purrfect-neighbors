import { Avatar } from "antd";
import styled from "styled-components";

import { getInitials } from "../utils/getInitials";

const StyledAvatar = styled(Avatar)`
  background-color: var(--color-brand-100);
  color: #fff;
  flex-shrink: 0;
`;

function UserAvatar({ name, size, gap }) {
  const initials = getInitials(name);
  return (
    <StyledAvatar size={size} gap={gap}>
      {initials}
    </StyledAvatar>
  );
}

export default UserAvatar;
