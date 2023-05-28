import { DocumentNode } from "graphql";
import { client } from "../";

export const makeRequest = async (query: DocumentNode, variables: Object) => {
  return await client
    .query({
      query,
      variables,
    })
    .then((result) => result.data)
    .catch((err) => {
      console.error(err);
      return [];
    });
};
