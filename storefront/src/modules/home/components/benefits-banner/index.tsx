import React from "react";
import { HiOutlineTruck } from "react-icons/hi";
import { HiOutlineTag } from "react-icons/hi";
import { HiOutlineReply } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const BenefitsBanner = () => {
  return (
    <section
      className={
        "bg-gradient-to-tr from-background-primary via-background-primary to-background-secondary"
      }
    >
      <div className={"content-container py-8 sm:py-16"}>
        <div className={"flex flex-col gap-8"}>
          <h1 className={"text-center text-3xl font-black text-accent-primary"}>
            Lorem Ipsum?
          </h1>
          <div
            className={
              "grid grid-cols-1 items-center gap-4 font-light text-white sm:grid-cols-4"
            }
          >
            <div className={"flex flex-col items-center gap-2"}>
              <HiOutlineTruck className={"text-6xl"} />
              <div className={"text-center"}>
                <p className={"font-black"}>Lorem ipsum</p>
                <p>Aliquam aperiam distinctio ducimus</p>
              </div>
            </div>
            <div className={"flex flex-col items-center gap-2"}>
              <HiOutlineTag className={"text-6xl"} />
              <div className={"text-center"}>
                <p className={"font-black"}>Dolor sit amet</p>
                <p>Accusamus alias at commodi dicta</p>
              </div>
            </div>
            <div className={"flex flex-col items-center gap-2"}>
              <HiOutlineReply className={"text-6xl"} />
              <div className={"text-center"}>
                <p className={"font-black"}>Accusamus alias</p>
                <p>Ipsam, odio, possimus accusamus</p>
              </div>
            </div>
            <div className={"flex flex-col items-center gap-2"}>
              <HiOutlineShoppingBag className={"text-6xl"} />
              <div className={"text-center"}>
                <p className={"font-black"}>Eligendi eveniet</p>
                <p>Architecto et saepe vero</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsBanner;
