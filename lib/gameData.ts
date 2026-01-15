export interface Question {
  id: number;
  question: string;
  options: string[];           // Options WITHOUT letter prefixes
  bestAnswerIndex: number;     // Index of best answer (0-3)
  goodAnswerIndex: number;     // Index of good answer (0-3)
  explanation: string;
  goodExplanation: string;
}

export interface ShuffledQuestion {
  id: number;
  question: string;
  options: string[];           // Shuffled options WITH letter prefixes
  bestAnswer: string;          // Letter of best answer after shuffle
  goodAnswer: string;          // Letter of good answer after shuffle
  explanation: string;
  goodExplanation: string;
}

export interface GameEvent {
  text: string;
  type: 'death' | 'good' | 'bad' | 'neutral';
}

// Shuffle array using Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get a shuffled question with randomized answer positions
export function getShuffledQuestion(q: Question): ShuffledQuestion {
  const letters = ['A', 'B', 'C', 'D'];
  const indices = [0, 1, 2, 3];
  const shuffledIndices = shuffleArray(indices);

  const shuffledOptions = shuffledIndices.map((origIndex, newIndex) =>
    `${letters[newIndex]}) ${q.options[origIndex]}`
  );

  // Find where the best and good answers ended up after shuffle
  const bestNewIndex = shuffledIndices.indexOf(q.bestAnswerIndex);
  const goodNewIndex = shuffledIndices.indexOf(q.goodAnswerIndex);

  return {
    id: q.id,
    question: q.question,
    options: shuffledOptions,
    bestAnswer: letters[bestNewIndex],
    goodAnswer: letters[goodNewIndex],
    explanation: q.explanation,
    goodExplanation: q.goodExplanation,
  };
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
  // New death messages
  "was terminated after clicking the phishing link in the 'Free Pizza' email",
  "spontaneously combusted while explaining CMMC to the board for the 12th time",
  "was absorbed into the cloud... literally",
  "died after the SSP reached 847 pages",
  "was last seen chasing a rogue USB drive into the server room",
  "perished from caffeine toxicity during the 72-hour audit prep",
  "was vaporized by an angry ISSM",
  "got stuck in an infinite loop of remediation tickets",
  "was claimed by the Shadow IT dimension",
  "died of exposure... to unpatched Windows 7 machines",
  "was lost when their VPN connected to the wrong universe",
  "succumbed to death by 1000 POA&M items",
  "expired while waiting for Change Advisory Board approval",
  "was eaten by a grue in the unlit server room",
  "accidentally rm -rf'd themselves out of existence",
  "was deprecated along with the legacy system they loved",
  "died debugging a firewall rule from 2003",
  "was crushed under the weight of compliance documentation",
];

