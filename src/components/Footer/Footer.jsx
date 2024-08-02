import { LuGithub } from "react-icons/lu";
import styled from "styled-components";

import Logo from "../Logo";

const StyledFooter = styled.footer`
  height: 100px;
  background-color: var(--color-grey-50);
  color: var(--color-grey-400);
  padding: 2.4rem 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: fit-content;
    gap: 0.8rem;
  }
`;

const StyledLink = styled.a`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: var(--color-brand-600);
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>© 2024 Team Ushuaia. All rights reserved.</div>
      <Logo />
      <StyledLink
        href="https://github.com/yunahu/purrfect-neighbors.git"
        target="_blank"
      >
        <LuGithub size="2rem" />
        <span>Find Us On GitHub</span>
      </StyledLink>
    </StyledFooter>
  );
};

export default Footer;
