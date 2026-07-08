// Localization system for AGRI CONNECT AI (English, Telugu, Hindi)

export type Language = "en" | "te" | "hi";

export interface TranslationSet {
  // General
  langSelect: string;
  projectName: string;
  projectSubtitle: string;
  hackathonBadge: string;
  hackathonTheme: string;
  liveStatus: string;
  
  // Tabs
  tabFarmer: string;
  tabCrops: string;
  tabAdmin: string;
  
  // Banner
  bannerTitle: string;
  bannerDesc: string;
  selectLangLabel: string;
  
  // Farmer Inputs
  inputSuiteTitle: string;
  districtLabel: string;
  cropLabel: string;
  photoUploadLabel: string;
  photoDragText: string;
  photoFormatsText: string;
  demoHelperTitle: string;
  riceBlastTitle: string;
  cottonPbwTitle: string;
  tomatoTlcvTitle: string;
  askQuestionLabel: string;
  questionPlaceholder: string;
  listeningText: string;
  getAdvisoryButton: string;
  clearInputsButton: string;
  micAlertUnsupported: string;
  micAlertError: string;
  ttsUnsupported: string;
  
  // Output Sheet / Advisory
  awaitingTitle: string;
  awaitingDesc: string;
  liveGeminiDiagBadge: string;
  audioVoiceBadge: string;
  simSmsBadge: string;
  generatingAdvisoryTitle: string;
  generatingAdvisoryDesc: string;
  advisoryGeneratedBadge: string;
  advisorySourceText: string;
  stopAudioButton: string;
  listenAudioButton: string;
  speechSpeedOption: string;
  newDiagnosisButton: string;
  speakingNarrationStatus: string;
  visibleSymptomsLabel: string;
  pathogenCauseLabel: string;
  organicRemedyLabel: string;
  chemicalRemedyLabel: string;
  preventionLabel: string;
  smsPayloadLabel: string;
  audioTranscriptLabel: string;
  escalateToExpertButton: string;
  escalatingText: string;
  escalatedToRskBadge: string;
  
  // Escalation Slip
  escalationSlipTitle: string;
  escalationSlipSubtitle: string;
  tokenLabel: string;
  expertNameLabel: string;
  designationLabel: string;
  contactLabel: string;
  rskCenterLabel: string;
  visitExpertMessage: string;
  
  // Crop Suggester Panel
  cropsPanelTitle: string;
  cropsPanelSubtitle: string;
  selectDistrictCrops: string;
  agriPolicyBadge: string;
  agriPolicyText: string;
  soilHealthLabel: string;
  groundwaterLabel: string;
  groundwaterFooter: string;
  rainfallLabel: string;
  rainfallFooter: string;
  highYieldCropsHeader: string;
  tableCropHeader: string;
  tableVarietyHeader: string;
  tableSowingHeader: string;
  tableYieldHeader: string;
  tableSubsidyHeader: string;

  // Admin Dashboard
  adminTitle: string;
  adminSubtitle: string;
  refreshStatsButton: string;
  refreshingText: string;
  kpiTotalQueries: string;
  kpiActiveFarmers: string;
  kpiEscalatedRsk: string;
  kpiReferralRate: string;
  kpiAiResolved: string;
  kpiInstantSms: string;
  kpiLanguageRatio: string;
  kpiDualLocalization: string;
  districtReportsHeader: string;
  topCropsHeader: string;
  noSubmissionsYet: string;
  submissionsStreamHeader: string;
  liveUpdatesActiveBadge: string;
  audioTextBadge: string;
  causeLabelAdmin: string;
  organicTreatmentLabelAdmin: string;
  chemicalRemedyLabelAdmin: string;
  preventionLabelAdmin: string;
  simSmsSentLabelAdmin: string;
  audioSpeechLabelAdmin: string;
  liveDemoAdditionBadge: string;
  farmerLabelAdmin: string;
  
  // Crop Names & Districts Localized
  cropRice: string;
  cropCotton: string;
  cropChilli: string;
  cropTomato: string;
  cropGroundnut: string;
  cropOther: string;
  cropSorghum: string;
  cropBengalGram: string;
  cropTurmeric: string;
  cropFoxtailMillet: string;
  cropMaize: string;
  cropPigeonpea: string;
  
  districtGuntur: string;
  districtAnantapur: string;
  districtWarangal: string;
  districtKarimnagar: string;
  districtKurnool: string;
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    langSelect: "Language",
    projectName: "AGRI CONNECT AI",
    projectSubtitle: "AI Agricultural Governance & Farm Advisory Suite",
    hackathonBadge: "National Hackathon Project",
    hackathonTheme: "Theme: Real Governance Impact",
    liveStatus: "Govt Link Live",
    
    tabFarmer: "Farmer Hub",
    tabCrops: "Crop Recommendations",
    tabAdmin: "Admin Dashboard",
    
    bannerTitle: "AI Crop Health Report & Immediate Advisory",
    bannerDesc: "Upload a picture of your crop disease or type/speak your question. Gemini AI will instantly diagnose the issue and provide organic and chemical remedies aligned with government recommendations.",
    selectLangLabel: "Select Language:",
    
    inputSuiteTitle: "Farmer Input Suite",
    districtLabel: "District",
    cropLabel: "Crop Category",
    photoUploadLabel: "Upload Crop Photo",
    photoDragText: "Drag & drop leaf photo here, or click to browse",
    photoFormatsText: "Supports PNG, JPG, JPEG (Max 10MB)",
    demoHelperTitle: "💡 Demo Samples (Click to test instantly)",
    riceBlastTitle: "Rice Blast",
    cottonPbwTitle: "Cotton Pink Worm",
    tomatoTlcvTitle: "Tomato Leaf Curl",
    askQuestionLabel: "Ask Question (In English, Telugu, or Hindi)",
    questionPlaceholder: "E.g., why are my crop leaves turning yellow? Suggest remedies.",
    listeningText: "Listening... speak into your microphone",
    getAdvisoryButton: "Get AI Advisory",
    clearInputsButton: "Clear Inputs",
    micAlertUnsupported: "Voice recognition is not supported in this browser. Please type your query.",
    micAlertError: "Error recognizing voice. Please check microphone permissions.",
    ttsUnsupported: "Text-to-Speech is not supported in this browser.",
    
    awaitingTitle: "Awaiting Farmer Inputs",
    awaitingDesc: "Please upload a crop leaf image or type/speak a query on the left. The live Gemini AI diagnosis report and SMS payload will be generated here.",
    liveGeminiDiagBadge: "Live Gemini Diagnosis",
    audioVoiceBadge: "Audio Voice Narration",
    simSmsBadge: "Simulated SMS Bubble",
    generatingAdvisoryTitle: "Generating AGRI CONNECT AI Advisory...",
    generatingAdvisoryDesc: "Gemini AI is extracting pathological features and designing biological remediation...",
    advisoryGeneratedBadge: "AI Advisory Generated",
    advisorySourceText: "Powered by Gemini 3.5 Flash",
    stopAudioButton: "Stop Audio",
    listenAudioButton: "Listen Audio",
    speechSpeedOption: "Speed",
    newDiagnosisButton: "New Diagnosis",
    speakingNarrationStatus: "Currently narrating the advisory via voice...",
    visibleSymptomsLabel: "Visible Symptoms",
    pathogenCauseLabel: "Pathogen / Cause",
    organicRemedyLabel: "Organic Treatment (100% Homemade)",
    chemicalRemedyLabel: "Chemical Remedy (Precise Dilution)",
    preventionLabel: "Agricultural Prevention",
    smsPayloadLabel: "SMS Text Delivered to Farmer",
    audioTranscriptLabel: "Audio Speech Transcript",
    escalateToExpertButton: "Escalate to Expert",
    escalatingText: "Escalating...",
    escalatedToRskBadge: "Escalated to RSK Expert",
    
    escalationSlipTitle: "Expert Appointment Ticket",
    escalationSlipSubtitle: "Assigned by Government Rythu Seva Kendra",
    tokenLabel: "Reference Token",
    expertNameLabel: "Assigned Agronomist",
    designationLabel: "Designation",
    contactLabel: "Contact Phone",
    rskCenterLabel: "RSK Division Center",
    visitExpertMessage: "Please visit the above RSK center or call the expert with your Reference Token. A digital copy of this receipt has been sent to your mobile phone.",
    
    cropsPanelTitle: "Rythu Seva Kendra - Crop Recommendation Engine",
    cropsPanelSubtitle: "Soil & Water-Based Suitability Engine (Agri Dept. Reference)",
    selectDistrictCrops: "Select District",
    agriPolicyBadge: "Government Agri Policy",
    agriPolicyText: "These crop recommendations are formulated by government agricultural scientists based on district soil surveys, ground water charts, and rainfall histories.",
    soilHealthLabel: "Soil Type & Chemistry",
    groundwaterLabel: "Groundwater Depth",
    groundwaterFooter: "Estimated water availability in borewells",
    rainfallLabel: "Average Rainfall",
    rainfallFooter: "Annual rainfall averages based on IMD data",
    highYieldCropsHeader: "High-Yield Recommended Cultivars",
    tableCropHeader: "Crop",
    tableVarietyHeader: "Recommended Variety",
    tableSowingHeader: "Sowing Window",
    tableYieldHeader: "Expected Yield",
    tableSubsidyHeader: "Government Support / Subsidy",

    adminTitle: "Governance Impact & Escalation Console",
    adminSubtitle: "Real-time tracking of AI diagnosis volume, expert referrals, and crop health alerts across Andhra Pradesh & Telangana.",
    refreshStatsButton: "Refresh Stats",
    refreshingText: "Refreshing...",
    kpiTotalQueries: "Total Queries",
    kpiActiveFarmers: "100% Active Farmers",
    kpiEscalatedRsk: "Escalated to RSK",
    kpiReferralRate: "Referral Rate",
    kpiAiResolved: "AI Resolved",
    kpiInstantSms: "Instant SMS Sent",
    kpiLanguageRatio: "Language Ratio",
    kpiDualLocalization: "Tri-Language localization",
    districtReportsHeader: "Reports by District",
    topCropsHeader: "Most Affected Crops",
    noSubmissionsYet: "No submissions yet.",
    submissionsStreamHeader: "Farmer Submissions Stream",
    liveUpdatesActiveBadge: "Live updates active",
    audioTextBadge: "Audio / Text",
    causeLabelAdmin: "Cause:",
    organicTreatmentLabelAdmin: "Organic Treatment:",
    chemicalRemedyLabelAdmin: "Chemical Remedy:",
    preventionLabelAdmin: "Prevention:",
    simSmsSentLabelAdmin: "Simulated SMS Sent:",
    audioSpeechLabelAdmin: "Audio Speech Transcript:",
    liveDemoAdditionBadge: "LIVE DEMO ADDITION",
    farmerLabelAdmin: "Farmer",
    
