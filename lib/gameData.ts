export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GameEvent {
  text: string;
  type: 'death' | 'good' | 'bad' | 'neutral';
}

export const DEATH_MESSAGES: string[] = [
  "has died of unencrypted data exposure",
  "was lost to a ransomware attack while reviewing the SSP",
  "perished from acute SPRS score anxiety",
  "succumbed to a fatal case of scope creep",
  "was carried away by rogue auditors",
  "drowned in a sea of POA&M items",
  "expired from exhaustion after the 47th control review",
  "was fatally wounded by a penetration test finding",
  "died of dysentery... and also didn't encrypt their CUI",
  "was lost crossing the River of Legacy Systems",
  "perished when their MFA token battery died",
  "succumbed to policy documentation poisoning",
  "was struck down by an unexpected C3PAO visit",
  "died after realizing they scoped their entire network",
  "was consumed by the void of missing evidence artifacts",
  "perished explaining FCI vs CUI to leadership... again",
  "died of shock when they saw the consultant's invoice",
  "was lost in the NIST 800-171 cross-references",
  "expired waiting for the DIBCAC callback",
  "succumbed to a critical vulnerability in their argument",
];

export const RANDOM_EVENTS: GameEvent[] = [
  { text: "Your SIEM license expired. Alert fatigue claims a victim.", type: "death" },
  { text: "You found an abandoned System Security Plan template on the trail! Team morale increases.", type: "good" },
  { text: "A wild auditor appears! They just want to chat about controls. False alarm.", type: "neutral" },
  { text: "Your vulnerability scanner found 10,000 new findings overnight. Morale drops.", type: "bad" },
  { text: "Good news! Your SPRS score went up by 3 points!", type: "good" },
  { text: "A consultant wagon passes by and drops some free templates!", type: "good" },
  { text: "The intern accidentally emailed CUI to their personal Gmail.", type: "death" },
  { text: "You successfully convinced leadership to fund the project! Morale soars!", type: "good" },
  { text: "Your C3PAO assessment got rescheduled... for the 4th time.", type: "neutral" },
  { text: "Heavy rain has flooded your on-prem data center. Morale drops.", type: "bad" },
  { text: "You discovered shadow IT. Everywhere. So much shadow IT.", type: "bad" },
  { text: "A friendly MSP offers to manage your EDR. Seems legit.", type: "neutral" },
  { text: "Your POA&M milestones are all GREEN! Is this real life?", type: "good" },
  { text: "Supply chain attack! Your monitoring tool was compromised.", type: "death" },
  { text: "The DoD released new guidance. Everything you knew is wrong now.", type: "bad" },
  { text: "You found a working printer. It's a miracle!", type: "good" },
  { text: "Your SSP backup was actually current. Unbelievable!", type: "good" },
  { text: "A team member accidentally deleted the evidence folder.", type: "bad" },
  { text: "The firewall rules actually make sense! Someone documented them!", type: "good" },
  { text: "Ransomware gang sends a LinkedIn connection request to your CISO.", type: "neutral" },
];

