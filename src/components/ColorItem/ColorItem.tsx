import Image from "next/image";
import { useRouter } from "next/navigation";

const ColorItem = ({
  color,
  selectedColor,
  selectedSize,
}: {
  color: Variants;
  selectedColor: Color;
  selectedSize: string;
}) => {
  const router = useRouter();

  const handleChangeColor = () => {
    color.size.forEach((size: VariantSize) => {
      if (size.size === selectedSize) {
        return router.push(`/product/${size.slug}`);
      }
    });

    return router.push(`/product/${color.size[0].slug}`);
  };

  return (
    <div
      onClick={handleChangeColor}
      className={`border-2 cursor-pointer rounded-md overflow-hidden h-[140px] flex flex-col justify-between items-center ${
        selectedColor?.colorName === color.colorName
          ? "border-4 border-gray-400"
          : ""
      }`}
    >
      <div className="min-h-[100px] min-w-[100px] flex items-center justify-center">
        <Image
          className="w-full object-contain"
          src={color.colorImage}
          alt={color.colorName}
          height={120}
          width={50}
        />
      </div>
      <p className="text-xs font-normal">{color.colorName}</p>
    </div>
  );
};

export default ColorItem;
