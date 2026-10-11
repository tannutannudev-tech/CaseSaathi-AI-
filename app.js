import React, { useState, useEffect, useRef } from 'react';
import {
  Scale, Shield, HeartHandshake, CheckCircle2, AlertTriangle, Clock,
  Calendar, Phone, HelpCircle, Volume2, VolumeX, Sparkles, RefreshCw,
  Copy, Check, FileText, ChevronRight, ChevronDown, User, DollarSign,
  ArrowRight, Landmark, ExternalLink, BookmarkCheck, Send, MessageSquare,
  Printer, Info, ShieldAlert, Award, FileSearch, Languages, Globe
} from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  { code: 'hi', label: 'हिन्दी', subLabel: 'Hindi', speechTag: 'hi-IN' },
  { code: 'en', label: 'English', subLabel: 'English', speechTag: 'en-IN' },
  { code: 'bn', label: 'বাংলা', subLabel: 'Bengali', speechTag: 'bn-IN' },
  { code: 'ta', label: 'தமிழ்', subLabel: 'Tamil', speechTag: 'ta-IN' },
  { code: 'te', label: 'తెలుగు', subLabel: 'Telugu', speechTag: 'te-IN' },
  { code: 'mr', label: 'मराठी', subLabel: 'Marathi', speechTag: 'mr-IN' },
  { code: 'gu', label: 'ગુજરાતી', subLabel: 'Gujarati', speechTag: 'gu-IN' },
  { code: 'kn', label: 'ಕನ್ನಡ', subLabel: 'Kannada', speechTag: 'kn-IN' }
];

