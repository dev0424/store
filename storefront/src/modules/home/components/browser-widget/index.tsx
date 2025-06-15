import React from "react";
import CategorySelect from "@modules/home/components/category-select";
import { SubmitButton } from "@modules/checkout/components/submit-button";

const BrowserWidget = () => {
  return (
    <div
      className={
        "flex h-fit flex-col gap-4 rounded-md bg-background-primary p-4 text-white"
      }
    >
      <h2 className={"text-center text-lg font-bold"}>Browse our products</h2>
      <CategorySelect placeholder={"Select a department"} />
      <CategorySelect placeholder={"Select a category"} />
      <SubmitButton className="w-full bg-accent-primary py-1 font-sans text-lg font-black hover:bg-hover-accent-primary">
        Search
      </SubmitButton>
    </div>
  );
};

export default BrowserWidget;
