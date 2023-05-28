import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IEpisode } from "./EpisodesList";

export type EpisodeFromProps = {
  onCreateEpisode: (newEp: IEpisode) => void;
};

export const EpisodeFrom = ({ onCreateEpisode }: EpisodeFromProps) => {
  const DEF_VALUE = "";
  const [epName, setEpName] = useState<string>(DEF_VALUE);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateEpisode({
      id: new Date().valueOf(),
      name: epName,
    });
    setEpName(DEF_VALUE);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "stretch",
        maxWidth: "20rem",
      }}
    >
      <Typography variant="h5" component="h3" padding={1}>
        Create new episode
      </Typography>
      <TextField
        id={"epName"}
        label={"Episode name"}
        value={epName}
        onChange={(e) => setEpName(e.target.value)}
        variant="outlined"
        sx={{
          backgroundColor: "#fff",
        }}
      />
      <Button variant="contained" type="submit" disabled={!Boolean(epName.trim())} sx={{ marginTop: "0.5rem" }}>
        Add episode
      </Button>
    </Box>
  );
};
