"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient as client } from "@/sanity/lib/client";
import { urlForImage as urlFor, urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FeaturedPackage } from "@/components/featuredPackage";
import { useState } from "react";

// Define the Package type
interface Package {
  price: number;
  location: [string, string]; // Array with city and state/province
  description: string;
  seats: number;
  extras?: string[]; // Optional array of extras
  mainImage: any;
  slug: { current: string; _type: "slug" };
  featured?: boolean; // Optional flag for featured packages
}

async function getData(locationFilter: string, priceFilter: number) {
  const query = `
  *[_type == 'packages' && 
    (location[0] == '${locationFilter}' || '${locationFilter}' == '') && 
    (price <= ${priceFilter} || ${priceFilter} == 0)] 
  | order(_createdAt desc)`;

  const data = await client.fetch(query);

  return data;
}

export default function Home() {
  // State for filters
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);
  const [filteredData, setFilteredData] = useState<Package[]>([]);

  // Fetch data on component mount and when filters change
  const fetchFilteredData = async () => {
    const data = await getData(locationFilter, priceFilter);
    setFilteredData(data);
  };

  // Trigger fetch when filters change
  React.useEffect(() => {
    fetchFilteredData();
  }, [locationFilter, priceFilter]);

  return (
    <>
      <div className="max-w-4xl w-full mx-auto mb-8">
        {/* Filter Section */}
        <div className="flex gap-4 mb-6">
          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Locations</option>
            <option value="Badrinath">Badrinath</option>
            <option value="Kedarnath">Kedarnath</option>
            <option value="Gangotri">Gangotri</option>
            <option value="Gangotri">Yamnotri</option>
          </select>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={0}>Any Price</option>
            <option value={500}>Under Rs. 500</option>
            <option value={800}>Under Rs. 800</option>
            <option value={1000}>Under Rs. 1000</option>
            
          </select>

          <Button onClick={fetchFilteredData}>Apply Filters</Button>
        </div>

        {/* Display Filtered Packages */}
        <div className="grid grid-cols-auto w-full gap-5 relative">
          <h1 className="text-3xl font-bold mb-4 absolute -top-28 text-white">
            Packages
          </h1>
          {filteredData.map((post: Package, idx: any) => (
            <FeaturedPackage
              key={post.slug.current + idx}
              price={post.price}
              location={post.location}
              description={post.description}
              seats={post.seats}
              imageUrl={urlForImage(post.mainImage)}
              slug={post.slug.current}
            />
          ))}
        </div>
      </div>
    </>
  );
}
