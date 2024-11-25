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
      <aside className="menu bg-base-200 rounded-box w-56">
        <ul>
          {data.countries.map((country: Country) => (
            <li key={country.code}>
              <a href="#">{country.name}</a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="p-10 flex-1">main content</main>
    </div>
  );
}

export default App;
