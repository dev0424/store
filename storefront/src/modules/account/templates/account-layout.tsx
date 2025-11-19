import React from "react";

import AccountNav from "../components/account-nav";
import ContactBanner from "@modules/account/components/contact-banner";
import { ExtendedCustomer } from "@types/customer";
import PendingApprovalMessage from "modules/account/components/pending-approval-message";

interface AccountLayoutProps {
  customer: ExtendedCustomer | null;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 pt-6" data-testid="account-page">
      <div className="content-container mx-auto flex h-full max-w-5xl flex-1 flex-col bg-white">
        {customer?.account_status.application_status === "PENDING" ? (
          <PendingApprovalMessage />
        ) : null}
        <div className="grid grid-cols-1 py-12 small:grid-cols-[240px_1fr]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
      <ContactBanner />
    </div>
  );
};

export default AccountLayout;
