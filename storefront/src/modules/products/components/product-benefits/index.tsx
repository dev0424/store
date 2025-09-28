import React from "react";
import {
  HiOutlineCreditCard,
  HiOutlineReply,
  HiOutlineTruck,
} from "react-icons/hi";

const ProductBenefits = () => {
  return (
    <div className="text-small-regular">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <HiOutlineTruck size={24} />
          <div>
            <span className="font-semibold">Lorem ipsum</span>
            <p className="max-w-sm text-ui-fg-subtle">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
              ipsam nesciunt provident veritatis? Modi, tempora!
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <HiOutlineReply size={24} />
          <div>
            <span className="font-semibold">Lorem ipsum</span>
            <p className="max-w-sm text-ui-fg-subtle">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
              ipsam nesciunt provident veritatis? Modi, tempora!
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <HiOutlineCreditCard size={24} />
          <div>
            <span className="font-semibold">Lorem ipsum</span>
            <p className="max-w-sm text-ui-fg-subtle">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
              ipsam nesciunt provident veritatis? Modi, tempora!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBenefits;
