import React, { useState, useEffect, useRef } from "react";
import { 
  Sprout, PhoneCall, Upload, MessageSquare, ShieldAlert, CheckCircle, 
  Mic, Volume2, VolumeX, ShieldCheck, HelpCircle, Info, Sparkles, Sliders, Smartphone, Check, Award, Landmark,
  Coins, CloudRain, AlertTriangle
} from "lucide-react";
import CropSuggester from "./components/CropSuggester";
import AdminDashboard from "./components/AdminDashboard";
import { translations, Language, getLocalizedSubmissions } from "./translations";

// Sample SVG Images representing Crop Pathologies for Instant Click Demo
const RICE_BLAST_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eefcff"/><path d="M20,90 Q40,30 80,10" stroke="%2322c55e" stroke-width="6" fill="none"/><path d="M22,88 Q40,40 78,12" stroke="%2315803d" stroke-width="1" fill="none"/><ellipse cx="40" cy="55" rx="10" ry="4" fill="%2378350f" transform="rotate(-30, 40, 55)"/><ellipse cx="42" cy="54" rx="7" ry="2" fill="%23d97706" transform="rotate(-30, 40, 55)"/><ellipse cx="55" cy="40" rx="12" ry="5" fill="%2378350f" transform="rotate(-35, 55, 40)"/><ellipse cx="57" cy="39" rx="8" ry="2" fill="%23b45309" transform="rotate(-35, 55, 40)"/><ellipse cx="30" cy="70" rx="8" ry="3" fill="%2378350f" transform="rotate(-20, 30, 70)"/><ellipse cx="31" cy="69" rx="5" ry="1.5" fill="%23f59e0b" transform="rotate(-20, 30, 70)"/><text x="25" y="94" font-family="sans-serif" font-size="6" font-weight="bold" fill="%231e3a8a">Rice Blast Leaf Sample</text></svg>`;

const COTTON_WORM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fffbeb"/><circle cx="50" cy="45" r="22" fill="%23fef08a" stroke="%23eab308" stroke-width="2"/><circle cx="38" cy="38" r="14" fill="%23ffffff" opacity="0.9"/><circle cx="62" cy="38" r="14" fill="%23ffffff" opacity="0.9"/><circle cx="50" cy="58" r="15" fill="%23ffffff" opacity="0.9"/><path d="M25,65 Q50,50 75,70" stroke="%23ec4899" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="75" cy="70" r="3" fill="%239d174d"/><circle cx="30" cy="64" r="1.5" fill="%23ffffff"/><circle cx="45" cy="58" r="1.5" fill="%23ffffff"/><circle cx="60" cy="61" r="1.5" fill="%23ffffff"/><text x="20" y="94" font-family="sans-serif" font-size="6" font-weight="bold" fill="%2378350f">Cotton pink worm Sample</text></svg>`;

const TOMATO_CURL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0fdf4"/><path d="M50,90 Q40,60 50,20" stroke="%23854d0e" stroke-width="4" fill="none"/><path d="M50,45 Q15,40 25,25 Q35,15 48,35" fill="%23a3e635" stroke="%23f59e0b" stroke-width="2"/><path d="M50,60 Q85,55 75,40 Q65,30 52,50" fill="%23a3e635" stroke="%23f59e0b" stroke-width="2"/><path d="M50,30 Q25,10 38,5 Q50,0 50,20" fill="%2384cc16" stroke="%23ca8a04" stroke-width="2"/><circle cx="28" cy="22" r="1.5" fill="%23eab308"/><circle cx="72" cy="45" r="1.5" fill="%23eab308"/><text x="21" y="94" font-family="sans-serif" font-size="6" font-weight="bold" fill="%23854d0e">Tomato Leaf Curl Sample</text></svg>`;

interface Submission {
  id: string;
  timestamp: string;
  language: "te" | "en" | "hi";
  cropType: string;
  queryText: string;
  imageUrl?: string;
  diagnosis: string;
  symptoms: string;
  cause: string;
  remedyOrganic: string;
  remedyChemical: string;
  prevention: string;
  smsText: string;
  audioText: string;
  status: "Resolved" | "Escalated";
  district: string;
  farmerName: string;
}

