import { gql } from "@apollo/client"

export const GET_LOCATION_BY_NAME = gql`
  query GetLocationByName($name: String!) {
    locations(filter: {
      name: $name
    }) {
      results {
        id
        name
      }
    }
  }`;

export const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($name: String!) {
    characters(filter: {
      name: $name
    }) {
      results {
        id
        name
        image
      }
    }
  }`;