    cropRice: "Rice",
    cropCotton: "Cotton",
    cropChilli: "Chilli",
    cropTomato: "Tomato",
    cropGroundnut: "Groundnut",
    cropOther: "Other Crops",
    cropSorghum: "Sorghum",
    cropBengalGram: "Bengal Gram",
    cropTurmeric: "Turmeric",
    cropFoxtailMillet: "Foxtail Millet",
    cropMaize: "Maize",
    cropPigeonpea: "Pigeonpea",
    
    districtGuntur: "Guntur",
    districtAnantapur: "Anantapur",
    districtWarangal: "Warangal",
    districtKarimnagar: "Karimnagar",
    districtKurnool: "Kurnool",
  },
  te: {
    langSelect: "భాష",
    projectName: "AGRI CONNECT AI",
    projectSubtitle: "వ్యవసాయ పాలన మరియు రైతు సలహా వేదిక",
    hackathonBadge: "జాతీయ హ్యాకథాన్ ప్రాజెక్ట్",
    hackathonTheme: "థీమ్: నిజమైన పరిపాలనా ప్రభావం",
    liveStatus: "ప్రభుత్వ లింక్ లైవ్",
    
    tabFarmer: "రైతు హబ్",
    tabCrops: "పంట సిఫార్సులు",
    tabAdmin: "పరిపాలన డాష్బోర్డ్",
    
    bannerTitle: "పంట ఆరోగ్య నివేదిక మరియు తక్షణ సలహాలు",
    bannerDesc: "ఆకు ఫోటో అప్‌లోడ్ చేసి, మీ ప్రశ్న అడగండి. క్షణాల్లో సమస్యను గుర్తించి, సేంద్రీయ మరియు రసాయన మందుల వివరాలను ప్రభుత్వ సిఫార్సులతో అందిస్తాము.",
    selectLangLabel: "భాష ఎంపిక:",
    
    inputSuiteTitle: "రైతు వివరాల నమోదు",
    districtLabel: "జిల్లా",
    cropLabel: "పంట రకం",
    photoUploadLabel: "పంట ఫోటో అప్‌లోడ్",
    photoDragText: "ఫోటోను ఇక్కడ లాగి వదలండి లేదా క్లిక్ చేయండి",
    photoFormatsText: "PNG, JPG, JPEG సపోర్ట్ చేస్తుంది (గరిష్టంగా 10MB)",
    demoHelperTitle: "💡 డెమో కోసం శాంపిల్స్ (వెంటనే పరీక్షించడానికి క్లిక్ చేయండి)",
    riceBlastTitle: "వరి అగ్గితెగులు",
    cottonPbwTitle: "పత్తి గులాబీ రంగు పురుగు",
    tomatoTlcvTitle: "టమాటో ఆకు ముడుత",
    askQuestionLabel: "మీ ప్రశ్న అడగండి (తెలుగు, హిందీ లేదా ఇంగ్లీషులో)",
    questionPlaceholder: "ఉదాహరణకు, వరి ఆకులు ఎందుకు ఎర్రబడుతున్నాయి? నివారణలు చెప్పండి.",
    listeningText: "వింటున్నాము... మైక్రోఫోన్‌లో మాట్లాడండి",
    getAdvisoryButton: "సలహా పొందండి",
    clearInputsButton: "వివరాలు తొలగించు",
    micAlertUnsupported: "మొబైల్/బ్రౌజర్ వాయిస్ రికగ్నిషన్ సదుపాయం అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.",
    micAlertError: "వాయిస్ వినడంలో లోపం జరిగింది. మైక్ అనుమతులు ఒకసారి సరిచూసుకోండి.",
    ttsUnsupported: "వాయిస్ సదుపాయం బ్రౌజర్ లో అందుబాటులో లేదు.",
    
    awaitingTitle: "సలహా పత్రం కోసం ఎదురుచూస్తున్నాము",
    awaitingDesc: "ఎడమ చేతి వైపున ఉన్న బాక్స్‌లో ఆకు ఫోటోను అప్‌లోడ్ చేయండి లేదా పంట సమస్యను టైప్ చేయండి / వాయిస్ ద్వారా తెలియజేయండి.",
    liveGeminiDiagBadge: "లైవ్ జెమిని విశ్లేషణ",
    audioVoiceBadge: "వాయిస్ సలహా",
    simSmsBadge: "మొబైల్ ఎస్.ఎమ్.ఎస్",
    generatingAdvisoryTitle: "వ్యవసాయ సలహా సిద్ధమవుతోంది...",
    generatingAdvisoryDesc: "జెమిని కృత్రిమ మేధస్సు మీ పంట ఆకులను విశ్లేషించి చికిత్సలను సిద్ధం చేస్తోంది...",
    advisoryGeneratedBadge: "వ్యవసాయ సలహా సిద్ధమైంది",
    advisorySourceText: "జెమిని 3.5 ఫ్లాష్ ద్వారా అందించబడింది",
    stopAudioButton: "వాయిస్ ఆపండి",
    listenAudioButton: "వాయిస్ వినండి",
    speechSpeedOption: "వేగం",
    newDiagnosisButton: "కొత్త విశ్లేషణ",
    speakingNarrationStatus: "ప్రస్తుతం రైతు సలహాను వాయిస్ ద్వారా చదువుతోంది...",
    visibleSymptomsLabel: "గుర్తించిన లక్షణాలు",
    pathogenCauseLabel: "వ్యాప్తికి గల కారణం",
    organicRemedyLabel: "సేంద్రీయ చికిత్స (100% సహజమైనది)",
    chemicalRemedyLabel: "రసాయన నివారణ (ఖచ్చితమైన మోతాదు)",
    preventionLabel: "వ్యవసాయ జాగ్రత్తలు",
    smsPayloadLabel: "రైతు మొబైల్‌కు పంపిన ఎస్.ఎమ్.ఎస్",
    audioTranscriptLabel: "వాయిస్ సందేశ స్క్రిప్ట్",
    escalateToExpertButton: "నిపుణుడికి సిఫార్సు చేయి",
    escalatingText: "సిఫార్సు చేయబడుతోంది...",
    escalatedToRskBadge: "రైతు సేవా కేంద్రం నిపుణుడికి సిఫార్సు చేయబడింది",
    
    escalationSlipTitle: "నిపుణుల సంప్రదింపు పత్రం",
    escalationSlipSubtitle: "ప్రభుత్వ రైతు సేవా కేంద్రం (RSK) జారీ చేసినది",
    tokenLabel: "రెఫరెన్స్ టోకెన్",
    expertNameLabel: "కేటాయించిన వ్యవసాయ శాస్త్రవేత్త",
    designationLabel: "హోదా",
    contactLabel: "ఫోన్ నెంబర్",
    rskCenterLabel: "రైతు సేవా కేంద్రం వివరాలు",
    visitExpertMessage: "దయచేసి పై రైతు సేవా కేంద్రాన్ని సందర్శించండి లేదా మీ టోకెన్ నెంబర్‌తో నిపుణుడిని సంప్రదించండి. ఈ రసీదు మీ మొబైల్ నెంబర్‌కు పంపబడింది.",
    
    cropsPanelTitle: "రైతు సేవా కేంద్రం - పంటల సిఫార్సు విధానం",
    cropsPanelSubtitle: "భూసార మరియు భూగర్భ జలాల ఆధారిత పంటల ఎంపిక (వ్యవసాయ శాఖ సిఫార్సులు)",
    selectDistrictCrops: "జిల్లాను ఎంచుకోండి",
    agriPolicyBadge: "ప్రభుత్వ వ్యవసాయ విధానం",
    agriPolicyText: "ఈ పంటల సిఫార్సులు జిల్లా వారీగా జరిపిన భూసార పరీక్షలు, వర్షపాత రికార్డులు మరియు జల వనరుల ఆధారంగా ప్రభుత్వ వ్యవసాయ శాస్త్రవేత్తలచే రూపొందించబడ్డాయి.",
    soilHealthLabel: "నేల రకం & రసాయన స్థాయి",
    groundwaterLabel: "భూగర్భ జలాల లభ్యత",
    groundwaterFooter: "బోరు బావులలో నీటి లభ్యత అంచనా",
    rainfallLabel: "సగటు వర్షపాతం",
    rainfallFooter: "వాతావరణ శాఖ సగటు వర్షపాత రికార్డుల ఆధారంగా",
    highYieldCropsHeader: "అధిక దిగుబడినిచ్చే సిఫార్సు పంట రకాలు",
    tableCropHeader: "పంట",
    tableVarietyHeader: "సిఫార్సు చేసిన విత్తన రకాలు",
    tableSowingHeader: "నాటడానికి అనుకూల సమయం",
    tableYieldHeader: "సగటు దిగుబడి అంచనా",
    tableSubsidyHeader: "ప్రభుత్వ సబ్సిడీ / రాయితీలు",

    adminTitle: "పరిపాలన డాష్బోర్డ్ (పర్యవేక్షణ కేంద్రం)",
    adminSubtitle: "ఆంధ్రప్రదేశ్ & తెలంగాణ రాష్ట్రాలలో పంట తెగుళ్ల గుర్తింపు నివేదికలు, నిపుణుల సిఫార్సులు మరియు తక్షణ హెచ్చరికల పర్యవేక్షణ.",
    refreshStatsButton: "తాజా సమాచారం",
    refreshingText: "తాజా సమాచారం పొందుతోంది...",
    kpiTotalQueries: "మొత్తం విజ్ఞప్తులు",
    kpiActiveFarmers: "100% క్రియాశీల రైతులు",
    kpiEscalatedRsk: "ఆర్.ఎస్.కే కి సిఫార్సులు",
    kpiReferralRate: "సిఫార్సుల శాతం",
    kpiAiResolved: "స్వయంచాలక పరిష్కారాలు",
    kpiInstantSms: "పంపిన తక్షణ ఎస్.ఎమ్.ఎస్",
    kpiLanguageRatio: "భాషల విభజన",
    kpiDualLocalization: "త్రిభాషా స్థానికీకరణ సదుపాయం",
    districtReportsHeader: "జిల్లా వారీగా నివేదికలు",
    topCropsHeader: "అధికంగా నష్టపోయిన పంటలు",
    noSubmissionsYet: "నివేదికలు ఏవీ లేవు.",
    submissionsStreamHeader: "రైతుల నివేదికల లైవ్ ప్రవాహం",
    liveUpdatesActiveBadge: "లైవ్ అప్‌డేట్స్ ఆన్‌లో ఉన్నాయి",
    audioTextBadge: "ఆడియో / టెక్స్ట్ ద్వారా",
    causeLabelAdmin: "కారణం:",
    organicTreatmentLabelAdmin: "సేంద్రీయ చికిత్స:",
    chemicalRemedyLabelAdmin: "రసాయన నివారణ:",
    preventionLabelAdmin: "నివారణ జాగ్రత్తలు:",
    simSmsSentLabelAdmin: "పంపిన ఎస్.ఎమ్.ఎస్ సందేశం:",
    audioSpeechLabelAdmin: "వాయిస్ సందేశ స్క్రిప్ట్:",
    liveDemoAdditionBadge: "డెమో ప్రదర్శన జోడింపు",
    farmerLabelAdmin: "రైతు",
    
    cropRice: "వరి",
    cropCotton: "ప్రత్తి",
    cropChilli: "మిరప",
    cropTomato: "టమాటో",
    cropGroundnut: "వేరుశనగ",
    cropOther: "ఇతర పంటలు",
    cropSorghum: "జొన్నలు",
    cropBengalGram: "శనగలు",
    cropTurmeric: "పసుపు",
    cropFoxtailMillet: "సజ్జలు/కొర్రలు",
    cropMaize: "మొక్కజొన్న",
    cropPigeonpea: "కందులు",
    
    districtGuntur: "గుంటూరు",
    districtAnantapur: "అనంతపురం",
    districtWarangal: "వరంగల్",
    districtKarimnagar: "కరీంనగర్",
    districtKurnool: "కర్నూలు",
  },
  hi: {
    langSelect: "भाषा",
    projectName: "AGRI CONNECT AI",
    projectSubtitle: "कृत्रिम बुद्धिमत्ता (AI) कृषि प्रशासन एवं किसान सलाह मंच",
    hackathonBadge: "राष्ट्रीय हैकाथॉन परियोजना",
    hackathonTheme: "थीम: वास्तविक शासन प्रभाव",
    liveStatus: "सरकारी लिंक सक्रिय",
    
    tabFarmer: "किसान हब",
    tabCrops: "फसल सिफारिशें",
    tabAdmin: "प्रशासन डैशबोर्ड",
    
    bannerTitle: "फसल स्वास्थ्य रिपोर्ट और त्वरित परामर्श",
    bannerDesc: "फसल के पत्ते की फोटो अपलोड करें और अपनी समस्या के बारे में पूछें। हमारी जेमिनी एआई तकनीक तुरंत समस्या की पहचान कर सरकारी मानकों के अनुसार जैविक और रासायनिक उपचार प्रदान करेगी।",
    selectLangLabel: "भाषा चुनें:",
    
    inputSuiteTitle: "किसान विवरण प्रविष्टि",
    districtLabel: "जिला",
    cropLabel: "फसल का प्रकार",
    photoUploadLabel: "फसल की फोटो अपलोड करें",
    photoDragText: "पत्ते की फोटो को यहाँ खींचकर छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
    photoFormatsText: "PNG, JPG, JPEG स्वीकृत (अधिकतम 10MB)",
    demoHelperTitle: "💡 डेमो सैंपल (तुरंत परीक्षण के लिए क्लिक करें)",
    riceBlastTitle: "धान का ब्लास्ट रोग",
    cottonPbwTitle: "कपास का गुलाबी कीड़ा",
    tomatoTlcvTitle: "टमाटर पत्ता मरोड़",
    askQuestionLabel: "अपना प्रश्न पूछें (हिंदी, तेलुगु या अंग्रेजी में)",
    questionPlaceholder: "उदाहरण के लिए: मेरे धान के पत्ते पीले क्यों पड़ रहे हैं? निवारण उपाय बताएं।",
    listeningText: "सुन रहे हैं... माइक्रोफ़ोन में बोलें",
    getAdvisoryButton: "सलाह प्राप्त करें",
    clearInputsButton: "विवरण साफ करें",
    micAlertUnsupported: "इस ब्राउज़र में वॉयस पहचान सुविधा समर्थित नहीं है। कृपया अपना प्रश्न टाइप करें।",
    micAlertError: "आवाज पहचानने में त्रुटि हुई। कृपया माइक्रोफ़ोन की अनुमतियां जांचें।",
    ttsUnsupported: "इस ब्राउज़र में वॉयस वाचन सुविधा समर्थित नहीं है।",
    
    awaitingTitle: "परामर्श पत्र की प्रतीक्षा है",
    awaitingDesc: "कृपया बाईं ओर फसल के पत्ते की फोटो अपलोड करें या अपना कृषि प्रश्न टाइप करें / बोलकर दर्ज करें। जेमिनी एआई तुरंत विश्लेषण रिपोर्ट और एसएमएस यहाँ तैयार करेगा।",
    liveGeminiDiagBadge: "लाइव जेमिनी विश्लेषण",
    audioVoiceBadge: "ऑडियो वॉयस सलाह",
    simSmsBadge: "मोबाइल एसएमएस संदेश",
    generatingAdvisoryTitle: "कृषि सलाह तैयार हो रही है...",
    generatingAdvisoryDesc: "जेमिनी कृत्रिम बुद्धिमत्ता आपके पत्ते का विश्लेषण कर रही है और सटीक जैविक उपचार योजना बना रही है...",
    advisoryGeneratedBadge: "कृषि सलाह तैयार है",
    advisorySourceText: "जेमिनी 3.5 फ़्लैश द्वारा संचालित",
    stopAudioButton: "ऑडियो रोकें",
    listenAudioButton: "ऑडियो सुनें",
    speechSpeedOption: "गति",
    newDiagnosisButton: "नया विश्लेषण",
    speakingNarrationStatus: "वर्तमान में सलाह को आवाज के माध्यम से सुनाया जा रहा है...",
    visibleSymptomsLabel: "पहचाने गए लक्षण",
    pathogenCauseLabel: "संक्रमण का कारण",
    organicRemedyLabel: "जैविक उपचार (100% घरेलू एवं प्राकृतिक)",
    chemicalRemedyLabel: "रासायनिक उपचार (सटीक खुराक दर)",
    preventionLabel: "कृषि बचाव रणनीतियाँ",
    smsPayloadLabel: "किसान के मोबाइल पर भेजा गया एसएमएस",
    audioTranscriptLabel: "वॉयस संदेश प्रतिलेख",
    escalateToExpertButton: "विशेषज्ञ के पास भेजें",
    escalatingText: "भेजा जा रहा है...",
    escalatedToRskBadge: "किसान सेवा केंद्र विशेषज्ञ को रेफर किया गया",
    
    escalationSlipTitle: "विशेषज्ञ परामर्श टिकट",
    escalationSlipSubtitle: "सरकारी किसान सेवा केंद्र (RSK) द्वारा जारी",
    tokenLabel: "संदर्भ टोकन नंबर",
    expertNameLabel: "आवंटित कृषि वैज्ञानिक",
    designationLabel: "पदनाम",
    contactLabel: "संपर्क फोन नंबर",
    rskCenterLabel: "किसान सेवा केंद्र का विवरण",
    visitExpertMessage: "कृपया उपरोक्त किसान सेवा केंद्र पर जाएं या अपने संदर्भ टोकन नंबर के साथ विशेषज्ञ से संपर्क करें। इस रसीद की एक डिजिटल प्रति आपके मोबाइल नंबर पर भेजी गई है।",
    
    cropsPanelTitle: "किसान सेवा केंद्र - फसल अनुशंसा नीति",
    cropsPanelSubtitle: "मृदा एवं भूजल आधारित फसल चयन प्रणाली (कृषि विभाग संदर्भ)",
    selectDistrictCrops: "जिला चुनें",
    agriPolicyBadge: "सरकारी कृषि नीति",
    agriPolicyText: "ये फसल अनुशंसाएं सरकारी कृषि वैज्ञानिकों द्वारा जिले के मिट्टी परीक्षण, भूजल तालिकाओं और वर्षा के ऐतिहासिक आंकड़ों के आधार पर तैयार की गई हैं।",
    soilHealthLabel: "मिट्टी का प्रकार और रसायन",
    groundwaterLabel: "भूजल की गहराई",
    groundwaterFooter: "नलकूपों में पानी की अनुमानित उपलब्धता",
    rainfallLabel: "औसत वर्षा मात्रा",
    rainfallFooter: "मौसम विभाग के वार्षिक औसत वर्षा रिकॉर्ड पर आधारित",
    highYieldCropsHeader: "उच्च उपज देने वाली अनुशंसित फसल किस्में",
    tableCropHeader: "फसल",
    tableVarietyHeader: "अनुशंसित किस्म",
    tableSowingHeader: "बुवाई की समय-सीमा",
    tableYieldHeader: "अपेक्षित उपज मात्रा",
    tableSubsidyHeader: "सरकारी सहायता / सब्सिडी सहायता",

    adminTitle: "शासन प्रभाव और रेफरल कंसोल",
    adminSubtitle: "आंध्र प्रदेश और तेलंगाना राज्यों में एआई फसल रोग निदान मात्रा, विशेषज्ञ रेफरल और फसल स्वास्थ्य अलर्ट की लाइव ट्रैकिंग।",
    refreshStatsButton: "आंकड़े ताज़ा करें",
    refreshingText: "ताज़ा किया जा रहा है...",
    kpiTotalQueries: "कुल शिकायतें",
    kpiActiveFarmers: "100% सक्रिय किसान",
    kpiEscalatedRsk: "विशेषज्ञों को प्रेषित",
    kpiReferralRate: "रेफरल दर",
    kpiAiResolved: "एआई द्वारा हल",
    kpiInstantSms: "तत्काल एसएमएस वितरित",
    kpiLanguageRatio: "भाषा वितरण",
    kpiDualLocalization: "त्रिभाषी सुव्यवस्थित स्थानीयकरण",
    districtReportsHeader: "जिलावार रिपोर्ट विवरण",
    topCropsHeader: "सर्वाधिक प्रभावित फसलें",
    noSubmissionsYet: "कोई रिपोर्ट दर्ज नहीं की गई है।",
    submissionsStreamHeader: "किसान शिकायतों की लाइव स्ट्रीम",
    liveUpdatesActiveBadge: "लाइव अपडेट सक्रिय हैं",
    audioTextBadge: "ऑडियो / पाठ माध्यम",
    causeLabelAdmin: "कारण:",
    organicTreatmentLabelAdmin: "जैविक उपचार:",
    chemicalRemedyLabelAdmin: "रासायनिक उपचार:",
    preventionLabelAdmin: "बचाव रणनीतियाँ:",
    simSmsSentLabelAdmin: "भेजा गया एसएमएस संदेश:",
    audioSpeechLabelAdmin: "वॉयस संदेश प्रतिलेख:",
    liveDemoAdditionBadge: "डेमो प्रदर्शन प्रविष्टि",
    farmerLabelAdmin: "किसान",
    
    cropRice: "धान",
    cropCotton: "कपास",
    cropChilli: "मिर्च",
    cropTomato: "टमाटर",
    cropGroundnut: "मूंगफली",
    cropOther: "अन्य फसलें",
    cropSorghum: "ज्वार",
    cropBengalGram: "चना",
    cropTurmeric: "हल्दी",
    cropFoxtailMillet: "बाजरा/कंगनी",
    cropMaize: "मक्का",
    cropPigeonpea: "अरहर",
    
    districtGuntur: "गुंटूर",
    districtAnantapur: "अनंतपुर",
    districtWarangal: "वरंगल",
    districtKarimnagar: "करीमनगर",
    districtKurnool: "कुरनूल",
  }
};

