import type { AnalyticsResponse } from "pages/api/v1/analytics/[slug]";
import Table, {
  TableRow,
  TableHeading,
  TableData,
} from "components/global/Table";
import DeleteButtonLink from "./DeleteLinkButton.tsx";

const AnalyticsPage = ({
  analyticsData,
  shortUrl,
  slug,
}: {
  analyticsData: AnalyticsResponse;
  shortUrl: string;
  slug: string;
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

  const renderAnalyticsTable = (data: TableData) => {
    if (data?.rows?.length) {
      return <Table data={tableData} />;
    }
    return <p className="body">No analytics data found!</p>;
  };

  return (
    <div className="wrapper">
      <h1 className="heading1 text-center">Analytics</h1>
      <p className="caption text-center">URL: {shortUrl}</p>
      <DeleteButtonLink slug={slug} />
      {renderAnalyticsTable(tableData)}
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
      `}</style>
    </div>
  );
};

export default AnalyticsPage;
