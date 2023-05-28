import { Box, Typography } from "@mui/material";
import { EpisodesList } from "../../modules/Episode/EpisodesList";

export const HomePage = () => {
  return (
    <>
      <Typography variant="h2" component="h2" paddingX={2} width={"80%"} marginX={"auto"}>
        Welcome to Rick and Morty scene writer
      </Typography>
      <Box bgcolor={"#fff"} padding={2}>
        <Box width={"70%"} marginX={"auto"}>
          <Typography variant="h5" component="p">
            Add your own episodes.
          </Typography>
          <Typography variant="h5" component="p" align="right">
            Create new scenes.
          </Typography>
          <Typography variant="h5" component="p">
            Try different sets of characters.
          </Typography>
          <Typography variant="h5" component="p" align="right">
            Write your own scene.
          </Typography>
        </Box>
      </Box>

      <EpisodesList />
    </>
  );
};
