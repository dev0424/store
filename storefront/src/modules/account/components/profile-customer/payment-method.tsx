"use client";

import React, { useActionState, useEffect, useState } from "react";
import AccountInfo from "@modules/account/components/account-info";
import NativeSelect from "@modules/common/components/native-select";
import { updateCustomerProfile } from "@lib/data/customer-profile";
import { CustomPaymentMethod } from "@types/custom-payment-method";

type Props = {
  value?: string | null;
  paymentMethods: CustomPaymentMethod[];
};

const PaymentMethodForm = ({ value, paymentMethods }: Props) => {
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
        label="Mode de règlement"
        currentInfo={value}
        isSuccess={success}
        isError={!!state.error}
        clearState={() => setSuccess(false)}
      >
        <NativeSelect
          name="payment_method"
          defaultValue={value ?? ""}
          placeholder="Mode de règlement"
        >
          {paymentMethods.map((paymentMethod) => (
            <option key={paymentMethod.id} value={paymentMethod.name}>
              {paymentMethod.name}
            </option>
          ))}
        </NativeSelect>
      </AccountInfo>
    </form>
  );
};

export default PaymentMethodForm;
