import React, { ReactNode } from "react";
import { retrieveCustomer } from "@lib/data/customer";
import { Toaster } from "@medusajs/ui";
import AccountLayout from "@modules/account/templates/account-layout";
import { listOrders } from "@lib/data/orders";

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: ReactNode;
  login?: ReactNode;
}) {
  const customer = await retrieveCustomer();
  const quotes = await listOrders({ is_draft_order: true });

  if (customer) {
    return (
      <AccountLayout customer={customer} quotes={quotes}>
        {dashboard}
        <Toaster />
      </AccountLayout>
    );
  }

  return (
    <div className="content-container min-h-[48vh] py-8 sm:py-16">
      {login}
      <Toaster />
    </div>
  );
}