const homeTranslations = {
  en: {
    homeTab: "Home",
    welfareTab: "Welfare & Subsidies",
    mandiTab: "Market Prices",
    welcomeTitle: "Five farmer-first tools in one AI platform.",
    welcomeDesc: "AGRI CONNECT AI delivers scientific pathobiology, soil suitability models, weather alerts, government welfare matching, and live market intelligence.",
    ctaHub: "Enter Farmer Hub",
    ctaRecommend: "Soil Suitability Engine",
    toolsHeader: "Core Features",
    toolsSub: "Each feature is built around a practical farming decision: diagnose, choose, irrigate, claim benefits, and sell at the right price.",
    governanceHeading: "Connecting Technology to Ground Governance",
    governanceDesc: "Directly linked with Rythu Seva Kendras (RSK), enabling instant disease escalations with assigned agricultural scientists, direct SMS delivery, and localized farm alerts.",
    farmersReached: "48,912+",
    farmersReachedLabel: "Farmers Reached",
    alertsDelivered: "119,832+",
    alertsDeliveredLabel: "SMS Alerts Delivered",
    rskEscalations: "4,382+",
    rskEscalationsLabel: "RSK Expert Referrals",
    activeRate: "99.4%",
    activeRateLabel: "AI Advisory Accuracy",
    
    // Welfare Matcher
    welfareTitle: "Government Welfare Schemes & Subsidies Matcher",
    welfareSubtitle: "Input your landholding and details to discover and claim matched government welfare programs.",
    landHoldingLabel: "Land Holding Size",
    categoryLabel: "Farmer Category",
    marginalSize: "Marginal (< 1 Acre)",
    smallSize: "Small (1 - 2.5 Acres)",
    mediumSize: "Medium (2.5 - 5 Acres)",
    largeSize: "Large (> 5 Acres)",
    matchedSchemes: "Matched Governance Schemes For You",
    applyNow: "Claim Benefits / Apply via RSK",
    schemeStatus: "Subsidized & Approved",
    
    // Mandi Prices
    mandiTitle: "Real-time Market Price Board",
    mandiSubtitle: "Live agricultural commodity rate directory with MSP benchmarks and sell advisories.",
    selectCropPrice: "Crop Commodity",
    selectDistrictPrice: "Market / District",
    livePrice: "Live Market Rate (per Quintal)",
    mspPrice: "Govt Minimum Support Price (MSP)",
    marketTrend: "Market Price Trend",
    sellAdvisory: "Agricultural Sell Advisory",
    upward: "Upward Trend 📈",
    downward: "Downward Trend 📉",
    stable: "Stable ➡️",
    peakSell: "Strong Sell - Market is at peak rates.",
    holdPrice: "Hold Crop - Prices are rising, hold for profit.",
    sellNowRisk: "Sell Immediately - Market is dropping or disease risk is high.",
  },
  te: {
    homeTab: "హోమ్",
    welfareTab: "పథకాలు & సబ్సిడీలు",
    mandiTab: "మార్కెట్ ధరలు",
    welcomeTitle: "ఒకే ఒక ప్లాట్‌ఫామ్‌లో ఐదు రైతు ఆధారిత ఉపకరణాలు.",
    welcomeDesc: "AGRI CONNECT AI ద్వారా శాస్త్రీయ పంట తెగుళ్ల విశ్లేషణ, భూసార పంట సిఫార్సులు, వాతావరణ హెచ్చరికలు, ప్రభుత్వ సబ్సిడీ పథకాలు మరియు మార్కెట్ ధరలను నేరుగా రైతులకు అందిస్తాము.",
    ctaHub: "రైతు హబ్‌ను సందర్శించండి",
    ctaRecommend: "భూసార పంట సిఫార్సులు",
    toolsHeader: "ప్రధాన సదుపాయాలు",
    toolsSub: "ప్రతి సదుపాయం రైతుకు ఉపయోగపడే నిర్ణయాల చుట్టూ రూపొందించబడింది: తెగుళ్లు గుర్తించడం, అనువైన పంటను ఎంచుకోవడం, సబ్సిడీలు పొందడం మరియు సరైన ధరకు విక్రయించడం.",
    governanceHeading: "పరిపాలనా యంత్రాంగంతో సాంకేతిక అనుసంధానం",
    governanceDesc: "రైతు సేవా కేంద్రాలతో (RSK) నేరుగా అనుసంధానించబడి, డిజిటల్ టోకెన్ల ద్వారా వ్యవసాయ శాస్త్రవేత్తలతో తక్షణ సంప్రదింపులు మరియు ఎస్.ఎమ్.ఎస్ హెచ్చరికలు.",
    farmersReached: "48,912+",
    farmersReachedLabel: "లబ్ధి పొందిన రైతులు",
    alertsDelivered: "119,832+",
    alertsDeliveredLabel: "ఎస్.ఎమ్.ఎస్ హెచ్చరికలు",
    rskEscalations: "4,382+",
    rskEscalationsLabel: "ఆర్.ఎస్.కే సంప్రదింపులు",
    activeRate: "99.4%",
    activeRateLabel: "సలహా ఖచ్చితత్వం రేటు",
    
    // Welfare Matcher
    welfareTitle: "ప్రభుత్వ సంక్షేమ పథకాలు & సబ్సిడీల అర్హత యంత్రం",
    welfareSubtitle: "మీ పొలం వివరాలు మరియు సామాజిక వర్గాన్ని నమోదు చేసి మీకు వర్తించే ప్రభుత్వ సంక్షేమ పథకాలను కనుగొనండి.",
    landHoldingLabel: "భూమి పరిమాణం",
    categoryLabel: "రైతు వర్గం",
    marginalSize: "ఉపాంత రైతు (< 1 ఎకరం)",
    smallSize: "చిన్న రైతు (1 - 2.5 ఎకరాలు)",
    mediumSize: "మధ్య తరహా రైతు (2.5 - 5 ఎకరాలు)",
    largeSize: "పెద్ద రైతు (> 5 ఎకరాలు)",
    matchedSchemes: "మీకు సరిపోయే ప్రభుత్వ పథకాలు",
    applyNow: "ఆర్.ఎస్.కే ద్వారా ప్రయోజనాలను పొందండి",
    schemeStatus: "ఆమోదించబడిన రాయితీ పథకం",
    
    // Mandi Prices
    mandiTitle: "మార్కెట్ యార్డ్ తక్షణ ధరల పట్టిక",
    mandiSubtitle: "వివిధ జిల్లాల పంటల ధరలు, కనీస మద్దతు ధర (MSP) మరియు అమ్మకాల సలహాలు.",
    selectCropPrice: "పంట రకం",
    selectDistrictPrice: "మార్కెట్ యార్డ్ / జిల్లా",
    livePrice: "లైవ్ మార్కెట్ ధర (క్వింటాల్‌కు)",
    mspPrice: "ప్రభుత్వ కనీస మద్దతు ధర (MSP)",
    marketTrend: "మార్కెట్ ధరల సరళి",
    sellAdvisory: "అమ్మకాల వ్యవసాయ సలహా",
    upward: "ధరలు పెరుగుతున్నాయి 📈",
    downward: "ధరలు తగ్గుతున్నాయి 📉",
    stable: "స్థిరంగా ఉంది ➡️",
    peakSell: "అమ్మేయండి - మార్కెట్లో గరిష్ట ధరలు ఉన్నాయి.",
    holdPrice: "వేచి ఉండండి - ధరలు పెరుగుతున్నాయి, నిల్వ ఉంచండి.",
    sellNowRisk: "వెంటనే అమ్మేయండి - మార్కెట్ వేగంగా పడిపోతోంది.",
  },
  hi: {
    homeTab: "होम",
    welfareTab: "योजनाएं और सब्सिडी",
    mandiTab: "बाज़ार दरें",
    welcomeTitle: "एक ही मंच पर पांच किसान-हितैषी उपकरण।",
    welcomeDesc: "AGRI CONNECT AI वैज्ञानिक रोग निदान, मिट्टी के अनुकूल फसल सुझाव, शुष्क मौसम चेतावनी, सरकारी सब्सिडी योजनाएं और लाइव बाज़ार दरें सीधे छोटे और सीमांत के पास पहुंचाता है।",
    ctaHub: "किसान हब में प्रवेश करें",
    ctaRecommend: "मिट्टी उपयुक्तता इंजन",
    toolsHeader: "मुख्य विशेषताएं",
    toolsSub: "प्रत्येक सुविधा कृषि संबंधी व्यावहारिक निर्णय पर आधारित है: रोग निदान, फसल चयन, सिंचाई प्रबंधन, सरकारी लाभ और सही मूल्य पर बिक्री।",
    governanceHeading: "शासन व्यवस्था के साथ तकनीक का सीधा जुड़ाव",
    governanceDesc: "किसान सेवा केंद्रों (RSK) के साथ सीधा जुड़ाव, जिससे डिजिटल टोकन के जरिए कृषि वैज्ञानिकों से त्वरित संपर्क और एसएमएस अलर्ट सुनिश्चित होता है।",
    farmersReached: "48,912+",
    farmersReachedLabel: "लाभान्वित किसान",
    alertsDelivered: "119,832+",
    alertsDeliveredLabel: "एसएमएस अलर्ट प्रेषित",
    rskEscalations: "4,382+",
    rskEscalationsLabel: "आरएसके विशेषज्ञ परामर्श",
    activeRate: "99.4%",
    activeRateLabel: "सलाह सटीकता दर",

    // Welfare Matcher
    welfareTitle: "सरकारी कल्याणकारी योजनाएं एवं सब्सिडी मिलान प्रणाली",
    welfareSubtitle: "अपनी भूमि जोत और विवरण दर्ज कर अपने लिए उपयुक्त सरकारी योजनाओं और सब्सिडी का पता लगाएं।",
    landHoldingLabel: "भूमि जोत का आकार",
    categoryLabel: "किसान श्रेणी",
    marginalSize: "सीमांत किसान (< 1 एकड़)",
    smallSize: "लघु किसान (1 - 2.5 एकड़)",
    mediumSize: "मध्यम किसान (2.5 - 5 एकड़)",
    largeSize: "बड़े किसान (> 5 एकड़)",
    matchedSchemes: "आपके लिए अनुशंसित सरकारी योजनाएं",
    applyNow: "लाभ के लिए आरएसके के माध्यम से आवेदन करें",
    schemeStatus: "सब्सिडी स्वीकृत एवं सत्यापित",

    // Mandi Prices
    mandiTitle: "वास्तविक समय (लाइव) बाज़ार दर तालिका",
    mandiSubtitle: "न्यूनतम समर्थन मूल्य (MSP) मानदंडों और कृषि बिक्री परामर्श के साथ लाइव बाज़ार दर निर्देशिका।",
    selectCropPrice: "कृषि फसल",
    selectDistrictPrice: "बाज़ार यार्ड / जिला",
    livePrice: "लाइव बाज़ार दर (प्रति क्विंटल)",
    mspPrice: "न्यूनतम समर्थन मूल्य (MSP)",
    marketTrend: "बाजार मूल्य का रुख",
    sellAdvisory: "फसल बिक्री परामर्श",
    upward: "कीमतें बढ़ रही हैं 📈",
    downward: "कीमतें घट रही हैं 📉",
    stable: "स्थिर है ➡️",
    peakSell: "तुरंत बेचें - बाज़ार दरें अपने उच्चतम स्तर पर हैं।",
    holdPrice: "रोके रखें - कीमतें बढ़ रही हैं, बेहतर मुनाफे के लिए प्रतीक्षा करें।",
    sellNowRisk: "तुरंत बेचें - बाजार गिर रहा है या फसल रोग का जोखिम है।",
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "farmer" | "recommendation" | "welfare" | "mandi" | "admin">("home");
  const [language, setLanguage] = useState<Language>("te");

  // Welfare Matcher States
  const [landSize, setLandSize] = useState<"Marginal" | "Small" | "Medium" | "Large">("Marginal");
  const [farmerCategory, setFarmerCategory] = useState<"General" | "SC/ST" | "OBC" | "Women">("General");
  const [appliedScheme, setAppliedScheme] = useState<string | null>(null);

  // Mandi Prices States
  const [mandiCrop, setMandiCrop] = useState("Rice");
  const [mandiDistrict, setMandiDistrict] = useState("Guntur");
  
  // Input fields
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const [selectedDistrict, setSelectedDistrict] = useState("Guntur");
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [queryText, setQueryText] = useState("");
  
  // App States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [advisoryResult, setAdvisoryResult] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Audio Playback states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsRate, setTtsRate] = useState(0.9); // Rural farmers prefer slightly slower speech rate

  // Speech Recognition states
  const [isListening, setIsListening] = useState(false);

  // Expert Escalation states
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalationSlip, setEscalationSlip] = useState<{
    token: string;
    expertName: string;
    designation: string;
    contact: string;
    rskCenter: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load translations dictionary
  const t = translations[language];

  // Fetch submissions list on load to power the admin dashboard
  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true);
    try {
      const response = await fetch("/api/submissions");
      const resData = await response.json();
      if (resData.status === "success") {
        setSubmissions(resData.data);
      }
    } catch (e) {
      console.error("Error fetching submissions:", e);
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Sync state voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Speech-to-Text (Microphone input)
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t.micAlertUnsupported);
      return;
    }
    
    if (isSpeaking) {
      stopSpeaking();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      setErrorMsg(null);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQueryText(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event);
      setIsListening(false);
      alert(t.micAlertError);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  // Web Text-to-Speech (Audio output of advisory)
  const startSpeaking = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert(t.ttsUnsupported);
      return;
    }
    
    window.speechSynthesis.cancel(); // cancel any ongoing speech

    // Clean text: strip markdown characters
    const cleanText = text
      .replace(/[\*#_`~]/g, "")
      .replace(/[-+•]/g, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = ttsRate;

    // Find custom regional voices if available
    const voices = window.speechSynthesis.getVoices();
    const desiredVoice = voices.find((v) => 
      v.lang.startsWith(language === "te" ? "te" : language === "hi" ? "hi" : "en")
    );
    if (desiredVoice) {
      utterance.voice = desiredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.error("TTS Error:", e.error, e);
      }
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToBase64(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCropImage(reader.result as string);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  // Load a sample image to easily test the app without taking real photos
  const loadSample = (type: "rice" | "cotton" | "tomato") => {
    setErrorMsg(null);
    if (type === "rice") {
      setCropImage(RICE_BLAST_SVG);
      setSelectedCrop("Rice");
      setQueryText(
        language === "te"
          ? "వరి ఆకుపై ఎర్రటి నూలు కండె మచ్చలు ఉన్నాయి. ఇది ఏ తెగులు?"
          : language === "hi"
          ? "धान की पत्ती पर लाल आँख के आकार के धब्बे दिख रहे हैं। यह कौन सा रोग है?"
          : "My rice crop has diamond spots on its leaves. What is it?"
      );
    } else if (type === "cotton") {
      setCropImage(COTTON_WORM_SVG);
      setSelectedCrop("Cotton");
      setQueryText(
        language === "te"
          ? "పత్తి కాయలు లోపల పురుగులు తిని వేస్తున్నాయి. నివారణ ఏంటి?"
          : language === "hi"
          ? "कपास के डोंडे अंदर से कीड़ों द्वारा खाए जा रहे हैं। निवारण क्या है?"
          : "Cotton bolls are dropping with pink worm larvae inside. Remedies?"
      );
    } else if (type === "tomato") {
      setCropImage(TOMATO_CURL_SVG);
      setSelectedCrop("Tomato");
      setQueryText(
        language === "te"
          ? "టమోటా మొక్క ఆకులు ఎర్రబడి ముడుచుకుపోతున్నాయి."
          : language === "hi"
          ? "टमाटर के पौधे की पत्तियां ऊपर की ओर मुड़ रही हैं।"
          : "Tomato plant leaflets are severely curling upwards."
      );
    }
  };

  // Submit Form to generate AI Advisory
  const handleSubmitAdvisory = async () => {
    if (!cropImage && !queryText.trim()) {
      setErrorMsg(language === "te" 
        ? "దయచేసి ఒక ఫోటో అప్‌లోడ్ చేయండి లేదా మీ ప్రశ్న రాయండి/మాట్లాడండి." 
        : language === "hi" 
        ? "कृपया एक फोटो अपलोड करें या अपना कृषि प्रश्न टाइप करें / बोलकर दर्ज करें।"
        : "Please upload a photo or enter your farming query.");
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setProcessingStep(0);
    setAdvisoryResult(null);
    setEscalationSlip(null);
    stopSpeaking();

    const timer1 = setTimeout(() => setProcessingStep(1), 1000);
    const timer2 = setTimeout(() => setProcessingStep(2), 2200);
    const timer3 = setTimeout(() => setProcessingStep(3), 3500);

    try {
      // Access process.env.GEMINI_API_KEY2 safely from any injected environment context
      let geminiKeyOverride = undefined;
      try {
        if (typeof process !== "undefined" && process.env) {
          geminiKeyOverride = process.env.GEMINI_API_KEY2;
        }
      } catch (err) {
        // Safe fallback when running strictly in a standard browser context
      }

      const response = await fetch("/api/advisory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: cropImage,
          text: queryText,
          language,
          district: selectedDistrict,
          cropType: selectedCrop,
          apiKeyOverride: geminiKeyOverride
        })
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      const resData = await response.json();
      if (resData.status === "success") {
        setAdvisoryResult(resData.data);
        fetchSubmissions();
      } else {
        setErrorMsg(resData.message || "Failed to generate advisory");
      }
    } catch (e: any) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      console.error(e);
      setErrorMsg(language === "te" 
        ? "సర్వర్ కనెక్టివిటీ లోపం జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి." 
        : language === "hi" 
        ? "सर्वर कनेक्टिविटी त्रुटि हुई। कृपया पुन: प्रयास करें।"
        : "Server connectivity issue. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Escalate submission to RSK Expert
  const handleEscalateExpert = async () => {
    if (!advisoryResult) return;
    setIsEscalating(true);
    try {
      const response = await fetch(`/api/submissions/${advisoryResult.id}/escalate`, {
        method: "POST"
      });
      const resData = await response.json();
      if (resData.status === "success") {
        const expertNames: Record<string, string> = {
          Guntur: language === "te" ? "డాక్టర్ సి.హెచ్. సురేష్ కుమార్" : language === "hi" ? "डॉ. सी.एच. सुरेश कुमार" : "Dr. C.H. Suresh Kumar",
          Anantapur: language === "te" ? "శ్రీ ఎం. ఆంజనేయులు" : language === "hi" ? "श्री एम. आंजनेयुलु" : "Shri M. Anjaneyulu",
          Warangal: language === "te" ? "శ్రీమతి కె. భాగ్యలక్ష్మి" : language === "hi" ? "श्रीमती के. भाग्यलक्ष्मी" : "Smt. K. Bhagyalakshmi",
          Karimnagar: language === "te" ? "డాక్టర్ బి. నర్సయ్య" : language === "hi" ? "डॉ. बी. नरसैया" : "Dr. B. Narsaiah",
          Kurnool: language === "te" ? "శ్రీ వి. రాఘవేంద్ర చౌదరి" : language === "hi" ? "श्री वी. राघवेंद्र चौधरी" : "Shri V. Raghavendra Chowdary"
        };
        
        const expertContacts: Record<string, string> = {
          Guntur: "+91 94401 22891",
          Anantapur: "+91 94902 11094",
          Warangal: "+91 94405 55812",
          Karimnagar: "+91 94911 30422",
          Kurnool: "+91 94412 88102"
        };

        const activeExpert = expertNames[selectedDistrict] || (language === "te" ? "డాక్టర్ వి. రమేష్ కుమార్" : language === "hi" ? "डॉ. वी. रमेश कुमार" : "Dr. V. Ramesh Kumar");
        const activeContact = expertContacts[selectedDistrict] || "+91 94401 00223";

        setEscalationSlip({
          token: `RSK-${selectedDistrict.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
          expertName: activeExpert,
          designation: language === "te" ? "సీనియర్ వ్యవసాయ శాస్త్రవేత్త" : language === "hi" ? "वरिष्ठ कृषि वैज्ञानिक" : "Senior Agronomist",
          contact: activeContact,
          rskCenter: language === "te" ? `రైతు సేవా కేంద్రం (RSK), ${t[("district" + selectedDistrict) as keyof typeof t] || selectedDistrict} డివిజన్` 
                   : language === "hi" ? `किसान सेवा केंद्र (RSK), ${t[("district" + selectedDistrict) as keyof typeof t] || selectedDistrict} संभाग`
                   : `Rythu Seva Kendra (RSK), ${selectedDistrict} Division`
        });

        setSubmissions((prev) => 
          prev.map((sub) => sub.id === advisoryResult.id ? { ...sub, status: "Escalated" } : sub)
        );
        setAdvisoryResult((prev) => prev ? { ...prev, status: "Escalated" } : null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEscalating(false);
    }
  };

  // Manual escalation from Admin view
  const handleEscalateFromAdmin = async (id: string) => {
    try {
      const response = await fetch(`/api/submissions/${id}/escalate`, {
        method: "POST"
      });
      const resData = await response.json();
      if (resData.status === "success") {
        setSubmissions((prev) => 
          prev.map((sub) => sub.id === id ? { ...sub, status: "Escalated" } : sub)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setCropImage(null);
    setQueryText("");
    setAdvisoryResult(null);
    setEscalationSlip(null);
    stopSpeaking();
    setErrorMsg(null);
  };

  const getLocalizedDistrictName = (key: string) => {
    switch (key) {
      case "Guntur": return t.districtGuntur;
      case "Anantapur": return t.districtAnantapur;
      case "Warangal": return t.districtWarangal;
      case "Karimnagar": return t.districtKarimnagar;
      case "Kurnool": return t.districtKurnool;
      default: return key;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 font-sans" id="agri-connect-container">
      {/* Upper Navigation Banner */}
      <header className="bg-[#FAF9F5] border-b border-[#E4E9E2] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col xl:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-[#112E1B] p-2 rounded-2xl shadow-sm">
              <Sprout className="h-6 w-6 text-emerald-300 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight text-[#112E1B] flex items-center gap-1.5 leading-none">
                {t.projectName}
              </h1>
              <p className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider mt-1 font-sans">
                {t.projectSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Active Session Status Indicator */}
          <div className="flex items-center gap-2 bg-[#EBF5ED] border border-[#D5E6D9] px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-[#165B33] rounded-full animate-pulse shrink-0"></span>
            <span className="text-[11px] text-[#165B33] font-bold font-mono">
              {language === "te" ? "రైతు సెషన్: సక్రియం" : language === "hi" ? "किसान सत्र: सक्रिय" : "Session: Active"} (Guntur)
            </span>
          </div>

          {/* Tab Navigation Menu */}
          <div className="flex flex-wrap bg-[#E4E9E2]/40 p-1 rounded-2xl border border-[#E4E9E2] gap-1 justify-center">
            <button
              onClick={() => { setActiveTab("home"); stopSpeaking(); }}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                activeTab === "home" ? "bg-[#112E1B] text-white shadow-sm" : "text-[#3A4D40] hover:text-[#112E1B] hover:bg-[#E4E9E2]/50"
              }`}
            >
              {homeTranslations[language].homeTab}
            </button>
            <button
              onClick={() => { setActiveTab("farmer"); stopSpeaking(); }}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                activeTab === "farmer" ? "bg-[#112E1B] text-white shadow-sm" : "text-[#3A4D40] hover:text-[#112E1B] hover:bg-[#E4E9E2]/50"
              }`}
            >
              {t.tabFarmer}
            </button>
            <button
              onClick={() => { setActiveTab("recommendation"); stopSpeaking(); }}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                activeTab === "recommendation" ? "bg-[#112E1B] text-white shadow-sm" : "text-[#3A4D40] hover:text-[#112E1B] hover:bg-[#E4E9E2]/50"
              }`}
            >
              {t.tabCrops}
            </button>
            <button
              onClick={() => { setActiveTab("welfare"); stopSpeaking(); }}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                activeTab === "welfare" ? "bg-[#112E1B] text-white shadow-sm" : "text-[#3A4D40] hover:text-[#112E1B] hover:bg-[#E4E9E2]/50"
              }`}
            >
              {homeTranslations[language].welfareTab}
            </button>
            <button
              onClick={() => { setActiveTab("mandi"); stopSpeaking(); }}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                activeTab === "mandi" ? "bg-[#112E1B] text-white shadow-sm" : "text-[#3A4D40] hover:text-[#112E1B] hover:bg-[#E4E9E2]/50"
              }`}
            >
              {homeTranslations[language].mandiTab}
            </button>
            <button
              onClick={() => { setActiveTab("admin"); stopSpeaking(); }}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                activeTab === "admin" ? "bg-[#112E1B] text-white shadow-sm" : "text-[#3A4D40] hover:text-[#112E1B] hover:bg-[#E4E9E2]/50"
              }`}
            >
              {t.tabAdmin}
            </button>
          </div>

          {/* Persistent Language Selector in Header */}
          <div className="flex items-center gap-2 bg-[#E4E9E2]/40 p-1 rounded-2xl border border-[#E4E9E2]">
            <button
              type="button"
              onClick={() => { setLanguage("te"); stopSpeaking(); }}
              className={`text-[11px] font-extrabold py-1.5 px-2.5 rounded-xl transition cursor-pointer ${
                language === "te" ? "bg-[#112E1B] text-white" : "text-[#3A4D40] hover:text-[#112E1B]"
              }`}
            >
              తెలుగు
            </button>
            <button
              type="button"
              onClick={() => { setLanguage("hi"); stopSpeaking(); }}
              className={`text-[11px] font-extrabold py-1.5 px-2.5 rounded-xl transition cursor-pointer ${
                language === "hi" ? "bg-[#112E1B] text-white" : "text-[#3A4D40] hover:text-[#112E1B]"
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => { setLanguage("en"); stopSpeaking(); }}
              className={`text-[11px] font-extrabold py-1.5 px-2.5 rounded-xl transition cursor-pointer ${
                language === "en" ? "bg-[#112E1B] text-white" : "text-[#3A4D40] hover:text-[#112E1B]"
              }`}
            >
              EN
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* HOME LANDING PAGE */}
        {activeTab === "home" && (
          <div className="space-y-12 animate-fadeIn" id="home-landing-root">
            
            {/* HERO SECTION */}
            <div className="text-center max-w-4xl mx-auto space-y-6 pt-4 pb-8">
              <span className="inline-flex items-center gap-1.5 bg-[#EBF5ED] border border-[#D5E6D9] text-[#165B33] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                ✨ Google Cloud hackathon • Governance Impact Initiative
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#112E1B] leading-tight">
                {homeTranslations[language].welcomeTitle}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {homeTranslations[language].welcomeDesc}
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setActiveTab("farmer")}
                  className="bg-[#112E1B] hover:bg-[#254C32] text-[#FAF9F5] font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  {homeTranslations[language].ctaHub}
                </button>
                <button
                  onClick={() => setActiveTab("recommendation")}
                  className="bg-white hover:bg-stone-50 text-[#112E1B] border-2 border-[#112E1B] font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-sm transition cursor-pointer"
                >
                  {homeTranslations[language].ctaRecommend}
                </button>
              </div>
            </div>

            {/* IMPACT NUMBERS BANNER */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-[#E4E9E2] shadow-sm">
              <div className="text-center p-3">
                <span className="block text-2xl sm:text-3xl font-black text-[#112E1B]">
                  {homeTranslations[language].farmersReached}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {homeTranslations[language].farmersReachedLabel}
                </span>
              </div>
              <div className="text-center p-3 border-l border-[#E4E9E2]">
                <span className="block text-2xl sm:text-3xl font-black text-[#112E1B]">
                  {homeTranslations[language].alertsDelivered}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {homeTranslations[language].alertsDeliveredLabel}
                </span>
              </div>
              <div className="text-center p-3 border-l border-[#E4E9E2]">
                <span className="block text-2xl sm:text-3xl font-black text-[#112E1B]">
                  {homeTranslations[language].rskEscalations}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {homeTranslations[language].rskEscalationsLabel}
                </span>
              </div>
              <div className="text-center p-3 border-l border-[#E4E9E2]">
                <span className="block text-2xl sm:text-3xl font-black text-[#165B33]">
                  {homeTranslations[language].activeRate}
                </span>
                <span className="text-[11px] text-[#165B33] font-bold">
                  {homeTranslations[language].activeRateLabel}
                </span>
              </div>
            </div>

            {/* CORE FEATURES BENTO GRID */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-[#112E1B]">
                  {homeTranslations[language].toolsHeader}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  {homeTranslations[language].toolsSub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tool 1: Crop Health Diagnosis */}
                <div 
                  onClick={() => setActiveTab("farmer")}
                  className="bg-white p-6 rounded-3xl border border-[#E4E9E2] hover:border-emerald-700 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="bg-[#EBF5ED] text-[#165B33] inline-flex p-3 rounded-2xl group-hover:bg-[#112E1B] group-hover:text-white transition-colors">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="bg-[#F7EFE3] text-[#7D5523] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                        {language === "te" ? "కృత్రిమ మేధస్సు" : language === "hi" ? "कृत्रिम बुद्धिमत्ता" : "AI Powered"}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B] mt-1.5">
                        {language === "te" ? "పంట ఆరోగ్య నిర్ధారణ" : language === "hi" ? "फसल स्वास्थ्य निदान" : "AI Crop Health Diagnosis"}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                        {language === "te" 
                          ? "పంట ఆకు ఫోటో అప్‌లోడ్ చేయండి లేదా మీ గొంతు ద్వారా తెగులు వివరాలను అడిగి, తక్షణ చికిత్సలు పొందండి." 
                          : language === "hi" 
                          ? "फसल पत्ती की तस्वीर अपलोड करें या अपनी आवाज के जरिए रोग निदान और उपचार तुरंत प्राप्त करें." 
                          : "Upload a leaf photo or speak a query to get instant, highly detailed pathobiology reports."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === "te" ? "ప్రారంభించు" : language === "hi" ? "शुरू करें" : "Launch Tool"} →
                  </span>
                </div>

                {/* Tool 2: Soil Crop Suggestions */}
                <div 
                  onClick={() => setActiveTab("recommendation")}
                  className="bg-white p-6 rounded-3xl border border-[#E4E9E2] hover:border-emerald-700 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="bg-[#EBF5ED] text-[#165B33] inline-flex p-3 rounded-2xl group-hover:bg-[#112E1B] group-hover:text-white transition-colors">
                      <Sliders className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="bg-[#E2F0FE] text-[#1E50A2] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                        {language === "te" ? "భూసార నివేదిక" : language === "hi" ? "मृदा विश्लेषण" : "Soil Analytics"}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B] mt-1.5">
                        {language === "te" ? "భూసార పంట ప్రణాళిక" : language === "hi" ? "मृदा आधारित फसल नियोजन" : "Soil Crop Suitability Engine"}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                        {language === "te" 
                          ? "మీ జిల్లా భూసార గుణాలు, భూగర్భ జలాలు మరియు వర్షపాతం ఆధారంగా ఉత్తమ విత్తన రకాలను ఎంచుకోండి." 
                          : language === "hi" 
                          ? "अपने जिले के मृदा पीएच, भूजल स्तर और वर्षा के आधार पर सर्वोत्तम बीज किस्मों की जांच करें." 
                          : "References district soil pH, ground water tables, and rain distribution to suggest perfect seed cultivars."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === "te" ? "ప్రారంభించు" : language === "hi" ? "शुरू करें" : "Launch Tool"} →
                  </span>
                </div>

                {/* Tool 3: Real-time Weather & Sensor Alerts */}
                <div 
                  onClick={() => setActiveTab("farmer")}
                  className="bg-white p-6 rounded-3xl border border-[#E4E9E2] hover:border-emerald-700 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="bg-[#EBF5ED] text-[#165B33] inline-flex p-3 rounded-2xl group-hover:bg-[#112E1B] group-hover:text-white transition-colors">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="bg-[#FDE8E8] text-[#9B1C1C] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                        {language === "te" ? "వాతావరణ హెచ్చరికలు" : language === "hi" ? "मौसम चेतावनी" : "Dry-Spell Warning"}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B] mt-1.5">
                        {language === "te" ? "వాతావరణ & ఎండకాలం హెచ్చరికలు" : language === "hi" ? "मौसम और शुष्क मौसम चेतावनी" : "Weather & Dry-Spell Alerts"}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                        {language === "te" 
                          ? "స్థానిక వాతావరణ అంచనాలు మరియు నేల తేమ సెన్సార్ డేటా ద్వారా తక్షణ సలహాలను తెలుసుకోండి." 
                          : language === "hi" 
                          ? "स्थानीय मौसम पूर्वानुमान और भूमि सेंसर डेटा के आधार पर शुष्क मौसम चेतावनियां तुरंत प्राप्त करें." 
                          : "Monitors regional crop-stress indices and ground sensors to predict and advise on soil dry-spells."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === "te" ? "ప్రారంభించు" : language === "hi" ? "शुरू करें" : "Launch Tool"} →
                  </span>
                </div>

                {/* Tool 4: Welfare Schemes Matcher */}
                <div 
                  onClick={() => setActiveTab("welfare")}
                  className="bg-white p-6 rounded-3xl border border-[#E4E9E2] hover:border-emerald-700 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-4 md:col-span-1"
                >
                  <div className="space-y-3">
                    <div className="bg-[#EBF5ED] text-[#165B33] inline-flex p-3 rounded-2xl group-hover:bg-[#112E1B] group-hover:text-white transition-colors">
                      <Landmark className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="bg-[#EBF5ED] text-[#165B33] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                        {language === "te" ? "సంక్షేమ పథకాలు" : language === "hi" ? "कल्याणकारी योजनाएं" : "Incentives Matching"}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B] mt-1.5">
                        {homeTranslations[language].welfareTitle}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                        {language === "te" 
                          ? "మీ భూమి విస్తీర్ణం మరియు వర్గం నమోదు చేసి, మీకు వర్తించే ప్రభుత్వ సహాయ పథకాలను కనుగొనండి." 
                          : language === "hi" 
                          ? "अपनी भूमि जोत के आधार पर सब्सिडी, पीएम-किसान और कृषि बीमा योजनाओं की सूची देखें." 
                          : "Personalized matching with state subsidies, PM-Kisan funds, and equipment grants."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === "te" ? "ప్రారంభించు" : language === "hi" ? "शुरू करें" : "Launch Tool"} →
                  </span>
                </div>

                {/* Tool 5: Mandi Price Board */}
                <div 
                  onClick={() => setActiveTab("mandi")}
                  className="bg-white p-6 rounded-3xl border border-[#E4E9E2] hover:border-emerald-700 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-4 md:col-span-2"
                >
                  <div className="space-y-3">
                    <div className="bg-[#EBF5ED] text-[#165B33] inline-flex p-3 rounded-2xl group-hover:bg-[#112E1B] group-hover:text-white transition-colors">
                      <Coins className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="bg-[#FAF0F9] text-[#7A1C7D] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                        {language === "te" ? "మార్కెట్ రేట్లు" : language === "hi" ? "मंडी मूल्य" : "Commodity Markets"}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B] mt-1.5">
                        {homeTranslations[language].mandiTitle}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                        {language === "te" 
                          ? "జిల్లాల వారీగా పంటల గిట్టుబాటు ధరలు, మార్కెట్ రేట్లు మరియు ప్రభుత్వ కనీస మద్దతు ధరల పట్టిక." 
                          : language === "hi" 
                          ? "जिलों के अनुसार लाइव कृषि उपज मूल्य सूचकांक और न्यूनतम समर्थन मूल्य (MSP) की तुलना करें." 
                          : "Live market rates compared directly with MSP benchmarks paired with smart agricultural selling advisories."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === "te" ? "ప్రారంభించు" : language === "hi" ? "शुरू करें" : "Launch Tool"} →
                  </span>
                </div>

              </div>
            </div>

            {/* LIVE DRY-SPELL WARNING FEED (INTERACTIVE WIDGET) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E9E2] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="text-base font-bold text-[#112E1B] flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-amber-500" />
                    {language === "te" ? "భూగర్భ తేమ & ఎండకాలం నివేదిక" : language === "hi" ? "लाइव मृदा आर्द्रता और शुष्क मौसम अलर्ट" : "Interactive Live Dry-Spell & Moisture Advisory"}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {language === "te" ? "మీ జిల్లాను ఎంచుకుని రియల్-టైమ్ గ్రౌండ్ సెన్సార్ హెచ్చరికలు తనిఖీ చేయండి." : language === "hi" ? "अपने जिले का चयन करें और भूमि सेंसर से लाइव शुष्क चेतावनी सूचकांक देखें." : "Select a district to fetch live soil telemetry and automatic dry-spell mitigation advice."}
                  </p>
                </div>
                
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="bg-[#E4E9E2]/40 border border-[#E4E9E2] text-[#112E1B] font-bold text-xs py-2 px-3 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="Guntur">{language === "te" ? "గుంటూరు" : language === "hi" ? "गुंटूर" : "Guntur"}</option>
                  <option value="Anantapur">{language === "te" ? "అనంతపురం" : language === "hi" ? "अनंतपुर" : "Anantapur"}</option>
                  <option value="Warangal">{language === "te" ? "వరంగల్" : language === "hi" ? "वारंगल" : "Warangal"}</option>
                  <option value="Karimnagar">{language === "te" ? "కరీంనగర్" : language === "hi" ? "करीमनगर" : "Karimnagar"}</option>
                  <option value="Kurnool">{language === "te" ? "కర్నూలు" : language === "hi" ? "कर्नूल" : "Kurnool"}</option>
                </select>
              </div>

              {/* Localized feedback alert card */}
              <div className="p-5 rounded-2xl bg-[#FDF9F2] border border-[#F3E2C9] flex gap-4 items-start">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-700 mt-0.5 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    {language === "te" ? "నేల సెన్సార్ టెలిమెట్రీ" : language === "hi" ? "मृदा सेंसर टेलीमेट्री" : "Ground Sensor Telemetry Analysis"}
                  </span>
                  <p className="text-xs text-stone-800 leading-relaxed font-sans font-medium">
                    {selectedDistrict === "Anantapur" ? (
                      language === "te" ? "⚠️ అనంతపురం: వేరుశనగ పంటకు 12 రోజుల తీవ్ర ఎండకాలం (Dry-Spell) ముప్పు. నేల తేమ 32% మాత్రమే ఉంది. సలహా: పంట ఎండిపోకుండా రాత్రి 45 నిమిషాల పాటు స్ప్రింక్లర్ సహాయంతో నీరు పారించండి." :
                      language === "hi" ? "⚠️ अनंतपुर: मूंगफली की फसल के लिए 12 दिनों का गंभीर शुष्क मौसम जोखिम. मिट्टी की नमी केवल 32% है. सलाह: फसल सुखाने से बचाने के लिए आज रात 45 मिनट के लिए स्प्रिंकलर सिंचाई करें." :
                      "⚠️ Anantapur: 12-day severe crop dry-spell warning detected for Groundnut. Soil deep root moisture is low (32%). Advisory: Apply 45-minute sprinkler irrigation tonight to prevent pod dehydration."
                    ) : selectedDistrict === "Karimnagar" ? (
                      language === "te" ? "⚠️ కరీంనగర్: వరి పంటలో తక్కువ తేమ నమోదు. పిలక దశలో నీటి నిల్వను సరిచూసుకోండి." :
                      language === "hi" ? "⚠️ करीमनगर: धान में कम आर्द्रता दर्ज. कल्ले फूटने के दौरान पानी का स्तर उचित बनाए रखें." :
                      "⚠️ Karimnagar: Minor moisture deficit detected in Paddy Rice. Maintain standing water of 2 inches during active tillering stage."
                    ) : (
                      language === "te" ? `✅ ${getLocalizedDistrictName(selectedDistrict)}: నేల తేమ సూచిక సాధారణంగా ఉంది (74%). రాబోయే 48 గంటల్లో తేలికపాటి వర్ష సూచన ఉంది. ఎండకాలం ముప్పు లేదు.` :
                      language === "hi" ? `✅ ${getLocalizedDistrictName(selectedDistrict)}: मिट्टी की नमी संतोषजनक है (74%). अगले 48 घंटों में हल्की वर्षा का अनुमान है. शुष्क मौसम का कोई जोखिम नहीं है.` :
                      `✅ ${selectedDistrict}: Deep soil moisture is optimal (74%). Meteorology reports expect light passing showers within 48 hours. No dry-spell threats.`
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* GOVERNANCE INTEGRATION ROW */}
            <div className="bg-stone-900 text-stone-200 p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="bg-[#EBF5ED] text-[#165B33] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  {language === "te" ? "ప్రభుత్వ సేవా అనుసంధానం" : language === "hi" ? "सरकारी सेवा एकीकरण" : "Rythu Seva Kendra Network"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {homeTranslations[language].governanceHeading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {homeTranslations[language].governanceDesc}
                </p>
              </div>
              <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700/60 w-full md:w-80 shrink-0 text-center space-y-4">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block">
                  {language === "te" ? "కనెక్టివిటీ రకం" : language === "hi" ? "कनेक्टिविटी प्रकार" : "Fallback SMS Engine"}
                </span>
                <div className="flex justify-center gap-3">
                  <span className="bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold py-1 px-3 rounded-lg">
                    Offline 2G SMS
                  </span>
                  <span className="bg-[#112E1B] text-emerald-400 text-[10px] font-bold py-1 px-3 rounded-lg animate-pulse">
                    Web App Active
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 leading-normal">
                  {language === "te" ? "ఆధ్యాత్మిక వ్యవసాయ టోకెన్లు నేరుగా 2G ఫోన్లకు ఎస్.ఎమ్.ఎస్ ద్వారా పంపబడును." : language === "hi" ? "कृषि वैज्ञानिक टोकन नंबर सीधे 2G फोन पर साधारण संदेश (SMS) के जरिए प्रेषित किए जाते हैं." : "Official medical tokens are delivered via offline-carrier SMS directly to local 2G handsets."}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* GOVERNMENT WELFARE SCHEMES MATCHER */}
        {activeTab === "welfare" && (
          <div className="space-y-8 animate-fadeIn" id="welfare-schemes-root">
            
            {/* Welfare Banner */}
            <div className="bg-stone-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-[#112E1B] border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 font-mono">
                <Landmark className="h-3.5 w-3.5" />
                {language === "te" ? "ప్రభుత్వ లబ్ధిదారుల పోర్టల్" : language === "hi" ? "राजकीय लाभार्थी पोर्टल" : "Governance Benefit Portal"}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {homeTranslations[language].welfareTitle}
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
                {homeTranslations[language].welfareSubtitle}
              </p>
            </div>

            {/* Matching Inputs & Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Configurator */}
              <div className="bg-white p-6 rounded-3xl border border-[#E4E9E2] shadow-sm space-y-6 self-start">
                <h3 className="text-sm font-bold text-[#112E1B] uppercase tracking-wider border-b border-stone-100 pb-3">
                  {language === "te" ? "మీ పొలం వివరాలు" : language === "hi" ? "किसान प्रोफाइल कॉन्फ़िगरेशन" : "Farmer Profile & Land Criteria"}
                </h3>
                
                <div className="space-y-4">
                  {/* District Selection (Syncs with state) */}
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                      {language === "te" ? "జిల్లా" : language === "hi" ? "जिला" : "Regional District"}
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-[#E4E9E2]/30 border border-[#E4E9E2] text-stone-900 font-semibold py-2.5 px-3 rounded-xl focus:outline-none"
                    >
                      <option value="Guntur">{language === "te" ? "గుంటూరు" : language === "hi" ? "गुंटूर" : "Guntur"}</option>
                      <option value="Anantapur">{language === "te" ? "అనంతపురం" : language === "hi" ? "अनंतपुर" : "Anantapur"}</option>
                      <option value="Warangal">{language === "te" ? "వరంగల్" : language === "hi" ? "वारंगल" : "Warangal"}</option>
                      <option value="Karimnagar">{language === "te" ? "కరీంనగర్" : language === "hi" ? "करीमनगर" : "Karimnagar"}</option>
                      <option value="Kurnool">{language === "te" ? "కర్నూలు" : language === "hi" ? "कर्नूल" : "Kurnool"}</option>
                    </select>
                  </div>

                  {/* Land Size */}
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                      {homeTranslations[language].landHoldingLabel}
                    </label>
                    <select
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value as any)}
                      className="w-full bg-[#E4E9E2]/30 border border-[#E4E9E2] text-stone-900 font-semibold py-2.5 px-3 rounded-xl focus:outline-none"
                    >
                      <option value="Marginal">{homeTranslations[language].marginalSize}</option>
                      <option value="Small">{homeTranslations[language].smallSize}</option>
                      <option value="Medium">{homeTranslations[language].mediumSize}</option>
                      <option value="Large">{homeTranslations[language].largeSize}</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                      {homeTranslations[language].categoryLabel}
                    </label>
                    <select
                      value={farmerCategory}
                      onChange={(e) => setFarmerCategory(e.target.value as any)}
                      className="w-full bg-[#E4E9E2]/30 border border-[#E4E9E2] text-stone-900 font-semibold py-2.5 px-3 rounded-xl focus:outline-none"
                    >
                      <option value="General">{language === "te" ? "జనరల్ వర్గం" : language === "hi" ? "सामान्य वर्ग" : "General"}</option>
                      <option value="SC/ST">{language === "te" ? "SC / ST" : language === "hi" ? "एससी / एसटी" : "SC/ST"}</option>
                      <option value="OBC">{language === "te" ? "OBC" : language === "hi" ? "ओबीसी" : "OBC"}</option>
                      <option value="Women">{language === "te" ? "మహిళా రైతు" : language === "hi" ? "महिला किसान" : "Women Farmer"}</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#EBF5ED] p-4 rounded-2xl border border-[#D5E6D9] text-[11px] text-[#165B33] leading-relaxed">
                  <strong>ℹ️ {language === "te" ? "అర్హత నిబంధనలు:" : language === "hi" ? "पात्रता सूचना:" : "Dataset Criteria Match:"}</strong><br />
                  {language === "te" 
                    ? "ఈ యంత్రం ప్రభుత్వ డేటాసెట్ల ఆధారంగా మీ అర్హతలను తనిఖీ చేసి తగిన పథకాలను ఎంపిక చేస్తుంది. అప్లికేషన్లు మీ ఆర్.ఎస్.కే కి పంపబడును."
                    : language === "hi"
                    ? "यह प्रणाली आपके भूलेखों और वर्ग मानदंडों का स्वतः विश्लेषण कर सरकारी सब्सिडी व योजनाओं का सत्यापन करती है."
                    : "Automatically verifies claims eligibility with national registries. Form claims are forwarded immediately to your regional RSK officer."}
                </div>
              </div>

              {/* Matching Schemes Output */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-stone-700 flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                  {homeTranslations[language].matchedSchemes}
                </h3>

                <div className="space-y-4">
                  
                  {/* Scheme 1: PM-KISAN */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E4E9E2] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-700 transition-colors">
                    <div className="space-y-1.5">
                      <span className="bg-[#EBF5ED] text-[#165B33] text-[9px] font-bold px-2 py-0.5 rounded-full font-mono">
                        {homeTranslations[language].schemeStatus}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B]">
                        PM-KISAN Samman Nidhi Yojana
                      </h4>
                      <p className="text-xs text-stone-500 leading-normal max-w-xl">
                        {language === "te" 
                          ? "సంవత్సరానికి ₹6,000 నగదు బదిలీ. 3 సమాన విడతలలో నేరుగా బ్యాంక్ ఖాతాలో జమ అగును." 
                          : language === "hi" 
                          ? "सालाना ₹6,000 प्रत्यक्ष आय सहायता। बैंक खातों में तीन समान किश्तों में प्रत्यक्ष जमा." 
                          : "Direct income support of ₹6,000 per year in three equal installments of ₹2,000 directly to bank accounts."}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="block text-lg font-black text-[#112E1B]">₹6,000 / Year</span>
                      <button
                        onClick={() => {
                          setAppliedScheme("PM-KISAN");
                          // Also append a mock submission so it registers on the dashboard!
                          const newSub: Submission = {
                            id: "WEL-" + Math.floor(Math.random() * 90000 + 10000),
                            timestamp: new Date().toISOString(),
                            language: language === "en" ? "en" : language === "hi" ? "hi" : "te",
                            cropType: "Welfare Claim",
                            queryText: `Welfare Claim Submission: PM-KISAN Samman Nidhi (Land: ${landSize}, Category: ${farmerCategory})`,
                            diagnosis: "Welfare scheme matched and applied successfully via Guntur digital portal.",
                            symptoms: "Farmer requested direct subsidy claim matching",
                            cause: "Matched successfully with PM-KISAN Samman Nidhi",
                            remedyOrganic: "Forwarded for physical verification to local Rythu Seva Kendra",
                            remedyChemical: "Approved",
                            prevention: "Verification status can be tracked on 2G SMS",
                            smsText: "AgriConnect AI Status: PM-KISAN application submitted! Ref: PMK-8493-GNT. Keep your land passbook details ready.",
                            audioText: "PM-KISAN application submitted",
                            status: "Resolved",
                            district: selectedDistrict,
                            farmerName: "Siva Rao"
                          };
                          setSubmissions(prev => [newSub, ...prev]);
                        }}
                        className="mt-2 bg-[#112E1B] hover:bg-[#254C32] text-white font-bold text-[10px] py-1.5 px-3 rounded-lg transition cursor-pointer"
                      >
                        {homeTranslations[language].applyNow}
                      </button>
                    </div>
                  </div>

                  {/* Scheme 2: Rythu Bharosa (Matched for Marginal & Small) */}
                  {(landSize === "Marginal" || landSize === "Small") && (
                    <div className="bg-white p-5 rounded-2xl border border-[#E4E9E2] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-700 transition-colors">
                      <div className="space-y-1.5">
                        <span className="bg-[#EBF5ED] text-[#165B33] text-[9px] font-bold px-2 py-0.5 rounded-full font-mono">
                          {homeTranslations[language].schemeStatus}
                        </span>
                        <h4 className="text-base font-bold text-[#112E1B]">
                          YSR Rythu Bharosa / PM-Kisan Partner support
                        </h4>
                        <p className="text-xs text-stone-500 leading-normal max-w-xl">
                          {language === "te" 
                            ? "రాష్ట్ర ప్రభుత్వం అందిచే ఉపాంత మరియు చిన్న రైతులకు ₹13,500 పంట సాయం పెట్టుబడి." 
                            : language === "hi" 
                            ? "लघु और सीमांत किसानों के लिए ₹13,500 वार्षिक कृषि ऋण व बीज निवेश सब्सिडी।" 
                            : "State-partner annual crop-investment input support of ₹13,500 for smallholder marginal farmers."}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="block text-lg font-black text-[#112E1B]">₹13,500 / Year</span>
                        <button
                          onClick={() => {
                            setAppliedScheme("Rythu Bharosa");
                            const newSub: Submission = {
                              id: "WEL-" + Math.floor(Math.random() * 90000 + 10000),
                              timestamp: new Date().toISOString(),
                              language: language === "en" ? "en" : language === "hi" ? "hi" : "te",
                              cropType: "Welfare Claim",
                              queryText: `Welfare Claim Submission: Rythu Bharosa (Land: ${landSize}, Category: ${farmerCategory})`,
                              diagnosis: "YSR Rythu Bharosa matching claim verified. Seed subsidy token enabled.",
                              symptoms: "Farmer requested input subsidy investment assistance",
                              cause: "Matched with State Rythu Bharosa support criteria",
                              remedyOrganic: "Seed token sent to nearest RSK depot",
                              remedyChemical: "Approved",
                              prevention: "RSK verified",
                              smsText: "AgriConnect AI Status: YSR Rythu Bharosa application matches! Token number: RYTHU-7492-AP. Claim seed subsidy.",
                              audioText: "Rythu Bharosa matches",
                              status: "Resolved",
                              district: selectedDistrict,
                              farmerName: "Siva Rao"
                            };
                            setSubmissions(prev => [newSub, ...prev]);
                          }}
                          className="mt-2 bg-[#112E1B] hover:bg-[#254C32] text-white font-bold text-[10px] py-1.5 px-3 rounded-lg transition cursor-pointer"
                        >
                          {homeTranslations[language].applyNow}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Scheme 3: Fasal Bima Yojana (All) */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E4E9E2] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-700 transition-colors">
                    <div className="space-y-1.5">
                      <span className="bg-[#EBF5ED] text-[#165B33] text-[9px] font-bold px-2 py-0.5 rounded-full font-mono">
                        {homeTranslations[language].schemeStatus}
                      </span>
                      <h4 className="text-base font-bold text-[#112E1B]">
                        Pradhan Mantri Fasal Bima Yojana (PMFBY)
                      </h4>
                      <p className="text-xs text-stone-500 leading-normal max-w-xl">
                        {language === "te" 
                          ? "పంట నష్ట పరిహార భీమా సహాయం. ప్రకృతి వైపరీత్యాల కారణంగా నష్టపోతే వంద శాతం సాయం." 
                          : language === "hi" 
                          ? "प्राकृतिक आपदाओं, कीटों और रोगों के कारण फसलों के नुकसान पर वित्तीय सुरक्षा कवच।" 
                          : "Comprehensive insurance coverage against crop losses arising from dry-spells, severe weather, or pests."}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="block text-lg font-black text-[#112E1B]">Premium Free</span>
                      <button
                        onClick={() => {
                          setAppliedScheme("Fasal Bima");
                          const newSub: Submission = {
                            id: "WEL-" + Math.floor(Math.random() * 90000 + 10000),
                            timestamp: new Date().toISOString(),
                            language: language === "en" ? "en" : language === "hi" ? "hi" : "te",
                            cropType: "Welfare Claim",
                            queryText: `Welfare Claim Submission: PMFBY Crop Insurance (Land: ${landSize}, Category: ${farmerCategory})`,
                            diagnosis: "Crop Insurance matched and certified on local district index.",
                            symptoms: "Farmer requested insurance protection",
                            cause: "Matched with PMFBY premium waiver eligibility",
                            remedyOrganic: "Digital premium certificate registered",
                            remedyChemical: "Approved",
                            prevention: "Policy linked to bank",
                            smsText: "AgriConnect AI Status: PMFBY insurance registered! Policy No: BIMA-84109-GNT. Premium subsidized by State Govt.",
                            audioText: "PMFBY premium waived",
                            status: "Resolved",
                            district: selectedDistrict,
                            farmerName: "Siva Rao"
                          };
                          setSubmissions(prev => [newSub, ...prev]);
                        }}
                        className="mt-2 bg-[#112E1B] hover:bg-[#254C32] text-white font-bold text-[10px] py-1.5 px-3 rounded-lg transition cursor-pointer"
                      >
                        {homeTranslations[language].applyNow}
                      </button>
                    </div>
                  </div>

                  {/* Scheme 4: Seed Subsidy (Marginal & Small SC/ST/Women) */}
                  {(landSize === "Marginal" || landSize === "Small" || farmerCategory === "SC/ST" || farmerCategory === "Women") && (
                    <div className="bg-white p-5 rounded-2xl border border-[#E4E9E2] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-700 transition-colors">
                      <div className="space-y-1.5">
                        <span className="bg-[#EBF5ED] text-[#165B33] text-[9px] font-bold px-2 py-0.5 rounded-full font-mono">
                          {homeTranslations[language].schemeStatus}
                        </span>
                        <h4 className="text-base font-bold text-[#112E1B]">
                          High-Yield Seed Distribution Subsidy (Rythu Seva Kendra)
                        </h4>
                        <p className="text-xs text-stone-500 leading-normal max-w-xl">
                          {language === "te" 
                            ? "మీ స్థానిక రైతు సేవా కేంద్రం (RSK) ద్వారా ఉచిత లేదా 50% రాయితీ ధరకు మేలు రకం విత్తనాల పంపిణీ." 
                            : language === "hi" 
                            ? "किसान सेवा केंद्रों (RSK) पर उन्नत गुणवत्ता वाले बीजों का 50% से 100% सब्सिडी पर वितरण।" 
                            : "Subsidized certified high-yield seed varieties distribution (50% to 100% discount) through your local RSK depot."}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="block text-lg font-black text-[#165B33]">50% - 90% Sub</span>
                        <button
                          onClick={() => {
                            setAppliedScheme("Seed Subsidy");
                            const newSub: Submission = {
                              id: "WEL-" + Math.floor(Math.random() * 90000 + 10000),
                              timestamp: new Date().toISOString(),
                              language: language === "en" ? "en" : language === "hi" ? "hi" : "te",
                              cropType: "Welfare Claim",
                              queryText: `Welfare Claim Submission: RSK Seed Subsidy (Land: ${landSize}, Category: ${farmerCategory})`,
                              diagnosis: "Seed subsidy coupon enabled for RSK depot collection.",
                              symptoms: "Farmer requested seed distribution subsidy",
                              cause: "Matched with marginal farmer caste incentive bracket",
                              remedyOrganic: "Seed token generated for Guntur east RSK",
                              remedyChemical: "Approved",
                              prevention: "Coupon code active",
                              smsText: "AgriConnect AI Status: RSK Seed coupon matches! Token: SEED-4109-GNT. Present this at Guntur East RSK Center for 50% off seeds.",
                              audioText: "Seed subsidy coupon enabled",
                              status: "Resolved",
                              district: selectedDistrict,
                              farmerName: "Siva Rao"
                            };
                            setSubmissions(prev => [newSub, ...prev]);
                          }}
                          className="mt-2 bg-[#112E1B] hover:bg-[#254C32] text-white font-bold text-[10px] py-1.5 px-3 rounded-lg transition cursor-pointer"
                        >
                          {homeTranslations[language].applyNow}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* DIGITAL RSK SLIP OVERLAY / MODAL SUCCESS */}
            {appliedScheme && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#E4E9E2] shadow-xl space-y-5 animate-scaleUp">
                  
                  {/* Stamp header */}
                  <div className="text-center space-y-2 border-b border-stone-100 pb-4">
                    <div className="inline-flex bg-[#EBF5ED] p-3 rounded-full text-[#165B33]">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-[#112E1B]">
                      {language === "te" ? "డిజిటల్ అర్హత ధృవీకరణ పత్రం" : language === "hi" ? "डिजिटल पात्रता सत्यापन पर्ची" : "Digital Eligibility Slip"}
                    </h3>
                    <p className="text-xs text-[#165B33] font-bold font-mono">
                      {language === "te" ? "✓ ఆమోదించబడింది & నమోదు చేయబడింది" : language === "hi" ? "✓ स्वीकृत एवं सत्यापित" : "✓ VERIFIED & MATCHED BY AGRI CONNECT AI"}
                    </p>
                  </div>

                  {/* Slip Data fields */}
                  <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E4E9E2] space-y-3 text-xs font-mono">
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">TOKEN NO:</span>
                      <span className="font-bold text-[#112E1B]">RSK-SUB-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">SCHEME:</span>
                      <span className="font-bold text-stone-900">{appliedScheme}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">DISTRICT:</span>
                      <span className="font-bold text-stone-900">{getLocalizedDistrictName(selectedDistrict)}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">LAND CRITERIA:</span>
                      <span className="font-bold text-stone-900">{landSize}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                      <span className="text-stone-500">CATEGORY:</span>
                      <span className="font-bold text-stone-900">{farmerCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ASSIGNED RSK:</span>
                      <span className="font-bold text-[#165B33]">{getLocalizedDistrictName(selectedDistrict)} Agronomy Depot</span>
                    </div>
                  </div>

                  {/* Success Notes */}
                  <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-[#165B33] font-sans leading-relaxed flex gap-2">
                    <span className="w-1.5 h-1.5 bg-[#165B33] rounded-full mt-1 shrink-0 animate-ping"></span>
                    <p>
                      {language === "te" 
                        ? "అప్లికేషన్ సమర్పించబడింది! మీ 2G ఫోన్ నంబర్‌కు ఒక ఎస్.ఎమ్.ఎస్ టోకెన్ కోడ్ విజయవంతంగా పంపబడింది. మండి ఆఫీసు లేదా సేవా కేంద్రంలో ఈ టోకెన్ చూపించండి." 
                        : language === "hi" 
                        ? "आवेदन सफलतापूर्वक दर्ज! सत्यापन टोकन संख्या आपके 2G मोबाइल पर एसएमएस के जरिए भेज दी गई है. अपने नजदीकी आरएसके केंद्र में संपर्क करें." 
                        : "Claim registered successfully! Fallback 2G carrier network matches. A receipt SMS has been delivered to your phone to present at the local RSK depot."}
                    </p>
                  </div>

                  <button
                    onClick={() => setAppliedScheme(null)}
                    className="w-full bg-[#112E1B] hover:bg-[#254C32] text-white font-bold py-2.5 rounded-2xl text-xs transition cursor-pointer"
                  >
                    {language === "te" ? "ముగించు" : language === "hi" ? "बंद करें" : "Dismiss Receipt"}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* REAL-TIME MANDI MARKET PRICE BOARD */}
        {activeTab === "mandi" && (
          <div className="space-y-8 animate-fadeIn" id="mandi-prices-root">
            
            {/* Price Banner */}
            <div className="bg-stone-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 font-mono">
                <Coins className="h-3.5 w-3.5" />
                {language === "te" ? "వ్యవసాయ మార్కెట్ ధరల పట్టిక" : language === "hi" ? "बाज़ार मूल्य सूचकांक" : "Market Commodity Rate Directory"}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {homeTranslations[language].mandiTitle}
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
                {homeTranslations[language].mandiSubtitle}
              </p>
            </div>

            {/* Inputs & Price Board Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Selector form */}
              <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-[#E4E9E2] shadow-sm space-y-5 self-start">
                <h3 className="text-sm font-bold text-[#112E1B] uppercase tracking-wider border-b border-stone-100 pb-3">
                  {language === "te" ? "మార్కెట్ గ్రేడ్ శోధన" : language === "hi" ? "मंडी खोज फ़िल्टर" : "Market Commodity Search"}
                </h3>

                <div className="space-y-4">
                  {/* Select Crop */}
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                      {homeTranslations[language].selectCropPrice}
                    </label>
                    <select
                      value={mandiCrop}
                      onChange={(e) => setMandiCrop(e.target.value)}
                      className="w-full bg-[#E4E9E2]/30 border border-[#E4E9E2] text-[#112E1B] font-bold py-2.5 px-3 rounded-xl focus:outline-none cursor-pointer"
                    >
                      <option value="Rice">{language === "te" ? "వరి (Rice)" : language === "hi" ? "धान (Rice)" : "Rice"}</option>
                      <option value="Cotton">{language === "te" ? "పత్తి (Cotton)" : language === "hi" ? "कपास (Cotton)" : "Cotton"}</option>
                      <option value="Chilli">{language === "te" ? "మిరప (Chilli)" : language === "hi" ? "मिर्च (Chilli)" : "Chilli"}</option>
                      <option value="Tomato">{language === "te" ? "టమోటా (Tomato)" : language === "hi" ? "टमाटर (Tomato)" : "Tomato"}</option>
                      <option value="Groundnut">{language === "te" ? "వేరుశనగ (Groundnut)" : language === "hi" ? "मूंगफली (Groundnut)" : "Groundnut"}</option>
                    </select>
                  </div>

                  {/* Select District */}
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                      {homeTranslations[language].selectDistrictPrice}
                    </label>
                    <select
                      value={mandiDistrict}
                      onChange={(e) => setMandiDistrict(e.target.value)}
                      className="w-full bg-[#E4E9E2]/30 border border-[#E4E9E2] text-[#112E1B] font-bold py-2.5 px-3 rounded-xl focus:outline-none cursor-pointer"
                    >
                      <option value="Guntur">{language === "te" ? "గుంటూరు మార్కెట్ యార్డ్" : language === "hi" ? "गुंटूर मंडी" : "Guntur Market"}</option>
                      <option value="Anantapur">{language === "te" ? "అనంతపురం మార్కెట్ యార్డ్" : language === "hi" ? "अनंतपुर मंडी" : "Anantapur Market"}</option>
                      <option value="Warangal">{language === "te" ? "వరంగల్ మార్కెట్ యార్డ్" : language === "hi" ? "वारंगल मंडी" : "Warangal Market"}</option>
                      <option value="Karimnagar">{language === "te" ? "కరీంనగర్ మార్కెట్ యార్డ్" : language === "hi" ? "करीमनगर मंडी" : "Karimnagar Market"}</option>
                      <option value="Kurnool">{language === "te" ? "కర్నూలు మార్కెట్ యార్డ్" : language === "hi" ? "कर्नूल मंडी" : "Kurnool Market"}</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F5] border border-[#E4E9E2] rounded-2xl text-[11px] text-stone-600 leading-normal font-sans">
                  <strong>⭐ AGRI CONNECT AI Insight:</strong><br />
                  {language === "te" 
                    ? "ఈ మార్కెట్ రేట్లు ప్రభుత్వ మార్కెటింగ్ సహకార సంఘాల (Agmarknet) ఏపీ మరియు తెలంగాణ లైవ్ పోర్టల్ ద్వారా పొందినవి." 
                    : language === "hi" 
                    ? "यह बाज़ार मूल्य कृषि विपणन विभाग (Agmarknet) के लाइव डेटा स्रोतों द्वारा सत्यापित हैं।" 
                    : "Market price data is fetched from regional AP/TS Agriculture Marketing Departments (Agmarknet) live benchmarks."}
                </div>
              </div>

              {/* Main Board display card */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Big Rate Display */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E9E2] shadow-sm space-y-6">
                  
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                    <div>
                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                        {language === "te" ? "పంట & మార్కెట్ రకం" : language === "hi" ? "फसल और मंडी" : "Commodity & Grade"}
                      </span>
                      <span className="text-xl font-bold text-[#112E1B]">
                        {mandiCrop} — {getLocalizedDistrictName(mandiDistrict)}
                      </span>
                    </div>

                    {/* Dynamic Trend Indicator */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      mandiCrop === "Chilli" ? "bg-emerald-100 text-emerald-800" :
                      mandiCrop === "Tomato" ? "bg-red-100 text-red-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {mandiCrop === "Chilli" ? homeTranslations[language].upward :
                       mandiCrop === "Tomato" ? homeTranslations[language].downward :
                       homeTranslations[language].stable}
                    </span>
                  </div>

                  {/* Price Comparison Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Live Mandi Rate */}
                    <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E4E9E2]">
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                        {homeTranslations[language].livePrice}
                      </span>
                      <span className="text-3xl font-black text-[#112E1B] block">
                        ₹{mandiCrop === "Rice" ? "2,450" :
                          mandiCrop === "Cotton" ? "7,200" :
                          mandiCrop === "Chilli" ? "19,500" :
                          mandiCrop === "Tomato" ? "1,200" : "6,800"}
                      </span>
                      <span className="text-[10px] text-stone-500 block mt-1 font-mono">
                        {language === "te" ? "గ్రేడ్-ఎ నాణ్యత రేటు" : language === "hi" ? "ग्रेड-ए गुणवत्ता मंडी भाव" : "Grade-A Quality Standard"}
                      </span>
                    </div>

                    {/* MSP Price */}
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/60">
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                        {homeTranslations[language].mspPrice}
                      </span>
                      <span className="text-3xl font-black text-stone-700 block">
                        ₹{mandiCrop === "Rice" ? "2,183" :
                          mandiCrop === "Cotton" ? "6,620" :
                          mandiCrop === "Chilli" ? "17,000" :
                          mandiCrop === "Tomato" ? "1,500" : "6,375"}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 block mt-1">
                        {mandiCrop === "Tomato" ? (
                          language === "te" ? "⚠️ మద్దతు ధర లేదు (నశ్వర పంట)" : language === "hi" ? "⚠️ कोई एमएसपी सुरक्षा नहीं (नाशवान)" : "⚠️ No MSP Protection (Perishable)"
                        ) : (
                          language === "te" ? "✓ ప్రభుత్వ మద్దతు రక్షణ ఉంది" : language === "hi" ? "✓ सरकारी एमएसपी सुरक्षा लागू" : "✓ Official central MSP protection active"
                        )}
                      </span>
                    </div>

                  </div>

                  {/* Dynamic Sell Advisory Box */}
                  <div className="p-5 rounded-2xl bg-[#EBF5ED] border border-[#D5E6D9] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#165B33] uppercase tracking-wider block">
                      {homeTranslations[language].sellAdvisory}
                    </span>
                    <p className="text-xs text-stone-800 font-medium leading-relaxed font-sans">
                      {mandiCrop === "Chilli" ? (
                        language === "te" ? "🌶️ మిరప మార్కెట్ సలహా: ఎగుమతుల డిమాండ్ కారణంగా ధరలు ప్రస్తుతం మద్దతు ధర కంటే 15% ఎక్కువగా ఉన్నాయి. అమ్మేయండి - మార్కెట్ గరిష్ట ధరలలో ఉంది." :
                        language === "hi" ? "🌶️ मिर्च बिक्री परामर्श: निर्यात निर्यात मांग के कारण कीमतें वर्तमान में एमएसपी से 15% ऊपर हैं। तुरंत बेचें - बाजार अपने चरम भाव पर है।" :
                        "🌶️ Chilli Market Advisory: Due to peak export demand, current rates are 15% above MSP. STRONG SELL - market is currently at peak rates."
                      ) : mandiCrop === "Tomato" ? (
                        language === "te" ? "🍅 టమోటా మార్కెట్ సలహా: పంట సరఫరా విపరీతంగా పెరగడం వలన మార్కెట్ రేటు పడిపోతోంది. నిల్వ ఉంచలేము కాబట్టి నష్ట నివారణకు త్వరగా అమ్మేయండి." :
                        language === "hi" ? "🍅 टमाटर बिक्री परामर्श: भारी आवक के कारण कीमतों में गिरावट। उपज जल्द से जल्द बेचें क्योंकि यह जल्दी खराब होने वाली फसल है।" :
                        "🍅 Tomato Market Advisory: Due to heavy seasonal harvesting, market rates are dipping below target values. SELL IMMEDIATELY - perishable crop."
                      ) : mandiCrop === "Rice" ? (
                        language === "te" ? "🌾 వరి మార్కెట్ సలహా: ధరలు స్థిరంగా ఉన్నాయి. త్వరలో కొత్త పంట చేతికి రానుండడంతో ధరలు పెరిగే అవకాశం లేదు. హోల్డ్ చేయండి లేదా ఆర్.ఎస్.కే కేంద్రాల ద్వారా అమ్మండి." :
                        language === "hi" ? "🌾 धान बिक्री परामर्श: कीमतें वर्तमान में एमएसपी से ₹267 ऊपर हैं। बाजार स्थिर है। धान की उपज रोकें, बेहतर दरों के लिए प्रतीक्षा करें।" :
                        "🌾 Rice Market Advisory: Market rates are steady at ₹2,450 (₹267 above MSP). Market trend is STABLE. Recommended action: Hold crop temporarily or sell directly via Rythu Seva Kendra to bypass middleman fees."
                      ) : mandiCrop === "Cotton" ? (
                        language === "te" ? "🌱 పత్తి మార్కెట్ సలహా: విదేశీ మార్కెట్లలో పత్తి ధరలు నిలకడగా ఉన్నాయి. హోల్డ్ చేయండి - ధరలు రాబోయే 15 రోజుల్లో పెరగవచ్చు." :
                        language === "hi" ? "🌱 कपास बिक्री परामर्श: विदेशी बाजारों में मांग मजबूत। कीमतों में 15 दिनों में वृद्धि संभावित। फसल रोके रखें (HOLD)।" :
                        "🌱 Cotton Market Advisory: Global export demand remains strong. Market rates are ₹580 above MSP. HOLD crop for the next 15 days for a potential price rally."
                      ) : (
                        language === "te" ? "🥜 వేరుశనగ మార్కెట్ సలహా: ధరలు మద్దతు ధర కంటే స్వల్పంగా ఎక్కువగా ఉన్నాయి. అమ్మేయండి - స్థిరమైన నికర లాభాలు అందుకోవచ్చు." :
                        language === "hi" ? "🥜 मूंगफली बिक्री परामर्श: कीमतें वर्तमान में एमएसपी से ₹425 ऊपर हैं। बेचना (SELL) सबसे अच्छा विकल्प है।" :
                        "🥜 Groundnut Market Advisory: Current rates are ₹425 above MSP. SELLING is recommended to secure consistent profits before new winter sowing yields arrive."
                      )}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* FARMER HUB TAB */}
        {activeTab === "farmer" && (
          <div className="space-y-8">
            
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200 via-red-300 to-blue-500 pointer-events-none"></div>
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 font-mono">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  Gemini Multi-Modal AI Engine
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {t.bannerTitle}
                </h2>
                <p className="text-sm text-emerald-100/90 leading-relaxed font-sans">
                  {t.bannerDesc}
                </p>

                {/* Localizer switch */}
                <div className="pt-4 flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-emerald-200 font-bold">{t.selectLangLabel}</span>
                  <div className="inline-flex bg-emerald-950 p-1 rounded-xl border border-emerald-800 flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => { setLanguage("te"); stopSpeaking(); }}
                      className={`text-xs font-extrabold py-1.5 px-3 rounded-lg transition cursor-pointer ${
                        language === "te" ? "bg-emerald-600 text-white" : "text-emerald-300 hover:text-white"
                      }`}
                    >
                      తెలుగు (Telugu)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLanguage("hi"); stopSpeaking(); }}
                      className={`text-xs font-extrabold py-1.5 px-3 rounded-lg transition cursor-pointer ${
                        language === "hi" ? "bg-emerald-600 text-white" : "text-emerald-300 hover:text-white"
                      }`}
                    >
                      हिन्दी (Hindi)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLanguage("en"); stopSpeaking(); }}
                      className={`text-xs font-extrabold py-1.5 px-3 rounded-lg transition cursor-pointer ${
                        language === "en" ? "bg-emerald-600 text-white" : "text-emerald-300 hover:text-white"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Input & Output Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* INPUT PANEL - 5 COLS */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xl border border-stone-100 space-y-6">
                <h3 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex justify-between items-center">
                  <span>{t.inputSuiteTitle}</span>
                  <Sliders className="h-4 w-4 text-stone-500" />
                </h3>

                {/* District & Crop Context */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 block">{t.districtLabel}</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-900 py-2.5 px-3 rounded-xl focus:outline-none focus:border-emerald-500 font-semibold text-xs cursor-pointer"
                    >
                      <option value="Guntur">{t.districtGuntur}</option>
                      <option value="Anantapur">{t.districtAnantapur}</option>
                      <option value="Warangal">{t.districtWarangal}</option>
                      <option value="Karimnagar">{t.districtKarimnagar}</option>
                      <option value="Kurnool">{t.districtKurnool}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 block">{t.cropLabel}</label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-900 py-2.5 px-3 rounded-xl focus:outline-none focus:border-emerald-500 font-semibold text-xs cursor-pointer"
                    >
                      <option value="Rice">{t.cropRice}</option>
                      <option value="Cotton">{t.cropCotton}</option>
                      <option value="Chilli">{t.cropChilli}</option>
                      <option value="Tomato">{t.cropTomato}</option>
                      <option value="Groundnut">{t.cropGroundnut}</option>
                      <option value="Other">{t.cropOther}</option>
                    </select>
                  </div>
                </div>

                {/* Crop Photo Zone */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-700 block">{t.photoUploadLabel}</span>
                  
                  {/* Photo Drag box */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden ${
                      cropImage ? "border-emerald-500 bg-emerald-50/20" : "border-stone-300 hover:border-emerald-400 bg-stone-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {cropImage ? (
                      <div className="relative w-full h-full max-h-[160px] flex items-center justify-center">
                        <img
                          src={cropImage}
                          alt="Farmer crop upload"
                          className="max-h-[140px] rounded-xl object-contain shadow animate-fadeIn"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCropImage(null);
                          }}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1.5 shadow hover:bg-red-700 transition cursor-pointer"
                          title="Remove Photo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-full shadow-sm border border-stone-200 text-stone-500 mb-2">
                          <Upload className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="text-xs font-bold text-stone-700">
                          {t.photoDragText}
                        </p>
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          {t.photoFormatsText}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Instantly Load Sample cards for quick hackathon demo */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-2 font-mono">
                      {t.demoHelperTitle}
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => loadSample("rice")}
                        className="bg-sky-50 border border-sky-100 hover:border-sky-300 rounded-xl p-2 text-left cursor-pointer transition flex flex-col items-center justify-between text-center group"
                      >
                        <img src={RICE_BLAST_SVG} alt="Rice" className="w-8 h-8 rounded-lg mb-1 group-hover:scale-105 transition" />
                        <span className="text-[9px] font-extrabold text-sky-950 leading-tight">{t.riceBlastTitle}</span>
                      </button>
                      <button
                        onClick={() => loadSample("cotton")}
                        className="bg-amber-50 border border-amber-100 hover:border-amber-300 rounded-xl p-2 text-left cursor-pointer transition flex flex-col items-center justify-between text-center group"
                      >
                        <img src={COTTON_WORM_SVG} alt="Cotton" className="w-8 h-8 rounded-lg mb-1 group-hover:scale-105 transition" />
                        <span className="text-[9px] font-extrabold text-amber-950 leading-tight">{t.cottonPbwTitle}</span>
                      </button>
                      <button
                        onClick={() => loadSample("tomato")}
                        className="bg-green-50 border border-green-100 hover:border-green-300 rounded-xl p-2 text-left cursor-pointer transition flex flex-col items-center justify-between text-center group"
                      >
                        <img src={TOMATO_CURL_SVG} alt="Tomato" className="w-8 h-8 rounded-lg mb-1 group-hover:scale-105 transition" />
                        <span className="text-[9px] font-extrabold text-emerald-950 leading-tight">{t.tomatoTlcvTitle}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Farmer Query Text or Voice */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-stone-700">{t.askQuestionLabel}</label>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      placeholder={t.questionPlaceholder}
                      rows={3}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-900 py-3 pl-3 pr-12 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs font-semibold leading-relaxed"
                    ></textarea>

                    {/* Microphone voice search button */}
                    <button
                      onClick={startListening}
                      title="Speak query"
                      className={`absolute bottom-3.5 right-3.5 p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                        isListening 
                          ? "bg-red-500 text-white animate-pulse" 
                          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      }`}
                    >
                      <Mic className={`h-4.5 w-4.5 ${isListening ? "animate-pulse" : ""}`} />
                    </button>
                  </div>

                  {isListening && (
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 animate-pulse bg-red-50 p-2.5 rounded-xl border border-red-100">
                      <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
                      <span>{t.listeningText}</span>
                    </div>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleSubmitAdvisory}
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black tracking-wide text-xs uppercase py-3.5 px-6 rounded-2xl shadow-md cursor-pointer transition flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    <Sparkles className="h-4.5 w-4.5 text-emerald-100 animate-pulse" />
                    {t.getAdvisoryButton}
                  </button>

                  {(cropImage || queryText) && (
                    <button
                      onClick={handleReset}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs py-2 px-4 rounded-xl cursor-pointer transition"
                    >
                      {t.clearInputsButton}
                    </button>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-800 rounded-xl text-xs font-semibold flex items-start gap-2 leading-relaxed">
                    <ShieldAlert className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* OUTPUT PANEL - 7 COLS */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. INITIAL EMPTY STATE */}
                {!isProcessing && !advisoryResult && (
                  <div className="bg-white rounded-3xl p-10 text-center border border-stone-100 shadow-xl flex flex-col items-center justify-center min-h-[460px]">
                    <div className="bg-emerald-50 p-6 rounded-full border border-emerald-100 text-emerald-600 mb-4 animate-pulse">
                      <Sprout className="h-10 w-10" />
                    </div>
                    <h3 className="text-lg font-extrabold text-stone-900">
                      {t.awaitingTitle}
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mt-2 leading-relaxed">
                      {t.awaitingDesc}
                    </p>
                    
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/60 text-[11px] font-semibold text-stone-600">
                      <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-emerald-600" /> {t.liveGeminiDiagBadge}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Volume2 className="h-4 w-4 text-emerald-600" /> {t.audioVoiceBadge}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Smartphone className="h-4 w-4 text-emerald-600" /> {t.simSmsBadge}</span>
                    </div>
                  </div>
                )}

                {/* 2. PROCESSING STATE */}
                {isProcessing && (
                  <div className="bg-white rounded-3xl p-10 text-center border border-stone-100 shadow-xl flex flex-col items-center justify-center min-h-[460px] space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
                      <Sprout className="h-6 w-6 text-emerald-600 absolute inset-0 m-auto animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-extrabold text-stone-900 animate-pulse">
                        {t.generatingAdvisoryTitle}
                      </h3>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                        {t.generatingAdvisoryDesc}
                      </p>
                    </div>

                    {/* Step milestones */}
                    <div className="w-full max-w-xs space-y-2.5 pt-4 text-left font-sans">
                      {[
                        "Uploading inputs to Kisan Alert Server...",
                        "Analyzing leaf patterns via Gemini Vision API...",
                        "Generating regional biological & chemical advisory...",
                        "Formatting instant mobile SMS alert..."
                      ].map((stepText, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            processingStep > idx 
                              ? "bg-emerald-600 text-white" 
                              : processingStep === idx 
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse" 
                                : "bg-stone-100 text-stone-400"
                          }`}>
                            {processingStep > idx ? <Check className="h-3 w-3" /> : idx + 1}
                          </div>
                          <span className={`text-[11px] font-semibold ${
                            processingStep === idx ? "text-stone-900 font-bold" : "text-stone-400"
                          }`}>{stepText}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. DUAL ADVISORY RESULT OUTPUTS */}
                {advisoryResult && !isProcessing && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Header Controls (TTS Player & Reset) */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-800 text-white p-5 rounded-2xl shadow-md border border-emerald-700/60">
                      <div>
                        <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider block font-mono">
                          {t.advisoryGeneratedBadge}
                        </span>
                        <h4 className="text-xs font-semibold font-sans">
                          ID: <span className="font-mono text-emerald-200">{advisoryResult.id}</span> • {t.advisorySourceText}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Custom TTS controls */}
                        <div className="flex items-center gap-2 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-700">
                          <button
                            onClick={() => isSpeaking ? stopSpeaking() : startSpeaking(advisoryResult.audioText)}
                            className="flex items-center gap-1.5 text-xs font-bold text-white cursor-pointer"
                          >
                            {isSpeaking ? (
                              <>
                                <VolumeX className="h-4 w-4 text-red-400" />
                                {t.stopAudioButton}
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-4 w-4 text-emerald-300 animate-pulse" />
                                {t.listenAudioButton}
                              </>
                            )}
                          </button>
                          
                          <div className="h-4 w-px bg-emerald-800"></div>

                          {/* Rate selection */}
                          <select
                            value={ttsRate}
                            onChange={(e) => {
                              const newRate = parseFloat(e.target.value);
                              setTtsRate(newRate);
                              if (isSpeaking) {
                                stopSpeaking();
                                setTimeout(() => startSpeaking(advisoryResult.audioText), 150);
                              }
                            }}
                            className="bg-transparent text-emerald-300 text-[10px] font-bold focus:outline-none cursor-pointer"
                            title={t.speechSpeedOption}
                          >
                            <option value="0.75" className="bg-emerald-950 text-emerald-200">0.7x Slow</option>
                            <option value="0.9" className="bg-emerald-950 text-emerald-200">0.9x Rural</option>
                            <option value="1.0" className="bg-emerald-950 text-emerald-200">1.0x Norm</option>
                            <option value="1.2" className="bg-emerald-950 text-emerald-200">1.2x Fast</option>
                          </select>
                        </div>

                        <button
                          onClick={handleReset}
                          className="bg-emerald-900 hover:bg-emerald-950 border border-emerald-600/50 text-xs font-bold py-1.5 px-3.5 rounded-xl cursor-pointer transition"
                        >
                          {t.newDiagnosisButton}
                        </button>
                      </div>
                    </div>

                    {/* Speech active wave visualization */}
                    {isSpeaking && (
                      <div className="bg-emerald-50/80 border border-emerald-100 p-3 rounded-2xl flex items-center gap-3 animate-pulse">
                        <div className="flex gap-1 items-center shrink-0">
                          <span className="w-1 h-4 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                          <span className="w-1 h-6 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                          <span className="w-1 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.5s]"></span>
                          <span className="w-1 h-5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        </div>
                        <span className="text-xs text-emerald-950 font-medium">
                          {t.speakingNarrationStatus}
                        </span>
                      </div>
                    )}

                    {/* Output columns split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Left Block: HTML ADVISORY SHEET */}
                      <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-stone-100 shadow-xl space-y-5">
                        
                        {/* Stamp Logo */}
                        <div className="flex justify-between items-start border-b border-stone-100 pb-4">
                          <div>
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-lg font-mono">
                              {advisoryResult.cropType} Alert
                            </span>
                            <h3 className="text-lg font-black text-stone-900 mt-1 flex items-center gap-1.5 leading-snug">
                              {advisoryResult.diagnosis}
                            </h3>
                          </div>
                          <div className="w-12 h-12 bg-emerald-50 rounded-full border border-emerald-200/50 flex flex-col items-center justify-center text-emerald-700 shrink-0 select-none">
                            <Award className="h-6 w-6 text-emerald-600 animate-pulse" />
                          </div>
                        </div>

                        {/* Symptoms & Cause */}
                        <div className="grid grid-cols-1 gap-4 text-xs">
                          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                            <h4 className="font-bold text-stone-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-mono">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                              {t.visibleSymptomsLabel}
                            </h4>
                            <p className="text-stone-700 leading-relaxed font-sans">{advisoryResult.symptoms}</p>
                          </div>

                          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                            <h4 className="font-bold text-stone-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-mono">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {t.pathogenCauseLabel}
                            </h4>
                            <p className="text-stone-700 leading-relaxed font-sans">{advisoryResult.cause}</p>
                          </div>
                        </div>

                        {/* Remediation split: Organic vs Chemical */}
                        <div className="space-y-4">
                          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100/80 space-y-1.5">
                            <h4 className="font-black text-emerald-950 flex items-center gap-1.5 text-xs">
                              <span className="bg-emerald-600 w-2 h-2 rounded-full"></span>
                              {t.organicRemedyLabel}
                            </h4>
                            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                              {advisoryResult.remedyOrganic}
                            </p>
                          </div>

                          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100/80 space-y-1.5">
                            <h4 className="font-black text-blue-950 flex items-center gap-1.5 text-xs">
                              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
                              {t.chemicalRemedyLabel}
                            </h4>
                            <p className="text-xs text-blue-900 leading-relaxed font-medium">
                              {advisoryResult.remedyChemical}
                            </p>
                          </div>
                        </div>

                        {/* Preventive measures for future */}
                        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/50 space-y-1">
                          <h4 className="font-bold text-stone-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-mono">
                            🛡️ {t.preventionLabel}
                          </h4>
                          <p className="text-xs text-stone-700 leading-relaxed">{advisoryResult.prevention}</p>
                        </div>

                        {/* Escalate block */}
                        <div className="pt-4 border-t border-stone-100 space-y-4">
                          <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                            <div>
                              <h5 className="text-xs font-bold text-stone-950">
                                {language === "te" ? "మరింత సమాచారం లేదా నిపుణుల సలహా కావాలా?" : language === "hi" ? "अधिक जानकारी या विशेषज्ञ सलाह की आवश्यकता है?" : "Need further expert advice?"}
                              </h5>
                              <p className="text-[10px] text-stone-500">Directly link to local Rythu Seva Kendra</p>
                            </div>

                            {advisoryResult.status === "Resolved" ? (
                              <button
                                onClick={handleEscalateExpert}
                                disabled={isEscalating}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer transition flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                              >
                                <PhoneCall className="h-4 w-4" />
                                {isEscalating ? t.escalatingText : t.escalateToExpertButton}
                              </button>
                            ) : (
                              <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-xl font-bold text-[10px] flex items-center gap-1 shrink-0 font-mono">
                                <ShieldCheck className="h-4 w-4 text-red-600" />
                                {t.escalatedToRskBadge}
                              </span>
                            )}
                          </div>

                          {/* Escalate booking confirmation slip */}
                          {escalationSlip && (
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-xs text-stone-900 space-y-3 animate-slideIn">
                              <div className="flex justify-between items-center border-b border-amber-300 pb-2">
                                <span className="font-black text-amber-900 uppercase text-[10px] tracking-wider font-mono">{t.escalationSlipTitle}</span>
                                <span className="font-mono font-black text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-lg text-[10px]">{escalationSlip.token}</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
                                <div>
                                  <span className="text-[10px] text-amber-800 block">{t.expertNameLabel}</span>
                                  <span className="font-bold text-stone-950">{escalationSlip.expertName}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-amber-800 block">{t.designationLabel}</span>
                                  <span className="font-semibold text-stone-950">{escalationSlip.designation}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-amber-800 block">{t.contactLabel}</span>
                                  <span className="font-mono font-bold text-emerald-800">{escalationSlip.contact}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-amber-800 block">{t.rskCenterLabel}</span>
                                  <span className="font-semibold text-stone-950">{escalationSlip.rskCenter}</span>
                                </div>
                              </div>
                              <p className="text-[10px] text-amber-900 leading-relaxed border-t border-amber-200/60 pt-2 italic">
                                * {t.visitExpertMessage}
                              </p>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Right Block: SIMULATED SMS BUBBLE IN MOBILE FRAME */}
                      <div className="md:col-span-5 space-y-4">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block text-center md:text-left">
                          {t.simSmsBadge}
                        </span>

                        {/* Smartphone Frame */}
                        <div className="bg-stone-950 rounded-[40px] p-4 shadow-2xl border-4 border-stone-800 max-w-[280px] mx-auto overflow-hidden relative">
                          {/* Phone camera notch */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-stone-950 h-5 w-24 rounded-b-xl z-20 flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
                            <span className="w-8 h-1 bg-stone-800 rounded-full"></span>
                          </div>

                          {/* Inner Screen */}
                          <div className="bg-[#e5ddd5] rounded-[28px] p-3 text-stone-900 min-h-[400px] flex flex-col justify-between relative font-sans">
                            {/* StatusBar */}
                            <div className="flex justify-between items-center text-[9px] text-stone-700 font-bold px-2 pb-2 pt-1 border-b border-stone-300/40">
                              <span>IN-KisanAlert</span>
                              <div className="flex items-center gap-1">
                                <span>VoLTE</span>
                                <span className="bg-stone-800 w-3 h-1.5 rounded-sm block"></span>
                              </div>
                            </div>

                            {/* Message Header */}
                            <div className="flex items-center gap-2 py-2 bg-stone-100/90 border-b border-stone-200 px-2 rounded-xl mt-1 shadow-sm">
                              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-inner">
                                KA
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-[10px] font-black text-stone-950 truncate">IN-KISANALERT</h4>
                                <p className="text-[8px] text-emerald-700 font-bold tracking-wider uppercase">{t.liveStatus}</p>
                              </div>
                            </div>

                            {/* Message Bubble Container */}
                            <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[250px] flex flex-col justify-end">
                              <div className="text-[9px] text-stone-600 text-center font-bold uppercase tracking-wider my-1 bg-stone-200/50 px-2 py-0.5 rounded-full mx-auto">
                                Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>

                              {/* SMS Bubble */}
                              <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-[92%] shadow-sm border border-stone-200 leading-snug animate-slideIn">
                                <p className="text-[10px] text-stone-950 font-mono leading-relaxed select-text">
                                  {advisoryResult.smsText}
                                </p>
                                <span className="text-[8px] text-stone-500 block text-right mt-1 font-mono">
                                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>

                            {/* Input placeholder */}
                            <div className="border-t border-stone-300/40 pt-2 px-1 flex gap-1 items-center">
                              <div className="bg-stone-100/80 rounded-full px-3 py-1.5 text-[9px] text-stone-500 font-medium flex-1 truncate">
                                SIM card offline mode...
                              </div>
                              <div className="bg-emerald-600 rounded-full p-1.5 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9-2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Demo notes */}
                        <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow text-[11px] text-stone-600 leading-relaxed space-y-1.5">
                          <h5 className="font-bold text-stone-900 flex items-center gap-1 text-emerald-700">
                            <Info className="h-3.5 w-3.5" />
                            How this impacts Governance:
                          </h5>
                          <p>
                            Even if a smallholder farmer is in a low-connectivity region without mobile internet or has a legacy 2G non-smartphone, Kisan Alert pushes these ultra-dense advisories via standard SMS directly to their phone, ensuring complete accessibility and democratic access to high-tier agricultural advice.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* CROP RECOMMENDATION TAB */}
        {activeTab === "recommendation" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300">
                  <Landmark className="h-3.5 w-3.5" />
                  AP & Telangana State Agriculture Advisory
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {language === "te" ? "భూసార ఆధారిత పంట ప్రణాళిక యంత్రం" : language === "hi" ? "मृदा आधारित फसल नियोजन प्रणाली" : "Soil-Based Crop Suitability Engine"}
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">
                  {language === "te" 
                    ? "మీ జిల్లాను ఎంచుకోండి. భూసార రసాయన విలువలు, భూగర్భ జలాల లోతు మరియు సగటు వర్షపాతం ఆధారంగా వ్యవసాయ నిపుణులచే కేటాయించబడిన ఉత్తమ పంటలను కనుగొనండి."
                    : language === "hi"
                    ? "अपने जिले का चयन करें। मिट्टी की गुणवत्ता, भूजल गहराई और ऐतिहासिक वर्षा रिकॉर्ड के आधार पर कृषि वैज्ञानिकों द्वारा अनुशंसित सर्वोत्तम फसल किस्मों की खोज करें।"
                    : "Select your regional district. Kisan Alert's suitability engine references public state datasets of average soil pH, micronutrient densities, groundwater levels, and historical rain distributions to recommend optimized varieties."}
                </p>
              </div>
            </div>

            <CropSuggester language={language} />
          </div>
        )}

        {/* ADMIN DASHBOARD TAB */}
        {activeTab === "admin" && (
          <div className="animate-fadeIn">
            <AdminDashboard
              submissions={submissions}
              onRefresh={fetchSubmissions}
              onEscalateSubmission={handleEscalateFromAdmin}
              isLoading={isLoadingSubmissions}
              language={language}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 mt-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Sprout className="h-5 w-5 text-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wider uppercase">Kisan Alert Console</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              An AI-enabled rural governance suite designed to scale top-tier crop pathology services and diagnostic expert referrals to small, marginal, and low-connectivity farmers.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-white block uppercase tracking-wider">Tech Stack Integrated</span>
            <ul className="space-y-1.5 text-stone-400 font-mono text-[11px]">
              <li>• Gemini Multi-Modal Vision Model (Advisory)</li>
              <li>• Web Speech Transcription (Telugu, Hindi & English)</li>
              <li>• Web Speech-to-Text & Text-to-Speech</li>
              <li>• Simulated Carrier SMS Payload Format</li>
              <li>• Full-Stack Node.js Express & React 19</li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-white block uppercase tracking-wider">Hackathon Metadata</span>
            <p className="text-stone-400 leading-relaxed">
              Created for the <strong>Google Cloud Governance Impact India Hackathon</strong>. Designed for mobile usability, low literacy levels, and full multi-lingual regional inclusion.
            </p>
            <div className="pt-2">
              <span className="inline-block bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full font-bold">
                Deploy Status: Cloud Run Active
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-stone-800 mt-8 pt-6 text-center text-[10px] text-stone-500">
          © 2026 Kisan Alert Agriculture Suite. Built securely server-side.
        </div>
      </footer>
    </div>
  );
}