export const RANDOM_EVENTS: GameEvent[] = [
  // Death events
  { text: "Your SIEM license expired. Alert fatigue claims a victim.", type: "death" },
  { text: "The intern accidentally emailed CUI to their personal Gmail.", type: "death" },
  { text: "Supply chain attack! Your monitoring tool was compromised.", type: "death" },
  { text: "The CFO approved the security budget, but only in a dream. Someone dies of disappointment.", type: "death" },
  { text: "A team member opened a suspicious .exe called 'TotallyNotMalware.exe'", type: "death" },
  { text: "Your MFA token was eaten by the office dog.", type: "death" },
  { text: "Someone tried to lift the server rack alone. It did not end well.", type: "death" },

  // Good events
  { text: "You found an abandoned System Security Plan template on the trail! Team morale increases.", type: "good" },
  { text: "Good news! Your SPRS score went up by 3 points!", type: "good" },
  { text: "A consultant wagon passes by and drops some free templates!", type: "good" },
  { text: "You successfully convinced leadership to fund the project! Morale soars!", type: "good" },
  { text: "Your POA&M milestones are all GREEN! Is this real life?", type: "good" },
  { text: "You found a working printer. It's a miracle!", type: "good" },
  { text: "Your SSP backup was actually current. Unbelievable!", type: "good" },
  { text: "The firewall rules actually make sense! Someone documented them!", type: "good" },
  { text: "A vendor actually delivered on their security promises! Team morale soars.", type: "good" },
  { text: "You found a working fax machine. The auditor is pleased.", type: "good" },
  { text: "The CEO remembered your name! Team morale skyrockets.", type: "good" },
  { text: "Your penetration test came back clean. Suspicious, but good!", type: "good" },
  { text: "A compliance consultant's invoice was UNDER budget. Is this real?", type: "good" },
  { text: "Someone actually read the Acceptable Use Policy!", type: "good" },
  { text: "IT and Security agreed on something. Mark your calendars.", type: "good" },

  // Bad events
  { text: "Your vulnerability scanner found 10,000 new findings overnight. Morale drops.", type: "bad" },
  { text: "Heavy rain has flooded your on-prem data center. Morale drops.", type: "bad" },
  { text: "You discovered shadow IT. Everywhere. So much shadow IT.", type: "bad" },
  { text: "The DoD released new guidance. Everything you knew is wrong now.", type: "bad" },
  { text: "A team member accidentally deleted the evidence folder.", type: "bad" },
  { text: "Marketing launched a new cloud app without telling IT. Again.", type: "bad" },
  { text: "The backup tapes were stored next to a giant magnet.", type: "bad" },
  { text: "Your SIEM generated 50,000 alerts. All false positives.", type: "bad" },
  { text: "A contractor plugged in a crypto mining rig.", type: "bad" },
  { text: "The CEO's nephew needs admin access 'for a school project.'", type: "bad" },
  { text: "Someone printed CUI and left it on the break room table.", type: "bad" },
  { text: "The 'quick 5-minute fix' is now in hour 6.", type: "bad" },
  { text: "Your documentation was written by someone who has since left. No one knows what it means.", type: "bad" },

  // Neutral events
  { text: "A wild auditor appears! They just want to chat about controls. False alarm.", type: "neutral" },
  { text: "Your C3PAO assessment got rescheduled... for the 4th time.", type: "neutral" },
  { text: "A friendly MSP offers to manage your EDR. Seems legit.", type: "neutral" },
  { text: "Ransomware gang sends a LinkedIn connection request to your CISO.", type: "neutral" },
  { text: "An auditor asks if your firewall is 'cyber'. You nod slowly.", type: "neutral" },
  { text: "You spot a wild ISO 27001 auditor. They seem lost.", type: "neutral" },
  { text: "A vendor offers 'military-grade encryption.' You have questions.", type: "neutral" },
  { text: "The intern asks what 'on-prem' means. Everyone feels old.", type: "neutral" },
  { text: "Your EDR caught a threat! It was the IT admin testing things.", type: "neutral" },
  { text: "Someone found a Post-it note with 'admin/admin' written on it. Classic.", type: "neutral" },
  { text: "The compliance meeting ran long. Nobody is surprised.", type: "neutral" },
];

