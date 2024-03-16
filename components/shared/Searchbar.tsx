"use client";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCountries } from "@/app/lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "../ui/button";
import CreationBottomBar from "./CreationBottomBar";
import { Card, CardHeader } from "../ui/card";
import Counter from "./Counter";
import SubmitButtons from "./SubmitButtons";

const Searchbar = () => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button type="button" onClick={() => setStep(step + 1)}>
          Next
        </Button>
      );
    } else if (step === 2) {
      return <SubmitButtons>Next</SubmitButtons>;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full border px-5 py-2 flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Any Where</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>

          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4">
          <input type="hidden" name="country" value={country} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select Country</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, So That we Know What you Looking For.
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                value={country}
                onValueChange={(value) => setCountry(value)}
              >
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
              <HomeMap country={country} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select Info You Need</DialogTitle>
                <DialogDescription>
                  Please Choose Info, So That we Know What you Looking For.
                </DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How Many Guests are allowed to stay?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How Many Rooms do you have?
                      </p>
                    </div>
                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">BathRooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How Many Bathrooms do you have?
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Searchbar;
