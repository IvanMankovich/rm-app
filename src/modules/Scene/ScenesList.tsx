import { useState } from "react";
import { Box, List, Typography } from "@mui/material";

import { IOption } from "../../components/Autocomplete/types";
import { Scene } from "./Scene";
import { SceneForm } from "./SceneForm";

export interface ICharacter {
  readonly id: string | number;
}

export interface ILocation {
  readonly id: string | number;
}

export interface IScene {
  readonly id: string | number;
  characters: IOption[];
  location: IOption | null;
  description: string;
}

export type ScId = Extract<IScene, "id">;

export const ScenesList = () => {
  const [scenes, setScenes] = useState<IScene[]>([]);

  const onCreateScene = (newSc: IScene) => {
    setScenes([...scenes, newSc]);
  };

  const onUpdateScene = (currSc: IScene) => {
    const editableSceneInd = scenes.findIndex((sc) => sc.id === currSc.id);

    setScenes([...scenes.slice(0, editableSceneInd), currSc, ...scenes.slice(editableSceneInd + 1)]);
  };

  const onDeleteScene = (id: ScId) => {
    setScenes(scenes.filter((ep) => Boolean(ep.id !== id)));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignContent: "stretch",
          overflowX: "auto",
        }}
      >
        {scenes.length ? (
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignContent: "stretch",
              paddingTop: 0,
              paddingBottom: 1,
            }}
          >
            {scenes.map((s: IScene, ind) => (
              <Scene {...{ ...s, key: s.id, onDeleteScene: onDeleteScene, ind: ind, onUpdateScene: onUpdateScene }} />
            ))}
          </List>
        ) : null}
        <SceneForm onCreateScene={onCreateScene} />
      </Box>
      {!scenes.length ? (
        <Typography variant="body1" component="p" marginTop={2}>
          Let's write new scene! 20 minutes adventure.
        </Typography>
      ) : null}
    </Box>
  );
};
