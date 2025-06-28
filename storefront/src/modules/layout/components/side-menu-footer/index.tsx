import React from "react";

const SideMenuFooter = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <p className="txt-compact-small flex justify-between text-ui-fg-muted">
        © {new Date().getFullYear()} RSPI. All rights reserved.
      </p>
    </div>
  );
};

export default SideMenuFooter;
