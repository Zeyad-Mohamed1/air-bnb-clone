import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItems from "@/components/shared/NoItems";
import ListingCard from "@/components/shared/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
const MyHomes = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {data.length === 0 ? (
        <NoItems title="No Homes" description="Add some homes" />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              location={item.country as string}
              pathName="/my-homes"
              homeId={item.id}
              imagePath={item.photo as string}
              price={item.price as number}
              favouriteId={item.Favourite[0]?.id as string}
              isInFavourite={
                (item.Favourite.length as number) > 0 ? true : false
              }
              userId={user?.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyHomes;
