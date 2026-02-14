import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { CheckCircle } from 'lucide-react';

export default function DepositPlanPage() {
  const { goBack } = useApp();
  const [selected, setSelected] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const plans = [
    {
      name: '稳享固收30天',
      rate: '2.85%',
      risk: 'R2',
      period: '30天',
      minBuy: '1万起',
      extraEarn: '¥1,583',
      extraNote: '比活期多赚',
      match: '与您风险偏好匹配，短期灵活',
      tags: ['推荐', '同类前30%'],
    },
    {
      name: '稳享增强90天',
      rate: '3.15%',
      risk: 'R2',
      period: '90天',
      minBuy: '1万起',
      extraEarn: '¥5,260',
      extraNote: '比活期多赚(90天)',
      match: '收益更高，适合中期闲置资金',
      tags: ['高收益'],
    },
    {
      name: '天天盈1号(货币基金)',
      rate: '2.15%',
      risk: 'R1',
      period: '灵活',
      minBuy: '1元起',
      extraEarn: '¥1,195',
      extraNote: '比活期多赚(年)',
      match: '随时可取，风险最低',
      tags: ['灵活'],
    },
  ];

  if (showConfirm && selected !== null) {
    return (
      <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
        <StatusBar />
        <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0">
          <button className="text-[22px] text-gray-700" onClick={() => setShowConfirm(false)}>‹</button>
          <span className="flex-1 text-center text-[17px] font-semibold">确认购买</span>
          <span className="w-6" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="animate-slide-up flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mb-4">
              <CheckCircle size={40} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">预约成功</h2>
            <p className="text-gray-500 text-sm text-center mb-4">定期存款到期后将自动购买</p>
            <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">产品</span>
                <span className="font-medium text-gray-900">{plans[selected].name}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">金额</span>
                <span className="font-bold text-[#C41230]">¥200,000.00</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">预期年化</span>
                <span className="font-semibold text-[#C41230]">{plans[selected].rate}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">生效日期</span>
                <span className="font-medium text-gray-900">2026-02-15 (到期自动转入)</span>
              </div>
            </div>
            <div className="w-full bg-[#F0F5FF] rounded-xl p-3 mb-6">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#2E6BED] ai-pulse" />
                <span className="text-[10px] text-[#2E6BED] font-semibold">AI 提示</span>
              </div>
              <p className="text-[11.5px] text-[#3A5BA0] leading-relaxed">
                已为您预约续接，到期日将自动执行。如需修改，可在「自动规则」中管理。
              </p>
            </div>
            <button onClick={goBack} className="w-full py-3 rounded-[22px] bg-[#C41230] text-white text-[15px] font-medium active:opacity-85 active:scale-[0.98] transition-all shadow-md">返回</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      <StatusBar />
      <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0 bg-white">
        <button className="text-[22px] text-gray-700 active:opacity-60 transition-opacity" onClick={goBack}>‹</button>
        <span className="flex-1 text-center text-[17px] font-semibold">存款到期续接方案</span>
        <span className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* AI分析提示 */}
        <div className="mx-3 mt-3 mb-3 bg-white rounded-xl p-4 shadow-sm border-l-[3px] border-[#2E6BED] animate-slide-up">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-[7px] h-[7px] rounded-full bg-[#2E6BED] ai-pulse" />
            <span className="text-[11px] text-[#2E6BED] font-semibold">AI 分析</span>
          </div>
          <div className="text-[12.5px] text-gray-800 leading-relaxed">
            您的<b className="text-[#2E6BED]">定期存款 ¥200,000</b>将于<b className="text-[#2E6BED]">2月15日</b>到期。如转为活期（年化约0.25%），年收益仅约 ¥500。以下方案可帮您多赚<b className="text-[#C41230]">¥1,195~¥5,260</b>。
          </div>
        </div>

        {/* 对比算账 */}
        <div className="mx-3 mb-3 bg-white rounded-xl p-4 shadow-sm">
          <h4 className="text-[14px] font-bold mb-3 flex items-center gap-1.5">📊 收益对比（以20万计算）</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-500 w-14 flex-shrink-0">活期</span>
              <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gray-300 flex items-center justify-end pr-2 text-[9px] text-white font-semibold animate-progress-fill" style={{ width: '10%' }}>0.25%</div>
              </div>
              <span className="text-[11px] text-gray-500 w-16 text-right font-medium">¥500/年</span>
            </div>
            {plans.map((plan, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500 w-14 flex-shrink-0 truncate">{plan.period}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2 text-[9px] text-white font-semibold animate-progress-fill"
                    style={{ width: `${parseFloat(plan.rate) / 3.5 * 100}%`, background: i === 0 ? '#2E6BED' : i === 1 ? '#C41230' : '#10B981' }}>
                    {plan.rate}
                  </div>
                </div>
                <span className="text-[11px] font-semibold w-16 text-right" style={{ color: i === 0 ? '#2E6BED' : i === 1 ? '#C41230' : '#10B981' }}>
                  +{plan.extraEarn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 产品方案列表 */}
        <div className="stagger-children">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-white mx-3 mb-2.5 rounded-xl p-4 shadow-sm transition-all duration-200 ${selected === i ? 'ring-2 ring-[#2E6BED] shadow-md' : 'active:scale-[0.98]'}`}
              onClick={() => setSelected(i)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[22px] font-bold text-[#C41230]">{plan.rate}</div>
                  <div className="text-[10.5px] text-gray-400">预期年化收益率</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-medium leading-snug max-w-[180px] text-gray-900">{plan.name}</div>
                  <div className="flex gap-1 mt-1 justify-end">
                    {plan.tags.map((tag, j) => (
                      <span key={j} className={`text-[9px] px-1.5 py-0.5 rounded ${j === 0 ? 'bg-[#FFF1F0] text-[#C41230]' : 'bg-gray-100 text-gray-500'}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 mb-2">
                <span className="text-[10px] text-gray-500 bg-[#F5F5F5] px-1.5 py-0.5 rounded">{plan.period}</span>
                <span className="text-[10px] text-gray-500 bg-[#F5F5F5] px-1.5 py-0.5 rounded">{plan.minBuy}</span>
                <span className="text-[10px] text-gray-500 bg-[#F5F5F5] px-1.5 py-0.5 rounded">{plan.risk}</span>
              </div>
              <div className="bg-[#F0F5FF] rounded-lg p-2.5 flex gap-2 items-start">
                <div className="w-4 h-4 bg-[#2E6BED] rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 mt-0.5 ai-pulse">✦</div>
                <div className="text-[11.5px] text-[#3A5BA0] leading-relaxed">
                  {plan.match}。{plan.extraNote}约<b className="font-semibold">{plan.extraEarn}</b>。
                </div>
              </div>
              {selected === i && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
                  className="w-full mt-3 py-2.5 rounded-[22px] bg-[#C41230] text-white text-[14px] font-medium active:opacity-85 active:scale-[0.98] transition-all shadow-md animate-slide-up"
                >
                  预约续接 ¥200,000
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="h-5" />
      </div>
    </div>
  );
}
