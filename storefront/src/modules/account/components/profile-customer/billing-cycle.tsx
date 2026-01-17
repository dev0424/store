"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import NativeSelect from "@modules/common/components/native-select";
import { updateCustomerProfile } from "@lib/data/customer-profile";
import { BillingCycle } from "@types/billing-cycle";

type Props = {
  value?: string | null;
  billingCycles: BillingCycle[];
};

const BillingCycleForm = ({ value, billingCycles }: Props) => {
  const [success, setSuccess] = useState(false);
  const [state, action] = useActionState(updateCustomerProfile, {
    success: false,
    error: null,
  });

  useEffect(() => {
    setSuccess(state.success);
  }, [state.success]);

  return (
    <form action={action}>
      <AccountInfo
        label="Facturation"
        currentInfo={value}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <NativeSelect
          name="billing_cycle"
          defaultValue={value ?? ""}
          placeholder="Facturation"
        >
          {billingCycles.map((billingCycle) => (
            <option key={billingCycle.id} value={billingCycle.name}>
              {billingCycle.name}
            </option>
          ))}
        </NativeSelect>
      </AccountInfo>
    </form>
  );
};

export default BillingCycleForm;
