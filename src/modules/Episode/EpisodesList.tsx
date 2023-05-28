import { useState } from "react";
import { Episode } from "./Episode";
import { EpisodeFrom } from "./EpisodeFrom";

import List from "@mui/material/List";
import { Box, Typography } from "@mui/material";

export interface IScene {
  readonly id: string;
}

export interface IEpisode {
  readonly id: string | number;
  name: string;
}

export type EpId = Extract<IEpisode, "id">;

export const EpisodesList = () => {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);

  const onCreateEpisode = (newEp: IEpisode) => {
    setEpisodes([...episodes, newEp]);
  };

  const onDeleteEpisode = (id: EpId) => {
    setEpisodes(episodes.filter((ep) => Boolean(ep.id !== id)));
  };

  return (
    <Box padding={2}>
      <EpisodeFrom onCreateEpisode={onCreateEpisode} />
      {episodes.length ? (
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "stretch",
          }}
        >
          {episodes.map((e: IEpisode) => (
            <Episode {...{ ...e, key: e.id, onDeleteEpisode: onDeleteEpisode }} />
          ))}
        </List>
      ) : (
        <Typography variant="body1" component="p" marginTop={2}>
          Let's write new episode! 20 minutes adventure.
        </Typography>
      )}
    </Box>
  );
};
