import { Link } from "react-router-dom";
import MarketCard from "../crypto/MarketCard.jsx";

const ExploreSection = () => {
  return (
    <section className="w-full bg-[#f5f5f2] px-10 py-28">
      <div className="mx-auto grid max-w-375 items-center gap-16 lg:grid-cols-[0.95fr_0.9fr]">
        {/* LEFT TEXT */}
        <div className="max-w-175">
          <h2 className="text-[45px] font-normal leading-[1.02] tracking-[-0.04em] text-black">
            Explore crypto like Bitcoin,
            <br />
            Ethereum, and Dogecoin.
          </h2>

          <p className="mt-8 text-[20px] leading-[1.45] text-[#5b616e]">
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
          </p>

          <Link 
            to="/explore"
            className="mt-10 inline-flex items-center h-15 rounded-full bg-black px-12 text-[20px] font-semibold text-white hover:bg-[#111] transition-colors"
          >
            See more assets
          </Link>
        </div>

        {/* RIGHT CARD */}
        <div className="block w-full min-w-0 md:flex-1">
          <MarketCard />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
