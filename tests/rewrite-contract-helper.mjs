// 21 October authorization covers all teaching prose and affected quiz wording.
// Technical identifiers, source scope and keyed option meanings remain protected.
export function rewriteImmutableMetadata(packet) {
  const result=structuredClone(packet);
  const lesson=Array.isArray(result)?result[0]:result.lesson;
  for(const key of ['title','short','lead','goals']) delete lesson[key];
  lesson.sections=lesson.sections.map(({title,html,...rest})=>rest);
  const prose=q=>{for(const k of ['question','prompt','explanation','hint','hints'])delete q[k];};
  if(lesson.quiz)prose(lesson.quiz);
  for(const t of result.quizBank?.topics||[])for(const q of t.questions)prose(q);
  return result;
}
