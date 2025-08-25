"use client";

interface SummaryCartProps {
  subtotal: number;
  shipping: number;
  tax: number;
  savings: number;
  total: number;
  itemCount: number;
}

const SummaryCart: React.FC<SummaryCartProps> = ({
  subtotal,
  shipping,
  tax,
  savings,
  total,
  itemCount
}) => {
  return (
    <aside className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 h-min self-start">
      <h3 className="text-xl font-serif mb-2">Summary</h3>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">${subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span>US & Int. Shipping</span><span>Free</span></div>
        <div className="flex justify-between"><span>Taxes/Duties Estimate <span className="underline cursor-pointer text-gray-600">Estimate taxes</span></span><span>TBD</span></div>
      </div>
      <div className="mb-4">
        <button className="text-[#b58827] underline">Promo Code</button>
      </div>
      <div className="flex justify-between items-center text-lg font-semibold mb-2">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
      <div className="text-sm text-gray-500 mb-4">Ships by: <span className="font-semibold text-black">Thursday, February 6</span></div>
      <button className="w-full py-3 bg-[#d4a041] text-white font-bold rounded-lg hover:bg-[#b58827] mb-4">CHECKOUT</button>
      <div className="mb-2">
        <span className="text-xs text-gray-600 mb-2 block">We Accept</span>
        <div className="flex space-x-2 mb-2">
          <img src="/visa.svg" alt="Visa" className="h-7" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-7" />
          <img src="/discover.svg" alt="Discover" className="h-7" />
          <img src="/paypal.svg" alt="PayPal" className="h-7" />
          <img src="/gpay.svg" alt="Google Pay" className="h-7" />
          <img src="/bitpay.svg" alt="Bitpay" className="h-7" />
        </div>
        <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
          Total Savings ${savings.toLocaleString()}
        </div>
      </div>
      <div className="border-t pt-4 mt-3 text-xs text-gray-500 text-center">
        <div>24/7 Customer Service</div>
        <div className="flex items-center justify-center space-x-4 mt-1">
          <span className="text-gray-700">1-800-354-5894</span>
          <span className="text-blue-700 cursor-pointer underline">Chat With Us</span>
        </div>
      </div>
    </aside>
  );
};

export default SummaryCart;