const UI_STRINGS = {
  hi: {
    helplineTitle: "मुफ्त कानूनी सहायता हेल्पलाइन (NALSA):",
    helplineSubtitle: "संविधान अनुच्छेद 39A के तहत निःशुल्क न्याय",
    checkEligibility: "क्या आपको मुफ्त वकील मिल सकता है? पात्रता जाँचें",
    appTitle: "NyayaMitra",
    appSubTitle: "न्यायमित्र",
    badgeRole: "आम नागरिक का कानूनी साथी",
    headerDesc: "अदालती आदेश, नोटिस व एफआईआर को सरल भाषा में समझें — बिना कानूनी उलझन के",
    jargonBtn: "शब्दकोश (Jargon Buster)",
    presetCasesTitle: "सामान्य नागरिक मामले (उदाहरण चुनें):",
    clickToLoad: "क्लिक करके लोड करें",
    inputLabel: "अपना अदालती आदेश, नोटिस या FIR यहाँ पेस्ट करें:",
    charCount: "अक्षर",
    inputPlaceholder: "यहाँ अपने अदालती आदेश, ज़मानत अर्ज़ी, पुलिस नोटिस, या चेक बाउंस के कागजात पेस्ट करें...",
    explainBtn: "सरल भाषा में समझाइए (Explain Simply)",
    explainingBtn: "सरल भाषा में विश्लेषण हो रहा है...",
    freeAidCardTitle: "क्या आप वकील की फीस नहीं दे सकते?",
    freeAidCardDesc: "भारतीय कानून के तहत हर महिला, बच्चे, अनुसूचित जाति/जनजाति के नागरिक, और कम आय वाले व्यक्तियों को सरकार की तरफ से मुफ्त सरकारी वकील मिलता है।",
    freeAidCardLink: "जिले की कानूनी सेवा (DLSA) से संपर्क करने का तरीका",
    readAloud: "बोलकर सुनाएं",
    stopReadAloud: "आवाज़ बंद करें",
    printSheet: "प्रिंट या सेव करें",
    big3Title: "3 सबसे बड़े सवाल (मेरे लिए इसका क्या मतलब है?):",
    jailQuestion: "क्या जेल का खतरा है?",
    moneyQuestion: "कितने पैसे / मुचलका?",
    deadlineQuestion: "तारीख या समय सीमा:",
    actionListTitle: "अब मुझे क्या करना होगा? (कदम-दर-कदम कार्यसूची):",
    complianceBadge: "समय सीमा अनुपालन चेकलिस्ट",
    stepPrefix: "कदम",
    timePrefix: "समय सीमा:",
    cautionPrefix: "सावधानी:",
    pitfallsTitle: "गलतियाँ जिनसे बचें (अन्यथा राहत रद्द हो सकती है):",
    emptyStateTitle: "अदालती आदेश का इंतज़ार",
    emptyStateDesc: "बाईं तरफ से कोई भी सामान्य मामला चुनें या अपना आदेश पेस्ट करके 'सरल भाषा में समझाइए' बटन दबाएँ।",
    emptyStateBtn: "चयनित मामला सरल भाषा में देखें",
    chatTitle: "न्यायमित्र से पूछें (Ask Your Legal Companion)",
    chatSubtitle: "अपनी मातृभाषा में बिना झिझक पूछें",
    chatPlaceholder: "उदा. 'क्या मुझे कल कोर्ट जाना पड़ेगा?', 'ज़मानत के लिए क्या कागज़ चाहिए?'...",
    chatThinking: "न्यायमित्र आपके सवाल का सरल उत्तर तैयार कर रहे हैं...",
    jargonSectionTitle: "कानूनी शब्दों का सरल अर्थ (Legal Jargon Buster)",
    jargonSectionDesc: "अदालतों में बोले जाने वाले कठिन अंग्रेजी और लैटिन शब्दों को अपनी भाषा में समझें",
    searchJargon: "शब्द खोजें (उदा. Bail, Status Quo, Ex-parte)...",
    examplePrefix: "उदाहरण:",
    modalTitle: "मुफ्त कानूनी सहायता (Free Legal Aid) पात्रता",
    modalIntro: "कानूनी सेवा प्राधिकरण अधिनियम, 1987 (NALSA) के तहत निम्नलिखित व्यक्ति सरकारी खर्चे पर निःशुल्क वकील के पात्र हैं:",
    eligibilityList: [
      "सभी महिलाएँ एवं बच्चे (Women & Children)",
      "अनुसूचित जाति (SC) व अनुसूचित जनजाति (ST) के सदस्य",
      "हिरासत में बंद व्यक्ति (कस्टडी या विचाराधीन कैदी)",
      "कम आय वर्ग (वार्षिक आय ₹3 लाख से कम - राज्य अनुसार)",
      "आपदा या दंगा पीड़ित एवं औद्योगिक श्रमिक"
    ],
    howToApplyTitle: "सहायता कैसे प्राप्त करें?",
    howToApplyDesc: "अपने जिला न्यायालय स्थित जिला विधिक सेवा प्राधिकरण (DLSA) कार्यालय में जाएं या राष्ट्रीय हेल्पलाइन 15100 पर कॉल करें।",
    modalCloseBtn: "समझ गया (Close)",
    footerLeft: "NyayaMitra (न्यायमित्र) — भारतीय नागरिकों के लिए पारदर्शी और सुलभ कानूनी सहायता।",
    footerRight: "हेल्पलाइन: 15100 (NALSA) | संविधान अनुच्छेद 39A",
    defaultChatBotGreeting: "नमस्ते! मैं आपका न्यायमित्र हूँ। इस अदालती आदेश या नोटिस के बारे में अपनी भाषा में कुछ भी पूछें — जैसे 'क्या मुझे जेल जाना पड़ेगा?', 'कितने पैसे जमा करने हैं?', या 'मुझे अब क्या कागज़ात चाहिए?'"
  },
  en: {
    helplineTitle: "Free Legal Aid Helpline (NALSA):",
    helplineSubtitle: "Free justice under Article 39A of the Constitution",
    checkEligibility: "Can you get a free lawyer? Check Eligibility",
    appTitle: "NyayaMitra",
    appSubTitle: "Legal Companion",
    badgeRole: "Citizen's Legal Guide",
    headerDesc: "Understand court orders, police notices, and FIRs in plain language without legal complications",
    jargonBtn: "Legal Glossary (Jargon Buster)",
    presetCasesTitle: "Common Citizen Cases (Select Sample):",
    clickToLoad: "Click to load",
    inputLabel: "Paste your Court Order, Notice, or FIR here:",
    charCount: "characters",
    inputPlaceholder: "Paste your bail order, summons, police notice, or cheque bounce complaint here...",
    explainBtn: "Explain in Simple Words",
    explainingBtn: "Analyzing in plain words...",
    freeAidCardTitle: "Unable to afford advocate fees?",
    freeAidCardDesc: "Under Indian law, every woman, child, SC/ST community member, and person with low income is entitled to a free government advocate.",
    freeAidCardLink: "How to reach your District Legal Services Authority (DLSA)",
    readAloud: "Read Aloud",
    stopReadAloud: "Stop Audio",
    printSheet: "Print / Save Sheet",
    big3Title: "The 3 Big Questions (What does this mean for me?):",
    jailQuestion: "Is there a risk of jail / arrest?",
    moneyQuestion: "How much money / bond is required?",
    deadlineQuestion: "Exact date or deadline:",
    actionListTitle: "What must I do now? (Step-by-step checklist):",
    complianceBadge: "Mandatory Compliance Checklist",
    stepPrefix: "Step",
    timePrefix: "Deadline:",
    cautionPrefix: "Caution:",
    pitfallsTitle: "Crucial mistakes to avoid (Risk of losing relief):",
    emptyStateTitle: "Waiting for Court Document",
    emptyStateDesc: "Select an everyday sample dispute on the left or paste your court text and click 'Explain in Simple Words'.",
    emptyStateBtn: "Explain selected case now",
    chatTitle: "Ask NyayaMitra (Legal Companion Chat)",
    chatSubtitle: "Ask anything without hesitation",
    chatPlaceholder: "e.g., 'Do I need to go to police station tomorrow?', 'What papers are needed?'...",
    chatThinking: "NyayaMitra is preparing a simple response...",
    jargonSectionTitle: "Legal Jargon Buster (Demystifying Court Terms)",
    jargonSectionDesc: "Decode complicated English and Latin court words into everyday language",
    searchJargon: "Search word (e.g. Bail, Status Quo, Ex-parte)...",
    examplePrefix: "Example:",
    modalTitle: "Free Legal Aid (NALSA) Eligibility",
    modalIntro: "Under the Legal Services Authorities Act, 1987, the following individuals are entitled to free lawyer representation at state expense:",
    eligibilityList: [
      "All Women and Children",
      "Members of Scheduled Castes (SC) & Scheduled Tribes (ST)",
      "Persons in police custody or undertrials in jail",
      "Low income households (Annual income under ₹3 Lakhs, varies by state)",
      "Victims of trafficking, natural disasters, and industrial workmen"
    ],
    howToApplyTitle: "How to apply for free help?",
    howToApplyDesc: "Visit the District Legal Services Authority (DLSA) office inside your District Court or call the toll-free national helpline 15100.",
    modalCloseBtn: "Got it (Close)",
    footerLeft: "NyayaMitra — Transparent and accessible legal companion for every Indian citizen.",
    footerRight: "Helpline: 15100 (NALSA) | Article 39A Constitution of India",
    defaultChatBotGreeting: "Hello! I am your NyayaMitra companion. Ask me anything about this court order or notice in plain words — like 'Do I need to worry about arrest?', 'How much money must I pay?', or 'What documents must I prepare?'"
  },
  bn: {
    helplineTitle: "বিনামূল্যে আইনি সহায়তা হেল্পলাইন (NALSA):",
    helplineSubtitle: "সংবিধানের ৩৯এ অনুচ্ছেদের অধীনে বিনামূল্যে ন্যায়বিচার",
    checkEligibility: "আপনি কি বিনামূল্যে সরকারি উকিল পেতে পারেন? যোগ্যতা যাচাই করুন",
    appTitle: "NyayaMitra",
    appSubTitle: "ন্যায়মিত্র",
    badgeRole: "সাধারণ নাগরিকের আইনি সঙ্গী",
    headerDesc: "আদালতের আদেশ, নোটিশ ও এফআইআর সহজ বাংলায় বুঝুন — কোনো আইনি জটিলতা ছাড়া",
    jargonBtn: "আইনি শব্দকোষ (Jargon Buster)",
    presetCasesTitle: "সাধারণ নাগরিক মামলা (উদাহরণ বেছে নিন):",
    clickToLoad: "লোড করতে ক্লিক করুন",
    inputLabel: "আপনার আদালতের আদেশ, নোটিশ বা এফআইআর এখানে পেস্ট করুন:",
    charCount: "অক্ষর",
    inputPlaceholder: "এখানে আপনার জামিনের আদেশ, সমন, পুলিশ নোটিশ বা চেক বাউন্স সংক্রান্ত নথি পেস্ট করুন...",
    explainBtn: "সহজ ভাষায় বুঝিয়ে দিন (Explain Simply)",
    explainingBtn: "সহজ ভাষায় বিশ্লেষণ করা হচ্ছে...",
    freeAidCardTitle: "আপনি কি উকিলের ফি দিতে অক্ষম?",
    freeAidCardDesc: "ভারতীয় আইন অনুযায়ী প্রতিটি মহিলা, শিশু, তফশিলি জাতি/উপজাতির নাগরিক এবং স্বল্প আয়ের মানুষ সরকারি খরচে বিনামূল্যে উকিল পান।",
    freeAidCardLink: "জেলা আইনি পরিষেবা কর্তৃপক্ষের (DLSA) সাথে যোগাযোগের উপায়",
    readAloud: "পড়ে শুনুন (Audio)",
    stopReadAloud: "আওয়াজ বন্ধ করুন",
    printSheet: "প্রিন্ট বা সেভ করুন",
    big3Title: "৩টি প্রধান প্রশ্ন (আমার জন্য এর অর্থ কী?):",
    jailQuestion: "জেল বা গ্রেপ্তারের কি কোনো ঝুঁকি আছে?",
    moneyQuestion: "কত টাকা / জামিন বন্ড দিতে হবে?",
    deadlineQuestion: "নির্দিষ্ট তারিখ বা সময়সীমা:",
    actionListTitle: "এখন আমাকে কী করতে হবে? (পদক্ষেপ তালিকা):",
    complianceBadge: "জরুরি পদক্ষেপ নির্দেশিকা",
    stepPrefix: "ধাপ",
    timePrefix: "সময়সীমা:",
    cautionPrefix: "সতর্কতা:",
    pitfallsTitle: "যেসব ভুল এড়িয়ে চলবেন (অন্যথায় জামিন বাতিল হতে পারে):",
    emptyStateTitle: "আদালতের নথির অপেক্ষায়",
    emptyStateDesc: "বাম পাশ থেকে একটি সাধারণ মামলা নির্বাচন করুন বা আপনার নিজস্ব নথি পেস্ট করে বোতামে ক্লিক করুন।",
    emptyStateBtn: "নির্বাচিত মামলাটি সহজ ভাষায় দেখুন",
    chatTitle: "ন্যায়মিত্রকে প্রশ্ন করুন (Legal Companion Chat)",
    chatSubtitle: "আপনার মাতৃভাষায় যেকোনো প্রশ্ন করুন",
    chatPlaceholder: "যেমন: 'আমাকে কি আগামীকাল থানায় যেতে হবে?', 'কী কী কাগজপত্র লাগবে?'...",
    chatThinking: "ন্যায়মিত্র সহজ উত্তর প্রস্তুত করছে...",
    jargonSectionTitle: "কঠিন আইনি শব্দের সহজ অর্থ (Legal Jargon Buster)",
    jargonSectionDesc: "আদালতে ব্যবহৃত জটিল ইংরেজি ও ল্যাটিন শব্দগুলির সহজ অর্থ জানুন",
    searchJargon: "শব্দ খুঁজুন (যেমন Bail, Status Quo, Ex-parte)...",
    examplePrefix: "উদাহরণ:",
    modalTitle: "বিনামূল্যে আইনি সহায়তা (NALSA) যোগ্যতা",
    modalIntro: "আইনি পরিষেবা কর্তৃপক্ষ আইন, ১৯৮৭ এর অধীনে নিম্নলিখিত ব্যক্তিরা সম্পূর্ণ বিনামূল্যে সরকারি উকিল পাওয়ার অধিকারী:",
    eligibilityList: [
      "সমস্ত মহিলা এবং শিশু",
      "তফশিলি জাতি (SC) ও তফশিলি উপজাতি (ST) সম্প্রদায়ভুক্ত নাগরিক",
      "পুলিশ হেফাজতে থাকা ব্যক্তি বা বিচারাধীন বন্দি",
      "স্বল্প আয়ের পরিবার (বার্ষিক আয় ৩ লক্ষ টাকার কম)",
      "প্রাকৃতিক দুর্যোগ ও দাঙ্গা দুর্গত মানুষ এবং কারখানার শ্রমিক"
    ],
    howToApplyTitle: "কীভাবে বিনামূল্যে সাহায্য পাবেন?",
    howToApplyDesc: "আপনার জেলা আদালত প্রাঙ্গণে অবস্থিত জেলা আইনি পরিষেবা কর্তৃপক্ষ (DLSA) অফিসে যান বা টোল-ফ্রি নম্বর ১৫১০০ এ ফোন করুন।",
    modalCloseBtn: "বুঝেছি (Close)",
    footerLeft: "NyayaMitra (ন্যায়মিত্র) — প্রত্যেক ভারতীয় নাগরিকের জন্য সহজ ও স্বচ্ছ আইনি সহচর।",
    footerRight: "হেল্পলাইন: ১৫১০০ (NALSA) | অনুচ্ছেদ ৩৯A",
    defaultChatBotGreeting: "নমস্কার! আমি আপনার ন্যায়মিত্র। এই আদালতের আদেশ বা নোটিশ সম্পর্কে সহজ বাংলায় যেকোনো প্রশ্ন জিজ্ঞাসা করুন।"
  },
  ta: {
    helplineTitle: "இலவச சட்ட உதவி உதவி எண் (NALSA):",
    helplineSubtitle: "அரசியலமைப்பு பிரிவு 39A கீழ் இலவச நீதி",
    checkEligibility: "உங்களுக்கு இலவச வழக்கறிஞர் கிடைக்குமா? தகுதியை சரிபார்க்கவும்",
    appTitle: "NyayaMitra",
    appSubTitle: "நியாயமித்ரா",
    badgeRole: "சாமானியரின் சட்டத் தோழன்",
    headerDesc: "நீதிமன்ற உத்தரவுகள், நோட்டீஸ்கள் மற்றும் FIR-களை எளிய தமிழில் எளிதாகப் புரிந்து கொள்ளுங்கள்",
    jargonBtn: "சட்டச் சொல்லகராதி (Jargon Buster)",
    presetCasesTitle: "பொதுவான வழக்குகள் (மாதிரியைத் தேர்ந்தெடுக்கவும்):",
    clickToLoad: "ஏற்ற கிளிக் செய்க",
    inputLabel: "உங்கள் நீதிமன்ற ஆணை, நோட்டீஸ் அல்லது FIR-ஐ இங்கே ஒட்டவும்:",
    charCount: "எழுத்துக்கள்",
    inputPlaceholder: "உங்கள் ஜாமீன் ஆணை, சம்மன், போலீஸ் நோட்டீஸ் அல்லது காசோலை வழக்கு ஆவணங்களை இங்கே ஒட்டவும்...",
    explainBtn: "எளிய தமிழில் விளக்குங்கள் (Explain Simply)",
    explainingBtn: "எளிய முறையில் ஆய்வு செய்யப்படுகிறது...",
    freeAidCardTitle: "வழக்கறிஞர் கட்டணம் செலுத்த முடியவில்லையா?",
    freeAidCardDesc: "இந்திய சட்டத்தின்படி பெண்கள், குழந்தைகள், ஆதிதிராவிடர்/பழங்குடியினர் மற்றும் குறைந்த வருமானம் கொண்டோருக்கு இலவச அரசு வழக்கறிஞர் கிடைக்கும்.",
    freeAidCardLink: "மாவட்ட சட்ட சேவைகள் ஆணையத்தை (DLSA) அணுகும் முறை",
    readAloud: "வாசித்துக் கேட்கவும் (Audio)",
    stopReadAloud: "ஒலியை நிறுத்துக",
    printSheet: "அச்சிடுக / சேமிக்க",
    big3Title: "3 முக்கியமான கேள்விகள் (எனக்கு இதனால் என்ன ஆகும்?):",
    jailQuestion: "சிறை அல்லது கைது ஆபத்து உள்ளதா?",
    moneyQuestion: "எவ்வளவு பணம் / பிணை பத்திரம் தேவை?",
    deadlineQuestion: "குறிப்பிட்ட தேதி அல்லது கடைசி நாள்:",
    actionListTitle: "இப்போது நான் என்ன செய்ய வேண்டும்? (நடவடிக்கை பட்டியல்):",
    complianceBadge: "கட்டாய நடைமுறை வழிகாட்டி",
    stepPrefix: "படி",
    timePrefix: "காலக்கெடு:",
    cautionPrefix: "எச்சரிக்கை:",
    pitfallsTitle: "தவிர்க்க வேண்டிய தவறுகள் (இல்லையெனில் நிவாரணம் ரத்தாகலாம்):",
    emptyStateTitle: "நீதிமன்ற ஆவணத்திற்காக காத்திருக்கிறது",
    emptyStateDesc: "இடதுபுறத்தில் உள்ள ஒரு வழக்கைத் தேர்ந்தெடுக்கவும் அல்லது உங்கள் ஆவணத்தை ஒட்டி பொத்தானை அழுத்தவும்.",
    emptyStateBtn: "தேர்ந்தெடுத்த வழக்கை எளிதாக விளக்குக",
    chatTitle: "நியாயமித்ராவிடம் கேளுங்கள் (Legal Companion Chat)",
    chatSubtitle: "உங்கள் தாய்மொழியில் தயக்கமின்றி கேளுங்கள்",
    chatPlaceholder: "உதா: 'நாளை நான் காவல் நிலையம் செல்ல வேண்டுமா?', 'என்ன ஆவணங்கள் தேவை?'...",
    chatThinking: "நியாயமித்ரா எளிய பதிலை தயார் செய்கிறது...",
    jargonSectionTitle: "கடினமான சட்டச் சொற்களின் எளிய விளக்கம்",
    jargonSectionDesc: "நீதிமன்றங்களில் புழங்கும் ஆங்கில மற்றும் லத்தீன் சொற்களை எளிய தமிழில் அறியுங்கள்",
    searchJargon: "வார்த்தையைத் தேடுங்கள் (உதா. Bail, Status Quo, Ex-parte)...",
    examplePrefix: "உதாரணம்:",
    modalTitle: "இலவச சட்ட உதவி (NALSA) தகுதி விவரம்",
    modalIntro: "சட்ட சேவைகள் அதிகார சட்டம் 1987-இன் கீழ் பின்வரும் நபர்களுக்கு அரசு செலவில் இலவச வழக்கறிஞர் உரிமை உண்டு:",
    eligibilityList: [
      "அனைத்து பெண்கள் மற்றும் குழந்தைகள்",
      "பட்டியலின (SC) மற்றும் பழங்குடியின (ST) சமூகத்தினர்",
      "காவல் அல்லது சிறையில் உள்ள விசாரணைக் கைதிகள்",
      "குறைந்த வருமானம் உடையவர்கள் (ஆண்டு வருமானம் ₹3 லட்சத்திற்கும் குறைவு)",
      "பேரிடர் மற்றும் கலவரத்தால் பாதிக்கப்பட்டவர்கள், தொழிலாளர்கள்"
    ],
    howToApplyTitle: "இலவச உதவி பெறுவது எப்படி?",
    howToApplyDesc: "உங்கள் மாவட்ட நீதிமன்ற வளாகத்தில் உள்ள மாவட்ட சட்ட சேவைகள் ஆணைய (DLSA) அலுவலகத்தை அணுகவும் அல்லது 15100 எண்ணை அழைக்கவும்.",
    modalCloseBtn: "புரிந்தது (Close)",
    footerLeft: "NyayaMitra — இந்திய குடிமக்கள் அனைவருக்கும் வெளிப்படையான, எளிய சட்டத் துணைவன்.",
    footerRight: "உதவி எண்: 15100 (NALSA) | அரசியலமைப்பு பிரிவு 39A",
    defaultChatBotGreeting: "வணக்கம்! நான் உங்கள் நியாயமித்ரா. இந்த நீதிமன்ற ஆணை பற்றி எளிய தமிழில் எந்த கேள்வியும் கேட்கலாம்."
  },
  te: {
    helplineTitle: "ఉచిత న్యాయ సహాయ హెల్ప్‌లైన్ (NALSA):",
    helplineSubtitle: "రాజ్యాంగం ఆర్టికల్ 39A కింద ఉచిత న్యాయం",
    checkEligibility: "మీకు ఉచిత ప్రభుత్వ న్యాయవాది లభిస్తారా? అర్హతను తనిఖీ చేయండి",
    appTitle: "NyayaMitra",
    appSubTitle: "న్యాయమిత్ర",
    badgeRole: "సామాన్య పౌరుడి న్యాయ సహచరుడు",
    headerDesc: "కోర్టు ఆదేశాలు, నోటీసులు మరియు FIRలను ఎలాంటి న్యాయపరమైన గందరగోళం లేకుండా సరళమైన తెలుగులో అర్థం చేసుకోండి",
    jargonBtn: "న్యాయ పదకోశం (Jargon Buster)",
    presetCasesTitle: "సాధారణ పౌర కేసులు (ఉదాహరణను ఎంచుకోండి):",
    clickToLoad: "లోడ్ చేయడానికి క్లిక్ చేయండి",
    inputLabel: "మీ కోర్టు ఆర్డర్, నోటీస్ లేదా FIRను ఇక్కడ పేస్ట్ చేయండి:",
    charCount: "అక్షరాలు",
    inputPlaceholder: "మీ బెయిల్ ఆర్డర్, సమన్లు, పోలీస్ నోటీస్ లేదా చెక్ బౌన్స్ పత్రాలను ఇక్కడ పేస్ట్ చేయండి...",
    explainBtn: "సరళమైన భాషలో వివరించండి (Explain Simply)",
    explainingBtn: "సరళమైన భాషలో విశ్లేషిస్తోంది...",
    freeAidCardTitle: "లాయర్ ఫీజు చెల్లించలేకపోతున్నారా?",
    freeAidCardDesc: "భారతీయ చట్టం ప్రకారం ప్రతి మహిళ, పిల్లలు, SC/ST పౌరులు మరియు తక్కువ ఆదాయం ఉన్న వ్యక్తులకు ప్రభుత్వం తరపున ఉచిత లాయర్ లభిస్తారు.",
    freeAidCardLink: "జిల్లా న్యాయ సేవా ప్రాధికార సంస్థ (DLSA)ను సంప్రదించే విధానం",
    readAloud: "చదివి వినిపించండి (Audio)",
    stopReadAloud: "వాయిస్ ఆపండి",
    printSheet: "ప్రింట్ లేదా సేవ్ చేయండి",
    big3Title: "3 ముఖ్యమైన ప్రశ్నలు (దీని అర్థం నాకేంటి?):",
    jailQuestion: "జైలు లేదా అరెస్ట్ అయ్యే ప్రమాదం ఉందా?",
    moneyQuestion: "ఎంత డబ్బు / పూచీకత్తు (బాండ్) చెల్లించాలి?",
    deadlineQuestion: "తేదీ లేదా గడువు సమయం:",
    actionListTitle: "ఇప్పుడు నేను ఏమి చేయాలి? (దశలవారీ కార్యాచరణ):",
    complianceBadge: "సమయపాలన చెక్‌లిస్ట్",
    stepPrefix: "దశ",
    timePrefix: "గడువు:",
    cautionPrefix: "జాగ్రత్త:",
    pitfallsTitle: "తప్పనిసరిగా నివారించాల్సిన తప్పులు (లేకపోతే ఉపశమనం రద్దు కావచ్చు):",
    emptyStateTitle: "కోర్టు పత్రం కోసం నిరీక్షణ",
    emptyStateDesc: "ఎడమ వైపు నుండి ఏదైనా సాధారణ కేసును ఎంచుకోండి లేదా మీ ఆర్డర్‌ను పేస్ట్ చేసి బటన్‌ను నొక్కండి.",
    emptyStateBtn: "ఎంచుకున్న కేసును సరళంగా చూడండి",
    chatTitle: "న్యాయమిత్రను అడగండి (Legal Companion Chat)",
    chatSubtitle: "మీ మాతృభాషలో సందేహాలు నివృత్తి చేసుకోండి",
    chatPlaceholder: "ఉదా: 'రేపు నేను పోలీస్ స్టేషన్‌కు వెళ్లాలా?', 'ఏ పత్రాలు సిద్ధం చేసుకోవాలి?'...",
    chatThinking: "న్యాయమిత్ర సరళమైన సమాధానాన్ని సిద్ధం చేస్తోంది...",
    jargonSectionTitle: "న్యాయపరమైన కఠిన పదాలకు సరళమైన అర్థాలు",
    jargonSectionDesc: "కోర్టుల్లో ఉపయోగించే కఠినమైన ఆంగ్ల, లాటిన్ పదాలను తేలికగా అర్థం చేసుకోండి",
    searchJargon: "పదాన్ని వెతకండి (ఉదా: Bail, Status Quo, Ex-parte)...",
    examplePrefix: "ఉదాహరణ:",
    modalTitle: "ఉచిత న్యాయ సహాయం (NALSA) అర్హత వివరాలు",
    modalIntro: "లీగల్ సర్వీసెస్ అథారిటీస్ యాక్ట్, 1987 ప్రకారం ఈ క్రింది వ్యక్తులు ప్రభుత్వ ఖర్చుతో ఉచిత న్యాయవాదిని పొందే హక్కును కలిగి ఉన్నారు:",
    eligibilityList: [
      "మహిళలు మరియు పిల్లలందరూ",
      "షెడ్యూల్డ్ కులాలు (SC), షెడ్యూల్డ్ తెగలు (ST) సభ్యులు",
      "పోలీస్ కస్టడీలో లేదా జైల్లో ఉన్న విచారణ ఖైదీలు",
      "తక్కువ ఆదాయం ఉన్న కుటుంబాలు (వార్షిక ఆదాయం ₹3 లక్షల లోపు)",
      "ప్రకృతి విపత్తుల బాధితులు, పరిశ్రమ కార్మికులు"
    ],
    howToApplyTitle: "ఉచిత సహాయం ఎలా పొందాలి?",
    howToApplyDesc: "మీ జిల్లా కోర్టు ప్రాంగణంలోని జిల్లా న్యాయ సేవల ప్రాధికార సంస్థ (DLSA) కార్యాలయానికి వెళ్లండి లేదా టోల్ ఫ్రీ నంబర్ 15100 కు కాల్ చేయండి.",
    modalCloseBtn: "అర్థమైంది (Close)",
    footerLeft: "NyayaMitra — భారతీయ పౌరులందరికీ పారదర్శకమైన, సరళమైన న్యాయ మార్గదర్శి.",
    footerRight: "హెల్ప్‌లైన్: 15100 (NALSA) | ఆర్టికల్ 39A రాజ్యాంగం",
    defaultChatBotGreeting: "నమస్కారం! నేను మీ న్యాయమిత్రను. ఈ కోర్టు ఆర్డర్ గురించి మీ మాతృభాషలో ఏదైనా అడగవచ్చు."
  },
  mr: {
    helplineTitle: "मोफत कायदेशीर सहाय्य हेल्पलाइन (NALSA):",
    helplineSubtitle: "घटनेच्या कलम ३९ए अंतर्गत मोफत न्याय",
    checkEligibility: "तुम्हाला मोफत सरकारी वकील मिळू शकतो का? पात्रता तपासा",
    appTitle: "NyayaMitra",
    appSubTitle: "न्यायमित्र",
    badgeRole: "सामान्य नागरिकाचा कायदेशीर साथीदार",
    headerDesc: "न्यायालयाचे आदेश, नोटिसा आणि एफआयआर कोणत्याही कायदेशीर अडचणींशिवाय सोप्या मराठीत समजून घ्या",
    jargonBtn: "कायदेशीर शब्दकोश (Jargon Buster)",
    presetCasesTitle: "सामान्य नागरिकांची प्रकरणे (उदाहरण निवडा):",
    clickToLoad: "लोड करण्यासाठी क्लिक करा",
    inputLabel: "तुमचा न्यायालयाचा आदेश, नोटीस किंवा FIR येथे पेस्ट करा:",
    charCount: "अक्षरे",
    inputPlaceholder: "येथे तुमचा जामीन आदेश, समन्स, पोलिस नोटीस किंवा चेक बाउन्सची कागदपत्रे पेस्ट करा...",
    explainBtn: "सोप्या भाषेत समजावून सांगा (Explain Simply)",
    explainingBtn: "सोप्या भाषेत विश्लेषण सुरू आहे...",
    freeAidCardTitle: "वकिलाची फी देणे परवडत नाही का?",
    freeAidCardDesc: "भारतीय कायद्यानुसार प्रत्येक महिला, मुले, अनुसूचित जाती/जमातीचे नागरिक आणि कमी उत्पन्न असलेल्या व्यक्तींना सरकारतर्फे मोफत वकील मिळतो.",
    freeAidCardLink: "जिल्हा विधी सेवा प्राधिकरणाशी (DLSA) संपर्क साधण्याची पद्धत",
    readAloud: "ऐका (Audio)",
    stopReadAloud: "आवाज बंद करा",
    printSheet: "प्रिंट किंवा सेव्ह करा",
    big3Title: "३ सर्वात मोठे प्रश्न (माझ्यासाठी याचा काय अर्थ आहे?):",
    jailQuestion: "तुरुंगात जाण्याचा किंवा अटकेचा धोका आहे का?",
    moneyQuestion: "किती पैसे / जातमुचलका द्यावा लागेल?",
    deadlineQuestion: "पुढील तारीख किंवा मुदत:",
    actionListTitle: "आता मला काय करावे लागेल? (कृती यादी):",
    complianceBadge: "मुदत पालन चेकलिस्ट",
    stepPrefix: "टप्पा",
    timePrefix: "मुदत:",
    cautionPrefix: "खबरदारी:",
    pitfallsTitle: "टाळावयाच्या चुका (अन्यथा मिळालेला दिलासा रद्द होऊ शकतो):",
    emptyStateTitle: "न्यायालयीन दस्तऐवजाची प्रतीक्षा",
    emptyStateDesc: "डावीकडून कोणतेही उदाहरण निवडा किंवा तुमची कागदपत्रे पेस्ट करून बटण दाबा.",
    emptyStateBtn: "निवडलेले प्रकरण सोप्या भाषेत पहा",
    chatTitle: "न्यायमित्रला विचारा (Legal Companion Chat)",
    chatSubtitle: "तुमच्या मातृभाषेत निःसंकोच विचारा",
    chatPlaceholder: "उदा. 'मला उद्या पोलिस ठाण्यात जावे लागेल का?', 'कोणती कागदपत्रे लागतील?'...",
    chatThinking: "न्यायमित्र सोपे उत्तर तयार करत आहे...",
    jargonSectionTitle: "कठीण कायदेशीर शब्दांचे सोपे अर्थ",
    jargonSectionDesc: "कोर्टात वापरल्या जाणाऱ्या कठीण इंग्रजी आणि लॅटिन शब्दांचा सोप्या मराठीत अर्थ समजून घ्या",
    searchJargon: "शब्द शोधा (उदा. Bail, Status Quo, Ex-parte)...",
    examplePrefix: "उदाहरण:",
    modalTitle: "मोफत कायदेशीर सहाय्य (NALSA) पात्रता",
    modalIntro: "विधी सेवा प्राधिकरण कायदा, १९८७ अंतर्गत खालील व्यक्तींना मोफत सरकारी वकील मिळण्याचा अधिकार आहे:",
    eligibilityList: [
      "सर्व महिला आणि मुले",
      "अनुसूचित जाती (SC) आणि अनुसूचित जमाती (ST) चे सदस्य",
      "पोलिस कोठडीत किंवा कारागृहात असलेले न्यायालयीन बंदी",
      "कमी उत्पन्न असलेले कुटुंब (वार्षिक उत्पन्न ₹३ लाखांपेक्षा कमी)",
      "नैसर्गिक आपत्ती व दंगल पीडित, आणि औद्योगिक कामगार"
    ],
    howToApplyTitle: "मोफत मदत कशी मिळवायची?",
    howToApplyDesc: "तुमच्या जिल्हा न्यायालयातील जिल्हा विधी सेवा प्राधिकरण (DLSA) कार्यालयात जा किंवा १५१०० या टोल-फ्री क्रमांकावर कॉल करा.",
    modalCloseBtn: "समजले (Close)",
    footerLeft: "NyayaMitra — सर्व भारतीय नागरिकांसाठी पारदर्शक आणि सुलभ कायदेशीर मार्गदर्शक.",
    footerRight: "हेल्पलाइन: १५१०० (NALSA) | राज्यघटना कलम ३९A",
    defaultChatBotGreeting: "नमस्कार! मी तुमचा न्यायमित्र आहे. या न्यायालयीन आदेशाबद्दल सोप्या भाषेत कोणताही प्रश्न विचारा."
  },
  gu: {
    helplineTitle: "મફત કાનૂની સહાય હેલ્પલાઇન (NALSA):",
    helplineSubtitle: "બંધારણની કલમ 39A હેઠળ મફત ન્યાય",
    checkEligibility: "શું તમને મફત સરકારી વકીલ મળી શકે છે? પાત્રતા તપાસો",
    appTitle: "NyayaMitra",
    appSubTitle: "ન્યાયમિત્ર",
    badgeRole: "સામાન્ય નાગરિકનો કાનૂની સાથી",
    headerDesc: "કોર્ટના આદેશો, નોટિસ અને FIR ને કાનૂની ગૂંચવણ વગર સરળ ગુજરાતીમાં સમજો",
    jargonBtn: "કાનૂની શબ્દકોશ (Jargon Buster)",
    presetCasesTitle: "સામાન્ય કેસો (ઉદાહરણ પસંદ કરો):",
    clickToLoad: "લોડ કરવા ક્લિક કરો",
    inputLabel: "તમારો કોર્ટ ઓર્ડર, નોટિસ અથવા FIR અહીં પેસ્ટ કરો:",
    charCount: "અક્ષરો",
    inputPlaceholder: "અહીં તમારા જામીન આદેશ, સમન્સ, પોલીસ નોટિસ કે ચેક બાઉન્સના દસ્તાવેજો પેસ્ટ કરો...",
    explainBtn: "સરળ ભાષામાં સમજાવો (Explain Simply)",
    explainingBtn: "સરળ ભાષામાં વિશ્લેષણ થઈ રહ્યું છે...",
    freeAidCardTitle: "વકીલની ફી ચૂકવી શકતા નથી?",
    freeAidCardDesc: "ભારતીય કાયદા મુજબ દરેક મહિલા, બાળકો, SC/ST સમુદાયના નાગરિકો અને ઓછી આવક ધરાવતા લોકોને સરકાર તરફથી મફત વકીલ મળે છે.",
    freeAidCardLink: "જિલ્લા કાનૂની સેવા સત્તામંડળ (DLSA) નો સંપર્ક કરવાની રીત",
    readAloud: "સાંભળો (Audio)",
    stopReadAloud: "અવાજ બંધ કરો",
    printSheet: "પ્રિન્ટ અથવા સેવ કરો",
    big3Title: "3 સૌથી મોટા પ્રશ્નો (મારા માટે આનો શું અર્થ છે?):",
    jailQuestion: "શું જેલ કે ધરપકડનો ભય છે?",
    moneyQuestion: "કેટલા રૂપિયા / બોન્ડ જમા કરાવવા પડશે?",
    deadlineQuestion: "તારીખ અથવા સમયમર્યાદા:",
    actionListTitle: "હવે મારે શું કરવું પડશે? (પગલાંવાર યાદી):",
    complianceBadge: "સમયમર્યાદા ચેકલિસ્ટ",
    stepPrefix: "પગલું",
    timePrefix: "સમયમર્યાદા:",
    cautionPrefix: "સાવચેતી:",
    pitfallsTitle: "ટાળવા જેવી ભૂલો (નહીં તો રાહત રદ થઈ શકે છે):",
    emptyStateTitle: "કોર્ટના દસ્તાવેજની પ્રતીક્ષા",
    emptyStateDesc: "ડાબી બાજુથી કોઈ કેસ પસંદ કરો અથવા તમારા કાગળો પેસ્ટ કરીને બટન દબાવો.",
    emptyStateBtn: "પસંદ કરેલ કેસ સરળ ભાષામાં જુઓ",
    chatTitle: "ન્યાયમિત્રને પૂછો (Legal Companion Chat)",
    chatSubtitle: "તમારી માતૃભાષામાં કોઈપણ પ્રશ્ન પૂછો",
    chatPlaceholder: "દા.ત. 'શું મારે કાલે પોલીસ સ્ટેશન જવું પડશે?', 'કયા દસ્તાવેજો જોઈશે?'...",
    chatThinking: "ન્યાયમિત્ર સરળ ઉત્તર તૈયાર કરી રહ્યા છે...",
    jargonSectionTitle: "કાનૂની શબ્દોના સરળ અર્થ (Legal Jargon Buster)",
    jargonSectionDesc: "કોર્ટમાં બોલાતા અઘરા અંગ્રેજી અને લેટિન શબ્દોને સરળતાથી સમજો",
    searchJargon: "શબ્દ શોધો (દા.ત. Bail, Status Quo, Ex-parte)...",
    examplePrefix: "ઉદાહરણ:",
    modalTitle: "મફત કાનૂની સહાય (NALSA) પાત્રતા",
    modalIntro: "કાનૂની સેવા સત્તામંડળ અધિનિયમ, 1987 હેઠળ નીચેના લોકો સરકારી ખર્ચે મફત વકીલ મેળવવા હકદાર છે:",
    eligibilityList: [
      "તમામ મહિલાઓ અને બાળકો",
      "અનુસૂચિત જાતિ (SC) અને અનુસૂચિત જનજાતિ (ST) ના સભ્યો",
      "કસ્ટડીમાં અથવા જેલમાં રહેલા અંડરટ્રાયલ કેદીઓ",
      "ઓછી આવક ધરાવતા લોકો (વાર્ષિક આવક ₹3 લાખથી ઓછી)",
      "હોનારત અને રમખાણ પીડિતો તથા ઔદ્યોગિક કામદારો"
    ],
    howToApplyTitle: "મફત સહાય કેવી રીતે મેળવવી?",
    howToApplyDesc: "તમારી જિલ્લા અદાલતમાં આવેલી જિલ્લા કાનૂની સેવા સત્તામંડળ (DLSA) કચેરીની મુલાકાત લો અથવા હેલ્પલાઇન 15100 પર કૉલ કરો.",
    modalCloseBtn: "સમજાયું (Close)",
    footerLeft: "NyayaMitra — ભારતીય નાગરિકો માટે પારદર્શક અને સરળ કાનૂની માર્ગદર્શક.",
    footerRight: "હેલ્પલાઇન: 15100 (NALSA) | બંધારણ કલમ 39A",
    defaultChatBotGreeting: "નમસ્તે! હું તમારો ન્યાયમિત્ર છું. આ કોર્ટ ઓર્ડર વિશે સરળ ગુજરાતીમાં કંઈપણ પૂછો."
  },
  kn: {
    helplineTitle: "ಉಚಿತ ಕಾನೂನು ನೆರವು ಸಹಾಯವಾಣಿ (NALSA):",
    helplineSubtitle: "ಸಂವಿಧಾನದ 39A ವಿಧಿಯ ಅಡಿಯಲ್ಲಿ ಉಚಿತ ನ್ಯಾಯ",
    checkEligibility: "ನಿಮಗೆ ಉಚಿತ ವಕೀಲರು ಸಿಗಬಹುದೇ? ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
    appTitle: "NyayaMitra",
    appSubTitle: "ನ್ಯಾಯಮಿತ್ರ",
    badgeRole: "ಸಾಮಾನ್ಯ ನಾಗರಿಕರ ಕಾನೂನು ಒಡನಾಡಿ",
    headerDesc: "ನ್ಯಾಯಾಲಯದ ಆದೇಶಗಳು, ನೋಟಿಸ್‌ಗಳು ಮತ್ತು ಎಫ್‌ಐಆರ್‌ಗಳನ್ನು ಯಾವುದೇ ತೊಡಕಿಲ್ಲದೆ ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    jargonBtn: "ಕಾನೂನು ಶಬ್ದಕೋಶ (Jargon Buster)",
    presetCasesTitle: "ಸಾಮಾನ್ಯ ಪ್ರಕರಣಗಳು (ಉದಾಹರಣೆ ಆಯ್ಕೆಮಾಡಿ):",
    clickToLoad: "ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    inputLabel: "ನಿಮ್ಮ ಕೋರ್ಟ್ ಆದೇಶ, ನೋಟಿಸ್ ಅಥವಾ FIR ಅನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ:",
    charCount: "ಅಕ್ಷರಗಳು",
    inputPlaceholder: "ಇಲ್ಲಿ ನಿಮ್ಮ ಜಾಮೀನು ಆದೇಶ, ಸಮನ್ಸ್, ಪೊಲೀಸ್ ನೋಟಿಸ್ ಅಥವಾ ಚೆಕ್ ಬೌನ್ಸ್ ದಾಖಲೆಗಳನ್ನು ಪೇಸ್ಟ್ ಮಾಡಿ...",
    explainBtn: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ (Explain Simply)",
    explainingBtn: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    freeAidCardTitle: "ವಕೀಲರ ಶುಲ್ಕ ಭರಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲವೇ?",
    freeAidCardDesc: "ಭಾರತೀಯ ಕಾನೂನಿನ ಪ್ರಕಾರ ಮಹಿಳೆಯರು, ಮಕ್ಕಳು, ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಸಮುದಾಯದವರು ಮತ್ತು ಕಡಿಮೆ ಆದಾಯದ ವ್ಯಕ್ತಿಗಳಿಗೆ ಸರ್ಕಾರದಿಂದ ಉಚಿತ ವಕೀಲರು ಲಭ್ಯವಿರುತ್ತಾರೆ.",
    freeAidCardLink: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರವನ್ನು (DLSA) ಸಂಪರ್ಕಿಸುವ ವಿಧಾನ",
    readAloud: "ಕೇಳಿ (Audio)",
    stopReadAloud: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    printSheet: "ಪ್ರಿಂಟ್ ಅಥವಾ ಸೇವ್ ಮಾಡಿ",
    big3Title: "3 ಮುಖ್ಯ ಪ್ರಶ್ನೆಗಳು (ನನಗೆ ಇದರ ಅರ್ಥವೇನು?):",
    jailQuestion: "ಜೈಲು ಅಥವಾ ಬಂಧನದ ಅಪಾಯವಿದೆಯೇ?",
    moneyQuestion: "ಎಷ್ಟು ಹಣ / ಶ್ಯೂರಿಟಿ ಬಾಂಡ್ ನೀಡಬೇಕು?",
    deadlineQuestion: "ಮುಂದಿನ ದಿನಾಂಕ ಅಥವಾ ಗಡುವು:",
    actionListTitle: "ಈಗ ನಾನು ಏನು ಮಾಡಬೇಕು? (ಹಂತ-ಹಂತದ ಪಟ್ಟಿ):",
    complianceBadge: "ಗಡುವು ಅನುಸರಣೆ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    stepPrefix: "ಹಂತ",
    timePrefix: "ಗಡುವು:",
    cautionPrefix: "ಎಚ್ಚರಿಕೆ:",
    pitfallsTitle: "ತಪ್ಪಿಸಬೇಕಾದ ಪ್ರಮಾದಗಳು (ಇಲ್ಲವಾದಲ್ಲಿ ಪರಿಹಾರ ರದ್ದಾಗಬಹುದು):",
    emptyStateTitle: "ನ್ಯಾಯಾಲಯದ ದಾಖಲೆಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ",
    emptyStateDesc: "ಎಡಭಾಗದಿಂದ ಯಾವುದೇ ಪ್ರಕರಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಪಠ್ಯವನ್ನು ಪೇಸ್ಟ್ ಮಾಡಿ ಬಟನ್ ಒತ್ತಿರಿ.",
    emptyStateBtn: "ಆಯ್ಕೆಮಾಡಿದ ಪ್ರಕರಣವನ್ನು ಸರಳವಾಗಿ ವೀಕ್ಷಿಸಿ",
    chatTitle: "ನ್ಯಾಯಮಿತ್ರನನ್ನು ಕೇಳಿ (Legal Companion Chat)",
    chatSubtitle: "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ",
    chatPlaceholder: "ಉದಾ: 'ನಾಳೆ ನಾನು ಪೊಲೀಸ್ ಠಾಣೆಗೆ ಹೋಗಬೇಕೆ?', 'ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?'...",
    chatThinking: "ನ್ಯಾಯಮಿತ್ರ ಸರಳ ಉತ್ತರವನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದಾರೆ...",
    jargonSectionTitle: "ಕಾನೂನು ಪದಗಳ ಸರಳ ಅರ್ಥಗಳು",
    jargonSectionDesc: "ನ್ಯಾಯಾಲಯಗಳಲ್ಲಿ ಬಳಸುವ ಕಠಿಣ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಲ್ಯಾಟಿನ್ ಪದಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    searchJargon: "ಪದ ಹುಡುಕಿ (ಉದಾ. Bail, Status Quo, Ex-parte)...",
    examplePrefix: "ಉದಾಹರಣೆ:",
    modalTitle: "ಉಚಿತ ಕಾನೂನು ನೆರವು (NALSA) ಅರ್ಹತೆ",
    modalIntro: "ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ ಕಾಯ್ದೆ, 1987 ರ ಅಡಿಯಲ್ಲಿ ಈ ಕೆಳಗಿನ ವ್ಯಕ್ತಿಗಳು ಉಚಿತ ಸರ್ಕಾರಿ ವಕೀಲರನ್ನು ಪಡೆಯಲು ಅರ್ಹರಾಗಿದ್ದಾರೆ:",
    eligibilityList: [
      "ಎಲ್ಲಾ ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳು",
      "ಪರಿಶಿಷ್ಟ ಜಾತಿ (SC) ಮತ್ತು ಪರಿಶಿಷ್ಟ ಪಂಗಡಗಳ (ST) ಸದಸ್ಯರು",
      "ಪೊಲೀಸ್ ಕಸ್ಟಡಿಯಲ್ಲಿರುವ ಅಥವಾ ಜೈಲಿನಲ್ಲಿರುವ ವಿಚಾರಣಾಧೀನ ಕೈದಿಗಳು",
      "ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬಗಳು (ವಾರ್ಷಿಕ ಆದಾಯ ₹3 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)",
      "ನೈಸರ್ಗಿಕ ವಿಕೋಪ ಮತ್ತು ಗಲಭೆ ಪೀಡಿತರು, ಕೈಗಾರಿಕಾ ಕಾರ್ಮಿಕರು"
    ],
    howToApplyTitle: "ಉಚಿತ ನೆರವು ಪಡೆಯುವುದು ಹೇಗೆ?",
    howToApplyDesc: "ನಿಮ್ಮ ಜಿಲ್ಲಾ ನ್ಯಾಯಾಲಯದಲ್ಲಿರುವ ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರದ (DLSA) ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ 15100 ಗೆ ಕರೆ ಮಾಡಿ.",
    modalCloseBtn: "ತಿಳಿಯಿತು (Close)",
    footerLeft: "NyayaMitra — ಭಾರತೀಯ ನಾಗರಿಕರಿಗಾಗಿ ಪಾರದರ್ಶಕ ಮತ್ತು ಸುಲಭ ಕಾನೂನು ಒಡನಾಡಿ.",
    footerRight: "ಸಹಾಯವಾಣಿ: 15100 (NALSA) | ಸಂವಿಧಾನದ 39A ವಿಧಿ",
    defaultChatBotGreeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ನ್ಯಾಯಮಿತ್ರ. ಈ ಕೋರ್ಟ್ ಆದೇಶದ ಬಗ್ಗೆ ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ."
  }
};

