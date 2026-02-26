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
  "has died of unpatched vulnerability exposure",
  "was lost to a ransomware attack while updating the asset inventory",
  "perished from acute configuration drift anxiety",
  "succumbed to a fatal case of scope creep in the software inventory",
  "was carried away by rogue threat actors",
  "drowned in a sea of unreviewed audit logs",
  "expired from exhaustion after the 47th vulnerability scan review",
  "was fatally wounded by a malware detection finding",
  "died of dysentery... and also didn't implement MFA",
  "was lost crossing the River of Legacy Applications",
  "perished when their backup restoration test failed",
  "succumbed to security awareness training poisoning",
  "was struck down by an unexpected penetration test",
  "died after realizing they had no asset inventory",
  "was consumed by the void of missing security configurations",
  "perished explaining IG1 vs IG2 to leadership... again",
  "died of shock when they saw the vulnerability scan results",
  "was lost in the CIS Controls cross-references",
  "expired waiting for the software allowlist approval",
  "succumbed to a critical misconfiguration in their argument",
  "was terminated after clicking the phishing link in the 'Free Security Training' email",
  "spontaneously combusted while explaining Implementation Groups to the board",
  "was absorbed into the cloud... without proper access controls",
  "died after the asset inventory reached 10,000 unmanaged devices",
  "was last seen chasing a rogue USB drive into the server room",
  "perished from caffeine toxicity during the 72-hour incident response",
  "was vaporized by an angry Security Admin",
  "got stuck in an infinite loop of vulnerability remediation tickets",
  "was claimed by the Shadow IT dimension",
  "died of exposure... to unencrypted sensitive data",
  "was lost when their VPN configuration was never baselined",
  "succumbed to death by 1000 unapproved software installations",
  "expired while waiting for Change Advisory Board approval",
  "was eaten by a grue in the unmonitored network segment",
  "accidentally rm -rf'd themselves out of the asset inventory",
  "was deprecated along with the unsupported software they loved",
  "died debugging a firewall rule that was never documented",
  "was crushed under the weight of CIS benchmark documentation",
];

