import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryShowcaseItem = ({ item }: { item: Category }) => {
  return (
    <Link href={item.url}>
      <div className="p-2 flex-col w-40 bg-white flex items-center justify-between rounded-lg overflow-hidden">
        <div className="flex h-36 w-full">
          <Image
            className="bg-white w-full object-contain"
            src={item.image}
            height={150}
            width={150}
            alt={item.name || ""}
          />
        </div>

        <p className="text-[var(--primary-color)]">{item.name}</p>
      </div>
    </Link>
  );
};

export default CategoryShowcaseItem;
