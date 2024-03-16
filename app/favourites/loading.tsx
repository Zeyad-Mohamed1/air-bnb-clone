import SkeletonCard from "@/components/shared/SkeletonCard";

const FavouriteLoading = () => {
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favourites</h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
};

export default FavouriteLoading;
