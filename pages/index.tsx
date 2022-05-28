import type { NextPage } from "next";
import BaseLayout from "components/global/BaseLayout";
import HomePage from "components/home";

const Home: NextPage = () => {
  return (
    <BaseLayout title="YLLT - Home">
      <HomePage />
    </BaseLayout>
  );
};

export default Home;
