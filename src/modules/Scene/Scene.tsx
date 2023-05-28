import React, { useState } from "react";
import Card from "@mui/material/Card";

import { IScene, ScId } from "./ScenesList";
import { EditCard } from "./CardContent/EditCard";
import { ShowCard } from "./CardContent/ShowCard";

export interface ISceneCardProps extends IScene {
  onDeleteScene: (id: ScId) => void;
  ind: number;
  onUpdateScene: (currSc: IScene) => void;
}

export interface ISceneProps extends ISceneCardProps {
  key: React.Key;
}

export const Scene = ({ onDeleteScene, id, description, characters, location, ind, onUpdateScene }: ISceneProps) => {
  const [isEdit, setEditable] = useState<boolean>(false);

  return (
    <Card sx={{ maxWidth: "20rem", minWidth: "20rem", marginRight: "0.5rem", border: "0.1rem solid #CCC" }}>
      {isEdit ? (
        <EditCard {...{ onDeleteScene, id, description, characters, location, ind, setEditable, onUpdateScene }} />
      ) : (
        <ShowCard {...{ onDeleteScene, id, description, characters, location, ind, setEditable }} />
      )}
    </Card>
  );
};
