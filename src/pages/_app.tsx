import '../styles/global.css';  // Ensure this path is correct based on your directory structure
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
