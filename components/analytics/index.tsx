import type { AnalyticsResponse } from "pages/api/v1/analytics/[slug]";
import Table, { TableRow, TableHeading } from "components/global/Table";

const AnalyticsPage = ({
  analyticsData,
  shortUrl,
}: {
  analyticsData?: AnalyticsResponse;
  shortUrl?: string;
}) => {
  const tableHeadings: TableHeading[] = [
    { key: "date", label: "Date" },
    { key: "visits", label: "Visits" },
  ];

  const tableRows: TableRow[] =
    analyticsData?.analytics?.map((data) => ({
      date: data?._id?.date,
      visits: data?.visits,
    })) ?? [];

  const tableData = {
    headings: tableHeadings,
    rows: tableRows,
  };

  return (
    <div className="wrapper">
      <h1 className="heading1">Analytics</h1>
      <p className="caption analytics-caption">URL: {shortUrl}</p>
      <Table data={tableData} />
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          max-width: 28rem;
          width: 100%;
        }

        .analytics-caption {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

export default AnalyticsPage;