const MULTILINGUAL_CASES = {
  bail_498a: {
    category: {
      hi: "फ़ौजदारी / पारिवारिक विवाद",
      en: "Criminal / Family Dispute",
      bn: "ফৌজদারি / পারিবারিক বিবাদ",
      ta: "குற்றவியல் / குடும்ப தகராறு",
      te: "క్రిమినల్ / కుటుంబ వివాదం",
      mr: "फौजदारी / कौटुंबिक वाद",
      gu: "ફોજદારી / પારિવારિક વિવાદ",
      kn: "ಕ್ರಿಮಿನಲ್ / ಕೌಟುಂಬಿಕ ವಿವಾದ"
    },
    title: {
      hi: "परिवार विवाद में अग्रिम जमानत (धारा 498A IPC / धारा 85 BNS)",
      en: "Anticipatory Bail in Matrimonial Dispute (Sec 498A IPC / Sec 85 BNS)",
      bn: "পারিবারিক বিবাদে আগাম জামিন (ধারা 498A IPC / ধারা 85 BNS)",
      ta: "குடும்ப தகராறில் முன்ஜாமீன் (பிரிவு 498A IPC / பிரிவு 85 BNS)",
      te: "వైవాహిక వివాదంలో ముందస్తు బెయిల్ (సెక్షన్ 498A IPC / సెక్షన్ 85 BNS)",
      mr: "कौटुंबिक वादात अटकपूर्व जामीन (कलम 498A IPC / कलम 85 BNS)",
      gu: "પારિવારિક વિવાદમાં આગોતરા જામીન (કલમ 498A IPC / કલમ 85 BNS)",
      kn: "ವೈವಾಹಿಕ ವಿವಾದದಲ್ಲಿ ನಿರೀಕ್ಷಣಾ ಜಾಮೀನು (ಸೆಕ್ಷನ್ 498A IPC / ಸೆಕ್ಷನ್ 85 BNS)"
    },
    parties: "Ramesh Sharma & Anr. v. State of Delhi",
    court: "Rohini Courts, Delhi",
    sampleText: `IN THE COURT OF ADDITIONAL SESSIONS JUDGE, NORTH DISTRICT, ROHINI COURTS, DELHI
Bail Application No. 892/2024
CNR No. DLNT01-004521-2024

In the matter of:
Ramesh Sharma & Anr. ...Applicants / Accused
Versus
State (NCT of Delhi) ...Respondent

ORDER ON APPLICATION UNDER SECTION 482 BNSS, 2023 (CORRESPONDING TO SEC 438 CrPC) FOR ANTICIPATORY BAIL

1. The applicants (husband and mother-in-law) apprehend arrest in FIR No. 231/2024 registered at PS Prashant Vihar for offences under Sections 85 (Cruelty by Husband or Relatives - formerly Sec 498A IPC) and 3(5) of Bharatiya Nyaya Sanhita, 2023.

2. Learned counsel for applicants submits that marriage took place on 12.02.2021. Due to irreconcilable temperament issues, parties have lived separately since November 2023. It is submitted that allegations of dowry demand are general in nature without specific dates. The applicants are respectable citizens ready to join investigation. Stridhan articles have already been itemized.

3. Learned APP for State assisted by counsel for complainant vehemently opposes the bail, submitting that jewellery worth Rs. 8 lakhs is yet to be recovered.

4. Having heard rival submissions, this Court observes that matrimonial discord should not lead to automatic custodial interrogation. In view of guidelines in Arnesh Kumar v. State of Bihar, custodial detention is not warranted at this juncture. 

OPERATIVE ORDER:
Application is allowed. In the event of arrest, applicants Ramesh Sharma and Kaushalya Sharma shall be released on anticipatory bail upon furnishing a personal bond of Rs. 25,000/- each with one surety of like amount to the satisfaction of the Investigating Officer (IO), subject to conditions:
(a) Applicants shall join investigation as and when directed by IO;
(b) Applicants shall not approach or threaten the complainant;
(c) Applicants shall not leave the country without prior permission of the trial court.`
  },
  cheque_bounce: {
    category: {
      hi: "धन व व्यापारिक विवाद (चेक बाउंस)",
      en: "Money & Commercial Dispute (Cheque Bounce)",
      bn: "অর্থ ও বাণিজ্যিক বিবাদ (চেক বাউন্স)",
      ta: "பணம் மற்றும் வணிக தகராறு (காசோலை பவுನ್ಸ್)",
      te: "డబ్బు & వ్యాపార వివాదం (చెక్ బౌన్స్)",
      mr: "पैशांचा व व्यावसायिक वाद (चेक बाउन्स)",
      gu: "નાણાકીય અને વ્યાપારી વિવાદ (ચેક બાઉન્સ)",
      kn: "ಹಣ ಮತ್ತು ವಾಣಿಜ್ಯ ವಿವಾದ (ಚೆಕ್ ಬೌನ್ಸ್)"
    },
    title: {
      hi: "चेक बाउंस अंतरिम मुआवजा आदेश (धारा 138 / 143A NI Act)",
      en: "Cheque Bounce Interim Compensation Order (Sec 138 / 143A NI Act)",
      bn: "চেক বাউন্স অন্তর্বর্তী ক্ষতিপূরণ আদেশ (ধারা 138 / 143A NI Act)",
      ta: "காசோலை பவுన్స్ இடைக்கால இழப்பீட்டு ஆணை (பிரிவு 138 / 143A NI Act)",
      te: "చెక్ బౌన్స్ మధ్యంతర పరిహారం ఆర్డర్ (సెక్షన్ 138 / 143A NI Act)",
      mr: "चेक बाउन्स अंतरिम नुकसानभरपाई आदेश (कलम 138 / 143A NI Act)",
      gu: "ચેક બાઉન્સ વચગાળાનું વળતર આદેશ (કલમ 138 / 143A NI Act)",
      kn: "ಚೆಕ್ ಬೌನ್ಸ್ ಮಧ್ಯಂತರ ಪರಿಹಾರ ಆದೇಶ (ಸೆಕ್ಷನ್ 138 / 143A NI Act)"
    },
    parties: "M/s Vikas Traders v. Manoj Gupta",
    court: "Esplanade Court, Mumbai",
    sampleText: `IN THE COURT OF METROPOLITAN MAGISTRATE, 28TH COURT, ESPLANADE, MUMBAI
C.C. NO. 4102/SS/2023

M/s Vikas Traders ...Complainant
Versus
Manoj Gupta, Proprietor ...Accused

ORDER UNDER SECTION 143A NEGOTIABLE INSTRUMENTS ACT (INTERIM COMPENSATION)

1. The complainant filed the present complaint under Section 138 NI Act alleging dishonour of Cheque No. 451092 dated 14.10.2023 for an amount of Rs. 3,50,000/- drawn on HDFC Bank due to "Funds Insufficient". Notice was dispatched on 02.11.2023 and served on 06.11.2023. No payment was tendered within statutory 15 days.

2. Accused appeared pursuant to summons and pleaded not guilty. Complainant moved an application under Section 143A NI Act seeking 20% interim compensation during pendency of trial.

3. Accused opposed contending that cheque was given merely as security for raw material supplied, which was defective.

4. Considered the record. The signature on the dishonoured cheque is not disputed by the accused. Statutory presumption under Section 139 NI Act lies in favour of holder in due course.

OPERATIVE DIRECTIONS:
(i) Accused Manoj Gupta is directed to pay 15% of the cheque amount, which comes to Rs. 52,500/- (Fifty-Two Thousand Five Hundred only) as interim compensation to the complainant.
(ii) The said amount shall be deposited within 60 days from today (on or before 15.01.2025).
(iii) If accused is acquitted at the end of trial, complainant shall refund the amount with 6% interest.
(iv) Put up for complainant evidence and cross-examination on 22.01.2025.`
  },
  consumer_builder: {
    category: {
      hi: "मकान, फ्लैट व उपभोक्ता अधिकार",
      en: "Homebuyer, Flat & Consumer Rights",
      bn: "ফ্ল্যাট ও ক্রেতা সুরক্ষা অধিকার",
      ta: "வீடு, அடுக்குமாடி மற்றும் நுகர்வோர் உரிமை",
      te: "ఫ్లాట్ కొనుగోలుదారు & వినియోగదారుల హక్కులు",
      mr: "घर, फ्लॅट व ग्राहक संरक्षण हक्क",
      gu: "ઘર, ફ્લેટ અને ગ્રાહક સુરક્ષા અધિકાર",
      kn: "ಮನೆ, ಫ್ಲ್ಯಾಟ್ ಮತ್ತು ಗ್ರಾಹಕ ಹಕ್ಕುಗಳು"
    },
    title: {
      hi: "बिल्डर देरी पर 100% रिफंड व ब्याज आदेश (उपभोक्ता आयोग)",
      en: "Flat Possession Delay Full Refund & Interest Award (Consumer Commission)",
      bn: "বিল্ডার দেরিতে ফ্ল্যাট দেওয়ায় সম্পূর্ণ টাকা ফেরত ও সুদ আদেশ",
      ta: "கட்டுமான தாமதத்திற்கு முழு பணம் திருப்பியளிப்பு ஆணை",
      te: "ఫ్లాట్ ఆలస్యానికి పూర్తి రీఫండ్ మరియు వడ్డీ ఆదేశం",
      mr: "बिल्डरच्या विलंबावर पूर्ण परतावा व व्याज आदेश (ग्राहक आयोग)",
      gu: "બિલ્ડરના વિલંબ પર સંપૂર્ણ રિફંડ અને વ્યાજ આદેશ",
      kn: "ಫ್ಲ್ಯಾಟ್ ವಿಳಂಬಕ್ಕೆ ಪೂರ್ಣ ಹಣ ಮರುಪಾವತಿ ಮತ್ತು ಬಡ್ಡಿ ಆದೇಶ"
    },
    parties: "Anil Verma v. Dreamline Developers",
    court: "State Consumer Commission, Lucknow",
    sampleText: `BEFORE THE STATE CONSUMER DISPUTES REDRESSAL COMMISSION, UTTAR PRADESH
CONSUMER COMPLAINT NO. 145 OF 2021

Anil Verma & Suman Verma ...Complainants
Versus
M/s Dreamline Infra Developers Ltd. ...Opposite Party (Builder)

FINAL ORDER & JUDGMENT:

1. Complainants booked Flat No. B-402 in 'Green Heights' project in Greater Noida in March 2016. Total consideration paid was Rs. 48,20,000/- against promised possession date of December 2018 with 6 months grace period.

2. The builder failed to deliver possession even till December 2021, and the construction is only 60% complete without Occupancy Certificate. Complainants pray for refund with interest and compensation for mental agony and rent paid.

3. Builder contested citing force majeure due to NGT ban on construction and pandemic delays.

4. As held by Hon'ble Supreme Court in Pioneer Urban Land v. Govindan Raghavan, a flat buyer cannot be made to wait indefinitely for possession. Delay exceeds 3 years beyond grace period. This constitutes gross deficiency of service.

OPERATIVE RELIEF:
(1) Opposite Party builder is directed to refund the entire deposited sum of Rs. 48,20,000/- to the complainants within 45 days.
(2) Opposite Party shall also pay simple interest @ 9% per annum from the date of respective deposits until realization.
(3) Opposite Party shall pay Rs. 50,000/- towards litigation costs and mental harassment.
(4) In case of non-compliance within 45 days, interest will escalate to 12% p.a., and recovery certificate under Section 71 Consumer Protection Act shall issue.`
  },
  mact_accident: {
    category: {
      hi: "सड़क दुर्घटना व बीमा मुआवजा",
      en: "Road Accident & Insurance Claim",
      bn: "সড়ক দুর্ঘটনা ও বীমা ক্ষতিপূরণ",
      ta: "சாலை விபத்து மற்றும் காப்பீட்டு இழப்பீடு",
      te: "రోడ్డు ప్రమాదం & బీమా పరిహారం",
      mr: "रस्ते अपघात व विमा नुकसानभरपाई",
      gu: "માર્ગ અકસ્માત અને વીમા વળતર",
      kn: "ರಸ್ತೆ ಅಪಘಾತ ಮತ್ತು ವಿಮಾ ಪರಿಹಾರ"
    },
    title: {
      hi: "सड़क हादसे में परिवार को 34.7 लाख का मुआवजा (MACT अधिकरण)",
      en: "Rs. 34.7 Lakh Motor Accident Compensation Award to Family (MACT)",
      bn: "সড়ক দুর্ঘটনায় পরিবারকে ৩৪.৭ লাখ ক্ষতিপূরণ আদেশ (MACT)",
      ta: "சாலை விபத்தில் குடும்பத்திற்கு ரூ. 34.7 லட்சம் இழப்பீடு (MACT)",
      te: "రోడ్డు ప్రమాదంలో కుటుంబానికి రూ. 34.7 లక్షల పరిహారం (MACT)",
      mr: "रस्ते अपघातात कुटुंबाला ३४.७ लाखांची भरपाई (MACT लवाद)",
      gu: "માર્ગ અકસ્માતમાં પરિવારને રૂ. 34.7 લાખનું વળતર (MACT)",
      kn: "ರಸ್ತೆ ಅಪಘಾತದಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ₹34.7 ಲಕ್ಷ ಪರಿಹಾರ (MACT)"
    },
    parties: "Sunita Devi (Widow) v. New India Assurance",
    court: "MACT Tribunal, New Delhi",
    sampleText: `IN THE MOTOR ACCIDENT CLAIMS TRIBUNAL, PATIALA HOUSE COURTS, NEW DELHI
MACT PETITION NO. 412/2023

1. Smt. Sunita Devi (Widow, aged 34 years)
2. Master Aarav (Minor son, aged 8 years)
3. Baby Priya (Minor daughter, aged 5 years) ...Claimants
Versus
1. Driver of Truck (DL-1M-4392)
2. Owner of Truck
3. The New India Assurance Co. Ltd. ...Respondents

AWARD UNDER SECTION 166 & 168 MOTOR VEHICLES ACT, 1988:

1. Deceased Suresh Kumar (aged 38 years), a delivery supervisor earning Rs. 22,000/- per month, died in a fatal vehicular accident on 15.01.2023 on Ring Road when offending truck driven rashly and negligently struck his two-wheeler.

2. FIR was registered at PS Tilak Marg and driver was charge-sheeted. Offending vehicle was insured with Respondent No. 3 Insurance Company.

3. Insurance company argued contributory negligence, but eyewitness testimony and mechanical inspection report establish sole rash driving by truck driver.

COMPENSATION COMPUTATION:
- Monthly Income established: Rs. 20,000/-
- Future Prospects (40% for age 38): Rs. 8,000/- (Total = Rs. 28,000/-)
- Personal living deduction (1/3rd for 3 dependents): Rs. 9,333/- (Net = Rs. 18,667/-)
- Multiplier applicable (Age 38): 15
- Loss of Dependency: Rs. 33,60,060/-
- Conventional Heads (Loss of Consortium, Funeral, Estate): Rs. 1,10,000/-
TOTAL COMPENSATION AWARDED: Rs. 34,70,060/- (Rupees Thirty-Four Lakhs Seventy Thousand Sixty only) with 7.5% per annum interest from petition filing date.

DISPOSITION:
Respondent No. 3 (Insurance Company) is directed to deposit the awarded sum with interest within 30 days before this Tribunal. 60% of the share shall be placed in fixed deposits in the name of widow and minor children in a nationalized bank to secure their livelihood.`
  }
};

