"use client";
import { createLocation } from "@/app/action";
import { useCountries } from "@/app/lib/getCountries";
import CreationBottomBar from "@/components/shared/CreationBottomBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Address = ({ params }: { params: { id: string } }) => {
  const [country, setCountry] = useState("");
  const { getAllCountries } = useCountries();
  const LazyMap = dynamic(() => import("@/components/shared/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is Your Home Located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="country" value={country} />
        <div className="mx-auto w-3/5 mb-36">
          <div className="mb-5 ">
            <Select required onValueChange={(value) => setCountry(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag} {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap country={country} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
};

export default Address;