// Localized Databases for the Crop Suggester
export interface LocalizedDistrictData {
  soilType: string;
  soilHealth: string;
  groundwaterDepth: string;
  rainfall: string;
  majorCrops: string[];
  recommendations: {
    crop: string;
    variety: string;
    sowingPeriod: string;
    expectedYield: string;
    subsidy: string;
  }[];
}

export const districtDatabaseTranslations: Record<Language, Record<string, LocalizedDistrictData>> = {
  en: {
    Guntur: {
      soilType: "Rich Black Cotton & Clayey Soil",
      soilHealth: "pH: 7.5 - Nitrogen: Medium - Phosphorus: High - Potassium: High",
      groundwaterDepth: "15 - 20 Meters (Medium Table)",
      rainfall: "850 - 1000 mm (High / Favorable)",
      majorCrops: ["Chilli", "Cotton", "Rice", "Maize"],
      recommendations: [
        {
          crop: "Chilli",
          variety: "Guntur Sannam (S4), LCA 334",
          sowingPeriod: "August - September (Kharif)",
          expectedYield: "15 - 18 Quintals per Acre",
          subsidy: "90% Micro Drip Irrigation subsidy available"
        },
        {
          crop: "Cotton",
          variety: "Bt-II Hybrid (Suraj, Ajit)",
          sowingPeriod: "June - July",
          expectedYield: "10 - 12 Quintals per Acre",
          subsidy: "25% Direct Subsidy on certified seed purchases"
        },
        {
          crop: "Maize",
          variety: "DHM 117, Trishulata",
          sowingPeriod: "November - December (Rabi)",
          expectedYield: "25 - 30 Quintals per Acre",
          subsidy: "100% Crop Insurance coverage under PMFBY"
        }
      ]
    },
    Anantapur: {
      soilType: "Drought-prone Red Sandy & Gravelly Soil",
      soilHealth: "pH: 6.2 - Nitrogen: Low - Phosphorus: Low - Potassium: Medium",
      groundwaterDepth: "35 - 50 Meters (Very Deep - Drought Zone)",
      rainfall: "500 - 600 mm (Low / Deficient)",
      majorCrops: ["Groundnut", "Millets", "Red Gram", "Pomegranate"],
      recommendations: [
        {
          crop: "Groundnut",
          variety: "Kadiri 6, Kadiri 9, K9",
          sowingPeriod: "June - July (Rainfed)",
          expectedYield: "6 - 8 Quintals per Acre",
          subsidy: "50% Seed distribution support on subsidy"
        },
        {
          crop: "Foxtail Millet",
          variety: "SIA 3085, Prasad",
          sowingPeriod: "July - August",
          expectedYield: "8 - 10 Quintals per Acre",
          subsidy: "Millet incentive of Rs. 5000 per hectare"
        },
        {
          crop: "Pigeonpea/Red Gram",
          variety: "LRG 41, PRG 176",
          sowingPeriod: "June",
          expectedYield: "4 - 5 Quintals per Acre",
          subsidy: "Free seed kits if grown as intercrop"
        }
      ]
    },
    Warangal: {
      soilType: "Red Sandy Loam & Black Clay Soil",
      soilHealth: "pH: 6.8 - Nitrogen: Medium - Phosphorus: Medium - Potassium: High",
      groundwaterDepth: "20 - 30 Meters (Medium-Deep)",
      rainfall: "750 - 900 mm (Medium-High)",
      majorCrops: ["Rice", "Cotton", "Maize", "Turmeric"],
      recommendations: [
        {
          crop: "Rice",
          variety: "Mattu Sanna, Telangana Sona (RNR 15048)",
          sowingPeriod: "July (Kharif) / December (Rabi)",
          expectedYield: "22 - 25 Quintals per Acre",
          subsidy: "Rythu Bharosa support eligible"
        },
        {
          crop: "Turmeric",
          variety: "IISR Pragati, PCT-8",
          sowingPeriod: "May - June",
          expectedYield: "20 - 24 Quintals per Acre (Wet)",
          subsidy: "40% Subsidy on post-harvest machines"
        },
        {
          crop: "Maize",
          variety: "Bio-9681, DHM 117",
          sowingPeriod: "July - August",
          expectedYield: "20 - 24 Quintals per Acre",
          subsidy: "Free spray equipment distribution"
        }
      ]
    },
    Karimnagar: {
      soilType: "Red Sandy Clay Loam & Alluvial pockets",
      soilHealth: "pH: 7.1 - Nitrogen: Medium - Phosphorus: Medium - Potassium: Medium",
      groundwaterDepth: "12 - 18 Meters (Good canal recharge)",
      rainfall: "800 - 950 mm (Medium-High)",
      majorCrops: ["Rice", "Maize", "Groundnut", "Cotton"],
      recommendations: [
        {
          crop: "Rice",
          variety: "Jagtial Rice 1 (JGL 1798), RNR 15048",
          sowingPeriod: "June - July",
          expectedYield: "24 - 28 Quintals per Acre",
          subsidy: "Free transport of fertilizer bags via cooperative societies"
        },
        {
          crop: "Groundnut",
          variety: "G-2, Kadiri Harithandhra",
          sowingPeriod: "October - November (Rabi)",
          expectedYield: "10 - 12 Quintals per Acre",
          subsidy: "40% financial support under oilseed cultivation scheme"
        }
      ]
    },
    Kurnool: {
      soilType: "Fertile Black Cotton Soils",
      soilHealth: "pH: 8.0 - Nitrogen: Low - Phosphorus: Low - Potassium: Very High",
      groundwaterDepth: "25 - 35 Meters (Deep)",
      rainfall: "600 - 750 mm (Low-Medium)",
      majorCrops: ["Cotton", "Sunflower", "Sorghum", "Bengal Gram"],
      recommendations: [
        {
          crop: "Bengal Gram / Chickpea",
          variety: "Nandyal Sanaga 1 (NBeG 3), JG 11",
          sowingPeriod: "October - November (Rabi)",
          expectedYield: "8 - 10 Quintals per Acre",
          subsidy: "Alternate crop diversion incentive active"
        },
        {
          crop: "Sorghum / Jowar",
          variety: "NJ 1, CSH 16",
          sowingPeriod: "September - October",
          expectedYield: "12 - 15 Quintals per Acre",
          subsidy: "Minimum Support Price procurement guaranteed at RSK"
        }
      ]
    }
  },
  te: {
    Guntur: {
      soilType: "నల్ల రేగడి మరియు బంకమట్టి నేల",
      soilHealth: "pH: 7.5 - నత్రజని: మధ్యమం - భాస్వరం: అధికం - పొటాషియం: అధికం",
      groundwaterDepth: "15 - 20 మీటర్లు (మధ్యస్థ జలమట్టం)",
      rainfall: "850 - 1000 mm (అధిక / ఆశాజనకం)",
      majorCrops: ["Chilli", "Cotton", "Rice", "Maize"],
      recommendations: [
        {
          crop: "మిరప (Chilli)",
          variety: "గుంటూరు సన్నం (S4), LCA 334",
          sowingPeriod: "ఆగస్టు - సెప్టెంబరు (ఖరీఫ్)",
          expectedYield: "ఎకరానికి 15 - 18 క్వింటాళ్లు",
          subsidy: "90% మైక్రో డ్రిప్ ఇరిగేషన్ సబ్సిడీ లభ్యం"
        },
        {
          crop: "ప్రత్తి (Cotton)",
          variety: "Bt-II హైబ్రిడ్ (సూరజ్, అజిత్)",
          sowingPeriod: "జూన్ - జూలై",
          expectedYield: "ఎకరానికి 10 - 12 క్వింటాళ్లు",
          subsidy: "ధృవీకరించబడిన విత్తనాల కొనుగోలుపై 25% నేరుగా సబ్సిడీ"
        },
        {
          crop: "మొక్కజొన్న (Maize)",
          variety: "DHM 117, త్రిశూలత",
          sowingPeriod: "నవంబరు - డిసెంబరు (రబీ)",
          expectedYield: "ఎకరానికి 25 - 30 క్వింటాళ్లు",
          subsidy: "పంటల భీమా (PMFBY) కింద పూర్తి ఉచిత కవరేజీ"
        }
      ]
    },
    Anantapur: {
      soilType: "ఎర్ర ఇసుక మరియు రాతి నేలలు (కరవు పీడిత నేలలు)",
      soilHealth: "pH: 6.2 - నత్రజని: తక్కువ - భాస్వరం: తక్కువ - పొటాషియం: మధ్యమం",
      groundwaterDepth: "35 - 50 మీటర్లు (చాలా లోతైన జలమట్టం)",
      rainfall: "500 - 600 mm (అల్ప వర్షపాతం)",
      majorCrops: ["Groundnut", "Millets", "Red Gram", "Pomegranate"],
      recommendations: [
        {
          crop: "వేరుశనగ (Groundnut)",
          variety: "కదిరి 6, కదిరి 9, K9",
          sowingPeriod: "జూన్ - జూలై (వర్షాధారం)",
          expectedYield: "ఎకరానికి 6 - 8 క్వింటాళ్లు",
          subsidy: "రాయితీ కింద 50% విత్తనాల ఉచిత పంపిణీ మద్దతు"
        },
        {
          crop: "సజ్జలు / కొర్రలు (Foxtail Millet)",
          variety: "SIA 3085, ప్రసాద్",
          sowingPeriod: "జూలై - ఆగస్టు",
          expectedYield: "ఎకరానికి 8 - 10 క్వింటాళ్లు",
          subsidy: "చిరుధాన్యాల ప్రోత్సాహకం కింద హెక్టారుకు రూ. 5000 నగదు బోనస్"
        },
        {
          crop: "కందులు (Pigeonpea/Red Gram)",
          variety: "LRG 41, PRG 176",
          sowingPeriod: "జూన్",
          expectedYield: "ఎకరానికి 4 - 5 క్వింటాళ్లు",
          subsidy: "అంతర పంటగా సాగు చేస్తే ఉచిత విత్తన కిట్లు పంపిణీ"
        }
      ]
    },
    Warangal: {
      soilType: "ఎర్ర ఇసుక దుబ్బ మరియు నల్ల బంకమట్టి నేలలు",
      soilHealth: "pH: 6.8 - నత్రజని: మధ్యమం - భాస్వరం: మధ్యమం - పొటాషియం: అధికం",
      groundwaterDepth: "20 - 30 మీటర్లు (మధ్యస్థ లోతు)",
      rainfall: "750 - 900 mm (మధ్యస్థ-అధికం)",
      majorCrops: ["Rice", "Cotton", "Maize", "Turmeric"],
      recommendations: [
        {
          crop: "వరి (Rice)",
          variety: "మట్టు సన్న, తెలంగాణ సోన (RNR 15048)",
          sowingPeriod: "జూలై (ఖరీఫ్) / డిసెంబర్ (రబీ)",
          expectedYield: "ఎకరానికి 22 - 25 క్వింటాళ్లు",
          subsidy: "రైతు బంధు / రైతు భరోసా ఆర్థిక మద్దతు లభ్యం"
        },
        {
          crop: "పసుపు (Turmeric)",
          variety: "IISR ప్రగతి, PCT-8",
          sowingPeriod: "మే - జూన్",
          expectedYield: "ఎకరానికి 20 - 24 క్వింటాళ్లు (పచ్చిది)",
          subsidy: "కోత అనంతర యంత్రాల కొనుగోలుపై 40% రాయితీ సబ్సిడీ"
        },
        {
          crop: "మొక్కజొన్న (Maize)",
          variety: "బయో-9681, DHM 117",
          sowingPeriod: "జూలై - ఆగస్టు",
          expectedYield: "ఎకరానికి 20 - 24 క్వింటాళ్లు",
          subsidy: "ఆర్.ఎస్.కే ల ద్వారా ఉచిత పిచికారీ పరికరాల పంపిణీ"
        }
      ]
    },
    Karimnagar: {
      soilType: "ఎర్ర చల్కా నేలలు మరియు ఒండ్రుమట్టి పాకెట్స్",
      soilHealth: "pH: 7.1 - నత్రజని: మధ్యమం - భాస్వరం: మధ్యమం - పొటాషియం: మధ్యమం",
      groundwaterDepth: "12 - 18 మీటర్లు (శ్రీరాంసాగర్ కాలువ ద్వారా మంచి రీఛార్జ్)",
      rainfall: "800 - 950 mm (మధ్యస్థ-అధికం)",
      majorCrops: ["Rice", "Maize", "Groundnut", "Cotton"],
      recommendations: [
        {
          crop: "వరి (Rice)",
          variety: "జగిత్యాల రైస్ 1 (JGL 1798), RNR 15048",
          sowingPeriod: "జూన్ - జూలై",
          expectedYield: "ఎకరానికి 24 - 28 క్వింటాళ్లు",
          subsidy: "సహకార సంఘాల ద్వారా ఉచిత ఎరువుల రవాణా మద్దతు"
        },
        {
          crop: "వేరుశనగ (Groundnut)",
          variety: "G-2, కదిరి హరితాంధ్ర",
          sowingPeriod: "అక్టోబర్ - నవంబర్ (రబీ)",
          expectedYield: "ఎకరానికి 10 - 12 క్వింటాళ్లు",
          subsidy: "నూనెగింజల సాగు పథకం కింద 40% ప్రత్యేక ఆర్థిక మద్దతు"
        }
      ]
    },
    Kurnool: {
      soilType: "సారవంతమైన నల్ల రేగడి నేలలు (నల్ల కపాస్ భూములు)",
      soilHealth: "pH: 8.0 - నత్రజని: తక్కువ - భాస్వరం: తక్కువ - పొటాషియం: అత్యధికం",
      groundwaterDepth: "25 - 35 మీటర్లు (లోతైన జలమట్టం)",
      rainfall: "600 - 750 mm (అల్ప-మధ్యస్థ వర్షపాతం)",
      majorCrops: ["Cotton", "Sunflower", "Sorghum", "Bengal Gram"],
      recommendations: [
        {
          crop: "శనగలు (Bengal Gram)",
          variety: "నంద్యాల శనగ 1 (NBeG 3), JG 11",
          sowingPeriod: "అక్టోబర్ - నవంబర్ (రబీ)",
          expectedYield: "ఎకరానికి 8 - 10 క్వింటాళ్లు",
          subsidy: "వరి శనగ ప్రత్యామ్నాయ సాగు ప్రత్యేక ప్రోత్సాహక సబ్సిడీ లభ్యం"
        },
        {
          crop: "జొన్నలు (Sorghum / Jowar)",
          variety: "NJ 1, CSH 16",
          sowingPeriod: "సెప్టెంబర్ - అక్టోబర్",
          expectedYield: "ఎకరానికి 12 - 15 క్వింటాళ్లు",
          subsidy: "పౌరసరఫరాల కేంద్రాల ద్వారా కనీస మద్దతు ధర (MSP) కొనుగోలు"
        }
      ]
    }
  },
  hi: {
    Guntur: {
      soilType: "समृद्ध काली कपास मिट्टी और चिकनी दोमट",
      soilHealth: "pH: 7.5 - नाइट्रोजन: मध्यम - फास्फोरस: उच्च - पोटेशियम: उच्च",
      groundwaterDepth: "15 - 20 मीटर (मध्यम जल स्तर)",
      rainfall: "850 - 1000 मिमी (उच्च / अनुकूल)",
      majorCrops: ["Chilli", "Cotton", "Rice", "Maize"],
      recommendations: [
        {
          crop: "मिर्च (Chilli)",
          variety: "गुंटूर सन्नम (S4), LCA 334",
          sowingPeriod: "अगस्त - सितंबर (खरीफ)",
          expectedYield: "15 - 18 क्विंटल प्रति एकड़",
          subsidy: "90% सूक्ष्म टपक सिंचाई (ड्रिप) सब्सिडी उपलब्ध"
        },
        {
          crop: "कपास (Cotton)",
          variety: "Bt-II हाइब्रिड (सूरज, अजीत)",
          sowingPeriod: "जून - जुलाई",
          expectedYield: "10 - 12 क्विंटल प्रति एकड़",
          subsidy: "प्रमाणित बीज खरीद पर 25% प्रत्यक्ष सब्सिडी सहायता"
        },
        {
          crop: "मक्का (Maize)",
          variety: "DHM 117, त्रिशूलता",
          sowingPeriod: "नवंबर - दिसंबर (रबी)",
          expectedYield: "25 - 30 क्विंटल प्रति एकड़",
          subsidy: "प्रधानमंत्री फसल बीमा योजना (PMFBY) के तहत पूर्ण मुफ्त कवरेज"
        }
      ]
    },
    Anantapur: {
      soilType: "सूखा प्रवण लाल रेतीली और बजरीली मिट्टी",
      soilHealth: "pH: 6.2 - नाइट्रोजन: कम - फास्फोरस: कम - पोटेशियम: मध्यम",
      groundwaterDepth: "35 - 50 मीटर (बहुत गहरा जल स्तर - सूखा क्षेत्र)",
      rainfall: "500 - 600 मिमी (कम / अल्प वर्षा)",
      majorCrops: ["Groundnut", "Millets", "Red Gram", "Pomegranate"],
      recommendations: [
        {
          crop: "मूंगफली (Groundnut)",
          variety: "कदिरी 6, कदिरी 9, K9",
          sowingPeriod: "जून - जुलाई (वर्षा आधारित)",
          expectedYield: "6 - 8 क्विंटल प्रति एकड़",
          subsidy: "रियायती दर पर 50% बीज वितरण सहायता"
        },
        {
          crop: "बाजरा/कंगनी (Foxtail Millet)",
          variety: "SIA 3085, प्रसाद",
          sowingPeriod: "जुलाई - अगस्त",
          expectedYield: "8 - 10 क्विंटल प्रति एकड़",
          subsidy: "मोटा अनाज संवर्धन योजना के तहत 5000 रुपये प्रति हेक्टेयर बोनस"
        },
        {
          crop: "अरहर/लाल चना (Red Gram)",
          variety: "LRG 41, PRG 176",
          sowingPeriod: "जून",
          expectedYield: "4 - 5 क्विंटल प्रति एकड़",
          subsidy: "अंतर-फसल के रूप में खेती करने पर निःशुल्क बीज किट वितरण"
        }
      ]
    },
    Warangal: {
      soilType: "लाल बलुई दुमट और काली दोमट मिट्टी",
      soilHealth: "pH: 6.8 - नाइट्रोजन: मध्यम - फास्फोरस: मध्यम - पोटेशियम: उच्च",
      groundwaterDepth: "20 - 30 मीटर (मध्यम-गहरा)",
      rainfall: "750 - 900 मिमी (मध्यम-उच्च)",
      majorCrops: ["Rice", "Cotton", "Maize", "Turmeric"],
      recommendations: [
        {
          crop: "धान (Rice)",
          variety: "मट्टू सन्ना, तेलंगाना सोना (RNR 15048)",
          sowingPeriod: "जुलाई (खरीफ) / दिसंबर (रबी)",
          expectedYield: "22 - 25 क्विंटल प्रति एकड़",
          subsidy: "रायथु भरोसा सरकारी सहायता के लिए पात्र"
        },
        {
          crop: "हल्दी (Turmeric)",
          variety: "IISR प्रगति, PCT-8",
          sowingPeriod: "मई - जून",
          expectedYield: "20 - 24 क्विंटल प्रति एकड़ (गीली)",
          subsidy: "फसल कटाई के उपरांत मशीनों की खरीद पर 40% सब्सिडी"
        },
        {
          crop: "मक्का (Maize)",
          variety: "बायो-9681, DHM 117",
          sowingPeriod: "जुलाई - अगस्त",
          expectedYield: "20 - 24 क्विंटल प्रति एकड़",
          subsidy: "निःशुल्क छिड़काव उपकरणों का वितरण"
        }
      ]
    },
    Karimnagar: {
      soilType: "लाल रेतीली मिट्टी और जलोढ़ मिट्टी के क्षेत्र",
      soilHealth: "pH: 7.1 - नाइट्रोजन: मध्यम - फास्फोरस: मध्यम - पोटेशियम: मध्यम",
      groundwaterDepth: "12 - 18 मीटर (SRSP नहर से अच्छा जल पुनर्भरण)",
      rainfall: "800 - 950 मिमी (मध्यम-उच्च)",
      majorCrops: ["Rice", "Maize", "Groundnut", "Cotton"],
      recommendations: [
        {
          crop: "धान (Rice)",
          variety: "जगतीयाल राइस 1 (JGL 1798), RNR 15048",
          sowingPeriod: "जून - जुलाई",
          expectedYield: "24 - 28 क्विंटल प्रति एकड़",
          subsidy: "सहकारी समितियों के माध्यम से उर्वरक बोरियों का निःशुल्क परिवहन"
        },
        {
          crop: "मूंगफली (Groundnut)",
          variety: "G-2, कदिरी हरितांध्रा",
          sowingPeriod: "अक्टूबर - नवंबर (रबी)",
          expectedYield: "10 - 12 क्विंटल प्रति एकड़",
          subsidy: "तिलहन प्रोत्साहन योजना के तहत 40% वित्तीय सहायता"
        }
      ]
    },
    Kurnool: {
      soilType: "उर्वरक काली कपास मिट्टी (रेगुड़)",
      soilHealth: "pH: 8.0 - नाइट्रोजन: कम - फास्फोरस: कम - पोटेशियम: अत्यंत उच्च",
      groundwaterDepth: "25 - 35 मीटर (गहरा जल स्तर)",
      rainfall: "600 - 750 मिमी (कम-मध्यम वर्षा)",
      majorCrops: ["Cotton", "Sunflower", "Sorghum", "Bengal Gram"],
      recommendations: [
        {
          crop: "चना (Bengal Gram / Chickpea)",
          variety: "नंद्याल चना 1 (NBeG 3), JG 11",
          sowingPeriod: "अक्टूबर - नवंबर (रबी)",
          expectedYield: "8 - 10 क्विंटल प्रति एकड़",
          subsidy: "वैकल्पिक फसल विविधीकरण प्रोत्साहन सहायता लागू"
        },
        {
          crop: "ज्वार (Sorghum / Jowar)",
          variety: "NJ 1, CSH 16",
          sowingPeriod: "सितंबर - अक्टूबर",
          expectedYield: "12 - 15 क्विंटल प्रति एकड़",
          subsidy: "न्यूनतम समर्थन मूल्य (MSP) पर किसान सेवा केंद्र द्वारा सीधी खरीद"
        }
      ]
    }
  }
};