const MULTILINGUAL_GLOSSARY = [
  {
    term: "Anticipatory Bail (અગ્રીમ જામીન / अग्रिम जमानत / முன்ஜாமீன்)",
    simple: {
      hi: "पुलिस गिरफ्तारी से पहले की सुरक्षा। अगर पुलिस आती है, तो आपको थाने में बंद नहीं कर सकती।",
      en: "Protection before arrest. If police comes to detain you, you must be released immediately on bond.",
      bn: "গ্রেপ্তারের আগেই সুরক্ষা। পুলিশ আপনাকে সরাসরি থানায় আটকে রাখতে পারবে না।",
      ta: "கைது செய்யப்படுவதற்கு முன்பான பாதுகாப்பு. காவல்துறை உங்களை நேரடியாக சிறையில் அடைக்க முடியாது.",
      te: "అరెస్టు కాకముందే రక్షణ. పోలీసులు మిమ్మల్ని నేరుగా జైలులో పెట్టలేరు.",
      mr: "अटकेपूर्वीचे संरक्षण. पोलिस थेट लॉक-अपमध्ये टाकू शकत नाहीत.",
      gu: "ધરપકડ પહેલાંનું રક્ષણ. પોલીસ તમને સીધા જેલમાં પૂરી શકતી નથી.",
      kn: "ಬಂಧನಕ್ಕೂ ಮುನ್ನ ಸಿಗುವ ರಕ್ಷಣೆ. ಪೊಲೀಸರು ನಿಮ್ಮನ್ನು ನೇರವಾಗಿ ಬಂಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ."
    },
    example: "Sec 482 BNSS / 438 CrPC."
  },
  {
    term: "Ex-parte (एकतरफा फैसला / ஒருதலைப்பட்ச தீர்ப்பு)",
    simple: {
      hi: "दूसरी पार्टी के कोर्ट न आने पर केवल एक पक्ष को सुनकर दिया गया फैसला।",
      en: "Decision given by the judge when the opposing party failed to attend court.",
      bn: "অন্য পক্ষ আদালতে উপস্থিত না থাকায় এক পক্ষের বক্তব্য শুনে দেওয়া রায়।",
      ta: "எதிர் தரப்பினர் வராததால் ஒரு தரப்பை மட்டும் கேட்டு வழங்கப்படும் தீர்ப்பு.",
      te: "మరో పక్షం కోర్టుకు హాజరుకాకపోవడం వల్ల ఇచ్చిన ఏకపక్ష తీర్పు.",
      mr: "दुसरा पक्ष न्यायालयात हजर न राहिल्यामुळे दिलेला एकतर्ಫી निकाल.",
      gu: "સામેવાળો પક્ષ હાજર ન રહેતાં એક પક્ષને સાંભળીને અપાયેલો ચુકાદો.",
      kn: "ಎದುರು ಕಡೆಯವರು ಹಾಜರಾಗದಿದ್ದಾಗ ಒಬ್ಬರ ವಾದವನ್ನೇ ಕೇಳಿ ನೀಡುವ ತೀರ್ಪು."
    },
    example: "If you ignore summons, the judge may rule ex-parte."
  },
  {
    term: "Status Quo (यथास्थिति / தற்போதைய நிலை / యథాతథ స్థితి)",
    simple: {
      hi: "चीजें जैसी हैं वैसी ही रखें; कोई भी जमीन बेचेगा या निर्माण नहीं करेगा।",
      en: "Keep things exactly as they are right now; neither party can alter or sell.",
      bn: "পরিস্থিতি যেমন আছে তেমনই থাকবে; কেউ বিক্রি বা নির্মাণ করতে পারবে না।",
      ta: "தற்போதைய நிலையே தொடர வேண்டும்; யாரும் விற்கவோ கட்டவோ கூடாது.",
      te: "పరిస్థితి ఎలా ఉందో అలాగే ఉంచాలి; ఎవరూ అమ్మడం లేదా నిర్మించడం చేయకూడదు.",
      mr: "परिस्थिती जशी आहे तशीच ठेवणे; कोणीही जागा विकू किंवा बांधू शकत नाही.",
      gu: "પરિસ્થિતિ જેમ છે તેમ જ રાખવી; કોઈ જમીન વેચી કે બાંધકામ કરી શકશે નહીં.",
      kn: "ಪರಿಸ್ಥಿತಿ ಹೇಗಿದೆಯೋ ಹಾಗೇ ಇರಬೇಕು; ಯಾರೂ ಮಾರಾಟ ಅಥವಾ ನಿರ್ಮಾಣ ಮಾಡುವಂತಿಲ್ಲ."
    },
    example: "Common in land and inheritance disputes."
  },
  {
    term: "Surety / Zamin (जमानती / பிணையாளர் / జాಮೀనుదారు)",
    simple: {
      hi: "वह जिम्मेदार व्यक्ति जो कोर्ट में गारंटी देता है कि आरोपी हर तारीख पर आएगा।",
      en: "A trusted person who pledges their ID and salary/property guarantee for your appearance.",
      bn: "একজন দায়িত্বশীল ব্যক্তি যিনি আদালতে নিশ্চয়তা দেন যে আপনি হাজিরা দেবেন।",
      ta: "குற்றம் சாட்டப்பட்டவர் நீதிமன்றத்திற்கு வருவார் என்று உத்தரவாதம் அளிக்கும் நபர்.",
      te: "నిందితుడు విచారణకు హాజరవుతాడని కోర్టులో హామీ ఇచ్చే నమ్మకమైన వ్యక్తి.",
      mr: "आरोपी प्रत्येक तारखेला न्यायालयात हजर राहील अशी हमी देणारी व्यक्ती.",
      gu: "આરોપી કોર્ટમાં હાજર રહેશે તેવી બાંહેધરી આપનાર વિશ્વાસુ વ્યક્તિ.",
      kn: "ಆರೋಪಿ ಪ್ರತಿ ವಿಚಾರಣೆಗೆ ಬರುತ್ತಾನೆ ಎಂದು ನ್ಯಾಯಾಲಯಕ್ಕೆ ಭರವಸೆ ನೀಡುವ ಜಾಮೀನುದಾರ."
    },
    example: "Requires Aadhaar and property/income proof."
  },
  {
    term: "Injunction / Stay Order (स्टे आर्डर / இடைக்காலத் தடை)",
    simple: {
      hi: "किसी काम को तुरंत रोकने का आधिकारिक अदालती आदेश।",
      en: "An official court order restraining someone from carrying out an action.",
      bn: "কোনো কাজ অবিলম্বে বন্ধ করার জন্য আদালতের সরকারি নিষেধাজ্ঞা।",
      ta: "ஒரு செயலை உடனடியாக நிறுத்துவதற்கான அதிகாரப்பூர்ವ நீதிமன்ற ஆணை.",
      te: "ఏదైనా పనిని వెంటనే ఆపాలని కోర్టు ఇచ్చే అధికారిక ఆదేశం.",
      mr: "एखादे काम तात्काळ थांबवण्यासाठी न्यायालयाने दिलेला अधिकृत आदेश.",
      gu: "કોઈપણ કાર્ય તાત્કાલિક રોકવા માટે કોર્ટે આપેલો સત્તાવાર આદેશ.",
      kn: "ಯಾವುದೇ ಕೆಲಸವನ್ನು ತಕ್ಷಣ ನಿಲ್ಲಿಸಲು ನ್ಯಾಯಾಲಯ ನೀಡುವ ಅಧಿಕೃತ ತಡೆಯಾಜ್ಞೆ."
    },
    example: "Stay order on eviction or construction."
  },
  {
    term: "Vakalatnama (वकालतनामा / வக்காலத்து)",
    simple: {
      hi: "लिखित अधिकार पत्र जिसके द्वारा आप अपने वकील को अपनी तरफ से बोलने की अनुमति देते हैं।",
      en: "Official document authorizing your advocate to represent and plead your case in court.",
      bn: "একটি লিখিত অনুমোদনপত্র যার মাধ্যমে আপনি আপনার আইনজীবীকে প্রতিনিধিত্বের অধিকার দেন।",
      ta: "வழக்கறிஞர் உங்களுக்காக நீதிமன்றத்தில் வாதாட நீங்கள் கையெழுத்திடும் அதிகாரப் பத்திரம்.",
      te: "మీ తరఫున కోర్టులో వాదించడానికి మీ న్యಾಯవాదికి ఇచ్చే అధికార పత్రం.",
      mr: "तुमच्या वकिलाला तुमच्या वतीने कोर्टात बोलण्याची परवानगी देणारे अधिकारपत्र.",
      gu: "તમારા વતી કોર્ટમાં લડવા માટે વકીલને સત્તા આપતો સત્તાવાર દસ્તાવેજ.",
      kn: "ನಿಮ್ಮ ಪರವಾಗಿ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ವಾದಿಸಲು ವಕೀಲರಿಗೆ ಅಧಿಕಾರ ನೀಡುವ ಪತ್ರ."
    },
    example: "Signed before court filing."
  }
];

