import Head from "next/head";
type BaseLayoutType = {
  children: JSX.Element;
  title: string
};

const BaseLayout = ({ children, title }: BaseLayoutType) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="background">
        <div className="content-container">{children}</div>
        <style jsx>{`
          .background {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--background);
          }
          .content-container {
            width: 100%;
            height: 100%;
            max-width: 1366px;
            background-color: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    </>
  );
};

export default BaseLayout;
