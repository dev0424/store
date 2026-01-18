"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import Input from "@modules/common/components/input";
import { updateAccountGroup } from "@lib/data/account-group";

type Props = {
  value?: string | null;
};

const PlatformNameForm = ({ value }: Props) => {
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
        label="Nom de la plateforme"
        currentInfo={value ?? "-"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Input
          label="Nom de la plateforme"
          name="platform_name"
          required
          defaultValue={value ?? ""}
        />
      </AccountInfo>
    </form>
  );
};

export default PlatformNameForm;
