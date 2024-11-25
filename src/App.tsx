import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./graphql/queries";
import SearchBar from "./components/SearchBar";
import CountryPane from "./components/CountryPane";

type Country = {
  name: string;
  code: string;
};

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App relative min-h-screen max-w-7xl my-0 mx-auto flex">
      <aside className="menu p-2 bg-base-200 rounded-box flex-col gap-2 grow-1">
        <SearchBar onChange={(e) => console.log("onChange called", e)} />
        <ul>
          {data.countries.map((country: Country) => (
            <li key={country.code}>
              <a href="#">{country.name}</a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="p-10 flex-1 grow-3">
        <CountryPane />
      </main>
    </div>
  );
}

export default App;
