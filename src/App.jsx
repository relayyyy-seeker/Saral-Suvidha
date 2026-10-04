import React, { useState, useEffect, useRef, Component } from 'react';
import { Mic, MicOff, Send, MessageCircle, X, ShieldCheck, Download, CheckCircle2, Search, AlertTriangle, Link as LinkIcon, AlertOctagon, FileText, Home, List, Volume2, Info, Building2, HelpCircle, ExternalLink, Activity, Image as ImageIcon, Wifi, Check, Lock, Edit3, ChevronRight, HelpCircle as QuestionMark, ShieldAlert } from 'lucide-react';

// --- CENTRALIZED TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  en: {
    "app.title": "SARAL SUVIDHA",
    "app.subtitle": "Independent Investor Protection & Assistance Platform",
    "top.disclaimer": "Independent Advisory Tool | Not an official SEBI or Government website",
    "nav.about": "ABOUT & PRIVACY",
    "nav.protection": "INVESTOR PROTECTION",
    "nav.fraud": "FRAUD & SCAMS",
    "nav.grievance": "GRIEVANCES",
    "nav.home": "HOME",
    "nav.dashboard": "MY CASES",
    
    "home.quicklinks": "Official Sources & Verification",
    "home.scammed.title": "If you have been scammed",
    "home.scammed.desc": "Don't panic. Don't send more money. Preserve evidence. Use the 'Something Went Wrong' tool below to organize your facts.",
    "home.trust.title": "Why trust Saral Suvidha",
    "home.trust.1": "Your information is only analyzed when you choose to provide it.",
    "home.trust.2": "We do not ask for your OTP, password or PIN.",
    "home.trust.3": "We do not provide stock tips or investment recommendations.",
    "home.trust.4": "AI analysis is not a final determination of fraud. Always verify claims independently.",
    "home.stats.live": "Live Metrics",
    "home.stats.official": "Source: Official SEBI/SCORES Data",
    "home.stats.community": "Safety checks completed by users",
    "home.stats.loading": "Loading official data...",

    "home.speak": "Speak Your Problem",
    "home.check": "Check Suspicious Content",
    "home.check.desc": "Analyze messages, images, & ads",
    "home.explain": "Explain Something",
    "home.explain.desc": "Understand financial claims",
    "home.emergency": "Something Went Wrong",
    "home.emergency.desc": "I lost money or shared details",
    "home.complaint": "Make a Complaint",
    "home.complaint.desc": "Generate factual grievance draft",

    "common.speak": "Speak",
    "common.listen": "Listen",
    "common.analyzing": "Processing...",
    "common.submit": "Submit for Analysis",
    "common.download": "Download Draft",
    "common.next": "Next Step",
    "common.confirm": "Confirm & Proceed",
    "common.skip": "Skip",
    "common.edit": "Edit",
    "common.remove": "Remove",
    "common.reference": "Reference:",
    "common.ai_disclaimer": "AI-generated analysis — verify important information using official sources.",
    
    "tab.detect": "1. Detect",
    "tab.understand": "2. Understand",
    "tab.preserve": "3. Preserve",
    "tab.report": "4. Report",

    "scam.title": "Check Suspicious Content",
    "scam.subtitle": "Analyze messages, screenshots, posters, links, and advertisements for risk indicators.",
    "scam.tab.text": "Enter Text",
    "scam.tab.img": "Upload Pictures",
    "scam.tab.link": "Link / Phone",
    "scam.img.desc": "Includes screenshots, advertisements, posters, social-media posts and other visual financial content.",
    "scam.link.desc": "Check URLs, websites, or phone numbers for known warning signs and look-alike domains.",
    "scam.label.text": "Paste suspicious text:",
    "scam.label.link": "Paste suspicious link or phone number:",
    "scam.upload": "Select Image File",
    "scam.image_attached": "✓ Image Attached",
    "scam.risk": "Risk Assessment",
    "scam.warnings": "What we found",
    "scam.verify": "What you should verify",
    "scam.safe": "What you should do next",
    "scam.extracted": "Extracted Details",
    "scam.escalate": "I lost money (Organize Evidence)",
    "scam.failed": "Unable to Determine:",

    "emergency.title": "Emergency Response & Evidence",
    "emergency.stop": "STOP. DO NOT PROCEED.",
    "emergency.stop.1": "Do not send any more money.",
    "emergency.stop.2": "Do not share OTPs, passwords, PINs or other sensitive information.",
    "emergency.stop.3": "Do not click additional links or install unknown applications.",
    "emergency.stop.4": "Preserve all messages, screenshots, payment records and other evidence.",
    "emergency.preserve": "Preserve Evidence",
    "emergency.label": "What happened? (Detail txns, dates, platforms):",
    "emergency.extract": "Organize Facts",
    "emergency.needs": "A few important details are missing",
    "emergency.confirm.title": "Please verify these details",
    "emergency.confirm.desc": "Confirm your facts before we generate a formal complaint. Do not include incorrect information. You can skip missing fields.",
    "emergency.why_need": "Why do you need this?",
    "emergency.edit_confirm": "Edit & Confirm Facts",

    "complaint.title": "Formal Grievance Draft",
    "complaint.route": "Recommended Reporting Route",
    "complaint.instructions": "What should I do now?",
    "complaint.readiness": "Complaint Readiness",
    "complaint.generate": "Generate Official Draft",
    "complaint.success": "Draft Generated Successfully",
    "complaint.templates": "Templates:",
    "complaint.scores_link": "Proceed to SCORES Portal",
    "complaint.cyber_link": "Proceed to Cybercrime Portal",
    
    "about.title": "About Saral Suvidha & Your Privacy",
    "about.what": "What is Saral Suvidha?",
    "about.what.desc": "Saral Suvidha is an independent investor-protection assistance platform designed for first-time investors and users unfamiliar with complex financial terminology. We help you understand suspicious financial content, identify warning signs, organize evidence, and prepare factual grievances.",
    "about.who": "Who is it for?",
    "about.who.desc": "It is designed for everyday investors, regional-language users, and anyone who has encountered suspicious investment content or experienced a financial scam.",
    "about.how": "How does it work?",
    "about.how.desc": "CHECK → UNDERSTAND → DETECT → VERIFY → PRESERVE → REPORT → TRACK",
    "about.cannot": "What Saral Suvidha CANNOT do",
    "about.cannot.desc": "We do not provide buy/sell/hold recommendations. We do not predict stock prices. AI analysis is not absolute proof of fraud. We cannot guarantee recovery of money.",
    "about.identity": "Important Identity Statement",
    "about.identity.desc": "Saral Suvidha is an independent investor-protection assistance platform. It is NOT an official SEBI or Government of India website.",
    "about.privacy": "Your Data & Privacy",
    "about.privacy.1": "What we process: We only analyze the text, voice, or images you explicitly choose to upload.",
    "about.privacy.2": "Data Storage: Uploaded images and text are processed temporarily via AI to generate your draft. We do not permanently store your personal files.",
    "about.privacy.3": "No Automatic Access: We do NOT access your SMS, contacts, financial accounts, or private messages.",
    "about.privacy.4": "Safety First: Never upload images containing your bank passwords, OTPs, or full Aadhaar numbers.",

    "protect.title": "Investor Protection Guide",
    "protect.before": "Before Investing",
    "protect.before.1": "Verify the intermediary's SEBI registration status.",
    "protect.before.2": "Understand the product and all associated fees/charges.",
    "protect.before.3": "Avoid pressure-driven decisions and 'limited time' offers.",
    "protect.account": "Protect Your Account",
    "protect.account.1": "Never share your trading passwords, PINs, or OTPs with anyone.",
    "protect.account.2": "Use only official applications and websites.",
    "protect.account.3": "Be extremely careful with remote-access requests (AnyDesk, TeamViewer).",
    "protect.verify": "Verify Before You Trust",
    "protect.verify.1": "Verify official contact information independently.",
    "protect.verify.2": "Verify claims made using SEBI's name through official channels.",
    "protect.rights": "Your Investor Rights",
    "protect.rights.desc": "You have the right to receive contract notes within 24 hours, receive timely dividends, and raise grievances against registered intermediaries.",
    "protect.wrong": "If Something Goes Wrong",
    "protect.wrong.desc": "Preserve evidence. Identify the concerned entity. Raise the grievance through the appropriate first-level channel. Keep the complaint reference number. Use SCORES only if the entity is SEBI-registered.",

    "fraud.title": "Frauds & Scams Library",
    "fraud.1.title": "1. Fake Trading App Scams",
    "fraud.1.desc": "Scammers use social-media ads to lure you into downloading a fake trading application. The app shows massive fake profits, but blocks withdrawals, demanding additional 'taxes' or 'fees'.",
    "fraud.2.title": "2. Guaranteed / Assured Return Scams",
    "fraud.2.desc": "Promises of 'fixed daily profits' or 'risk-free high returns'. The stock market carries inherent risk; guaranteed returns are a major warning sign.",
    "fraud.3.title": "3. Stock Market Guru Scams",
    "fraud.3.desc": "Fake experts offer 'exclusive' paid groups with guaranteed profits using fake success screenshots to create FOMO (Fear Of Missing Out).",
    "fraud.4.title": "4. Social Media Investment Scams",
    "fraud.4.desc": "Fake trading communities on WhatsApp, Telegram, or Instagram offering unregulated stock tips.",
    "fraud.5.title": "5. Impersonation Scams",
    "fraud.5.desc": "Scammers impersonating SEBI, official brokers, or well-known financial experts to gain your trust and money.",
    "fraud.6.title": "6. Fake Investment Advertisements",
    "fraud.6.desc": "Ads using celebrity impersonations, fake logos, and suspicious contact details claiming unrealistic returns.",
    "fraud.7.title": "7. Phishing / Fake Links",
    "fraud.7.desc": "Fake websites or KYC requests designed to steal your login credentials.",
    "fraud.8.title": "8. Fake Testimonials",
    "fraud.8.desc": "Fabricated screenshots of profits and success stories used as social proof to deceive you.",
    "fraud.9.title": "9. Pump-and-Dump Schemes",
    "fraud.9.desc": "Manipulative promotion of cheap stocks to artificially inflate prices before scammers sell their shares.",
    "fraud.10.title": "10. Unregistered Advice",
    "fraud.10.desc": "Receiving investment advice from individuals not registered as SEBI Investment Advisors.",
    "fraud.11.title": "11. Recruitment-Based Schemes",
    "fraud.11.desc": "Schemes where you earn primarily by recruiting new investors rather than genuine market returns.",
    "fraud.12.title": "12. Blocked Withdrawals",
    "fraud.12.desc": "Platforms that simulate profits but invent endless excuses to prevent genuine withdrawals.",

    "grievance.title": "Grievance Navigation",
    "grievance.desc": "Identify your issue and follow the correct reporting route. Do not use SCORES for cyber frauds.",
    "grievance.l1": "Level 1: The Concerned Entity",
    "grievance.l1d": "First, contact the company, broker, or platform involved and raise your complaint. Keep the complaint number and their response.",
    "grievance.l2": "Level 2: Smart ODR / Exchanges",
    "grievance.l2d": "If unresolved by a broker, escalate to the Stock Exchange or Smart ODR portal.",
    "grievance.l3": "Level 3: SEBI SCORES 2.0",
    "grievance.l3d": "If the matter involves a SEBI-registered intermediary and remains unresolved, use the official SCORES platform.",

    "chat.placeholder": "Type your query...",
    "footer.disclaimer": "Saral Suvidha © 2026. Independent Advisory Tool. Not for official regulatory filing without verification.",
    "reminder.privacy": "Reminder: Do not share passwords, PINs, OTPs or other personal secrets in this portal."
  },
  hi: {
    "app.title": "सरल सुविधा",
    "app.subtitle": "स्वतंत्र निवेशक संरक्षण एवं सहायता मंच",
    "top.disclaimer": "स्वतंत्र सलाहकार उपकरण | आधिकारिक SEBI या सरकारी वेबसाइट नहीं",
    "nav.about": "हमारे बारे में",
    "nav.protection": "निवेशक संरक्षण",
    "nav.fraud": "धोखाधड़ी एवं स्कैम",
    "nav.grievance": "शिकायतें",
    "nav.home": "होम",
    "nav.dashboard": "मेरे मामले",
    
    "home.quicklinks": "आधिकारिक स्रोत एवं सत्यापन",
    "home.scammed.title": "यदि आपके साथ धोखाधड़ी हुई है",
    "home.scammed.desc": "घबराएं नहीं। और पैसे न भेजें। साक्ष्य सुरक्षित रखें। अपने तथ्यों को व्यवस्थित करने के लिए नीचे 'कुछ गलत हो गया' टूल का उपयोग करें।",
    "home.trust.title": "सरल सुविधा पर विश्वास क्यों करें",
    "home.trust.1": "आपकी जानकारी का विश्लेषण तभी किया जाता है जब आप उसे प्रदान करते हैं।",
    "home.trust.2": "हम आपका OTP, पासवर्ड या PIN नहीं मांगते हैं।",
    "home.trust.3": "हम स्टॉक टिप्स या निवेश सलाह नहीं देते हैं।",
    "home.trust.4": "AI विश्लेषण धोखाधड़ी का अंतिम प्रमाण नहीं है। हमेशा स्वतंत्र रूप से दावों की पुष्टि करें।",
    "home.stats.live": "लाइव मेट्रिक्स",
    "home.stats.official": "स्रोत: आधिकारिक SEBI/SCORES डेटा",
    "home.stats.community": "उपयोगकर्ताओं द्वारा पूर्ण की गई सुरक्षा जाँच",
    "home.stats.loading": "आधिकारिक डेटा लोड हो रहा है...",

    "home.speak": "अपनी समस्या बोलें",
    "home.check": "संदिग्ध सामग्री की जाँच करें",
    "home.check.desc": "संदेश, चित्र और विज्ञापनों की जाँच",
    "home.explain": "कोई दावा समझें",
    "home.explain.desc": "वित्तीय दावों को समझें",
    "home.emergency": "कुछ गलत हो गया",
    "home.emergency.desc": "मेरे पैसे कट गए या जानकारी साझा हो गई",
    "home.complaint": "शिकायत दर्ज करें",
    "home.complaint.desc": "तथ्यात्मक शिकायत ड्राफ्ट बनाएँ",

    "common.speak": "बोलें",
    "common.listen": "सुनें",
    "common.analyzing": "प्रसंस्करण हो रहा है...",
    "common.submit": "विश्लेषण के लिए भेजें",
    "common.download": "ड्राफ्ट डाउनलोड करें",
    "common.next": "अगला कदम",
    "common.confirm": "पुष्टि करें और आगे बढ़ें",
    "common.skip": "छोड़ें",
    "common.edit": "संपादित करें",
    "common.remove": "हटाएं",
    "common.reference": "संदर्भ:",
    "common.ai_disclaimer": "AI-जनित विश्लेषण — आधिकारिक स्रोतों का उपयोग करके महत्वपूर्ण जानकारी की पुष्टि करें।",
    
    "tab.detect": "1. पहचान",
    "tab.understand": "2. समझें",
    "tab.preserve": "3. सुरक्षित करें",
    "tab.report": "4. रिपोर्ट",

    "scam.title": "संदिग्ध सामग्री की जाँच करें",
    "scam.subtitle": "जोखिम के लिए संदेशों, स्क्रीनशॉट, पोस्टर, लिंक और विज्ञापनों का विश्लेषण करें।",
    "scam.tab.text": "टेक्स्ट दर्ज करें",
    "scam.tab.img": "चित्र अपलोड करें",
    "scam.tab.link": "लिंक / फ़ोन",
    "scam.img.desc": "इसमें स्क्रीनशॉट, विज्ञापन, पोस्टर, सोशल-मीडिया पोस्ट और अन्य दृश्य शामिल हैं।",
    "scam.link.desc": "ज्ञात चेतावनी संकेतों और मिलते-जुलते डोमेन के लिए URL, वेबसाइट या फ़ोन नंबर की जाँच करें।",
    "scam.label.text": "संदिग्ध टेक्स्ट यहाँ पेस्ट करें:",
    "scam.label.link": "संदिग्ध लिंक या फ़ोन नंबर यहाँ पेस्ट करें:",
    "scam.upload": "इमेज फाइल चुनें",
    "scam.image_attached": "✓ चित्र संलग्न",
    "scam.risk": "जोखिम मूल्यांकन",
    "scam.warnings": "हमें क्या मिला",
    "scam.verify": "आपको क्या सत्यापित करना चाहिए",
    "scam.safe": "आगे आपको क्या करना चाहिए",
    "scam.extracted": "निकाले गए विवरण",
    "scam.escalate": "पैसे का नुकसान हुआ (साक्ष्य व्यवस्थित करें)",
    "scam.failed": "निर्धारित करने में असमर्थ:",

    "emergency.title": "आपातकालीन प्रतिक्रिया और साक्ष्य",
    "emergency.stop": "रुकें। आगे न बढ़ें।",
    "emergency.stop.1": "और पैसे न भेजें।",
    "emergency.stop.2": "OTP, पासवर्ड, PIN या अन्य संवेदनशील जानकारी साझा न करें।",
    "emergency.stop.3": "अतिरिक्त लिंक पर क्लिक न करें या अज्ञात एप्लिकेशन इंस्टॉल न करें।",
    "emergency.stop.4": "सभी संदेश, स्क्रीनशॉट, भुगतान रिकॉर्ड और अन्य साक्ष्य सुरक्षित रखें।",
    "emergency.preserve": "साक्ष्य सुरक्षित करें",
    "emergency.label": "क्या हुआ? (लेनदेन, दिनांक, प्लेटफॉर्म):",
    "emergency.extract": "तथ्यों को व्यवस्थित करें",
    "emergency.needs": "कुछ महत्वपूर्ण विवरण अभी भी गायब हैं",
    "emergency.confirm.title": "कृपया इन विवरणों की पुष्टि करें",
    "emergency.confirm.desc": "औपचारिक शिकायत उत्पन्न करने से पहले अपने तथ्यों की पुष्टि करें। गलत जानकारी शामिल न करें। आप छोड़े गए फ़ील्ड छोड़ सकते हैं।",
    "emergency.why_need": "आपको इसकी आवश्यकता क्यों है?",
    "emergency.edit_confirm": "तथ्यों को संपादित और पुष्टि करें",

    "complaint.title": "औपचारिक शिकायत ड्राफ्ट",
    "complaint.route": "अनुशंसित रिपोर्टिंग मार्ग",
    "complaint.instructions": "अब मुझे क्या करना चाहिए?",
    "complaint.readiness": "शिकायत की तैयारी",
    "complaint.generate": "आधिकारिक ड्राफ्ट उत्पन्न करें",
    "complaint.success": "ड्राफ्ट सफलतापूर्वक उत्पन्न हुआ",
    "complaint.templates": "टेम्पलेट्स:",
    "complaint.scores_link": "SCORES पोर्टल पर जाएं",
    "complaint.cyber_link": "साइबरक्राइम पोर्टल पर जाएं",
    
    "about.title": "सरल सुविधा और आपकी गोपनीयता के बारे में",
    "about.what": "सरल सुविधा क्या है?",
    "about.what.desc": "सरल सुविधा एक स्वतंत्र निवेशक-संरक्षण सहायता मंच है। हम आपको संदिग्ध वित्तीय सामग्री को समझने, चेतावनी संकेतों की पहचान करने, साक्ष्य व्यवस्थित करने और तथ्यात्मक शिकायतें तैयार करने में मदद करते हैं। यह आधिकारिक SEBI वेबसाइट नहीं है।",
    "about.who": "यह किसके लिए है?",
    "about.who.desc": "यह पहली बार निवेश करने वालों, क्षेत्रीय-भाषा के उपयोगकर्ताओं और उन लोगों के लिए डिज़ाइन किया गया है जिन्हें संदिग्ध निवेश सामग्री का सामना करना पड़ा है।",
    "about.how": "यह कैसे काम करता है?",
    "about.how.desc": "जाँच → समझें → पहचानें → सत्यापित करें → सुरक्षित करें → रिपोर्ट → ट्रैक करें",
    "about.cannot": "सरल सुविधा क्या नहीं कर सकती",
    "about.cannot.desc": "हम निवेश की सिफारिशें नहीं देते हैं। AI विश्लेषण धोखाधड़ी का पूर्ण प्रमाण नहीं है। हम पैसे की वसूली की गारंटी नहीं दे सकते। यह सरकारी वेबसाइट नहीं है।",
    "about.identity": "महत्वपूर्ण पहचान विवरण",
    "about.identity.desc": "सरल सुविधा एक स्वतंत्र निवेशक-संरक्षण सहायता मंच है। यह आधिकारिक SEBI या भारत सरकार की वेबसाइट नहीं है।",
    "about.privacy": "आपका डेटा और गोपनीयता",
    "about.privacy.1": "हम क्या प्रोसेस करते हैं: हम केवल उस टेक्स्ट, आवाज़ या चित्र का विश्लेषण करते हैं जिसे आप अपलोड करते हैं।",
    "about.privacy.2": "डेटा संग्रहण: ड्राफ्ट बनाने के लिए अपलोड की गई छवियों को अस्थायी रूप से संसाधित किया जाता है। हम आपकी फ़ाइलें स्थायी रूप से संग्रहीत नहीं करते हैं।",
    "about.privacy.3": "कोई स्वचालित पहुंच नहीं: हम आपके SMS, संपर्क या वित्तीय खातों तक नहीं पहुंचते हैं।",
    "about.privacy.4": "सुरक्षा: कभी भी अपने बैंक पासवर्ड, OTP या पूरा आधार नंबर वाले चित्र अपलोड न करें।",

    "protect.title": "निवेशक संरक्षण मार्गदर्शिका",
    "protect.before": "निवेश करने से पहले",
    "protect.before.1": "मध्यस्थ की SEBI पंजीकरण स्थिति सत्यापित करें।",
    "protect.before.2": "उत्पाद और सभी संबद्ध शुल्कों को समझें।",
    "protect.before.3": "दबाव-संचालित निर्णयों और 'सीमित समय' के प्रस्तावों से बचें।",
    "protect.account": "अपने खाते को सुरक्षित रखें",
    "protect.account.1": "अपना ट्रेडिंग पासवर्ड या OTP कभी किसी के साथ साझा न करें।",
    "protect.account.2": "केवल आधिकारिक एप्लिकेशन और वेबसाइटों का उपयोग करें।",
    "protect.account.3": "रिमोट-एक्सेस अनुरोधों (AnyDesk आदि) से सावधान रहें।",
    "protect.verify": "भरोसा करने से पहले सत्यापित करें",
    "protect.verify.1": "आधिकारिक संपर्क जानकारी को स्वतंत्र रूप से सत्यापित करें।",
    "protect.verify.2": "SEBI के नाम का उपयोग करने वाले दावों को सत्यापित करें।",
    "protect.rights": "आपके निवेशक अधिकार",
    "protect.rights.desc": "आपको ट्रेडिंग के 24 घंटे के भीतर कॉन्ट्रैक्ट नोट प्राप्त करने, समय पर डिविडेंड प्राप्त करने और पंजीकृत मध्यस्थों के खिलाफ शिकायतें उठाने का अधिकार है।",
    "protect.wrong": "यदि कुछ गलत हो जाता है",
    "protect.wrong.desc": "साक्ष्य सुरक्षित रखें। संबंधित इकाई की पहचान करें। पहले स्तर के चैनल के माध्यम से शिकायत उठाएं। संदर्भ संख्या रखें। यदि इकाई SEBI-पंजीकृत है, तो ही SCORES का उपयोग करें।",

    "fraud.title": "धोखाधड़ी एवं स्कैम लाइब्रेरी",
    "fraud.1.title": "1. फेक ट्रेडिंग ऐप स्कैम",
    "fraud.1.desc": "धोखेबाज आपको सोशल-मीडिया विज्ञापन के माध्यम से एक नकली ट्रेडिंग ऐप डाउनलोड करने का लालच देते हैं। ऐप बड़े नकली मुनाफे दिखाता है, लेकिन निकासी को रोकता है।",
    "fraud.2.title": "2. गारंटीकृत रिटर्न स्कैम",
    "fraud.2.desc": "'निश्चित दैनिक लाभ' या 'जोखिम-मुक्त उच्च लाभ' के वादे। शेयर बाजार में स्वाभाविक जोखिम होता है; गारंटीकृत रिटर्न एक बड़ी चेतावनी है।",
    "fraud.3.title": "3. शेयर बाजार गुरु स्कैम",
    "fraud.3.desc": "नकली विशेषज्ञ गारंटीकृत लाभ के साथ 'विशिष्ट' भुगतान किए गए समूहों की पेशकश करते हैं।",
    "fraud.4.title": "4. सोशल मीडिया निवेश स्कैम",
    "fraud.4.desc": "WhatsApp, Telegram या Instagram पर नकली ट्रेडिंग समुदाय जो अनियमित स्टॉक टिप्स देते हैं।",
    "fraud.5.title": "5. प्रतिरूपण (Impersonation) स्कैम",
    "fraud.5.desc": "आपका विश्वास और पैसा हासिल करने के लिए SEBI, दलालों या वित्तीय विशेषज्ञों का रूप धारण करने वाले धोखेबाज।",
    "fraud.6.title": "6. नकली निवेश विज्ञापन",
    "fraud.6.desc": "सेलिब्रिटी के प्रतिरूपण, नकली लोगो और संदिग्ध संपर्क विवरण का उपयोग करने वाले विज्ञापन।",
    "fraud.7.title": "7. फिशिंग / नकली लिंक",
    "fraud.7.desc": "नकली वेबसाइटें या KYC अनुरोध जो आपकी लॉगिन साख चुराने के लिए डिज़ाइन किए गए हैं।",
    "fraud.8.title": "8. नकली प्रशंसापत्र",
    "fraud.8.desc": "मुनाफे और सफलता की कहानियों के मनगढ़ंत स्क्रीनशॉट जिनका उपयोग आपको धोखा देने के लिए किया जाता है।",
    "fraud.9.title": "9. पंप-एंड-डंप योजनाएं",
    "fraud.9.desc": "धोखेबाजों द्वारा अपने शेयर बेचने से पहले कीमतों को कृत्रिम रूप से बढ़ाने के लिए सस्ते शेयरों का प्रचार।",
    "fraud.10.title": "10. अपंजीकृत सलाह",
    "fraud.10.desc": "ऐसे व्यक्तियों से निवेश सलाह प्राप्त करना जो SEBI निवेश सलाहकार के रूप में पंजीकृत नहीं हैं।",
    "fraud.11.title": "11. भर्ती-आधारित योजनाएं",
    "fraud.11.desc": "ऐसी योजनाएं जहां आप वास्तविक बाजार रिटर्न के बजाय मुख्य रूप से नए निवेशकों की भर्ती करके कमाते हैं।",
    "fraud.12.title": "12. अवरुद्ध निकासी",
    "fraud.12.desc": "प्लेटफॉर्म जो मुनाफे का अनुकरण करते हैं लेकिन वास्तविक निकासी को रोकने के लिए अंतहीन बहाने बनाते हैं।",

    "grievance.title": "शिकायत नेविगेशन",
    "grievance.desc": "अपनी समस्या को पहचानें और सही रिपोर्टिंग मार्ग का पालन करें। साइबर धोखाधड़ी के लिए SCORES का उपयोग न करें।",
    "grievance.l1": "स्तर 1: संबंधित इकाई",
    "grievance.l1d": "सबसे पहले, शामिल कंपनी, ब्रोकर या प्लेटफॉर्म से संपर्क करें और अपनी शिकायत दर्ज करें। शिकायत संख्या और उनकी प्रतिक्रिया रखें।",
    "grievance.l2": "स्तर 2: स्मार्ट ODR / एक्सचेंज",
    "grievance.l2d": "यदि ब्रोकर द्वारा अनसुलझा है, तो स्टॉक एक्सचेंज या स्मार्ट ODR पोर्टल पर जाएं।",
    "grievance.l3": "स्तर 3: SEBI SCORES 2.0",
    "grievance.l3d": "यदि मामले में SEBI-पंजीकृत मध्यस्थ शामिल है और अनसुलझा है, तो आधिकारिक SCORES प्लेटफॉर्म का उपयोग करें।",

    "chat.placeholder": "अपना प्रश्न यहाँ लिखें...",
    "footer.disclaimer": "सरल सुविधा © 2026. स्वतंत्र सलाहकार उपकरण। सत्यापन के बिना आधिकारिक फाइलिंग के लिए नहीं।",
    "reminder.privacy": "अनुस्मारक: इस पोर्टल में पासवर्ड, पिन, ओटीपी या अन्य व्यक्तिगत रहस्य साझा न करें।"
  }
};

