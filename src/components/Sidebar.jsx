import { LuBellRing, LuCat, LuGift, LuUserCircle2 } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Logo from "./Logo";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-100);
  }
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/explore">
              <LuCat />
              <span>Explore</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/share">
              <LuGift />
              <span>Share Items</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/notifications">
              <LuBellRing />
              <span>Notifications</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile">
              <LuUserCircle2 />
              <span>Profile</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default Sidebar;
