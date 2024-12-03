import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CountriesList from "../components/CountriesList";

function Root() {
  const [search, setSearch] = useState<string>("");
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);

  const closeDrawer = () => {
    const checkbox = drawerCheckboxRef.current;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  return (
    <div className="App relative min-h-screen max-w-7xl my-0 mx-auto flex flex-col">
      <div className="drawer">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerCheckboxRef}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Capital Weather v1</div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <a href="https://github.com/trevorblades/countries">
                    Countries GraphQL API
                  </a>
                </li>
                <li>
                  <a href="https://openweathermap.org/">OpenWeather</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <div className="flex lg:p-2 gap-2" data-testid="desktop-only">
            <aside className="menu p-2 bg-base-200 rounded-box flex-col gap-2 grow-1 hidden lg:block">
              <SearchBar
                className="grow-0"
                onChange={(e) => setSearch(e.target.value)}
              />
              <CountriesList search={search} />
            </aside>
            <main className="p-2 lg:p-0 flex-1 grow-3">
              <Outlet />
            </main>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className="menu bg-base-200 min-h-full w-80 p-4"
            data-testid="mobile-only"
          >
            {/* Sidebar content here */}
            <SearchBar
              className="grow-0"
              onChange={(e) => setSearch(e.target.value)}
            />
            <CountriesList search={search} handleLinkClick={closeDrawer} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Root;
