import React from "react";
import Register from "@modules/account/templates/register-template";
import { getRegion } from "@lib/data/regions";
import { getActivities } from "@lib/data/activities";
import { getCustomPaymentMethods } from "@lib/data/custom-payment-methods";

const RegistrationPage = async (props: {
  params: Promise<{ countryCode: string }>;
}) => {
  const params = await props.params;
  const { countryCode } = params;
  const region = await getRegion(countryCode);
  const activities = await getActivities();
  const paymentMethods = await getCustomPaymentMethods();

  return (
    <div className="content-container flex min-h-[48vh] justify-center py-8 sm:py-16">
      <Register
        region={region}
        activities={activities}
        paymentMethods={paymentMethods}
      />
    </div>
  );
};

export default RegistrationPage;
