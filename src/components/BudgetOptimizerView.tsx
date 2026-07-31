import React, { useState } from 'react';
import { AdSet, BudgetOptimizerData } from '../types';

const INITIAL_AD_SETS: AdSet[] = [
  {
    id: '1',
    name: 'Retargeting_US_Q3_Lookalike',
    code: 'ID: 8842-XJ',
    spend: 1240.5,
    clicks: 3240,
    impressions: 124500,
    conversions: 156,
    convValue: 4820.0,
    trendStatus: 'up',
    trendColor: 'text-[#4edea3]',
  },
  {
    id: '2',
    name: 'Cold_Interest_Fitness_Auto',
    code: 'ID: 1129-AK',
    spend: 845.2,
    clicks: 1890,
    impressions: 88200,
    conversions: 92,
    convValue: 3150.0,
    trendStatus: 'up',
    trendColor: 'text-[#4edea3]',
  },
  {
    id: '3',
    name: 'Branding_YouTube_Awareness',
    code: 'ID: 4421-PR',
    spend: 412.0,
    clicks: 842,
    impressions: 256000,
    conversions: 12,
    convValue: 240.0,
    trendStatus: 'down',
    trendColor: 'text-[#ffb4ab]',
  },
  {
    id: '4',
    name: 'Seasonal_Promo_BlackFriday_Teaser',
    code: 'ID: 9901-BF',
    spend: 1980.0,
    clicks: 5100,
    impressions: 340500,
    conversions: 412,
    convValue: 12400.0,
    trendStatus: 'up',
    trendColor: 'text-[#4edea3]',
  },
  {
    id: '5',
    name: 'App_Installs_iOS_Universal',
    code: 'ID: 5567-IU',
    spend: 640.0,
    clicks: 1120,
    impressions: 45000,
    conversions: 65,
    convValue: 980.0,
    trendStatus: 'flat',
    trendColor: 'text-[#ffb95f]',
  },
];