export const CMMC_QUESTIONS: Question[] = [
  // ============ BASIC CMMC CONCEPTS ============
  {
    id: 1,
    question: "What does CUI stand for?",
    options: [
      "Controlled Unclassified Information",
      "Confidential Unclassified Information",
      "Cybersecurity Unified Infrastructure",
      "Compliance Under Investigation"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CUI = Controlled Unclassified Information, as defined in 32 CFR Part 2002.",
    goodExplanation: "Close! It's 'Controlled' not 'Confidential' - an important distinction in federal terminology."
  },
  {
    id: 2,
    question: "How many security requirements are in NIST SP 800-171 Rev 2?",
    options: [
      "110 security requirements",
      "130 security requirements",
      "17 security requirements",
      "320 security requirements"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "NIST 800-171 Rev 2 contains 110 security requirements across 14 control families.",
    goodExplanation: "There are 110 base requirements. You might be thinking of 800-53 which has more."
  },
  {
    id: 3,
    question: "What is the minimum SPRS score possible?",
    options: [
      "-203",
      "-110",
      "0",
      "-171"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "-203 is the minimum SPRS score, calculated from weighted requirement values.",
    goodExplanation: "Good logic thinking one point per control, but the actual weighted minimum is -203."
  },

  // ============ NIST 800-171 CONTROL FAMILIES ============
  {
    id: 4,
    question: "How many control families are in NIST SP 800-171?",
    options: [
      "14 families",
      "17 families",
      "20 families",
      "11 families"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "NIST 800-171 has 14 control families: AC, AT, AU, CM, IA, IR, MA, MP, PE, PS, RA, CA, SC, SI.",
    goodExplanation: "There are 14 families. You might be thinking of CMMC Level 1 which has 17 practices."
  },
  {
    id: 5,
    question: "Which control family does 'Limit system access to authorized users' belong to?",
    options: [
      "Access Control (AC)",
      "Identification and Authentication (IA)",
      "System and Communications Protection (SC)",
      "Personnel Security (PS)"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "AC.L2-3.1.1 - Limit system access is an Access Control requirement.",
    goodExplanation: "IA handles identity verification, but limiting access is specifically Access Control."
  },
  {
    id: 6,
    question: "What does control family 'AU' stand for in NIST 800-171?",
    options: [
      "Audit and Accountability",
      "Authentication and Authorization",
      "Access and Usage",
      "Awareness and Understanding"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "AU = Audit and Accountability, covering logging, monitoring, and audit trail requirements.",
    goodExplanation: "Authentication is actually under IA (Identification and Authentication)."
  },

  // ============ SPECIFIC 800-171 REQUIREMENTS ============
  {
    id: 7,
    question: "Per 800-171, how long must audit logs be retained at minimum?",
    options: [
      "Sufficient to support after-the-fact investigation (typically 90+ days)",
      "30 days",
      "1 year",
      "7 days"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.3.2 requires logs be retained long enough for investigation. Industry standard is 90+ days.",
    goodExplanation: "1 year is good practice and often contractually required, but 800-171 specifies investigation support."
  },
  {
    id: 8,
    question: "What encryption standard does 800-171 require for protecting CUI at rest and in transit?",
    options: [
      "FIPS 140-2 validated cryptography",
      "AES-256 minimum",
      "TLS 1.2 or higher",
      "Any industry-standard encryption"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.13.11 requires FIPS-validated cryptographic mechanisms to protect CUI.",
    goodExplanation: "TLS 1.2+ is part of it for transit, but the requirement specifically calls for FIPS validation."
  },
  {
    id: 9,
    question: "What does requirement 3.5.3 mandate for authenticating users?",
    options: [
      "Multi-factor authentication for network access to privileged and non-privileged accounts",
      "Multi-factor authentication only for privileged accounts",
      "Password complexity requirements",
      "Biometric authentication for all users"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.5.3 requires MFA for network access to both privileged AND non-privileged accounts accessing CUI.",
    goodExplanation: "MFA for privileged is critical, but 800-171 extends this to all network access to CUI."
  },
  {
    id: 10,
    question: "Per 3.1.12, what must organizations do regarding remote access sessions?",
    options: [
      "Monitor and control remote access sessions",
      "Prohibit all remote access",
      "Allow unlimited remote access with VPN",
      "Require on-site access only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.1.12 requires monitoring and controlling remote access, not prohibiting it entirely.",
    goodExplanation: "VPN is one control, but monitoring and control of sessions is the actual requirement."
  },

  // ============ CMMC ASSESSMENT PROCESS ============
  {
    id: 11,
    question: "Who performs CMMC Level 2 certification assessments?",
    options: [
      "C3PAO (Certified Third-Party Assessment Organization)",
      "DCMA (Defense Contract Management Agency)",
      "The organization itself (self-assessment)",
      "NIST directly"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "C3PAOs conduct CMMC Level 2 assessments. DCMA handles some DIBCAC assessments.",
    goodExplanation: "DCMA does defense assessments but C3PAOs specifically handle CMMC L2 certification."
  },
  {
    id: 12,
    question: "What are the three assessment methods used in CMMC assessments per 800-171A?",
    options: [
      "Examine, Interview, Test",
      "Review, Validate, Certify",
      "Audit, Inspect, Verify",
      "Document, Demonstrate, Confirm"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "NIST 800-171A specifies Examine (documentation), Interview (personnel), Test (mechanisms).",
    goodExplanation: "These terms are close but the official 800-171A terms are Examine, Interview, Test."
  },
  {
    id: 13,
    question: "How long is a CMMC Level 2 certification valid?",
    options: [
      "3 years",
      "5 years",
      "1 year",
      "Indefinitely with annual affirmation"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CMMC certifications are valid for 3 years, requiring reassessment after expiration.",
    goodExplanation: "Annual affirmations are required, but full recertification happens every 3 years."
  },
  {
    id: 14,
    question: "What is the maximum time allowed to close POA&M items under conditional certification?",
    options: [
      "180 days",
      "365 days",
      "90 days",
      "30 days"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "Conditional certification allows 180 days to remediate POA&M items.",
    goodExplanation: "Some contracts may allow extensions, but the standard CMMC timeline is 180 days."
  },

  // ============ SCOPING AND BOUNDARIES ============
  {
    id: 15,
    question: "What are the five asset categories for CMMC scoping?",
    options: [
      "CUI Assets, Security Protection, Contractor Risk Managed, Specialized, Out-of-Scope",
      "Critical, High, Medium, Low, Informational",
      "Network, Endpoint, Cloud, Physical, Personnel",
      "Production, Development, Test, Backup, Archive"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CMMC scoping uses: CUI Assets, Security Protection Assets, Contractor Risk Managed, Specialized, Out-of-Scope.",
    goodExplanation: "Those are valid asset types but not the official CMMC scoping categories."
  },
  {
    id: 16,
    question: "What defines the boundary of a CMMC assessment?",
    options: [
      "Systems that process, store, or transmit CUI",
      "The entire corporate network",
      "Only servers containing CUI",
      "All IT assets owned by the organization"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "The assessment boundary includes all systems that process, store, OR transmit CUI.",
    goodExplanation: "Servers are part of it, but workstations and network paths that transmit CUI are also in scope."
  },

  // ============ INCIDENT RESPONSE ============
  {
    id: 17,
    question: "Per DFARS 252.204-7012, how quickly must cyber incidents be reported to DoD?",
    options: [
      "Within 72 hours of discovery",
      "Within 24 hours of discovery",
      "Within 1 hour of discovery",
      "Within 30 days of discovery"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "DFARS 7012 requires reporting cyber incidents to DoD within 72 hours via dibnet.dod.mil.",
    goodExplanation: "24 hours is best practice and some contracts require it, but DFARS specifies 72 hours."
  },
  {
    id: 18,
    question: "What must be preserved for 90 days following a cyber incident per DFARS?",
    options: [
      "Media and malicious software for forensic analysis",
      "Only email communications",
      "Financial records",
      "Employee attendance records"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "DFARS 7012 requires preserving images of affected systems and malware for 90 days.",
    goodExplanation: "Communications may be relevant but the specific requirement is media and malware preservation."
  },

  // ============ TECHNICAL CONTROLS ============
  {
    id: 19,
    question: "What does requirement 3.13.1 mandate for system boundaries?",
    options: [
      "Monitor, control, and protect communications at external boundaries and key internal boundaries",
      "Encrypt all internal communications",
      "Block all inbound traffic",
      "Segment every department individually"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "3.13.1 requires monitoring and protecting communications at system boundaries.",
    goodExplanation: "Segmentation is related but the requirement focuses on monitoring and control at boundaries."
  },
  {
    id: 20,
    question: "Per 3.4.1, what must organizations establish and maintain?",
    options: [
      "Baseline configurations and inventories of organizational systems",
      "A change management committee",
      "Weekly vulnerability scans",
      "Annual penetration tests"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.4.1 requires baseline configurations and system inventories as foundational CM controls.",
    goodExplanation: "Vulnerability scanning is important but 3.4.1 specifically addresses baselines and inventory."
  },
  {
    id: 21,
    question: "What does requirement 3.14.1 require for malicious code protection?",
    options: [
      "Identify, report, and correct system flaws in a timely manner",
      "Install antivirus on all systems",
      "Block all executable files",
      "Scan email attachments only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.14.1 focuses on flaw identification and remediation. 3.14.2 covers malicious code protection.",
    goodExplanation: "Antivirus is part of malicious code protection (3.14.2), but 3.14.1 is about flaw remediation."
  },

  // ============ PERSONNEL AND AWARENESS ============
  {
    id: 22,
    question: "Per 3.2.1, what security awareness content must be provided to users?",
    options: [
      "Awareness of security risks and applicable policies",
      "Only phishing awareness",
      "Certification exam preparation",
      "Technical hacking techniques"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.2.1 requires awareness of security risks associated with their activities and applicable policies.",
    goodExplanation: "Phishing is one risk, but the requirement covers broader security risks and policies."
  },
  {
    id: 23,
    question: "What does 3.9.2 require before granting access to CUI?",
    options: [
      "Screen individuals prior to authorizing access to systems containing CUI",
      "Require a security clearance",
      "Complete a 40-hour training course",
      "Sign a non-disclosure agreement only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "3.9.2 requires personnel screening before granting CUI access. NDAs are part but not the full requirement.",
    goodExplanation: "NDAs are important but screening includes background checks appropriate to the risk."
  },

  // ============ PHYSICAL SECURITY ============
  {
    id: 24,
    question: "What does requirement 3.10.1 address?",
    options: [
      "Limit physical access to organizational systems and equipment to authorized individuals",
      "Install surveillance cameras everywhere",
      "Require biometric access for all doors",
      "Hire security guards"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.10.1 requires limiting physical access to systems, equipment, and operating environments.",
    goodExplanation: "Biometrics could implement this, but the requirement is about limiting access to authorized individuals."
  },
  {
    id: 25,
    question: "Per 3.10.6, what alternative protection must be used for areas that cannot be protected physically?",
    options: [
      "Alternative physical safeguards appropriate to the risk",
      "Encryption only",
      "Remove all CUI from the area",
      "Continuous video surveillance"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.10.6 requires alternative safeguards when traditional physical protection isn't feasible.",
    goodExplanation: "Removing CUI is one option, but the requirement allows for alternative appropriate safeguards."
  },

  // ============ SYSTEM MAINTENANCE ============
  {
    id: 26,
    question: "What does requirement 3.7.1 require for system maintenance?",
    options: [
      "Perform maintenance on organizational systems in a timely manner",
      "Contract all maintenance to third parties",
      "Perform maintenance only during business hours",
      "Document maintenance only when systems fail"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.7.1 requires timely maintenance. Third-party maintenance requires additional controls (3.7.3).",
    goodExplanation: "Third parties can do maintenance but there are specific controls for non-local maintenance."
  },
  {
    id: 27,
    question: "What must be done before media containing CUI is released for maintenance?",
    options: [
      "Sanitize or destroy the media",
      "Encrypt the media only",
      "Label the media as classified",
      "Notify the DoD"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.8.3 requires sanitization before release. Encryption alone may not be sufficient.",
    goodExplanation: "Encryption helps protect but sanitization ensures CUI cannot be recovered."
  },

  // ============ RISK ASSESSMENT ============
  {
    id: 28,
    question: "How often must organizations assess risk to operations and assets per 3.11.1?",
    options: [
      "Periodically, as defined by the organization based on risk",
      "Annually only",
      "Monthly",
      "Only when incidents occur"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.11.1 requires periodic risk assessment. The frequency should be risk-based and documented.",
    goodExplanation: "Annual is common but the requirement is 'periodic' based on organizational risk factors."
  },
  {
    id: 29,
    question: "What must vulnerability scans identify per 3.11.2?",
    options: [
      "Vulnerabilities in organizational systems and applications",
      "Only external-facing vulnerabilities",
      "Hardware inventory only",
      "Employee password strength"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.11.2 requires scanning organizational systems and applications for vulnerabilities.",
    goodExplanation: "External-facing systems are critical but internal scanning is also required."
  },

  // ============ MEDIA PROTECTION ============
  {
    id: 30,
    question: "What type of marking does 3.8.4 require on media containing CUI?",
    options: [
      "CUI markings required by CUI Registry and organization policy",
      "TOP SECRET markings",
      "Company logo only",
      "No markings to prevent identification"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.8.4 requires marking media with required CUI designations per the CUI Registry.",
    goodExplanation: "Company identification helps but specific CUI markings are the requirement."
  },

  // ============ ADVANCED TECHNICAL QUESTIONS ============
  {
    id: 31,
    question: "What does requirement 3.1.5 address regarding privileged accounts?",
    options: [
      "Employ the principle of least privilege, including specific security functions and privileged accounts",
      "Grant all employees administrator access",
      "Disable all privileged accounts",
      "Rotate privileged accounts daily"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "3.1.5 requires least privilege - users get minimum access necessary for their duties.",
    goodExplanation: "Rotation is good for credentials but least privilege is about access scope."
  },
  {
    id: 32,
    question: "Per 3.1.7, what must be prevented regarding privileged functions?",
    options: [
      "Prevent non-privileged users from executing privileged functions",
      "Prevent all users from using command line",
      "Prevent remote privileged access entirely",
      "Prevent privileged users from accessing CUI"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.1.7 ensures only authorized users can execute privileged functions.",
    goodExplanation: "Remote privileged access has controls (3.1.12) but 3.1.7 is about function separation."
  },
  {
    id: 33,
    question: "What does 3.5.10 require for stored passwords?",
    options: [
      "Store and transmit only cryptographically-protected passwords",
      "Store passwords in plain text with access controls",
      "Never store passwords",
      "Use reversible encryption for passwords"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.5.10 requires cryptographic protection (hashing) for stored passwords.",
    goodExplanation: "Not storing passwords sounds secure but authentication requires some credential storage."
  },
  {
    id: 34,
    question: "What network architecture does 3.13.5 recommend for CUI systems?",
    options: [
      "Implement subnetworks for publicly accessible system components that are separated from internal networks",
      "Place all systems on a single flat network",
      "Use only cloud hosting",
      "Require air-gapped networks for all CUI"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "3.13.5 requires network segmentation with DMZs for public-facing components.",
    goodExplanation: "Air-gapping is extreme. The requirement is logical separation via subnetworks."
  },
  {
    id: 35,
    question: "What does 3.12.4 require for system security plans?",
    options: [
      "Develop, document, update, and implement plans describing system boundaries, environments, and security requirements",
      "Use a template without customization",
      "Create plans only for production systems",
      "Review plans every 5 years"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.12.4 requires comprehensive SSPs covering boundaries, environment, and implementation.",
    goodExplanation: "Production is critical but plans should cover all in-scope systems."
  },

  // ============ CMMC SPECIFIC QUESTIONS ============
  {
    id: 36,
    question: "What distinguishes CMMC Level 1 from Level 2?",
    options: [
      "Level 1 covers FCI (17 practices), Level 2 covers CUI (110 requirements)",
      "Level 1 is self-assessed, Level 2 is always third-party",
      "Level 1 requires encryption, Level 2 does not",
      "Level 1 is for large companies, Level 2 for small"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "Level 1 protects FCI with 17 practices. Level 2 protects CUI with all 110 NIST 800-171 requirements.",
    goodExplanation: "Assessment type varies by contract, but the key difference is FCI vs CUI protection scope."
  },
  {
    id: 37,
    question: "What is required for an 'Affirmation' in CMMC?",
    options: [
      "A senior official affirming continued compliance annually in SPRS",
      "A signed contract with the DoD",
      "A physical inspection of facilities",
      "A letter from the C3PAO"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "Annual affirmation by a senior official in SPRS confirms continued compliance.",
    goodExplanation: "C3PAOs conduct assessments but affirmation is the organization's responsibility."
  },
  {
    id: 38,
    question: "What is a Security Protection Asset (SPA) in CMMC scoping?",
    options: [
      "An asset that provides security functions for CUI assets but doesn't process CUI",
      "Any asset that contains CUI",
      "Assets that are out of scope",
      "Cloud-only assets"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "SPAs provide security functions (firewalls, SIEM, etc.) for CUI but don't process CUI themselves.",
    goodExplanation: "Assets containing CUI are 'CUI Assets' - a different category than SPAs."
  },
  {
    id: 39,
    question: "What does 'Contractor Risk Managed Assets' mean in CMMC?",
    options: [
      "Assets that can access but not process/store CUI, managed via policy controls",
      "Assets owned by contractors",
      "Assets with identified vulnerabilities",
      "Assets pending decommission"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CRM assets can access CUI environment but don't process/store CUI - managed by contractor policy.",
    goodExplanation: "Contractor ownership doesn't define this category - it's about CUI access scope."
  },
  {
    id: 40,
    question: "What is the role of the Cyber AB (formerly CMMC-AB)?",
    options: [
      "Accredit C3PAOs and oversee the CMMC ecosystem",
      "Conduct all CMMC assessments directly",
      "Write the NIST 800-171 standard",
      "Provide free compliance tools"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "Cyber AB accredits C3PAOs and certified assessors, overseeing the CMMC program.",
    goodExplanation: "Cyber AB oversees but doesn't conduct assessments - C3PAOs do that."
  },

  // ============ CHALLENGING TECHNICAL QUESTIONS ============
  {
    id: 41,
    question: "Per 3.3.1, what events must be logged at minimum?",
    options: [
      "Events that affect the audit function and successful/unsuccessful logon attempts",
      "All user keystrokes",
      "Only failed login attempts",
      "Only administrator actions"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.3.1 specifies logging events affecting audit capability and logon attempts (both successful and failed).",
    goodExplanation: "Failed logins are important but successful logins must also be logged per the requirement."
  },
  {
    id: 42,
    question: "What does requirement 3.6.1 require for incident handling?",
    options: [
      "Establish an operational incident-handling capability including preparation, detection, analysis, containment, recovery, and user response",
      "Only document incidents after they occur",
      "Outsource all incident response",
      "Report incidents to local law enforcement first"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.6.1 requires a full incident handling capability covering the entire incident lifecycle.",
    goodExplanation: "Outsourcing can support IR but you still need an established capability."
  },
  {
    id: 43,
    question: "What does 3.4.6 require for software installation?",
    options: [
      "Employ allowlisting of authorized software",
      "Allow users to install any software needed",
      "Block all software installation",
      "Require manager approval via email"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.4.6 requires defining and enforcing authorized software policies (allowlisting).",
    goodExplanation: "Blocking all installation is too restrictive. Allowlisting defines what CAN be installed."
  },
  {
    id: 44,
    question: "What synchronization does 3.3.7 require?",
    options: [
      "Internal system clocks with an authoritative time source",
      "Backup schedules across systems",
      "User passwords across systems",
      "Software versions across systems"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "3.3.7 requires time synchronization for accurate audit log correlation and forensics.",
    goodExplanation: "Backup synchronization is important but 3.3.7 specifically addresses time sources."
  },
  {
    id: 45,
    question: "What does 3.13.16 require for CUI at rest?",
    options: [
      "Protect the confidentiality of CUI at rest using cryptographic mechanisms",
      "Store CUI only in locked filing cabinets",
      "Never store CUI - process only in memory",
      "Compress CUI for storage"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.13.16 requires cryptographic protection for CUI at rest (full disk encryption, database encryption, etc.).",
    goodExplanation: "Memory-only processing isn't practical. Encryption protects stored CUI."
  },

  // ============ FLOW-DOWN AND SUPPLY CHAIN ============
  {
    id: 46,
    question: "What must prime contractors do regarding CMMC requirements for subcontractors?",
    options: [
      "Flow down applicable security requirements based on CUI/FCI handled by subcontractors",
      "Assume all subcontractors are compliant",
      "Only notify subcontractors after winning the contract",
      "Require all subcontractors to achieve Level 3"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "Flow-down requires primes to ensure subs meet appropriate CMMC levels for the CUI they handle.",
    goodExplanation: "Level requirements depend on what data subs handle - not all need the same level."
  },
  {
    id: 47,
    question: "What does 3.1.20 require for external system connections?",
    options: [
      "Verify and control/limit connections to external systems",
      "Block all external connections",
      "Allow any connection with a VPN",
      "Only connect to government systems"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "3.1.20 requires verification and control of external system connections - not prohibition.",
    goodExplanation: "VPN provides secure transit but the requirement is about verifying and controlling connections."
  },

  // ============ ASSESSMENT AND EVIDENCE ============
  {
    id: 48,
    question: "What constitutes acceptable evidence for 'Examine' assessment objectives?",
    options: [
      "Policies, procedures, plans, system security documentation, and configuration settings",
      "Only verbal explanations from staff",
      "Marketing materials about security",
      "Vendor certifications alone"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "Examine objectives require documented evidence: policies, procedures, configurations, etc.",
    goodExplanation: "Vendor certs support but don't replace your own documented implementation evidence."
  },
  {
    id: 49,
    question: "What determines a 'MET' vs 'NOT MET' finding in assessment?",
    options: [
      "Whether all assessment objectives for a requirement are satisfied",
      "Assessor's professional judgment alone",
      "Whether you have a policy document",
      "The percentage of controls implemented"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "MET requires satisfying ALL assessment objectives per 800-171A for that requirement.",
    goodExplanation: "Policies are part of it but all objectives (examine, interview, test) must be satisfied."
  },
  {
    id: 50,
    question: "How many assessment objectives does 800-171A define for the 110 requirements?",
    options: [
      "320 objectives across all requirements",
      "Exactly 110 (one per requirement)",
      "220 (two per requirement)",
      "500+ objectives"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "800-171A defines 320 assessment objectives across the 110 requirements (varying per requirement).",
    goodExplanation: "Some requirements have multiple objectives; it's not a 1:1 mapping."
  },
];

export const DEFAULT_PARTY = [
  "CISO McSecurityface",
  "Compliance Carl",
  "Policy Patricia",
  "Audit Andy",
  "The Intern (unnamed)"
];
