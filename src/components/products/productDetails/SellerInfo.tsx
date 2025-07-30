import Link from "next/link";
import { GrChatOption } from "react-icons/gr";

const SellerInfo = () => {
  return (
    <section className="border rounded-lg mb-4">
      <div className="flex justify-between items-center p-4">
        <div>
          <div className="text-gray-500 text-sm mb-1">Sold by</div>
          <div>
            <Link 
              href="/shop/magic-guru/?itemId=337213053&channelSource=pdp" 
              className="text-black font-medium hover:underline"
            >
              Doob Cart
            </Link>
          </div>
        </div>
        <div>
          <span className="flex items-center gap-1 text-blue-600 cursor-pointer">
            <span>
              {/* Replace with your actual chat icon */}
              <svg className="w-4 h-4" aria-hidden="true">
                <use xlinkHref="#lazadaicon_im"></use>
              </svg>
            </span>
            <div className="flex gap-2 items-center font-medium"> <GrChatOption /> Chat Now</div>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-y">
        <div className="p-4">
          <div className="text-gray-500 text-sm">Positive Seller Ratings</div>
          <div className="text-green-500 font-semibold mt-3 text-2xl">83%</div>
        </div>
        <div className="border-x p-4">
          <div className="text-gray-500 text-sm">Ship on Time</div>
          <div className="font-semibold mt-3 text-2xl">94%</div>
        </div>
        {/* <div className="px-4 py-2">
          <div className="text-gray-500 text-sm">Chat Response Rate</div>
          <div className="text-gray-400">Not enough data</div>
        </div> */}
      </div>

      <div className="p-4 flex items-center justify-center">
        <Link 
          href="#" 
          className="text-blue-600 text-sm font-semibold"
        >
          GO TO STORE
        </Link>
      </div>
    </section>
  );
};

export default SellerInfo;