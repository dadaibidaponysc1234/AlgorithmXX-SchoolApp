"use client";

export const dynamic = "force-dynamic"; // ✅ Prevents static pre-rendering

import React from "react";
import Layout from "../../Components/Studentlayout";
import { useSearchParams } from "next/navigation";

const FeesPayment = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status") || "pending";

  return (
    <Layout>
      <div>Payment Status: {paymentStatus}</div>
    </Layout>
  );
};

export default FeesPayment;
