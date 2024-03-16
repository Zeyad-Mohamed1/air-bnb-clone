"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId,
      },
    });
    return redirect(`/create/${data?.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data?.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data?.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data?.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId,
      },
    });
    return redirect(`/create/${data?.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  try {
    const data = await prisma.home.update({
      where: {
        id: homeId,
      },
      data: {
        categoryName: categoryName,
        addedCategory: true,
      },
    });
    return redirect(`/create/${homeId}/description`);
  } catch (error) {
    return redirect(`/create/${homeId}/description`);
  }
}

export async function createDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const image = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;
  const guests = formData.get("guest") as string;
  const rooms = formData.get("room") as string;
  const bathrooms = formData.get("bathroom") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${image.name}-${new Date()}`, image, {
      cacheControl: "2592000",
      contentType: "image/*",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: rooms,
      bathrooms: bathrooms,
      guests: guests,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const country = formData.get("country") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: country,
    },
  });

  return redirect(`/`);
}

export async function addToFavourite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favourite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });
  revalidatePath(pathName);
}

export async function deleteFavourite(formData: FormData) {
  const favouriteId = formData.get("favouriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;
  const data = await prisma.favourite.delete({
    where: {
      id: favouriteId,
      userId: userId,
    },
  });
  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      homeId: homeId,
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    },
  });
  return redirect(`/`);
}
