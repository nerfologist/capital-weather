import { useParams } from "react-router-dom";
import CountryPane from "../components/CountryPane";

const Country: React.FC = () => {
  const { countryCode } = useParams();

  return <CountryPane countryCode={countryCode} />;
};

export default Country;
