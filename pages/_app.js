import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { DefaultSEO } from "../lib/seo";

import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSEO />
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default MyApp;