// --- ERROR BOUNDARY ---
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, errorMessage: '' }; }
  static getDerivedStateFromError(error) { return { hasError: true, errorMessage: error.toString() }; }
  render() {
    if (this.state.hasError) return (
      <div className="p-10 m-10 bg-red-50 border border-red-500 rounded-lg text-red-900 shadow-xl">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle /> Crash Detected!</h1>
        <pre className="bg-white p-4 border border-red-200 rounded text-sm overflow-auto">{this.state.errorMessage}</pre>
      </div>
    );
    return this.props.children; 
  }
}

// --- MAIN APPLICATION LOGIC ---
function AppContent() {
  const [lang, setLang] = useState(null); 
  const [fontScale, setFontScale] = useState(100); 
  const [lowDataMode, setLowDataMode] = useState(false);
  const t = (key) => TRANSLATIONS[lang || 'en']?.[key] || key;
  const fileInputRef = useRef(null);

  const [currentView, setCurrentView] = useState('home'); 
  const [appMode, setAppMode] = useState('scam_check'); 
  const [cases, setCases] = useState([]);
  const [metrics, setMetrics] = useState(null);
  
  const [incident, setIncident] = useState({
    id: `case_${Date.now()}`,
    title: "New Interaction",
    user_problem: "",
    language: "English",
    suspicious_content: "",
    screenshot_base64: null,
    urls_contacts: [],
    user_provided_facts: "",
    extracted_evidence: {},
    ai_analysis: { scam_check: null, claim_check: null, evidence_builder: null, complaint_draft: null },
    complaint_status: "NEW",
  });

  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [expandedWhy, setExpandedWhy] = useState(null); 

  // Global Font Scale Applier
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  const increaseFont = () => setFontScale(p => Math.min(p + 10, 160));
  const decreaseFont = () => setFontScale(p => Math.max(p - 10, 80));
  const resetFont = () => setFontScale(100);

  // Fetch metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/metrics");
        const data = await res.json();
        setMetrics(data);
      } catch (e) {
        setMetrics({ official: { status: "unavailable", message: "Official data currently unavailable" }, community: { cases_analyzed: 0, complaints_drafted: 0 } });
      }
    };
    if (lang) fetchMetrics();
  }, [currentView, lang]);

  useEffect(() => {
    if (lang) {
      setChatHistory([{ sender: 'bot', text: lang === 'hi' ? "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?" : "Welcome. How can I help you today?" }]);
      updateIncident('language', lang === 'hi' ? 'Hindi' : 'English');
    }
  }, [lang]);

  const updateIncident = (field, value) => setIncident(prev => ({ ...prev, [field]: value }));
  const updateEvidence = (field, value) => setIncident(prev => ({ ...prev, extracted_evidence: { ...(prev.extracted_evidence || {}), [field]: value } }));

  const startNewCase = (mode) => {
    setIncident({
      id: `case_${Date.now()}`, title: `${mode.replace('_', ' ').toUpperCase()}`, user_problem: "", language: lang === 'hi' ? 'Hindi' : 'English', suspicious_content: "", screenshot_base64: null, urls_contacts: [], user_provided_facts: "", extracted_evidence: {},
      ai_analysis: { scam_check: null, claim_check: null, evidence_builder: null, complaint_draft: null }, complaint_status: "NEW"
    });
    setAppMode(mode);
    setActiveTab(mode === 'scam_check' ? 'text' : 'scores');
    setCurrentView('case');
  };

  const loadCase = (c) => {
    setIncident(c);
    if (c.ai_analysis.complaint_draft) setAppMode('complaint');
    else if (c.complaint_status === 'CONFIRMING_EVIDENCE') setAppMode('confirm_evidence');
    else if (c.ai_analysis.evidence_builder) setAppMode('emergency');
    else if (c.ai_analysis.claim_check) setAppMode('claim_check');
    else setAppMode('scam_check');
    setCurrentView('case');
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = (targetField) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice input not supported in this browser.");
    if (isListening) { setIsListening(false); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      updateIncident(targetField, incident[targetField] ? `${incident[targetField]} ${text}` : text);
      setIsListening(false);
    };
    recognition.start();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64Data = event.target.result;
      if (lowDataMode) {
        const img = new Image(); img.src = base64Data;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600; const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH; canvas.height = img.height * scaleSize;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          updateIncident('screenshot_base64', canvas.toDataURL("image/jpeg", 0.6));
        };
      } else { updateIncident('screenshot_base64', base64Data); }
    };
  };

  const removeImage = () => {
    updateIncident('screenshot_base64', null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const apiCall = async (endpoint, analysisKey, statusUpdate) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(incident) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to process");
      
      const updated = { ...incident, ai_analysis: { ...incident.ai_analysis, [analysisKey]: data }, complaint_status: statusUpdate };
      if (analysisKey === 'evidence_builder') updated.extracted_evidence = data.extracted_evidence;

      setIncident(updated);
      setCases(prev => {
        const exists = prev.find(c => c.id === updated.id);
        if (exists) return prev.map(c => c.id === updated.id ? updated : c);
        return [...prev, updated];
      });
    } catch (err) { alert("Error: " + err.message); } finally { setLoading(false); }
  };

  const proceedToConfirmation = async () => {
    await apiCall('build_evidence', 'evidence_builder', 'CONFIRMING_EVIDENCE');
    setAppMode('confirm_evidence');
  };

  const confirmAndGenerateComplaint = async () => {
    const facts = `Confirmed Evidence: ${JSON.stringify(incident.extracted_evidence || {})}`;
    updateIncident('user_problem', facts);
    setAppMode('complaint');
  };

  const executeComplaintDraft = async () => {
    await apiCall('analyze', 'complaint_draft', 'READY_TO_SUBMIT');
  }

  const escalateFromScamToEmergency = () => {
    const ext = incident.ai_analysis?.scam_check?.extracted_content;
    let facts = incident.suspicious_content ? `Message: ${incident.suspicious_content}. ` : "";
    if (ext) facts += `Sender: ${ext.sender_or_org || 'Unknown'}, Amount: ${ext.amount_or_return || 'Unknown'}.`;
    updateIncident('user_provided_facts', facts);
    setAppMode('emergency');
  };

  const downloadTxt = () => {
    const draft = incident.ai_analysis?.complaint_draft?.formal_complaint_text;
    if (!draft) return;
    const el = document.createElement("a");
    el.href = URL.createObjectURL(new Blob([draft], { type: 'text/plain' }));
    el.download = `Grievance_Draft_${incident.id}.txt`;
    el.click();
  };

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: chatMessage }]);
    const msg = chatMessage; setChatMessage("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: msg, language: lang === 'hi' ? 'Hindi' : 'English' }) });
      const data = await res.json();
      setChatHistory(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (e) { console.error(e); }
  };

  const fontSizeClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base';

  // Computed Check for Submittability
  const canSubmitDetect = incident.suspicious_content?.trim() !== '' || 
                          incident.screenshot_base64 !== null || 
                          (incident.urls_contacts[0] && incident.urls_contacts[0].trim() !== '');


  if (lang === null) {
    return (
      <div className="fixed inset-0 bg-[#001f3f] flex items-center justify-center z-50">
        <div className="bg-white p-8 border-t-4 border-[#ea7c24] shadow-2xl max-w-md w-full text-center">
          <ShieldCheck size={48} className="mx-auto text-[#003366] mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Choose your preferred language</h2>
          <h2 className="text-xl font-bold text-gray-900 mb-6">अपनी पसंदीदा भाषा चुनें</h2>
          <div className="flex flex-col gap-3">
            <button onClick={() => setLang('hi')} className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3 font-bold text-lg transition shadow-sm">हिन्दी</button>
            <button onClick={() => setLang('en')} className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3 font-bold text-lg transition shadow-sm">English</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f4f7f6] text-gray-900 font-sans flex flex-col`}>
      
      {/* HEADER SECTION INLINED */}
      <div className="bg-[#132a41] text-gray-200 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center font-sans">
        <div>{t('top.disclaimer')}</div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLowDataMode(!lowDataMode)} className={`hidden sm:flex items-center gap-1 font-bold px-2 py-0.5 rounded-sm ${lowDataMode ? 'bg-amber-600 text-white' : 'hover:text-white'}`}><Wifi size={12}/> Low Data Mode</button>
          <div className="flex gap-1.5 font-bold">
            <button onClick={decreaseFont} className="hover:text-white">A-</button> |
            <button onClick={resetFont} className="hover:text-white">A</button> |
            <button onClick={increaseFont} className="hover:text-white">A+</button>
          </div>
          <div className="flex gap-2 font-bold">
            <button onClick={() => setLang('hi')} className={`hover:text-white ${lang === 'hi' ? 'text-[#ea7c24] underline' : ''}`}>हिन्दी</button>
            <span>|</span>
            <button onClick={() => setLang('en')} className={`hover:text-white ${lang === 'en' ? 'text-[#ea7c24] underline' : ''}`}>English</button>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 px-4 sm:px-8 flex justify-between items-center border-b-4 border-[#ea7c24]">
        <div className="flex items-center gap-3">
          <ShieldCheck size={42} className="text-[#003366]" />
          <div>
            <h1 className="text-2xl font-extrabold text-[#003366] tracking-tight m-0 leading-none">{t('app.title')}</h1>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{t('app.subtitle')}</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-500">
           <Lock size={14} className="text-emerald-600"/> Privacy Guaranteed
        </div>
      </div>
      <nav className="bg-[#003366] text-white px-4 sm:px-8 flex gap-6 text-sm font-semibold shadow-md overflow-x-auto">
        <button onClick={() => setCurrentView('home')} className={`py-3 hover:text-blue-200 uppercase whitespace-nowrap ${currentView === 'home' ? 'border-b-2 border-[#ea7c24]' : ''}`}>{t('nav.home')}</button>
        <button onClick={() => setCurrentView('dashboard')} className={`py-3 hover:text-blue-200 uppercase whitespace-nowrap ${currentView === 'dashboard' ? 'border-b-2 border-[#ea7c24]' : ''}`}>{t('nav.dashboard')}</button>
        <button onClick={() => setCurrentView('protection')} className={`py-3 hover:text-blue-200 uppercase whitespace-nowrap ${currentView === 'protection' ? 'border-b-2 border-[#ea7c24]' : 'opacity-90'}`}>{t('nav.protection')}</button>
        <button onClick={() => setCurrentView('fraud')} className={`py-3 hover:text-blue-200 uppercase whitespace-nowrap ${currentView === 'fraud' ? 'border-b-2 border-[#ea7c24]' : 'opacity-90'}`}>{t('nav.fraud')}</button>
        <button onClick={() => setCurrentView('grievance')} className={`py-3 hover:text-blue-200 uppercase whitespace-nowrap ${currentView === 'grievance' ? 'border-b-2 border-[#ea7c24]' : 'opacity-90'}`}>{t('nav.grievance')}</button>
        <button onClick={() => setCurrentView('about')} className={`py-3 hover:text-blue-200 uppercase whitespace-nowrap ${currentView === 'about' ? 'border-b-2 border-[#ea7c24]' : 'opacity-90'}`}>{t('nav.about')}</button>
      </nav>
      <div className="bg-[#fae6e6] text-red-800 text-xs font-semibold py-1.5 text-center border-b border-red-200 shadow-sm flex items-center justify-center gap-2">
        <Lock size={12}/> {t('reminder.privacy')}
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8">
        
        {/* --- VIEW: HOME --- */}
        {currentView === 'home' && (
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#003366] shadow-sm p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-[#003366] mb-3">{t('home.trust.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 font-medium">
                  <li>{t('home.trust.1')}</li><li>{t('home.trust.2')}</li><li>{t('home.trust.3')}</li><li>{t('home.trust.4')}</li>
                </ul>
              </div>
              <div className="bg-[#fae6e6] p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><ShieldAlert size={18}/>{t('home.scammed.title')}</h3>
                <p className="text-sm text-red-900">{t('home.scammed.desc')}</p>
                <button onClick={() => startNewCase('emergency')} className="mt-3 bg-red-700 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase hover:bg-red-800 transition">Get Assistance</button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-[#003366] shadow-sm flex flex-col">
                  <div className="bg-[#e6f0fa] text-[#003366] p-3 border-b border-[#003366] font-bold text-sm uppercase">Quick Actions</div>
                  <div className="p-6 grid sm:grid-cols-2 gap-4">
                    <button onClick={() => startNewCase('scam_check')} className="flex items-center gap-4 bg-white border border-gray-300 p-4 hover:border-[#003366] hover:bg-gray-50 transition text-left">
                      <div className="bg-[#003366] p-3 text-white shrink-0"><Search size={24}/></div>
                      <div><h3 className="font-bold text-[#003366]">{t('home.check')}</h3><p className="text-gray-500 text-xs mt-1">{t('home.check.desc')}</p></div>
                    </button>
                    <button onClick={() => startNewCase('claim_check')} className="flex items-center gap-4 bg-white border border-gray-300 p-4 hover:border-[#003366] hover:bg-gray-50 transition text-left">
                      <div className="bg-[#003366] p-3 text-white shrink-0"><Info size={24}/></div>
                      <div><h3 className="font-bold text-[#003366]">{t('home.explain')}</h3><p className="text-gray-500 text-xs mt-1">{t('home.explain.desc')}</p></div>
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-[#003366] shadow-sm flex flex-col">
                  <div className="bg-[#fae6e6] text-red-900 p-3 border-b border-[#003366] font-bold text-sm uppercase">Emergency & Grievance</div>
                  <div className="p-6 grid sm:grid-cols-2 gap-4">
                    <button onClick={() => startNewCase('emergency')} className="flex items-center gap-4 bg-white border border-gray-300 p-4 hover:border-red-700 hover:bg-red-50 transition text-left">
                      <div className="bg-red-700 p-3 text-white shrink-0"><AlertOctagon size={24}/></div>
                      <div><h3 className="font-bold text-red-700">{t('home.emergency')}</h3><p className="text-gray-500 text-xs mt-1">{t('home.emergency.desc')}</p></div>
                    </button>
                    <button onClick={() => startNewCase('complaint')} className="flex items-center gap-4 bg-white border border-gray-300 p-4 hover:border-[#003366] hover:bg-gray-50 transition text-left">
                      <div className="bg-[#ea7c24] p-3 text-white shrink-0"><FileText size={24}/></div>
                      <div><h3 className="font-bold text-[#003366]">{t('home.complaint')}</h3><p className="text-gray-500 text-xs mt-1">{t('home.complaint.desc')}</p></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Metrics & Links */}
              <div className="flex flex-col gap-6">
                <div className="bg-white border border-gray-300 shadow-sm p-5">
                  <h3 className="font-bold text-[#003366] border-b border-gray-300 pb-2 mb-4 flex items-center gap-2"><Activity size={18}/> {t('home.stats.live')}</h3>
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-50 border border-gray-300 p-3 text-center">
                      <p className="text-sm font-semibold text-gray-700 mb-1">{metrics?.official?.message || t('home.stats.loading')}</p>
                      <p className="text-[10px] text-gray-400">{t('home.stats.official')}</p>
                    </div>
                    <div className="border border-[#003366] p-3 text-center bg-[#f9fbfd]">
                      <p className="text-xl font-black text-[#ea7c24]">{metrics?.community?.cases_analyzed || 0}</p>
                      <p className="text-xs font-semibold text-[#003366]">{t('home.stats.community')}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-300 shadow-sm p-5">
                  <h3 className="font-bold text-[#003366] border-b border-gray-300 pb-2 mb-4 flex items-center gap-2"><LinkIcon size={18}/> {t('home.quicklinks')}</h3>
                  <ul className="flex flex-col gap-3 font-semibold text-[#003366] text-sm">
                    <li className="hover:underline flex items-center gap-2 cursor-pointer"><ExternalLink size={14}/> <a href="https://www.cvlkra.com/" target="_blank" rel="noreferrer">Check KYC Status</a></li>
                    <li className="hover:underline flex items-center gap-2 cursor-pointer"><ExternalLink size={14}/> <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=10" target="_blank" rel="noreferrer">SEBI Intermediaries List</a></li>
                    <li className="hover:underline flex items-center gap-2 cursor-pointer"><ExternalLink size={14}/> <a href="https://smartodr.in/" target="_blank" rel="noreferrer">Smart ODR Portal</a></li>
                    <li className="hover:underline flex items-center gap-2 cursor-pointer"><ExternalLink size={14}/> <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer">Official SCORES Website</a></li>
                    <li className="hover:underline flex items-center gap-2 cursor-pointer"><ExternalLink size={14}/> <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">National Cyber Crime Portal</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: ABOUT & PRIVACY --- */}
        {currentView === 'about' && (
          <div className="bg-white border border-[#003366] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#003366] border-b border-gray-300 pb-3 mb-6">{t('about.title')}</h2>
            
            <h3 className="font-bold text-lg text-gray-800 mb-2">{t('about.what')}</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{t('about.what.desc')}</p>
            
            <h3 className="font-bold text-lg text-gray-800 mb-2">{t('about.who')}</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{t('about.who.desc')}</p>

            <h3 className="font-bold text-lg text-gray-800 mb-2">{t('about.how')}</h3>
            <p className="text-gray-700 leading-relaxed mb-6 font-semibold text-[#003366]">{t('about.how.desc')}</p>

            <h3 className="font-bold text-lg text-gray-800 mb-2">{t('about.cannot')}</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{t('about.cannot.desc')}</p>
            
            <div className="bg-gray-100 p-4 border border-gray-300 mb-8">
              <h3 className="font-bold text-[#003366] mb-1">{t('about.identity')}</h3>
              <p className="text-gray-700 text-sm font-semibold">{t('about.identity.desc')}</p>
            </div>

            <div className="bg-gray-50 border border-gray-300 p-6 rounded-sm">
              <h3 className="font-bold text-lg text-[#003366] mb-4 flex items-center gap-2"><ShieldCheck size={20}/> {t('about.privacy')}</h3>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-600 shrink-0"/> {t('about.privacy.1')}</li>
                <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-600 shrink-0"/> {t('about.privacy.2')}</li>
                <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-600 shrink-0"/> {t('about.privacy.3')}</li>
                <li className="flex gap-2"><AlertTriangle size={18} className="text-amber-600 shrink-0"/> {t('about.privacy.4')}</li>
              </ul>
            </div>
          </div>
        )}

        {/* --- VIEW: INVESTOR PROTECTION --- */}
        {currentView === 'protection' && (
          <div className="bg-white border border-[#003366] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#003366] border-b border-gray-300 pb-3 mb-6">{t('protect.title')}</h2>
            
            <h3 className="text-lg font-bold text-[#ea7c24] mb-3">{t('protect.before')}</h3>
            <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 font-medium text-sm">
              <li>{t('protect.before.1')}</li><li>{t('protect.before.2')}</li><li>{t('protect.before.3')}</li>
            </ul>

            <h3 className="text-lg font-bold text-[#ea7c24] mb-3">{t('protect.account')}</h3>
            <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 font-medium text-sm">
              <li>{t('protect.account.1')}</li><li>{t('protect.account.2')}</li><li>{t('protect.account.3')}</li>
            </ul>

            <h3 className="text-lg font-bold text-[#ea7c24] mb-3">{t('protect.verify')}</h3>
            <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 font-medium text-sm">
              <li>{t('protect.verify.1')}</li><li>{t('protect.verify.2')}</li>
            </ul>

            <h3 className="text-lg font-bold text-[#ea7c24] mb-3">{t('protect.rights')}</h3>
            <p className="text-gray-700 text-sm mb-8 font-medium">{t('protect.rights.desc')}</p>

            <h3 className="text-lg font-bold text-[#ea7c24] mb-3">{t('protect.wrong')}</h3>
            <p className="text-gray-700 text-sm mb-4 font-medium">{t('protect.wrong.desc')}</p>

            <a href="https://investor.sebi.gov.in/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold text-sm flex items-center gap-1 mt-6"><ExternalLink size={14}/> Official SEBI Investor Education</a>
          </div>
        )}

        {/* --- VIEW: FRAUDS & SCAMS --- */}
        {currentView === 'fraud' && (
          <div className="bg-white border border-[#003366] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#003366] border-b border-gray-300 pb-3 mb-6">{t('fraud.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                 <div key={num} className="border border-gray-300 p-5 bg-gray-50 flex flex-col">
                   <h3 className="font-bold text-base text-[#003366] mb-2">{t(`fraud.${num}.title`)}</h3>
                   <p className="text-gray-700 text-sm">{t(`fraud.${num}.desc`)}</p>
                 </div>
              ))}
            </div>
            <button onClick={() => startNewCase('scam_check')} className="mt-8 bg-[#ea7c24] text-white px-6 py-3 font-bold shadow-sm rounded-sm">Check a Suspicious Message →</button>
          </div>
        )}

        {/* --- VIEW: GRIEVANCE --- */}
        {currentView === 'grievance' && (
          <div className="bg-white border border-[#003366] shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#003366] border-b border-gray-300 pb-3 mb-4">{t('grievance.title')}</h2>
            <p className="text-gray-600 mb-6 font-semibold text-sm">{t('grievance.desc')}</p>
            
            <div className="flex flex-col gap-4 relative border-l-2 border-[#003366] ml-4 pl-6">
              <div className="relative">
                <div className="absolute -left-[35px] top-1 bg-[#003366] text-white w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">1</div>
                <h3 className="font-bold text-lg text-[#003366]">{t('grievance.l1')}</h3>
                <p className="text-gray-700 text-sm">{t('grievance.l1d')}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] top-1 bg-[#003366] text-white w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">2</div>
                <h3 className="font-bold text-lg text-[#003366]">{t('grievance.l2')}</h3>
                <p className="text-gray-700 text-sm">{t('grievance.l2d')}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] top-1 bg-[#ea7c24] text-white w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">3</div>
                <h3 className="font-bold text-lg text-[#ea7c24]">{t('grievance.l3')}</h3>
                <p className="text-gray-700 text-sm">{t('grievance.l3d')}</p>
                <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-xs mt-2 flex items-center gap-1"><ExternalLink size={12}/> Visit SCORES Portal</a>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: DASHBOARD (MY CASES) --- */}
        {currentView === 'dashboard' && (
          <div className="bg-white border border-[#003366] shadow-sm">
            <div className="bg-[#e6f0fa] text-[#003366] p-4 border-b border-[#003366] font-bold uppercase flex items-center gap-2"><List size={18}/> {t('nav.dashboard')}</div>
            <div className="p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-3 font-semibold text-gray-700 text-sm">Case ID</th>
                    <th className="p-3 font-semibold text-gray-700 text-sm">Type</th>
                    <th className="p-3 font-semibold text-gray-700 text-sm">Progress Status</th>
                    <th className="p-3 font-semibold text-gray-700 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.length === 0 ? <tr><td colSpan="4" className="p-6 text-center text-gray-500">No records found.</td></tr> : cases.map(c => (
                    <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="p-3 font-mono text-xs text-gray-500">{c.id}</td>
                      <td className="p-3 font-semibold text-[#003366] text-sm">{c.title}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500">
                          <span className={c.complaint_status !== 'NEW' ? 'text-[#003366]' : ''}>Detect</span> <ChevronRight size={12}/>
                          <span className={c.ai_analysis.evidence_builder ? 'text-[#003366]' : ''}>Evidence</span> <ChevronRight size={12}/>
                          <span className={c.complaint_status === 'READY_TO_SUBMIT' ? 'text-[#ea7c24]' : ''}>Complaint Draft</span>
                        </div>
                      </td>
                      <td className="p-3"><button onClick={() => loadCase(c)} className="text-[#ea7c24] font-bold text-sm hover:underline">Open Case</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW: ACTIVE CASE FLOW --- */}
        {currentView === 'case' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-[#003366] shadow-sm flex items-center justify-between p-3">
              <div className="font-bold text-[#003366] uppercase text-sm">{t('common.reference')} <span className="font-mono font-normal text-gray-600">{incident.id}</span></div>
            </div>

            <div className="flex flex-wrap bg-white border border-gray-300 shadow-sm font-semibold text-gray-600 text-sm">
              <button onClick={() => setAppMode('scam_check')} className={`flex-1 py-3 border-r border-gray-300 transition ${appMode === 'scam_check' ? 'bg-[#003366] text-white' : 'hover:bg-gray-100'}`}>{t('tab.detect')}</button>
              <button onClick={() => setAppMode('claim_check')} className={`flex-1 py-3 border-r border-gray-300 transition ${appMode === 'claim_check' ? 'bg-[#003366] text-white' : 'hover:bg-gray-100'}`}>{t('tab.understand')}</button>
              <button onClick={() => setAppMode('emergency')} className={`flex-1 py-3 border-r border-gray-300 transition ${(appMode === 'emergency' || appMode === 'confirm_evidence') ? 'bg-red-700 text-white' : 'hover:bg-gray-100'}`}>{t('tab.preserve')}</button>
              <button onClick={() => setAppMode('complaint')} className={`flex-1 py-3 transition ${appMode === 'complaint' ? 'bg-[#ea7c24] text-white' : 'hover:bg-gray-100'}`}>{t('tab.report')}</button>
            </div>

            <div className="text-xs text-gray-500 flex items-center gap-1 justify-end"><Info size={12}/> {t('common.ai_disclaimer')}</div>

            {/* TRACK A: SCAM ANALYZER */}
            {appMode === 'scam_check' && (
              <div className="bg-white border border-[#003366] shadow-sm">
                <div className="bg-[#e6f0fa] text-[#003366] p-3 border-b border-[#003366] font-bold uppercase">{t('scam.title')}</div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4">{t('scam.subtitle')}</p>
                  
                  <div className="flex border-b border-gray-300 mb-4">
                    <button onClick={() => setActiveTab('text')} className={`px-4 py-2 font-bold text-sm ${activeTab === 'text' ? 'border-b-2 border-[#003366] text-[#003366]' : 'text-gray-500'}`}>{t('scam.tab.text')}</button>
                    <button onClick={() => setActiveTab('img')} className={`px-4 py-2 font-bold text-sm ${activeTab === 'img' ? 'border-b-2 border-[#003366] text-[#003366]' : 'text-gray-500'}`}>{t('scam.tab.img')}</button>
                    <button onClick={() => setActiveTab('link')} className={`px-4 py-2 font-bold text-sm ${activeTab === 'link' ? 'border-b-2 border-[#003366] text-[#003366]' : 'text-gray-500'}`}>{t('scam.tab.link')}</button>
                  </div>

                  {activeTab === 'text' && (
                    <div className="mb-4">
                      <textarea value={incident.suspicious_content} onChange={(e) => updateIncident('suspicious_content', e.target.value)} rows={4} className="w-full bg-white border border-gray-400 p-3 text-gray-900 rounded-sm focus:border-[#003366]" placeholder={t('scam.label.text')} />
                    </div>
                  )}

                  {activeTab === 'img' && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">{t('scam.img.desc')}</p>
                      <div className="border-2 border-dashed border-gray-400 rounded-sm flex flex-col items-center justify-center p-6 bg-gray-50 relative">
                        {!incident.screenshot_base64 ? (
                          <>
                            <ImageIcon size={32} className="text-gray-400 mb-2"/>
                            <span className="text-sm font-semibold text-gray-600 mb-2">{t('scam.upload')}</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <button className="bg-[#003366] text-white px-4 py-1.5 rounded-sm text-xs font-bold pointer-events-none">Select File</button>
                          </>
                        ) : (
                          <div className="relative w-full h-full flex flex-col items-center justify-center">
                            <img src={incident.screenshot_base64} alt="Upload preview" className="max-h-32 object-contain mb-2 border border-gray-300" />
                            <span className="text-xs font-semibold text-emerald-700 mb-2">{t('scam.image_attached')}</span>
                            <button onClick={removeImage} className="text-xs text-red-600 font-bold underline">{t('common.remove')}</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'link' && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">{t('scam.link.desc')}</p>
                      <input type="text" value={incident.urls_contacts[0] || ""} onChange={(e) => updateIncident('urls_contacts', [e.target.value])} className="w-full bg-white border border-gray-400 p-3 text-gray-900 rounded-sm focus:border-[#003366]" placeholder={t('scam.label.link')} />
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4 border-t border-gray-200 pt-4">
                    <button onClick={() => toggleSpeech('suspicious_content')} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-sm font-semibold border border-gray-400"><Mic size={16}/> {t('common.speak')}</button>
                    <button onClick={() => apiCall('check_message', 'scam_check', 'SCAM_ANALYZED')} disabled={loading || !canSubmitDetect} className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-2.5 rounded-sm font-bold shadow-sm w-full md:w-auto">{loading ? t('common.analyzing') : t('common.submit')}</button>
                  </div>

                  {incident.ai_analysis.scam_check && (
                    <div className="mt-6 border border-[#003366]">
                      <div className="bg-[#e6f0fa] p-3 border-b border-[#003366] font-bold text-[#003366]">{t('scam.risk')}</div>
                      <div className="p-5 flex flex-col gap-5">
                        
                        <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                          <h3 className={`text-2xl font-bold uppercase ${incident.ai_analysis.scam_check.risk_level.includes('HIGH') ? 'text-red-700' : incident.ai_analysis.scam_check.risk_level.includes('MEDIUM') ? 'text-[#ea7c24]' : 'text-gray-600'}`}>{incident.ai_analysis.scam_check.risk_level}</h3>
                        </div>
                        
                        {incident.ai_analysis.scam_check.failure_reason ? (
                          <div className="bg-gray-100 p-4 border border-gray-300 text-gray-700">
                            <strong>{t('scam.failed')}</strong> {incident.ai_analysis.scam_check.failure_reason}
                          </div>
                        ) : (
                          <>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="border border-gray-300 p-4 bg-gray-50">
                                <h4 className="font-bold text-gray-600 uppercase mb-3 text-xs">{t('scam.extracted')}</h4>
                                <ul className="text-sm text-gray-800 space-y-2">
                                  <li><span className="font-semibold text-gray-500">Sender/Org:</span> {incident.ai_analysis.scam_check.extracted_content?.sender_or_org}</li>
                                  <li><span className="font-semibold text-gray-500">Amount/Claim:</span> {incident.ai_analysis.scam_check.extracted_content?.amount_or_return}</li>
                                </ul>
                              </div>
                              <div className="border border-gray-300 p-4 bg-gray-50">
                                <h4 className="font-bold text-[#003366] uppercase mb-3 text-xs">{t('scam.safe')}</h4>
                                <p className="text-sm text-gray-800 font-semibold">{incident.ai_analysis.scam_check.safe_next_step}</p>
                                <h4 className="font-bold text-gray-600 uppercase mt-4 mb-2 text-xs">{t('scam.verify')}</h4>
                                <ul className="text-xs text-gray-800 list-disc list-inside">{incident.ai_analysis.scam_check.what_to_verify.map((v,i) => <li key={i}>{v}</li>)}</ul>
                              </div>
                            </div>

                            {incident.ai_analysis.scam_check.what_we_found?.length > 0 && (
                              <div className="border border-gray-300 p-4 bg-white mt-2">
                                  <h4 className="font-bold text-gray-600 uppercase mb-4 text-xs">{t('scam.warnings')}</h4>
                                  <div className="flex flex-col gap-4">
                                    {incident.ai_analysis.scam_check.what_we_found.map((sign, i) => (
                                      <div key={i} className="flex flex-col gap-1 border-l-4 border-[#ea7c24] pl-3">
                                        <span className="font-bold text-[#003366] text-sm">{sign.indicator}</span>
                                        <span className="text-xs font-mono bg-gray-100 p-1 text-gray-600">"{sign.evidence}"</span>
                                        <span className="text-sm text-gray-800 flex items-center justify-between mt-1">
                                          {sign.why_it_matters} <button onClick={() => speakText(sign.why_it_matters)} className="text-[#003366] hover:bg-gray-200 p-1 rounded-sm"><Volume2 size={14}/></button>
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                              </div>
                            )}

                            <button onClick={escalateFromScamToEmergency} className="mt-4 bg-[#ea7c24] hover:bg-[#d06c1c] text-white px-6 py-3 font-bold shadow-sm self-end transition rounded-sm">{t('scam.escalate')}</button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TRACK B: CLAIM CHECKER */}
            {appMode === 'claim_check' && (
              <div className="bg-white border border-[#003366] shadow-sm">
                <div className="bg-[#e6f0fa] text-[#003366] p-3 border-b border-[#003366] font-bold uppercase">{t('home.explain')}</div>
                <div className="p-5">
                  <textarea value={incident.suspicious_content} onChange={(e) => updateIncident('suspicious_content', e.target.value)} rows={4} className="w-full bg-white border border-gray-400 p-3 text-gray-900 mb-3 rounded-sm focus:border-[#003366]" placeholder="Paste financial claim here..."/>
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={() => toggleSpeech('suspicious_content')} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-sm font-semibold border border-gray-400"><Mic size={16}/> {t('common.speak')}</button>
                    <button onClick={() => apiCall('check_claim', 'claim_check', 'CLAIM_CHECKED')} disabled={loading || !incident.suspicious_content} className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-2.5 rounded-sm font-bold shadow-sm">{loading ? t('common.analyzing') : t('common.submit')}</button>
                  </div>

                  {incident.ai_analysis.claim_check && (
                    <div className="mt-6 border border-gray-300">
                      <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-gray-800 flex justify-between">
                        <span>Analysis</span><span className="bg-[#003366] text-white px-2 py-0.5 rounded-sm text-sm">{incident.ai_analysis.claim_check.claim_type}</span>
                      </div>
                      <div className="p-5 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                           <p className="text-gray-800 leading-relaxed max-w-3xl">{incident.ai_analysis.claim_check.explanation}</p>
                           <button onClick={() => speakText(incident.ai_analysis.claim_check.explanation)} className="bg-gray-200 text-[#003366] p-2 border border-gray-400 rounded-sm"><Volume2 size={16}/></button>
                        </div>
                        <div className="bg-[#e6f0fa] border border-[#003366] p-3 text-[#003366] text-sm"><strong>Evidence Needed:</strong> {incident.ai_analysis.claim_check.evidence_needed}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TRACK C: EMERGENCY MODE (PRESERVE) */}
            {appMode === 'emergency' && (
              <div className="bg-white border border-[#003366] shadow-sm">
                <div className="bg-red-700 text-white p-3 border-b border-red-900 font-bold uppercase">{t('emergency.title')}</div>
                <div className="p-5">
                  <div className="bg-[#fae6e6] border border-red-700 p-4 mb-6">
                    <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2"><AlertOctagon size={20} /> {t('emergency.stop')}</h3>
                    <ul className="list-disc pl-5 font-semibold text-red-800 space-y-1 text-sm">
                      <li>{t('emergency.stop.1')}</li><li>{t('emergency.stop.2')}</li><li>{t('emergency.stop.3')}</li><li>{t('emergency.stop.4')}</li>
                    </ul>
                  </div>

                  <h3 className="font-bold text-[#003366] mb-2 uppercase border-b border-gray-300 pb-1">{t('emergency.preserve')}</h3>
                  <label className="font-semibold text-gray-800 block mb-2 mt-4 text-sm">{t('emergency.label')}</label>
                  <textarea value={incident.user_provided_facts} onChange={(e) => updateIncident('user_provided_facts', e.target.value)} rows={5} className="w-full bg-white border border-gray-400 p-3 text-gray-900 mb-3 rounded-sm focus:border-red-700" />
                  
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={() => toggleSpeech('user_provided_facts')} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-sm font-semibold border border-gray-400"><Mic size={16}/> {t('common.speak')}</button>
                    <button onClick={proceedToConfirmation} disabled={loading || !incident.user_provided_facts} className="bg-red-700 hover:bg-red-800 text-white px-6 py-2.5 rounded-sm font-bold shadow-sm">{loading ? t('common.analyzing') : t('emergency.extract')}</button>
                  </div>
                </div>
              </div>
            )}

            {/* TRACK C.2: USER CONFIRMATION STEP (INTELLIGENT MISSING INFO) */}
            {appMode === 'confirm_evidence' && (
              <div className="bg-white border border-[#003366] shadow-sm">
                <div className="bg-red-700 text-white p-3 border-b border-red-900 font-bold uppercase">{t('emergency.confirm.title')}</div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4">{t('emergency.confirm.desc')}</p>
                  
                  {incident.ai_analysis.evidence_builder?.missing_information?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-400 p-4 mb-6">
                      <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2"><AlertTriangle size={18}/> {t('emergency.needs')}</h4>
                      <div className="flex flex-col gap-5">
                        {incident.ai_analysis.evidence_builder.missing_information.map((miss, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-end mb-1">
                              <label className="text-sm font-semibold text-amber-900 block">{miss.question}</label>
                              <button onClick={() => setExpandedWhy(expandedWhy === miss.field ? null : miss.field)} className="text-[10px] text-amber-700 hover:underline flex items-center gap-1"><QuestionMark size={10}/> {t('emergency.why_need')}</button>
                            </div>
                            {expandedWhy === miss.field && <p className="text-xs text-amber-800 mb-2 italic bg-amber-100 p-2 rounded-sm border border-amber-200">{miss.why_we_need_this}</p>}
                            <input type="text" value={incident.extracted_evidence[miss.field] || ""} onChange={(e) => updateEvidence(miss.field, e.target.value)} className="w-full bg-white border border-amber-300 px-3 py-2 text-sm focus:border-amber-600 rounded-sm" placeholder={`${t('common.skip')}...`}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border border-gray-300 p-4 bg-gray-50 mb-6">
                     <h4 className="font-bold text-[#003366] uppercase mb-4 text-sm flex items-center gap-2"><Edit3 size={16}/> {t('emergency.edit_confirm')}</h4>
                     <div className="grid sm:grid-cols-2 gap-4">
                        {Object.entries(incident.extracted_evidence || {}).map(([k, v]) => (
                          <div key={k}>
                            <label className="text-xs text-gray-500 font-bold uppercase block mb-1">{k.replace(/_/g, ' ')}</label>
                            <input type="text" value={v || ""} onChange={(e) => updateEvidence(k, e.target.value)} className="w-full bg-white border border-gray-300 px-3 py-2 text-sm focus:border-[#003366] rounded-sm" />
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={confirmAndGenerateComplaint} className="flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white px-6 py-3 rounded-sm font-bold shadow-sm transition"><Check size={18}/> {t('common.confirm')}</button>
                  </div>
                </div>
              </div>
            )}

            {/* TRACK D: COMPLAINT GENERATOR */}
            {appMode === 'complaint' && (
              <div className="bg-white border border-[#003366] shadow-sm">
                <div className="bg-[#e6f0fa] text-[#003366] p-3 border-b border-[#003366] font-bold uppercase">{t('complaint.title')}</div>
                <div className="p-5">
                  <textarea value={incident.user_problem} onChange={(e) => updateIncident('user_problem', e.target.value)} rows={4} className="w-full bg-gray-100 border border-gray-300 p-3 text-gray-900 mb-3 rounded-sm text-sm" readOnly />
                  
                  {incident.complaint_status !== 'READY_TO_SUBMIT' ? (
                    <div className="flex flex-col gap-4 mb-4">
                      {/* COMPLAINT READINESS CHECKLIST */}
                      <div className="bg-white border border-gray-300 p-4">
                         <h4 className="font-bold text-gray-800 mb-3">{t('complaint.readiness')}</h4>
                         <ul className="text-sm space-y-2 text-gray-600">
                           <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Incident facts organized</li>
                           <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Evidence confirmed</li>
                           {(!incident.extracted_evidence?.transaction_id && !incident.extracted_evidence?.amount_lost) && (
                              <li className="flex items-center gap-2 text-amber-600"><AlertTriangle size={16}/> Transaction details skipped (Optional)</li>
                           )}
                         </ul>
                      </div>
                      <button onClick={executeComplaintDraft} disabled={loading || !incident.user_problem} className="bg-[#ea7c24] hover:bg-[#d06c1c] text-white px-6 py-2.5 rounded-sm font-bold shadow-sm self-end">{loading ? t('common.analyzing') : t('complaint.generate')}</button>
                    </div>
                  ) : (
                    <div className="flex justify-end mb-4">
                       <span className="text-emerald-700 font-bold flex items-center gap-2"><CheckCircle2 size={18}/> {t('complaint.success')}</span>
                    </div>
                  )}

                  {incident.ai_analysis.complaint_draft && (
                    <div className="mt-6 border border-[#003366]">
                      <div className="flex border-b border-[#003366] font-bold bg-gray-100 text-gray-600">
                        <button onClick={() => setActiveTab('scores')} className={`flex-1 py-3 border-r border-[#003366] ${activeTab === 'scores' ? 'bg-[#003366] text-white' : 'hover:bg-gray-200'}`}>{t('complaint.draft')}</button>
                        <button onClick={() => setActiveTab('instructions')} className={`flex-1 py-3 ${activeTab === 'instructions' ? 'bg-[#003366] text-white' : 'hover:bg-gray-200'}`}>{t('complaint.instructions')}</button>
                      </div>
                      
                      <div className="p-0">
                        {activeTab === 'scores' && (
                          <div className="bg-[#f9fbfd] p-4">
                            <textarea readOnly rows={15} value={incident.ai_analysis.complaint_draft.formal_complaint_text} className="w-full bg-white border border-gray-300 rounded-sm p-4 font-mono text-gray-800 focus:outline-none shadow-inner text-sm" />
                            <div className="mt-3 flex justify-end">
                              <button onClick={downloadTxt} className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-sm font-bold"><Download size={16} /> {t('common.download')}</button>
                            </div>
                          </div>
                        )}
                        {activeTab === 'instructions' && (
                          <div className="p-6 bg-white">
                            <div className="bg-[#e6f0fa] border border-[#003366] p-4 mb-6">
                              <h4 className="font-bold text-[#003366] text-sm uppercase mb-1">{t('complaint.route')}</h4>
                              <p className="text-lg font-black text-[#ea7c24]">{incident.ai_analysis.complaint_draft.reporting_route}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-bold text-[#003366] text-lg">{t('complaint.instructions')}</h4>
                              <button onClick={() => speakText(incident.ai_analysis.complaint_draft.vernacular_instructions)} className="bg-gray-200 text-[#003366] p-2 border border-gray-400 rounded-sm"><Volume2 size={16}/></button>
                            </div>
                            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed mb-6">{incident.ai_analysis.complaint_draft.vernacular_instructions}</p>
                            
                            {incident.ai_analysis.complaint_draft.reporting_route === 'SCORES' ? (
                               <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer" className="inline-block bg-[#003366] text-white px-4 py-2 text-sm font-bold rounded-sm mt-2 flex items-center gap-2 w-max">{t('complaint.scores_link')} <ExternalLink size={14}/></a>
                            ) : (
                               <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="inline-block bg-red-700 text-white px-4 py-2 text-sm font-bold rounded-sm mt-2 flex items-center gap-2 w-max">{t('complaint.cyber_link')} <ExternalLink size={14}/></a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button onClick={() => setIsChatOpen(true)} className="bg-[#003366] hover:bg-[#002244] text-white p-4 rounded-full shadow-xl flex items-center gap-2 font-bold border-2 border-white"><HelpCircle size={24} /> Sahayak Help</button>
        ) : (
          <div className="bg-white border border-gray-400 w-80 h-[26rem] shadow-2xl flex flex-col rounded-sm overflow-hidden">
            <div className="bg-[#003366] p-3 flex justify-between items-center text-white font-bold border-b-4 border-[#ea7c24]">
              <span className="flex items-center gap-2"><Building2 size={18}/> AI Support</span>
              <button onClick={() => setIsChatOpen(false)} className="hover:text-gray-300"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
              {chatHistory.map((msg, idx) => (<div key={idx} className={`p-3 rounded-sm border shadow-sm text-sm ${msg.sender === 'bot' ? 'bg-white border-gray-300 text-gray-800 self-start w-[85%]' : 'bg-[#e6f0fa] border-[#003366] text-[#003366] self-end max-w-[85%] font-medium'}`}>{msg.text}</div>))}
            </div>
            <div className="p-3 border-t border-gray-300 bg-white flex gap-2">
              <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChat()} placeholder={t('chat.placeholder')} className="flex-1 bg-white border border-gray-400 rounded-sm px-3 py-2 text-sm focus:border-[#003366]" />
              <button onClick={handleChat} className="bg-[#ea7c24] hover:bg-[#d06c1c] text-white px-3 rounded-sm"><Send size={16} /></button>
            </div>
          </div>
        )}
      </div>
      
      <footer className="bg-[#132a41] text-gray-400 text-xs text-center p-4 mt-auto border-t-4 border-[#ea7c24]">
        {t('footer.disclaimer')}
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}