import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItems from "@/components/shared/NoItems";
import ListingCard from "@/components/shared/ListingCard";

async function getFavourites(userId: string) {
  const data = await prisma.favourite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favourite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}
const FavouritesPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getFavourites(user?.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favourites</h2>
      {data.length === 0 ? (
        <NoItems title="No Favourites" description="Add some favourites" />
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

export default FavouritesPage;
