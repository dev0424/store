import React from "react";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HiMail as MailIcon } from "react-icons/hi";
import Image from "next/image";

const ContactBanner = () => {
  return (
    <section className="bg-gradient-to-tr from-background-primary via-background-primary to-background-secondary">
      <div className="content-container relative grid grid-cols-1 items-center gap-8 py-8 text-white sm:grid-cols-2 sm:gap-16 sm:py-16">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <div>
            <p className="text-2xl font-black text-accent-primary sm:text-4xl">
              Have a question?
            </p>
            <p className="text-2xl font-black sm:text-4xl">
              Our team is happy to help you
            </p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            natus.
          </p>
          <div className="flex items-center justify-center gap-8 sm:justify-normal">
            <LocalizedClientLink href="/contact">
              <SubmitButton className="text-md flex h-10 items-center bg-accent-primary py-1 font-sans font-bold shadow-none hover:bg-hover-accent-primary">
                <MailIcon size={20} />
                <span>Contact us</span>
              </SubmitButton>
            </LocalizedClientLink>
            <p>
              Call:{" "}
              <a href="tel:+123456789" className="underline">
                +123456789
              </a>
            </p>
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
