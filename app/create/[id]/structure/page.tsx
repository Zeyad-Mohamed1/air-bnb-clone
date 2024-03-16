import { createCategoryPage } from "@/app/action";
import CreationBottomBar from "@/components/shared/CreationBottomBar";
import SelectCategory from "@/components/shared/SelectCategory";
import SubmitButtons from "@/components/shared/SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StructureRoute = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describes your Home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />
        <CreationBottomBar />
      </form>
    </>
  );
};

export default StructureRoute;
