// ── Types ──────────────────────────────────────────────────
export interface ExamPhotoSpecs {
  width: string;
  height: string;
  minSize: string;
  maxSize: string;
  format: string;
  background: string;
}

export interface ExamSignatureSpecs {
  width: string;
  height: string;
  minSize: string;
  maxSize: string;
  format: string;
}

export interface ExamData {
  slug: string;
  name: string;
  fullName: string;
  organization: string;
  category: string;
  photoSpecs: ExamPhotoSpecs;
  signatureSpecs: ExamSignatureSpecs;
  relatedSlugs: string[];
}

// ── Default Spec Presets ───────────────────────────────────
const gP: ExamPhotoSpecs = { width: "3.5 cm", height: "4.5 cm", minSize: "20 KB", maxSize: "50 KB", format: "JPEG / JPG", background: "White" };
const gS: ExamSignatureSpecs = { width: "3.5 cm", height: "1.5 cm", minSize: "10 KB", maxSize: "20 KB", format: "JPEG / JPG" };

const bP: ExamPhotoSpecs = { width: "200 px", height: "230 px", minSize: "20 KB", maxSize: "50 KB", format: "JPEG / JPG", background: "White" };
const bS: ExamSignatureSpecs = { width: "140 px", height: "60 px", minSize: "10 KB", maxSize: "20 KB", format: "JPEG / JPG" };

const eP: ExamPhotoSpecs = { width: "3.5 cm", height: "4.5 cm", minSize: "10 KB", maxSize: "200 KB", format: "JPEG / JPG", background: "White" };
const eS: ExamSignatureSpecs = { width: "3.5 cm", height: "1.5 cm", minSize: "4 KB", maxSize: "30 KB", format: "JPEG / JPG" };

const tP: ExamPhotoSpecs = { width: "3.5 cm", height: "4.5 cm", minSize: "10 KB", maxSize: "100 KB", format: "JPEG / JPG", background: "White" };
const tS: ExamSignatureSpecs = { width: "3.5 cm", height: "1.5 cm", minSize: "10 KB", maxSize: "50 KB", format: "JPEG / JPG" };

// Helper
function e(slug: string, name: string, fullName: string, org: string, cat: string, related: string[], p: ExamPhotoSpecs = gP, s: ExamSignatureSpecs = gS): ExamData {
  return { slug, name, fullName, organization: org, category: cat, photoSpecs: p, signatureSpecs: s, relatedSlugs: related };
}

