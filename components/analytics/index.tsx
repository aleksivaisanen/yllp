import type { AnalyticsResponse } from "pages/api/v1/analytics/[slug]";

const AnalyticsPage = ({
  analyticsData,
  shortUrl,
}: {
  analyticsData?: AnalyticsResponse;
  shortUrl?: string;
}) => {
  return (
    <div className="wrapper">
      <h1 className="heading1">Analytics</h1>
      <p className="caption">URL: {shortUrl}</p>

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

export default AnalyticsPage;
