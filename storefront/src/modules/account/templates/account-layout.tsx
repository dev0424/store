import React, { ReactNode } from "react";

import AccountNav from "../components/account-nav";
import ContactBanner from "@modules/account/components/contact-banner";
import { ExtendedCustomer } from "@types/customer";
import PendingApprovalMessage from "modules/account/components/pending-approval-message";
import { StoreOrder } from "@medusajs/types";

interface Props {
  customer: ExtendedCustomer | null;
  children: ReactNode;
  quotes: StoreOrder[];
}

const AccountLayout = ({ customer, children, quotes }: Props) => {
  return (
    <div className="flex-1 pt-6" data-testid="account-page">
      <div className="content-container mx-auto flex h-full max-w-5xl flex-1 flex-col bg-white">
        {customer?.account_status.application_status === "PENDING" ? (
          <PendingApprovalMessage />
        ) : null}
        <div className="grid grid-cols-1 py-12 small:grid-cols-[240px_1fr]">
          <div>
            {customer && <AccountNav customer={customer} quotes={quotes} />}
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
      <ContactBanner />
    </div>
  );
};

export default AccountLayout;