export const RANDOM_EVENTS: GameEvent[] = [
  // Death events
  { text: "Your SIEM license expired. Alert fatigue claims a victim.", type: "death" },
  { text: "The intern accidentally installed unapproved software with malware.", type: "death" },
  { text: "Supply chain attack! Your monitoring tool was compromised.", type: "death" },
  { text: "The CFO approved the security budget, but only in a dream. Someone dies of disappointment.", type: "death" },
  { text: "A team member opened a suspicious .exe called 'TotallyLegitSoftware.exe'", type: "death" },
  { text: "Your MFA token was eaten by the office dog.", type: "death" },
  { text: "Someone tried to lift the server rack alone. It did not end well.", type: "death" },

  // Good events
  { text: "You found an abandoned CIS Controls Implementation Guide on the trail! Team morale increases.", type: "good" },
  { text: "Good news! Your vulnerability scan results improved significantly!", type: "good" },
  { text: "A consultant wagon passes by and drops some free security tools!", type: "good" },
  { text: "You successfully convinced leadership to fund the security program! Morale soars!", type: "good" },
  { text: "Your remediation milestones are all GREEN! Is this real life?", type: "good" },
  { text: "You found a complete asset inventory. It's a miracle!", type: "good" },
  { text: "Your backup restoration test actually worked. Unbelievable!", type: "good" },
  { text: "The firewall rules actually match the documented baseline!", type: "good" },
  { text: "A vendor actually delivered on their security promises! Team morale soars.", type: "good" },
  { text: "You found a working vulnerability scanner. The security team is pleased.", type: "good" },
  { text: "The CEO remembered your security awareness training! Team morale skyrockets.", type: "good" },
  { text: "Your penetration test came back with no critical findings. Suspicious, but good!", type: "good" },
  { text: "A security consultant's invoice was UNDER budget. Is this real?", type: "good" },
  { text: "Someone actually read the Acceptable Use Policy!", type: "good" },
  { text: "IT and Security agreed on a software allowlist. Mark your calendars.", type: "good" },

  // Bad events
  { text: "Your vulnerability scanner found 10,000 new findings overnight. Morale drops.", type: "bad" },
  { text: "Heavy rain has flooded your on-prem data center. Morale drops.", type: "bad" },
  { text: "You discovered shadow IT. Everywhere. So much unauthorized software.", type: "bad" },
  { text: "CIS released new benchmark updates. Everything you knew is outdated now.", type: "bad" },
  { text: "A team member accidentally deleted the audit log archive.", type: "bad" },
  { text: "Marketing launched a new cloud app without telling IT. Again.", type: "bad" },
  { text: "The backup tapes were stored next to a giant magnet.", type: "bad" },
  { text: "Your SIEM generated 50,000 alerts. All false positives.", type: "bad" },
  { text: "A contractor plugged in a crypto mining rig.", type: "bad" },
  { text: "The CEO's nephew needs admin access 'for a school project.'", type: "bad" },
  { text: "Someone printed sensitive data and left it on the break room table.", type: "bad" },
  { text: "The 'quick 5-minute patch' is now in hour 6.", type: "bad" },
  { text: "Your asset inventory was written by someone who has since left. No one knows what it means.", type: "bad" },

  // Neutral events
  { text: "A wild auditor appears! They just want to chat about controls. False alarm.", type: "neutral" },
  { text: "Your security assessment got rescheduled... for the 4th time.", type: "neutral" },
  { text: "A friendly MSP offers to manage your EDR. Seems legit.", type: "neutral" },
  { text: "Ransomware gang sends a LinkedIn connection request to your Security Admin.", type: "neutral" },
  { text: "An auditor asks if your firewall is 'CIS compliant'. You nod slowly.", type: "neutral" },
  { text: "You spot a wild ISO 27001 auditor. They seem lost.", type: "neutral" },
  { text: "A vendor offers 'military-grade encryption.' You have questions.", type: "neutral" },
  { text: "The intern asks what 'IG1' means. Everyone feels old.", type: "neutral" },
  { text: "Your EDR caught a threat! It was the IT admin testing things.", type: "neutral" },
  { text: "Someone found a Post-it note with 'admin/admin' written on it. Classic.", type: "neutral" },
  { text: "The compliance meeting ran long. Nobody is surprised.", type: "neutral" },
];

