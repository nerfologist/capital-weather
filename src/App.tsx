import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from './graphql/queries'

type Country = {
  name: string
  code: string
}

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <ul>
        {data.countries.map((country: Country) => (
          <li key={country.code}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
