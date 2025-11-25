import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";
import type { coffees } from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Coffee = InferSelectModel<typeof coffees>;

async function Coffees() {
  let coffees: Coffee[] = [];
  let error: Error | null = null;

  try {
    coffees = await db.query.coffees.findMany({
      orderBy: (model, { desc }) => desc(model.id),
    });
  } catch (err) {
    console.error("Error fetching coffees:", err);
    error = err as Error;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading coffees. Please try again later.</p>
        {error instanceof Error && (
          <p className="mt-2 text-sm">{error.message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {coffees.map((coffee) => (
        <div key={coffee.id} className="flex w-48 flex-col items-center">
          <Image src={coffee.imageUrl} alt="food" width={192} height={192} />
          <div>{coffee.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Coffees />
      </SignedIn>
    </main>
  );
}
