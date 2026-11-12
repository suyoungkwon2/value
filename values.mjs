// Order and descriptors follow the supplied Short Schwartz's Value Survey.
export const VALUES = [
  { id: 'power', name: 'Power', description: 'Social power, authority, wealth.', meaning: 'Having influence, resources, and a say in decisions may matter to you. You may be drawn to roles where you can shape outcomes.', reflection: 'Where would having more influence help you do something meaningful?', color: '#cebce1', group: 'Self-enhancement' },
  { id: 'achievement', name: 'Achievement', description: 'Success, capability, ambition, influence on people and events.', meaning: 'You may find meaning in doing things well and seeing your efforts recognized. Clear goals and opportunities to develop your abilities can feel motivating.', reflection: 'Which goal would feel worthwhile even without applause?', color: '#b6a3d4', group: 'Self-enhancement' },
  { id: 'hedonism', name: 'Hedonism', description: 'Gratification of desires, enjoyment in life, self-indulgence.', meaning: 'Pleasure and enjoying the present may be important parts of a good life for you. You may make room for experiences that feel satisfying and alive.', reflection: 'What small pleasure would you like to make more room for?', color: '#f0c49e', group: 'Openness to change / Self-enhancement' },
  { id: 'stimulation', name: 'Stimulation', description: 'Daring, a varied and challenging life, an exciting life.', meaning: 'Novelty and challenge may energize you. You may prefer opportunities to explore rather than a life with too much predictability.', reflection: 'What new experience would stretch you in a welcome way?', color: '#ead889', group: 'Openness to change' },
  { id: 'self-direction', name: 'Self-direction', description: "Creativity, freedom, curiosity, independence, choosing one's own goals.", meaning: 'Thinking for yourself and choosing your own path may be central to you. You may thrive when you have freedom to explore ideas and decide how to act.', reflection: 'Where would you like more freedom to make your own choices?', color: '#eddf8c', group: 'Openness to change' },
  { id: 'universalism', name: 'Universalism', description: 'Broad-mindedness, beauty of nature and arts, social justice, a world at peace, equality, wisdom, unity with nature, environmental protection.', meaning: 'The welfare of people beyond your immediate circle, and of the natural world, may guide your choices. Fairness and understanding different perspectives may feel especially meaningful.', reflection: 'What is one practical way to act on your concern for a wider world?', color: '#aecbd7', group: 'Self-transcendence' },
  { id: 'benevolence', name: 'Benevolence', description: 'Helpfulness, honesty, forgiveness, loyalty, responsibility.', meaning: 'Caring for people close to you may be a strong source of meaning. You may place special importance on being dependable and maintaining trusting relationships.', reflection: 'Who in your circle could use your care, and what support do you need in return?', color: '#92bbce', group: 'Self-transcendence' },
  { id: 'tradition', name: 'Tradition', description: "Respect for tradition, humbleness, accepting one's portion in life, devotion, modesty.", meaning: 'Continuity, humility, and inherited customs or beliefs may offer you a sense of grounding. You may appreciate practices that connect you with a community or history.', reflection: 'Which tradition feels personally meaningful to carry forward?', color: '#e9b4ba', group: 'Conservation' },
  { id: 'conformity', name: 'Conformity', description: 'Obedience, honoring parents and elders, self-discipline, politeness.', meaning: 'Consideration, self-restraint, and meeting shared expectations may matter to you. You may see value in avoiding actions that hurt others or disrupt cooperation.', reflection: 'Which shared expectations support your relationships, and which deserve reconsideration?', color: '#efc3c1', group: 'Conservation' },
  { id: 'security', name: 'Security', description: 'National security, family security, social order, cleanliness, reciprocation of favors.', meaning: 'Safety, stability, and reliable relationships may help you feel grounded. You may prioritize conditions that protect yourself, those you love, and your community.', reflection: 'What would give you a stronger sense of stability while leaving room to grow?', color: '#dca5b6', group: 'Conservation' },
];

