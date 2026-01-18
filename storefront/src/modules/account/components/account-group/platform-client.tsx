"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import { updateAccountGroup } from "@lib/data/account-group";
import Checkbox from "@modules/common/components/checkbox";

type Props = {
  value?: boolean;
};

const PlatformClientForm = ({ value }: Props) => {
  const [isPlatformClient, setIsPlatformClient] = useState(value ?? false);
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
        label="Client de plateforme(s)-Dépôt(s)"
        currentInfo={value ? "Vrai" : "Faux"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Checkbox
          checked={isPlatformClient}
          label="Client de plateforme(s)-Dépôt(s)"
          id="is_platform_client"
          name="is_platform_client"
          onChange={() => setIsPlatformClient((prevState) => !prevState)}
        />
      </AccountInfo>
    </form>
  );
};

export default PlatformClientForm;
