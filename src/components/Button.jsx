import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 16px;
    height: 32px;
    padding: 0 24px;
    font-weight: 400;
  `,
  medium: css`
    font-size: 18px;
    height: 48px;
    padding: 0 28px;
    font-weight: 400;
  `
};

const variations = {
  primary: css`
    color: #fff;
    background-color: var(--color-brand-100);

    &:hover {
      background-color: var(--color-brand-500);
    }
  `,
  secondary: css`
    color: var(--color-brand-100);
    background: #fff;
    border: 2px solid var(--color-brand-50);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: var(--border-radius-full);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.$variation]}
`;

Button.defaultProps = {
  size: "medium",
  $variation: "primary"
};

export default Button;
