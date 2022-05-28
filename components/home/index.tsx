import UrlInput from "./UrlInput";
import { useState } from "react";
import Button from "components/global/Button";

const HomePage = () => {
  const [url, setUrl] = useState("");

  const generateLink = async () => {
    try {
      // generate link
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="heading1">YLLP - Simple link shortening service</h1>
      <p className="body">Insert URL you want to be shortened below</p>
      <UrlInput url={url} setUrl={setUrl} />
      <Button onClick={generateLink}>Generate link</Button>
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
