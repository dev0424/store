"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import NativeSelect from "@modules/common/components/native-select";
import { updateCustomerProfile } from "@lib/data/customer-profile";
import { Activity } from "@types/activity";

type Props = {
  value?: string | null;
  activities: Activity[];
};

const ActivityForm = ({ value, activities }: Props) => {
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
        label="Activité"
        currentInfo={value}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <NativeSelect
          name="activity"
          defaultValue={value ?? ""}
          placeholder="Activité"
        >
          {activities.map((activity) => (
            <option key={activity.id} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </NativeSelect>
      </AccountInfo>
    </form>
  );
};

export default ActivityForm;
