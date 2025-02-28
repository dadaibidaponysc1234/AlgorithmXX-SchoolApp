// "use client";
// import React from "react";
// import Layout from "../../Components/Studentlayout";

// const Fees_Payment = () => {
//   return (
//     <Layout>
//       <div>Fees</div>
//     </Layout>
//   );
// };

// export default Fees_Payment;
"use client";
import React, { Suspense } from "react";
import Layout from "../../Components/Studentlayout";
import { useSearchParams } from "next/navigation";

const Fees_Payment_Content = () => {
  const searchParams = useSearchParams(); // ✅ Wrapped inside Suspense
  const paymentStatus = searchParams.get("status") || "pending";

  return <div>Payment Status: {paymentStatus}</div>;
};

const Fees_Payment = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Fees_Payment_Content />
      </Suspense>
    </Layout>
  );
};

export default Fees_Payment;
