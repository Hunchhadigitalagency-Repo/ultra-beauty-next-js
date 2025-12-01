import Head from "next/head";

export default function TestPayment() {
  return (
    <>
      <Head>
        <title>Ultra Beauty Payment Page</title>
        <script
          defer
          src="https://minio.finpos.global/getpay-cdn/webcheckout/v5/bundle.js"
        ></script>
      </Head>

      <div id="checkout"></div>
    </>
  );
}
