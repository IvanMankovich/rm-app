import { Box, Typography } from "@mui/material";

export const AboutPage = () => {
  const TECH = [
    {
      name: "React",
      href: "https://react.dev/",
    },
    {
      name: "CRA",
      href: "https://create-react-app.dev/",
    },
    {
      name: "TypeScript",
      href: "https://www.typescriptlang.org/",
    },
    {
      name: "MUI",
      href: "https://mui.com/",
    },
    {
      name: "Rick and Morty GraphQL API",
      href: "https://rickandmortyapi.com/graphql",
    },
  ];

  return (
    <>
      <Typography variant="h2" component="h2" paddingX={2} width={"80%"} marginX={"auto"}>
        About
      </Typography>
      <Box bgcolor={"#fff"} padding={2}>
        <Box width={"70%"} marginX={"auto"}>
          <Typography variant="h5" component="p">
            This project created as a test task.
          </Typography>
          <Typography variant="h5" component="p">
            Used technologies:
          </Typography>
          {TECH.map((tech) => (
            <Box
              key={tech.name}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography variant="body1" component="p">
                {tech.name}
              </Typography>
              <Typography variant="body1" component="a" href={tech.href} marginLeft={1}>
                {tech.href}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
