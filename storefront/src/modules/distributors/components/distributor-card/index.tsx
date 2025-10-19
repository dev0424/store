import React from "react";
import { Distributor } from "../../../../types/distributor";
import { clx } from "@medusajs/ui";
import DistributorInfo from "@modules/distributors/components/distributor-info";

type Props = {
  distributor: Distributor;
  onClick?: VoidFunction;
  isSelected?: boolean;
};

const DistributorCard = ({ distributor, onClick, isSelected }: Props) => {
  return (
    <div
      className={clx(
        "flex w-full cursor-pointer flex-col gap-4 rounded-md border border-transparent bg-ui-bg-subtle p-4 shadow-elevation-card-rest transition-shadow duration-150 ease-in-out hover:shadow-elevation-card-hover",
        { "border-[#9FA2A5]": isSelected },
      )}
      onClick={onClick}
      tabIndex={0}
    >
      <DistributorInfo distributor={distributor} />
    </div>
  );
};

export default DistributorCard;
