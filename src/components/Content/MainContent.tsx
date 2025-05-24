import React, { useState, useEffect, useRef } from "react";
import { ContentItem, TabType } from "../../types";
import ContentCard from "./ContentCard";
import Tabs from "../shared/Tabs";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

interface MainContentProps {
  contentItems: ContentItem[];
  tabs: Array<{ id: TabType; label: string }>;
}

const MainContent: React.FC<MainContentProps> = ({ contentItems, tabs }) => {
  const [activeTab, setActiveTab] = useState<TabType>("owned");
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current || !filterContainerRef.current) return;

      const containerRect = filterContainerRef.current.getBoundingClientRect();
      const filterRect = filterRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const headerHeight = 112; // 7rem in pixels

      // Calculate the point where the filter should stop
      const stopPoint = viewportHeight - filterRef.current.offsetHeight;

      if (containerRect.top <= headerHeight) {
        // If container hits the top header area
        if (window.innerHeight >= filterRect.bottom) {
          // If filter bottom is visible, stick to bottom
          filterRef.current.style.position = "fixed";
          filterRef.current.style.top = `${stopPoint}px`;
          filterRef.current.style.width = `${containerRect.width}px`;
        } else if (containerRect.bottom <= filterRect.height + headerHeight) {
          // If reaching the end of container, switch to absolute
          filterRef.current.style.position = "absolute";
          filterRef.current.style.top = `${
            containerRect.height - filterRect.height
          }px`;
          filterRef.current.style.width = "100%";
        } else {
          // Normal scrolling
          filterRef.current.style.position = "relative";
          filterRef.current.style.top = "0";
          filterRef.current.style.width = "100%";
        }
      } else {
        // Reset to normal flow
        filterRef.current.style.position = "relative";
        filterRef.current.style.top = "0";
        filterRef.current.style.width = "100%";
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const filterCategories = [
    "Listing type",
    "Marketplace",
    "Status",
    "Price range",
    "Token",
    "Aspect ratio",
    "Media types",
    "Miscellaneous",
    "Categories",
    "Collections",
    "Artists",
    "Curators",
    "Tags",
    "Attributes",
    "Artists",
    "Curators",
    "Tags",
    "Attributes",
    "Artists",
    "Curators",
    "Attributes",
  ];

  return (
    <div className="w-full">
      <div className="sticky top-16 bg-white z-10 mb-6 flex items-center justify-between py-4">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex items-center space-x-2">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button className="p-2 hover:bg-gray-100 transition-colors">
              <ArrowLeftIcon size={16} />
            </button>
            <div className="w-px bg-gray-200"></div>
            <button className="p-2 hover:bg-gray-100 transition-colors">
              <ArrowRightIcon size={16} />
            </button>
          </div>

          <button
            className={`flex items-center border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors ${
              showFilters ? "bg-gray-100" : ""
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontalIcon size={16} className="mr-2" />
            <span className="text-sm">Filters</span>
          </button>

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-sm">Sort by: Trending</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
            showFilters ? "w-3/4" : "w-full"
          }`}
        >
          {contentItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>

        {showFilters && (
          <aside
            ref={filterContainerRef}
            className="w-1/4"
            style={{ position: "relative" }}
          >
            <div
              ref={filterRef}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                Filters
              </h2>

              <div>
                <div className="relative pb-4">
                  <input
                    type="text"
                    placeholder="Search artwork..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  {filterCategories.map((filter, index) => (
                    <div
                      key={`${filter}-${index}`}
                      className="border-t border-gray-100 pt-3 last:pb-4"
                    >
                      <button className="w-full flex items-center justify-between text-gray-600 hover:text-gray-900">
                        <span>{filter}</span>
                        <span>+</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default MainContent;
