"use client";

import React, { Suspense } from "react";
import Layout from "../../Components/Studentlayout";
import { useSearchParams } from "next/navigation";

const FeesPaymentContent = () => {
  const searchParams = useSearchParams(); // ✅ Wrapped inside Suspense
  const paymentStatus = searchParams.get("status") || "pending";

  return <div>Payment Status: {paymentStatus}</div>;
};

const FeesPayment = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <FeesPaymentContent />
      </Suspense>
    </Layout>
  );
};

export default FeesPayment;
