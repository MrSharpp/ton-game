import React from "react";

type Props = {};

function RoadMap({}: Props) {
  return (
    <div>
      <h1 className="p-5 sticky top-0 z-50 backdrop-blur-lg font-bold text-xl">
        Roadmap
      </h1>

      <div className="flex flex-col gap-5">
        <section className="px-5">
          <h2 className="py-5 font-bold text-xl">Phase 1</h2>

          <ul className="list-disc px-5">
            <li>Building Community</li>
            <li>Allocation eligibility tasks</li>
          </ul>
        </section>

        <section className="px-5 mb-10">
          <h2 className="py-5 font-bold text-xl">Phase 2</h2>

          <ul className="list-disc px-5">
            <li>Snapshot</li>
            <li>TGE</li>
            <li>
              Allocation of tokens, no locking, no vesting, 92% for community &
              8% for the team and creators
            </li>
            <li>Token listing on top major exchanges</li>
            <li>Launch Aibulls Memepad at lowest fees (0.1 Ton)</li>
            <li>⁠Aibulls multi-chain swap (40+ Chains)</li>
            <li>AiBulls wallet with top-tier encryption</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default RoadMap;
