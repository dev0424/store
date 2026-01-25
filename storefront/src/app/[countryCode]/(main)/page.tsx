import { Metadata } from "next";

import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { getRegion } from "@lib/data/regions";
import FeaturedCategories from "@modules/home/components/featured-categories";
import FeaturedCollections from "@modules/home/components/featured-collections";
import { listCollections } from "@lib/data/collections";
import WhyChooseUs from "@modules/home/components/why-choose-us";

export const metadata: Metadata = {
  title:
    "RSPI | Équipements et outillage technique pour professionnels de l’automobile",
  description:
    "RSPI fournit des outils et équipements techniques performants pour les ateliers et garages pros. Large stock, livraison rapide, qualité garantie — l’innovation au service des experts de l’automobile.",
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
    <div className="flex flex-col gap-8 sm:gap-16">
      <Hero />
      <section className="sm:content-container">
        <FeaturedCategories />
      </section>
      <section className="sm:content-container">
        <FeaturedProducts region={region} collections={collections} />
      </section>
      <WhyChooseUs />
      <section className="content-container pb-16">
        <FeaturedCollections collections={collections} />
      </section>
    </div>
  );
}
