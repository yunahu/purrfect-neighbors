import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "navbar navbar"
    "sidebar main"
    "footer footer";
  height: 100vh;
`;

const Main = styled.main`
  padding: ${(props) => (props.$noPadding ? "0" : "4rem 4.8rem 6.4rem")};
  background-color: var(--color-grey-50);
`;

const Container = styled.div`
  max-width: ${(props) => (props.$noMaxWidth ? "100%" : "120rem")};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
`;

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/explore";

  return (
    <StyledAppLayout>
      <Navbar />
      <Sidebar />
      <Main $noPadding={isHome}>
        <Container $noMaxWidth={isHome}>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
