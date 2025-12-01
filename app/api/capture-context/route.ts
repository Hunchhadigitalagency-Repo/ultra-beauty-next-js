export async function POST() {
  try {
    const url =
      "https://uat-bank-getpay.nchl.com.np/ecom-web-checkout/v1/secure-merchant/transactions";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "pap-info": process.env.NEXT_PUBLIC_PAP_INFO || "",
        "opr-key": process.env.NEXT_PUBLIC_OPR_KEY || "",
        "ins-key": process.env.NEXT_PUBLIC_INS_KEY || "",
      },
      body: JSON.stringify({
        amount: 1000,
        currency: "NPR",
      }),
    });

    const rawText = await response.text();

    console.log("STATUS:", response.status);
    console.log("RAW RESPONSE:", rawText);

    return Response.json({
      ok: response.ok,
      status: response.status,
      raw: rawText,
    });
  } catch (err) {
    console.error("Backend crash:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
