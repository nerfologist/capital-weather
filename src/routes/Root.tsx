import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CountriesList from "../components/CountriesList";

function Root() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="App relative min-h-screen max-w-7xl my-0 mx-auto flex">
      <aside className="menu p-2 bg-base-200 rounded-box flex-col gap-2 grow-1">
        <SearchBar
          className="grow-0"
          onChange={(e) => setSearch(e.target.value)}
        />
        <CountriesList search={search} />
      </aside>
      <main className="p-10 flex-1 grow-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
