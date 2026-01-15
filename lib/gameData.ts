export interface Question {
  id: number;
  question: string;
  options: string[];
  bestAnswer: string;      // Perfect answer - full points
  goodAnswer: string;      // Close second - partial credit
  explanation: string;
  goodExplanation: string; // Feedback for the "good" answer
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
      "B) Confidential Unclassified Information",
      "C) Cybersecurity Unified Infrastructure",
      "D) Compliance Under Investigation"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "CUI = Controlled Unclassified Information. The whole reason we're on this trail!",
    goodExplanation: "Close! It's 'Controlled' not 'Confidential' - an important distinction in federal terminology."
  },
  {
    id: 2,
    question: "How many practices/controls are in CMMC Level 2?",
    options: [
      "A) 110",
      "B) 130 (110 + 20 enhancements)",
      "C) 17",
      "D) 42 (the answer to everything)"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "110 practices from NIST SP 800-171. You'll know them by heart... or die trying.",
    goodExplanation: "Good thinking about enhancements, but Level 2 is specifically the 110 base controls."
  },
  {
    id: 3,
    question: "What is an SSP?",
    options: [
      "A) System Security Plan",
      "B) Security System Policy",
      "C) Super Secret Protocol",
      "D) SPRS Score Predictor"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "System Security Plan - the document that will consume your next 6 months.",
    goodExplanation: "Close! Policies are part of it, but SSP = System Security Plan specifically."
  },
  {
    id: 4,
    question: "What is the minimum SPRS score possible?",
    options: [
      "A) -203",
      "B) -110 (one point per control)",
      "C) 0",
      "D) Your self-esteem after an audit"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "-203 is the minimum. If you're there, may your documentation be thorough.",
    goodExplanation: "Good logic, but the actual math results in -203 based on weighted controls."
  },
  {
    id: 5,
    question: "What does FCI stand for?",
    options: [
      "A) Federal Contract Information",
      "B) Federal Controlled Information",
      "C) Firewall Configuration Index",
      "D) Finally Certified, Incredible"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Federal Contract Information - the less scary cousin of CUI.",
    goodExplanation: "Close! FCI is 'Contract' not 'Controlled' - it's less sensitive than CUI."
  },
  {
    id: 6,
    question: "What NIST publication does CMMC Level 2 align with?",
    options: [
      "A) NIST SP 800-171",
      "B) NIST SP 800-53",
      "C) NIST SP 800-171A",
      "D) NIST SP 800-HELP-ME"
    ],
    bestAnswer: "A",
    goodAnswer: "C",
    explanation: "NIST SP 800-171. Your new bedtime reading material.",
    goodExplanation: "800-171A is the assessment guide - good knowledge! But 800-171 defines the controls."
  },
  {
    id: 7,
    question: "What is a POA&M?",
    options: [
      "A) Plan of Action & Milestones",
      "B) Plan of Assessment & Metrics",
      "C) Policy on Audits & Management",
      "D) Pain, Anguish & Misery"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Plan of Action & Milestones. (D is also technically correct in practice.)",
    goodExplanation: "Assessment and metrics are related, but it's Action & Milestones specifically."
  },
  {
    id: 8,
    question: "Who performs CMMC Level 2 assessments?",
    options: [
      "A) C3PAO (Third-Party Assessment Org)",
      "B) DCMA (Defense Contract Management Agency)",
      "C) Your IT guy who 'knows security'",
      "D) A ouija board"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "C3PAO - the people who will make you question every life decision.",
    goodExplanation: "DCMA handles DIBCAC assessments, but C3PAOs do CMMC Level 2 specifically."
  },
  {
    id: 9,
    question: "What is 'scoping' in CMMC?",
    options: [
      "A) Defining systems that process/store CUI",
      "B) Identifying all assets touching federal data",
      "C) Looking through a telescope at servers",
      "D) Running away from auditors"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Proper scoping can save you from certifying your entire company.",
    goodExplanation: "That's part of it! But scoping specifically focuses on CUI boundaries."
  },
  {
    id: 10,
    question: "What is the purpose of FIPS 140-2 validated encryption?",
    options: [
      "A) Ensure crypto modules meet federal standards",
      "B) Verify encryption strength is adequate",
      "C) To make data extra crispy",
      "D) Justify expensive hardware purchases"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "FIPS 140-2 validates your encryption isn't just 'password123' with extra steps.",
    goodExplanation: "Strength matters, but FIPS specifically validates the module meets federal standards."
  },
  {
    id: 11,
    question: "What is an enclave in CMMC context?",
    options: [
      "A) Segmented network boundary containing CUI",
      "B) Isolated security zone for sensitive data",
      "C) A secret government bunker",
      "D) Where compliance officers cry"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "An enclave is a properly segmented environment. (D is also valid.)",
    goodExplanation: "Good concept! But enclave specifically refers to CUI boundaries, not just any sensitive data."
  },
  {
    id: 12,
    question: "How often should security awareness training occur per CMMC?",
    options: [
      "A) Annually at minimum",
      "B) Upon hire and when threats change",
      "C) Never, ignorance is bliss",
      "D) Every phishing click (so, daily)"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Annual training minimum. D would mean continuous training for most orgs.",
    goodExplanation: "New hire and threat-based training is good practice, but annual minimum is the requirement."
  },
  {
    id: 13,
    question: "What does MFA stand for?",
    options: [
      "A) Multi-Factor Authentication",
      "B) Multiple Forms of Authentication",
      "C) Mandatory Firewall Application",
      "D) My Favorite Acronym"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Multi-Factor Authentication - because passwords alone aren't enough.",
    goodExplanation: "Same concept, different wording! The official term is Multi-Factor."
  },
  {
    id: 14,
    question: "What is the CMMC Level 1 requirement for CUI?",
    options: [
      "A) Level 1 is for FCI only, not CUI",
      "B) Level 1 covers basic CUI handling",
      "C) Just install antivirus",
      "D) Post a 'No Hackers' sign"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Level 1 is FCI only (17 practices). CUI requires Level 2 minimum!",
    goodExplanation: "Tricky! Level 1 does NOT cover CUI at all - that requires Level 2."
  },
  {
    id: 15,
    question: "What is a 'NOT MET' finding?",
    options: [
      "A) Control that fails to meet requirements",
      "B) Control with insufficient evidence",
      "C) An auditor you haven't met",
      "D) A meeting that was cancelled"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "A NOT MET means you failed a control. Both A and B lead to this result.",
    goodExplanation: "Insufficient evidence often results in NOT MET, but it specifically means the control wasn't satisfied."
  },
  {
    id: 16,
    question: "What system holds your SPRS score?",
    options: [
      "A) Supplier Performance Risk System",
      "B) SPRS Portal (sam.gov integration)",
      "C) The Cloud",
      "D) A filing cabinet in the Pentagon"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "SPRS - Supplier Performance Risk System. Your score lives there.",
    goodExplanation: "It does integrate with SAM.gov! But SPRS itself is the Supplier Performance Risk System."
  },
  {
    id: 17,
    question: "What is 'evidence' in a CMMC assessment?",
    options: [
      "A) Documentation proving control implementation",
      "B) Artifacts demonstrating security practices",
      "C) Screenshots of you doing work",
      "D) Witness testimonies under oath"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Evidence = proof your controls work. Screenshots, policies, logs - all of it.",
    goodExplanation: "Artifacts are evidence! The key is they must prove the control is implemented."
  },
  {
    id: 18,
    question: "How long must you retain security logs per NIST 800-171?",
    options: [
      "A) 90 days minimum",
      "B) 1 year recommended",
      "C) 30 days",
      "D) Until heat death of universe"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "90 days minimum retention. Your SIEM storage costs just increased.",
    goodExplanation: "1 year is best practice and often required by contracts, but 800-171 says 90 days minimum."
  },
  {
    id: 19,
    question: "What does NIST 800-171A provide?",
    options: [
      "A) Assessment procedures for controls",
      "B) Detailed control implementation guidance",
      "C) More acronyms",
      "D) Job security for consultants"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "800-171A tells you HOW you'll be assessed. Know it. Fear it.",
    goodExplanation: "It helps with implementation too, but it's specifically the assessment procedures document."
  },
  {
    id: 20,
    question: "What should you do if you discover a CUI breach?",
    options: [
      "A) Report to DoD within 72 hours",
      "B) Report to CISA within 24 hours",
      "C) Delete evidence and hope",
      "D) Update LinkedIn to 'Open to Work'"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Report to DoD within 72 hours via dibnet.dod.mil. (D is the mood though.)",
    goodExplanation: "CISA reporting is for critical infrastructure - DoD breach reporting is via DIBNET within 72 hours."
  },
  // === PHASE 1: PLANNING & PREPARATION ===
  {
    id: 21,
    question: "What is Phase 1 of the CMMC assessment process?",
    options: [
      "A) Planning & Preparation",
      "B) Pre-Assessment Readiness",
      "C) Assessment Execution",
      "D) Crying in the break room"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Phase 1 is Planning & Preparation - defining scope, reviewing readiness, and scheduling.",
    goodExplanation: "Readiness is part of it! But the official phase name is Planning & Preparation."
  },
  {
    id: 22,
    question: "During Phase 1, who must affirm the accuracy of the SPRS score?",
    options: [
      "A) A senior company official",
      "B) The CISO or security lead",
      "C) The IT intern",
      "D) Anyone with a pulse"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "A senior official must affirm the SPRS score accuracy - it's a legal attestation!",
    goodExplanation: "The CISO might do it, but it must be a senior official with authority to attest."
  },
  {
    id: 23,
    question: "What document defines the assessment boundary in Phase 1?",
    options: [
      "A) The scoping guide/asset inventory",
      "B) The System Security Plan (SSP)",
      "C) A post-it note",
      "D) The network diagram nobody updated"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "The scoping guide helps define which assets are in-scope for CUI processing.",
    goodExplanation: "The SSP does describe boundaries! But the scoping guide/inventory specifically defines assessment scope."
  },
  {
    id: 24,
    question: "What are the 5 asset categories for CMMC scoping?",
    options: [
      "A) CUI, Security Protection, Contractor Risk Managed, Specialized, Out-of-Scope",
      "B) Critical, High, Medium, Low, Informational",
      "C) Red, Blue, Green, Yellow, Purple",
      "D) Servers, Laptops, Phones, Printers, Feelings"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "CUI Assets, Security Protection Assets, Contractor Risk Managed, Specialized, and Out-of-Scope.",
    goodExplanation: "That's a risk classification! CMMC uses specific asset categories for scoping."
  },
  {
    id: 25,
    question: "How far in advance should you schedule your C3PAO assessment?",
    options: [
      "A) 3-6 months typically",
      "B) 6-12 months for complex environments",
      "C) The night before",
      "D) Never, live in denial forever"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Plan 3-6 months ahead - C3PAOs book up fast and you need prep time!",
    goodExplanation: "For complex environments, more time is wise! 3-6 months is the typical guidance."
  },
  // === PHASE 2: ASSESSMENT EXECUTION ===
  {
    id: 26,
    question: "What is Phase 2 of the CMMC assessment?",
    options: [
      "A) Assessment Execution",
      "B) Evidence Collection & Testing",
      "C) Planning & Preparation",
      "D) The denial phase"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Phase 2 is Assessment Execution - where the C3PAO actually tests your controls.",
    goodExplanation: "Evidence collection and testing happen during Assessment Execution - that's the official name."
  },
  {
    id: 27,
    question: "What are the three assessment methods used in Phase 2?",
    options: [
      "A) Examine, Interview, Test",
      "B) Review, Validate, Verify",
      "C) Hope, Pray, Cry",
      "D) Google, Stack Overflow, ChatGPT"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Examine (review docs), Interview (talk to staff), Test (verify controls work).",
    goodExplanation: "Similar concepts! But the official NIST terms are Examine, Interview, and Test."
  },
  {
    id: 28,
    question: "During interviews, who should be available to the assessors?",
    options: [
      "A) Personnel responsible for implementing controls",
      "B) Anyone with knowledge of security operations",
      "C) Only the CISO",
      "D) Literally anyone who can fog a mirror"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "People who actually implement and operate the controls must be available.",
    goodExplanation: "Security ops knowledge helps, but specifically those responsible for the controls being assessed."
  },
  {
    id: 29,
    question: "What happens if evidence is missing during Phase 2?",
    options: [
      "A) The control may be marked NOT MET",
      "B) You get a chance to provide it later",
      "C) Everyone gets a participation trophy",
      "D) The audit magically passes anyway"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "No evidence = NOT MET. Document everything or suffer the consequences!",
    goodExplanation: "Limited real-time remediation exists, but missing evidence typically means NOT MET."
  },
  {
    id: 30,
    question: "Can you remediate findings during the assessment?",
    options: [
      "A) Yes, limited real-time remediation is allowed",
      "B) Yes, but only for documentation gaps",
      "C) No, what's done is done",
      "D) Only on Tuesdays"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Limited real-time remediation is allowed for minor issues during assessment.",
    goodExplanation: "Documentation is common, but real-time remediation can apply to minor technical fixes too."
  },
  // === PHASE 3: REPORTING ===
  {
    id: 31,
    question: "What is Phase 3 of the CMMC assessment?",
    options: [
      "A) Reporting",
      "B) Findings Documentation",
      "C) Celebration",
      "D) The bargaining phase"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Phase 3 is Reporting - documenting findings and creating the assessment report.",
    goodExplanation: "Findings documentation is what happens in Reporting - that's the official phase name."
  },
  {
    id: 32,
    question: "What document lists all findings requiring remediation?",
    options: [
      "A) Plan of Action & Milestones (POA&M)",
      "B) Corrective Action Plan (CAP)",
      "C) The shame spreadsheet",
      "D) A very long sticky note"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "The POA&M documents all NOT MET findings and remediation timelines.",
    goodExplanation: "CAP is similar terminology used elsewhere, but CMMC specifically uses POA&M."
  },
  {
    id: 33,
    question: "How long do you have to close POA&M items for conditional certification?",
    options: [
      "A) 180 days",
      "B) 1 year",
      "C) Forever, no rush",
      "D) It's already too late"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "180 days to close POA&M items or your conditional certification may be revoked.",
    goodExplanation: "Some contracts may allow longer, but the CMMC standard is 180 days."
  },
  {
    id: 34,
    question: "What determines a MET vs NOT MET finding?",
    options: [
      "A) Whether assessment objectives are satisfied per 800-171A",
      "B) If the control is implemented and effective",
      "C) Assessor's mood that day",
      "D) How good the coffee was"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Assessment objectives from NIST 800-171A determine MET/NOT MET status.",
    goodExplanation: "Implementation and effectiveness matter, but 800-171A objectives are the specific criteria."
  },
  {
    id: 35,
    question: "Who reviews the assessment report before submission?",
    options: [
      "A) The OSC (Organization Seeking Certification)",
      "B) The organization's legal/compliance team",
      "C) Nobody, YOLO",
      "D) A magic 8-ball"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "The OSC reviews the report for accuracy before the C3PAO submits to Cyber AB.",
    goodExplanation: "Legal/compliance typically helps, but the OSC as an entity must review and approve."
  },
  // === PHASE 4: ADJUDICATION & CERTIFICATION ===
  {
    id: 36,
    question: "What is Phase 4 of the CMMC assessment?",
    options: [
      "A) Adjudication & Certification",
      "B) Final Review & Approval",
      "C) Victory lap",
      "D) The acceptance phase"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Phase 4 is Adjudication - where Cyber AB reviews and issues certification decisions.",
    goodExplanation: "Final review and approval describes what happens, but the official name is Adjudication."
  },
  {
    id: 37,
    question: "What are the two types of CMMC certification?",
    options: [
      "A) Conditional and Final",
      "B) Provisional and Full",
      "C) Temporary and Permanent",
      "D) Real and Imaginary"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Conditional (with POA&M items) or Final (all controls MET).",
    goodExplanation: "Similar concept! But CMMC uses the terms Conditional and Final specifically."
  },
  {
    id: 38,
    question: "How long is a CMMC certification valid?",
    options: [
      "A) 3 years",
      "B) 5 years with annual affirmations",
      "C) Forever",
      "D) Until the next breach"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "CMMC certifications are valid for 3 years, then you get to do it all again!",
    goodExplanation: "Annual affirmations are required, but the cert itself is valid for 3 years."
  },
  {
    id: 39,
    question: "What happens if POA&M items aren't closed in 180 days?",
    options: [
      "A) Conditional certification may be revoked",
      "B) You must request an extension",
      "C) Nothing, extensions are automatic",
      "D) Free pizza party"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "Failure to close POA&M items can result in revocation of conditional certification.",
    goodExplanation: "Extensions may be possible, but the default consequence is potential revocation."
  },
  {
    id: 40,
    question: "Who issues the final CMMC certification?",
    options: [
      "A) The Cyber AB (formerly CMMC-AB)",
      "B) The C3PAO after DoD approval",
      "C) Your mom (she's very proud)",
      "D) The DoD CIO directly"
    ],
    bestAnswer: "A",
    goodAnswer: "B",
    explanation: "The Cyber AB (Accreditation Body) issues certifications after reviewing C3PAO reports.",
    goodExplanation: "C3PAOs conduct the assessment, but Cyber AB issues the actual certification."
  },
];

export const DEFAULT_PARTY = [
  "CISO McSecurityface",
  "Compliance Carl",
  "Policy Patricia",
  "Audit Andy",
  "The Intern (unnamed)"
];