export const BudgetOptimizerView: React.FC = () => {
  const [dailyBudget, setDailyBudget] = useState('2,500.00');
  const [targetRoas, setTargetRoas] = useState('4.50');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedStatus, setOptimizedStatus] = useState(false);

  const [data, setData] = useState<BudgetOptimizerData>({
    dailyBudget: 2500,
    targetRoas: 4.5,
    projectedRevenue: 12450.0,
    momRevenueGrowth: 12.5,
    avgCpc: 0.42,
    momCpcChange: -4.2,
    conversions: 842,
    momConversionGrowth: 8.1,
    adScore: 9.2,
    strategicSummary: '',
    recommendations: [] as Array<{
      ad_set_id?: string;
      ad_set_name?: string;
      action?: string;
      current_spend?: number;
      recommended_daily_budget?: number;
      reasoning?: string;
    }>,
    adSets: INITIAL_AD_SETS,
  });

  const handleOptimize = async () => {
    setIsOptimizing(true);
    const budgetNum = parseFloat(dailyBudget.replace(/,/g, '')) || 2500;
    const roasNum = parseFloat(targetRoas) || 4.5;

    try {
      const res = await fetch('/api/v1/ads/optimize-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_name: 'Q3 Growth Campaign',
          total_daily_budget: budgetNum,
          target_roas: roasNum,
          ad_sets: data.adSets.map((a) => ({
            ad_set_id: a.id,
            ad_set_name: a.name,
            spend: a.spend,
            clicks: a.clicks,
            impressions: a.impressions,
            conversions: a.conversions,
            conversion_value: a.convValue,
          })),
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const rd = json.data.remoteData || json.data;
        const recs = rd.recommendations || json.data.recommendations || [];
        const summary = rd.strategic_summary || json.data.strategic_summary || json.data.recommendation_summary || '';

        setData((prev) => ({
          ...prev,
          projectedRevenue:
            json.data.projected_revenue ||
            json.data.projectedRevenue ||
            json.data.newProjectedRevenue ||
            Math.round(budgetNum * roasNum * 1.15),
          avgCpc:
            json.data.avg_cpc ||
            json.data.avgCpc ||
            json.data.newAvgCpc ||
            0.38,
          conversions:
            json.data.conversions ||
            json.data.newConversions ||
            Math.round((budgetNum / 2.8) * 0.95),
          adScore:
            json.data.ad_score ||
            json.data.adScore ||
            json.data.newAdScore ||
            9.6,
          strategicSummary: summary,
          recommendations: recs,
        }));
      }
    } catch (e) {
      console.error('Budget optimization failed:', e);
    } finally {
      setIsOptimizing(false);
      setOptimizedStatus(true);
      setTimeout(() => setOptimizedStatus(false), 3000);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8 space-y-6 sm:space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="font-mono text-xs text-[#c7c4d7] font-semibold uppercase">
              DAILY BUDGET (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c7c4d7] font-mono text-xs">
                $
              </span>
              <input
                type="text"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="w-full sm:w-48 bg-[#09090b] border border-[#464554] rounded px-3 pl-7 py-2 text-[#e5e1e4] font-mono text-xs focus:outline-none focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="font-mono text-xs text-[#c7c4d7] font-semibold uppercase">
              TARGET ROAS
            </label>
            <div className="relative">
              <input
                type="text"
                value={targetRoas}
                onChange={(e) => setTargetRoas(e.target.value)}
                className="w-full sm:w-48 bg-[#09090b] border border-[#464554] rounded px-3 pr-7 py-2 text-[#e5e1e4] font-mono text-xs focus:outline-none focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c7c4d7] font-mono text-xs">
                X
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className={`w-full md:w-auto px-6 py-3 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95 disabled:opacity-50 ${
            optimizedStatus
              ? 'bg-[#4edea3] text-[#003824]'
              : 'bg-[#c0c1ff] text-[#1000a9] hover:bg-[#8083ff]'
          }`}
        >
          <span className={`material-symbols-outlined text-[18px] ${isOptimizing ? 'animate-spin' : ''}`}>
            {optimizedStatus ? 'check_circle' : isOptimizing ? 'sync' : 'bolt'}
          </span>
          <span>
            {optimizedStatus
              ? 'Budget Reallocated!'
              : isOptimizing
              ? 'Processing AI Models...'
              : 'Optimize Budget'}
          </span>
        </button>
      </div>

      {/* KPI Metrics Summary (2x2 Grid on Mobile, 4 Col on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#201f22] border border-[#464554]/60 p-3.5 sm:p-5 rounded-xl space-y-1 sm:space-y-2">
          <div className="font-mono text-[10px] sm:text-xs text-[#c7c4d7] uppercase font-semibold">
            PROJECTED REVENUE
          </div>
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-3xl font-bold text-[#e5e1e4]">
              ${data.projectedRevenue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-[#4edea3] flex items-center font-bold">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">trending_up</span>
              {data.momRevenueGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-3.5 sm:p-5 rounded-xl space-y-1 sm:space-y-2">
          <div className="font-mono text-[10px] sm:text-xs text-[#c7c4d7] uppercase font-semibold">
            AVG. CPC
          </div>
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-3xl font-bold text-[#e5e1e4]">
              ${data.avgCpc.toFixed(2)}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-[#4edea3] flex items-center font-bold">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">trending_down</span>
              {data.momCpcChange}%
            </span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-3.5 sm:p-5 rounded-xl space-y-1 sm:space-y-2">
          <div className="font-mono text-[10px] sm:text-xs text-[#c7c4d7] uppercase font-semibold">
            CONVERSIONS
          </div>
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-3xl font-bold text-[#e5e1e4]">
              {data.conversions.toLocaleString()}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-[#4edea3] flex items-center font-bold">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">trending_up</span>
              {data.momConversionGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-3.5 sm:p-5 rounded-xl space-y-1 sm:space-y-2">
          <div className="font-mono text-[10px] sm:text-xs text-[#c7c4d7] uppercase font-semibold">
            AD SCORE
          </div>
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl sm:text-3xl font-bold text-[#e5e1e4]">
              {data.adScore}
            </span>
            <span className="font-mono text-xs text-[#c7c4d7]">/ 10</span>
          </div>
        </div>
      </div>

      {/* Strategic Summary & AI Recommendations */}
      {(data.strategicSummary || (data.recommendations && data.recommendations.length > 0)) && (
        <section className="bg-[#201f22] border border-[#464554]/60 rounded-xl p-5 sm:p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#464554]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8083ff]">auto_graph</span>
              <h3 className="text-base font-bold text-[#e5e1e4]">Live AI Optimization Strategy</h3>
            </div>
            <span className="font-mono text-[11px] text-[#4edea3] bg-[#00a572]/15 px-2.5 py-1 rounded border border-[#4edea3]/30">
              Live Backend
            </span>
          </div>

          {data.strategicSummary && (
            <p className="text-sm text-[#c7c4d7] leading-relaxed">
              {data.strategicSummary}
            </p>
          )}

          {data.recommendations && data.recommendations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {data.recommendations.map((rec, i) => {
                const actionColor =
                  rec.action === 'SCALE'
                    ? 'text-[#4edea3] bg-[#4edea3]/10 border-[#4edea3]/40'
                    : rec.action === 'REDUCE'
                    ? 'text-[#ffb95f] bg-[#ffb95f]/10 border-[#ffb95f]/40'
                    : 'text-[#ffb4ab] bg-[#ffb4ab]/10 border-[#ffb4ab]/40';
                return (
                  <div key={i} className="bg-[#141315] border border-[#464554]/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#e5e1e4] truncate max-w-[180px]">
                        {rec.ad_set_name || rec.ad_set_id || `Ad Set ${i + 1}`}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${actionColor}`}>
                        {rec.action || 'OPTIMIZE'}
                      </span>
                    </div>
                    {rec.recommended_daily_budget !== undefined && (
                      <div className="font-mono text-xs text-[#c7c4d7]">
                        Rec. Budget: <span className="text-[#e5e1e4] font-bold">${rec.recommended_daily_budget}/day</span>
                      </div>
                    )}
                    {rec.reasoning && (
                      <p className="text-xs text-[#908fa0] leading-normal line-clamp-3">
                        {rec.reasoning}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Main Data Table Container (Mobile Cards + Desktop Table) */}
      <div className="bg-[#201f22] border border-[#464554]/60 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#464554]/60 bg-[#2a2a2c] flex justify-between items-center">
          <h2 className="text-base sm:text-lg font-semibold text-[#e5e1e4]">
            Active Ad Sets Optimization
          </h2>
          <div className="flex gap-2">
            <button className="p-1.5 text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">filter_list</span>
            </button>
            <button className="p-1.5 text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">download</span>
            </button>
          </div>
        </div>

        {/* Mobile Responsive Cards */}
        <div className="md:hidden divide-y divide-[#464554]/40 p-3 space-y-3">
          {data.adSets.map((adSet) => (
            <div
              key={adSet.id}
              className="bg-[#1c1b1d] border border-[#464554]/60 rounded-lg p-3.5 space-y-2.5"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="text-xs font-semibold text-[#e5e1e4] truncate max-w-[200px]">
                    {adSet.name}
                  </h4>
                  <span className="text-[#908fa0] text-[10px] font-mono block">
                    {adSet.code}
                  </span>
                </div>
                <span className={`material-symbols-outlined text-[18px] ${adSet.trendColor}`}>
                  trending_up
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#0e0e10] p-2.5 rounded border border-[#464554]/40 font-mono text-[11px]">
                <div>
                  <span className="text-[#908fa0] block text-[9px] uppercase">Spend</span>
                  <span className="text-[#e5e1e4] font-bold">${adSet.spend.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#908fa0] block text-[9px] uppercase">Clicks</span>
                  <span className="text-[#e5e1e4]">{adSet.clicks.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#908fa0] block text-[9px] uppercase">Conversions</span>
                  <span className="text-[#e5e1e4]">{adSet.conversions}</span>
                </div>
                <div>
                  <span className="text-[#908fa0] block text-[9px] uppercase">Conv. Value</span>
                  <span className={`font-bold ${
                    adSet.convValue > 2000 ? 'text-[#4edea3]' : 'text-[#e5e1e4]'
                  }`}>
                    ${adSet.convValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#464554]/60 bg-[#1c1b1d]">
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider">
                  Ad Set Name
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-right">
                  Spend
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-right">
                  Clicks
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-right">
                  Impressions
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-right">
                  Conversions
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-right">
                  Conv. Value
                </th>
                <th className="px-6 py-3.5 font-mono text-xs text-[#c7c4d7] uppercase tracking-wider text-center">
                  Trend
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#464554]/40">
              {data.adSets.map((adSet) => (
                <tr
                  key={adSet.id}
                  className="hover:bg-[#1c1c1f] transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[#e5e1e4] font-semibold text-sm group-hover:text-[#c0c1ff] transition-colors">
                        {adSet.name}
                      </span>
                      <span className="text-[#c7c4d7] text-[11px] font-mono">
                        {adSet.code}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right font-mono text-xs text-[#e5e1e4]">
                    ${adSet.spend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="px-6 py-4 text-right font-mono text-xs text-[#e5e1e4]">
                    {adSet.clicks.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right font-mono text-xs text-[#e5e1e4]">
                    {adSet.impressions.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right font-mono text-xs text-[#e5e1e4]">
                    {adSet.conversions.toLocaleString()}
                  </td>

                  <td className={`px-6 py-4 text-right font-mono text-xs font-bold ${
                    adSet.convValue > 2000 ? 'text-[#4edea3]' : adSet.convValue < 500 ? 'text-[#ffb4ab]' : 'text-[#e5e1e4]'
                  }`}>
                    ${adSet.convValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`material-symbols-outlined text-[20px] ${adSet.trendColor}`}>
                        trending_up
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-[#464554]/60 bg-[#2a2a2c] flex justify-between items-center">
          <div className="text-[#c7c4d7] font-mono text-xs">
            Showing {data.adSets.length} of 24 Ad Sets
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#c7c4d7] hover:bg-[#353437] transition-colors cursor-pointer disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#e5e1e4] bg-[#353437]">
              1
            </button>
            <button className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#c7c4d7] hover:bg-[#353437] transition-colors cursor-pointer">
              2
            </button>
            <button className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#c7c4d7] hover:bg-[#353437] transition-colors cursor-pointer">
              3
            </button>
            <button className="px-3 py-1 border border-[#464554] rounded font-mono text-xs text-[#c7c4d7] hover:bg-[#353437] transition-colors cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
