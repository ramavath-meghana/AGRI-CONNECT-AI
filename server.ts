import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Allow body parsing
app.use(express.json({ limit: "50mb" }));

// Lazy initializer for Gemini SDK client prioritizing GEMINI_API_KEY2
let aiInstance: GoogleGenAI | null = null;

function getAiClient(apiKeyOverride?: string): GoogleGenAI {
  // If a valid override was sent from the client-side, we can use it dynamically
  if (apiKeyOverride && apiKeyOverride !== "MY_GEMINI_API_KEY_2" && apiKeyOverride.trim() !== "") {
    return new GoogleGenAI({
      apiKey: apiKeyOverride.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  if (!aiInstance) {
    const key2 = process.env.GEMINI_API_KEY2;
    const key1 = process.env.GEMINI_API_KEY;
    
    // Choose the key, favoring key2 (even if it's the default placeholder, check if the other is set and valid)
    let chosenKey = "";
    if (key2 && key2 !== "MY_GEMINI_API_KEY_2" && key2.trim() !== "") {
      chosenKey = key2.trim();
    } else if (key1 && key1 !== "MY_GEMINI_API_KEY" && key1.trim() !== "") {
      chosenKey = key1.trim();
    } else {
      // If nothing else is found, use whatever is present, or fallback to key2 then key1
      chosenKey = (key2 || key1 || "").trim();
    }

    if (!chosenKey) {
      throw new Error("Neither GEMINI_API_KEY2 nor GEMINI_API_KEY environment variable is configured.");
    }

    aiInstance = new GoogleGenAI({
      apiKey: chosenKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Retry helper for handling transient upstream model errors (e.g., 503 Service Unavailable)
async function generateContentWithRetry(client: any, options: any, maxRetries = 3, initialDelay = 1000) {
  let attempt = 0;
  while (true) {
    try {
      return await client.models.generateContent(options);
    } catch (err: any) {
      attempt++;
      // Check if error is transient (e.g., status 503, high demand, or UNAVAILABLE)
      const isTransient = err.status === 503 || 
                          (err.message && err.message.includes("503")) || 
                          (err.message && err.message.includes("high demand")) || 
                          (err.message && err.message.includes("UNAVAILABLE")) ||
                          (err.message && err.message.includes("overloaded"));
      
      if (isTransient && attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.warn(`[Gemini Retry] Attempt ${attempt} failed with a transient error. Retrying in ${delay}ms... Error: ${err.message || err}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
}

// Interface for Submissions
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

// In-memory Database with high-quality Indian regional mock data for Government Hackathon Dashboard
const submissions: Submission[] = [
  {
    id: "sub-101",
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(), // 4 hours ago
    language: "te",
    cropType: "వరి (Rice)",
    queryText: "ఆకు రంగు మారుతోంది, మచ్చలు ఉన్నాయి. నివారణ చెప్పండి.",
    diagnosis: "అగ్గితెగులు (Rice Blast - Pyricularia oryzae)",
    symptoms: "ఆకులపై నూలు కండె ఆకారపు మచ్చలు, గోధుమ రంగు అంచులు మరియు బూడిద రంగు కేంద్రం కలిగి ఉండటం.",
    cause: "శిలీంద్రం (Magnaporthe oryzae) తడి వాతావరణం మరియు నత్రజని ఎరువుల అధిక వాడకం వల్ల వ్యాపిస్తుంది.",
    remedyOrganic: "ఎకరానికి 5 కిలోల వేప పిండి చల్లండి. సూడోమోనాస్ ఫ్లోరిసెన్స్ ద్రావణాన్ని పిచికారీ చేయండి.",
    remedyChemical: "ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రా చొప్పున లీటరు నీటికి కలిపి పిచికారీ చేయండి.",
    prevention: "నత్రజని ఎరువులు మోతాదుకు మించి వాడకండి. రోగ నిరోధక రకాలను ఎంపిక చేసుకోండి.",
    smsText: "AGRI CONNECT AI: వరిలో అగ్గితెగులు గుర్తింపు. ట్రైసైక్లాజోల్ 0.6 గ్రా లీటరు నీటికి కలిపి పిచికారీ చేయండి. సలహా కొరకు సమీప Rythu Seva Kendra సంప్రదించండి.",
    audioText: "వరి పంటలో అగ్గి తెగులు గుర్తించబడినది. నివారణకు ఒక లీటరు నీటిలో సున్నా పాయింట్ ఆరు గ్రాముల ట్రైసైక్లాజోల్ కలిపి పిచికారీ చేయండి.",
    status: "Resolved",
    district: "Guntur",
    farmerName: "వెంకటేశ్వర్లు (Venkateswarlu)"
  },
  {
    id: "sub-102",
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), // 8 hours ago
    language: "te",
    cropType: "ప్రత్తి (Cotton)",
    queryText: "పత్తి కాయలు ఎర్రబడి రాలిపోతున్నాయి, పురుగులు ఉన్నాయి.",
    diagnosis: "గులాబీ రంగు కాయ తొలిచే పురుగు (Pink Bollworm)",
    symptoms: "పూమొగ్గలు విప్పారకుండా గులాబీ రంగు రేకులతో మూసుకుపోవడం, కాయల లోపల గులాబీ రంగు లార్వా ఉండటం.",
    cause: "పెక్టినోఫోరా గాసిపియెల్లా అనే పురుగు లార్వా ప్రత్తి కాయలను తిని నాశనం చేస్తుంది.",
    remedyOrganic: "ఎకరానికి 8 లింగాకర్షణ బుట్టలు (Pheromone Traps) అమర్చండి. వేప నూనె 1500 ppm @ 5 ml/L పిచికారీ చేయండి.",
    remedyChemical: "ప్రొఫెనోఫాస్ 50% EC @ 2 ml చొప్పున లీటరు నీటికి కలిపి సాయంత్రం వేళల్లో పిచికారీ చేయండి.",
    prevention: "పంట కాలపరిమితి ముగిసిన వెంటనే ప్రత్తి మొడులను తొలగించండి. వేసవి దుక్కులు దున్నండి.",
    smsText: "AGRI CONNECT AI: ప్రత్తిలో గులాబీ రంగు పురుగు దాడి. ఎకరానికి 8 లింగాకర్షణ బుట్టలు పెట్టండి లేదా ప్రొఫెనోఫాస్ 2 ml పిచికారీ చేయండి.",
    audioText: "ప్రత్తి పంటలో గులాబీ రంగు కాయ తొలిచే పురుగు ఆశించినది. నివారణకు ఎకరానికి ఎనిమిది లింగాకర్షణ బుట్టలను ఏర్పాటు చేయండి లేదా లీటరు నీటికి రెండు మిల్లీలీటర్ల ప్రొఫెనోఫాస్ కలిపి పిచికారీ చేయండి.",
    status: "Escalated",
    district: "Warangal",
    farmerName: "రామకృష్ణ (Ramakrishna)"
  },
  {
    id: "sub-103",
    timestamp: new Date(Date.now() - 20 * 3600000).toISOString(),
    language: "en",
    cropType: "Tomato",
    queryText: "Tomato leaves curling up and growth is stunted.",
    diagnosis: "Tomato Leaf Curl Virus (TLCV)",
    symptoms: "Upward curling and yellowing of leaf margins, puckering, small leaflets, and severe stunting of plants.",
    cause: "Virus transmitted by Whitefly (Bemisia tabaci) under hot, dry conditions.",
    remedyOrganic: "Spray Neem Oil (3000 ppm) @ 3ml/L. Install yellow sticky traps (15 per acre) to catch whiteflies.",
    remedyChemical: "Spray Acetamiprid 20% SP @ 0.5g/L or Imidacloprid 17.8% SL @ 0.5ml/L to control vector whiteflies.",
    prevention: "Use insect-proof nursery nets. Grow whitefly-resistant tomato cultivars.",
    smsText: "AGRI CONNECT AI: Tomato Leaf Curl Virus detected. Control whiteflies with yellow sticky traps or spray Imidacloprid 0.5ml/L. Contact Rythu Seva Kendra.",
    audioText: "Tomato Leaf Curl Virus detected. Please install fifteen yellow sticky traps per acre to control whiteflies, or spray point five milliliters of Imidacloprid per liter of water.",
    status: "Resolved",
    district: "Anantapur",
    farmerName: "M. Narayana"
  },
  {
    id: "sub-104",
    timestamp: new Date(Date.now() - 30 * 3600000).toISOString(),
    language: "te",
    cropType: "మిరప (Chilli)",
    queryText: "మిరప ఆకులు ముడుచుకుపోతున్నాయి, పూత రాలుతోంది.",
    diagnosis: "తామర పురుగులు (Thrips - Scirtothrips dorsalis)",
    symptoms: "ఆకులు పైకి ముడుచుకుని పడవ ఆకారంలోకి మారడం, ఆకుల అడుగు భాగంలో గోధుమ రంగు గీతలు ఏర్పడటం.",
    cause: "రసం పీల్చే తామర పురుగుల ఉధృతి పొడి మరియు వేడి వాతావరణంలో ఎక్కువగా ఉంటుంది.",
    remedyOrganic: "ఎకరానికి 20 నీలి రంగు జిగురు కార్లు (Blue Sticky Traps) అమర్చండి. పచ్చిమిర్చి-వెల్లుల్లి కషాయం పిచికారీ చేయండి.",
    remedyChemical: "ఫిప్రోనిల్ 5% SC @ 2 ml లేదా స్పిన్టోరమ్ 11.7% SC @ 0.4 ml లీటరు నీటికి కలిపి పిచికారీ చేయండి.",
    prevention: "పొలం గట్లపై కలుపు మొక్కలను నిర్మూలించండి. అంతర పంటగా జొన్న లేదా సజ్జ సాగు చేయండి.",
    smsText: "AGRI CONNECT AI: మిరపలో తామర పురుగులు. పొలంలో 20 నీలి జిగురు అట్టలు పెట్టండి. నివారణకు ఫిప్రోనిల్ 2 ml పిచికారీ చేయండి.",
    audioText: "మిరప పంటలో తామర పురుగులు ఆశించాయి. నివారణకు ఎకరానికి ఇరవై నీలి రంగు జిగురు అట్టలను ఏర్పాటు చేయండి లేదా లీటరు నీటికి రెండు మిల్లీలీటర్ల ఫిప్రోనిల్ కలిపి పిచికారీ చేయండి.",
    status: "Resolved",
    district: "Kurnool",
    farmerName: "రామయ్య (Ramayya)"
  },
  {
    id: "sub-105",
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
    language: "te",
    cropType: "వేరుశనగ (Groundnut)",
    queryText: "మొక్కలు ఎండిపోతున్నాయి, వేర్లు కుళ్ళిపోయాయి.",
    diagnosis: "వేరు కుళ్ళు తెగులు (Stem Rot - Sclerotium rolfsii)",
    symptoms: "మొక్క మొదలు మరియు వేర్ల వద్ద తెల్లటి శిలీంద్ర జాలం వ్యాపించడం, కాండం కుళ్ళిపోయి మొక్కలు చనిపోవడం.",
    cause: "నేల ద్వారా సంక్రమించే శిలీంద్రం (Sclerotium rolfsii) అధిక తేమ మరియు తక్కువ గాలి ప్రసరణ వల్ల ఆశిస్తుంది.",
    remedyOrganic: "ట్రైకోడెర్మా విరిడె @ 2 కిలోలను 100 కిలోల పశువుల ఎరువుతో కలిపి తడి నేలపై చల్లండి.",
    remedyChemical: "కార్బెండజిమ్ + మాంకోజెబ్ (సాఫ్) @ 2 గ్రా లీటరు నీటికి కలిపి మొక్క మొదళ్ల వద్ద నేలను తడపండి (Drenching).",
    prevention: "పంట మార్పిడి (Crop Rotation) పాటించండి. పొలంలో నీరు నిల్వ ఉండకుండా చూసుకోండి.",
    smsText: "AGRI CONNECT AI: వేరుశనగలో వేరుకుళ్ళు తెగులు. ట్రైకోడెర్మా విరిడె వాడండి లేదా సాఫ్ శిలీంద్రనాశిని 2 గ్రా నీటితో మొదళ్ల వద్ద తడపండి.",
    audioText: "వేరుశనగ పంటలో వేరు కుళ్ళు తెగులు గుర్తించబడినది. నివారణకు ట్రైకోడెర్మా విరిడె వాడండి లేదా లీటరు నీటికి రెండు గ్రాముల సాఫ్ పొడిని కలిపి మొక్కల మొదళ్ల వద్ద పోయండి.",
    status: "Escalated",
    district: "Anantapur",
    farmerName: "లక్ష్మీదేవి (Lakshmidevi)"
  }
];

// Helper to parse base64 image
function parseBase64Image(dataUrl: string) {
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return null;
  }
  return {
    mimeType: matches[1],
    data: matches[2]
  };
}

// Full fallback rules-based advisory engine when Gemini API is unavailable or key is leaked
function getFallbackAdvisory(language: "te" | "hi" | "en", district: string, cropType: string, text: string, hasImage?: boolean) {
  const selectedLang = language || "en";
  const userText = (text || "").toLowerCase().trim();
  const cropLower = (cropType || "").toLowerCase().trim();

  // Common disease symptoms or crop diagnostics keywords
  const diseaseKeywords = [
    "worm", "పురుగు", "कीड़ा", "boll", "pest", "insect", "bug", "larva", "caterpillar",
    "curl", "ముడుత", "మరోడ్", "मरोड़", "leaf", "wilt", "dry", "spots", "yellow", "dry", "spots",
    "thrip", "తామర", "మిరప", "chilli", "mirchi", "rot", "కుళ్ళు", "సడన్", "सड़न", "fungus",
    "blast", "అగ్గి", "వరి", "धब्बा", "disease", "sick", "white", "brown", "dying", "spotted",
    "damage", "spots", "blight", "mildew", "mould", "rust"
  ];

  const hasDiseaseKeyword = diseaseKeywords.some(keyword => userText.includes(keyword));

  let diseaseKey = "rice_blast";

  // If no image was uploaded and no specific disease symptoms/keywords are in the query,
  // and the query is generic or greeting, select general_guide
  if (!hasImage && !hasDiseaseKeyword && userText.length > 0 && 
      !userText.includes("diagnose") && !userText.includes("problem") && 
      !userText.includes("treat") && !userText.includes("help") && 
      (userText.length < 15 || userText.includes("hello") || userText.includes("hi") || userText.includes("crop") || userText.includes("name") || userText.includes("farmer"))) {
    diseaseKey = "general_guide";
  } else {
    // Crop-aware matching first
    if (cropLower.includes("cotton") || cropLower.includes("ప్రత్తి") || cropLower.includes("కపాస్") || cropLower.includes("कपास")) {
      diseaseKey = "cotton_bollworm";
    } else if (cropLower.includes("tomato") || cropLower.includes("టమోటా") || cropLower.includes("टमाटर")) {
      diseaseKey = "tomato_curl";
    } else if (cropLower.includes("chilli") || cropLower.includes("మిరప") || cropLower.includes("मिर्च")) {
      diseaseKey = "chilli_thrips";
    } else if (cropLower.includes("groundnut") || cropLower.includes("వేరుశనగ") || cropLower.includes("मूंगफली")) {
      diseaseKey = "groundnut_rot";
    } else if (cropLower.includes("rice") || cropLower.includes("వరి") || cropLower.includes("धान")) {
      diseaseKey = "rice_blast";
    } else {
      // Fallback to keyword matching if crop type is ambiguous
      if (userText.includes("worm") || userText.includes("పురుగు") || userText.includes("कीड़ा") || userText.includes("boll")) {
        diseaseKey = "cotton_bollworm";
      } else if (userText.includes("curl") || userText.includes("ముడుత") || userText.includes("మరోడ్") || userText.includes("मरोड़") || userText.includes("leaf")) {
        diseaseKey = "tomato_curl";
      } else if (userText.includes("thrip") || userText.includes("తామర") || userText.includes("మిరప") || userText.includes("chilli")) {
        diseaseKey = "chilli_thrips";
      } else if (userText.includes("rot") || userText.includes("కుళ్ళు") || userText.includes("సడన్") || userText.includes("सड़न")) {
        diseaseKey = "groundnut_rot";
      } else if (userText.includes("blast") || userText.includes("అగ్గి") || userText.includes("వరి") || userText.includes("धब्बा")) {
        diseaseKey = "rice_blast";
      }
    }
  }

  const database: Record<string, Record<"te" | "hi" | "en", any>> = {
    general_guide: {
      te: {
        cropType: "సాధారణ సహాయం (General Support)",
        diagnosis: "వ్యవసాయ సలహా సమాచార కేంద్రం (General Agricultural Guidance)",
        symptoms: "నిర్దిష్టమైన వ్యాధి లక్షణాలు లేదా చిత్రం అందలేదు.",
        cause: "దయచేసి మీ పంట తెగులు లక్షణాలను నమోదు చేయండి లేదా ఆకు ఫోటోను అప్‌లోడ్ చేయండి.",
        remedyOrganic: "సేంద్రీయ పద్ధతులు పాటించడానికి మీ పంట రకం (వరి, పత్తి, మిరప, టమోటా, వేరుశనగ) మరియు తెగులు లక్షణాలను తెలపండి.",
        remedyChemical: "రసాయన నివారణల కోసం మీ సమీప రైతు సేవా కేంద్రాన్ని (RSK) సంప్రదించండి లేదా ఖచ్చితమైన లక్షణాలు ఇవ్వండి.",
        prevention: "పొలంలో కలుపు నివారణ, సరైన నీటి యాజమాన్యం మరియు పంట మార్పిడి వంటి ప్రాథమిక జాగ్రత్తలు తీసుకోండి.",
        smsText: "AGRI CONNECT: దయచేసి పంట తెగులు వివరాలను తెలపండి లేదా ఆకు ఫోటోను అప్‌లోడ్ చేయండి.",
        audioText: "నమస్కారం రైతు సోదరులారా. మీ పంట తెగులు లక్షణాలను స్పష్టంగా తెలపండి లేదా ఒక ఫోటోను అప్‌లోడ్ చేయండి. మేము వరి, పత్తి, మిరప, టమోటా, మరియు వేరుశనగ పంటల తెగుళ్ల నివారణకు సరైన సలహాలను అందిస్తాము."
      },
      hi: {
        cropType: "सामान्य सहायता (General Support)",
        diagnosis: "सामान्य कृषि मार्गदर्शन (General Agricultural Guidance)",
        symptoms: "कोई विशिष्ट बीमारी के लक्षण या तस्वीर उपलब्ध नहीं है।",
        cause: "सटीक निदान के लिए कृपया अपनी फसल के लक्षणों का वर्णन करें या पौधे की फोटो अपलोड करें।",
        remedyOrganic: "जैविक उपचारों के लिए कृपया अपनी फसल का नाम (धान, कपास, मिर्च, टमाटर, मूंगफली) और बीमारी के लक्षण लिखें।",
        remedyChemical: "रासायनिक नियंत्रण के लिए अपने नजदीकी किसान सेवा केंद्र से संपर्क करें या सही लक्षण प्रदान करें।",
        prevention: "खेत की साफ-सफाई रखें, उचित जल निकासी और फसल चक्र जैसे बुनियादी नियमों का पालन करें।",
        smsText: "AGRI CONNECT: कृपया अपनी फसल के लक्षणों का विवरण दें या फोटो अपलोड करें।",
        audioText: "नमस्कार किसान भाइयों। कृपया अपनी फसल के लक्षणों का स्पष्ट विवरण दें या प्रभावित पौधे की तस्वीर अपलोड करें। हम धान, कपास, मिर्च, टमाटर और मूंगफली की बीमारियों के निवारण में आपकी पूरी मदद करेंगे।"
      },
      en: {
        cropType: "General Support",
        diagnosis: "General Agricultural Guidance",
        symptoms: "No distinct plant disease symptoms or leaf image were provided for analysis.",
        cause: "Detailed pathobiology analysis requires specific symptoms or an uploaded photo of the affected crop leaf.",
        remedyOrganic: "Describe your crop (Rice, Cotton, Chilli, Tomato, Groundnut) and symptoms to get organic solutions.",
        remedyChemical: "Consult your regional agricultural extension officer or specify symptoms for chemical pesticide recommendations.",
        prevention: "Follow general best practices: maintain proper field sanitation, water drainage, and crop rotation.",
        smsText: "AGRI CONNECT AI: Please describe your crop symptoms or upload a leaf photo for a pathobiology report.",
        audioText: "Greetings! Please describe your crop symptoms or upload a clear photo of the affected plant leaf. We support diagnosing pests and diseases for Rice, Cotton, Chilli, Tomato, and Groundnut to help you protect your yield."
      }
    },
    rice_blast: {
      te: {
        cropType: "వరి (Rice)",
        diagnosis: "అగ్గితెగులు (Rice Blast - Pyricularia oryzae)",
        symptoms: "ఆకులపై నూలు కండె ఆకారపు మచ్చలు, గోధుమ రంగు అంచులు మరియు బూడిద రంగు కేంద్రం.",
        cause: "శిలీంద్రం (Magnaporthe oryzae) అధిక తేమ మరియు నత్రజని అధిక వాడకం వల్ల వ్యాపిస్తుంది.",
        remedyOrganic: "ఎకరానికి 5 కిలోల వేప పిండి చల్లండి. సూడోమోనాస్ ఫ్లోరిసెన్స్ ద్రావణాన్ని పిచికారీ చేయండి.",
        remedyChemical: "ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రా చొప్పున లీటరు నీటికి కలిపి పిచికారీ చేయండి.",
        prevention: "నత్రజని ఎరువులు మోతాదుకు మించి వాడకండి. రోగ నిరోధక రకాలను ఎంపిక చేసుకోండి.",
        smsText: "AGRI CONNECT: వరిలో అగ్గితెగులు గుర్తింపు. ట్రైసైక్లాజోల్ 0.6 గ్రా లీటరు నీటికి కలిపి పిచికారీ చేయండి. RSK ని సంప్రదించండి.",
        audioText: "నమస్కారం రైతు సోదరులారా. మీ వరి పంటలో అగ్గి తెగులును గుర్తించాము. నివారణకు లీటరు నీటికి సున్నా పాయింట్ ఆరు గ్రాముల ట్రైసైక్లాజోల్ కలిపి పిచికారీ చేయండి."
      },
      hi: {
        cropType: "धान (Rice)",
        diagnosis: "झोंका रोग (Rice Blast - Pyricularia oryzae)",
        symptoms: "पत्तियों पर आंख या नाव के आकार के धब्बे, जिनके किनारे भूरे और बीच का हिस्सा धूसर होता है।",
        cause: "फफूंद (मैग्नापोर्टे ओराइजी) जो अत्यधिक नमी और नाइट्रोजन के अधिक उपयोग से फैलता है।",
        remedyOrganic: "प्रति एकड़ 5 किलो नीम की खली छिड़कें। स्यूडोमोनास फ्लोरेसेंस घोल का छिड़काव करें।",
        remedyChemical: "ट्राइसाइक्लाजोल 75% WP @ 0.6 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।",
        prevention: "नाइट्रोजन युक्त उर्वरकों का संतुलित उपयोग करें। रोग प्रतिरोधी किस्मों का चयन करें।",
        smsText: "AGRI CONNECT: धान में झोंका रोग। ट्राइसाइक्लाजोल 0.6 ग्राम/लीटर पानी छिड़कें। नजदीकी किसान सेवा केंद्र से संपर्क करें।",
        audioText: "किसान भाइयों नमस्कार। आपके धान में झोंका रोग की पहचान हुई है। नियंत्रण के लिए प्रति लीटर पानी में शून्य दशमलव छह ग्राम ट्राइसाइक्लाजोल मिलाकर छिड़काव करें।"
      },
      en: {
        cropType: "Rice",
        diagnosis: "Rice Blast (Pyricularia oryzae)",
        symptoms: "Spindle-shaped spots on leaves with brown margins and grey centers.",
        cause: "Fungal pathogen Magnaporthe oryzae favored by high humidity and excess nitrogen.",
        remedyOrganic: "Apply 5 kg Neem Cake per acre. Spray Pseudomonas fluorescens solution.",
        remedyChemical: "Spray Tricyclazole 75% WP @ 0.6g per Liter of water.",
        prevention: "Avoid excessive nitrogen application. Select resistant cultivars.",
        smsText: "AGRI CONNECT: Rice Blast detected. Spray Tricyclazole @ 0.6g/L water. Contact nearest Rythu Seva Kendra (RSK) for assistance.",
        audioText: "Hello farmer. We detected Rice Blast in your paddy crop. To manage this, please spray point six grams of Tricyclazole per liter of water."
      }
    },
    cotton_bollworm: {
      te: {
        cropType: "ప్రత్తి (Cotton)",
        diagnosis: "గులాబీ రంగు కాయ తొలిచే పురుగు (Pink Bollworm)",
        symptoms: "పూమొగ్గలు విప్పారకుండా గులాబీ రంగు రేకులతో మూసుకుపోవడం, కాయల లోపల లార్వా ఉండటం.",
        cause: "పెక్టినోఫోరా గాసిపియెల్లా లార్వా ప్రత్తి కాయలను తిని నష్టపరుస్తుంది.",
        remedyOrganic: "ఎకరానికి 8 లింగాకర్షణ బుట్టలు అమర్చండి. వేప నూనె 1500 ppm @ 5 ml/L పిచికారీ చేయండి.",
        remedyChemical: "ప్రొఫెనోఫాస్ 50% EC @ 2 ml లీటరు నీటికి కలిపి సాయంత్రం వేళల్లో పిచికారీ చేయండి.",
        prevention: "పాలు పోసుకునే సమయం దాటిన వెంటనే ప్రత్తి మొడులను తొలగించండి. వేసవి దుక్కులు దున్నండి.",
        smsText: "AGRI CONNECT: ప్రత్తిలో గులాబీ రంగు పురుగు. 8 లింగాకర్షణ బుట్టలు పెట్టండి లేదా ప్రొఫెనోఫాస్ 2 ml పిచికారీ చేయండి.",
        audioText: "నమస్కారం రైతు సోదరులారా. మీ పత్తి పంటలో గులాబీ రంగు కాయ తొలిచే పురుగును గుర్తించాము. దీని నివారణకు ఎకరానికి ఎనిమిది లింగాకర్షణ బుట్టలను అమర్చండి."
      },
      hi: {
        cropType: "कपास (Cotton)",
        diagnosis: "गुलाबी सुंडी (Pink Bollworm)",
        symptoms: "फूलों का पूरी तरह न खिलना और बंद गुलाब जैसी आकृति बनाना, डोडों के अंदर गुलाबी लार्वा मिलना।",
        cause: "पेक्टिनोफोरा गॉसिपिएला के लार्वा जो कपास के डोडों को खाकर नष्ट करते हैं।",
        remedyOrganic: "प्रति एकड़ 8 फेरोमोन ट्रैप लगाएं। नीम का तेल 1500 ppm @ 5 मिली/लीटर छिड़कें।",
        remedyChemical: "प्रोफेनोफॉस 50% EC @ 2 मिली प्रति लीटर पानी में मिलाकर शाम के समय छिड़काव करें।",
        prevention: "फसल कटाई के बाद डंठलों को नष्ट करें। गहरी ग्रीष्मकालीन जुताई करें।",
        smsText: "AGRI CONNECT: कपास में गुलाबी सुंडी। 8 फेरोमोन ट्रैप लगाएं या प्रोफेनोफॉस 2 मिली/लीटर छिड़कें।",
        audioText: "किसान भाइयों नमस्कार। आपकी कपास की फसल में गुलाबी सुंडी का प्रकोप पाया गया है। नियंत्रण के लिए प्रति एकड़ आठ फेरोमोन ट्रैप लगाएं या प्रोफेनोफॉस का छिड़काव करें।"
      },
      en: {
        cropType: "Cotton",
        diagnosis: "Pink Bollworm (Pectinophora gossypiella)",
        symptoms: "Rosette flowers that fail to open, and small pinkish larvae feeding inside green bolls.",
        cause: "Lepidopteran pest feeding heavily on developing cotton seeds and lint.",
        remedyOrganic: "Install 8 pheromone traps per acre. Spray Neem Oil 1500 ppm @ 5ml/L.",
        remedyChemical: "Spray Profenofos 50% EC @ 2ml per Liter of water during evening hours.",
        prevention: "Complete crop termination after harvest. Practice deep summer ploughing.",
        smsText: "AGRI CONNECT: Pink Bollworm in Cotton. Install 8 pheromone traps or spray Profenofos @ 2ml/L. Contact local RSK.",
        audioText: "Hello farmer. We identified Pink Bollworm in your cotton field. We advise installing eight pheromone traps per acre or spraying two milliliters of Profenofos per liter."
      }
    },
    tomato_curl: {
      te: {
        cropType: "టమోటా (Tomato)",
        diagnosis: "టమోటా ఆకు ముడుత వైరస్ (Tomato Leaf Curl Virus - TLCV)",
        symptoms: "ఆకులు పైకి ముడుచుకుపోవడం, ఎల్లోయింగ్ రావడం, మొక్క ఎదుగుదల ఆగిపోవడం.",
        cause: "తెల్లదోమ (Whitefly) ద్వారా వ్యాపించే వైరస్.",
        remedyOrganic: "వేప నూనె 3000 ppm @ 3ml/L పిచికారీ చేయండి. ఎకరానికి 15 పసుపు జిగురు అట్టలు పెట్టండి.",
        remedyChemical: "ఎసిటామిప్రిడ్ 20% SP @ 0.5 గ్రా లేదా ఇమిడాక్లోప్రిడ్ 0.5 ml లీటరు నీటికి కలిపి పిచికారీ చేయండి.",
        prevention: "నారుమడిపై నెట్ వాడండి. తెల్లదోమలను నిరంతరం గమనించండి.",
        smsText: "AGRI CONNECT: టమోటా ఆకు ముడుత వైరస్ గుర్తింపు. ఎసిటామిప్రిడ్ 0.5 గ్రా పిచికారీ చేయండి. పసుపు అట్టలు పెట్టండి.",
        audioText: "నమస్కారం రైతు సోదరులారా. మీ టమోటా పంటలో ఆకు ముడుత వైరస్ కనుగొనబడింది. దీనిని నివారించడానికి పసుపు జిగురు అట్టలను అమర్చండి."
      },
      hi: {
        cropType: "टमाटर (Tomato)",
        diagnosis: "टमाटर पर्ण कुंचन विषाणु (Tomato Leaf Curl Virus - TLCV)",
        symptoms: "पत्तियों का ऊपर की ओर मुड़ना और पीला पड़ना, पौधों का बौना रह जाना।",
        cause: "सफेद मक्खी (Whitefly) द्वारा संचारित विषाणु जनित रोग।",
        remedyOrganic: "नीम का तेल @ 3 मिली/लीटर छिड़कें। प्रति एकड़ 15 पीले चिपचिपे ट्रैप लगाएं।",
        remedyChemical: "एसिटामिप्रिड 20% SP @ 0.5 ग्राम या इमिडाक्लोप्रिड @ 0.5 मिली प्रति लीटर पानी छिड़कें।",
        prevention: "नर्सरी को कीट-रोधी जाली से ढकें। रोग-प्रतिरोधी किस्में लगाएं।",
        smsText: "AGRI CONNECT: टमाटर में लीफ कर्ल वायरस। सफेद मक्खी नियंत्रण हेतु इमिडाक्लोप्रिड 0.5 मिली/लीटर छिड़कें।",
        audioText: "किसान भाइयों नमस्कार। आपके टमाटर में पर्ण कुंचन रोग देखा गया है। इसके प्रसार को रोकने के लिए प्रति एकड़ पंद्रह पीले चिपचिपे जाल लगाएं।"
      },
      en: {
        cropType: "Tomato",
        diagnosis: "Tomato Leaf Curl Virus (TLCV)",
        symptoms: "Upward curling of leaves, chlorosis of margins, and severely stunted plant growth.",
        cause: "Viral infection transmitted by the Whitefly vector under dry, warm spells.",
        remedyOrganic: "Spray Neem Oil @ 3ml/L. Place 15 yellow sticky traps per acre to capture whiteflies.",
        remedyChemical: "Spray Acetamiprid 20% SP @ 0.5g/L or Imidacloprid @ 0.5ml/L to manage vectors.",
        prevention: "Grow nursery seedlings under fine insect nets. Use resistant hybrid seeds.",
        smsText: "AGRI CONNECT: Tomato Leaf Curl Virus. Spray Imidacloprid @ 0.5ml/L to control whitefly vectors. Contact RSK.",
        audioText: "Hello farmer. Your tomato plants show symptoms of leaf curl virus. We recommend placing fifteen yellow sticky traps per acre to catch whiteflies."
      }
    },
    chilli_thrips: {
      te: {
        cropType: "మిరప (Chilli)",
        diagnosis: "తామర పురుగులు (Thrips - Scirtothrips dorsalis)",
        symptoms: "ఆకులు పైకి ముడుచుకుని పడవ ఆకారంలోకి మారడం, పూత రాలిపోవడం.",
        cause: "రసం పీల్చే తామర పురుగుల ఉధృతి పొడి వాతావరణంలో పెరుగుతుంది.",
        remedyOrganic: "ఎకరానికి 20 నీలి రంగు జిగురు కార్లు అమర్చండి. పచ్చిమిర్చి-వెల్లుల్లి కషాయం పిచికారీ చేయండి.",
        remedyChemical: "ఫిప్రోనిల్ 5% SC @ 2 ml లేదా స్పిన్టోరమ్ @ 0.4 ml లీటరు నీటికి కలిపి పిచికారీ చేయండి.",
        prevention: "పొలం గట్లపై కలుపు మొక్కలను నిర్మూలించండి. అంతర పంటలు వేయండి.",
        smsText: "AGRI CONNECT: మిరపలో తామర పురుగులు. పొలంలో 20 నీలి జిగురు అట్టలు పెట్టండి. ఫిప్రోనిల్ 2 ml పిచికారీ చేయండి.",
        audioText: "నమస్కారం రైతు సోదరులారా. మీ మిరప పంటలో తామర పురుగులను గుర్తించాము. నివారణకు లీటరు నీటికి రెండు మిల్లీలీటర్ల ఫిప్రోనిల్ పిచికారీ చేయండి."
      },
      hi: {
        cropType: "मिर्च (Chilli)",
        diagnosis: "थ्रिप्स (Thrips - Scirtothrips dorsalis)",
        symptoms: "पत्तियों का ऊपर की ओर नाव के आकार में मुड़ना, नए पत्तों का सिकुड़ना और फूलों का झड़ना।",
        cause: "रस चूसने वाले थ्रिप्स कीट जो गर्म और शुष्क मौसम में तेजी से पनपते हैं।",
        remedyOrganic: "प्रति एकड़ 20 नीले चिपचिपे ट्रैप लगाएं। लहसुन-मिर्च का काढ़ा छिड़कें।",
        remedyChemical: "फिप्रोनिल 5% SC @ 2 मिली या स्पिनटोरम 11.7% SC @ 0.4 मिली प्रति लीटर पानी छिड़कें।",
        prevention: "खेत की मेड़ों को खरपतवार मुक्त रखें। अंतर-फसली के रूप में ज्वार या बाजरा लगाएं।",
        smsText: "AGRI CONNECT: मिर्च में थ्रिप्स। खेत में 20 नीले चिपचिपे ट्रैप लगाएं या फिप्रोनिल 2 मिली/लीटर छिड़कें।",
        audioText: "किसान भाइयों नमस्कार। आपकी मिर्च की फसल में थ्रिप्स का हमला हुआ है। नियंत्रण के लिए खेत में बीस नीले चिपचिपे जाल लगाएं या फिप्रोनिल छिड़कें।"
      },
      en: {
        cropType: "Chilli",
        diagnosis: "Chilli Thrips (Scirtothrips dorsalis)",
        symptoms: "Upward leaf curling, boat-shaped deformities of leaves, and flower drop.",
        cause: "Sap-feeding thrips insects whose infestation spikes in dry, warm environments.",
        remedyOrganic: "Install 20 blue sticky traps per acre. Spray green chilli-garlic extract.",
        remedyChemical: "Spray Fipronil 5% SC @ 2ml/L or Spinetoram 11.7% SC @ 0.4ml per Liter of water.",
        prevention: "Keep bunds weed-free. Grow barrier crops like sorghum or pearl millet.",
        smsText: "AGRI CONNECT: Chilli Thrips. Install 20 blue sticky traps or spray Fipronil @ 2ml/L. Consult your local RSK.",
        audioText: "Hello farmer. Your chilli crop has a thrips infestation. Please install twenty blue sticky traps per acre or spray two milliliters of Fipronil per liter."
      }
    },
    groundnut_rot: {
      te: {
        cropType: "వేరుశనగ (Groundnut)",
        diagnosis: "వేరు కుళ్ళు తెగులు (Stem Rot - Sclerotium rolfsii)",
        symptoms: "మొక్క మొదలు వద్ద తెల్లటి బూజు, కాండం కుళ్ళిపోయి ఎండిపోవడం.",
        cause: "నేల ద్వారా సంక్రమించే శిలీంద్రం అధిక తేమ లేదా పొడి పరిస్థితులలో ఆశిస్తుంది.",
        remedyOrganic: "ట్రైకోడెర్మా విరిడె @ 2 కిలోలను 100 కిలోల పశువుల ఎరువుతో కలిపి చల్లండి.",
        remedyChemical: "సాఫ్ (కార్బెండజిమ్ + మాంకోజెబ్) @ 2 గ్రా లీటరు నీటికి కలిపి మొదళ్ల వద్ద తడపండి.",
        prevention: "పంట మార్పిడి పాటించండి. తగినంత గాలి ప్రసరణ ఉండేలా చూసుకోండి.",
        smsText: "AGRI CONNECT: వేరుశనగలో వేరుకుళ్ళు తెగులు. ట్రైకోడెర్మా విరిడె లేదా సాఫ్ శిలీంద్రనాశిని 2 గ్రా మొదళ్ల వద్ద తడపండి.",
        audioText: "నమస్కారం రైతు సోదరులారా. మీ వేరుశనగ పంటలో వేరు కుళ్ళు తెగులు కనుగొనబడింది. దీని నివారణకు ట్రైకోడెర్మా విరిడె పశువుల ఎరువుతో కలిపి చల్లండి."
      },
      hi: {
        cropType: "मूंगफली (Groundnut)",
        diagnosis: "तना सड़न रोग (Stem Rot - Sclerotium rolfsii)",
        symptoms: "पौधे के आधार पर सफेद कवक का जाल दिखना, तने का सड़ना और पौधों का अचानक सूखना।",
        cause: "मृदा जनित फफूंद (स्क्लेरोशियम रोल्फसी) जो गर्म और आर्द्र परिस्थितियों में फैलता है।",
        remedyOrganic: "2 किलो ट्राइकोडेर्मा विरिडी को 100 किलो गोबर की खाद में मिलाकर खेत में फैलाएं।",
        remedyChemical: "साफ (कार्बेन्डाजिम + मैंकोजेब) @ 2 ग्राम प्रति लीटर पानी मिलाकर पौधों की जड़ों को सींचें।",
        prevention: "फसल चक्र अपनाएं। जलभराव की समस्या का उचित समाधान सुनिश्चित करें।",
        smsText: "AGRI CONNECT: मूंगफली में तना सड़न। ट्राइकोडेर्मा का प्रयोग करें या साफ फफूंदनाशक 2 ग्राम जड़ों में डालें।",
        audioText: "किसान भाइयों नमस्कार। आपकी मूंगफली में तना सड़न रोग देखा गया है। उपचार के लिए ट्राइकोडेर्मा को गोबर की खाद में मिलाकर जड़ों के पास डालें।"
      },
      en: {
        cropType: "Groundnut",
        diagnosis: "Stem Rot (Sclerotium rolfsii)",
        symptoms: "White web-like fungal growth near the soil line, rot of root collar, wilting.",
        cause: "Soil-borne fungal pathogen spreading in high humidity or variable dry conditions.",
        remedyOrganic: "Mix 2 kg Trichoderma viride with 100 kg farmyard manure and apply to soil.",
        remedyChemical: "Drench soil at plant bases with Carbendazim + Mancozeb (Saaf) @ 2g/L.",
        prevention: "Follow crop rotation. Ensure proper plant density and field drainage.",
        smsText: "AGRI CONNECT: Stem Rot in Groundnut. Apply Trichoderma or drench soil with Saaf @ 2g/L. Visit your local RSK.",
        audioText: "Hello farmer. We identified Stem Rot in your groundnut crop. We advise drenching soil with Trichoderma or Saaf fungicide."
      }
    }
  };

  const selectedEntry = database[diseaseKey] ? database[diseaseKey][selectedLang] : database.rice_blast[selectedLang];
  return selectedEntry;
}

// 1. API: Get all submissions for Admin Dashboard
app.get("/api/submissions", (req, res) => {
  res.json({ status: "success", count: submissions.length, data: submissions });
});

// 2. API: Resolve or Escalate expert follow-up
app.post("/api/submissions/:id/escalate", (req, res) => {
  const { id } = req.params;
  const submission = submissions.find((s) => s.id === id);
  if (submission) {
    submission.status = "Escalated";
    res.json({ status: "success", message: "Successfully escalated to Rythu Seva Kendra expert.", data: submission });
  } else {
    res.status(404).json({ status: "error", message: "Submission not found" });
  }
});

// 3. API: Generate Advisory using Gemini API
app.post("/api/advisory", async (req, res) => {
  try {
    const { image, text, language, district, cropType, apiKeyOverride } = req.body;
    const selectedLang = language === "te" ? "te" : language === "hi" ? "hi" : "en";
    const selectedDistrict = district || "Telangana/Andhra Pradesh Region";
    const selectedCropType = cropType || "General Crop";

    // Build the contents parts
    const parts: any[] = [];

    // Setup visual context
    let promptIntro = "";
    if (image) {
      const parsed = parseBase64Image(image);
      if (parsed) {
        parts.push({
          inlineData: {
            mimeType: parsed.mimeType,
            data: parsed.data,
          },
        });
        promptIntro = "Analyze this crop image to diagnose the disease or pest issue.";
      } else {
        promptIntro = "A crop image was provided but it could not be processed. Proceeding with the farmer's written text.";
      }
    } else {
      promptIntro = "Answer the farmer's agricultural query.";
    }

    // Language guidelines for prompt
    const languageInstruction = selectedLang === "te" 
      ? "CRITICAL MANDATE: You MUST write EVERY SINGLE WORD of the JSON values (diagnosis, symptoms, cause, remedyOrganic, remedyChemical, prevention, smsText, and audioText) EXCLUSIVELY in the Telugu language (using Telugu Script). Do NOT use English words or English script in the values. It must be highly simplified, reassuring, rural farmer-friendly style."
      : selectedLang === "hi"
      ? "CRITICAL MANDATE: You MUST write EVERY SINGLE WORD of the JSON values (diagnosis, symptoms, cause, remedyOrganic, remedyChemical, prevention, smsText, and audioText) EXCLUSIVELY in the Hindi language (using Devanagari Script). Do NOT use English words or English script in the values. It must be highly simplified, reassuring, rural farmer-friendly style."
      : "Write the response fields (diagnosis, symptoms, cause, remedyOrganic, remedyChemical, prevention, smsText, and audioText) in clear, plain English, using extremely simple language suited for marginal rural farmers.";

    const systemInstruction = `You are "AGRI CONNECT AI", an expert agricultural scientist and advisor developed for small and marginal farmers in India. Your goal is to provide end-to-end, high-impact, actionable advisories.
You are running under a Google Cloud governance-focused prototype in India. 
You must analyze the inputs (which could include a crop photograph and a query text) and return a structured JSON response.

${languageInstruction}

Your response must strictly conform to this JSON schema:
{
  "cropType": "The crop identified (e.g. if Telugu: వరి, పత్తి; if Hindi: धान, कपास; if English: Rice, Cotton)",
  "diagnosis": "The crop disease or pest diagnosed in the selected language.",
  "symptoms": "2-3 visible indicators or description of symptoms in plain farmer-friendly language, in the selected language.",
  "cause": "Underlying pathogen, pest, environmental factor, or soil issue, in the selected language.",
  "remedyOrganic": "Natural or organic treatments, biological controls, or domestic sprays, in the selected language.",
  "remedyChemical": "Precise, government-approved chemical treatments with standard dilution rates, in the selected language.",
  "prevention": "1-2 preventive habits for the next crop cycle, in the selected language.",
  "smsText": "A highly condensed text message (maximum 150 characters, NO markdown, NO bullet points) that fits perfectly into a basic SMS bubble, giving the crop name, diagnosis, and main treatment so that a farmer with a low-feature phone or poor connectivity gets instant actionable value, entirely in the selected language.",
  "audioText": "A clean, warm, friendly paragraph written entirely as plain text without asterisks, hash signs, or bullet points, designed to be read aloud via Text-to-Speech in the selected language. It should warmly greeting the farmer and summarize the diagnosis and treatment, entirely in the selected language."
}

Ensure all fields are populated. Do not return empty fields. Return raw JSON only, no markdown wrappers like \`\`\`json.`;

    const userQueryText = text || "Diagnose the disease in this photo and provide advisory.";
    
    parts.push({
      text: `Context:
- Location/District: ${selectedDistrict}
- Farmer's Specified Crop Type (if any): ${selectedCropType}
- Farmer's Query Text: "${userQueryText}"

Instructions:
${promptIntro}
Please diagnose the problem and provide a highly useful agricultural advisory according to the system instructions.
REMEMBER: All output fields MUST be STRICTLY in the requested language (${selectedLang === 'te' ? 'Telugu' : selectedLang === 'hi' ? 'Hindi' : 'English'}).`,
    });

    console.log(`Sending prompt to Gemini. Language: ${selectedLang}, Query: ${userQueryText.substring(0, 50)}...`);

    const response = await generateContentWithRetry(getAiClient(apiKeyOverride), {
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cropType: { type: Type.STRING },
            diagnosis: { type: Type.STRING },
            symptoms: { type: Type.STRING },
            cause: { type: Type.STRING },
            remedyOrganic: { type: Type.STRING },
            remedyChemical: { type: Type.STRING },
            prevention: { type: Type.STRING },
            smsText: { type: Type.STRING },
            audioText: { type: Type.STRING },
          },
          required: [
            "cropType",
            "diagnosis",
            "symptoms",
            "cause",
            "remedyOrganic",
            "remedyChemical",
            "prevention",
            "smsText",
            "audioText",
          ],
        },
      },
    });

    const resultText = response.text?.trim() || "{}";
    const parsedResult = JSON.parse(resultText);

    // Create a new Submission entry
    const newId = `sub-${Date.now()}`;
    const newSubmission: Submission = {
      id: newId,
      timestamp: new Date().toISOString(),
      language: selectedLang,
      cropType: parsedResult.cropType || selectedCropType,
      queryText: userQueryText,
      imageUrl: image || undefined, // Store base64 so it can be previewed in admin logs!
      diagnosis: parsedResult.diagnosis,
      symptoms: parsedResult.symptoms,
      cause: parsedResult.cause,
      remedyOrganic: parsedResult.remedyOrganic,
      remedyChemical: parsedResult.remedyChemical,
      prevention: parsedResult.prevention,
      smsText: parsedResult.smsText,
      audioText: parsedResult.audioText,
      status: "Resolved",
      district: selectedDistrict,
      farmerName: selectedLang === "te" ? "రాము (Ramu - Farmer)" : selectedLang === "hi" ? "रामू (Ramu - Farmer)" : "Farmer Ramu",
    };

    // Add to in-memory store
    submissions.unshift(newSubmission);

    res.json({
      status: "success",
      data: newSubmission,
    });
  } catch (error: any) {
    console.error("Gemini Advisory Generation Error (Surgical fallback rules engine activated):", error);
    try {
      const { image, text, language, district, cropType } = req.body;
      const selectedLang = language === "te" ? "te" : language === "hi" ? "hi" : "en";
      const selectedDistrict = district || "Guntur";
      const selectedCropType = cropType || "General Crop";
      const userQueryText = text || "Diagnose the disease and provide advisory.";

      const fallback = getFallbackAdvisory(selectedLang, selectedDistrict, selectedCropType, userQueryText, !!image);
      
      const newId = `sub-${Date.now()}`;
      const newSubmission: Submission = {
        id: newId,
        timestamp: new Date().toISOString(),
        language: selectedLang,
        cropType: fallback.cropType,
        queryText: userQueryText,
        imageUrl: image || undefined,
        diagnosis: fallback.diagnosis,
        symptoms: fallback.symptoms,
        cause: fallback.cause,
        remedyOrganic: fallback.remedyOrganic,
        remedyChemical: fallback.remedyChemical,
        prevention: fallback.prevention,
        smsText: fallback.smsText,
        audioText: fallback.audioText,
        status: "Resolved",
        district: selectedDistrict,
        farmerName: selectedLang === "te" ? "రాము (Ramu - Farmer)" : selectedLang === "hi" ? "रामू (Ramu - Farmer)" : "Farmer Ramu",
      };

      // Add to in-memory store
      submissions.unshift(newSubmission);

      console.log(`[Offline Rules Engine] Successfully generated fallback advisory for crop: ${fallback.cropType}`);

      res.json({
        status: "success",
        data: newSubmission,
        isFallback: true
      });
    } catch (fallbackError: any) {
      console.error("Critical Fallback Generator Error:", fallbackError);
      res.status(500).json({
        status: "error",
        message: "శిలీంద్ర విశ్లేషణలో లోపం జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి. (Error: " + (error.message || error) + ")",
      });
    }
  }
});

// Vite Setup (Development vs Production)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AGRI CONNECT AI] Server running on http://localhost:${PORT} under NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
