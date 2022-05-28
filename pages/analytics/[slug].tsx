import { GetServerSideProps } from "next";
import { getAnalyticsData } from "pages/api/v1/analytics/[slug]";
import BaseLayout from "components/global/BaseLayout";
import AnalyticsPage from "components/analytics";
import type { AnalyticsResponse } from "pages/api/v1/analytics/[slug]";

const Analytics = ({
  analyticsData,
  shortUrl,
}: {
  analyticsData: AnalyticsResponse;
  shortUrl: string;
}) => {
  return (
    <BaseLayout title="YLLT - Analytics">
      <AnalyticsPage analyticsData={analyticsData} shortUrl={shortUrl} />
    </BaseLayout>
  );
};

export default Analytics;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const slugBlackList = ["sw.js"];
  const { slug } = params || {};
  const { host } = req.headers;

  const homePageRedirect = {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };

  if (!slug || slugBlackList.includes(slug as string)) {
    return homePageRedirect;
  }

  const analyticsData = await getAnalyticsData({ slug: slug as string });

  if (!analyticsData.url) {
    return homePageRedirect;
  }

  return {
    props: {
      analyticsData: {
        originalUrl: analyticsData.url.originalUrl,
        analytics: analyticsData.aggregatedAnalytics,
      },
      shortUrl: `${host}/${analyticsData.url.slug}`,
    },
  };
};
