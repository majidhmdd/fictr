export default function TermsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Terms & Conditions</h1>
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <h2>Eligibility</h2>
        <ul>
          <li>Open to Kashmiri youth. Teams must register with correct player IDs.</li>
        </ul>

        <h2>Payment</h2>
        <ul>
          <li>Registration is confirmed only after payment and screenshot upload.</li>
          <li>All payments are non refundable.</li>
        </ul>

        <h2>Cheating & Exploits</h2>
        <ul>
          <li>
            Use of hacks, exploits, third party mods, or intentional bugs is banned. If proven, the
            entire team is disqualified and banned from all Fictr events for one year.
          </li>
          <li>
            If a player finds a bug, they must report it to Fictr immediately. Deliberate exploitation equals
            cheating.
          </li>
        </ul>

        <h2>Disputes & Decisions</h2>
        <ul>
          <li>Match referees' decisions are final. Organizers may review replays and logs.</li>
        </ul>

        <h2>No-shows & Lateness</h2>
        <ul>
          <li>Late lobby joins risk disqualification. Follow match timing strictly.</li>
        </ul>

        <h2>Prizes</h2>
        <ul>
          <li>Cash payouts processed within 7 working days after verification.</li>
          <li>Discounts applied as a code for the next tournament.</li>
        </ul>

        <h2>Data & Communication</h2>
        <ul>
          <li>You consent to receive tournament updates via email and WhatsApp.</li>
        </ul>

        <h2>Fraud</h2>
        <ul>
          <li>Submission of fake payments or false details voids registration and triggers ban.</li>
        </ul>

        <h2>Appeals</h2>
        <ul>
          <li>
            Teams may raise formal appeals within 24 hours of result publication. Appeals are reviewed once. Organizers' 
            verdict is final.
          </li>
        </ul>

        <h2>Changes</h2>
        <ul>
          <li>
            Fictr reserves the right to modify schedule, rules, and prizes with prior notice to registered teams.
          </li>
        </ul>
      </div>
    </div>
  );
}