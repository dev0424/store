"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { HiOutlineX, HiLocationMarker, HiOutlineSearch } from "react-icons/hi";
import DistributorCard from "@modules/distributors/components/distributor-card";
import dynamic from "next/dynamic";
import { Distributor } from "../../../../types/distributor";
import { getDistance } from "geolib";
import PageHeaderBanner from "@modules/common/components/page-header-banner";

const DistributorMap = dynamic(
  () => import("@modules/distributors/components/distributor-map"),
  { ssr: false },
);

type Props = {
  distributors: Distributor[];
};

const SearchDistributors = ({ distributors }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredDistributors, setFilteredDistributors] =
    useState<Distributor[]>(distributors);
  const [selectedDistributor, setSelectedDistributor] =
    useState<Distributor | null>(null);

  const cardListRef = useRef<HTMLDivElement>(null);

  const onClickGeoLocationButton = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Sort distributors by distance (nearest first)
        setFilteredDistributors(
          distributors
            .map((d) => {
              const distance = getDistance(userPos, {
                latitude: d.location.latitude,
                longitude: d.location.longitude,
              });
              return { ...d, distance };
            })
            .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)),
        );
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    const query = event.target.value.toLowerCase().trim();

    // If input is empty, show all distributors
    if (!query) {
      setFilteredDistributors(distributors);
      return;
    }

    setFilteredDistributors(
      distributors.filter((d) => {
        const name = d.company_name.toLowerCase();
        const city = d.location.city?.toLowerCase();
        const address = d.location.address_1?.toLowerCase();
        const postal = d.location.postal_code?.toString().toLowerCase();

        return (
          name.includes(query) ||
          city?.includes(query) ||
          address?.includes(query) ||
          postal?.includes(query)
        );
      }),
    );
  };

  const onClearInput = () => {
    setSearchValue("");
    setFilteredDistributors(distributors);
  };

  const onClickDistributor = (distributor: Distributor) =>
    setSelectedDistributor(distributor);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardListRef.current &&
        !cardListRef.current.contains(event.target as Node)
      ) {
        setSelectedDistributor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <PageHeaderBanner imageSrc={"/images/hero.webp"}>
        <h1 className="text-left text-3xl font-black text-ui-fg-base text-white">
          Trouver un <span className="text-accent-primary">distributeur</span>
        </h1>
        <div className="flex w-full items-center">
          <div className="relative w-full">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
            <input
              placeholder="Chercer par ville, code postal ou nom"
              name="distributor"
              type="text"
              className="text-md w-full rounded-l-md border-none py-2 pl-10 pr-3 font-sans shadow-none placeholder:text-[#9FA2A5] focus:outline-none"
              onChange={onChangeInput}
              value={searchValue}
            />
            {searchValue && (
              <HiOutlineX
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                onClick={onClearInput}
              />
            )}
          </div>
          <SubmitButton
            className="whitespace-nowrap rounded-l-none font-sans font-bold tracking-wide"
            onClick={onClickGeoLocationButton}
          >
            <div className="flex items-center gap-1">
              <HiLocationMarker />
              <span>Me géolocaliser</span>
            </div>
          </SubmitButton>
        </div>
      </PageHeaderBanner>
      <div className="content-container py-8 sm:py-16">
        <div ref={cardListRef} className="flex min-h-[60vh] flex-col gap-4">
          {filteredDistributors.length ? (
            <div className="grid h-[60vh] grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 overflow-auto p-[1px] pr-2">
                {filteredDistributors.map((distributor) => (
                  <DistributorCard
                    key={distributor.id}
                    distributor={distributor}
                    onClick={() => onClickDistributor(distributor)}
                    isSelected={selectedDistributor?.id === distributor.id}
                  />
                ))}
              </div>
              <div className="h-[60vh] w-full overflow-hidden rounded-md">
                <DistributorMap
                  distributors={distributors}
                  selectedDistributor={selectedDistributor}
                />
              </div>
            </div>
          ) : (
            <p className="w-full rounded-md bg-ui-bg-subtle p-4 shadow-elevation-card-rest">
              Vous n'avez aucun résultat pour le moment
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDistributors;
