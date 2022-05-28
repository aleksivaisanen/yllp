import UrlInput from "./UrlInput";
import { useState } from "react";
import Button from "components/global/Button";
import { IUrl } from "models/url";
import ShortenedLinkResult from "./ShortenedLinkResult";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [urlValidationError, setUrlValidationError] = useState("");
  const [shortenedUrlData, setShortenedUrlData] = useState<IUrl>();

  const generateLink = async () => {
    try {
      const requestBody = {
        url,
      };

      const response = await fetch("/api/v1/shorten", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setShortenedUrlData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="heading1 text-center">YLLP - Simple link shortening service</h1>
      <p className="body text-center">Insert URL you want to be shortened below</p>
      <UrlInput
        url={url}
        setUrl={setUrl}
        error={urlValidationError}
        setError={setUrlValidationError}
      />
      <Button disabled={!!urlValidationError} onClick={generateLink}>
        Generate link
      </Button>
      <ShortenedLinkResult {...shortenedUrlData} />
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
