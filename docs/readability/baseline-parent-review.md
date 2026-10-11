# Independent current-release readability review

Baseline: [main commit 0a1fb0363d2c44a0ca8f508f4e964a01af128720](https://github.com/edward1503/adbs-learning-lab/commit/0a1fb0363d2c44a0ca8f508f4e964a01af128720).

The following review was supplied by the independent parent reviewer before candidate editing. It is baseline evidence, not candidate acceptance. The substantive review is preserved below.

Editorial conclusion: the core worked examples are strong, but v3.1.0 is more consistent as a revision reference than as a first-pass tutorial. The biggest problem is integration: new material often interrupts a teaching sequence, introduces notation early, or repeats warnings instead of extending the learner’s mental model.

I verified main = 0a1fb0363d2c44a0ca8f508f4e964a01af128720 through GitHub. I reviewed the current source for lessons 1, 2, 8, 9, 16–20, 23–25 and supplement 28, plus representative quiz-bank structure and routing. These are editorial judgments, not results from a human learner study. The public site did not open through my web reader; I am not claiming visual/browser validation.

## Eleven concrete fixes

### 1. Foundations: keep the introduction’s learning promise manageable

Resource: lecture-01, l1-4, “A roadmap for independent practice”

Evidence: “buffer management manages frames and replacement”

Problem: the library story introduces schema, instance and abstraction effectively. Its concluding roadmap then becomes a dense lesson on DBMS layers, frames, page IDs, caching, OLTP/OLAP/HTAP, storage architectures, layouts and durability. Some terms arrive before their teaching examples in later lessons. A beginner cannot readily distinguish what to understand now from what merely previews the course.

Restructure:
- Preserve the library story as the main thread.
- Put the layer walkthrough after one plain-language request.
- Retain the detailed architecture/workload paragraphs in an explicitly labeled “Preview: concepts revisited later” block with lesson links.
- Keep all current source references and subsection anchors.

Suggested bridge:
“Suppose a visitor asks whether book B017 is available. The DBMS decides how to find the book, reads the necessary data, and returns an answer. Later lessons explain the components that perform these steps. For now, focus on the distinction between the question, the logical data, and its physical storage.”

Source: [lecture01.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture01.json)

### 2. SQL: stop silently changing the fixture’s column names

Resource: lecture-02, l2-3, added outer-join fixture

Evidence: “Join on Member.member_id = Borrow.member_id.”

Problem: the section previously defines Member(mid,name) and Borrow(mid,book), and its executable query correctly uses M.mid=B.mid. The extension changes to member_id without changing the schema explicitly. A learner copying the earlier fixture will encounter an unknown column and may think they misunderstood joins.

Replacement:
“Keep the same schemas: Member(mid, name) and Borrow(mid, book). Add Borrow(4, D), whose mid has no matching Member row. No foreign-key constraint is enforced in this exercise. Continue to join on M.mid = B.mid.”

Preserve the existing four/four/five-row explanation and worked answer.

### 3. SQL NULL: teach the intermediate truth values before the warning

Resource: lecture-02, l2-4, “Negative queries, NULL and empty quantified comparisons”

Evidence: “NULL’s three-valued logic … needs supplementary reading”

Problem: the section first sends the learner elsewhere for NULL semantics, then teaches several subtle rules in compressed prose: NOT IN, UNKNOWN, ANY/ALL, empty inputs, decisive comparisons and dialect differences. The examples give correct conclusions, but the crucial intermediate reasoning is largely missing.

Suggested replacement for the transition:
“SQL conditions can evaluate to TRUE, FALSE, or UNKNOWN. WHERE keeps a row only when its condition is TRUE. To understand 2 NOT IN (1, NULL), compare 2 with each item: 2 &lt;&gt; 1 is TRUE; 2 &lt;&gt; NULL is UNKNOWN. NOT IN requires every comparison to be true. TRUE AND UNKNOWN is UNKNOWN, so WHERE rejects the row.”

Then separate:
1. NOT EXISTS versus NOT IN, with a tiny fixture.
2. ANY/ALL on nonempty input.
3. Empty-input and NULL edge cases.

Keep the PostgreSQL/SQLite boundary beside the relevant executable example, rather than as an additional conceptual hurdle in the first explanation.

Source for fixes 2–3: [lecture02.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture02.json)

### 4. B+ trees: make internal-node repair visible as pointer movement

Resource: lecture-09, l9-3, f15-internal-node-repair

Evidence: “Move the left sibling’s rightmost child”

Problem: leaf insertion and deletion are excellent concrete traces. Internal repair switches to prose about child pointers without naming or showing those children. The learner can copy separator numbers but cannot verify which key ranges move or why routing remains correct.

Add a before/after state using the existing merge example:
“Name the left node’s children C0, C1, C2 and the right node’s children C3, C4. Before the merge, the parent’s separator 30 divides the two nodes. After the merge, the keys are [10,20,30,40] and the children, in order, are [C0,C1,C2,C3,C4]. A search for 25 still follows C2; a search for 35 follows C3. Keeping separator 30 preserves the boundary between those child ranges.”

For redistribution, similarly name the moved child and show its interval before and after. Add a prediction question before revealing the repaired state.

Also move practical lazy-deletion/variable-byte caveats in l9-1 after the learner has seen the textbook invariant operate once. Preserve them as the next layer of precision.

Source: [lecture09.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture09.json)

### 5. Access methods: make the EXPLAIN exercise actually startable

Resource: lecture-16, l16-s4

Evidence: “Create a separate test table in PostgreSQL.”

Problem: the exercise requires a separate database system but supplies no fixture, data distribution, index, exact commands or prerequisite setup. The site’s integrated SQL lab uses SQLite. A first-time learner cannot reliably get from the explanation to the requested observation, and a small arbitrary table might not demonstrate the expected planner change.

Restructure:
- State “Optional external PostgreSQL exercise” explicitly.
- Supply a self-contained disposable fixture, seed, index and ANALYZE step.
- Give two concrete predicates on the same column and exact EXPLAIN commands.
- Provide a read-only, annotated sample plan for learners without PostgreSQL.
- Explain that a plan switch is an observation to investigate, not a guaranteed outcome.

Suggested instruction:
“First compare the estimated rows for the two predicates. Then identify which pages each access path would need. Your PostgreSQL version and table size may choose the same scan for both queries; explain that choice using the estimates rather than trying to force a particular plan.”

Source: [lecture16.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture16.json)

### 6. Optimizer search: teach DP before presenting its ledger

Resource: lecture-18, l18-s2 and l18-s3

Evidence: “Original DP ledger: extending unordered RS costs 40+45=85”

Problem: l18-s2 presents DP, interesting physical properties, an unexplained a/b order ledger and final-order costs before l18-s3 defines dynamic programming and gives the much clearer 100-versus-125 example. The learner must understand the conclusion before receiving its teaching model.

Recommended sequence:
1. Define left-deep search and candidate subsets.
2. Introduce DP and its passes.
3. Give the simple unordered-versus-sorted example.
4. Extend to the four-route ledger.
5. Discuss pruning limits and syntactic plan counts.

Keep section IDs stable; move content within the existing sections or retain the old IDs as anchors.

Suggested ledger introduction:
“Each entry records three things: the tables already joined, the order of its output, and its cost so far. A later join may be cheaper when its input is already sorted. The following costs are supplied exercise inputs, not values derived from table statistics. Compare total cost after extension, not just cost so far.”

Name relation schemas or replace a/b with meaningful shared join-key names. Explicitly identify the algorithm or supplied assumption behind each extension cost.

Source: [lecture18.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture18.json)

### 7. Transactions: introduce graph notation before swaps and topological order

Resource: lecture-19, l19-s2 and l19-s3

Evidence: “Its topological serial order is T2,T1,T3.”

Problem: the warehouse example is intuitive. Its appended extension abruptly introduces R/W notation, conflict-preserving swaps, graph edges and topological order. The next section is where R1(X) and the edge rule are first explained.

Restructure:
- Keep l19-s2 focused on the warehouse anomaly.
- Start l19-s3 with the notation legend and conflict test.
- Build the two-transaction graph.
- Then show permitted swaps and the three-transaction graph.

Suggested bridge:
“An edge T2 → T1 means that a conflicting operation of T2 must remain before one of T1. A serial order must respect every edge. Here T2 must come before T1, and T1 before T3, so the only permitted serial order is T2, T1, T3. This is called a topological order.”

This teaches what the graph does before introducing its algorithmic name.

### 8. Recoverability: decode C/A and track the reader’s dependency

Resource: lecture-19, l19-s4, “Recoverability is different from serializability”

Evidence: “W1(A), R2(A), C2, A1”

Problem: C2 and A1 appear without an explicit legend. A is simultaneously a data-object name and an abort notation. Four schedule properties are then packed into a short block. Learners may memorize strict → cascadeless → recoverable without understanding the failure each rule prevents.

Suggested addition:
“Use C1 for commit(T1) and Abort1 for abort(T1). These are transaction events; A inside W1(A) is a data object. After W1(A), R2(A), T2 depends on T1’s uncommitted value. If T1 aborts, T2 may need to abort too. Recoverability prevents T2 from committing before this dependency has been resolved.”

Walk the same two transactions through three timelines:
- Dirty read followed by unsafe early reader commit.
- Dirty read with safe commit order.
- Reader waits until the writer commits.

Keep the dirty-write counterexample, but place it after the reader understands the read dependency. Add a complete answer to the lost-update graph exercise rather than leaving its edge enumeration implicit.

Source for fixes 7–8: [lecture19.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture19.json)

### 9. CQ complexity: supply a prerequisite bridge and one literal reduction

Resource: lecture-24, l24-s1–s2

Evidence: “reduce 3-coloring to Boolean conjunctive-query evaluation”

Problem: the distinction between fixed-query and combined complexity is explained well. The NP-completeness proof assumes the reader already understands NP, reductions, graph coloring and why verifying one witness differs from finding it. The reduction is rigorous in outline but too compressed to serve as a first introduction.

Add a short prerequisite bridge:
“NP concerns decision problems whose proposed YES answers can be checked in polynomial time. A reduction translates instances of one problem into another while preserving YES and NO. We use the known NP-completeness of graph 3-coloring here; we do not prove that result.”

Then instantiate the construction:
“For a triangle with vertices u,v,w, write Q() :- Diff(u,v), Diff(v,w), Diff(w,u). Store all six ordered pairs of different colors in Diff. The assignment u=red, v=blue, w=green satisfies all three atoms. Assigning u=v=red fails because Diff(red,red) is absent.”

Finish by explaining that the same construction applies to an arbitrary input graph. Label the proof bridge so readers can revisit it without losing the main evaluation story.

### 10. Canonical databases: show the composition instead of naming it

Resource: lecture-24, l24-s4

Evidence: “Composing this mapping with any match of Q1”

Problem: the page first builds the canonical database of a new R/S query, then immediately switches to a generic Q1/Q2 proof. This loses the concrete premium-shopper example that had just made the reverse mapping intelligible.

Reuse Qsmall/Qall:
“Build Dsmall = {Buy(cx,cp), Premium(cp)}. Qsmall returns cx. Qall also returns cx because Buy(cx,cp) is present. Its match tells us how Qall’s variables fit inside Qsmall. Now take any real match of Qsmall, such as x=An and p=pen. Using the same values in Qall satisfies Buy(An,pen), so Qall returns An too.”

Then introduce the word “composition.” For the failing direction, reuse the canonical database containing Buy(cx,cp) without Premium(cp).

The theorem, constant preservation and set-semantics limitations should remain. They become easier to understand when attached to one continuous proof example.

Source for fixes 9–10: [lecture24.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/lecture24.json)

### 11. Research supplement: scaffold the first research task

Resource: supplement-28, supplement-28-s3–s5

Evidence: “Ablate workload overlap, representation and training volume.”

Problem: q-error and end-to-end timing are particularly good. The task then jumps to oracle baselines, held-out templates, leakage, label budgets and ablation without a small operational example or stated ML prerequisites. “Build a model or reuse an artifact” can become a substantial separate project, rather than a startable next step.

Add inline definitions:
- “A query template is the query’s structure with changing literal values replaced by placeholders.”
- “The candidate-plan oracle is the fastest measured plan among the same supplied candidates.”
- “An ablation repeats the experiment after removing or changing one component while keeping other conditions fixed.”

Offer a paper-first task before implementation:
“Given six example queries, mark which share a template. Propose one split that tests new literal values and another that tests a new template. Decide which examples may be used to tune the method and which must remain untouched until the final test.”

Keep model implementation as an optional extension with explicit prerequisites and a bounded expected deliverable. In s4, label the Cauchy–Schwarz calculation as a separate mathematical bridge and state what each vector entry represents before the formula.

Source: [supplement28.json](https://github.com/edward1503/adbs-learning-lab/blob/0a1fb0363d2c44a0ca8f508f4e964a01af128720/course/supplements/supplement28.json)

## Positive patterns to preserve and reuse

- l2-2: the Sale example shows every row/group transformation, then changes one condition and recomputes. Excellent explanation-to-transfer progression.
- l8-2: assumptions, variables and units precede the cost calculations.
- l9-2–3: the same leaf state continues from insertion to redistribution to merge; the separator mistake has an explicit consequence.
- l17-s2: the equijoin estimate is derived by counting shared keys and matching pairs before presenting the formula.
- l23-s1–3: human question → CQ notation → successful assignment → failed assignment.
- l25-s4: the linear semijoin example grows into a branching example and asks what fails when one child changes.
- supplement-28-s3: execution time becomes end-to-end time through explicit arithmetic; the short-query counterexample prevents an overgeneralized takeaway.

These existing patterns are a better model for revisions than adding more warnings or isolated definitions.

## Cross-cutting editorial rule

Integrate the additions into the lesson’s causal sequence. Labels such as “Audit addition,” repeated source-origin disclaimers, and repeated model caveats make parts of the reading feel assembled from a correction log.

Preserve provenance and qualifications, but:
- Define the teaching model once.
- Attach a caveat at the exact point where it changes an inference.
- Move detailed evidence/provenance into consistent source notes.
- Make each major section answer one learner question.
- Keep all lesson, section, question and progress IDs, answers and citations intact.

## Practical acceptance rubric

For each primary learning goal, a new reader should be able to:

1. Explain: describe the idea without repeating its formal definition.
2. Trace: reproduce each intermediate state in the worked example.
3. Transfer: solve one changed-input example and explain why the result changes.
4. Bound: name the assumption that makes the claim valid.

Use a simple editorial score:
- 0: the text does not supply the necessary reasoning.
- 1: the exact worked answer can be copied.
- 2: a nearby variant can be solved and explained.

Concrete acceptance checks:
- B+ tree: identify both the moved pointer and changed separator; verify a lookup after repair.
- Optimizer: calculate a complete plan cost and explain why the cheapest subplan can lose.
- Transactions: distinguish a precedence cycle from a waits-for cycle and from unsafe commit order.
- CQ: produce the reverse homomorphism, preserve head positions, and construct a failing counterexample.
- Research: distinguish q-error, execution-only speedup and end-to-end gain; identify leakage in a tiny split.

Review reading-time labels only after those tasks are tried by real learners. Automated checks can preserve IDs, facts and answers; they cannot establish that the revised teaching sequence is understandable.

## Implementation and acceptance status addendum

The report above is preserved unchanged from the completed independent review. No repository content, inline quiz, quiz-bank answer, route, progress ID, or deployed asset was changed by this review. The existing inline quizzes remain unchanged. The proposed fixes have not yet been verified on an implementation candidate.

The acceptance rubric concerns observable cold-reading tasks, not a readability-formula proxy. A candidate review should document the exact resource, task prompt, intermediate reasoning available in the text, answer, assumptions, and any unresolved gap. A static editorial review must not be described as a human study. Actual learner testing remains separate and should record who was tested, their relevant prerequisites, what they could explain or solve without assistance, and where they needed help.
