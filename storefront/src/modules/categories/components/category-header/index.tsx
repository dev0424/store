import React from "react";

type Props = {
  name: string;
  description?: string;
  thumbnail?: string;
};

const CategoryHeader = ({ name, description, thumbnail }: Props) => {
  return (
    <div className="grid grid-cols-1 items-center overflow-hidden rounded-md bg-background-secondary text-white sm:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 sm:p-16">
        <div className="flex flex-col items-baseline sm:flex-row sm:gap-2">
          <h1 className="text-xl-semi">{name}</h1>
        </div>
        {description ? (
          <div>
            <p className="text-sm leading-6 sm:text-base">{description}</p>
          </div>
        ) : null}
      </div>
      {thumbnail ? (
        <div className="flex w-full items-center justify-center">
          <img
            src={thumbnail}
            alt={name}
            className="h-40 rounded-none contain-content sm:h-64"
          />
        </div>
      ) : null}
    </div>
  );
};

export default CategoryHeader;