export const CMMC_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What does CUI stand for?",
    options: [
      "A) Controlled Unclassified Information",
      "B) Cybersecurity Unified Infrastructure",
      "C) Compliance Under Investigation",
      "D) Computers Under Inspection"
    ],
    answer: "A",
    explanation: "CUI = Controlled Unclassified Information. The whole reason we're on this trail!"
  },
  {
    id: 2,
    question: "How many practices/controls are in CMMC Level 2?",
    options: [
      "A) 17",
      "B) 110",
      "C) 172",
      "D) 42 (the answer to everything)"
    ],
    answer: "B",
    explanation: "110 practices from NIST SP 800-171. You'll know them by heart... or die trying."
  },
  {
    id: 3,
    question: "What is an SSP?",
    options: [
      "A) Super Secret Protocol",
      "B) System Security Plan",
      "C) SPRS Score Predictor",
      "D) Security Specialist Party"
    ],
    answer: "B",
    explanation: "System Security Plan - the document that will consume your next 6 months."
  },
  {
    id: 4,
    question: "What is the minimum SPRS score possible?",
    options: [
      "A) 0",
      "B) -203",
      "C) -100",
      "D) Your self-esteem after an audit"
    ],
    answer: "B",
    explanation: "-203 is the minimum. If you're there, may your documentation be thorough."
  },
  {
    id: 5,
    question: "What does FCI stand for?",
    options: [
      "A) Federal Contract Information",
      "B) Firewall Configuration Index",
      "C) First Compliance Incident",
      "D) Finally Certified, Incredible"
    ],
    answer: "A",
    explanation: "Federal Contract Information - the less scary cousin of CUI."
  },
  {
    id: 6,
    question: "What NIST publication does CMMC Level 2 align with?",
    options: [
      "A) NIST 800-53",
      "B) NIST 800-171",
      "C) NIST 800-HELP-ME",
      "D) NIST 800-WHY"
    ],
    answer: "B",
    explanation: "NIST SP 800-171. Your new bedtime reading material."
  },
  {
    id: 7,
    question: "What is a POA&M?",
    options: [
      "A) Plan of Action & Milestones",
      "B) Policy on Audits & Management",
      "C) Proof of Acceptable Monitoring",
      "D) Pain, Anguish & Misery"
    ],
    answer: "A",
    explanation: "Plan of Action & Milestones. (D is also technically correct in practice.)"
  },
  {
    id: 8,
    question: "Who performs CMMC Level 2 assessments?",
    options: [
      "A) The DoD directly",
      "B) C3PAO (Third-Party Assessment Org)",
      "C) Your IT guy who 'knows security'",
      "D) A ouija board"
    ],
    answer: "B",
    explanation: "C3PAO - the people who will make you question every life decision."
  },
  {
    id: 9,
    question: "What is 'scoping' in CMMC?",
    options: [
      "A) Looking through a telescope at servers",
      "B) Defining systems that process/store CUI",
      "C) Checking if anyone is watching",
      "D) Running away from auditors"
    ],
    answer: "B",
    explanation: "Proper scoping can save you from certifying your entire company."
  },
  {
    id: 10,
    question: "What is the purpose of FIPS 140-2 validated encryption?",
    options: [
      "A) To make data extra crispy",
      "B) Ensure crypto modules meet standards",
      "C) To confuse developers",
      "D) Justify expensive hardware purchases"
    ],
    answer: "B",
    explanation: "FIPS 140-2 validates your encryption isn't just 'password123' with extra steps."
  },
  {
    id: 11,
    question: "What is an enclave in CMMC context?",
    options: [
      "A) A secret government bunker",
      "B) Segmented network boundary with CUI",
      "C) Where compliance officers cry",
      "D) A fancy word for 'server room'"
    ],
    answer: "B",
    explanation: "An enclave is a properly segmented environment. (C is also valid.)"
  },
  {
    id: 12,
    question: "How often should security awareness training occur?",
    options: [
      "A) Never, ignorance is bliss",
      "B) Once per decade",
      "C) Annually at minimum",
      "D) Every phishing click (so, daily)"
    ],
    answer: "C",
    explanation: "Annual training minimum. D would mean continuous training for most orgs."
  },
  {
    id: 13,
    question: "What does MFA stand for?",
    options: [
      "A) Multi-Factor Authentication",
      "B) Mandatory Firewall Application",
      "C) Most Frustrating Approach",
      "D) My Favorite Acronym"
    ],
    answer: "A",
    explanation: "Multi-Factor Authentication - because passwords alone aren't enough."
  },
  {
    id: 14,
    question: "What is the CMMC Level 1 requirement for CUI?",
    options: [
      "A) Full NIST 800-171 compliance",
      "B) Level 1 is for FCI only, not CUI",
      "C) Just install antivirus",
      "D) Post a 'No Hackers' sign"
    ],
    answer: "B",
    explanation: "Level 1 is FCI only (17 practices). CUI requires Level 2 minimum!"
  },
  {
    id: 15,
    question: "What is a 'NOT MET' finding?",
    options: [
      "A) An auditor you haven't met",
      "B) Control that fails requirements",
      "C) A meeting that was cancelled",
      "D) The last thing you want to hear"
    ],
    answer: "B",
    explanation: "A NOT MET means you failed a control. B and D are both correct."
  },
  {
    id: 16,
    question: "What system holds your SPRS score?",
    options: [
      "A) The Cloud",
      "B) A blockchain somewhere",
      "C) Supplier Performance Risk System",
      "D) A filing cabinet in the Pentagon"
    ],
    answer: "C",
    explanation: "SPRS - Supplier Performance Risk System. Your score lives there."
  },
  {
    id: 17,
    question: "What is 'evidence' in a CMMC assessment?",
    options: [
      "A) Screenshots of you doing work",
      "B) Docs proving control implementation",
      "C) Witness testimonies",
      "D) All of the above, honestly"
    ],
    answer: "B",
    explanation: "Evidence = proof your controls work. Screenshots, policies, logs - all of it."
  },
  {
    id: 18,
    question: "How long must you retain security logs per 800-171?",
    options: [
      "A) 30 days",
      "B) 90 days minimum",
      "C) Until heat death of universe",
      "D) Logs? What logs?"
    ],
    answer: "B",
    explanation: "90 days minimum retention. Your SIEM storage costs just increased."
  },
  {
    id: 19,
    question: "What does 800-171A provide?",
    options: [
      "A) Assessment procedures for controls",
      "B) A way for auditors to feel important",
      "C) More acronyms",
      "D) Job security for consultants"
    ],
    answer: "A",
    explanation: "800-171A tells you HOW you'll be assessed. Know it. Fear it."
  },
  {
    id: 20,
    question: "What should you do if you discover a CUI breach?",
    options: [
      "A) Report to DoD within 72 hours",
      "B) Delete evidence and hope",
      "C) Blame the intern",
      "D) Update LinkedIn to 'Open to Work'"
    ],
    answer: "A",
    explanation: "Report to DoD within 72 hours via dibnet.dod.mil. (D is the mood though.)"
  },
  // === PHASE 1: PLANNING & PREPARATION ===
  {
    id: 21,
    question: "What is Phase 1 of the CMMC assessment process?",
    options: [
      "A) Assessment Execution",
      "B) Planning & Preparation",
      "C) Reporting",
      "D) Crying in the break room"
    ],
    answer: "B",
    explanation: "Phase 1 is Planning & Preparation - defining scope, reviewing readiness, and scheduling."
  },
  {
    id: 22,
    question: "During Phase 1, who must affirm the accuracy of the SPRS score?",
    options: [
      "A) The IT intern",
      "B) A senior company official",
      "C) The C3PAO",
      "D) Anyone with a pulse"
    ],
    answer: "B",
    explanation: "A senior official must affirm the SPRS score accuracy - it's a legal attestation!"
  },
  {
    id: 23,
    question: "What document defines the assessment boundary in Phase 1?",
    options: [
      "A) The scoping guide",
      "B) The employee handbook",
      "C) A post-it note",
      "D) The network diagram nobody updated"
    ],
    answer: "A",
    explanation: "The scoping guide helps define which assets are in-scope for CUI processing."
  },
  {
    id: 24,
    question: "What are the 5 asset categories for CMMC scoping?",
    options: [
      "A) CUI, Security, Contractor, Specialty, Out-of-Scope",
      "B) Red, Blue, Green, Yellow, Purple",
      "C) Easy, Medium, Hard, Expert, Impossible",
      "D) Servers, Laptops, Phones, Printers, Feelings"
    ],
    answer: "A",
    explanation: "CUI Assets, Security Protection Assets, Contractor Risk Managed, Specialized, and Out-of-Scope."
  },
  {
    id: 25,
    question: "How far in advance should you schedule your C3PAO assessment?",
    options: [
      "A) 2-3 days",
      "B) 3-6 months typically",
      "C) The night before",
      "D) Never, live in denial forever"
    ],
    answer: "B",
    explanation: "Plan 3-6 months ahead - C3PAOs book up fast and you need prep time!"
  },
  // === PHASE 2: ASSESSMENT EXECUTION ===
  {
    id: 26,
    question: "What is Phase 2 of the CMMC assessment?",
    options: [
      "A) Planning & Preparation",
      "B) Assessment Execution",
      "C) Adjudication",
      "D) The denial phase"
    ],
    answer: "B",
    explanation: "Phase 2 is Assessment Execution - where the C3PAO actually tests your controls."
  },
  {
    id: 27,
    question: "What are the three assessment methods used in Phase 2?",
    options: [
      "A) Examine, Interview, Test",
      "B) Hope, Pray, Cry",
      "C) Read, Write, Arithmetic",
      "D) Google, Stack Overflow, ChatGPT"
    ],
    answer: "A",
    explanation: "Examine (review docs), Interview (talk to staff), Test (verify controls work)."
  },
  {
    id: 28,
    question: "During interviews, who should be available to the assessors?",
    options: [
      "A) Only the CISO",
      "B) Personnel responsible for implementing controls",
      "C) The CEO's assistant",
      "D) Literally anyone who can fog a mirror"
    ],
    answer: "B",
    explanation: "People who actually implement and operate the controls must be available."
  },
  {
    id: 29,
    question: "What happens if evidence is missing during Phase 2?",
    options: [
      "A) Assessors just skip it",
      "B) The control may be marked NOT MET",
      "C) Everyone gets a participation trophy",
      "D) The audit magically passes anyway"
    ],
    answer: "B",
    explanation: "No evidence = NOT MET. Document everything or suffer the consequences!"
  },
  {
    id: 30,
    question: "Can you remediate findings during the assessment?",
    options: [
      "A) Yes, real-time remediation is allowed",
      "B) No, what's done is done",
      "C) Only if you bribe the assessor (illegal)",
      "D) Only on Tuesdays"
    ],
    answer: "A",
    explanation: "Limited real-time remediation is allowed for minor issues during assessment."
  },
  // === PHASE 3: REPORTING ===
  {
    id: 31,
    question: "What is Phase 3 of the CMMC assessment?",
    options: [
      "A) Reporting",
      "B) Celebration",
      "C) Assessment Execution",
      "D) The bargaining phase"
    ],
    answer: "A",
    explanation: "Phase 3 is Reporting - documenting findings and creating the assessment report."
  },
  {
    id: 32,
    question: "What document lists all findings requiring remediation?",
    options: [
      "A) The shame spreadsheet",
      "B) Plan of Action & Milestones (POA&M)",
      "C) The IT wish list",
      "D) A very long sticky note"
    ],
    answer: "B",
    explanation: "The POA&M documents all NOT MET findings and remediation timelines."
  },
  {
    id: 33,
    question: "How long do you have to close POA&M items for conditional certification?",
    options: [
      "A) 30 days",
      "B) 180 days",
      "C) Forever, no rush",
      "D) It's already too late"
    ],
    answer: "B",
    explanation: "180 days to close POA&M items or your conditional certification may be revoked."
  },
  {
    id: 34,
    question: "What determines a MET vs NOT MET finding?",
    options: [
      "A) Assessor's mood that day",
      "B) Whether objectives are satisfied per 800-171A",
      "C) A coin flip",
      "D) How good the coffee was"
    ],
    answer: "B",
    explanation: "Assessment objectives from NIST 800-171A determine MET/NOT MET status."
  },
  {
    id: 35,
    question: "Who reviews the assessment report before submission?",
    options: [
      "A) The OSC (Organization Seeking Certification)",
      "B) Nobody, YOLO",
      "C) The janitor",
      "D) A magic 8-ball"
    ],
    answer: "A",
    explanation: "The OSC reviews the report for accuracy before the C3PAO submits to CMMC-AB."
  },
  // === PHASE 4: ADJUDICATION & CERTIFICATION ===
  {
    id: 36,
    question: "What is Phase 4 of the CMMC assessment?",
    options: [
      "A) Adjudication & Certification",
      "B) Victory lap",
      "C) Planning",
      "D) The acceptance phase"
    ],
    answer: "A",
    explanation: "Phase 4 is Adjudication - where CMMC-AB reviews and issues certification decisions."
  },
  {
    id: 37,
    question: "What are the two types of CMMC certification?",
    options: [
      "A) Conditional and Final",
      "B) Temporary and Permanent",
      "C) Good and Better",
      "D) Real and Imaginary"
    ],
    answer: "A",
    explanation: "Conditional (with POA&M items) or Final (all controls MET)."
  },
  {
    id: 38,
    question: "How long is a CMMC certification valid?",
    options: [
      "A) Forever",
      "B) 3 years",
      "C) Until the next breach",
      "D) 1 year"
    ],
    answer: "B",
    explanation: "CMMC certifications are valid for 3 years, then you get to do it all again!"
  },
  {
    id: 39,
    question: "What happens if POA&M items aren't closed in 180 days?",
    options: [
      "A) Nothing, extensions are automatic",
      "B) Conditional certification may be revoked",
      "C) You get a stern email",
      "D) Free pizza party"
    ],
    answer: "B",
    explanation: "Failure to close POA&M items can result in revocation of conditional certification."
  },
  {
    id: 40,
    question: "Who issues the final CMMC certification?",
    options: [
      "A) The C3PAO",
      "B) The Cyber AB (formerly CMMC-AB)",
      "C) Your mom (she's very proud)",
      "D) The DoD CIO directly"
    ],
    answer: "B",
    explanation: "The Cyber AB (Accreditation Body) issues certifications after reviewing C3PAO reports."
  },
];

export const DEFAULT_PARTY = [
  "CISO McSecurityface",
  "Compliance Carl",
  "Policy Patricia",
  "Audit Andy",
  "The Intern (unnamed)"
];