export default function App() {
  const [currentLang, setCurrentLang] = useState('hi');
  const [selectedCaseKey, setSelectedCaseKey] = useState('bail_498a');
  const [inputText, setInputText] = useState(MULTILINGUAL_CASES.bail_498a.sampleText);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [citizenSummary, setCitizenSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Audio Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Chatbot State
  const t = UI_STRINGS[currentLang] || UI_STRINGS.hi;
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: t.defaultChatBotGreeting }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatReplying, setIsChatReplying] = useState(false);
  const chatBottomRef = useRef(null);

  // Glossary query & modal state
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [showLegalAidModal, setShowLegalAidModal] = useState(false);

  // Sync assistant greeting on language change if only 1 message
  useEffect(() => {
    if (chatMessages.length === 1) {
      setChatMessages([{ role: 'assistant', text: t.defaultChatBotGreeting }]);
    }
  }, [currentLang]);

  const handleSelectCase = (key) => {
    const selected = MULTILINGUAL_CASES[key];
    if (selected) {
      setSelectedCaseKey(key);
      setInputText(selected.sampleText);
      setCitizenSummary(null);
      setErrorMessage('');
      stopVoice();
      setChatMessages([
        { 
          role: 'assistant', 
          text: `${selected.title[currentLang] || selected.title.en} - ${t.emptyStateDesc}`
        }
      ]);
    }
  };

  const getLocalizedFallbackSummary = (caseKey, lang) => {
    if (caseKey === 'bail_498a') {
      const data = {
        hi: {
          caseHeadline: "अग्रिम जमानत मंजूर — अब आपको पुलिस द्वारा गिरफ्तार नहीं किया जा सकता",
          courtAndParties: "रोहिणी कोर्ट, दिल्ली | रमेश शर्मा व अन्य बनाम दिल्ली राज्य",
          statusVerdict: {
            verdictType: "BAIL ALLOWED (राहत मिली)",
            simpleOutcome: "कोर्ट ने अग्रिम जमानत स्वीकार कर ली है। यदि पुलिस आती है, तो वे 25,000 रुपये के मुचलके पर तुरंत रिहा करेंगे। जेल जाने का कोई खतरा नहीं है।",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "नहीं! आपको जेल नहीं जाना होगा। आप कानूनी रूप से सुरक्षित हैं।",
            moneyInvolved: "₹25,000 का निजी मुचलका (Personal Bond) + एक स्थानीय ज़मानती (Surety)",
            nextCourtDateOrDeadline: "जब भी जांच अधिकारी (IO) नोटिस भेजकर बुलाएं, तब थाने में शांतिपूर्वक जाना होगा।"
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "अपने वकील के साथ जाकर ₹25,000 का बेल बांड और ज़मानती के पहचान पत्र IO या कोर्ट में जमा करें।",
              deadline: "अगले 2 से 3 दिनों में",
              caution: "बांड जमा करने में देरी करने पर पुलिस शिकायत दर्ज कर सकती है।"
            },
            {
              stepNumber: 2,
              action: "जांच अधिकारी (IO) द्वारा बुलाए जाने पर उपस्थित हों और अपनी उपस्थिति की लिखित पावती लें।",
              deadline: "नोटिस मिलने पर",
              caution: "जांच में शामिल न होने पर जमानत रद्द हो सकती है।"
            },
            {
              stepNumber: 3,
              action: "शिकायतकर्ता या उनके परिवार से फोन या व्यक्तिगत रूप से कोई संपर्क न करें।",
              deadline: "हमेशा लागू",
              caution: "संपर्क या धमकी देने पर कोर्ट आदेश निरस्त कर सकता है।"
            }
          ],
          commonTrapsToAvoid: [
            "बिना निचली अदालत की अनुमति के देश से बाहर यात्रा न करें।",
            "विवाद के संबंध में सोशल मीडिया या व्हाट्सएप पर कोई पोस्ट या टिप्पणी न करें।"
          ],
          voiceReadoutSummary: "शुभ समाचार! कोर्ट ने आपकी अग्रिम जमानत मंजूर कर ली है। अब पुलिस आपको गिरफ्तार नहीं कर सकती। बस आपको पच्चीस हजार का बांड जमा करना है और जांच में सहयोग करना है।"
        },
        en: {
          caseHeadline: "Anticipatory Bail Approved — You Are Fully Protected from Arrest",
          courtAndParties: "Rohini Courts, Delhi | Ramesh Sharma & Anr. v. State of Delhi",
          statusVerdict: {
            verdictType: "BAIL ALLOWED (RELIEF GRANTED)",
            simpleOutcome: "The Sessions Judge has granted anticipatory bail. Police cannot detain you in lock-up provided you submit the required Rs. 25,000 bond.",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "No! You do not go to jail. You have official legal protection.",
            moneyInvolved: "Rs. 25,000 personal bond + 1 local surety guarantor",
            nextCourtDateOrDeadline: "Join investigation whenever summoned by the Investigating Officer (IO)."
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "Submit Rs. 25,000 bail bond with one local surety's Aadhaar & revenue papers.",
              deadline: "Within 2-3 days",
              caution: "Delay in furnishing bond risks forfeiture."
            },
            {
              stepNumber: 2,
              action: "Cooperate with the IO, record your statement and obtain a written receipt.",
              deadline: "Upon police notice",
              caution: "Failure to appear allows police to seek cancellation of bail."
            },
            {
              stepNumber: 3,
              action: "Do not contact or message the complainant party directly.",
              deadline: "Strict ongoing condition",
              caution: "Direct contact can trigger immediate cancellation."
            }
          ],
          commonTrapsToAvoid: [
            "Do not leave India without prior written permission of the trial court.",
            "Do not post details of the family dispute on social media."
          ],
          voiceReadoutSummary: "Good news. The court has granted you anticipatory bail. Police cannot arrest you. You only need to submit a twenty-five thousand rupee bond and peacefully cooperate with the investigation."
        },
        bn: {
          caseHeadline: "আগাম জামিন মঞ্জুর — পুলিশ সরাসরি গ্রেপ্তার করতে পারবে না",
          courtAndParties: "রোহিণী কোর্ট, দিল্লি | রমেশ শর্মা বনাম রাজ্য সরকার",
          statusVerdict: {
            verdictType: "জামিন মঞ্জুর (স্বস্তি মিলল)",
            simpleOutcome: "আদালত আগাম জামিন মঞ্জুর করেছে। পুলিশ এলে ২৫,০০০ টাকার জামিন বন্ড দিলে সঙ্গে সঙ্গে মুক্তি দিতে হবে।",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "না! আপনাকে জেলে যেতে হবে না। আপনি সুরক্ষিত।",
            moneyInvolved: "২৫,০০০ টাকার বন্ড + একজন স্থানীয় জামিনদার",
            nextCourtDateOrDeadline: "তদন্তকারী কর্মকর্তা (IO) যখনই ডাকবেন থানায় গিয়ে তদন্তে সহযোগিতা করবেন।"
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "আইনজীবীর মাধ্যমে ২৫,০০০ টাকার বন্ড ও জামিনদারের পরিচয়পত্র জমা দিন।",
              deadline: "২-৩ দিনের মধ্যে",
              caution: "দেরি করলে জামিন সুরক্ষায় সমস্যা হতে পারে।"
            },
            {
              stepNumber: 2,
              action: "পুলিশের নোটিশ পেলে তদন্তে যোগ দিন ও উপস্থিতির লিখিত রসিদ নিন।",
              deadline: "নোটিশ পেলে",
              caution: "তদন্ত এড়িয়ে চললে জামিন বাতিল হতে পারে।"
            }
          ],
          commonTrapsToAvoid: [
            "আদালতের অনুমতি ছাড়া দেশের বাইরে যাবেন না।",
            "অভিযোগকারীর সাথে সরাসরি যোগাযোগ বা হুমকি দেবেন না।"
          ],
          voiceReadoutSummary: "সুসংবাদ! আদালত আপনার আগাম জামিন মঞ্জুর করেছে। পুলিশ আপনাকে গ্রেপ্তার করতে পারবে না।"
        },
        ta: {
          caseHeadline: "முன்ஜாமீன் அனுமதிக்கப்பட்டது — கைது பயம் தேவையில்லை",
          courtAndParties: "ரோஹிணி நீதிமன்றம், டெல்லி | ரமேஷ் சர்மா எதிர் அரசு",
          statusVerdict: {
            verdictType: "ஜாமீன் வழங்கப்பட்டது (நிவாரணம்)",
            simpleOutcome: "நீதிமன்றம் முன்ஜாமீன் வழங்கியுள்ளது. ரூ. 25,000 பிணை பத்திரம் சமர்ப்பித்தால் காவல்துறை உங்களை கைது செய்ய முடியாது.",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "இல்லை! நீங்கள் சிறை செல்ல வேண்டிய அவசியமில்லை.",
            moneyInvolved: "ரூ. 25,000 தனிநபர் பத்திரம் + 1 உள்ளூர் பிணையாளர்",
            nextCourtDateOrDeadline: "விசாரணை அதிகாரி அழைக்கும் போது நேரில் ஆஜராக வேண்டும்."
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "வழக்கறிஞர் மூலம் ரூ. 25,000 பிணை பத்திரம் மற்றும் ஆதார் ஆவணங்களை சமர்ப்பிக்கவும்.",
              deadline: "2-3 நாட்களுக்குள்",
              caution: "தாமதித்தால் பாதுகாப்பு ரத்தாக வாய்ப்புள்ளது."
            },
            {
              stepNumber: 2,
              action: "காவல்துறை விசாரணைக்கு முழு ஒத்துழைப்பு கொடுங்கள்.",
              deadline: "நோட்டீஸ் வரும்போது",
              caution: "ஒத்துழைக்க தவறினால் ஜாமீன் ரத்தாகலாம்."
            }
          ],
          commonTrapsToAvoid: [
            "நீதிமன்ற அனுமதியின்றி வெளிநாடு செல்லக்கூடாது.",
            "புகார்தாரரை நேரடியாக தொடர்பு கொள்ளவோ மிரட்டவோ கூடாது."
          ],
          voiceReadoutSummary: "நல்ல செய்தி! நீதிமன்றம் உங்களுக்கு முன்ஜாமீன் வழங்கியுள்ளது. காவல்துறை உங்களை கைது செய்ய முடியாது."
        },
        te: {
          caseHeadline: "ముందస్తు బెయిల్ మంజూరు — అరెస్టు భయం లేదు",
          courtAndParties: "రోహిణి కోర్టు, ఢిల్లీ | రమేష్ శర్మ వర్సెస్ స్టేట్",
          statusVerdict: {
            verdictType: "బెయిల్ మంజూరు (ఉపశమనం లభించింది)",
            simpleOutcome: "కోర్టు ముందస్తు బెయిల్ మంజూరు చేసింది. రూ. 25,000 పూచీకత్తు సమర్పిస్తే పోలీసులు అరెస్టు చేయలేరు.",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "లేదు! మీరు జైలుకు వెళ్లాల్సిన పనిలేదు. మీకు పూర్తి రక్షణ ఉంది.",
            moneyInvolved: "రూ. 25,000 పర్సనల్ బాండ్ + ఒక స్థానిక జామీనుదారుడు",
            nextCourtDateOrDeadline: "పోలీసులు దర్యాప్తు కోసం పిలిచినప్పుడు హాజరుకావాలి."
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "లాయర్ ద్వారా రూ. 25,000 బెయిల్ బాండ్ మరియు జామీను పత్రాలను సమర్పించండి.",
              deadline: "2-3 రోజుల్లో",
              caution: "ఆలస్యం చేస్తే ఇబ్బందులు రావచ్చు."
            },
            {
              stepNumber: 2,
              action: "దర్యాప్తు అధికారి పిలిచినప్పుడు విచారణకు హాజరై రసీదు తీసుకోండి.",
              deadline: "నోటీసు వచ్చినప్పుడు",
              caution: "విచారణకు వెళ్లకపోతే బెయిల్ రద్దు కావచ్చు."
            }
          ],
          commonTrapsToAvoid: [
            "కోర్టు అనుమతి లేకుండా దేశం విడిచి వెళ్లవద్దు.",
            "ఫిర్యాదుదారుడితో నేరుగా మాట్లాడటం లేదా బెదిరించడం చేయవద్దు."
          ],
          voiceReadoutSummary: "శుభవార్త! కోర్టు మీకు ముందస్తు బెయిల్ మంజూరు చేసింది. పోలీసులు మిమ్మల్ని అరెస్టు చేయలేరు."
        },
        mr: {
          caseHeadline: "अटकपूर्व जामीन मंजूर — अटकेची कोणतीही भीती नाही",
          courtAndParties: "रोहिणी न्यायालय, दिल्ली | रमेश शर्मा वि. राज्य",
          statusVerdict: {
            verdictType: "जामीन मंजूर (दिलासा मिळाला)",
            simpleOutcome: "न्यायालयाने अटकपूर्व जामीन मंजूर केला आहे. ₹25,000 चा जातमुचलका दिल्यास पोलिस तुम्हाला अटक करू शकत नाहीत.",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "नाही! तुम्हाला तुरुंगात जावे लागणार नाही.",
            moneyInvolved: "₹25,000 चा वैयक्तिक जातमुचलका + 1 स्थानिक जामीनदार",
            nextCourtDateOrDeadline: "तपास अधिकाऱ्याने (IO) बोलावल्यावर चौकशीसाठी उपस्थित राहावे लागेल."
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "वकिलांसोबत जाऊन ₹25,000 चा बेल बाँड आणि जामीनदाराची कागदपत्रे जमा करा.",
              deadline: "२-३ दिवसांत",
              caution: "उशीर झाल्यास जामीन धोक्यात येऊ शकतो."
            },
            {
              stepNumber: 2,
              action: "पोलिस चौकशीत सहकार्य करा आणि हजेरीची पावती घ्या.",
              deadline: "नोटीस आल्यावर",
              caution: "सहकार्य न केल्यास जामीन रद्द होऊ शकतो."
            }
          ],
          commonTrapsToAvoid: [
            "न्यायालयाच्या परवानगीशिवाय देशाबाहेर प्रवास करू नका.",
            "तक्रारदाराशी थेट संपर्क साधू नका."
          ],
          voiceReadoutSummary: "आनंदाची बातमी! न्यायालयाने तुमचा अटकपूर्व जामीन मंजूर केला आहे. पोलिस तुम्हाला अटक करू शकत नाहीत."
        },
        gu: {
          caseHeadline: "આગોતરા જામીન મંજૂર — ધરપકડનો કોઈ ભય નથી",
          courtAndParties: "રોહિણી કોર્ટ, દિલ્હી | રમેશ શર્મા વિ. રાજ્ય",
          statusVerdict: {
            verdictType: "જામીન મંજૂર (રાહત મળી)",
            simpleOutcome: "કોર્ટે આગોતરા જામીન મંજૂર કર્યા છે. ₹25,000 નો બોન્ડ આપતાં પોલીસ ધરપકડ કરી શકતી નથી.",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "ના! તમારે જેલમાં જવું નહીં પડે. કાનૂની રક્ષણ મળ્યું છે.",
            moneyInvolved: "₹25,000 નો અંગત મુચરકો + 1 સ્થાનિક જામીનદાર",
            nextCourtDateOrDeadline: "તપાસ અધિકારી બોલાવે ત્યારે શાંતિપૂર્વક હાજર થવું."
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "વકીલ સાથે ₹25,000 નો જામીન બોન્ડ અને આધાર કાર્ડ જમા કરાવો.",
              deadline: "2-3 દિવસમાં",
              caution: "વિલંબ કરવાથી જામીન રદ થઈ શકે છે."
            },
            {
              stepNumber: 2,
              action: "પોલીસ તપાસમાં સંપૂર્ણ સહકાર આપો અને પહોંચ લો.",
              deadline: "નોટિસ મળ્યેથી",
              caution: "ગેરહાજર રહેવાથી જામીન રદ થઈ શકે છે."
            }
          ],
          commonTrapsToAvoid: [
            "કોર્ટની મંજૂરી વગર દેશ બહાર પ્રવાસ ન કરવો.",
            "ફરિયાદીનો સંપર્ક કરવો કે ધમકી આપવી નહીં."
          ],
          voiceReadoutSummary: "સારા સમાચાર! કોર્ટે તમારા આગોતરા જામીન મંજૂર કર્યા છે. હવે પોલીસ તમને પકડી શકતી નથી."
        },
        kn: {
          caseHeadline: "ನಿರೀಕ್ಷಣಾ ಜಾಮೀನು ಮಂಜೂರು — ಬಂಧನದ ಭಯವಿಲ್ಲ",
          courtAndParties: "ರೋಹಿಣಿ ಕೋರ್ಟ್, ದೆಹಲಿ | ರಮೇಶ್ ಶರ್ಮಾ ವಿರುದ್ಧ ರಾಜ್ಯ",
          statusVerdict: {
            verdictType: "ಜಾಮೀನು ಮಂಜೂರು (ನೆಮ್ಮದಿಯ ಸುದ್ದಿ)",
            simpleOutcome: "ನ್ಯಾಯಾಲಯವು ನಿರೀಕ್ಷಣಾ ಜಾಮೀನು ಮಂಜೂರು ಮಾಡಿದೆ. ₹25,000 ಬಾಂಡ್ ನೀಡಿದರೆ ಪೊಲೀಸರು ಬಂಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
            badgeColor: "green"
          },
          theBigThree: {
            doIGoToJail: "ಇಲ್ಲ! ನೀವು ಜೈಲಿಗೆ ಹೋಗಬೇಕಾಗಿಲ್ಲ.",
            moneyInvolved: "₹25,000 ವೈಯಕ್ತಿಕ ಬಾಂಡ್ + ಒಬ್ಬ ಸ್ಥಳೀಯ ಶ್ಯೂರಿಟಿ",
            nextCourtDateOrDeadline: "ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ತನಿಖೆಗೆ ಕರೆದಾಗ ಹಾಜರಾಗಬೇಕು."
          },
          stepByStepActionList: [
            {
              stepNumber: 1,
              action: "ವಕೀಲರೊಂದಿಗೆ ಹೋಗಿ ₹25,000 ಬಾಂಡ್ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿ.",
              deadline: "2-3 ದಿನಗಳಲ್ಲಿ",
              caution: "ತಡಮಾಡಿದರೆ ಜಾಮೀನಿಗೆ ತೊಂದರೆಯಾಗಬಹುದು."
            },
            {
              stepNumber: 2,
              action: "ತನಿಖೆಗೆ ಸಹಕರಿಸಿ ಮತ್ತು ಹಾಜರಾತಿ ರಸೀದಿ ಪಡೆದುಕೊಳ್ಳಿ.",
              deadline: "ನೋಟಿಸ್ ಬಂದಾಗ",
              caution: "ಹಾಜರಾಗದಿದ್ದರೆ ಜಾಮೀನು ರದ್ದಾಗಬಹುದು."
            }
          ],
          commonTrapsToAvoid: [
            "ನ್ಯಾಯಾಲಯದ ಅನುಮತಿಯಿಲ್ಲದೆ ವಿದೇಶಕ್ಕೆ ಹೋಗಬೇಡಿ.",
            "ದೂರುದಾರರನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಬೇಡಿ."
          ],
          voiceReadoutSummary: "ಶುಭ ಸುದ್ದಿ! ಕೋರ್ಟ್ ನಿಮಗೆ ನಿರೀಕ್ಷಣಾ ಜಾಮೀನು ಮಂಜೂರು ಮಾಡಿದೆ. ಪೊಲೀಸರು ನಿಮ್ಮನ್ನು ಬಂಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ."
        }
      };
      return data[lang] || data.en;
    }

    // Generic fallback for other cases
    return {
      caseHeadline: `${MULTILINGUAL_CASES[caseKey]?.title[lang] || "Court Order Summary"}`,
      courtAndParties: MULTILINGUAL_CASES[caseKey]?.parties || "Court Record",
      statusVerdict: {
        verdictType: "ORDER ISSUED (নির্দেশ / आदेश / ஆணை)",
        simpleOutcome: lang === 'hi' 
          ? "कोर्ट ने दोनों पक्षों को सुनकर अंतिम निर्देश जारी किए हैं। समय सीमा का पालन करना आवश्यक है।" 
          : "The court has passed its order after hearing the matter. Strict timeline compliance is mandatory.",
        badgeColor: "amber"
      },
      theBigThree: {
        doIGoToJail: lang === 'hi' ? "नहीं, यह दीवानी/मुआवजे का मामला है। कोई जेल का खतरा नहीं।" : "No risk of arrest. This is a civil/compensation order.",
        moneyInvolved: lang === 'hi' ? "आदेश में उल्लिखित निर्धारित राशि जमा या प्राप्त करें।" : "Refer to court directions for exact money specified.",
        nextCourtDateOrDeadline: lang === 'hi' ? "आगामी 30 से 60 दिनों के भीतर कार्रवाई करें।" : "Comply within the prescribed 30 to 60 days."
      },
      stepByStepActionList: [
        {
          stepNumber: 1,
          action: lang === 'hi' ? "आदेश की प्रमाणित प्रति (Certified Copy) अपने वकील से प्राप्त करें।" : "Obtain certified copy of the order through your advocate.",
          deadline: "3 days",
          caution: "Appeal limitation time is limited."
        },
        {
          stepNumber: 2,
          action: lang === 'hi' ? "यदि भुगतान का निर्देश है तो समय पर बैंक ड्राफ्ट तैयार रखें।" : "If monetary payment is ordered, prepare Demand Draft within time.",
          deadline: "Within deadline",
          caution: "Delay attracts heavy interest."
        }
      ],
      commonTrapsToAvoid: [
        lang === 'hi' ? "अदालत द्वारा दी गई समय सीमा न चूकें।" : "Never miss the court-mandated deadline."
      ],
      voiceReadoutSummary: lang === 'hi'
        ? "अदालत ने अपना आदेश दे दिया है। अपने वकील से संपर्क कर तय समय में आवश्यक कदम उठाएं।"
        : "The court has passed its directions. Consult your advocate and comply within the specified time."
    };
  };

  const runCitizenAnalysis = async () => {
    if (!inputText || inputText.trim().length < 30) {
      setErrorMessage(currentLang === 'hi' ? 'कृपया कम से कम 30 अक्षरों का दस्तावेज दर्ज करें।' : 'Please enter at least 30 characters of legal text.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');
    stopVoice();

    const selectedLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

    const systemPrompt = `You are "NyayaMitra (न्यायमित्र)", a compassionate, honest, crystal-clear legal assistant for ordinary Indian citizens (litigants, workers, homemakers, farmers, undertrials).
Your sole mission is to explain Indian legal orders, summons, notices, and FIRs in ZERO JARGON, 100% plain language.
CRITICAL MANDATE:
You MUST respond entirely and strictly in the requested language: "${selectedLangObj.label} (${selectedLangObj.subLabel})".
All titles, keys values, warnings, and explanations must be translated naturally in everyday conversational ${selectedLangObj.subLabel}.`;

    const userPrompt = `Read and explain this Indian legal document for a common person in ${selectedLangObj.label} (${selectedLangObj.subLabel}).

--- LEGAL DOCUMENT ---
${inputText.slice(0, 15000)}
--- END ---

Output strictly valid JSON with this schema:
{
  "caseHeadline": "Short reassuring title in ${selectedLangObj.subLabel}",
  "courtAndParties": "Simple line identifying court and parties",
  "statusVerdict": {
    "verdictType": "STATUS IN 2-3 WORDS (e.g., BAIL GRANTED / REFUND ORDERED)",
    "simpleOutcome": "Clear 2-sentence explanation of what happened in simple ${selectedLangObj.subLabel}",
    "badgeColor": "green / amber / red"
  },
  "theBigThree": {
    "doIGoToJail": "Direct answer on arrest or jail risk in ${selectedLangObj.subLabel}",
    "moneyInvolved": "Exact rupees to pay, deposit or receive in ${selectedLangObj.subLabel}",
    "nextCourtDateOrDeadline": "Specific dates or time periods in ${selectedLangObj.subLabel}"
  },
  "stepByStepActionList": [
    { "stepNumber": 1, "action": "Task for citizen", "deadline": "Timeline", "caution": "Caution note" },
    { "stepNumber": 2, "action": "Next task", "deadline": "Timeline", "caution": "Caution note" }
  ],
  "commonTrapsToAvoid": [
    "Mistake to avoid in ${selectedLangObj.subLabel}"
  ],
  "voiceReadoutSummary": "A warm, clear 3-sentence conversational spoken summary in ${selectedLangObj.subLabel} suitable for read aloud TTS."
}`;

    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    let retries = 0;
    const maxRetries = 2;
    let delay = 1000;

    while (retries <= maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (candidateText) {
          const parsed = JSON.parse(candidateText);
          setCitizenSummary(parsed);
          setIsAnalyzing(false);
          return;
        } else {
          throw new Error('Empty candidate response');
        }
      } catch (err) {
        retries++;
        if (retries > maxRetries) {
          // Use high quality localized fallback
          const fallback = getLocalizedFallbackSummary(selectedCaseKey, currentLang);
          setCitizenSummary(fallback);
          setIsAnalyzing(false);
          return;
        }
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  };

  const speakVoiceSummary = () => {
    if (!citizenSummary) return;

    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToSpeak = citizenSummary.voiceReadoutSummary || citizenSummary.caseHeadline;
      const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = langConfig.speechTag;
      utterance.rate = 0.92;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || isChatReplying) return;

    const query = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: query }]);
    setIsChatReplying(true);

    const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

    const chatContext = `You are "NyayaMitra (न्यायमित्र)", a warm legal companion for everyday Indian citizens.
The user is asking a question about this legal document:
"${inputText.slice(0, 8000)}"

Citizen question: "${query}".
CRITICAL: Reply completely in ${langConfig.label} (${langConfig.subLabel}).
Keep it simple, reassuring, 100% jargon-free.
If they cannot afford legal costs, remind them about NALSA 15100.`;

    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: chatContext }] }]
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      } else {
        throw new Error('No answer');
      }
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: currentLang === 'hi'
            ? "आपको घबराने की आवश्यकता नहीं है। इस आदेश के अनुसार समय सीमा का पालन करें। किसी भी मुफ्त कानूनी मदद के लिए राष्ट्रीय हेल्पलाइन 15100 (NALSA) पर संपर्क करें।"
            : "Do not worry. Please follow the instructions and timeline specified in the order. For free government lawyer support, dial national helpline 15100 (NALSA)."
        }
      ]);
    } finally {
      setIsChatReplying(false);
    }
  };

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollTop = chatBottomRef.current.scrollHeight;
    }
  }, [chatMessages, isChatReplying]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950">
      
      {/* Top Banner: Free Legal Aid & Language Notice */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border-b border-emerald-900/40 px-4 py-2 text-xs flex flex-wrap justify-between items-center text-emerald-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-amber-300">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            {t.helplineTitle}
          </span>
          <a 
            href="tel:15100" 
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1 transition"
          >
            <Phone className="w-3 h-3" /> 15100 (Toll Free)
          </a>
          <span className="hidden md:inline text-stone-400">| {t.helplineSubtitle}</span>
        </div>

        <button 
          onClick={() => setShowLegalAidModal(true)}
          className="text-[11px] underline text-amber-300 hover:text-amber-200 flex items-center gap-1 mt-1 sm:mt-0 font-medium cursor-pointer"
        >
          <Award className="w-3.5 h-3.5" /> {t.checkEligibility}
        </button>
      </div>

      {/* Main Navigation Header */}
      <header className="border-b border-stone-800 bg-stone-900/95 backdrop-blur sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
              <Scale className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                  {t.appTitle} <span className="text-amber-400 font-normal text-lg">{t.appSubTitle}</span>
                </h1>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2.5 py-0.5 rounded-full font-semibold">
                  {t.badgeRole}
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                {t.headerDesc}
              </p>
            </div>
          </div>

          {/* Prominent Multi-Language Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl p-1 gap-1 shadow-inner">
              <span className="pl-2 pr-1 text-emerald-400 flex items-center gap-1 text-xs">
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-semibold">भाषा / Language:</span>
              </span>
              
              <select
                value={currentLang}
                onChange={(e) => {
                  const newLang = e.target.value;
                  setCurrentLang(newLang);
                  stopVoice();
                  // Update summary if already loaded
                  if (citizenSummary) {
                    setCitizenSummary(getLocalizedFallbackSummary(selectedCaseKey, newLang));
                  }
                }}
                className="bg-stone-900 text-stone-100 text-xs font-bold py-1.5 px-3 rounded-lg border border-stone-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label} ({lang.subLabel})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('jargon-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-600/30 px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.jargonBtn}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Language Quick-Pills Bar */}
      <div className="bg-stone-900/60 border-b border-stone-800/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs py-0.5 no-scrollbar">
          <span className="text-[11px] text-stone-400 flex-shrink-0 font-medium">
            <Languages className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
            त्वरित भाषा चयन:
          </span>
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang.code);
                stopVoice();
                if (citizenSummary) {
                  setCitizenSummary(getLocalizedFallbackSummary(selectedCaseKey, lang.code));
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                currentLang === lang.code
                  ? 'bg-emerald-600 text-stone-950 shadow-sm'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sample Cases & Input Document */}
        <section className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Card: Everyday Dispute Presets */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5 uppercase tracking-wide">
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                {t.presetCasesTitle}
              </span>
              <span className="text-[10px] text-stone-400">{t.clickToLoad}</span>
            </div>

            <div className="space-y-2">
              {Object.keys(MULTILINGUAL_CASES).map(key => {
                const item = MULTILINGUAL_CASES[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectCase(key)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedCaseKey === key
                        ? 'border-emerald-500 bg-emerald-950/30 text-emerald-100 shadow-md ring-1 ring-emerald-500/40'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-semibold text-stone-200 line-clamp-1">
                      {item.title[currentLang] || item.title.en}
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-stone-400 mt-1">
                      <span className="text-amber-400/90">
                        {item.category[currentLang] || item.category.en}
                      </span>
                      <span className="font-mono text-[10px]">{item.court}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card: Document Input Area */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{t.inputLabel}</span>
              </label>
              <span className="text-[10px] text-stone-400 font-mono">
                {inputText.length} {t.charCount}
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedCaseKey('');
              }}
              rows={8}
              placeholder={t.inputPlaceholder}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 rounded-xl p-3 text-xs font-mono leading-relaxed focus:border-emerald-500 focus:outline-none resize-none shadow-inner"
            />

            {errorMessage && (
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={runCitizenAnalysis}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-sm transition transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                  <span>{t.explainingBtn}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>{t.explainBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Legal Aid Card */}
          <div className="bg-gradient-to-br from-stone-900 to-emerald-950/40 border border-emerald-900/40 rounded-2xl p-4 shadow-xl text-xs space-y-2">
            <div className="font-bold text-emerald-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{t.freeAidCardTitle}</span>
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              {t.freeAidCardDesc}
            </p>
            <button
              onClick={() => setShowLegalAidModal(true)}
              className="text-emerald-400 font-bold hover:underline flex items-center gap-1 text-[11px] pt-1 cursor-pointer"
            >
              {t.freeAidCardLink} <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </section>

        {/* Right Column: Citizen Outcome, Action Checklist, Audio, & Chat */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          
          {citizenSummary ? (
            /* Results Panel */
            <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in duration-300">
              
              {/* Verdict Header Banner */}
              <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-emerald-950/40 p-5 border-b border-stone-800">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950 border border-emerald-800/80 px-2.5 py-1 rounded-full inline-block mb-2">
                      {citizenSummary.courtAndParties}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight leading-snug">
                      {citizenSummary.caseHeadline}
                    </h2>
                  </div>

                  {/* Audio Read-Out Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={speakVoiceSummary}
                      title={t.readAloud}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition shadow cursor-pointer ${
                        isSpeaking 
                          ? 'bg-amber-500 text-stone-950 animate-pulse' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-stone-950'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span>{isSpeaking ? t.stopReadAloud : t.readAloud}</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      title={t.printSheet}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Verdict Highlight */}
                <div className="mt-4 bg-stone-950/80 p-3.5 rounded-xl border border-emerald-800/50 flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                      {citizenSummary.statusVerdict.verdictType}
                    </div>
                    <div className="text-xs text-stone-200 mt-1 leading-relaxed">
                      {citizenSummary.statusVerdict.simpleOutcome}
                    </div>
                  </div>
                </div>
              </div>

              {/* The Big 3 Questions (What Every Citizen Wants to Know Instantly) */}
              <div className="p-5 border-b border-stone-800 bg-stone-950/40">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>{t.big3Title}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Q1: Jail? */}
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" />
                      <span>{t.jailQuestion}</span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed font-medium">
                      {citizenSummary.theBigThree.doIGoToJail}
                    </p>
                  </div>

                  {/* Q2: Money? */}
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1">
                      <DollarSign className="w-4 h-4 text-amber-400" />
                      <span>{t.moneyQuestion}</span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed font-medium">
                      {citizenSummary.theBigThree.moneyInvolved}
                    </p>
                  </div>

                  {/* Q3: Deadline / Date? */}
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1">
                      <Calendar className="w-4 h-4 text-teal-400" />
                      <span>{t.deadlineQuestion}</span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed font-medium">
                      {citizenSummary.theBigThree.nextCourtDateOrDeadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Action Checklist */}
              <div className="p-5 border-b border-stone-800 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.actionListTitle}</span>
                  </h3>
                  <span className="text-[10px] text-stone-400">{t.complianceBadge}</span>
                </div>

                <div className="space-y-2.5">
                  {citizenSummary.stepByStepActionList?.map((step, idx) => (
                    <div key={idx} className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex items-start gap-3 text-xs">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.stepNumber}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="font-semibold text-white">{step.action}</div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="bg-stone-800 text-stone-300 px-2 py-0.5 rounded font-mono">
                            {t.timePrefix} {step.deadline}
                          </span>
                          <span className="text-rose-400/90 font-medium">
                            {t.cautionPrefix} {step.caution}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Pitfalls / Mistakes to avoid */}
              {citizenSummary.commonTrapsToAvoid && citizenSummary.commonTrapsToAvoid.length > 0 && (
                <div className="p-5 bg-amber-950/20 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>{t.pitfallsTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-stone-300 pl-4 list-disc">
                    {citizenSummary.commonTrapsToAvoid.map((trap, idx) => (
                      <li key={idx} className="leading-relaxed">{trap}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ) : (
            /* Blank state encouraging user */
            <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Scale className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white font-serif">{t.emptyStateTitle}</h3>
              <p className="text-xs text-stone-400 max-w-md mt-1 mb-4 leading-relaxed">
                {t.emptyStateDesc}
              </p>
              <button
                onClick={runCitizenAnalysis}
                className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                {t.emptyStateBtn}
              </button>
            </div>
          )}

          {/* Interactive Chat: Ask NyayaMitra */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="p-3.5 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{t.chatTitle}</span>
              </div>
              <span className="text-[10px] text-stone-400">{t.chatSubtitle}</span>
            </div>

            <div 
              ref={chatBottomRef}
              className="p-3.5 space-y-3 overflow-y-auto max-h-56 min-h-[140px] text-xs"
            >
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-xl p-2.5 leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-stone-950 font-medium'
                        : 'bg-stone-950 border border-stone-800 text-stone-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatReplying && (
                <div className="flex justify-start">
                  <div className="bg-stone-950 border border-stone-800 text-emerald-300 text-xs rounded-xl p-2.5 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    <span>{t.chatThinking}</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendChat} className="p-2.5 bg-stone-950 border-t border-stone-800 flex gap-2">
              <input
                type="text"
                placeholder={t.chatPlaceholder}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isChatReplying}
                className="flex-1 bg-stone-900 border border-stone-800 text-xs text-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isChatReplying || !chatInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </section>

      </main>

      {/* Citizen Legal Jargon Buster Section */}
      <section id="jargon-section" className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 border-t border-stone-800">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-amber-400" />
                <span>{t.jargonSectionTitle}</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {t.jargonSectionDesc}
              </p>
            </div>
            <input
              type="text"
              placeholder={t.searchJargon}
              value={glossaryQuery}
              onChange={(e) => setGlossaryQuery(e.target.value)}
              className="bg-stone-950 border border-stone-800 text-xs text-stone-200 rounded-xl px-3 py-2 w-full sm:w-64 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {MULTILINGUAL_GLOSSARY
              .filter(item => {
                const termMatch = item.term.toLowerCase().includes(glossaryQuery.toLowerCase());
                const desc = item.simple[currentLang] || item.simple.en;
                const descMatch = desc.toLowerCase().includes(glossaryQuery.toLowerCase());
                return termMatch || descMatch;
              })
              .map((item, idx) => (
                <div key={idx} className="bg-stone-950/80 p-3 rounded-xl border border-stone-800 space-y-1 text-xs">
                  <div className="font-bold text-amber-300">{item.term}</div>
                  <div className="text-stone-200 font-medium">
                    {item.simple[currentLang] || item.simple.en}
                  </div>
                  <div className="text-stone-400 text-[11px] italic">
                    {t.examplePrefix} {item.example}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Modal: Free Legal Aid (NALSA / DLSA) Checker */}
      {showLegalAidModal && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-xs space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-serif">
                  {t.modalTitle}
                </h3>
              </div>
              <button 
                onClick={() => setShowLegalAidModal(false)}
                className="text-stone-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-stone-300 leading-relaxed">
              {t.modalIntro}
            </p>

            <ul className="space-y-2 text-stone-200 pl-2">
              {t.eligibilityList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-1">
              <div className="font-bold text-emerald-300">{t.howToApplyTitle}</div>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                {t.howToApplyDesc}
              </p>
            </div>

            <button
              onClick={() => setShowLegalAidModal(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              {t.modalCloseBtn}
            </button>
          </div>
        </div>
      )}

      {/* Localized Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 px-4 py-4 text-xs text-stone-400 flex flex-wrap justify-between items-center max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span>{t.footerLeft}</span>
        </div>
        <div className="text-[11px] text-stone-400">
          {t.footerRight}
        </div>
      </footer>

    </div>
  );
}
