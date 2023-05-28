import React from "react";
import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <>
      <Typography variant="h2" component="h2" paddingX={2} width={"80%"} marginX={"auto"}>
        Oops!
      </Typography>
      <Typography variant="h4" component="h3" paddingX={2} width={"80%"} marginX={"auto"}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" component="p" paddingX={2} width={"80%"} marginX={"auto"}>
        <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
      </Typography>
    </>
  );
};
