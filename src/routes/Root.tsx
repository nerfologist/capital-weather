import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CountriesList from "../components/CountriesList";

function Root() {
  return (
    <div className="App relative min-h-screen max-w-7xl my-0 mx-auto flex">
      <aside className="menu p-2 bg-base-200 rounded-box flex-col gap-2 grow-1">
        <SearchBar onChange={(e) => console.log("onChange called", e)} />
        <CountriesList />
      </aside>
      <main className="p-10 flex-1 grow-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
