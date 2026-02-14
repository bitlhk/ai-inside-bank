import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { useState } from 'react';

export default function WealthPage() {
  const { goTab, goPage } = useApp();
  const [pill, setPill] = useState('灵活取用');

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      {/* 顶部渐变区域 */}
      <div className="flex-shrink-0" style={{ background: 'linear-gradient(180deg, #B8452A 0%, #C85535 40%, #E8D5C4 100%)', padding: '0 0 20px', color: 'white' }}>
        <StatusBar light />
        <div className="flex items-center px-4 pb-3.5 gap-2.5">
          <button className="text-[22px] text-white active:opacity-60 transition-opacity" onClick={() => goTab('home')}>‹</button>
          <span className="flex-1 text-center text-[17px] font-semibold">财富</span>
          <span className="text-lg">🎧</span>
          <span className="text-lg">🔍</span>
        </div>
        <div className="mx-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
          <div className="text-[12px] opacity-80">我的投资资产 (元) 📈</div>
          <div className="flex justify-between items-center">
            <div className="text-[26px] font-bold mt-1 animate-count-up">152,380.56</div>
            <div className="text-[12px] bg-white/20 px-2.5 py-1 rounded-lg">我的关注 ›</div>
          </div>
          <div className="text-[11.5px] opacity-85 mt-0.5">最新收益 <span className="text-[#FFD700] font-semibold">+38.72</span></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* AI洞察 */}
        <div className="mx-3 -mt-2.5 mb-2.5 bg-white rounded-xl p-3.5 shadow-md border-l-[3px] border-[#2E6BED] animate-slide-up">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-[7px] h-[7px] rounded-full bg-[#2E6BED] ai-pulse" />
            <span className="text-[10px] text-[#2E6BED] bg-[#EBF1FF] px-1.5 py-0.5 rounded font-semibold">AI 洞察</span>
          </div>
          <div className="text-[12.5px] text-gray-800 leading-relaxed">
            您当前持仓 <em className="not-italic text-[#2E6BED] font-semibold">82%为固收类</em>，整体偏保守。活期有 <em className="not-italic text-[#2E6BED] font-semibold">4.6万元</em> 闲置超45天，每月损失约 <em className="not-italic text-[#2E6BED] font-semibold">¥38</em>。<em className="not-italic text-[#2E6BED] font-semibold">定期存款20万</em>将于明天到期。
          </div>
          <div className="flex gap-2 mt-2.5">
            <button onClick={() => goPage('deposit-plan')} className="text-[12px] px-4 py-1.5 rounded-2xl bg-[#2E6BED] text-white border-none active:bg-[#2558C4] transition-colors shadow-sm">看看适合的产品</button>
            <button className="text-[12px] px-4 py-1.5 rounded-2xl border border-gray-200 bg-transparent text-gray-500 active:bg-gray-50 transition-colors">暂不考虑</button>
          </div>
        </div>

        {/* 功能网格 */}
        <div className="bg-white mx-3 mb-2.5 rounded-2xl p-3 shadow-sm mt-2.5">
          <div className="grid grid-cols-5 gap-y-2.5">
            {[
              { icon: '✅', label: '风险评测' }, { icon: '🏦', label: '存款' },
              { icon: '💰', label: '理财' }, { icon: '📊', label: '基金' },
              { icon: '🥇', label: '贵金属' }, { icon: '🛡', label: '保险' },
              { icon: '💱', label: '结售汇' }, { icon: '🌐', label: '外币兑换' },
              { icon: '📈', label: '证券' }, { icon: '🏛', label: '储蓄国债' },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-1 active:opacity-70 active:scale-95 transition-all duration-150">
                <span className="text-xl w-8 h-8 flex items-center justify-center">{item.icon}</span>
                <span className="text-[10.5px] text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 持仓 */}
        <div className="flex justify-between items-center px-4 pt-3.5 pb-2">
          <span className="text-base font-bold">我的持仓</span>
        </div>

        {/* 持仓列表 */}
        <div className="stagger-children">
          {[
            { name: '稳享固收30天', gain: '+¥286.40', tags: ['持有 50,000元', 'R2'], ai: '将于3月1日到期，届时可续接或转出' },
            { name: '天天盈1号 (货币基金)', gain: '+¥12.35', tags: ['持有 32,380.56元', 'R1'], ai: '灵活存取，七日年化2.15%' },
            { name: '安盈保障计划', gain: '保障中', gainColor: '#10B981', tags: ['年缴 12,000元', '保额50万'], ai: '下次缴费 2026年5月，保障至2046年' },
          ].map((item, i) => (
            <div key={i} className="bg-white mx-3 mb-2 rounded-xl p-3.5 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-gray-900">{item.name}</span>
                <span className="text-[17px] font-bold" style={{ color: item.gainColor || '#C41230' }}>{item.gain}</span>
              </div>
              <div className="flex gap-1.5 mt-1.5">
                {item.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] text-gray-400 bg-[#F5F5F5] px-1.5 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <div className="mt-2 pt-1.5 border-t border-gray-100 text-[11px] text-[#3A5BA0] flex items-center gap-1">
                <span className="ai-pulse">✦</span> {item.ai}
              </div>
            </div>
          ))}
        </div>

        {/* 推荐产品 */}
        <div className="flex justify-between items-center px-4 pt-3.5 pb-2">
          <span className="text-base font-bold">推荐产品</span>
        </div>
        <div className="flex gap-2 px-3 pb-2.5 overflow-x-auto no-scrollbar">
          {['灵活取用', '稳健回报', '进取投资'].map((label, i) => (
            <button key={i} onClick={() => setPill(label)} className={`text-[12px] px-3.5 py-1.5 rounded-2xl whitespace-nowrap flex-shrink-0 border transition-all duration-200 ${pill === label ? 'bg-[#E8394A] text-white border-[#E8394A]' : 'bg-white text-gray-500 border-gray-200'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* 推荐产品卡片 */}
        <div className="bg-white mx-3 mb-2.5 rounded-xl p-3.5 shadow-sm animate-scale-in">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[24px] font-bold text-[#C41230]">2.47<small className="text-[11px] font-normal">%</small></div>
              <div className="text-[10.5px] text-gray-400">成立以来年化</div>
            </div>
            <div className="text-[13px] font-medium max-w-[190px] text-right leading-snug text-gray-900">核心优选ESG最短持有60天</div>
          </div>
          <div className="flex gap-1.5 mt-1.5 mb-2.5">
            <span className="text-[10px] text-gray-500 bg-[#F5F5F5] px-1.5 py-0.5 rounded">1元起购</span>
            <span className="text-[10px] text-gray-500 bg-[#F5F5F5] px-1.5 py-0.5 rounded">R2</span>
          </div>
          <div className="bg-[#F0F5FF] rounded-lg p-2.5 mb-2.5 flex gap-2 items-start">
            <div className="w-4 h-4 bg-[#2E6BED] rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 mt-0.5 ai-pulse">✦</div>
            <div className="text-[11.5px] text-[#3A5BA0] leading-relaxed">
              风险R2与您<b className="font-semibold">匹配</b>。60天持有期适合闲置4.6万。同类近半年收益<b className="font-semibold">前30%</b>。
            </div>
          </div>
          <button className="w-full bg-[#C41230] text-white border-none py-2.5 rounded-[22px] text-[14.5px] font-medium active:opacity-85 active:scale-[0.98] transition-all shadow-md">立即购买</button>
        </div>

        <div className="h-5" />
      </div>
    </div>
  );
}
