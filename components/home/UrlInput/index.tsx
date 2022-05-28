import TextInput from "../../global/TextInput";
import { isValidHttpUrl } from "utils/functions";

type UrlInput = {
  error: string;
  setError: (error: string) => void;
  setUrl: (url: string) => void;
  url: string;
};

const UrlInput = ({ error, setError, url, setUrl }: UrlInput) => {

  const validateUrl = (url: string) => {
    if (!isValidHttpUrl(url)) {
      setError("Please input a valid url!");
    } else {
      setError("");
    }

    setUrl(url);
  };

  return <TextInput value={url} onChange={validateUrl} error={error} />;
};

export default UrlInput;
