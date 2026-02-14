import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { Search, Headphones, MessageSquare, Plus } from 'lucide-react';

// AI建议卡片组件
function AICard({ type, children, onClick, onClose, delay = 0 }: {
  type: 'blue' | 'amber' | 'green';
  children: React.ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  delay?: number;
}) {
  const styles = {
    blue: { bg: 'linear-gradient(135deg, #EFF4FF 0%, #F3EFFF 100%)', border: 'rgba(46,107,237,0.12)', iconBg: 'linear-gradient(135deg, #2E6BED, #5B8DEF)', tagColor: '#2E6BED', tagBg: 'rgba(46,107,237,0.1)' },
    amber: { bg: 'linear-gradient(135deg, #FFFBEB 0%, #FFF8E0 100%)', border: 'rgba(245,158,11,0.15)', iconBg: 'linear-gradient(135deg, #F59E0B, #FBBF24)', tagColor: '#D97706', tagBg: '#FFFBEB' },
    green: { bg: 'linear-gradient(135deg, #ECFDF5 0%, #F0FFF8 100%)', border: 'rgba(16,185,129,0.15)', iconBg: 'linear-gradient(135deg, #10B981, #34D399)', tagColor: '#059669', tagBg: '#ECFDF5' },
  };
  const s = styles[type];

  return (
    <div
      className="mx-3 mb-2.5 rounded-xl p-3.5 flex items-start gap-2.5 active:scale-[0.98] active:opacity-90 transition-all duration-200"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        cursor: onClick ? 'pointer' : 'default',
        animationDelay: `${delay}ms`,
        animation: `slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
      }}
      onClick={onClick}
    >
      <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center text-white text-[13px] flex-shrink-0 ai-glow" style={{ background: s.iconBg }}>✦</div>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button className="text-gray-400 text-base flex-shrink-0 hover:text-gray-600 transition-colors" onClick={(e) => { e.stopPropagation(); onClose(); }}>×</button>
      )}
    </div>
  );
}

function AITag({ color, bg, children }: { color: string; bg: string; children: React.ReactNode }) {
  return <span className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded inline-block mb-1" style={{ color, background: bg }}>{children}</span>;
}

// 快捷功能格子
function QuickGrid({ items, cols = 4 }: { items: { icon: string; label: string; onClick?: () => void }[]; cols?: number }) {
  return (
    <div className="grid gap-y-1.5 gap-x-0" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {items.map((item, i) => (
        <button key={i} className="flex flex-col items-center gap-1.5 py-1.5 active:opacity-70 active:scale-95 transition-all duration-150" onClick={item.onClick}>
          <div className="text-xl w-8 h-8 flex items-center justify-center">{item.icon}</div>
          <span className="text-[10.5px] text-gray-600">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { goTab, goPage } = useApp();
  const [showDeposit, setShowDeposit] = useState(true);
  const [showCC, setShowCC] = useState(true);
  const [showIdle, setShowIdle] = useState(true);
  const [activeTab, setActiveTab] = useState('常用');

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      <StatusBar />
      {/* 搜索栏 */}
      <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0">
        <span className="text-[13px] text-gray-500">退出</span>
        <div className="flex-1 bg-[#EDEDF0] rounded-[20px] px-3.5 py-2 text-[13px] text-gray-400 flex items-center gap-1.5">
          <Search size={14} /> 升金有礼
        </div>
        <Headphones size={18} className="text-gray-600" />
        <div className="relative">
          <MessageSquare size={18} className="text-gray-600" />
          <span className="absolute -top-1.5 -right-2.5 bg-[#C41230] text-white text-[8px] min-w-[18px] text-center px-1 rounded-full font-bold leading-[16px]">99+</span>
        </div>
        <Plus size={18} className="text-gray-600" />
      </div>

      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* AI智能提醒 - 存款到期 */}
        {showDeposit && (
          <AICard type="blue" onClick={() => goPage('deposit-plan')} onClose={() => setShowDeposit(false)} delay={0}>
            <AITag color="#2E6BED" bg="rgba(46,107,237,0.1)">智能提醒</AITag>
            <div className="text-[13px] text-gray-900 leading-relaxed">
              您的<b className="text-[#2E6BED] font-semibold">定期存款 20万元</b>将于2月15日到期，届时将自动转为活期。有3款匹配产品可续接。
            </div>
            <div className="text-[12px] text-[#2E6BED] mt-1.5 font-medium">查看续接方案 →</div>
          </AICard>
        )}

        {/* AI智能提醒 - 信用卡还款 */}
        {showCC && (
          <AICard type="amber" onClick={() => goPage('repay')} onClose={() => setShowCC(false)} delay={100}>
            <AITag color="#D97706" bg="#FFFBEB">还款提醒</AITag>
            <div className="text-[13px] text-gray-900 leading-relaxed">
              信用卡本期账单 <b className="text-[#D97706] font-semibold">¥4,328.50</b>，还款日2月18日（还有<b className="text-[#D97706] font-semibold">4天</b>）。
            </div>
            <div className="text-[12px] text-[#D97706] mt-1.5 font-medium">一键还款 →</div>
          </AICard>
        )}

        {/* AI智能提醒 - 闲置资金 */}
        {showIdle && (
          <AICard type="green" onClick={() => goTab('wealth')} onClose={() => setShowIdle(false)} delay={200}>
            <AITag color="#059669" bg="#ECFDF5">资金洞察</AITag>
            <div className="text-[13px] text-gray-900 leading-relaxed">
              活期账户有<b className="text-[#059669] font-semibold">¥4.6万</b>闲置超45天，转入天天盈每月可多赚约<b className="text-[#059669] font-semibold">¥82</b>。
            </div>
            <div className="text-[12px] text-[#059669] mt-1.5 font-medium">了解详情 →</div>
          </AICard>
        )}

        {/* 常用功能 */}
        <div className="bg-white mx-3 mb-2.5 rounded-2xl p-3.5 shadow-sm">
          <div className="flex gap-4 mb-3 items-center">
            <button className={`text-[14.5px] pb-1 relative ${activeTab === '常用' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`} onClick={() => setActiveTab('常用')}>
              常用
              {activeTab === '常用' && <span className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-[#C41230] rounded-full" />}
            </button>
            <button className={`text-[14.5px] pb-1 relative ${activeTab === '消息' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`} onClick={() => setActiveTab('消息')}>
              消息
              {activeTab === '消息' && <span className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-[#C41230] rounded-full" />}
            </button>
            <span className="text-[13px] text-gray-500 ml-auto">北京 ⋮</span>
          </div>

          {/* 大图标 */}
          <div className="grid grid-cols-4 gap-y-1.5 mb-1.5">
            {[
              { icon: '💰', label: '账户', bg: 'linear-gradient(135deg, #FFE0CC, #FFEEE0)' },
              { icon: '📊', label: '收支', bg: 'linear-gradient(135deg, #FFD4D4, #FFE6E6)' },
              { icon: '📈', label: '天天盈', bg: 'linear-gradient(135deg, #D4F5DE, #E6FAF0)' },
              { icon: '💳', label: '支付', bg: 'linear-gradient(135deg, #D4E6FF, #E6F0FF)' },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-1.5 py-1.5 active:opacity-70 active:scale-95 transition-all duration-150">
                <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center text-xl shadow-sm" style={{ background: item.bg }}>{item.icon}</div>
                <span className="text-[11.5px] text-gray-900">{item.label}</span>
              </button>
            ))}
          </div>

          {/* 小图标 */}
          <QuickGrid cols={5} items={[
            { icon: '🏦', label: '存款' },
            { icon: '🔄', label: '转账汇款', onClick: () => goPage('xfer') },
            { icon: '🎉', label: '热门活动' },
            { icon: '💸', label: '贷款' },
            { icon: '📱', label: '生活缴费' },
            { icon: '🏥', label: '医保' },
            { icon: '💼', label: '薪管家' },
            { icon: '¥', label: '资产' },
            { icon: '🧓', label: '个人养老金' },
            { icon: '🥇', label: '贵金属' },
          ]} />

          <div className="flex gap-1.5 justify-center pt-2">
            <span className="w-3.5 h-1.5 rounded bg-[#C41230]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* 推广横幅 */}
        <div className="flex gap-2.5 px-3 pb-2.5 overflow-x-auto no-scrollbar">
          <div className="min-w-[210px] h-[95px] rounded-xl p-3.5 flex-shrink-0 text-white flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #C85535, #E8866A)' }}>
            <div>
              <h4 className="text-[14.5px] font-semibold">优选理财专区</h4>
              <p className="text-[10.5px] opacity-85">多款好品任您挑选</p>
            </div>
          </div>
          <div className="min-w-[200px] h-[95px] rounded-xl p-3.5 flex-shrink-0 text-white flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #B8452A, #D4634A)' }}>
            <div>
              <h4 className="text-[14.5px] font-semibold">1元秒杀</h4>
              <p className="text-[10.5px] opacity-85">畅看赛事</p>
            </div>
          </div>
          <div className="min-w-[200px] h-[95px] rounded-xl p-3.5 flex-shrink-0 text-white flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #2E5090, #4A7BC8)' }}>
            <div>
              <h4 className="text-[14.5px] font-semibold">畅游欧洲</h4>
              <p className="text-[10.5px] opacity-85">笔笔返现</p>
            </div>
          </div>
        </div>

        {/* 工银财富 */}
        <div className="flex justify-between items-center px-4 pt-3.5 pb-2">
          <span className="text-base font-bold">工银财富</span>
          <span className="text-[12.5px] text-gray-400">更多</span>
        </div>
        <div className="flex gap-2 px-3 pb-2.5 overflow-x-auto no-scrollbar pt-1.5">
          {['稳健回报', '灵活取用', '进取投资', '保险保障'].map((label, i) => (
            <button key={i} className={`text-[12px] px-3.5 py-1.5 rounded-2xl whitespace-nowrap flex-shrink-0 border transition-all duration-200 ${i === 0 ? 'bg-[#E8394A] text-white border-[#E8394A]' : 'bg-white text-gray-500 border-gray-200'}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="h-5" />
      </div>
    </div>
  );
}
