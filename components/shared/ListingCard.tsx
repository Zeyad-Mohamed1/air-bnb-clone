import { useCountries } from "@/app/lib/getCountries";
import Image from "next/image";
import Link from "next/link";
import AddFavouriteButton, {
  DeleteFromFavouriteButton,
} from "./AddFavouriteButton";
import { addToFavourite, deleteFavourite } from "@/app/action";

interface Props {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId?: string | undefined;
  isInFavourite?: boolean;
  favouriteId?: string;
  homeId?: string;
  pathName?: string;
}
const ListingCard = ({
  imagePath,
  price,
  description,
  location,
  userId,
  isInFavourite,
  favouriteId,
  homeId,
  pathName,
}: Props) => {
  const { getCountrybyValue } = useCountries();
  const country = getCountrybyValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://juimdbkbhvsajgoswqyk.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Listing Image"
          fill
          className="rounded-lg object-cover h-full mb-3"
          priority
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavourite ? (
              <form action={deleteFavourite}>
                <input type="hidden" name="favouriteId" value={favouriteId} />
                <input type="hidden" name="pathName" value={pathName} />
                <input type="hidden" name="userId" value={userId} />
                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form action={addToFavourite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span>/Night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
