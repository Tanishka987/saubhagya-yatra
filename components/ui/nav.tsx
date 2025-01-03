"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sanityClient } from "@/sanity/lib/client";
import { Skeleton } from "@/components/ui/skeleton";
import { randomUUID } from "crypto";
import { MenuIcon } from "lucide-react";
import { Button } from "./button";

export function Navbar() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function getPackages() {
      const query = `*[_type=="packages"] {  "currentSlug": slug.current,title,description}`;
      const data = await sanityClient.fetch(query);
      setPackages(data);
    }
    getPackages();
  }, []);

  return (
    <div className="sticky flex justify-center top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl w-full px-2 md:px-0 justify-between items-center inline-flex h-[60px]">
        <Link
          href={"/"}
          className="w-fit text-xl leading-tight font-bold justify-start items-center inline-flex"
        >
          Saubhagya Yatra
        </Link>
        <NavigationMenu className="hidden md:flex items-center gap-2 md:gap-6">
          <NavigationMenuList>
            {packages ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Packages</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {packages?.map((collection: any) => (
                      <ListItem
                        key={collection.title}
                        title={collection.title}
                        href={"/packages/" + collection.currentSlug}
                      >
                        {collection.description}
                      </ListItem>
                    ))}
                    <ListItem
                      key={"see all"}
                      title="All packages"
                      href="/packages"
                    >
                      List of all the packages offered by us. We offer a variety
                      of packages tailored according to all kinds of customers.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {Array()
                  .fill(1, 3)
                  .map((_, i: number) => (
                    <ListItemSkeleton key={randomUUID()} />
                  ))}
              </ul>
            )}
            <NavigationMenuItem>
              <Link href="/blogs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blogs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/packages"
                className="w-fit p-2 text-slate-400 text-[15px] font-medium leading-tight"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() +
                    " rounded-[3px] border-2 border-slate-400"
                  }
                >
                  Book a trip
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="md:hidden items-center flex">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <nav>
                <ul className="grid gap-2 pt-4">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link href={"/packages"}>Packages</Link>
                  </li>
                  <li>
                    <Link href={"/blogs"}>Blogs</Link>
                  </li>
                  <li>
                    <Link href={"/about"}>About us</Link>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none line-clamp-1">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

const ListItemSkeleton = () => {
  return (
    <li>
      <div
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <Skeleton className="text-sm w-full min-h-5 font-medium leading-none line-clamp-1" />
        <Skeleton className="w-full min-h-10 line-clamp-2 text-sm leading-snug text-muted-foreground" />
      </div>
    </li>
  );
};
