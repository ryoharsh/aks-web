"use client";

import { useState } from "react";
import { Cancel01Icon, Menu01Icon } from "hugeicons-react";
import Logo from "./logo";
import { NAV_LINKS } from "../lib/site";
import { useScrolled } from "./anim";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ${
        scrolled
          ? "border-b border-[#E8E8E5] shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 transition-[height] duration-200 md:px-8 ${
          scrolled ? "h-[54px]" : "h-[64px]"
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] text-[#6B6B6B] transition-colors hover:text-[#171717]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#availability"
            className="rounded-[8px] bg-[#171717] px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#2b2b2b]"
          >
            Get Aks
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E8E8E5] bg-white text-[#171717] md:hidden"
        >
          {open ? <Cancel01Icon size={17} /> : <Menu01Icon size={17} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#E8E8E5] bg-[#FAFAF8] px-5 pt-3 pb-5 md:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#E8E8E5] py-3 text-[15px] text-[#171717] last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#availability"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-11 items-center justify-center rounded-[8px] bg-[#171717] text-[15px] font-medium text-white"
          >
            Get Aks
          </a>
        </div>
      )}
    </header>
  );
}
