import { NextSeo } from "next-seo";

const SEO = ({ title, ...other }) => {
  return <NextSeo title={title} {...other} />;
};

export default SEO;
