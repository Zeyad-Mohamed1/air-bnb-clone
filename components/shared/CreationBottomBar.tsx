import Link from "next/link";
import { Button } from "../ui/button";
import SubmitButtons from "./SubmitButtons";

const CreationBottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButtons>Save</SubmitButtons>
      </div>
    </div>
  );
};

export default CreationBottomBar;
