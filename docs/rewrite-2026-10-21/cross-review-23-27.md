# Independent review: lectures 23–27

Reviewer: query-execution group, independently of the author of these lessons. Status: content accepted for integration; no technical blocker found in the reviewed teaching bodies. This is a content/semantics review, not website rendering or deployment evidence.

## Read scope and quality findings

Read the complete five EN and five VI teaching records, including all 25 paired sections, code examples, tables, exercises and source-scope notes. The complete Enrol/Teach witness trace, reversed containment map, canonical database, minimization, join-tree/GYO, branching semijoin, placement/shuffle examples and CAP history are present at equal depth in both languages. Independently checked paired table/code-block counts and section IDs across all five records; they agree.

The draft explains the operation before naming it: e.g. a consistent enrolment/teacher witness before homomorphism; missing child support before semijoin; a completed East write followed by a stale West read before linearizability/CAP. It separates membership decision from output enumeration and explains why a polynomial decision bound cannot cover arbitrarily large output. In minimization it preserves constants and distinguishes repeated body variables from output variables. The source popularity snapshots are explicitly historical.

## Changed-input checks, solved independently

1. **Containment:** use `R={(a,1),(b,2),(a,3),(c,4)}`, `S={2,3}`. `Qstrong(x):-R(x,y),S(y)` outputs `{a,b}`; `Qweak(x):-R(x,z)` outputs `{a,b,c}`. An independent recursive CQ evaluator reproduced both sets. The universal inclusion is strong⊆weak; its mapping goes weak→strong (`x→x,z→y`), not the other way. `c` is the concrete counterexample to reverse containment on this database. Head-position preservation remains necessary.
2. **Branching semijoin:** change the lesson's U to `{m}` while keeping `R={(a,1),(b,1),(c,2)}`, `S={(1,k),(2,m)}`, `T={b,c}`. `S⋉U={(2,m)}`; `R⋉S={(c,2)}`; filtering T retains `{(c,2)}`. Global witness is A=c,B=2,C=m. Computed with independent set comprehensions. This verifies the support argument transfers when a different branch survives.
3. **Cycle counterexample:** independently evaluated the lesson's R/S diagonal and T off-diagonal three-atom query. Result is empty despite each tuple having separate neighbor support. The tree-specific guarantee is correctly qualified.
4. **Parallel scan:** changed to 960 GB, six 2 GB/s workers. Serial=480 s; ideal evenly partitioned phase=80 s, before startup/network/skew. Changed barrier times [2,2,2,11] still require 11 s, not their mean. The lesson's critical-path reasoning transfers.
5. **Network movement:** changed to R=80 GB,S=2 GB,five workers. A single-holder S broadcast sends four extra copies=8 GB. Independently random initial placement yields `(80+2)×4/5=65.6 GB` expected shuffle. These are explicitly different starting-state models; already compatible placement costs neither of those input shuffles. The draft correctly states this limitation.
6. **CAP:** change the history to initial price70, East acknowledges75, then a later West read begins while still isolated. Returning70 violates real-time single-copy behavior; waiting indefinitely or refusing cannot meet formal successful-read availability. Returning guessed75 cannot be a general solution: West has the same observed state in an alternative execution with no East write. The draft's distinction between CAP and ACID consistency is correct, as is its qualification of BASE convergence and merge policies.

## Non-blocking observations

- Some exact pre-existing Vietnamese takeaway asides retain English words such as worker or eventual consistency. The surrounding rewritten text defines these concepts in Vietnamese, so this does not create a technical gap. Exact preservation of those asides is a repository compatibility choice, not a need to weaken the explanations.
- The network comparison explicitly changes starting states rather than presenting 7 versus 105.875 GB as a universal broadcast/shuffle rule. Keep those assumption sentences when editing for brevity.
- Do not remove the Boolean/membership qualifiers from the acyclic evaluation bounds or the no-extra-constraints qualifier from the containment theorem.

No canonical lesson file outside my owned 13–18 group was modified during this review. Final browser/mobile validation and fresh-source-page evidence for 23–27 remain the integrating agent/author's responsibility.
