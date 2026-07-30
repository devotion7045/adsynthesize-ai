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
    adSets: INITIAL_AD_SETS,
  });

  const handleOptimize = async () => {
    setIsOptimizing(true);
    const budgetNum = parseFloat(dailyBudget.replace(/,/g, '')) || 2500;
    const roasNum = parseFloat(targetRoas) || 4.5;

    try {
      const res = await fetch('/api/optimize-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dailyBudget: budgetNum,
          targetRoas: roasNum,
          adSets: data.adSets,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData((prev) => ({
          ...prev,
          projectedRevenue: json.data.newProjectedRevenue || Math.round(budgetNum * roasNum * 1.15),
          avgCpc: json.data.newAvgCpc || 0.38,
          conversions: json.data.newConversions || Math.round((budgetNum / 2.8) * 0.95),
          adScore: json.data.newAdScore || 9.6,
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-2">
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

          <div className="flex flex-col gap-2">
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

      {/* KPI Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#201f22] border border-[#464554]/60 p-5 rounded-xl space-y-2">
          <div className="font-mono text-xs text-[#c7c4d7] uppercase font-semibold">
            PROJECTED REVENUE
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#e5e1e4]">
              ${data.projectedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="font-mono text-xs text-[#4edea3] flex items-center font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              {data.momRevenueGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-5 rounded-xl space-y-2">
          <div className="font-mono text-xs text-[#c7c4d7] uppercase font-semibold">
            AVG. CPC
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#e5e1e4]">
              ${data.avgCpc.toFixed(2)}
            </span>
            <span className="font-mono text-xs text-[#4edea3] flex items-center font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              {data.momCpcChange}%
            </span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-5 rounded-xl space-y-2">
          <div className="font-mono text-xs text-[#c7c4d7] uppercase font-semibold">
            CONVERSIONS
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#e5e1e4]">
              {data.conversions.toLocaleString()}
            </span>
            <span className="font-mono text-xs text-[#4edea3] flex items-center font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              {data.momConversionGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-[#201f22] border border-[#464554]/60 p-5 rounded-xl space-y-2">
          <div className="font-mono text-xs text-[#c7c4d7] uppercase font-semibold">
            AD SCORE
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#e5e1e4]">
              {data.adScore}
            </span>
            <span className="font-mono text-xs text-[#c7c4d7]">/ 10</span>
          </div>
        </div>
      </div>

      {/* Main Data Table Container */}
      <div className="bg-[#201f22] border border-[#464554]/60 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#464554]/60 bg-[#2a2a2c] flex justify-between items-center">
          <h2 className="text-base sm:text-lg font-semibold text-[#e5e1e4]">
            Active Ad Sets Optimization
          </h2>
          <div className="flex gap-2">
            <button className="p-1.5 text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
            <button className="p-1.5 text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                        redeem
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
