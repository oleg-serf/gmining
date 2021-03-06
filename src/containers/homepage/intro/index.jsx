import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { DownAngle } from "../../../components/icon";

const Intro = ({ data, stockItem }) => {
  return (
    <section className="intro-section py-12 max-w-78 mx-auto py-4 global-x-spacing">
      <div class="grid py-6 gap-4 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 md:grid-cols-2 md:gap-8">
        <div className="">
          <h3 className="text-secondary uppercase text-center lg:text-left">
            {data.title}
          </h3>
          <p className="mt-4 text-text text-left">
            {documentToReactComponents(JSON.parse(data.content.raw))}
          </p>
        </div>
        {stockItem && (
          <div className="flex lg:border-secondary lg:border lg:border-l-0 lg:border-solid lg:p-6 lg:pl-0">
            <div className="w-full bg-gray-200 rounded flex">
              <div className="m-6 md:my-auto">
                <h4 className="text-primary uppercase mb-2">
                  Tsx-v {stockItem.ticker}
                </h4>
                <div className="flex flex-col lg:gap-2 gap-1">
                  <div className="flex gap-1">
                    <p className="lg:min-w-48 lg:max-w-52 text-text lg:text-primary mr-2 sm:mr-0">
                      {stockItem.stockPriceTitle}
                    </p>
                    <p className="text-text">
                      {stockItem.stockPrice} {stockItem.stockChangeInValue}(
                      {stockItem.stockChangeInPercent})
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <p className="lg:min-w-48 lg:max-w-52 text-text lg:text-primary mr-2 sm:mr-0">
                      {stockItem.marketCapTitle}
                    </p>
                    <p className="text-text">{stockItem.marketCap}</p>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    <p className="lg:min-w-48 lg:max-w-52 text-text lg:text-primary mr-2 sm:mr-0">
                      {stockItem.spotGoldTitle}
                    </p>
                    <p className="text-text flex items-center">
                      {stockItem.spotGold}
                      {/* <span className="pl-3 text-red-600">
                        <DownAngle size={14} color="red" />
                      </span>
                      <span className="pl-2 text-red-600 truncate">
                        {stockItem.goldChangeInValue} (
                        {stockItem.goldChangeInPercent})
                      </span> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:flex flex-none gap-12"></div>
    </section>
  );
};

export default Intro;
