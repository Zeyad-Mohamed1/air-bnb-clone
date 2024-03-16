"use client";
import { categoryItems } from "@/app/lib/categoryItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathName = usePathname();

  const createQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex gap-x-10 mt-5 w-full lg:overflow-x-hidden overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          href={pathName + "?" + createQuery("filter", item.name)}
          key={item.id}
          className={cn(
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center"
          )}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="w-6 h-6"
              width={24}
              height={24}
              priority
            />
          </div>
          <p className="text-sm font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MapFilterItems;
