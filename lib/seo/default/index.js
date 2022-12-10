import { DefaultSeo } from "next-seo";

import NEXT_SEO_CONFIG from "./config";

const DefaultSEO = () => {
  return (
    <>
      <DefaultSeo {...NEXT_SEO_CONFIG} />
    </>
  );
};

export default DefaultSEO;
