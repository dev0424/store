import { Metadata } from "next";

import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { getRegion } from "@lib/data/regions";
import FeaturedCategories from "@modules/home/components/featured-categories";
import BenefitsBanner from "@modules/home/components/benefits-banner";
import FeaturedCollections from "@modules/home/components/featured-collections";
import { listCollections } from "@lib/data/collections";

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
};

export default async function Home(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;

  const { countryCode } = params;

  const region = await getRegion(countryCode);

  const { collections } = await listCollections({
    fields: "id, handle, title, metadata",
  });

  if (!collections || !region) {
    return null;
  }

  return (
    <div className={"flex flex-col gap-8 sm:gap-16"}>
      <Hero />
      <section className="sm:content-container">
        <FeaturedCategories />
      </section>
      <section className="sm:content-container">
        <FeaturedProducts region={region} collections={collections} />
      </section>
      <BenefitsBanner />
      <section className="content-container pb-16">
        <FeaturedCollections collections={collections} />
      </section>
    </div>
  );
}
