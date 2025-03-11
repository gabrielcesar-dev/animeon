import { gql } from "@apollo/client";

export const GET_AIRING_TODAY = gql`
  query GetAiringToday($start: Int!, $end: Int!) {
    Page {
      airingSchedules(airingAt_greater: $start, airingAt_lesser: $end) {
        media {
          title {
            romaji
            english
          }
          coverImage {
            extraLarge
            color
          }
          popularity
          isAdult
          idMal
          id
          format
        }
        airingAt
      }
    }
  }
`;
