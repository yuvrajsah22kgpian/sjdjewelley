import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ReturnsAndRepairs() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpenId(prev => (prev === id ? null : id));

  const items = [
    {
      id: 1,
      title: 'Returns & Refund Policy',
      body: (
        <>
          The undersigned, individually and on behalf of the Applicant, agrees
          to a <strong>25% re-stocking charge</strong> on any merchandise
          returned <strong>after 30 days</strong> from the purchase date.  
          Returning merchandise also <em>revokes any discount</em> on items the
          customer keeps.
        </>
      ),
    },
    {
      id: 2,
      title: 'Repair Services',
      body: (
        <>
          Our repair program helps customers fix damaged or malfunctioning
          products bought from us.
          <br />
          <br />
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <strong>Contact us —</strong> Provide order details, product info,
              and a description of the issue.
            </li>
            <li>
              <strong>Assessment —</strong> We determine whether the item can be
              repaired or must be replaced (warranty rules apply).
            </li>
            <li>
              <strong>Repair —</strong> Eligible items are returned to us; our
              technicians diagnose and fix the problem.
            </li>
            <li>
              <strong>Return shipping —</strong> Once repaired, we send the item
              back at no extra cost when applicable.
            </li>
          </ol>
          <p className="mt-3">
            If the item is out of warranty or repairable only for a fee, we’ll
            send you a cost estimate before work begins.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="mt-12 border-t pt-10 flex flex-col items-center justify-center">
  {items.map(({ id, title, body }) => {
    const open = id === openId;
    return (
      <div
        key={id}
        className="w-full max-w-5xl border-b last:border-0"
      >
        {/* Header */}
        <button
          onClick={() => toggle(id)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-5"
        >
          <h3 className="w-full text-center text-lg md:text-xl font-medium">
            {title}
          </h3>

          <ChevronDown
            className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Body */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out
                      ${open ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="px-4 pb-5 text-center leading-relaxed text-slate-600">
            {body}
          </div>
        </div>
      </div>
    );
  })}
</section>
  );
}