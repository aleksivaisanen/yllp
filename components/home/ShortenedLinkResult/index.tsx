import { IUrl } from "models/url";
import { currentUrl } from "utils/functions";

const ShortenedLinkResult = ({ originalUrl, slug }: Partial<IUrl>) => {
  const shortenedUrl = `${currentUrl}${slug}`;
  const analyticsUrl = `${currentUrl}analytics/${slug}`;

  if (!slug) return null;

  return (
    <>
      <p className="body">
        Original URL:{" "}
        <a href={originalUrl} target="_blank" rel="noreferrer">
          {originalUrl}
        </a>
      </p>
      <p className="body">
        Shortened URL:{" "}
        <a href={shortenedUrl} target="_blank" rel="noreferrer">
          {shortenedUrl}
        </a>
      </p>
      <p className="body">
        Analytics URL:{" "}
        <a href={analyticsUrl} target="_blank" rel="noreferrer">
          {analyticsUrl}
        </a>
      </p>
    </>
  );
};

export default ShortenedLinkResult;
