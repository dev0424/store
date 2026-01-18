"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import { updateAccountGroup } from "@lib/data/account-group";
import Checkbox from "@modules/common/components/checkbox";

type Props = {
  value?: boolean;
};

const CentralizedBillingForm = ({ value }: Props) => {
  const [isCentralized, setIsCentralized] = useState(value ?? false);
  const [success, setSuccess] = useState(false);
  const [state, action] = useActionState(updateAccountGroup, {
    success: false,
    error: null,
  });

  useEffect(() => {
    setSuccess(state.success);
  }, [state.success]);

  return (
    <form action={action}>
      <AccountInfo
        label="Facturation centralisée"
        currentInfo={value ? "Vrai" : "Faux"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Checkbox
          checked={isCentralized}
          label="Facturation centralisée"
          id="is_centralized_billing"
          name="is_centralized_billing"
          onChange={() => setIsCentralized((prevState) => !prevState)}
        />
      </AccountInfo>
    </form>
  );
};

export default CentralizedBillingForm;
