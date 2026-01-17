"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import Input from "@modules/common/components/input";
import { updateCustomerProfile } from "@lib/data/customer-profile";

type Props = {
  value?: string | null;
};

const ApeCodeForm = ({ value }: Props) => {
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
        label="Code APE"
        currentInfo={value}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Input
          label="Code APE"
          name="ape_code"
          required
          defaultValue={value ?? ""}
        />
      </AccountInfo>
    </form>
  );
};

export default ApeCodeForm;
