"use client";
import Image from "next/image";
import { FaRegHeart, FaRegTrashAlt } from "react-icons/fa";

interface ShoppingCardProps {
  ProductId: string;
  ProductName: string;
  ImgUrl: string;
  ProductDescription: string;
  OldPrice: number;
  NewPrice: number;
  Discount: string;
  count: number;
  onAdd: () => void;
  onSubtract: () => void;
  onRemove: () => void;
}

const Shoppingcard: React.FC<ShoppingCardProps> = ({
  ProductId,
  ProductName,
  ImgUrl,
  ProductDescription,
  OldPrice,
  NewPrice,
  Discount,
  count,
  onAdd,
  onSubtract,
  onRemove,
}) => {
  return (
    <div className="flex bg-white rounded-xl shadow-md p-6 items-start w-full max-w-2xl relative">
      <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mr-5">
        <Image src={ImgUrl} alt={ProductName} width={128} height={128} className="object-contain" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-lg font-bold mb-1">{ProductName}</div>
        <div className="text-sm text-gray-700 mb-1">{ProductDescription}</div>
        <div className="text-xs text-gray-400 mb-3">SKU {ProductId}</div>
        <div className="flex items-center space-x-4 mb-2">
          <span className="line-through text-gray-400 text-base">${OldPrice.toLocaleString()}</span>
          <span className="text-xl font-bold text-[#b69465]">${NewPrice.toLocaleString()}</span>
          <span className="bg-red-100 text-red-600 font-semibold px-2 py-1 rounded text-xs">{Discount}</span>
        </div>
        <div className="text-xs text-gray-400 mb-1">
          *Discount code is applied automatically
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex border rounded overflow-hidden">
            <button
              className="px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:text-gray-300"
              onClick={onSubtract}
              disabled={count <= 1}
              aria-label="decrease"
            >-</button>
            <span className="px-3 py-1 text-gray-700 bg-gray-50 min-w-[2ch] text-center">{count}</span>
            <button
              className="px-2 py-1 text-gray-500 hover:bg-gray-100"
              onClick={onAdd}
              aria-label="increase"
            >+</button>
          </div>
          <button className="flex items-center text-sm text-blue-500 hover:underline">
            <FaRegHeart className="mr-1" /> Save for later
          </button>
          <button className="flex items-center text-sm text-red-500 hover:underline ml-1" onClick={onRemove}>
            <FaRegTrashAlt className="mr-1" /> Remove
          </button>
        </div>
      </div>
      <button className="absolute top-3 right-3 p-1 text-gray-300 hover:text-red-500" onClick={onRemove}>
        <svg fill="none" height={20} width={20} stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default Shoppingcard;
