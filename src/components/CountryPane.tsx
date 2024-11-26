import countrysideUrl from "./countryside.jpg";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../graphql/queries";

const CountryPane = ({ countryCode }: { countryCode?: string }) => {
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { countryCode },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, native, capital, emoji, currency, languages } = data.country;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={countrysideUrl} alt="Countryside" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name} ({countryCode})
        </h2>
        <p>A beautiful little country with a lot of countryside locations.</p>
      </div>
    </div>
  );
};

export default CountryPane;
