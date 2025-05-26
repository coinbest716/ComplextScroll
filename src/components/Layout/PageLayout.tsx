import React, { useRef, useEffect, useState } from "react";
import Header from "./Header";
import UserInfoSidebar from "../Sidebar/UserInfoSidebar";
import MainContent from "../Content/MainContent";
import { User, ContentItem, TabType } from "../../types";

interface PageLayoutProps {
  user: User;
  contentItems: ContentItem[];
  tabs: Array<{ id: TabType; label: string }>;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  user,
  contentItems,
  tabs,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const prevY = useRef(0);
  const headerHeight = 90;

  useEffect(() => {
    setViewportHeight(window.innerHeight);

    const updateSidebarHeight = () => {
      if (sidebarRef.current) {
        setSidebarHeight(sidebarRef.current.scrollHeight);
        setViewportHeight(window.innerHeight);
        setIsInitialized(true);
      }
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);
    return () => window.removeEventListener("resize", updateSidebarHeight);
  }, []);

  useEffect(() => {
    if (!sidebarRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSidebarHeight(entry.contentRect.height);
        setViewportHeight(window.innerHeight);
      }
    });

    resizeObserver.observe(sidebarRef.current);

    return () => resizeObserver.disconnect();
  }, [sidebarRef]);

  useEffect(() => {
    if (!isInitialized) return;

    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = viewportHeight - headerHeight;
      const sidebarOffset = sidebarHeight - windowHeight;
      const containerRect = sidebarRef.current.getBoundingClientRect();
      let direction = scrollY > prevY.current ? "down" : "up";

      let offset = Math.min(prevY.current - scrollY, 20);

      // console.log(
      //   direction,
      //   sidebarHeight,
      //   windowHeight,
      //   containerRect.top,
      //   headerHeight,
      //   offset,
      //   "==========================="
      // );

      if (sidebarHeight < windowHeight) {
        sidebarRef.current.style.top = `${headerHeight}px`;
      } else {
        if (direction === "up") {
          if (containerRect.top >= headerHeight - 20) {
            sidebarRef.current.style.top = `${headerHeight}px`;
          } else {
            sidebarRef.current.style.top = `${containerRect.top + offset}px`;
          }
        } else {
          if (
            containerRect.top * -1 >= sidebarOffset &&
            scrollY > sidebarOffset
          ) {
            sidebarRef.current.style.top = `-${sidebarOffset}px`;
          } else {
            sidebarRef.current.style.top = `${containerRect.top + offset}px`;
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar container */}
          <aside className="md:w-1/4">
            <div
              ref={sidebarRef}
              className="sticky"
              style={{ height: "fit-content" }}
            >
              {/* {"stick top-24"} */}
              {/* 24 = header height (96px) / 4 (since we're using rem) */}
              <UserInfoSidebar user={user} />
            </div>
          </aside>

          {/* Main content */}
          <section className="md:w-3/4">
            <MainContent contentItems={contentItems} tabs={tabs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
