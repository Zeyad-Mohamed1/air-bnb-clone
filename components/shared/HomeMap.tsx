import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

export function HomeMap({ country }: { country: string }) {
  const LazyMap = dynamic(() => import("@/components/shared/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap country={country} />;
}
