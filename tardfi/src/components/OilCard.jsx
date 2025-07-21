import { useNavigate } from "react-router-dom";

const OilCard = ({ id, location, seller, quantity, icon }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] mx-auto md:w-full border border-gray-800 shadow  rounded-2xl">
      <img src={icon} alt="" className="w-full rounded-2xl h-44" />
      <div className="w-[94%] mx-auto py-2">
        <h2 className="text-base font-semibold">{location}</h2>
        <div className="flex items-center gap-x-1.5 text-sm py-2">
          <p className="">Seller: </p>
          <p className="">{seller}</p>
        </div>
        <div className="flex items-center gap-x-1.5 text-sm">
          <p className="">Quantity: </p>
          <p className="">{quantity} barrels</p>
        </div>
        <div className="w-full pt-5 pb-2">
          <button
            className="bg-green-700 cursor-pointer capitalize text-sm w-full rounded-2xl py-1"
            onClick={() => navigate(`/trade/${id}`)}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OilCard;