// ── All Exams ──────────────────────────────────────────────
export const examPages: ExamData[] = [
  // ===== UPSC =====
  e("upsc-cse", "UPSC CSE", "Union Public Service Commission Civil Services Examination", "UPSC", "Central Level Exams", ["upsc-capf", "upsc-nda-na", "ssc-cgl"]),
  e("upsc-capf", "UPSC CAPF", "Union Public Service Commission Central Armed Police Forces", "UPSC", "Central Level Exams", ["upsc-cse", "upsc-cds", "upsc-cisf-ac"]),
  e("upsc-nda-na", "UPSC NDA/NA", "Union Public Service Commission National Defence Academy & Naval Academy Examination", "UPSC", "Central Level Exams", ["upsc-cse", "upsc-cds", "afcat"]),
  e("upsc-cds", "UPSC CDS", "Union Public Service Commission Combined Defence Services Examination", "UPSC", "Central Level Exams", ["upsc-nda-na", "upsc-capf", "afcat"]),
  e("upsc-cms", "UPSC CMS", "Union Public Service Commission Combined Medical Services Examination", "UPSC", "Central Level Exams", ["upsc-cse", "neet-pg", "upsc-ese"]),
  e("upsc-ies-iss", "UPSC IES/ISS", "Union Public Service Commission Indian Economic Service / Indian Statistical Service Examination", "UPSC", "Central Level Exams", ["upsc-cse", "upsc-ese", "ugc-net"]),
  e("upsc-ese", "UPSC ESE", "Union Public Service Commission Engineering Services Examination", "UPSC", "Central Level Exams", ["upsc-ies-iss", "gate", "ssc-je"]),
  e("upsc-cgge", "UPSC CGGE", "Union Public Service Commission Combined Geo-Scientist & Geologist Examination", "UPSC", "Central Level Exams", ["upsc-cse", "upsc-ese", "gate"]),
  e("upsc-cisf-ac", "UPSC CISF AC", "Union Public Service Commission CISF Assistant Commandant Examination", "UPSC", "Central Level Exams", ["upsc-capf", "upsc-cds", "cisf-constable"]),
  e("upsc-so-steno", "UPSC SO/Steno", "Union Public Service Commission Section Officer / Stenographer Examination", "UPSC", "Central Level Exams", ["upsc-cse", "ssc-stenographer", "ssc-cgl"]),

  // ===== SSC =====
  e("ssc-cgl", "SSC CGL", "Staff Selection Commission Combined Graduate Level Examination", "SSC", "Central Level Exams", ["ssc-chsl", "ssc-cpo", "upsc-cse"]),
  e("ssc-chsl", "SSC CHSL", "Staff Selection Commission Combined Higher Secondary Level Examination", "SSC", "Central Level Exams", ["ssc-cgl", "ssc-mts", "ssc-stenographer"]),
  e("ssc-mts", "SSC MTS", "Staff Selection Commission Multi Tasking Staff Examination", "SSC", "Central Level Exams", ["ssc-chsl", "ssc-gd-constable", "rrb-group-d"]),
  e("ssc-cpo", "SSC CPO", "Staff Selection Commission Central Police Organization Examination", "SSC", "Central Level Exams", ["ssc-cgl", "upsc-capf", "rpf-si"]),
  e("ssc-je", "SSC JE", "Staff Selection Commission Junior Engineer Examination", "SSC", "Central Level Exams", ["ssc-cgl", "rrb-je", "upsc-ese"]),
  e("ssc-jht", "SSC JHT", "Staff Selection Commission Junior Hindi Translator Examination", "SSC", "Central Level Exams", ["ssc-cgl", "ssc-stenographer", "ssc-chsl"]),
  e("ssc-stenographer", "SSC Stenographer", "Staff Selection Commission Stenographer Grade C & D Examination", "SSC", "Central Level Exams", ["ssc-cgl", "ssc-chsl", "upsc-so-steno"]),
  e("ssc-gd-constable", "SSC GD Constable", "Staff Selection Commission General Duty Constable Examination", "SSC", "Central Level Exams", ["ssc-mts", "rpf-constable", "cisf-constable"]),
  e("ssc-selection-post", "SSC Selection Post", "Staff Selection Commission Selection Post Examination", "SSC", "Central Level Exams", ["ssc-cgl", "ssc-chsl", "ssc-mts"]),

  // ===== BANKING =====
  e("ibps-po", "IBPS PO", "Institute of Banking Personnel Selection Probationary Officer Examination", "IBPS", "Banking & Insurance", ["ibps-clerk", "sbi-po", "ibps-so"], bP, bS),
  e("ibps-clerk", "IBPS Clerk", "Institute of Banking Personnel Selection Clerk Examination", "IBPS", "Banking & Insurance", ["ibps-po", "sbi-clerk", "ibps-rrb-clerk"], bP, bS),
  e("ibps-so", "IBPS SO", "Institute of Banking Personnel Selection Specialist Officer Examination", "IBPS", "Banking & Insurance", ["ibps-po", "sbi-so", "rbi-grade-b"], bP, bS),
  e("ibps-rrb-po", "IBPS RRB PO", "Institute of Banking Personnel Selection Regional Rural Banks Officer Scale I Examination", "IBPS", "Banking & Insurance", ["ibps-po", "ibps-rrb-clerk", "sbi-po"], bP, bS),
  e("ibps-rrb-clerk", "IBPS RRB Clerk", "Institute of Banking Personnel Selection Regional Rural Banks Office Assistant Examination", "IBPS", "Banking & Insurance", ["ibps-clerk", "ibps-rrb-po", "sbi-clerk"], bP, bS),
  e("sbi-po", "SBI PO", "State Bank of India Probationary Officer Examination", "SBI", "Banking & Insurance", ["ibps-po", "sbi-clerk", "rbi-grade-b"], bP, bS),
  e("sbi-clerk", "SBI Clerk", "State Bank of India Clerk Examination", "SBI", "Banking & Insurance", ["sbi-po", "ibps-clerk", "rbi-assistant"], bP, bS),
  e("sbi-so", "SBI SO", "State Bank of India Specialist Officer Examination", "SBI", "Banking & Insurance", ["sbi-po", "ibps-so", "rbi-grade-b"], bP, bS),
  e("rbi-grade-b", "RBI Grade B", "Reserve Bank of India Grade B Officer Examination", "RBI", "Banking & Insurance", ["sbi-po", "sebi-grade-a", "nabard-grade-a"], bP, bS),
  e("rbi-assistant", "RBI Assistant", "Reserve Bank of India Assistant Examination", "RBI", "Banking & Insurance", ["rbi-grade-b", "sbi-clerk", "ibps-clerk"], bP, bS),
  e("rbi-office-attendant", "RBI Office Attendant", "Reserve Bank of India Office Attendant Examination", "RBI", "Banking & Insurance", ["rbi-assistant", "sbi-clerk", "ibps-clerk"], bP, bS),
  e("nabard-grade-a", "NABARD Grade A", "National Bank for Agriculture and Rural Development Grade A Officer Examination", "NABARD", "Banking & Insurance", ["nabard-grade-b", "rbi-grade-b", "sebi-grade-a"], bP, bS),
  e("nabard-grade-b", "NABARD Grade B", "National Bank for Agriculture and Rural Development Grade B Officer Examination", "NABARD", "Banking & Insurance", ["nabard-grade-a", "rbi-grade-b", "sidbi-grade-a"], bP, bS),
  e("nabard-development-assistant", "NABARD Development Assistant", "National Bank for Agriculture and Rural Development Development Assistant Examination", "NABARD", "Banking & Insurance", ["nabard-grade-a", "rbi-assistant", "ibps-clerk"], bP, bS),
  e("lic-aao", "LIC AAO", "Life Insurance Corporation of India Assistant Administrative Officer Examination", "LIC", "Banking & Insurance", ["lic-ado", "lic-assistant", "sbi-po"], bP, bS),
  e("lic-ado", "LIC ADO", "Life Insurance Corporation of India Apprentice Development Officer Examination", "LIC", "Banking & Insurance", ["lic-aao", "lic-assistant", "niacl-ao"], bP, bS),
  e("lic-assistant", "LIC Assistant", "Life Insurance Corporation of India Assistant Examination", "LIC", "Banking & Insurance", ["lic-aao", "lic-ado", "sbi-clerk"], bP, bS),
  e("niacl-ao", "NIACL AO", "New India Assurance Company Limited Administrative Officer Examination", "NIACL", "Banking & Insurance", ["niacl-assistant", "uiic-ao", "lic-aao"], bP, bS),
  e("niacl-assistant", "NIACL Assistant", "New India Assurance Company Limited Assistant Examination", "NIACL", "Banking & Insurance", ["niacl-ao", "uiic-assistant", "lic-assistant"], bP, bS),
  e("uiic-ao", "UIIC AO", "United India Insurance Company Limited Administrative Officer Examination", "UIIC", "Banking & Insurance", ["uiic-assistant", "niacl-ao", "oicl-ao"], bP, bS),
  e("uiic-assistant", "UIIC Assistant", "United India Insurance Company Limited Assistant Examination", "UIIC", "Banking & Insurance", ["uiic-ao", "niacl-assistant", "lic-assistant"], bP, bS),
  e("oicl-ao", "OICL AO", "Oriental Insurance Company Limited Administrative Officer Examination", "OICL", "Banking & Insurance", ["nicl-ao", "niacl-ao", "uiic-ao"], bP, bS),
  e("nicl-ao", "NICL AO", "National Insurance Company Limited Administrative Officer Examination", "NICL", "Banking & Insurance", ["oicl-ao", "niacl-ao", "uiic-ao"], bP, bS),
  e("sebi-grade-a", "SEBI Grade A", "Securities and Exchange Board of India Grade A Officer Examination", "SEBI", "Banking & Insurance", ["rbi-grade-b", "nabard-grade-a", "sidbi-grade-a"], bP, bS),
  e("sidbi-grade-a", "SIDBI Grade A", "Small Industries Development Bank of India Grade A Officer Examination", "SIDBI", "Banking & Insurance", ["sebi-grade-a", "rbi-grade-b", "nabard-grade-a"], bP, bS),
  e("exim-bank-mt", "EXIM Bank MT", "Export-Import Bank of India Management Trainee Examination", "EXIM Bank", "Banking & Insurance", ["sebi-grade-a", "rbi-grade-b", "sidbi-grade-a"], bP, bS),

  // ===== RAILWAYS =====
  e("rrb-ntpc", "RRB NTPC", "Railway Recruitment Board Non-Technical Popular Categories Examination", "RRB", "Railways", ["rrb-group-d", "rrb-alp", "ssc-cgl"]),
  e("rrb-group-d", "RRB Group D", "Railway Recruitment Board Group D Examination", "RRB", "Railways", ["rrb-ntpc", "ssc-mts", "ssc-gd-constable"]),
  e("rrb-alp", "RRB ALP", "Railway Recruitment Board Assistant Loco Pilot Examination", "RRB", "Railways", ["rrb-technician", "rrb-ntpc", "ssc-je"]),
  e("rrb-technician", "RRB Technician", "Railway Recruitment Board Technician Examination", "RRB", "Railways", ["rrb-alp", "rrb-je", "ssc-je"]),
  e("rrb-je", "RRB JE", "Railway Recruitment Board Junior Engineer Examination", "RRB", "Railways", ["rrb-alp", "ssc-je", "rrb-ntpc"]),
  e("rrb-paramedical", "RRB Paramedical", "Railway Recruitment Board Paramedical Categories Examination", "RRB", "Railways", ["rrb-ntpc", "rrb-group-d", "rrb-ministerial"]),
  e("rrb-ministerial", "RRB Ministerial", "Railway Recruitment Board Ministerial & Isolated Categories Examination", "RRB", "Railways", ["rrb-ntpc", "ssc-chsl", "rrb-paramedical"]),
  e("rpf-si", "RPF SI", "Railway Protection Force Sub Inspector Examination", "RPF", "Railways", ["rpf-constable", "ssc-cpo", "ssc-gd-constable"]),
  e("rpf-constable", "RPF Constable", "Railway Protection Force Constable Examination", "RPF", "Railways", ["rpf-si", "ssc-gd-constable", "rrb-group-d"]),

  // ===== DEFENSE =====
  e("afcat", "AFCAT", "Air Force Common Admission Test", "IAF", "Defense & Paramilitary", ["upsc-cds", "upsc-nda-na", "inet"]),
  e("inet", "INET", "Indian Navy Entrance Test", "Indian Navy", "Defense & Paramilitary", ["afcat", "upsc-nda-na", "navy-agniveer"]),
  e("icg-navik", "ICG Navik", "Indian Coast Guard Navik (GD/DB) Examination", "Indian Coast Guard", "Defense & Paramilitary", ["icg-yantrik", "navy-agniveer", "army-agniveer"]),
  e("icg-yantrik", "ICG Yantrik", "Indian Coast Guard Yantrik Examination", "Indian Coast Guard", "Defense & Paramilitary", ["icg-navik", "navy-agniveer", "rrb-technician"]),
  e("army-agniveer", "Army Agniveer", "Indian Army Agniveer Examination", "Indian Army", "Defense & Paramilitary", ["navy-agniveer", "air-force-agniveer-vayu", "upsc-nda-na"]),
  e("navy-agniveer", "Navy Agniveer", "Indian Navy Agniveer Examination", "Indian Navy", "Defense & Paramilitary", ["army-agniveer", "air-force-agniveer-vayu", "inet"]),
  e("air-force-agniveer-vayu", "IAF Agniveer Vayu", "Indian Air Force Agniveer Vayu Examination", "IAF", "Defense & Paramilitary", ["army-agniveer", "navy-agniveer", "afcat"]),
  e("cisf-constable", "CISF Constable", "Central Industrial Security Force Constable / Tradesman Examination", "CISF", "Defense & Paramilitary", ["ssc-gd-constable", "crpf-head-constable", "bsf-tradesman"]),
  e("crpf-head-constable", "CRPF Head Constable", "Central Reserve Police Force Head Constable Examination", "CRPF", "Defense & Paramilitary", ["cisf-constable", "bsf-tradesman", "itbp-constable"]),
  e("bsf-tradesman", "BSF Tradesman", "Border Security Force Tradesman Examination", "BSF", "Defense & Paramilitary", ["cisf-constable", "crpf-head-constable", "itbp-constable"]),
  e("itbp-constable", "ITBP Constable", "Indo-Tibetan Border Police Constable Examination", "ITBP", "Defense & Paramilitary", ["cisf-constable", "crpf-head-constable", "bsf-tradesman"]),

  // ===== TEACHING =====
  e("ugc-net", "UGC NET", "University Grants Commission National Eligibility Test", "UGC", "Central Teaching", ["csir-net", "ctet", "kvs"], tP, tS),
  e("csir-net", "CSIR NET", "Council of Scientific and Industrial Research National Eligibility Test", "CSIR", "Central Teaching", ["ugc-net", "gate", "kvs"], tP, tS),
  e("ctet", "CTET", "Central Teacher Eligibility Test", "CBSE", "Central Teaching", ["kvs", "nvs", "dsssb"], tP, tS),
  e("kvs", "KVS", "Kendriya Vidyalaya Sangathan PRT/TGT/PGT Recruitment", "KVS", "Central Teaching", ["nvs", "ctet", "emrs"], tP, tS),
  e("nvs", "NVS", "Navodaya Vidyalaya Samiti PRT/TGT/PGT Recruitment", "NVS", "Central Teaching", ["kvs", "ctet", "emrs"], tP, tS),
  e("dsssb", "DSSSB", "Delhi Subordinate Services Selection Board Recruitment", "DSSSB", "Central Teaching", ["ctet", "kvs", "ssc-cgl"], tP, tS),
  e("emrs", "EMRS", "Eklavya Model Residential Schools TGT/PGT/Principal Recruitment", "EMRS", "Central Teaching", ["kvs", "nvs", "ctet"], tP, tS),

  // ===== NATIONAL ENTRANCE =====
  e("jee-main", "JEE Main", "Joint Entrance Examination Main", "NTA", "National Entrance Exams", ["jee-advanced", "gate", "cuet-ug"], eP, eS),
  e("jee-advanced", "JEE Advanced", "Joint Entrance Examination Advanced", "IIT", "National Entrance Exams", ["jee-main", "gate", "neet-ug"], eP, eS),
  e("neet-ug", "NEET UG", "National Eligibility cum Entrance Test Undergraduate", "NTA", "National Entrance Exams", ["neet-pg", "jee-main", "cuet-ug"], eP, eS),
  e("neet-pg", "NEET PG", "National Eligibility cum Entrance Test Postgraduate", "NBE", "National Entrance Exams", ["neet-ug", "neet-mds", "ini-cet"], eP, eS),
  e("neet-mds", "NEET MDS", "National Eligibility cum Entrance Test Master of Dental Surgery", "NBE", "National Entrance Exams", ["neet-pg", "neet-ss", "ini-cet"], eP, eS),
  e("neet-ss", "NEET SS", "National Eligibility cum Entrance Test Super Speciality", "NBE", "National Entrance Exams", ["neet-pg", "neet-mds", "ini-cet"], eP, eS),
  e("ini-cet", "INI CET", "Institute of National Importance Combined Entrance Test", "AIIMS", "National Entrance Exams", ["neet-pg", "neet-ss", "neet-mds"], eP, eS),
  e("gate", "GATE", "Graduate Aptitude Test in Engineering", "IIT", "National Entrance Exams", ["jee-advanced", "upsc-ese", "csir-net"], eP, eS),
  e("cat", "CAT", "Common Admission Test for IIM Admissions", "IIM", "National Entrance Exams", ["xat", "mat", "cmat"], eP, eS),
  e("xat", "XAT", "Xavier Aptitude Test", "XLRI", "National Entrance Exams", ["cat", "snap", "nmat"], eP, eS),
  e("mat", "MAT", "Management Aptitude Test", "AIMA", "National Entrance Exams", ["cat", "cmat", "atma"], eP, eS),
  e("cmat", "CMAT", "Common Management Admission Test", "NTA", "National Entrance Exams", ["mat", "cat", "atma"], eP, eS),
  e("atma", "ATMA", "AIMS Test for Management Admissions", "AIMS", "National Entrance Exams", ["mat", "cmat", "cat"], eP, eS),
  e("snap", "SNAP", "Symbiosis National Aptitude Test", "SIU", "National Entrance Exams", ["xat", "cat", "nmat"], eP, eS),
  e("nmat", "NMAT", "NMIMS Management Aptitude Test", "NMIMS", "National Entrance Exams", ["snap", "xat", "cat"], eP, eS),
  e("iift", "IIFT", "Indian Institute of Foreign Trade Entrance Examination", "IIFT", "National Entrance Exams", ["cat", "xat", "snap"], eP, eS),
  e("cuet-ug", "CUET UG", "Common University Entrance Test Undergraduate", "NTA", "National Entrance Exams", ["cuet-pg", "jee-main", "neet-ug"], eP, eS),
  e("cuet-pg", "CUET PG", "Common University Entrance Test Postgraduate", "NTA", "National Entrance Exams", ["cuet-ug", "gate", "ugc-net"], eP, eS),
  e("clat", "CLAT", "Common Law Admission Test", "CNLU", "National Entrance Exams", ["ailet", "lsat-india", "cuet-ug"], eP, eS),
  e("ailet", "AILET", "All India Law Entrance Test", "NLU Delhi", "National Entrance Exams", ["clat", "lsat-india", "cuet-ug"], eP, eS),
  e("lsat-india", "LSAT India", "Law School Admission Test India", "LSAC", "National Entrance Exams", ["clat", "ailet", "cuet-ug"], eP, eS),
  e("nift-entrance", "NIFT Entrance", "National Institute of Fashion Technology Entrance Examination", "NIFT", "National Entrance Exams", ["nid-dat", "uceed", "cuet-ug"], eP, eS),
  e("nid-dat", "NID DAT", "National Institute of Design Design Aptitude Test", "NID", "National Entrance Exams", ["nift-entrance", "uceed", "ceed"], eP, eS),
  e("uceed", "UCEED", "Undergraduate Common Entrance Examination for Design", "IIT", "National Entrance Exams", ["ceed", "nid-dat", "nift-entrance"], eP, eS),
  e("ceed", "CEED", "Common Entrance Examination for Design", "IIT", "National Entrance Exams", ["uceed", "nid-dat", "gate"], eP, eS),
  e("icar-aieea", "ICAR AIEEA", "Indian Council of Agricultural Research All India Entrance Examination", "ICAR", "National Entrance Exams", ["neet-ug", "cuet-ug", "jee-main"], eP, eS),
  e("gpat", "GPAT", "Graduate Pharmacy Aptitude Test", "NTA", "National Entrance Exams", ["neet-pg", "gate", "cuet-pg"], eP, eS),
  e("nchmct-jee", "NCHMCT JEE", "National Council for Hotel Management Joint Entrance Examination", "NTA", "National Entrance Exams", ["cuet-ug", "jee-main", "cat"], eP, eS),

  // ===== STATE PSC =====
  e("appsc", "APPSC", "Andhra Pradesh Public Service Commission Group 1/2/3/4 Examination", "APPSC", "State Public Service Commission", ["tspsc", "upsc-cse", "tnpsc"]),
  e("apsc-cce", "APSC CCE", "Assam Public Service Commission Combined Competitive Examination", "APSC", "State Public Service Commission", ["upsc-cse", "bpsc-cce", "wbcs"]),
  e("bpsc-cce", "BPSC CCE", "Bihar Public Service Commission Combined Competitive Examination", "BPSC", "State Public Service Commission", ["uppsc-pcs", "jpsc-cse", "upsc-cse"]),
  e("cgpsc", "CGPSC", "Chhattisgarh Public Service Commission State Service Examination", "CGPSC", "State Public Service Commission", ["mppsc", "upsc-cse", "uppsc-pcs"]),
  e("gpsc", "GPSC", "Gujarat Public Service Commission Class 1/2 Examination", "GPSC", "State Public Service Commission", ["rpsc-ras", "mppsc", "upsc-cse"]),
  e("hpsc-hcs", "HPSC HCS", "Haryana Public Service Commission Haryana Civil Services Examination", "HPSC", "State Public Service Commission", ["ppsc-pcs", "uppsc-pcs", "upsc-cse"]),
  e("hppsc-has", "HPPSC HAS", "Himachal Pradesh Public Service Commission HAS Examination", "HPPSC", "State Public Service Commission", ["ukpsc-pcs", "upsc-cse", "ppsc-pcs"]),
  e("jkpsc-kas", "JKPSC KAS", "Jammu & Kashmir Public Service Commission KAS Examination", "JKPSC", "State Public Service Commission", ["upsc-cse", "ukpsc-pcs", "hppsc-has"]),
  e("jpsc-cse", "JPSC CSE", "Jharkhand Public Service Commission Civil Services Examination", "JPSC", "State Public Service Commission", ["bpsc-cce", "wbcs", "upsc-cse"]),
  e("kpsc-kas", "KPSC KAS", "Karnataka Public Service Commission KAS Examination", "KPSC", "State Public Service Commission", ["kerala-psc-kas", "tnpsc", "upsc-cse"]),
  e("kerala-psc-kas", "Kerala PSC KAS", "Kerala Public Service Commission KAS Examination", "Kerala PSC", "State Public Service Commission", ["kpsc-kas", "tnpsc", "appsc"]),
  e("mppsc", "MPPSC", "Madhya Pradesh Public Service Commission State Service Examination", "MPPSC", "State Public Service Commission", ["cgpsc", "rpsc-ras", "upsc-cse"]),
  e("mpsc-maharashtra", "MPSC Maharashtra", "Maharashtra Public Service Commission State Service Examination", "MPSC", "State Public Service Commission", ["gpsc", "kpsc-kas", "upsc-cse"]),
  e("mpsc-meghalaya", "MPSC Meghalaya", "Meghalaya Public Service Commission Examination", "MPSC Meghalaya", "State Public Service Commission", ["apsc-cce", "npsc", "tpsc"]),
  e("mpsc-mizoram", "MPSC Mizoram", "Mizoram Public Service Commission Examination", "MPSC Mizoram", "State Public Service Commission", ["mpsc-meghalaya", "npsc", "tpsc"]),
  e("npsc", "NPSC", "Nagaland Public Service Commission Examination", "NPSC", "State Public Service Commission", ["apsc-cce", "mpsc-meghalaya", "tpsc"]),
  e("opsc-oas", "OPSC OAS", "Odisha Public Service Commission Odisha Administrative Service Examination", "OPSC", "State Public Service Commission", ["wbcs", "jpsc-cse", "upsc-cse"]),
  e("ppsc-pcs", "PPSC PCS", "Punjab Public Service Commission PCS Examination", "PPSC", "State Public Service Commission", ["hpsc-hcs", "uppsc-pcs", "upsc-cse"]),
  e("rpsc-ras", "RPSC RAS", "Rajasthan Public Service Commission RAS/RTS Examination", "RPSC", "State Public Service Commission", ["mppsc", "gpsc", "upsc-cse"]),
  e("spsc", "SPSC", "Sikkim Public Service Commission Examination", "SPSC", "State Public Service Commission", ["wbcs", "npsc", "upsc-cse"]),
  e("tnpsc", "TNPSC", "Tamil Nadu Public Service Commission Group 1/2/3/4 Examination", "TNPSC", "State Public Service Commission", ["kpsc-kas", "appsc", "tspsc"]),
  e("tspsc", "TSPSC", "Telangana State Public Service Commission Group 1/2/3/4 Examination", "TSPSC", "State Public Service Commission", ["appsc", "tnpsc", "kpsc-kas"]),
  e("tpsc", "TPSC", "Tripura Public Service Commission Examination", "TPSC", "State Public Service Commission", ["wbcs", "apsc-cce", "npsc"]),
  e("uppsc-pcs", "UPPSC PCS", "Uttar Pradesh Public Service Commission PCS Examination", "UPPSC", "State Public Service Commission", ["uppsc-ro-aro", "bpsc-cce", "upsc-cse"]),
  e("uppsc-ro-aro", "UPPSC RO/ARO", "Uttar Pradesh Public Service Commission Review Officer / Assistant Review Officer Examination", "UPPSC", "State Public Service Commission", ["uppsc-pcs", "upsc-cse", "ppsc-pcs"]),
  e("ukpsc-pcs", "UKPSC PCS", "Uttarakhand Public Service Commission PCS Examination", "UKPSC", "State Public Service Commission", ["uppsc-pcs", "hppsc-has", "upsc-cse"]),
  e("wbcs", "WBCS", "West Bengal Civil Service Examination", "WBPSC", "State Public Service Commission", ["bpsc-cce", "jpsc-cse", "upsc-cse"]),

  // ===== STATE STAFF SELECTION =====
  e("ap-dsc", "AP DSC", "Andhra Pradesh District Selection Committee Examination", "AP DSC", "State Staff Selection", ["appsc", "aptet", "tspsc"]),
  e("bssc-cgl", "BSSC CGL", "Bihar Staff Selection Commission CGL / Inter Level Examination", "BSSC", "State Staff Selection", ["bpsc-cce", "ssc-cgl", "jssc-cgl"]),
  e("cg-vyapam", "CG Vyapam", "Chhattisgarh Professional Examination Board Examination", "CG Vyapam", "State Staff Selection", ["cgpsc", "mp-peb", "ssc-cgl"]),
  e("gsssb", "GSSSB", "Gujarat Subordinate Service Selection Board Examination", "GSSSB", "State Staff Selection", ["gpsc", "ssc-cgl", "hssc-cet"]),
  e("hssc-cet", "HSSC CET", "Haryana Staff Selection Commission Common Eligibility Test", "HSSC", "State Staff Selection", ["hpsc-hcs", "ssc-cgl", "gsssb"]),
  e("hpsssb", "HPSSSB", "Himachal Pradesh Staff Selection Board Examination", "HPSSSB", "State Staff Selection", ["hppsc-has", "ssc-cgl", "hssc-cet"]),
  e("jssc-cgl", "JSSC CGL", "Jharkhand Staff Selection Commission CGL Examination", "JSSC", "State Staff Selection", ["jpsc-cse", "bssc-cgl", "ssc-cgl"]),
  e("kea", "KEA", "Karnataka Examinations Authority Examination", "KEA", "State Staff Selection", ["kpsc-kas", "kcet", "ssc-cgl"]),
  e("mp-peb", "MP PEB", "Madhya Pradesh Professional Examination Board Vyapam Examination", "MP PEB", "State Staff Selection", ["mppsc", "cg-vyapam", "ssc-cgl"]),
  e("rsmssb", "RSMSSB", "Rajasthan Subordinate & Ministerial Services Selection Board Examination", "RSMSSB", "State Staff Selection", ["rpsc-ras", "ssc-cgl", "hssc-cet"]),
  e("tnusrb", "TNUSRB", "Tamil Nadu Uniformed Services Recruitment Board Examination", "TNUSRB", "State Staff Selection", ["tnpsc", "tn-police", "ssc-cgl"]),
  e("upsssc-pet", "UPSSSC PET", "Uttar Pradesh Subordinate Services Selection Commission Preliminary Eligibility Test", "UPSSSC", "State Staff Selection", ["upsssc-vdo", "upsssc-lekhpal", "uppsc-pcs"]),
  e("upsssc-vdo", "UPSSSC VDO", "Uttar Pradesh Subordinate Services Selection Commission Village Development Officer Examination", "UPSSSC", "State Staff Selection", ["upsssc-pet", "upsssc-lekhpal", "uppsc-pcs"]),
  e("upsssc-lekhpal", "UPSSSC Lekhpal", "Uttar Pradesh Subordinate Services Selection Commission Lekhpal Examination", "UPSSSC", "State Staff Selection", ["upsssc-pet", "upsssc-vdo", "uppsc-pcs"]),
  e("uksssc", "UKSSSC", "Uttarakhand Subordinate Service Selection Commission Examination", "UKSSSC", "State Staff Selection", ["ukpsc-pcs", "upsssc-pet", "ssc-cgl"]),

  // ===== STATE POLICE =====
  e("ap-police", "AP Police", "Andhra Pradesh Police SI & Constable Examination", "AP Police", "State Police", ["ts-police", "tn-police", "ssc-gd-constable"]),
  e("assam-police", "Assam Police", "Assam Police SI & Constable Examination", "Assam Police", "State Police", ["wb-police", "bihar-police", "ssc-gd-constable"]),
  e("bihar-police", "Bihar Police", "Bihar Police SI & Constable Examination", "Bihar Police", "State Police", ["up-police", "jharkhand-police", "ssc-gd-constable"]),
  e("cg-police", "CG Police", "Chhattisgarh Police SI & Constable Examination", "CG Police", "State Police", ["mp-police", "bihar-police", "ssc-gd-constable"]),
  e("delhi-police", "Delhi Police", "Delhi Police SI & Constable Examination (via SSC)", "Delhi Police", "State Police", ["up-police", "haryana-police", "ssc-cpo"]),
  e("gujarat-police", "Gujarat Police", "Gujarat Police SI & Constable Examination", "Gujarat Police", "State Police", ["rajasthan-police", "mp-police", "ssc-gd-constable"]),
  e("haryana-police", "Haryana Police", "Haryana Police SI & Constable Examination", "Haryana Police", "State Police", ["delhi-police", "punjab-police", "up-police"]),
  e("hp-police", "HP Police", "Himachal Pradesh Police SI & Constable Examination", "HP Police", "State Police", ["uttarakhand-police", "punjab-police", "haryana-police"]),
  e("jk-police", "J&K Police", "Jammu & Kashmir Police SI & Constable Examination", "J&K Police", "State Police", ["hp-police", "uttarakhand-police", "punjab-police"]),
  e("jharkhand-police", "Jharkhand Police", "Jharkhand Police SI & Constable Examination", "Jharkhand Police", "State Police", ["bihar-police", "wb-police", "odisha-police"]),
  e("karnataka-police", "Karnataka Police", "Karnataka Police SI & Constable Examination", "Karnataka Police", "State Police", ["kerala-police", "tn-police", "ap-police"]),
  e("kerala-police", "Kerala Police", "Kerala Police SI & Constable Examination", "Kerala Police", "State Police", ["karnataka-police", "tn-police", "ap-police"]),
  e("mp-police", "MP Police", "Madhya Pradesh Police SI & Constable Examination", "MP Police", "State Police", ["cg-police", "rajasthan-police", "up-police"]),
  e("maharashtra-police", "Maharashtra Police", "Maharashtra Police SI & Constable Examination", "Maharashtra Police", "State Police", ["gujarat-police", "karnataka-police", "mp-police"]),
  e("odisha-police", "Odisha Police", "Odisha Police SI & Constable Examination", "Odisha Police", "State Police", ["wb-police", "jharkhand-police", "cg-police"]),
  e("punjab-police", "Punjab Police", "Punjab Police SI & Constable Examination", "Punjab Police", "State Police", ["haryana-police", "hp-police", "delhi-police"]),
  e("rajasthan-police", "Rajasthan Police", "Rajasthan Police SI & Constable Examination", "Rajasthan Police", "State Police", ["mp-police", "gujarat-police", "haryana-police"]),
  e("tn-police", "TN Police", "Tamil Nadu Police SI & Constable Examination", "TN Police", "State Police", ["karnataka-police", "kerala-police", "ap-police"]),
  e("ts-police", "TS Police", "Telangana State Police SI & Constable Examination", "TS Police", "State Police", ["ap-police", "karnataka-police", "maharashtra-police"]),
  e("up-police", "UP Police", "Uttar Pradesh Police SI & Constable Examination", "UP Police", "State Police", ["bihar-police", "mp-police", "rajasthan-police"]),
  e("uttarakhand-police", "Uttarakhand Police", "Uttarakhand Police SI & Constable Examination", "Uttarakhand Police", "State Police", ["up-police", "hp-police", "delhi-police"]),
  e("wb-police", "WB Police", "West Bengal Police SI & Constable Examination", "WB Police", "State Police", ["bihar-police", "jharkhand-police", "assam-police"]),

  // ===== STATE TET =====
  e("aptet", "APTET", "Andhra Pradesh Teacher Eligibility Test", "AP Govt", "State TET", ["tstet", "ctet", "tntet"], tP, tS),
  e("assam-tet", "Assam TET", "Assam Teacher Eligibility Test", "Assam Govt", "State TET", ["ctet", "wbtet", "btet"], tP, tS),
  e("btet", "BTET", "Bihar Teacher Eligibility Test", "Bihar Govt", "State TET", ["uptet", "ctet", "jtet"], tP, tS),
  e("cg-tet", "CG TET", "Chhattisgarh Teacher Eligibility Test", "CG Govt", "State TET", ["mp-tet", "ctet", "btet"], tP, tS),
  e("gtet", "GTET", "Gujarat Teacher Eligibility Test", "Gujarat Govt", "State TET", ["ctet", "reet", "maha-tet"], tP, tS),
  e("htet", "HTET", "Haryana Teacher Eligibility Test", "Haryana Govt", "State TET", ["ctet", "pstet", "uptet"], tP, tS),
  e("hp-tet", "HP TET", "Himachal Pradesh Teacher Eligibility Test", "HP Govt", "State TET", ["ctet", "utet", "htet"], tP, tS),
  e("jtet", "JTET", "Jharkhand Teacher Eligibility Test", "Jharkhand Govt", "State TET", ["btet", "ctet", "wbtet"], tP, tS),
  e("kartet", "KARTET", "Karnataka Teacher Eligibility Test", "Karnataka Govt", "State TET", ["ktet", "ctet", "aptet"], tP, tS),
  e("ktet", "KTET", "Kerala Teacher Eligibility Test", "Kerala Govt", "State TET", ["kartet", "ctet", "tntet"], tP, tS),
  e("mp-tet", "MP TET", "Madhya Pradesh Teacher Eligibility Test", "MP Govt", "State TET", ["cg-tet", "ctet", "reet"], tP, tS),
  e("maha-tet", "MAHA TET", "Maharashtra Teacher Eligibility Test", "Maharashtra Govt", "State TET", ["ctet", "gtet", "kartet"], tP, tS),
  e("otet", "OTET", "Odisha Teacher Eligibility Test", "Odisha Govt", "State TET", ["ctet", "wbtet", "jtet"], tP, tS),
  e("pstet", "PSTET", "Punjab State Teacher Eligibility Test", "Punjab Govt", "State TET", ["htet", "ctet", "hp-tet"], tP, tS),
  e("reet", "REET", "Rajasthan Eligibility Examination for Teachers", "Rajasthan Govt", "State TET", ["ctet", "mp-tet", "gtet"], tP, tS),
  e("tntet", "TNTET", "Tamil Nadu Teacher Eligibility Test", "TN Govt", "State TET", ["ctet", "kartet", "aptet"], tP, tS),
  e("tstet", "TSTET", "Telangana State Teacher Eligibility Test", "TS Govt", "State TET", ["aptet", "ctet", "kartet"], tP, tS),
  e("uptet", "UPTET", "Uttar Pradesh Teacher Eligibility Test", "UP Govt", "State TET", ["ctet", "btet", "htet"], tP, tS),
  e("utet", "UTET", "Uttarakhand Teacher Eligibility Test", "UK Govt", "State TET", ["uptet", "ctet", "hp-tet"], tP, tS),
  e("wbtet", "WBTET", "West Bengal Teacher Eligibility Test", "WB Govt", "State TET", ["ctet", "btet", "jtet"], tP, tS),

  // ===== STATE ENTRANCE EXAMS =====
  e("ap-eapcet", "AP EAPCET", "Andhra Pradesh Engineering Agriculture and Pharmacy Common Entrance Test", "APSCHE", "State Entrance Exams", ["ts-eamcet", "jee-main", "neet-ug"], eP, eS),
  e("ap-icet", "AP ICET", "Andhra Pradesh Integrated Common Entrance Test", "APSCHE", "State Entrance Exams", ["ts-icet", "cat", "cuet-pg"], eP, eS),
  e("ap-lawcet", "AP LAWCET", "Andhra Pradesh Law Common Entrance Test", "APSCHE", "State Entrance Exams", ["ts-lawcet", "clat", "ailet"], eP, eS),
  e("ap-pgecet", "AP PGECET", "Andhra Pradesh Post Graduate Engineering Common Entrance Test", "APSCHE", "State Entrance Exams", ["ts-pgecet", "gate", "cuet-pg"], eP, eS),
  e("assam-cee", "Assam CEE", "Assam Combined Entrance Examination", "Assam Govt", "State Entrance Exams", ["jee-main", "neet-ug", "wbjee"], eP, eS),
  e("bcece", "BCECE", "Bihar Combined Entrance Competitive Examination", "BCECE Board", "State Entrance Exams", ["jee-main", "neet-ug", "jcece"], eP, eS),
  e("cg-pet", "CG PET", "Chhattisgarh Pre-Engineering Test", "CG Vyapam", "State Entrance Exams", ["jee-main", "mp-be", "bcece"], eP, eS),
  e("cg-pmt", "CG PMT", "Chhattisgarh Pre-Medical Test", "CG Vyapam", "State Entrance Exams", ["neet-ug", "mp-pat", "bcece"], eP, eS),
  e("gcet", "GCET", "Goa Common Entrance Test", "DTE Goa", "State Entrance Exams", ["jee-main", "mht-cet", "kcet"], eP, eS),
  e("gujcet", "GUJCET", "Gujarat Common Entrance Test", "GSEB", "State Entrance Exams", ["jee-main", "neet-ug", "mht-cet"], eP, eS),
  e("haryana-det", "Haryana DET", "Haryana Diploma Entrance Test", "HSTES", "State Entrance Exams", ["jee-main", "hp-cet", "pu-cet"], eP, eS),
  e("hp-cet", "HP CET", "Himachal Pradesh Common Entrance Test", "HPTU", "State Entrance Exams", ["jee-main", "jkcet", "pu-cet"], eP, eS),
  e("jkcet", "JKCET", "Jammu & Kashmir Common Entrance Test", "BOPEE", "State Entrance Exams", ["jee-main", "hp-cet", "neet-ug"], eP, eS),
  e("jcece", "JCECE", "Jharkhand Combined Entrance Competitive Examination", "JCECE Board", "State Entrance Exams", ["bcece", "wbjee", "jee-main"], eP, eS),
  e("kcet", "KCET", "Karnataka Common Entrance Test", "KEA", "State Entrance Exams", ["karnataka-pgcet", "jee-main", "neet-ug"], eP, eS),
  e("karnataka-pgcet", "Karnataka PGCET", "Karnataka Post Graduate Common Entrance Test", "KEA", "State Entrance Exams", ["kcet", "gate", "cuet-pg"], eP, eS),
  e("keam", "KEAM", "Kerala Engineering Architecture Medical Entrance Examination", "CEE Kerala", "State Entrance Exams", ["kcet", "jee-main", "neet-ug"], eP, eS),
  e("kmat-kerala", "KMAT Kerala", "Kerala Management Aptitude Test", "Kerala Govt", "State Entrance Exams", ["cat", "mat", "tancet"], eP, eS),
  e("mp-pat", "MP PAT", "Madhya Pradesh Pre-Agriculture Test", "MP PEB", "State Entrance Exams", ["icar-aieea", "neet-ug", "cg-pmt"], eP, eS),
  e("mp-be", "MP BE", "Madhya Pradesh Bachelor of Education Entrance Test", "MP PEB", "State Entrance Exams", ["ctet", "cg-pet", "mp-pat"], eP, eS),
  e("mht-cet", "MHT CET", "Maharashtra Common Entrance Test", "CET Cell", "State Entrance Exams", ["jee-main", "neet-ug", "gujcet"], eP, eS),
  e("mah-mba-cet", "MAH MBA CET", "Maharashtra MBA Common Entrance Test", "CET Cell", "State Entrance Exams", ["cat", "mht-cet", "cmat"], eP, eS),
  e("mah-mca-cet", "MAH MCA CET", "Maharashtra MCA Common Entrance Test", "CET Cell", "State Entrance Exams", ["mht-cet", "cuet-pg", "gate"], eP, eS),
  e("mah-llb-cet", "MAH LLB CET", "Maharashtra LLB Common Entrance Test", "CET Cell", "State Entrance Exams", ["clat", "ailet", "mht-cet"], eP, eS),
  e("ojee", "OJEE", "Odisha Joint Entrance Examination", "OJEE Board", "State Entrance Exams", ["jee-main", "wbjee", "bcece"], eP, eS),
  e("pu-cet", "PU CET", "Panjab University Common Entrance Test", "Panjab University", "State Entrance Exams", ["jee-main", "hp-cet", "cuet-ug"], eP, eS),
  e("ts-eamcet", "TS EAMCET", "Telangana State Engineering Agriculture and Medical Common Entrance Test", "TSCHE", "State Entrance Exams", ["ap-eapcet", "jee-main", "neet-ug"], eP, eS),
  e("ts-icet", "TS ICET", "Telangana State Integrated Common Entrance Test", "TSCHE", "State Entrance Exams", ["ap-icet", "cat", "cuet-pg"], eP, eS),
  e("ts-lawcet", "TS LAWCET", "Telangana State Law Common Entrance Test", "TSCHE", "State Entrance Exams", ["ap-lawcet", "clat", "ailet"], eP, eS),
  e("ts-pgecet", "TS PGECET", "Telangana State Post Graduate Engineering Common Entrance Test", "TSCHE", "State Entrance Exams", ["ap-pgecet", "gate", "karnataka-pgcet"], eP, eS),
  e("tancet", "TANCET", "Tamil Nadu Common Entrance Test", "Anna University", "State Entrance Exams", ["kcet", "gate", "cat"], eP, eS),
  e("uksee", "UKSEE", "Uttarakhand State Entrance Examination", "UTU", "State Entrance Exams", ["jee-main", "neet-ug", "bcece"], eP, eS),
  e("wbjee", "WBJEE", "West Bengal Joint Entrance Examination", "WBJEEB", "State Entrance Exams", ["jee-main", "jcece", "bcece"], eP, eS),
  e("jexpo", "JEXPO", "Joint Entrance Examination for Polytechnics", "WBSCTE", "State Entrance Exams", ["wbjee", "jee-main", "bcece"], eP, eS),
];

// ── Lookup ─────────────────────────────────────────────────
const examMap = new Map<string, ExamData>();
examPages.forEach((exam) => examMap.set(exam.slug, exam));

export function getExamBySlug(slug: string): ExamData | undefined {
  return examMap.get(slug);
}

export function getRelatedExams(exam: ExamData): ExamData[] {
  return exam.relatedSlugs.map((s) => examMap.get(s)).filter(Boolean) as ExamData[];
}
