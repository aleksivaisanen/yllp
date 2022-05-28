import type { NextPage } from "next";
import BaseLayout from "components/global/BaseLayout";
import HomePage from "components/home";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  );
};

export default Home;
