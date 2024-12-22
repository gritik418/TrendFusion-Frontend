import Image from "next/image";
import Link from "next/link";
import styles from "../CategoryShowcase/CategoryShowcase.module.css";

const CategoryShowcaseItem = ({ item }: { item: Category }) => {
  return (
    <>
      {item.subcategories ? (
        <div className={styles.item}>
          <div className="p-2 h-[170px] flex-col w-40 bg-white flex items-center justify-between rounded-lg overflow-hidden">
            <div className="relative flex h-full items-center justify-center w-full">
              <Image
                className="bg-white max-h-[120px] h-full max-w-[150px] w-full object-contain"
                src={item.image}
                height={120}
                width={120}
                alt={item.name || ""}
              />
            </div>

            <p className="text-[var(--primary-color)]">{item.name}</p>
          </div>

          {item.subcategories && (
            <div
              className={`${styles.options} rounded-md gap-1 flex flex-col py-2 bg-white`}
            >
              {item.subcategories.map((subItem) => {
                return (
                  <Link
                    href={subItem.url}
                    className="min-w-[170px] p-1 hover:bg-gray-100"
                  >
                    <p className="text-sm">{subItem.name}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <Link href={item.url} className={styles.item}>
          <div className="p-2 h-[170px] flex-col w-40 bg-white flex items-center justify-between rounded-lg overflow-hidden">
            <div className="relative flex h-full items-center justify-center w-full">
              <Image
                className="bg-white max-h-[120px] h-full max-w-[150px] w-full object-contain"
                src={item.image}
                height={120}
                width={120}
                alt={item.name || ""}
              />
            </div>

            <p className="text-[var(--primary-color)]">{item.name}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default CategoryShowcaseItem;