// Original 57-item SVS, transcribed from the supplied questionnaire.
const DETAILED = [
['Equality','Equal opportunity for all.'],
['Inner harmony','At peace with myself.'],
['Social power','Control over others, dominance.'],
['Pleasure','Gratification of desires.'],
['Freedom','Freedom of action and thought.'],
['A spiritual life','Emphasis on spiritual, not material matters.'],
['Sense of belonging','Feeling that others care about me.'],
['Social order','Stability of society.'],
['An exciting life','Stimulating experiences.'],
['Meaning in life','A purpose in life.'],
['Politeness','Courtesy, good manners.'],
['Wealth','Material possessions, money.'],
['National security','Protection of my nation from enemies.'],
['Self respect',"Belief in one's own worth."],
['Reciprocation of favors','Avoidance of indebtedness.'],
['Creativity','Uniqueness, imagination.'],
['A world at peace','Free of war and conflict.'],
['Respect for tradition','Preservation of time-honored customs.'],
['Mature love','Deep emotional and spiritual intimacy.'],
['Self-discipline','Self-restraint, resistance to temptation.'],
['Privacy','The right to have a private sphere.'],
['Family security','Safety for loved ones.'],
['Social recognition','Respect, approval by others.'],
['Unity with nature','Fitting into nature.'],
['A varied life','Filled with challenge, novelty and change.'],
['Wisdom','A mature understanding of life.'],
['Authority','The right to lead or command.'],
['True friendship','Close, supportive friends.'],
['A world of beauty','Beauty of nature and the arts.'],
['Social justice','Correcting injustice, care for the weak.'],
['Independent','Self-reliant, self-sufficient.'],
['Moderate','Avoiding extremes of feeling and action.'],
['Loyal','Faithful to my friends, group.'],
['Ambitious','Hard-working, aspiring.'],
['Broadminded','Tolerant of different ideas and beliefs.'],
['Humble','Modest, self-effacing.'],
['Daring','Seeking adventure, risk.'],
['Protecting the environment','Preserving nature.'],
['Influential','Having an impact on people and events.'],
['Honoring of parents and elders','Showing respect.'],
['Choosing own goals','Selecting own purposes.'],
['Healthy','Not being sick physically or mentally.'],
['Capable','Competent, effective, efficient.'],
['Accepting my portion in life',"Submitting to life's circumstances."],
['Honest','Genuine, sincere.'],
['Preserving my public image','Protecting my “face”.'],
['Obedient','Dutiful, meeting obligations.'],
['Intelligent','Logical, thinking.'],
['Helpful','Working for the welfare of others.'],
['Enjoying life','Enjoying food, sex, leisure, etc.'],
['Devout','Holding to religious faith and belief.'],
['Responsible','Dependable, reliable.'],
['Curious','Interested in everything, exploring.'],
['Forgiving','Willing to pardon others.'],
['Successful','Achieving goals.'],
['Clean','Neat, tidy.'],
['Self-indulgent','Doing pleasant things.'],
].map(([name, description], index) => ({ id: index + 1, name, description }));

// Individual-level key printed in the supplied SVS scoring notes. Items absent
// from these indexes still contribute to the personal mean across all 57 items.
export const SVS_KEY = {
  power: [3,12,27,46], achievement: [34,39,43,55], hedonism: [4,50,57],
  stimulation: [9,25,37], 'self-direction': [5,16,31,41,53],
  universalism: [1,17,24,26,29,30,35,38], benevolence: [33,45,49,52,54],
  tradition: [18,32,36,44,51], conformity: [11,20,40,47], security: [8,13,15,22,56],
};
export const SURVEYS = {
  short: { id: 'short', title: 'Short', min: 0, max: 8, items: VALUES.map(({id,name,description})=>({id,name,description})) },
  detailed: { id: 'detailed', title: 'Detailed', min: -1, max: 7, items: DETAILED },
};
export function validAnswers(answers, version = 'short') {
  const survey = Object.hasOwn(SURVEYS, version) ? SURVEYS[version] : null;
  return Boolean(survey && Array.isArray(answers) && answers.length === survey.items.length && Array.from(answers).every(n => Number.isInteger(n) && n >= survey.min && n <= survey.max));
}
export function score(answers, version = 'short') {
  if (!validAnswers(answers, version)) throw new TypeError('Complete all survey items using the selected response scale.');
  const survey = SURVEYS[version];
  const mean = answers.reduce((sum,n)=>sum+n,0)/answers.length;
  const values = VALUES.map((value,index) => {
    const items = version === 'detailed' ? SVS_KEY[value.id] : [index+1];
    const raw = items.reduce((sum,item)=>sum+answers[item-1],0)/items.length;
    return {...value,raw,centered:raw-mean};
  });
  const max = Math.max(...values.map(v=>v.raw)), min = Math.min(...values.map(v=>v.raw));
  const equal = (a,b) => Math.abs(a-b)<1e-10;
  return {mean,values,highest:values.filter(v=>equal(v.raw,max)).map(v=>v.id),lowest:values.filter(v=>equal(v.raw,min)).map(v=>v.id),flat:equal(max,min),version,min:survey.min,max:survey.max};
}
export function encodeResult(nickname, answers, version = 'short') {
  if (!validAnswers(answers,version) || typeof nickname !== 'string' || !nickname.trim() || nickname.trim().length > 40) throw new TypeError('Invalid result.');
  return '#result='+encodeURIComponent(JSON.stringify({v:2,s:version,n:nickname.trim(),a:answers}));
}
export function decodeResult(fragment) {
  try {
    if (typeof fragment !== 'string' || fragment.length>3000 || !fragment.startsWith('#result=')) return null;
    const data=JSON.parse(decodeURIComponent(fragment.slice(8)));
    const version=data?.v===1?'short':data?.v===2?data.s:null;
    if (!version || typeof data.n!=='string' || !data.n.trim() || data.n.trim().length>40 || !validAnswers(data.a,version)) return null;
    // Legacy links retain their old return shape for existing consumers.
    return data.v===1?{nickname:data.n.trim(),answers:data.a}:{nickname:data.n.trim(),answers:data.a,version};
  } catch {return null;}
}
