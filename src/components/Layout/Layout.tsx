import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

type LayoutProps = {
  children: ReactNode | ReactNode[];
};

export const Layout = ({ children }: LayoutProps) => {
  const APP_NAME = "Rick and Morty writer";

  return (
    <Container disableGutters maxWidth={false} sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header
        sections={[
          {
            title: "About",
            url: "about",
          },
        ]}
        title={APP_NAME}
      />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "stretch",
          flex: 1,
          backgroundColor: "#e3e3e3",
        }}
        component="main"
      >
        {children}
      </Container>
      <Footer title={APP_NAME} />
    </Container>
  );
};
