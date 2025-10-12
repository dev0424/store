import React from "react";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HiMail as MailIcon, HiPhone } from "react-icons/hi";
import Image from "next/image";

const ContactBanner = () => {
  return (
    <section className="bg-gradient-to-tr from-background-primary via-background-primary to-background-secondary">
      <div className="content-container relative grid grid-cols-1 items-center gap-8 py-8 text-white sm:grid-cols-2 sm:gap-16 sm:py-16">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <div>
            <p className="text-2xl font-black text-accent-primary sm:text-4xl">
              Vous êtes distributeur ?
            </p>
            <p className="text-2xl sm:text-xl">
              Contactez notre équipe pour devenir partenaire RSPI.
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 sm:justify-normal">
            <LocalizedClientLink href="/contact">
              <SubmitButton className="text-md flex h-10 items-center bg-accent-primary py-1 font-sans font-bold shadow-none hover:bg-hover-accent-primary">
                <MailIcon size={20} />
                <span>Contactez-nous</span>
              </SubmitButton>
            </LocalizedClientLink>
            <div className="flex items-center gap-2">
              <HiPhone size={20} />
              <a href="tel:+33651018300" className="underline">
                +33 651018300
              </a>
            </div>
          </div>
        </div>
        <Image
          src={"/images/contact.webp"}
          className="rounded-md object-cover"
          alt={"RSPI Store"}
          width={2400}
          height={500}
        />
      </div>
    </section>
  );
};

export default ContactBanner;
