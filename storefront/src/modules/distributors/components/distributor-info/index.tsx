import React from "react";
import { Distributor } from "../../../../types/distributor";
import { formatDistance } from "@modules/distributors/components/distributor-card/utils";
import Divider from "@modules/common/components/divider";
import { HiLocationMarker, HiOutlineMail, HiPhone } from "react-icons/hi";

type Props = {
  distributor: Distributor;
};

const DistributorInfo = ({ distributor }: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <p className="font-black">{distributor.name}</p>
        {distributor.distance ? (
          <p className="font-black">{formatDistance(distributor.distance)}</p>
        ) : null}
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <HiLocationMarker />
          <p className="text-ui-fg-subtle">
            {distributor.address.address}, {distributor.address.postal_code}{" "}
            {distributor.address.city}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <HiPhone />
          <p className="text-ui-fg-subtle">{distributor.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineMail />
          <p className="text-ui-fg-subtle">{distributor.email}</p>
        </div>
      </div>
    </>
  );
};

export default DistributorInfo;
