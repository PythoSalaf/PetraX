import { Chart, Drum, HeroIcon, Oil, TradeIcon } from "../assets";
import { features, plartformFeature } from "../components/Dummy";

const Home = () => {
  return (
    <div className="text-white w-full pt-[3rem]">
      <div className="layout">
        <div className="w-full flex items-start justify-between pt-4 md:pt-7 flex-col md:flex-row gap-10">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl text-gradient lg:text-4xl font-bold leading-[3rem] md:leading-[5rem]">
              Revolutionize Oil Trading <br /> with AI & Web3
            </h2>
            <p className="text-sm md:text-base lg:text-lg py-6">
              Trade oil smarter, faster, and more securely. Experience real-time
              market insights, AI-driven decisions, and a decentralized
              marketplace all in one sleek platform.
            </p>
            <div className="mt-4 flex items-center gap-8">
              <button className="custom-gradient px-4 py-2 cursor-pointer rounded-2xl">
                Connect Wallet
              </button>
              <button className="border border-[#dadada] px-8 py-1.5 rounded-2xl">
                Explore{" "}
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="w-[90%] mx-auto">
              <img src={Drum} alt="" className="w-full " />
            </div>
          </div>
        </div>
        <section className="my-8">
          <h2 className="text-2xl text-gradient font-semibold md:text-3xl capitalize">
            Feature marketplace
          </h2>
          <div className="w-full mt-6 mx-auto grid  grid-cols-2 gap-5 md:gap-10 md:grid-cols-4">
            {features.map((item) => (
              <div className="w-[90%] mx-auto md:w-[95%]" key={item.id}>
                <img
                  src={item.icon}
                  alt=""
                  className="w-full rounded-xl h-[140px]"
                />
                <h3 className="text-base font-semibold py-1">{item.title}</h3>
                <p className="text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-16 mb-3 ">
          <h2 className="text-2xl text-gradient font-semibold md:text-3xl capitalize">
            TardFi Features
          </h2>
          <div className="mt-7 grid  grid-cols-1 md:grid-cols-2 gap-7 md:gap-8 lg:grid-cols-4">
            {plartformFeature.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="border border-[#dadada] rounded-2xl py-4 w-[90%] mx-auto md:w-full"
                  key={item.id}
                >
                  <div className="w-[90%]  mx-auto">
                    <div className="text-white pb-3">
                      <Icon className="size-6 md:size-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold py-2 ">
                      {item.title}
                    </h3>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
