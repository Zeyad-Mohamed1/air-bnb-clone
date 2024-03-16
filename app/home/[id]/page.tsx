/* eslint-disable @next/next/no-img-element */
import { createReservation } from "@/app/action";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import CategoryShowCase from "@/components/shared/CategoryShowCase";
import { HomeMap } from "@/components/shared/HomeMap";
import ReservationButtons from "@/components/shared/ReservationButtons";
import SelectCalendar from "@/components/shared/SelectCalendar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(homeId: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      createdAt: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

const Home = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getCountrybyValue } = useCountries();
  if (!data) {
    return <div className="w-[75%] mx-auto mt-10 mb-12">Not found</div>;
  }
  const country = getCountrybyValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[450px]">
        <Image
          src={`https://juimdbkbhvsajgoswqyk.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt={data?.title as string}
          fill
          className="rounded-lg h-full w-full object-cover"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} /{country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathrooms} Bathrooms
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              }
              className="w-11 h-11 rounded-full"
              alt="user profile"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">
                Host since {data?.createdAt?.toString().slice(0, 10)}
              </p>
            </div>
          </div>
          <Separator className="my-7" />

          <CategoryShowCase title={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap country={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationButtons />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make your reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
