import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { AppBar, Box } from "@mui/material";
import { EditNote } from "@mui/icons-material";

interface HeaderProps {
  sections: ISection[];
  title: string;
}

interface ISection {
  title: string;
  url: string;
}

export const Header = ({ sections, title }: HeaderProps) => {
  return (
    <AppBar position="relative" color="primary" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: "space-between", overflowX: "auto" }}>
        <Link
          href="/"
          sx={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "stretch", color: "white" }}
          underline="none"
        >
          <Box>
            <EditNote sx={{ height: "100%", display: "flex" }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ marginLeft: 1 }}>
            {title}
          </Typography>
        </Link>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
            underline="hover"
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
};
