import React from "react";
import { SubmitButton } from "@modules/checkout/components/submit-button";

const ContactBanner = () => {
  return (
    <section
      className={
        "bg-gradient-to-tr from-background-primary via-background-primary to-background-secondary"
      }
    >
      <div className={"content-container py-8 sm:py-16"}>
        <div className="grid grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <h1 className={"text-3xl font-black text-accent-primary"}>
              Got questions?
            </h1>
            <p className="font-light text-white">
              Our sales specialists are here to help
            </p>
          </div>
          <SubmitButton className="text-md flex h-10 items-center bg-accent-primary py-1 font-sans font-bold shadow-none hover:bg-hover-accent-primary">
            Contact us
          </SubmitButton>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
