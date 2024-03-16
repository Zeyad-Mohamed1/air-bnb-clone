"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";

const AddFavouriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size={"icon"}
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          type="submit"
          size={"icon"}
          variant={"outline"}
          className="bg-primary-foreground"
        >
          <Heart className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export function DeleteFromFavouriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size={"icon"}
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          type="submit"
          size={"icon"}
          variant={"outline"}
          className="bg-primary-foreground"
        >
          <Heart className="h-4 w-4 text-primary" fill="#e21c49" />
        </Button>
      )}
    </>
  );
}

export default AddFavouriteButton;
