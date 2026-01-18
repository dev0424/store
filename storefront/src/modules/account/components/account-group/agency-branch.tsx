"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import { updateAccountGroup } from "@lib/data/account-group";
import Checkbox from "@modules/common/components/checkbox";

type Props = {
  value?: boolean;
};

const AgencyBranchForm = ({ value }: Props) => {
  const [isAgencyOrBranch, setIsAgencyOrBranch] = useState(value ?? false);
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
        label="Agence ou succursale d'un groupe"
        currentInfo={value ? "Vrai" : "Faux"}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <Checkbox
          checked={isAgencyOrBranch}
          label="Agence ou succursale d'un groupe"
          id="is_agency_or_branch"
          name="is_agency_or_branch"
          onChange={() => setIsAgencyOrBranch((prevState) => !prevState)}
        />
      </AccountInfo>
    </form>
  );
};

export default AgencyBranchForm;
