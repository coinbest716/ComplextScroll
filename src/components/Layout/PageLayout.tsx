import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const sidebarHeight = sidebarRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const sidebarOffset = sidebarHeight - windowHeight;
      console.log(
        sidebarHeight,
        windowHeight,
        window.scrollY,
        "=========1==========="
      );
      if (sidebarHeight < windowHeight) {
        sidebarRef.current.style.position = "sticky";
        sidebarRef.current.style.top = `96px`;
      } else {
        if (scrollPosition > sidebarOffset) {
          sidebarRef.current.style.position = "sticky";
          sidebarRef.current.style.top = `-${sidebarOffset}px`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar container */}
          <aside className="md:w-1/4">
            <div ref={sidebarRef}>
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
