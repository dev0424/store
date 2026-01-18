"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import NativeSelect from "@modules/common/components/native-select";
import { updateAccountGroup } from "@lib/data/account-group";

type Props = {
  value?: string | null;
};

const CorporateStatusForm = ({ value }: Props) => {
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
        label="Statut"
        currentInfo={value === "subsidiary" ? "Filiale" : "Indépendant"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <NativeSelect
          id="corporate_status"
          name="corporate_status"
          defaultValue={value ?? ""}
          placeholder="Statut"
        >
          <option key="subsidiary" value="subsidiary">
            Filiale
          </option>
          <option key="independent" value="independent">
            Indépendant
          </option>
        </NativeSelect>
      </AccountInfo>
    </form>
  );
};

export default CorporateStatusForm;
