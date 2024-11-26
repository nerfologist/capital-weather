import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      emoji
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($countryCode: ID!) {
    country(code: $countryCode) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;