export const CIS_QUESTIONS: Question[] = [
  // ============ CONTROL 1: INVENTORY AND CONTROL OF ENTERPRISE ASSETS ============
  {
    id: 1,
    question: "What does CIS Control 1.1 require organizations to establish and maintain?",
    options: [
      "A detailed enterprise asset inventory including all hardware with the potential to store or process data",
      "A list of only servers and network devices",
      "An inventory of software applications only",
      "A financial asset register for depreciation purposes"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 1.1 requires a detailed inventory of ALL enterprise assets (end-user devices, network devices, IoT, servers) that can store or process data.",
    goodExplanation: "Servers and network devices are important but the inventory must include ALL assets capable of storing or processing data."
  },
  {
    id: 2,
    question: "How frequently must the enterprise asset inventory be updated per CIS Control 1.1?",
    options: [
      "As new assets are acquired, throughout the asset lifecycle, and reviewed at least weekly",
      "Annually during audit preparation",
      "Only when new hardware is purchased",
      "Monthly at minimum"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 1.1 specifies updating as assets are acquired and at least weekly review to catch unauthorized assets.",
    goodExplanation: "Monthly is better than annual but the CIS benchmark specifies at least weekly review."
  },
  {
    id: 3,
    question: "What does CIS Control 1.2 (IG1) require for addressing unauthorized assets?",
    options: [
      "A process to address unauthorized assets either by removing, denying remote access, or quarantining within one week",
      "Immediate physical destruction of unauthorized devices",
      "Reporting to law enforcement within 24 hours",
      "Documenting the asset but taking no action"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 1.2 requires a process to address unauthorized assets within one week through removal, network denial, or quarantine.",
    goodExplanation: "Law enforcement isn't typically needed for unauthorized assets - the focus is on containment and removal."
  },
  {
    id: 4,
    question: "What additional capability does CIS Control 1.3 (IG2) require beyond basic inventory?",
    options: [
      "Use of an active discovery tool to identify assets connected to the enterprise network",
      "Manual quarterly audits of all network closets",
      "Employee self-reporting of personal devices",
      "Annual third-party inventory assessments"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 1.3 (IG2) requires automated active discovery tools to continuously identify connected assets.",
    goodExplanation: "Self-reporting helps but automated discovery tools are required for IG2 compliance."
  },

  // ============ CONTROL 2: INVENTORY AND CONTROL OF SOFTWARE ASSETS ============
  {
    id: 5,
    question: "What does CIS Control 2.1 require organizations to maintain?",
    options: [
      "A detailed inventory of all licensed software installed on enterprise assets",
      "Only security software inventory",
      "A list of software vendors",
      "Hardware driver inventory only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 2.1 requires inventory of ALL licensed software - operating systems, applications, and tools.",
    goodExplanation: "Security software is critical but the inventory must include ALL licensed software."
  },
  {
    id: 6,
    question: "What does CIS Control 2.2 require for software that is not currently supported?",
    options: [
      "Ensure that only currently supported software is designated as authorized in the inventory",
      "Keep unsupported software but document the risk",
      "Upgrade unsupported software within one year",
      "Apply compensating controls indefinitely"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 2.2 states only currently supported software should be authorized. Unsupported software poses unacceptable risk.",
    goodExplanation: "One year is too long - unsupported software should not be authorized in the inventory."
  },
  {
    id: 7,
    question: "What mechanism does CIS Control 2.5 (IG2) require for software execution?",
    options: [
      "Software allowlisting to ensure only authorized software can execute",
      "Antivirus scanning before execution",
      "User acknowledgment before running new software",
      "Blocking all internet downloads"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 2.5 requires software allowlisting - only pre-approved software can execute on enterprise assets.",
    goodExplanation: "Antivirus is important (covered in Control 10) but allowlisting proactively prevents unauthorized execution."
  },
  {
    id: 8,
    question: "What does CIS Control 2.3 (IG1) require for addressing unauthorized software?",
    options: [
      "A process to address unauthorized software either by uninstalling or updating the inventory monthly",
      "Immediate termination of the employee who installed it",
      "Formatting the entire system",
      "Documenting exceptions and continuing use"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 2.3 requires addressing unauthorized software through removal or inventory update at least monthly.",
    goodExplanation: "Documentation alone is insufficient - unauthorized software must be addressed appropriately."
  },

  // ============ CONTROL 3: DATA PROTECTION ============
  {
    id: 9,
    question: "What does CIS Control 3.1 require organizations to establish?",
    options: [
      "A data management process including data sensitivity levels, handling requirements, and retention",
      "A data backup schedule only",
      "A list of databases in the organization",
      "A data center inventory"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 3.1 requires a comprehensive data management process covering sensitivity classification, handling, retention, and disposal.",
    goodExplanation: "Backups are covered in Control 11. Control 3.1 focuses on the broader data management lifecycle."
  },
  {
    id: 10,
    question: "What does CIS Control 3.4 (IG1) require for data retention?",
    options: [
      "Retain data according to the data management process, ensuring minimum retention periods based on regulations",
      "Keep all data indefinitely for potential litigation",
      "Delete all data after 90 days",
      "Retain only financial data"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 3.4 requires following the data management process with retention aligned to legal and regulatory requirements.",
    goodExplanation: "Indefinite retention creates risk. Retention should be based on documented requirements."
  },
  {
    id: 11,
    question: "What encryption requirement does CIS Control 3.6 (IG1) specify for end-user devices?",
    options: [
      "Encrypt data on end-user devices containing sensitive data using full-disk encryption",
      "Encrypt only email attachments",
      "Use password protection on files",
      "No encryption required for local devices"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 3.6 requires full-disk encryption or equivalent for end-user devices with sensitive data.",
    goodExplanation: "Email encryption is important but 3.6 specifically addresses device-level encryption."
  },
  {
    id: 12,
    question: "What does CIS Control 3.10 (IG2) require for sensitive data in transit?",
    options: [
      "Encrypt sensitive data in transit using cryptographic protocols such as TLS",
      "Use only private networks for sensitive data",
      "Compress data before transmission",
      "Send sensitive data only via fax"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 3.10 requires encryption during transit using TLS or equivalent cryptographic protocols.",
    goodExplanation: "Private networks provide some protection but encryption is explicitly required."
  },

  // ============ CONTROL 4: SECURE CONFIGURATION ============
  {
    id: 13,
    question: "What does CIS Control 4.1 require organizations to establish?",
    options: [
      "Secure configuration processes for enterprise assets including servers, workstations, and network devices",
      "A hardware refresh schedule",
      "Vendor contact information",
      "A list of default passwords"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 4.1 requires documented secure configuration processes covering all enterprise asset types.",
    goodExplanation: "Knowing default passwords is useful for removal, but the requirement is comprehensive secure configuration processes."
  },
  {
    id: 14,
    question: "What does CIS Control 4.2 (IG1) require for network infrastructure?",
    options: [
      "Establish and maintain secure configuration for network infrastructure including firewalls, routers, and switches",
      "Configure only firewalls securely",
      "Document network topology only",
      "Replace all network equipment annually"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 4.2 requires secure configuration for ALL network infrastructure - firewalls, routers, switches, and more.",
    goodExplanation: "Firewalls are critical but routers, switches, and other network devices also require secure configuration."
  },
  {
    id: 15,
    question: "What must be done with default credentials per CIS Control 4.3 (IG1)?",
    options: [
      "Configure automatic session locking and change all default credentials before deploying assets",
      "Document default credentials for emergency access",
      "Keep default credentials for vendor support",
      "Change default credentials within 30 days of deployment"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 4.3 requires changing default credentials BEFORE deployment, not after.",
    goodExplanation: "30 days creates a window of vulnerability. Defaults must be changed before deployment."
  },
  {
    id: 16,
    question: "What does CIS Control 4.7 (IG1) require for unnecessary services?",
    options: [
      "Manage default accounts and disable or remove unnecessary services on enterprise assets and software",
      "Document all services but leave them running",
      "Only disable services on servers",
      "Disable services only if they cause performance issues"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 4.7 requires managing default accounts and disabling unnecessary services on ALL assets, not just servers.",
    goodExplanation: "All assets need hardening, but focusing on servers is a good start."
  },

  // ============ CONTROL 5: ACCOUNT MANAGEMENT ============
  {
    id: 17,
    question: "What does CIS Control 5.1 require for enterprise accounts?",
    options: [
      "Establish and maintain an inventory of all accounts including user, administrator, service, and application accounts",
      "Track only administrator accounts",
      "Maintain a list of terminated employees",
      "Document shared accounts only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 5.1 requires inventory of ALL account types - user, admin, service, and application accounts.",
    goodExplanation: "Admin accounts are high-risk but all account types must be inventoried."
  },
  {
    id: 18,
    question: "What does CIS Control 5.3 (IG1) require for dormant accounts?",
    options: [
      "Disable dormant accounts after a period of inactivity (typically 45 days)",
      "Delete dormant accounts immediately",
      "Send reminders to dormant account owners",
      "Allow dormant accounts indefinitely if documented"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 5.3 requires disabling accounts after inactivity, typically 45 days as a reasonable threshold.",
    goodExplanation: "Reminders are helpful but accounts must be disabled after the inactivity period."
  },
  {
    id: 19,
    question: "What privilege restriction does CIS Control 5.4 (IG1) mandate?",
    options: [
      "Restrict administrator privileges to dedicated administrator accounts only",
      "Allow all IT staff full admin rights",
      "Require management approval for any admin action",
      "Rotate admin privileges weekly"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 5.4 requires admin privileges be limited to dedicated admin accounts - not used for daily tasks.",
    goodExplanation: "Approval processes help but the key is separating admin from daily-use accounts."
  },

  // ============ CONTROL 6: ACCESS CONTROL MANAGEMENT ============
  {
    id: 20,
    question: "What does CIS Control 6.1 require organizations to establish?",
    options: [
      "An access granting process that includes request, approval, and documentation for all access types",
      "An open-door policy for system access",
      "Self-service access provisioning",
      "Annual access reviews only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 6.1 requires a formal access granting process with request, approval, and documentation components.",
    goodExplanation: "Annual reviews are important (6.2) but the granting process must be established first."
  },
  {
    id: 21,
    question: "What does CIS Control 6.3 (IG2) require for remote access?",
    options: [
      "Require MFA for all remote network access",
      "Use VPN only without additional authentication",
      "Allow remote access only from company devices",
      "Disable remote access entirely"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 6.3 requires MFA for remote access. Company devices alone don't satisfy the MFA requirement.",
    goodExplanation: "Company devices help but MFA is explicitly required for remote access in IG2."
  },
  {
    id: 22,
    question: "What does CIS Control 6.4 (IG2) require for administrative access?",
    options: [
      "Require MFA for all administrative access to enterprise assets",
      "Use complex passwords only for admin accounts",
      "Require physical presence for admin tasks",
      "Implement time-based admin access restrictions only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 6.4 requires MFA for ALL administrative access, both remote and local.",
    goodExplanation: "Complex passwords are necessary but MFA provides essential additional protection for admin access."
  },
  {
    id: 23,
    question: "What does CIS Control 6.5 (IG2) require for external service provider access?",
    options: [
      "Require MFA for all access to externally-exposed enterprise or third-party applications",
      "Trust all SSO-federated access",
      "Allow access only during business hours",
      "Require annual security attestations only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 6.5 requires MFA for externally-exposed applications, regardless of federation status.",
    goodExplanation: "Attestations help with compliance but MFA provides real-time access protection."
  },

  // ============ CONTROL 7: CONTINUOUS VULNERABILITY MANAGEMENT ============
  {
    id: 24,
    question: "What does CIS Control 7.1 require for vulnerability management?",
    options: [
      "Establish and maintain a documented vulnerability management process for enterprise assets",
      "Perform annual penetration testing only",
      "Subscribe to vendor security bulletins",
      "Hire a full-time vulnerability analyst"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 7.1 requires a documented, ongoing vulnerability management process - not just periodic testing.",
    goodExplanation: "Security bulletins are useful inputs but a complete process is required."
  },
  {
    id: 25,
    question: "How frequently must vulnerability scanning occur per CIS Control 7.5 (IG2)?",
    options: [
      "Perform automated vulnerability scans of internal enterprise assets at least quarterly, or more frequently",
      "Annually before audits",
      "Only after security incidents",
      "Monthly manual assessments"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 7.5 requires automated vulnerability scans at least quarterly for internal assets.",
    goodExplanation: "Monthly is more frequent than required but should be automated, not manual."
  },
  {
    id: 26,
    question: "What does CIS Control 7.4 (IG2) require for remediation?",
    options: [
      "Remediate detected vulnerabilities in software according to the vulnerability management process",
      "Only remediate critical vulnerabilities",
      "Accept all vulnerabilities with compensating controls",
      "Remediate within 365 days"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 7.4 requires remediation according to the documented process, covering all severity levels appropriately.",
    goodExplanation: "Critical vulnerabilities are highest priority but all vulnerabilities need appropriate remediation."
  },

  // ============ CONTROL 8: AUDIT LOG MANAGEMENT ============
  {
    id: 27,
    question: "What does CIS Control 8.1 require organizations to establish?",
    options: [
      "An audit log management process covering collection, review, and retention of audit logs",
      "A log storage server",
      "Antivirus logging only",
      "Manual review of login attempts"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 8.1 requires a comprehensive audit log management process, not just storage infrastructure.",
    goodExplanation: "A log server is part of the solution but the process must cover collection, review, and retention."
  },
  {
    id: 28,
    question: "What must audit logs include per CIS Control 8.2 (IG1)?",
    options: [
      "Collect audit logs containing information about threat detection, incident recovery, and forensics",
      "Only authentication events",
      "Hardware performance metrics only",
      "User productivity data"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 8.2 requires logs that support threat detection, incident recovery, and forensic investigations.",
    goodExplanation: "Authentication events are important but logs must support broader security operations."
  },
  {
    id: 29,
    question: "What retention period does CIS Control 8.3 (IG1) specify for audit logs?",
    options: [
      "Retain audit logs for at least 90 days, or as required by compliance obligations",
      "Keep logs for 30 days only",
      "Retain logs indefinitely",
      "7 days of online storage"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 8.3 requires minimum 90-day retention, with longer periods if compliance requires.",
    goodExplanation: "Indefinite retention may be required by some regulations but 90 days is the CIS minimum."
  },
  {
    id: 30,
    question: "What does CIS Control 8.5 (IG2) require for log data storage?",
    options: [
      "Collect detailed audit logs in a centralized log management infrastructure",
      "Store logs locally on each device",
      "Email logs to the security team daily",
      "Print logs weekly for secure storage"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 8.5 requires centralized log management infrastructure for aggregation and analysis.",
    goodExplanation: "Local storage provides some protection but centralized infrastructure enables correlation."
  },

  // ============ CONTROL 9: EMAIL AND WEB BROWSER PROTECTIONS ============
  {
    id: 31,
    question: "What does CIS Control 9.1 (IG1) require for web browsers and email clients?",
    options: [
      "Ensure only fully supported browsers and email clients are used, updated with latest security patches",
      "Use any browser that works",
      "Standardize on a single browser version",
      "Block all email attachments"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 9.1 requires using only supported, current browsers and email clients with latest patches.",
    goodExplanation: "Standardization helps management but the focus is on supported, patched software."
  },
  {
    id: 32,
    question: "What does CIS Control 9.2 (IG1) require for DNS?",
    options: [
      "Use DNS filtering services or block access to known malicious domains",
      "Use only the ISP's default DNS servers",
      "Disable DNS caching",
      "Allow unrestricted DNS resolution"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 9.2 requires DNS filtering to block known malicious domains at the network level.",
    goodExplanation: "ISP DNS may not provide filtering - dedicated DNS filtering services are recommended."
  },
  {
    id: 33,
    question: "What protection does CIS Control 9.6 (IG2) require for email?",
    options: [
      "Block unnecessary file types from email attachments",
      "Scan only executable attachments",
      "Allow all attachments from known senders",
      "Disable email entirely"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 9.6 requires blocking unnecessary/dangerous file types, not just executables.",
    goodExplanation: "Scanning executables is important but blocking unnecessary types reduces attack surface."
  },

  // ============ CONTROL 10: MALWARE DEFENSES ============
  {
    id: 34,
    question: "What does CIS Control 10.1 (IG1) require for anti-malware?",
    options: [
      "Deploy and maintain anti-malware software on all enterprise assets",
      "Use antivirus only on servers",
      "Rely on built-in OS security features only",
      "Install anti-malware on user request"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 10.1 requires anti-malware on ALL enterprise assets, not just servers.",
    goodExplanation: "Built-in features help but dedicated anti-malware provides essential protection."
  },
  {
    id: 35,
    question: "What automatic update requirement does CIS Control 10.2 (IG1) specify?",
    options: [
      "Configure automatic updates for anti-malware signature files on all enterprise assets",
      "Update signatures weekly manually",
      "Update only when threats are detected",
      "Use signature updates from last year's subscription"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 10.2 requires automatic signature updates - manual weekly updates are insufficient.",
    goodExplanation: "Weekly manual updates lag behind the threat landscape. Automatic updates are required."
  },
  {
    id: 36,
    question: "What scanning configuration does CIS Control 10.3 (IG2) require?",
    options: [
      "Configure automatic scanning of removable media when inserted",
      "Scan removable media only on user request",
      "Block all removable media",
      "Scan removable media weekly"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 10.3 requires automatic scanning when media is inserted. Blocking is more restrictive than required.",
    goodExplanation: "Blocking removable media is stricter than required but automatic scanning is the control."
  },

  // ============ CONTROL 11: DATA RECOVERY ============
  {
    id: 37,
    question: "What does CIS Control 11.1 (IG1) require for data backup?",
    options: [
      "Establish and maintain a data recovery process covering scope, prioritization, and security of backup data",
      "Back up data to local drives",
      "Keep one backup copy only",
      "Perform backups only before major changes"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 11.1 requires a comprehensive data recovery process, not just backup procedures.",
    goodExplanation: "Pre-change backups are good practice but a complete recovery process is required."
  },
  {
    id: 38,
    question: "What does CIS Control 11.2 (IG1) require for automated backups?",
    options: [
      "Perform automated backups of in-scope enterprise assets on at least a weekly basis",
      "Perform manual backups monthly",
      "Back up only critical servers",
      "Maintain real-time replication only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 11.2 requires automated weekly backups of in-scope assets at minimum.",
    goodExplanation: "Replication provides availability but doesn't protect against corruption or ransomware like backups."
  },
  {
    id: 39,
    question: "What protection does CIS Control 11.3 (IG1) require for backup data?",
    options: [
      "Protect recovery data with equivalent controls to the original data, including encryption",
      "Store backups in the same server room",
      "Use password protection only",
      "Allow backup administrators unrestricted access"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 11.3 requires backup data be protected with controls equivalent to the source data.",
    goodExplanation: "Password protection is minimal. Encryption and access controls matching original data are required."
  },
  {
    id: 40,
    question: "What testing does CIS Control 11.5 (IG2) require for backups?",
    options: [
      "Test backup recovery at least quarterly or more frequently for critical assets",
      "Test backups annually",
      "Test only after backup failures",
      "Verify backup file sizes only"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 11.5 requires quarterly recovery testing at minimum to ensure backups actually work.",
    goodExplanation: "Annual testing is better than none but quarterly or more frequent testing is required."
  },

  // ============ CONTROL 12: NETWORK INFRASTRUCTURE MANAGEMENT ============
  {
    id: 41,
    question: "What does CIS Control 12.1 (IG1) require for network infrastructure?",
    options: [
      "Ensure network infrastructure is kept up-to-date with secure configurations and timely patching",
      "Replace network equipment every 2 years",
      "Use default configurations for stability",
      "Manage network infrastructure only when issues arise"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 12.1 requires maintaining current, secure configurations and timely patches for network infrastructure.",
    goodExplanation: "Regular replacement helps but the focus is secure configuration and patching."
  },
  {
    id: 42,
    question: "What does CIS Control 12.2 (IG2) require for network segmentation?",
    options: [
      "Establish and maintain a secure network architecture using network segmentation based on trust levels",
      "Use VLANs for department separation only",
      "Implement a single flat network for simplicity",
      "Segment only the guest network"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 12.2 requires network segmentation based on data sensitivity and trust levels, not just organizational structure.",
    goodExplanation: "VLANs help but segmentation should be based on trust levels and data sensitivity."
  },

  // ============ CONTROL 13: NETWORK MONITORING AND DEFENSE (IG2+) ============
  {
    id: 43,
    question: "What does CIS Control 13.1 (IG2) require for network traffic monitoring?",
    options: [
      "Centralize security event alerting from network and host-based detection sources",
      "Monitor only external network traffic",
      "Review network logs manually weekly",
      "Alert only on confirmed attacks"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 13.1 requires centralized alerting from both network and host sources - not external only.",
    goodExplanation: "External monitoring is important but internal threats require host-based visibility too."
  },
  {
    id: 44,
    question: "What does CIS Control 13.6 (IG2) require for network-based intrusion detection?",
    options: [
      "Deploy a network intrusion detection system (NIDS) on network segments",
      "Use only host-based intrusion detection",
      "Monitor network traffic manually",
      "Deploy IDS only at the internet boundary"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 3,
    explanation: "CIS 13.6 requires NIDS on enterprise network segments, not just the perimeter.",
    goodExplanation: "Perimeter IDS is important but internal network segments also need monitoring."
  },

  // ============ CONTROL 14: SECURITY AWARENESS AND SKILLS TRAINING ============
  {
    id: 45,
    question: "What does CIS Control 14.1 (IG1) require for security awareness?",
    options: [
      "Establish and maintain a security awareness program covering secure authentication, data handling, and reporting",
      "Send annual security reminder emails",
      "Post security posters in common areas",
      "Train only IT staff on security"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 14.1 requires a comprehensive awareness program covering key security topics for all staff.",
    goodExplanation: "Annual reminders are part of awareness but a full program is required."
  },
  {
    id: 46,
    question: "What training frequency does CIS Control 14.2 (IG1) require?",
    options: [
      "Train workforce members upon hiring and at least annually thereafter",
      "Train only when security incidents occur",
      "Provide one-time training during onboarding",
      "Train every three years"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 14.2 requires training at hire and at least annually - not just one-time onboarding.",
    goodExplanation: "Onboarding training is essential but annual refresher training is also required."
  },

  // ============ CONTROL 15: SERVICE PROVIDER MANAGEMENT ============
  {
    id: 47,
    question: "What does CIS Control 15.1 (IG1) require for service providers?",
    options: [
      "Establish a process to evaluate service providers who hold sensitive data or are responsible for critical functions",
      "Trust all vendors with ISO 27001 certification",
      "Avoid using external service providers entirely",
      "Review service provider security only during contract renewal"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 15.1 requires an evaluation process for service providers handling sensitive data or critical functions.",
    goodExplanation: "Certifications are helpful inputs but your own evaluation process is required."
  },
  {
    id: 48,
    question: "What does CIS Control 15.2 (IG2) require for service provider contracts?",
    options: [
      "Include security requirements, breach notification, and data handling in service provider contracts",
      "Use standard vendor contracts without modification",
      "Require only confidentiality agreements",
      "Include security terms only for IT vendors"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 15.2 requires contractual security terms including breach notification and data handling requirements.",
    goodExplanation: "Confidentiality agreements are baseline but comprehensive security terms are required."
  },

  // ============ CONTROL 16: APPLICATION SOFTWARE SECURITY (IG2+) ============
  {
    id: 49,
    question: "What does CIS Control 16.1 (IG2) require for application development?",
    options: [
      "Establish and maintain a secure application development process addressing security throughout the SDLC",
      "Test applications only before production release",
      "Rely on vendor security for commercial software",
      "Perform security testing only for internet-facing applications"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 1,
    explanation: "CIS 16.1 requires security integration throughout the SDLC, not just pre-release testing.",
    goodExplanation: "Pre-release testing is important but security must be addressed throughout development."
  },

  // ============ CONTROL 17: INCIDENT RESPONSE MANAGEMENT ============
  {
    id: 50,
    question: "What does CIS Control 17.1 (IG1) require for incident response?",
    options: [
      "Designate personnel to manage incident handling and establish an incident response plan",
      "Respond to incidents as they occur without a formal plan",
      "Outsource all incident response to a third party",
      "Document incidents only after resolution"
    ],
    bestAnswerIndex: 0,
    goodAnswerIndex: 2,
    explanation: "CIS 17.1 requires designated personnel AND an incident response plan - preparation before incidents occur.",
    goodExplanation: "Outsourcing can support IR but you still need designated personnel and a plan."
  },
];

export const DEFAULT_PARTY = [
  "The IT Manager",
  "Security Admin",
  "Compliance Officer",
  "Help Desk Hero",
  "The Intern (Wears a red shirt)"
];
