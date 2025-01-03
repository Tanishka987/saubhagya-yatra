import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Button } from "./ui/button";
import Aipan from "./aipan";
export function Footer() {
  return (
    <footer className="w-full min-h-[300px] flex flex-col justify-between bg-teal-50 py-[60px] relative">
      <Aipan className="top-0 left-0 w-full" />
      <div className="container max-w-4xl mx-auto flex justify-between pt-6">
        <div className="footer-column">
          <h3 className="font-semibold mb-4 text-center">Navigate</h3>
          <nav>
            <ul className="flex flex-col text-sm">
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link href="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link href="/blogs">Blogs</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link href="/packages">Packages</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-column">
          <h3 className="font-semibold mb-4 text-center">About us</h3>
          <nav>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link href="/about" className="hover:text-gray-300">
                    About us
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link href="https://wa.me/917253970320?text=Inquiry%20about%20Char-Dhaam%20services" className="hover:text-gray-300">
                    Contact us
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-column">
          <h3 className="font-semibold mb-4 text-center">Socials</h3>
          <nav>
            <ul className="social-icons flex flex-col gap-1">
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link
                    href="https://www.facebook.com"
                    className="flex items-center gap-1"
                  >
                    <FaFacebook className="text-md" />
                    facebook
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link
                    href="https://www.instagram.com"
                    className="flex items-center gap-1"
                  >
                    <FaInstagram className="text-md" />
                    instagram
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild className="h-fit w-fit">
                  <Link
                    href="https://www.twitter.com"
                    className="flex items-center gap-1"
                  >
                    <FaTwitter className="text-md" />
                    twitter
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full mt-6 relative border-t border-neutral-200 h-16 grid place-content-center">
        <div className="text-center p-2 text-slate-600 text-xs">
          Copyright © aryan-shaily
        </div>
      </div>
      <Aipan className="bottom-0 left-0 w-full rotate-180" />
    </footer>
  );
}
