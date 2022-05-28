import { GetServerSideProps } from "next";
import { getUrlData } from "./api/v1/url/[slug]";

const RedirectPage = () => {
  return;
};

export default RedirectPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slugBlackList = ["sw.js"];
  const { slug } = params || {};

  const homePageRedirect = {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };

  if (!slug || slugBlackList.includes(slug as string)) {
    return homePageRedirect;
  }

  const { originalUrl } = await getUrlData(slug as string, "true");

  if (!originalUrl) {
    return homePageRedirect;
  }

  return {
    redirect: {
      permanent: false,
      destination: originalUrl,
    },
  };
};
