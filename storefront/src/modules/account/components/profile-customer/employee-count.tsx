"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import Input from "@modules/common/components/input";
import { updateCustomerProfile } from "@lib/data/customer-profile";

type Props = {
  value?: number | null;
};

const EmployeeCountForm = ({ value }: Props) => {
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
        label="NB de salariés"
        currentInfo={value?.toString() || "-"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Input
          type="number"
          label="NB de salariés"
          name="employee_count"
          defaultValue={value ?? undefined}
        />
      </AccountInfo>
    </form>
  );
};

export default EmployeeCountForm;
