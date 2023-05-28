import { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Divider, TextField } from "@mui/material";

import { IOption } from "../../../components/Autocomplete/types";
import { ISceneCardProps } from "../Scene";

import { makeRequest } from "../../../utils/utils";
import { GET_CHARACTERS_BY_NAME, GET_LOCATION_BY_NAME } from "../../../queries/queries";
import { AutocompleteCustom } from "../../../components/Autocomplete/AutocompleteCustom";

interface ISceneEditContentProps extends ISceneCardProps {
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCard = ({
  id,
  description,
  characters,
  location,
  ind,
  setEditable,
  onUpdateScene,
}: ISceneEditContentProps) => {
  const [descriptionState, setDescriptionState] = useState<string>(description);
  const [locationState, setLocationState] = useState<IOption | null | IOption[]>(location);
  const [charactersState, setCharactersState] = useState<IOption | null | IOption[]>(characters);

  const getLocationsAsync = async (value: string) => {
    const res = await makeRequest(GET_LOCATION_BY_NAME, { name: value });

    if (res?.locations?.results) return res?.locations?.results;
    return [];
  };

  const getCharactersAsync = async (value: string) => {
    const res = await makeRequest(GET_CHARACTERS_BY_NAME, { name: value });

    if (res?.characters?.results) return res?.characters?.results;
    return [];
  };

  return (
    <form
      onSubmit={() => {
        onUpdateScene({
          id,
          location: locationState,
          characters: charactersState,
          description: descriptionState,
        });
        setEditable(false);
      }}
    >
      <CardHeader
        title={
          <Typography variant="body1" component="h6" fontWeight="bold">
            {`Scene ${ind + 1}`}
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <AutocompleteCustom
          searchQuery={getLocationsAsync}
          label={"Location"}
          placeholder={"Earth (C-137)"}
          selectedValue={locationState}
          setSelectedValue={setLocationState}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <AutocompleteCustom
          multi
          searchQuery={getCharactersAsync}
          label={"Character"}
          placeholder={"Rick Sanchez"}
          selectedValue={charactersState}
          setSelectedValue={setCharactersState}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <TextField
          label={"Scene description"}
          value={descriptionState}
          onChange={(e) => setDescriptionState(e.target.value)}
          variant="outlined"
          sx={{
            backgroundColor: "#fff",
            width: "100%",
          }}
        />
      </CardContent>

      <Divider />
      <CardActions>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: "0.5rem", marginBottom: 0, width: "100%" }}
          disabled={
            locationState === null || !(charactersState as IOption[])?.length || !Boolean(descriptionState?.trim?.())
          }
        >
          Save
        </Button>
      </CardActions>
    </form>
  );
};
