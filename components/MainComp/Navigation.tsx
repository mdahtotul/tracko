"use client";

import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  ElementRef,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import DocumentDetailNavbar from "./DocumentDetailNavbar";
import DocumentList from "./DocumentList";
import Item from "./Item";
import TrashBox from "./TrashBox";
import UserItem from "./UserItem";

export default function Navigation() {
  const search = useSearch();
  const settings = useSettings();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const createDocument = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) collapseSidebar();
    else resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapseSidebar();
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapseSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };
  const router = useRouter();
  const handleCreateNote = async () => {
    const promise = createDocument({
      title: "Untitled",
    }).then((docId) => {
      router.push(`/documents/${docId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Error creating note",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapseSidebar}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
        </div>

        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreateNote} label="New page" icon={PlusCircle} />

          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params?.documentId ? (
          <DocumentDetailNavbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
