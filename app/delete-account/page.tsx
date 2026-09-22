import type { Metadata } from "next";
import Navbar from "../components/navbar";
import Logo from "../components/logo";
import { Reveal } from "../components/anim";
import { PRIVACY_EMAIL, STUDIO_NAME } from "../lib/site";

export const metadata: Metadata = {
  title: "Delete account — Aks",
  description:
    "How to request deletion of your Aks account and data.",
  alternates: { canonical: "/delete-account" },
};

const container = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

const steps = [
  {
    n: "01",
    t: "Disconnect what you connected (optional)",
    d: "In the app, you can remove any connected calendar, task list, or inbox first. This stops any further syncing right away.",
  },
  {
    n: "02",
    t: "Send a deletion request",
    d: "Contact the developer from the same email address you use with Aks, and say you'd like your account deleted.",
  },
  {
    n: "03",
    t: "Get a confirmation",
    d: "Once your account data has been removed, you'll receive a confirmation that it's done.",
  },
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#171717]">
      <Navbar />
      <main className={`${container} max-w-[720px] py-14 md:py-20`}>
        <Reveal>
          <h1 className="text-[34px] leading-[1.1] font-medium tracking-[-0.025em] md:text-[44px]">
            Delete your account
          </h1>
          <p className="mt-4 text-[16px] leading-[1.7] text-[#6B6B6B]">
            If you want to leave Aks, you can have your account and its data
            deleted. Here&apos;s how it works.
          </p>

          <ol className="mt-10 border-t border-[#E8E8E5]">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4 border-b border-[#E8E8E5] py-5">
                <span className="w-8 shrink-0 font-mono text-[13px] text-[#9a9a96]">
                  {s.n}
                </span>
                <div>
                  <p className="text-[15.5px] font-medium text-[#171717]">{s.t}</p>
                  <p className="mt-1 text-[14.5px] leading-[1.65] text-[#6B6B6B]">
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-[10px] border border-[#E8E8E5] bg-white p-5">
            <p className="text-[15px] font-medium text-[#171717]">
              Request deletion
            </p>
            <p className="mt-1.5 text-[14.5px] leading-[1.65] text-[#6B6B6B]">
              Write to{" "}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="font-medium break-all text-[#171717] underline underline-offset-4"
              >
                {PRIVACY_EMAIL}
              </a>{" "}
              from the email address you use with Aks, and say you&apos;d like
              your account deleted. Aks is developed by Harsh Kumar Singh at
              Miyal, so your request goes directly to the person who builds it.
            </p>
          </div>

          <div className="mt-10 space-y-8 text-[15.5px] leading-[1.7] text-[#444443]">
            <section>
              <h2 className="text-[19px] font-medium text-[#171717]">
                What gets deleted
              </h2>
              <p className="mt-2">
                Your account profile, your Mirror conversations and history,
                and the connections to any services you linked — along with
                anything Aks stored to make those connections work.
              </p>
            </section>
            <section>
              <h2 className="text-[19px] font-medium text-[#171717]">
                What may be kept
              </h2>
              <p className="mt-2">
                Some records may be kept where the law requires it (for
                example, purchase records). Anything kept this way isn&apos;t
                used for any other purpose.
              </p>
            </section>
          </div>
        </Reveal>
      </main>
      <footer className="border-t border-[#E8E8E5]">
        <div className={`${container} flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between`}>
          <Logo sub={false} />
          <p className="text-[13px] text-[#9a9a96]">© 2026 {STUDIO_NAME}</p>
        </div>
      </footer>
    </div>
  );
}