// Localized Mock Submissions
export const getLocalizedSubmissions = (lang: Language, rawSubmissions: any[]): any[] => {
  return rawSubmissions.map((sub) => {
    // If it's a standard mock sub (sub-101 to sub-105), we can translate it cleanly!
    if (sub.id === "sub-101") {
      return {
        ...sub,
        language: lang,
        farmerName: lang === "te" ? "వెంకటేశ్వర్లు (Venkateswarlu)" : lang === "hi" ? "वेंकटेश्वरलू (Venkateswarlu)" : "Venkateswarlu",
        cropType: lang === "te" ? "వరి (Rice)" : lang === "hi" ? "धान (Rice)" : "Rice",
        queryText: lang === "te" ? "ఆకు రంగు మారుతోంది, మచ్చలు ఉన్నాయి. నివారణ చెప్పండి." : lang === "hi" ? "पत्ती का रंग बदल रहा है, धब्बे दिख रहे हैं। उपचार बताएं।" : "The leaf color is changing and there are spots. Suggest treatments.",
        diagnosis: lang === "te" ? "అగ్గితెగులు (Rice Blast)" : lang === "hi" ? "धान का ब्लास्ट रोग (Rice Blast)" : "Rice Blast (Pyricularia oryzae)",
        symptoms: lang === "te" ? "ఆకులపై నూలు కండె ఆకారపు మచ్చలు, గోధుమ రంగు అంచులు మరియు బూడిద రంగు కేంద్రం కలిగి ఉండటం." : lang === "hi" ? "पत्तियों पर आंख के आकार के धब्बे, जिनके किनारे भूरे और केंद्र धूसर (स्लेटी) होते हैं।" : "Spindle-shaped lesions on leaves with brown borders and grayish centers.",
        cause: lang === "te" ? "శిలీంద్రం (Magnaporthe oryzae) తడి వాతావరణం మరియు నత్రజని ఎరువుల అధిక వాడకం వల్ల వ్యాపిస్తుంది." : lang === "hi" ? "कवक (Magnaporthe oryzae) जो अत्यधिक नमी और नाइट्रोजन उर्वरकों के अधिक उपयोग से फैलता है।" : "Fungus (Magnaporthe oryzae) favored by high humidity and excess nitrogen fertilizer.",
        remedyOrganic: lang === "te" ? "ఎకరానికి 5 కిలోల వేప పిండి చల్లండి. సూడోమోనాస్ ఫ్లోరిసెన్స్ ద్రావణాన్ని పిచికారీ చేయండి." : lang === "hi" ? "प्रति एकड़ 5 किलो नीम की खली डालें। स्यूडोमोनास फ्लोरेसेंस घोल का छिड़काव करें।" : "Apply 5kg Neem Cake per acre. Spray Pseudomonas fluorescens suspension.",
        remedyChemical: lang === "te" ? "ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రా చొప్పున లీటరు నీటికి కలిపి పిచికారీ చేయండి." : lang === "hi" ? "ट्राइसाइक्लाजोल 75% WP @ 0.6 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।" : "Spray Tricyclazole 75% WP @ 0.6g per Liter of water.",
        prevention: lang === "te" ? "నత్రజని ఎరువులు మోతాదుకు మించి వాడకండి. రోగ నిరోధక రకాలను ఎంపిక చేసుకోండి." : lang === "hi" ? "नाइट्रोजन उर्वरकों का अत्यधिक उपयोग न करें। प्रतिरोधी किस्मों का चयन करें।" : "Avoid excessive nitrogen application. Select blast-resistant crop varieties.",
        smsText: lang === "te" ? "AGRI CONNECT AI: వరిలో అగ్గితెగులు గుర్తింపు. ట్రైసైక్లాజోల్ 0.6 గ్రా లీటరు నీటికి కలిపి పిచికారీ చేయండి. RSK ని సంప్రదించండి." : lang === "hi" ? "AGRI CONNECT AI: धान में ब्लास्ट रोग। ट्राइसाइक्लाजोल 0.6 ग्राम प्रति लीटर मिलाकर छिड़कें। सहायता हेतु नजदीकी RSK से संपर्क करें।" : "AGRI CONNECT AI: Rice Blast diagnosed. Spray Tricyclazole 0.6g/L of water. Contact nearest RSK Center for help.",
        audioText: lang === "te" ? "వరి పంటలో అగ్గి తెగులు గుర్తించబడినది. నివారణకు ఒక లీటరు నీటిలో సున్నా పాయింట్ ఆరు గ్రాముల ట్రైసైక్లాజోల్ కలిపి పిచికారీ చేయండి." : lang === "hi" ? "धान की फसल में ब्लास्ट रोग की पहचान हुई है। इसके नियंत्रण के लिए प्रति लीटर पानी में शून्य दशमलव छह ग्राम ट्राइसाइक्लाजोल मिलाकर छिड़काव करें।" : "Rice blast disease has been detected. Please spray point six grams of Tricyclazole mixed per liter of water for effective control."
      };
    }
    if (sub.id === "sub-102") {
      return {
        ...sub,
        language: lang,
        farmerName: lang === "te" ? "రామకృష్ణ (Ramakrishna)" : lang === "hi" ? "रामकृष्ण (Ramakrishna)" : "Ramakrishna",
        cropType: lang === "te" ? "ప్రత్తి (Cotton)" : lang === "hi" ? "कपास (Cotton)" : "Cotton",
        queryText: lang === "te" ? "పత్తి కాయలు ఎర్రబడి రాలిపోతున్నాయి, పురుగులు ఉన్నాయి." : lang === "hi" ? "कपास के डोंडे लाल होकर गिर रहे हैं, उनमें कीड़े हैं।" : "Cotton bolls are turning red and dropping with worms inside.",
        diagnosis: lang === "te" ? "గులాబీ రంగు కాయ తొలిచే పురుగు (Pink Bollworm)" : lang === "hi" ? "गुलाबी सुंडी (Pink Bollworm)" : "Pink Bollworm (Pectinophora gossypiella)",
        symptoms: lang === "te" ? "పూమొగ్గలు విప్పారకుండా గులాబీ రంగు రేకులతో మూసుకుపోవడం, కాయల లోపల గులాబీ రంగు లార్వా ఉండటం." : lang === "hi" ? "फूलों के डोडे ठीक से नहीं खुलते, और कली के अंदर गुलाबी रंग के लार्वा दिखाई देते हैं।" : "Rosette flowers that fail to open, and pink larvae feeding inside the cotton bolls.",
        cause: lang === "te" ? "పెక్టినోఫోరా గాసిపియెల్లా అనే పురుగు లార్వా ప్రత్తి కాయలను తిని నాశనం చేస్తుంది." : lang === "hi" ? "पेक्टिनोफोरा गॉसिपिएला कीट का लार्वा कपास के बीजों और फाइबर को खाकर नष्ट करता है।" : "Larvae of Pectinophora gossypiella boring into bolls to eat developing seeds.",
        remedyOrganic: lang === "te" ? "ఎకరానికి 8 లింగాకర్షణ బుట్టలు (Pheromone Traps) అమర్చండి. వేప నూనె 1500 ppm @ 5 ml/L పిచికారీ చేయండి." : lang === "hi" ? "प्रति एकड़ 8 फेरोमोन ट्रैप स्थापित करें। नीम का तेल 1500 ppm @ 5 मिली/लीटर छिड़कें।" : "Install 8 Pheromone Traps per acre. Spray Neem Oil 1500 ppm @ 5ml/L.",
        remedyChemical: lang === "te" ? "ప్రొఫెనోఫాస్ 50% EC @ 2 ml చొప్పున లీటరు నీటికి కలిపి సాయంత్రం వేళల్లో పిచికారీ చేయండి." : lang === "hi" ? "प्रोफेनोफॉस 50% EC @ 2 मिली प्रति लीटर पानी में मिलाकर शाम के समय छिड़काव करें।" : "Spray Profenofos 50% EC @ 2ml per Liter of water during evening hours.",
        prevention: lang === "te" ? "పంట కాలపరిమితి ముగిసిన వెంటనే ప్రత్తి మొడులను తొలగించండి. వేసవి దుక్కులు దున్నండి." : lang === "hi" ? "फसल कटाई के तुरंत बाद कपास के अवशेष हटा दें। गर्मी में गहरी जुताई करें।" : "Destroy crop residues immediately after final harvest. Practice deep summer plowing.",
        smsText: lang === "te" ? "AGRI CONNECT AI: ప్రత్తిలో గులాబీ రంగు పురుగు దాడి. ఎకరానికి 8 లింగాకర్షణ బుట్టలు పెట్టండి లేదా ప్రొఫెనోఫాస్ 2 ml పిచికారీ చేయండి." : lang === "hi" ? "AGRI CONNECT AI: कपास में गुलाबी सुंडी। प्रति एकड़ 8 फेरोमोन ट्रैप लगाएं या प्रोफेनोफॉस 2 मिली का छिड़काव करें।" : "AGRI CONNECT AI: Pink Bollworm in cotton. Install 8 Pheromone Traps per acre or spray Profenofos 2ml/L.",
        audioText: lang === "te" ? "ప్రత్తి పంటలో గులాబీ రంగు కాయ తొలిచే పురుగు ఆశించినది. నివారణకు ఎకరానికి ఎనిమిది లింగాకర్షణ బుట్టలను ఏర్పాటు చేయండి లేదా లీటరు నీటికి రెండు మిల్లీలీటర్ల ప్రొఫెనోఫాస్ కలిపి పిచికారీ చేయండి." : lang === "hi" ? "कपास की फसल में गुलाबी सुंडी कीट का प्रकोप हुआ है। बचाव के लिए प्रति एकड़ आठ फेरोमोन ट्रैप लगाएं या प्रति लीटर पानी में दो मिली प्रोफेनोफॉस मिलाकर शाम को छिड़कें।" : "Pink bollworm warning for cotton. Please set up eight pheromone traps per acre, or spray two milliliters of Profenofos mixed per liter of water."
      };
    }
    if (sub.id === "sub-103") {
      return {
        ...sub,
        language: lang,
        farmerName: lang === "te" ? "ఎం. నారాయణ (M. Narayana)" : lang === "hi" ? "एम. नारायण (M. Narayana)" : "M. Narayana",
        cropType: lang === "te" ? "టమాటో (Tomato)" : lang === "hi" ? "टमाटर (Tomato)" : "Tomato",
        queryText: lang === "te" ? "టమోటా మొక్క ఆకులు ఎర్రబడి ముడుచుకుపోతున్నాయి." : lang === "hi" ? "टमाटर के पत्ते मुड़ रहे हैं और विकास रुक गया है।" : "Tomato leaves curling up and growth is stunted.",
        diagnosis: lang === "te" ? "టమాటో ఆకు ముడుత వైరస్ (Tomato Leaf Curl Virus)" : lang === "hi" ? "टमाटर पर्ण कुंचन विषाणु (Tomato Leaf Curl Virus)" : "Tomato Leaf Curl Virus (TLCV)",
        symptoms: lang === "te" ? "ఆకులు పైకి ముడుచుకుపోవడం, పసుపు రంగులోకి మారడం మరియు మొక్క ఎదుగుదల క్షీణించడం." : lang === "hi" ? "पत्तियों का ऊपर की ओर मुड़ना, पीला पड़ना और पौधों का पूरी तरह बौना रह जाना।" : "Upward curling and yellowing of leaf margins, small leaflets, and stunted growth.",
        cause: lang === "te" ? "తెల్ల దోమ (Whitefly) ద్వారా వ్యాపించే వైరస్ వేడి వాతావరణంలో త్వరగా వ్యాపిస్తుంది." : lang === "hi" ? "गर्म और शुष्क परिस्थितियों में सफेद मक्खी (Whitefly) द्वारा फैलने वाला वायरस।" : "Virus transmitted by Whitefly (Bemisia tabaci) under hot, dry conditions.",
        remedyOrganic: lang === "te" ? "వేప నూనె (3000 ppm) @ 3ml/L పిచికారీ చేయండి. పసుపు జిగురు అట్టలు అమర్చండి." : lang === "hi" ? "नीम तेल (3000 ppm) @ 3 मिली/लीटर छिड़कें। सफेद मक्खियों के लिए पीले चिपचिपे ट्रैप लगाएं।" : "Spray Neem Oil (3000 ppm) @ 3ml/L. Install yellow sticky traps (15 per acre).",
        remedyChemical: lang === "te" ? "ఎసిటామిప్రిడ్ 20% SP @ 0.5 గ్రా లేదా ఇమిడాక్లోప్రిడ్ 17.8% SL @ 0.5 ml లీటరు నీటికి కలిపి పిచికారీ చేయండి." : lang === "hi" ? "एसिटामिप्रिड 20% SP @ 0.5 ग्राम या इमिडाक्लोप्रिड 17.8% SL @ 0.5 मिली प्रति लीटर छिड़कें।" : "Spray Acetamiprid 20% SP @ 0.5g/L or Imidacloprid 17.8% SL @ 0.5ml/L.",
        prevention: lang === "te" ? "నర్సరీ బెడ్స్‌పై రక్షణ నెట్లు వాడండి. రోగ నిరోధక రకాలను సాగు చేయండి." : lang === "hi" ? "नर्सरी में कीट-रोधी जाली का उपयोग करें। वायरस प्रतिरोधी किस्में उगाएं।" : "Use insect-proof nursery nets. Grow whitefly-resistant tomato cultivars.",
        smsText: lang === "te" ? "AGRI CONNECT AI: టమాటో ముడత వైరస్ గుర్తింపు. తెల్లదోమల నివారణకు పసుపు జిగురు అట్టలు పెట్టండి లేదా ఇమిడాక్లోప్రిడ్ 0.5ml పిచికారీ చేయండి." : lang === "hi" ? "AGRI CONNECT AI: टमाटर पर्ण कुंचन वायरस। पीले चिपचिपे ट्रैप लगाएं या इमिडाक्लोप्रिड 0.5 मिली छिड़कें।" : "AGRI CONNECT AI: Tomato Leaf Curl Virus detected. Control whiteflies with yellow sticky traps or spray Imidacloprid 0.5ml/L.",
        audioText: lang === "te" ? "టమోటా పంటలో ఆకు ముడుత వైరస్ ఆశించినది. నివారణకు ఎకరానికి పదిహేను పసుపు జిగురు అట్టలను అమర్చండి లేదా లీటరు నీటికి అర మిల్లీలీటర్ ఇమిడాక్లోప్రిడ్ కలిపి పిచికారీ చేయండి." : lang === "hi" ? "टमाटर की फसल में पर्ण कुंचन वायरस का प्रकोप देखा गया है। सफेद मक्खी नियंत्रण के लिए प्रति एकड़ पंद्रह पीले चिपचिपे कार्ड लगाएं या आधा मिली इमिडाक्लोप्रिड प्रति लीटर पानी में मिलाकर छिड़कें।" : "Tomato Leaf Curl Virus detected. Please install fifteen yellow sticky traps per acre to control whiteflies, or spray point five milliliters of Imidacloprid per liter of water."
      };
    }
    if (sub.id === "sub-104") {
      return {
        ...sub,
        language: lang,
        farmerName: lang === "te" ? "రామయ్య (Ramayya)" : lang === "hi" ? "रामैया (Ramayya)" : "Ramayya",
        cropType: lang === "te" ? "మిరప (Chilli)" : lang === "hi" ? "मिर्च (Chilli)" : "Chilli",
        queryText: lang === "te" ? "మిరప ఆకులు ముడుచుకుపోతున్నాయి, పూత రాలుతోంది." : lang === "hi" ? "मिर्च के पत्ते मुड़ रहे हैं और फूल गिर रहे हैं।" : "Chilli leaves curling upwards and flowers dropping.",
        diagnosis: lang === "te" ? "తామర పురుగులు (Thrips)" : lang === "hi" ? "थ्रिप्स कीट (Thrips)" : "Thrips (Scirtothrips dorsalis)",
        symptoms: lang === "te" ? "ఆకులు పైకి ముడుచుకుని పడవ ఆకారంలోకి మారడం, ఆకుల అడుగు భాగంలో గోధుమ గీతలు ఏర్పడటం." : lang === "hi" ? "पत्तियां ऊपर की ओर मुड़कर नाव के आकार की हो जाती हैं, और उनके नीचे कत्थई धारियां बनती हैं।" : "Upward leaf curling leading to boat-shaped leaves, with brown streaks on leaf undersides.",
        cause: lang === "te" ? "రసం పీల్చే తామర పురుగుల ఉధృతి పొడి మరియు వేడి వాతావరణంలో ఎక్కువగా ఉంటుంది." : lang === "hi" ? "गर्म और शुष्क मौसम में रस चूसने वाले थ्रिप्स कीटों का हमला तेजी से बढ़ता है।" : "Sucking pests active under dry and warm climatic conditions.",
        remedyOrganic: lang === "te" ? "ఎకరానికి 20 నీలి రంగు జిగురు కార్లు (Blue Sticky Traps) అమర్చండి. పచ్చిమిర్చి-వెల్లుల్లి కషాయం పిచికారీ చేయండి." : lang === "hi" ? "प्रति एकड़ 20 नीले चिपचिपे ट्रैप लगाएं। हरी मिर्च और लहसुन का अर्क छिड़कें।" : "Install 20 Blue Sticky Traps per acre. Spray green chilli-garlic extract.",
        remedyChemical: lang === "te" ? "ఫిప్రోనిల్ 5% SC @ 2 ml లేదా స్పిన్టోరమ్ 11.7% SC @ 0.4 ml లీటరు నీటికి కలిపి పిచికారీ చేయండి." : lang === "hi" ? "फिप्रोनिल 5% SC @ 2 मिली या स्पिनटोरम 11.7% SC @ 0.4 मिली प्रति लीटर पानी में मिलाकर छिड़कें।" : "Spray Fipronil 5% SC @ 2ml/L or Spinetoram 11.7% SC @ 0.4ml/L.",
        prevention: lang === "te" ? "పొలం గట్లపై కలుపు మొక్కలను నిర్మూలించండి. అంతర పంటగా జొన్న సాగు చేయండి." : lang === "hi" ? "मेड़ों की खरपतवार नष्ट करें। सुरक्षात्मक अंतर-फसल के रूप में ज्वार बोएं।" : "Clear weeds on bunds. Grow sorghum or pearl millet as border crops.",
        smsText: lang === "te" ? "AGRI CONNECT AI: మిరపలో తామర పురుగులు. పొలంలో 20 నీలి జిగురు అట్టలు పెట్టండి. నివారణకు ఫిప్రోనిల్ 2 ml పిచికారీ చేయండి." : lang === "hi" ? "AGRI CONNECT AI: मिर्च में थ्रिप्स। 20 नीले चिपचिपे ट्रैप लगाएं। नियंत्रण के लिए फिप्रोनिल 2 मिली का छिड़काव करें।" : "AGRI CONNECT AI: Thrips in Chilli. Setup 20 Blue Sticky Traps per acre or spray Fipronil 2ml/L.",
        audioText: lang === "te" ? "మిరప పంటలో తామర పురుగులు ఆశించాయి. నివారణకు ఎకరానికి ఇరవై నీలి రంగు జిగురు అట్టలను ఏర్పాటు చేయండి లేదా లీటరు నీటికి రెండు మిల్లీలీటర్ల ఫిప్రోనిల్ కలిపి పిచికారీ చేయండి." : lang === "hi" ? "मिर्च की फसल में थ्रिप्स कीट का हमला हुआ है। इसके निवारण के लिए प्रति एकड़ बीस नीले चिपचिपे कार्ड लगाएं या प्रति लीटर पानी में दो मिली फिप्रोनिल मिलाकर छिड़काव करें।" : "Thrips infestation in Chilli. Please install twenty blue sticky traps per acre, or spray two milliliters of Fipronil mixed per liter of water."
      };
    }
    if (sub.id === "sub-105") {
      return {
        ...sub,
        language: lang,
        farmerName: lang === "te" ? "లక్ష్మీదేవి (Lakshmidevi)" : lang === "hi" ? "लक्ष्मीदेवी (Lakshmidevi)" : "Lakshmidevi",
        cropType: lang === "te" ? "వేరుశనగ (Groundnut)" : lang === "hi" ? "मूंगफली (Groundnut)" : "Groundnut",
        queryText: lang === "te" ? "మొక్కలు ఎండిపోతున్నాయి, వేర్లు కుళ్ళిపోయాయి." : lang === "hi" ? "पौधे सूख रहे हैं, जड़ें गल गई हैं।" : "Plants are drying up and roots are rotting.",
        diagnosis: lang === "te" ? "వేరు కుళ్ళు తెగులు (Stem Rot)" : lang === "hi" ? "तना सड़न रोग (Stem Rot)" : "Stem Rot (Sclerotium rolfsii)",
        symptoms: lang === "te" ? "మొక్క మొదలు వద్ద తెల్లటి శిలీంద్ర జాలం వ్యాపించడం, కాండం కుళ్ళిపోయి మొక్కలు చనిపోవడం." : lang === "hi" ? "पौधों के आधार पर सफेद कवक का जाल फैलना और तने का सड़कर कमजोर होना।" : "White fungal mycelium at the plant base, rotting of stems, and plant wilting.",
        cause: lang === "te" ? "నేల ద్వారా సంక్రమించే శిలీంద్రం అధిక తేమ మరియు తక్కువ గాలి ప్రసరణ వల్ల ఆశిస్తుంది." : lang === "hi" ? "मिट्टी जनित कवक (Sclerotium rolfsii) जो अत्यधिक नमी और हवा की कमी के कारण पनपता है।" : "Soil-borne fungus (Sclerotium rolfsii) favored by high soil moisture.",
        remedyOrganic: lang === "te" ? "ట్రైకోడెర్మా విరిడె @ 2 కిలోలను 100 కిలోల పశువుల ఎరువుతో కలిపి తడి నేలపై చల్లండి." : lang === "hi" ? "ट्राइकोडेर्मा विरिडी @ 2 किलो को 100 किलो गोबर की खाद में मिलाकर नम मिट्टी पर बिखेरें।" : "Mix 2kg Trichoderma viride with 100kg Farmyard Manure and apply to wet soil.",
        remedyChemical: lang === "te" ? "కార్బెండజిమ్ + మాంకోజెబ్ @ 2 గ్రా లీటరు నీటికి కలిపి మొక్క మొదళ్ల వద్ద నేలను తడపండి." : lang === "hi" ? "कार्बेन्डाजिम + मैंकोजेब @ 2 ग्राम प्रति लीटर मिलाकर पौधों के आधार की मिट्टी को गीला करें।" : "Drench soil at plant base with Carbendazim + Mancozeb @ 2g/L.",
        prevention: lang === "te" ? "పంట మార్పిడి పాటించండి. పొలంలో నీరు నిల్వ ఉండకుండా చూసుకోండి." : lang === "hi" ? "फसल चक्र (Crop Rotation) अपनाएं। खेत में जलभराव न होने दें।" : "Practice crop rotation. Ensure proper drainage to avoid waterlogging.",
        smsText: lang === "te" ? "AGRI CONNECT AI: వేరుశనగలో వేరుకుళ్ళు తెగులు. ట్రైకోడెర్మా విరిడె వాడండి లేదా సాఫ్ శిలీంద్రనాశిని 2 గ్రా నీటితో మొదళ్ల వద్ద తడపండి." : lang === "hi" ? "AGRI CONNECT AI: मूंगफली में तना सड़न। ट्राइकोडेर्मा विरिडी का उपयोग करें या साफ कवकनाशी 2 ग्राम से मिट्टी की सिंचाई करें।" : "AGRI CONNECT AI: Stem Rot in Groundnut. Use Trichoderma viride or drench soil at base with Saaf fungicide @ 2g/L.",
        audioText: lang === "te" ? "వేరుశనగ పంటలో వేరు కుళ్ళు తెగులు గుర్తించబడినది. నివారణకు ట్రైకోడెర్మా విరిడె వాడండి లేదా లీటరు నీటికి రెండు గ్రాముల సాఫ్ పొడిని కలిపి మొక్కల మొదళ్ల వద్ద పోయండి." : lang === "hi" ? "मूंगफली की फसल में तना सड़न रोग का प्रकोप देखा गया है। जैविक नियंत्रण के लिए ट्राइकोडेर्मा विरिडी का उपयोग करें अथवा प्रति लीटर पानी में दो ग्राम साफ कवकनाशी मिलाकर पौधों की जड़ों के पास सींचें।" : "Stem rot diagnosed in Groundnut. Please use Trichoderma viride bio-agent, or mix two grams of Saaf fungicide per liter of water to drench the soil around the stem base."
      };
    }
    // For newly generated submissions, keep them as is or map their crop types and fields if we can, but we can also safely display whatever language they were generated in, or translate standard fields.
    return {
      ...sub,
      // If it's a user submission, we can keep its language or let it be. But let's make sure it doesn't crash!
    };
  });
};
