import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./graphql/queries";

type Country = {
  name: string;
  code: string;
};

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App relative min-h-screen flex">
      <aside className="bg-blue-800 text-blue-100 w-64 p-10">
        <ul>
          {data.countries.map((country: Country) => (
            <li key={country.code}>{country.name}</li>
          ))}
        </ul>
      </aside>
      <main className="p-10 flex-1">main content</main>
    </div>
  );
}

export default App;
