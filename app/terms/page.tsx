import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/navbar";
import Logo from "../components/logo";
import { Reveal } from "../components/anim";
import { CONTACT_EMAIL, STUDIO_NAME } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions — Aks",
  description:
    "The Terms and Conditions for Aks: the rules for using the app, subscriptions, acceptable use, and liability.",
  alternates: { canonical: "/terms" },
};

const container = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

function Mail() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="font-medium break-all text-[#171717] underline underline-offset-4"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[15.5px] leading-[1.7] text-[#444443]">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15.5px] leading-[1.7] text-[#444443]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-[#E8E8E5] py-8">
        <h2 className="text-[19px] font-medium text-[#171717]">
          <span className="mr-2 font-mono text-[13px] text-[#9a9a96]">{n}</span>
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#171717]">
      <Navbar />
      <main className={`${container} max-w-[720px] py-14 md:py-20`}>
        <Reveal>
          <h1 className="text-[34px] leading-[1.1] font-medium tracking-[-0.025em] md:text-[44px]">
            Terms and Conditions for Aks
          </h1>
          <p className="mt-4 font-mono text-[13px] leading-relaxed text-[#6B6B6B]">
            Effective Date: September 22, 2026
            <br />
            Last Updated: September 22, 2026
          </p>
          <div className="mt-6 text-[16px] leading-[1.7] text-[#444443]">
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of Aks, a
              personal companion application developed by Harsh Kumar Singh at Miyal
              (&ldquo;Aks&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p className="mt-3">
              By creating an account, accessing, or using Aks, you agree to these Terms.
              If you do not agree with these Terms, please do not use Aks.
            </p>
          </div>
        </Reveal>

        <div className="mt-6">
          <Section n="1" title="About Aks">
            <P>
              Aks is a personal companion designed to help you talk through what is on
              your mind and make sense of information you choose to share with it.
            </P>
            <P>Depending on the features available to you, Aks may provide:</P>
            <List
              items={[
                "Text conversations",
                "Voice and speech features",
                "Context from services you choose to connect",
                "Personal information and activity context that you explicitly provide or authorize",
                "Subscription-based features",
              ]}
            />
            <P>
              Aks is a software product and should not be treated as a human,
              professional adviser, or emergency service.
            </P>
          </Section>

          <Section n="2" title="Eligibility">
            <P>
              You may use Aks only if you are legally permitted to enter into these Terms.
            </P>
            <P>
              If you are below the minimum age required to use the service under the laws
              that apply to you, you must not use Aks unless your use is legally permitted
              and any required parental or guardian involvement has been obtained.
            </P>
          </Section>

          <Section n="3" title="Your Account">
            <P>Some Aks features require an account.</P>
            <P>You are responsible for:</P>
            <List
              items={[
                "Providing accurate information when creating your account",
                "Keeping your account information up to date",
                "Keeping your authentication credentials secure",
                "All activity that occurs through your account unless it results from a security issue outside your reasonable control",
              ]}
            />
            <P>Do not share your account credentials with another person.</P>
            <P>
              If you believe that someone has accessed your account without permission,
              contact us as soon as possible.
            </P>
          </Section>

          <Section n="4" title="Your Content">
            <P>
              You may provide information to Aks, including messages, conversations,
              voice input, profile information, and information obtained through services
              you choose to connect.
            </P>
            <P>
              You retain your rights to content that you provide, subject to the rights
              and permissions necessary for us and our service providers to operate Aks.
            </P>
            <P>By using Aks, you give us permission to process your content as reasonably necessary to:</P>
            <List
              items={[
                "Provide Aks and its features",
                "Process and respond to your requests",
                "Maintain conversation history and related functionality",
                "Process voice and speech features",
                "Use connected services that you authorize",
                "Maintain security and prevent misuse",
                "Operate, maintain, and improve the service",
              ]}
            />
            <P>Our handling of personal information is described in our Privacy Policy.</P>
          </Section>

          <Section n="5" title="Connected Services">
            <P>Aks may allow you to connect third-party services such as:</P>
            <List
              items={[
                "Google Calendar",
                "Google Tasks",
                "Gmail",
                "Todoist",
                "GitHub",
                "Slack",
                "Notion",
                "Device calendar and reminders",
                "Other services supported by Aks",
              ]}
            />
            <P>
              When you connect a third-party service, you authorize Aks to access the
              information permitted by the connection and permissions you grant.
            </P>
            <P>
              Your use of those third-party services remains subject to their own terms
              and policies.
            </P>
            <P>
              You are responsible for reviewing the permissions you grant and
              disconnecting services you no longer want Aks to access.
            </P>
          </Section>

          <Section n="6" title="AI-Generated Responses">
            <P>
              Aks may use artificial intelligence and machine-learning systems to generate
              responses, process conversations, understand speech, and provide features.
            </P>
            <P>
              AI-generated responses may be incomplete, inaccurate, outdated, or
              inappropriate for a particular situation.
            </P>
            <P>
              You should use your own judgment when relying on information provided by
              Aks.
            </P>
            <P>
              Aks does not guarantee that every response will be accurate or suitable for
              your circumstances.
            </P>
          </Section>

          <Section n="7" title="Aks Is Not Professional Advice">
            <P>Aks is intended as a personal companion and software tool.</P>
            <P>Aks does not provide:</P>
            <List
              items={[
                "Medical diagnosis or treatment",
                "Mental-health diagnosis or treatment",
                "Legal advice",
                "Financial or investment advice",
                "Emergency assistance",
                "Professional counselling",
                "Any other professional service unless expressly stated otherwise",
              ]}
            />
            <P>Do not rely on Aks as a substitute for a qualified professional.</P>
            <P>
              If you are experiencing an emergency or believe you or someone else is in
              immediate danger, contact the appropriate local emergency service or a
              qualified professional.
            </P>
          </Section>

          <Section n="8" title="Voice Features">
            <P>
              When you use voice features, Aks may process microphone input and speech
              data through the technologies required to provide the feature.
            </P>
            <P>
              You are responsible for using voice features lawfully and for ensuring that
              you have the necessary rights or permissions when recording or providing
              information involving another person.
            </P>
            <P>
              Do not use Aks to secretly record or monitor another person where doing so
              would violate applicable law.
            </P>
          </Section>

          <Section n="9" title="Subscriptions and Free Trial">
            <P>
              Aks may require an active subscription or an available free trial to access
              the application or certain services.
            </P>
            <P>
              Where a free trial is offered, the duration and conditions of the trial
              will be shown to you before or during the subscription process.
            </P>
            <P>
              After a free trial ends, the applicable subscription may renew or become
              payable according to the terms displayed at the time of purchase.
            </P>
            <P>
              Subscription purchases are processed through the applicable app store or
              payment provider.
            </P>
            <P>
              Subscription prices, billing periods, renewal terms, taxes, and available
              payment methods are shown through the relevant purchase interface.
            </P>
          </Section>

          <Section n="10" title="Subscription Cancellation and Refunds">
            <P>
              You may cancel your subscription according to the cancellation process
              provided by the platform through which you purchased it.
            </P>
            <P>
              For subscriptions purchased through Google Play, cancellation and
              applicable billing rules are governed by Google Play&apos;s policies.
            </P>
            <P>
              For subscriptions purchased through Apple&apos;s App Store, cancellation
              and applicable billing rules are governed by Apple&apos;s policies.
            </P>
            <P>
              Unless otherwise required by applicable law, deleting the Aks app does not
              automatically cancel a subscription.
            </P>
            <P>
              Refunds are handled according to the applicable platform&apos;s refund
              policies and applicable law.
            </P>
          </Section>

          <Section n="11" title="Changes to Pricing and Subscriptions">
            <P>
              We may change subscription plans, prices, features, or availability in the
              future.
            </P>
            <P>
              Where required, we will provide notice of material changes before they take
              effect.
            </P>
            <P>
              Changes to subscription pricing may also be subject to the rules and
              notification requirements of the platform through which the subscription
              was purchased.
            </P>
          </Section>

          <Section n="12" title="Acceptable Use">
            <P>You agree not to use Aks to:</P>
            <List
              items={[
                "Break the law or facilitate illegal activity",
                "Harm, threaten, harass, or abuse another person",
                "Infringe another person's privacy or rights",
                "Impersonate another person or organization",
                "Attempt to gain unauthorized access to accounts, systems, or data",
                "Circumvent security or access controls",
                "Introduce malware, malicious code, or harmful content",
                "Interfere with the operation of Aks",
                "Reverse engineer, decompile, or attempt to extract source code except where permitted by applicable law",
                "Scrape or systematically extract data from Aks without permission",
                "Use Aks to secretly monitor another person",
                "Abuse integrations or third-party services",
                "Use Aks in a way that could damage the service or other users",
              ]}
            />
            <P>
              We may take reasonable action when we believe the service is being used in
              violation of these Terms or applicable law.
            </P>
          </Section>

          <Section n="13" title="Your Responsibility for Information You Provide">
            <P>You are responsible for the information and content you provide to Aks.</P>
            <P>You should not provide information that you do not have the right to provide.</P>
            <P>
              If you connect an account belonging to another person or organization, you
              must have the authority to do so.
            </P>
            <P>
              You are also responsible for reviewing AI-generated responses before acting
              on them.
            </P>
          </Section>

          <Section n="14" title="Intellectual Property">
            <P>
              Aks, including its software, design, branding, logos, interfaces, text,
              graphics, and other original materials, is owned by or licensed to Miyal
              and its applicable licensors.
            </P>
            <P>
              These Terms give you permission to use Aks for its intended personal
              purpose. They do not transfer ownership of Aks or any of its intellectual
              property to you.
            </P>
            <P>
              You may not copy, modify, distribute, sell, lease, sublicense, or create
              derivative works from Aks except where permitted by applicable law or with
              our written permission.
            </P>
          </Section>

          <Section n="15" title="Feedback">
            <P>
              If you voluntarily provide suggestions, ideas, or feedback about Aks, you
              allow us to use that feedback without owing you compensation, provided that
              doing so does not violate your rights under applicable law.
            </P>
            <P>We may use feedback to improve or develop Aks.</P>
          </Section>

          <Section n="16" title="Third-Party Services">
            <P>
              Aks may depend on third-party services, including authentication providers,
              cloud infrastructure, AI providers, payment platforms, app stores, and
              connected services.
            </P>
            <P>
              We do not control independent third-party services and are not responsible
              for their availability, security, content, policies, or actions.
            </P>
            <P>
              Your use of a third-party service may be governed by separate terms between
              you and that provider.
            </P>
          </Section>

          <Section n="17" title="Availability and Changes to Aks">
            <P>
              We may modify, update, suspend, or discontinue parts of Aks from time to
              time.
            </P>
            <P>This may be necessary because of:</P>
            <List
              items={[
                "Product development",
                "Security requirements",
                "Technical changes",
                "Third-party service changes",
                "Legal or regulatory requirements",
                "Maintenance or operational reasons",
              ]}
            />
            <P>We do not guarantee that every feature will always be available.</P>
          </Section>

          <Section n="18" title="Beta and Experimental Features">
            <P>
              Some features may be labelled as beta, experimental, preview, or otherwise
              not fully released.
            </P>
            <P>Such features may change, become unavailable, or contain errors.</P>
            <P>You use experimental features at your own discretion.</P>
          </Section>

          <Section n="19" title="Security">
            <P>
              We take reasonable measures to protect Aks and the information processed
              through it.
            </P>
            <P>However, no online service can guarantee complete security.</P>
            <P>
              You are responsible for maintaining the security of your account and device.
            </P>
          </Section>

          <Section n="20" title="Privacy">
            <P>Your use of Aks is also governed by our Privacy Policy.</P>
            <P>
              The Privacy Policy explains what information Aks may collect or process,
              why it is used, the services that may receive it, retention practices, and
              your privacy choices.
            </P>
            <P>
              Privacy Policy:{" "}
              <a
                href="/privacy"
                className="font-medium text-[#171717] underline underline-offset-4"
              >
                Privacy Policy
              </a>
            </P>
          </Section>

          <Section n="21" title="Disclaimer of Warranties">
            <P>
              To the maximum extent permitted by applicable law, Aks is provided on an
              &ldquo;as available&rdquo; and &ldquo;as is&rdquo; basis.
            </P>
            <P>We do not guarantee that:</P>
            <List
              items={[
                "Aks will always be available",
                "Aks will always work without errors",
                "Responses will always be accurate or complete",
                "AI-generated information will always be suitable for your situation",
                "Third-party integrations will always work",
                "Information obtained from connected services will always be current",
                "The service will meet every particular personal requirement",
              ]}
            />
            <P>
              Nothing in these Terms excludes or limits a legal right or consumer
              protection that cannot lawfully be excluded or limited.
            </P>
          </Section>

          <Section n="22" title="Limitation of Liability">
            <P>
              To the maximum extent permitted by applicable law, Miyal and the people
              involved in developing Aks will not be responsible for indirect,
              incidental, special, consequential, or punitive losses arising from your
              use of Aks.
            </P>
            <P>
              This may include loss of data, loss of profits, loss of business, or
              reliance on information generated or displayed by the service.
            </P>
            <P>
              Nothing in these Terms limits liability where such limitation is prohibited
              by applicable law, including liability that cannot legally be excluded or
              limited.
            </P>
          </Section>

          <Section n="23" title="Indemnification">
            <P>
              To the extent permitted by applicable law, you agree to be responsible for
              claims, losses, liabilities, and reasonable expenses arising from your
              misuse of Aks, your violation of these Terms, or your violation of another
              person&apos;s rights.
            </P>
            <P>
              This section does not apply to the extent that a claim results from our own
              unlawful conduct or from circumstances where applicable law does not permit
              indemnification.
            </P>
          </Section>

          <Section n="24" title="Suspension or Termination">
            <P>We may suspend or terminate access to Aks if:</P>
            <List
              items={[
                "You materially violate these Terms",
                "Your use creates a security or legal risk",
                "You attempt to abuse or compromise the service",
                "We are required to do so by law",
                "We discontinue the service",
              ]}
            />
            <P>
              Where reasonable and appropriate, we may provide notice before termination.
            </P>
            <P>You may stop using Aks at any time.</P>
            <P>
              Termination does not automatically remove obligations that are intended to
              continue after termination, including provisions relating to intellectual
              property, liability, disputes, and other provisions that by their nature
              should survive.
            </P>
          </Section>

          <Section n="25" title="Governing Law">
            <P>
              These Terms will be governed by the laws applicable to the relationship
              between you and Miyal, subject to any mandatory consumer-protection or
              other rights that apply in your place of residence.
            </P>
            <P>Any dispute will be handled in accordance with applicable law.</P>
            <P>
              If a specific jurisdiction, court, or dispute-resolution process is
              required for your business structure or applicable law, the relevant
              details should be added here before publication.
            </P>
          </Section>

          <Section n="26" title="Changes to These Terms">
            <P>
              We may update these Terms when Aks changes, new features are introduced, or
              legal or regulatory requirements change.
            </P>
            <P>
              When we make changes, we will update the Last Updated date at the top of
              this page.
            </P>
            <P>
              If a change materially affects your rights or obligations, we may provide
              additional notice where appropriate.
            </P>
            <P>
              Your continued use of Aks after an updated version becomes effective means
              that you accept the updated Terms, to the extent permitted by applicable
              law.
            </P>
          </Section>

          <Section n="27" title="Contact Us">
            <P>If you have questions about these Terms, contact:</P>
            <P>
              Harsh Kumar Singh
              <br />
              Miyal
              <br />
              Aks
            </P>
            <P>
              Email: <Mail />
            </P>
          </Section>

          <Reveal>
            <section className="mt-4 rounded-[10px] border border-[#E8E8E5] bg-white p-5">
              <h2 className="text-[16px] font-medium text-[#171717]">Aks in Short</h2>
              <div className="mt-2 text-[14.5px] leading-[1.7] text-[#6B6B6B]">
                <p>Aks is a personal companion, not a replacement for professional advice.</p>
                <p className="mt-2">
                  Use it responsibly, review important information before acting on it,
                  and only connect services or provide information that you have the right
                  to share.
                </p>
                <p className="mt-2">
                  Your use of Aks is subject to these Terms and our Privacy Policy.
                </p>
              </div>
            </section>
          </Reveal>
        </div>
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
