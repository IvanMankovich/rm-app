import { ScId } from "../ScenesList";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Chip, Divider } from "@mui/material";
import { ISceneCardProps } from "../Scene";

interface ISceneShowContentProps extends Omit<ISceneCardProps, "onUpdateScene"> {
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowCard = ({
  onDeleteScene,
  id,
  description,
  characters,
  location,
  ind,
  setEditable,
}: ISceneShowContentProps) => {
  return (
    <>
      <CardHeader
        action={
          <Box>
            <IconButton aria-label="edit" onClick={() => setEditable(true)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onDeleteScene(id as ScId)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        title={
          <Typography variant="body1" component="h6" fontWeight="bold">
            {`Scene ${ind + 1}`}
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" component="h6" color={"#AAA"} marginBottom={1}>
          Location
        </Typography>
        <Typography variant="body1">{location?.name}</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2" component="h6" color={"#AAA"} marginBottom={1}>
          Characters
        </Typography>
        {characters?.map?.((ch) => (
          <Chip
            key={ch.id}
            label={ch.name}
            avatar={<Avatar alt={ch.name} src={ch.image} />}
            sx={{
              margin: "0 0.5rem 0.5rem 0",
            }}
          />
        ))}
      </CardContent>
      <Divider />
      <CardContent>
        <>
          <Typography variant="body2" component="h6" color={"#AAA"} marginBottom={1}>
            Description
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </>
      </CardContent>
    </>
  );
};
