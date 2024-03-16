import ListingCard from "@/components/shared/ListingCard";
import NoItems from "@/components/shared/NoItems";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favourite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

const Reservations = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) redirect("/");
  const data = await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>
      {data.length === 0 ? (
        <NoItems title="No Reservations" description="Add some reservations" />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favourites"
              homeId={item.Home?.id}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              favouriteId={item.Home?.Favourite[0]?.id as string}
              isInFavourite={
                (item.Home?.Favourite.length as number) > 0 ? true : false
              }
              userId={user?.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Reservations;
