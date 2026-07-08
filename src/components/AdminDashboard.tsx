import React, { useState } from "react";
import { Users, AlertTriangle, ShieldCheck, HelpCircle, Landmark, MapPin, Calendar, MessageSquare, PhoneCall, RefreshCw, BadgeInfo } from "lucide-react";
import { translations, getLocalizedSubmissions, Language } from "../translations";

// Structure of Submission (must match server.ts)
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

interface AdminDashboardProps {
  submissions: Submission[];
  onRefresh: () => void;
  onEscalateSubmission: (id: string) => Promise<void>;
  isLoading: boolean;
  language: Language;
}

export default function AdminDashboard({ submissions, onRefresh, onEscalateSubmission, isLoading, language }: AdminDashboardProps) {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [escalatingId, setEscalatingId] = useState<string | null>(null);

  const t = translations[language];

  // Localize mock and static data inside submissions stream so the dashboard looks unified
  const localizedSubmissions = getLocalizedSubmissions(language, submissions);

  // Compute stats on actual submissions list
  const totalQueries = submissions.length;
  const escalatedCount = submissions.filter((s) => s.status === "Escalated").length;
  const resolvedCount = totalQueries - escalatedCount;
  
  // Language stats count
  const teluguCount = submissions.filter((s) => s.language === "te").length;
  const hindiCount = submissions.filter((s) => s.language === "hi").length;
  const englishCount = submissions.filter((s) => s.language === "en").length;

  // Selected sub reference from localized list
  const selectedSub = localizedSubmissions.find(s => s.id === selectedSubId) || null;

  // Most common crop issues computation
  const cropCounts: Record<string, number> = {};
  localizedSubmissions.forEach((s) => {
    // Strip trailing brackets or details for clean bento card list
    const cropName = s.cropType.split(" (")[0] || s.cropType;
    cropCounts[cropName] = (cropCounts[cropName] || 0) + 1;
  });
  const topCrops = Object.entries(cropCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // Districts distribution
  const districtCounts: Record<string, number> = {};
  localizedSubmissions.forEach((s) => {
    districtCounts[s.district] = (districtCounts[s.district] || 0) + 1;
  });
  const topDistricts = Object.entries(districtCounts).sort((a, b) => b[1] - a[1]);

  const handleEscalate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEscalatingId(id);
    await onEscalateSubmission(id);
    setEscalatingId(null);
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
    <div className="space-y-8" id="admin-dashboard-root">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-stone-900 text-white p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse font-mono">
              {t.liveStatus}
            </span>
            <h2 className="text-xl font-bold tracking-tight">{t.adminTitle}</h2>
          </div>
          <p className="text-stone-400 text-xs mt-1">
            {t.adminSubtitle}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-xl text-xs transition duration-200 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-4.5 w-4.5 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? t.refreshingText : t.refreshStatsButton}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Queries */}
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-md flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              {t.kpiTotalQueries}
            </span>
            <span className="text-2xl font-bold text-stone-950">{totalQueries}</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
              {t.kpiActiveFarmers}
            </span>
          </div>
        </div>

        {/* Card 2: Escalations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-md flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-700">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              {t.kpiEscalatedRsk}
            </span>
            <span className="text-2xl font-bold text-stone-950">{escalatedCount}</span>
            <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">
              {totalQueries > 0 ? ((escalatedCount / totalQueries) * 100).toFixed(0) : 0}% {t.kpiReferralRate}
            </span>
          </div>
        </div>

        {/* Card 3: Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-md flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
              {t.kpiAiResolved}
            </span>
            <span className="text-2xl font-bold text-stone-950">{resolvedCount}</span>
            <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">
              {t.kpiInstantSms}
            </span>
          </div>
        </div>

        {/* Card 4: Languages */}
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-md flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl text-purple-700">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block truncate">
              {t.kpiLanguageRatio}
            </span>
            <div className="text-[10px] font-bold text-stone-950 mt-1 flex gap-1.5 flex-wrap">
              <span className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                TE: {teluguCount}
              </span>
              <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                HI: {hindiCount}
              </span>
              <span className="bg-stone-50 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">
                EN: {englishCount}
              </span>
            </div>
            <span className="text-[10px] text-purple-600 font-semibold block mt-1">
              {t.kpiDualLocalization}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column - Stats breakdown */}
        <div className="space-y-6 lg:col-span-1">
          {/* Geographical Alert Map */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100">
            <h3 className="text-sm font-bold text-stone-950 mb-4 flex items-center gap-2">
              <Landmark className="h-4.5 w-4.5 text-emerald-600" />
              {t.districtReportsHeader}
            </h3>
            <div className="space-y-4">
              {topDistricts.map(([district, count]) => {
                const percentage = totalQueries > 0 ? (count / totalQueries) * 100 : 0;
                return (
                  <div key={district} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-stone-800">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-600" />
                        {getLocalizedDistrictName(district)}
                      </span>
                      <span>{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {topDistricts.length === 0 && (
                <p className="text-xs text-stone-500 text-center py-4">{t.noSubmissionsYet}</p>
              )}
            </div>
          </div>

          {/* Top Plant Pathologies Diagnosed */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100">
            <h3 className="text-sm font-bold text-stone-950 mb-4 flex items-center gap-2">
              <BadgeInfo className="h-4.5 w-4.5 text-amber-600" />
              {t.topCropsHeader}
            </h3>
            <div className="space-y-4">
              {topCrops.map(([crop, count], idx) => (
                <div key={crop} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white font-bold text-xs rounded-full">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-stone-800">{crop}</span>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 font-mono">
                    {count}
                  </span>
                </div>
              ))}
              {topCrops.length === 0 && (
                <p className="text-xs text-stone-500 text-center py-4">{t.noSubmissionsYet}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Realtime Streams */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-stone-950 flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
              {t.submissionsStreamHeader}
            </h3>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              {t.liveUpdatesActiveBadge}
            </span>
          </div>

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            {localizedSubmissions.map((sub) => {
              const isSelected = selectedSubId === sub.id;
              const isLive = sub.id.startsWith("sub-17") || !sub.id.startsWith("sub-10");

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubId(isSelected ? null : sub.id)}
                  className={`bg-white p-5 rounded-2xl border transition duration-200 cursor-pointer hover:shadow-md relative ${
                    isSelected ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-stone-100"
                  }`}
                >
                  {/* Session Live Indicator */}
                  {isLive && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                      {t.liveDemoAdditionBadge}
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    {sub.imageUrl ? (
                      <img
                        src={sub.imageUrl}
                        alt="Crop pathology"
                        className="w-16 h-16 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-stone-50 border border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center text-stone-400 text-[10px] shrink-0">
                        <HelpCircle className="h-5 w-5 mb-1 text-stone-400" />
                        {t.audioTextBadge}
                      </div>
                    )}

                    {/* Metadata & Description */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap text-[11px] text-stone-500 font-medium">
                        <span className="font-bold text-stone-900">{sub.farmerName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="h-3 w-3 text-stone-400" />
                          {getLocalizedDistrictName(sub.district)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Calendar className="h-3 w-3 text-stone-400" />
                          {new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-stone-950 truncate">
                        {t.cropLabel}: <span className="text-emerald-800">{sub.cropType}</span>
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-1 italic">
                        "{sub.queryText}"
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-stone-900 font-bold bg-stone-100 px-2 py-0.5 rounded">
                          AI: {sub.diagnosis.substring(0, 45)}{sub.diagnosis.length > 45 ? "..." : ""}
                        </span>

                        <div className="flex items-center gap-2">
                          {sub.status === "Resolved" ? (
                            <button
                              onClick={(e) => handleEscalate(sub.id, e)}
                              disabled={escalatingId === sub.id}
                              className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-lg cursor-pointer"
                            >
                              <PhoneCall className="h-3 w-3" />
                              {escalatingId === sub.id ? t.escalatingText : t.escalateToExpertButton}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded-lg">
                              <AlertTriangle className="h-3 w-3" />
                              {t.escalatedToRskBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isSelected && selectedSub && (
                    <div className="mt-5 pt-5 border-t border-stone-100 space-y-4 text-xs leading-relaxed animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <div>
                          <p className="font-bold text-stone-950 mb-1">{t.causeLabelAdmin}</p>
                          <p className="text-stone-700">{selectedSub.cause}</p>
                          <p className="font-bold text-stone-950 mt-3 mb-1">{t.organicTreatmentLabelAdmin}</p>
                          <p className="text-emerald-800 font-medium">{selectedSub.remedyOrganic}</p>
                        </div>
                        <div>
                          <p className="font-bold text-stone-950 mb-1">{t.chemicalRemedyLabelAdmin}</p>
                          <p className="text-blue-900 font-medium">{selectedSub.remedyChemical}</p>
                          <p className="font-bold text-stone-950 mt-3 mb-1">{t.preventionLabelAdmin}</p>
                          <p className="text-stone-700">{selectedSub.prevention}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="font-bold text-stone-950">{t.simSmsSentLabelAdmin}</p>
                        <div className="bg-emerald-50 text-emerald-950 p-3 rounded-xl border border-emerald-100 font-mono text-[11px] leading-snug">
                          {selectedSub.smsText}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="font-bold text-stone-950">{t.audioSpeechLabelAdmin}</p>
                        <p className="text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 italic">
                          "{selectedSub.audioText}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {submissions.length === 0 && (
              <p className="text-xs text-stone-500 text-center py-8 bg-white rounded-2xl border border-stone-100 shadow-sm">
                No farmer requests received yet. Submit a query above to see it dynamically added to this real-time stream!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
