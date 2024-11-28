import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../graphql/queries";

type Country = {
  name: string;
  code: string;
  emoji: string;
};

const CountriesList = ({ search }: { search: string }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.countries
        .filter((country: Country) =>
          search ? new RegExp(`^${search}`, "i").test(country.name) : true,
        )
        .map((country: Country) => (
          <li key={country.code}>
            <Link to={`countries/${country.code}`}>
              {country.emoji} {country.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default CountriesList;
