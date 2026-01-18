"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import { updateAccountGroup } from "@lib/data/account-group";
import Checkbox from "@modules/common/components/checkbox";

type Props = {
  value?: boolean;
};

const PurchasingGroupForm = ({ value }: Props) => {
  const [isPurchasingGroupMember, setIsPurchasingGroupMember] = useState(
    value ?? false,
  );
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
        label="Adhérent à un groupement d'achat"
        currentInfo={value ? "Vrai" : "Faux"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Checkbox
          checked={isPurchasingGroupMember}
          label="Adhérent à un groupement d'achat"
          id="is_purchasing_group_member"
          name="is_purchasing_group_member"
          onChange={() => setIsPurchasingGroupMember((prevState) => !prevState)}
        />
      </AccountInfo>
    </form>
  );
};

export default PurchasingGroupForm;
