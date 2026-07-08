import React, { useState } from "react";
import { Sprout, Droplets, CloudRain, ShieldCheck, MapPin, Search } from "lucide-react";
import { translations, districtDatabaseTranslations, Language } from "../translations";

interface CropSuggesterProps {
  language: Language;
}

export default function CropSuggester({ language }: CropSuggesterProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("Guntur");

  // Get translated UI text
  const t = translations[language];

  // Get translated district data
  const districtDb = districtDatabaseTranslations[language] || districtDatabaseTranslations.en;
  const data = districtDb[selectedDistrict] || districtDb.Guntur;

  // Localized district names helper
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
    <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden" id="crop-suggester-panel">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/30 p-2.5 rounded-2xl backdrop-blur-md">
            <Sprout className="h-6 w-6 text-emerald-100 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">{t.cropsPanelTitle}</h2>
            <p className="text-emerald-100 text-xs mt-0.5 font-sans">
              {t.cropsPanelSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* District Selector & Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-emerald-900 mb-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600" />
              {t.selectDistrictCrops}
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-emerald-50 border-2 border-emerald-100 text-emerald-950 font-medium py-3 px-4 pr-10 rounded-2xl focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer text-sm"
              >
                {Object.keys(districtDb).map((dist) => (
                  <option key={dist} value={dist}>
                    {getLocalizedDistrictName(dist)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-700">
                <Search className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-5 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                {t.agriPolicyBadge}
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {t.agriPolicyText}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Soil Health */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  {t.soilHealthLabel}
                </span>
                <p className="text-sm font-semibold text-stone-900 leading-snug">{data.soilType}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200/60">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                  {data.soilHealth}
                </span>
              </div>
            </div>

            {/* Groundwater Table */}
            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  {t.groundwaterLabel}
                </span>
                <p className="text-sm font-semibold text-blue-900 leading-snug flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500 shrink-0" />
                  {data.groundwaterDepth}
                </p>
              </div>
              <div className="mt-3 text-[11px] text-blue-800">
                {t.groundwaterFooter}
              </div>
            </div>

            {/* Average Rainfall */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  {t.rainfallLabel}
                </span>
                <p className="text-sm font-semibold text-amber-900 leading-snug flex items-center gap-1">
                  <CloudRain className="h-4 w-4 text-amber-600 shrink-0" />
                  {data.rainfall}
                </p>
              </div>
              <div className="mt-3 text-[11px] text-amber-800">
                {t.rainfallFooter}
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Crops Table */}
        <div>
          <h3 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            {t.highYieldCropsHeader}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-100 text-xs text-emerald-800 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">{t.tableCropHeader}</th>
                  <th className="pb-3 font-semibold">{t.tableVarietyHeader}</th>
                  <th className="pb-3 font-semibold">{t.tableSowingHeader}</th>
                  <th className="pb-3 font-semibold">{t.tableYieldHeader}</th>
                  <th className="pb-3 font-semibold">{t.tableSubsidyHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50/50">
                {data.recommendations.map((rec, i) => (
                  <tr key={i} className="hover:bg-emerald-50/20 text-xs text-emerald-950">
                    <td className="py-4 font-bold text-emerald-900">{rec.crop}</td>
                    <td className="py-4 font-mono text-stone-700">{rec.variety}</td>
                    <td className="py-4">{rec.sowingPeriod}</td>
                    <td className="py-4 text-emerald-800 font-medium">{rec.expectedYield}</td>
                    <td className="py-4">
                      <span className="inline-block bg-emerald-50 border border-emerald-200/60 text-emerald-800 px-2.5 py-1 rounded-full font-medium">
                        {rec.subsidy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
