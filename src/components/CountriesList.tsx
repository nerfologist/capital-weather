import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../graphql/queries";

type Country = {
  name: string;
  code: string;
  emoji: string;
};

const CountriesList = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.countries.map((country: Country) => (
        <li key={country.code}>
          <a href={`/countries/${country.code}`}>
            {country.emoji} {country.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
