import React from "react";

const PendingRegistrationMessage = () => {
  return (
    <div className="mb-4 rounded-md border border-gray-200 p-4">
      <p>
        Your registration is pending. You’ll be able to shop once it’s approved.
        We’ll email you when it’s ready.
      </p>
    </div>
  );
};

export default PendingRegistrationMessage;
