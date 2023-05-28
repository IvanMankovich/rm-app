import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface FooterProps {
  title: string;
}

export const Footer = ({ title }: FooterProps) => {
  return (
    <Box component="footer" sx={{ py: 1, borderTop: "0.1rem solid #999" }}>
      <Container>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/IvanMankovich">
            Here is my github
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};
