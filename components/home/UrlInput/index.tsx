import TextInput from "../../global/TextInput";
import { isValidHttpUrl } from "utils/functions";
import { useState } from "react";

type UrlInput = {
  url: string;
  setUrl: (url: string) => void;
};

const UrlInput = ({ url, setUrl }: UrlInput) => {
  const [error, setError] = useState("");

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
