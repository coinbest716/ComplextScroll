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
  const [showDetail, setShowDetail] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const prevY = useRef(0);
  const headerHeight = 150;

  useEffect(() => {
    setViewportHeight(window.innerHeight);

    const updateSidebarHeight = () => {
      if (filterRef.current && showFilters) {
        setSidebarHeight(filterRef.current.scrollHeight);
        setViewportHeight(window.innerHeight);
        setIsInitialized(true);
      }
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);
    return () => window.removeEventListener("resize", updateSidebarHeight);
  }, [showFilters]);

  useEffect(() => {
    if (!filterRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSidebarHeight(entry.contentRect.height);
        setViewportHeight(window.innerHeight);
      }
    });

    resizeObserver.observe(filterRef.current);

    return () => resizeObserver.disconnect();
  }, [filterRef]);

  useEffect(() => {
    if (!isInitialized) return;

    const handleScroll = () => {
      if (!filterRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = viewportHeight - headerHeight;
      const sidebarOffset = sidebarHeight - windowHeight;
      const containerRect = filterRef.current.getBoundingClientRect();
      let direction = scrollY > prevY.current ? "down" : "up";

      let offset = Math.min(prevY.current - scrollY, 20);

      if (sidebarHeight < windowHeight) {
        filterRef.current.style.top = `${headerHeight}px`;
      } else {
        if (direction === "up") {
          if (containerRect.top >= headerHeight - 20) {
            filterRef.current.style.top = `${headerHeight}px`;
          } else {
            filterRef.current.style.top = `${containerRect.top + offset}px`;
          }
        } else {
          if (
            containerRect.top * -1 >= sidebarOffset &&
            scrollY > sidebarOffset
          ) {
            filterRef.current.style.top = `-${sidebarOffset}px`;
          } else {
            filterRef.current.style.top = `${containerRect.top + offset}px`;
          }
        }
      }

      prevY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headerHeight, sidebarHeight, isInitialized, viewportHeight]);

  const filterCategories = [
    "Listing type",
    "Marketplace",
    "Status",
    "Price range",
    "Token",
    "Aspect ratio",
    "Media types",
    "Miscellaneous",
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
            ref={filterRef}
            className="w-1/4 sticky"
            style={{ height: "fit-content" }}
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
                      <span onClick={() => setShowDetail(!showDetail)}>+</span>
                    </button>
                    {showDetail && <div className="h-[100px]">bbbbb</div>}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default MainContent;
