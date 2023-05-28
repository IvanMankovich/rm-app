import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { IScene } from "./ScenesList";
import { IOption } from "../../components/Autocomplete/types";

import { GET_CHARACTERS_BY_NAME, GET_LOCATION_BY_NAME } from "../../queries/queries";
import { makeRequest } from "../../utils/utils";
import { AutocompleteCustom } from "../../components/Autocomplete/AutocompleteCustom";

export interface ISceneFromProps {
  onCreateScene: (scene: IScene) => void;
}

export const SceneForm = ({ onCreateScene }: ISceneFromProps) => {
  const DEF_VALUE = "";
  const [description, setDescription] = useState<string>(DEF_VALUE);
  const [location, setLocation] = useState<IOption | null | IOption[]>(null);
  const [characters, setCharacters] = useState<IOption | null | IOption[]>([]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateScene({
      id: new Date().valueOf(),
      location: location,
      characters: characters,
      description: description,
    });
    setDescription(DEF_VALUE);
    setLocation(null);
    setCharacters([]);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDescription(e.target.value);

  const getLocationsAsync = async (value: string) => {
    const res = await makeRequest(GET_LOCATION_BY_NAME, { name: value });

    if (res?.locations?.results) return res.locations.results;
    return [];
  };

  const getCharactersAsync = async (value: string) => {
    const res = await makeRequest(GET_CHARACTERS_BY_NAME, { name: value });

    if (res?.characters?.results) return res.characters.results;
    return [];
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
        minWidth: "20rem",
      }}
    >
      <Typography variant="body1" component="h5" fontWeight="bold" marginBottom={1}>
        Create new scene
      </Typography>
      <AutocompleteCustom
        searchQuery={getLocationsAsync}
        label={"Location"}
        placeholder={"Earth (C-137)"}
        selectedValue={location}
        setSelectedValue={setLocation}
      />
      <AutocompleteCustom
        multi
        searchQuery={getCharactersAsync}
        label={"Character"}
        placeholder={"Rick Sanchez"}
        selectedValue={characters}
        setSelectedValue={setCharacters}
      />
      <TextField
        id={"scName"}
        label={"Scene description"}
        value={description}
        onChange={onTextChange}
        variant="outlined"
        sx={{
          backgroundColor: "#fff",
        }}
        multiline
        minRows={2}
        maxRows={10}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ marginTop: "0.5rem", marginBottom: 0 }}
        disabled={location === null || !(characters as IOption[])?.length || !Boolean(description?.trim?.())}
      >
        Create scene
      </Button>
    </Box>
  );
};
