import countrysideUrl from "./countryside.jpg";

const CountryPane = () => (
  <div className="card bg-base-100 shadow-xl">
    <figure>
      <img src={countrysideUrl} alt="Countryside" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">The Shire</h2>
      <p>A beautiful little country with a lot of countryside locations.</p>
    </div>
  </div>
);

export default CountryPane;
