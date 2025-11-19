import React from "react";
import { InlineTip } from "@medusajs/ui";

const PendingApprovalMessage = () => {
  return (
    <InlineTip variant="info" label="Attention">
      L’enregistrement de votre compte est en attente. Vous pourrez effectuer
      des achats une fois qu’elle sera approuvée. Nous vous enverrons un e-mail
      lorsque tout sera prêt.
    </InlineTip>
  );
};

export default PendingApprovalMessage;
