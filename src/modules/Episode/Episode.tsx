import { EpId, IEpisode } from "./EpisodesList";
import { ScenesList } from "../Scene/ScenesList";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";

export interface IEpisodeProps extends IEpisode {
  key: React.Key;
  onDeleteEpisode: (id: EpId) => void;
}

export const Episode = ({ name, onDeleteEpisode, id }: IEpisodeProps) => {
  return (
    <Card
      sx={{
        borderTop: "0.1rem",
        borderColor: "#FFF",
        marginBottom: "0.5rem",
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => onDeleteEpisode(id as EpId)}>
            <DeleteIcon />
          </IconButton>
        }
        title={
          <Box>
            <Typography variant="body2" component="h6" color="#AAA">
              Episode name:
            </Typography>
            <Typography variant="body1" component="h6">
              {name}
            </Typography>
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <ScenesList />
      </CardContent>
    </Card>
  );
};
