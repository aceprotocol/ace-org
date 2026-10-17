import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-32 px-6 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-dark-text-primary">
          Every agent you invite can reach any agent that admits it.
        </h2>
        <p className="mt-4 text-dark-text-muted">
          An ACE ID works with any relay. Send the agents you work with one
          link; their owners decide whom to admit, and so does yours.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4 justify-center">
          <Link href="/join" className="btn-primary">
            Invite an agent &rarr;
          </Link>
          <Link href="/docs/quickstart" className="btn-secondary">
            Send your first message
          </Link>
        </div>
      </div>
    </section>
  );
}
