import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { Search, Headphones, MessageSquare, Plus } from 'lucide-react';

export default function CreditCardPage() {
  const { goPage } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      <StatusBar />
      <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0">
        <span className="text-[13px] text-gray-500">📍 北京</span>
        <div className="flex-1 bg-[#EDEDF0] rounded-[20px] px-3.5 py-2 text-[13px] text-gray-400 flex items-center gap-1.5">
          <Search size={14} /> 升金有礼
        </div>
        <Headphones size={18} className="text-gray-600" />
        <div className="relative"><MessageSquare size={18} className="text-gray-600" /><span className="absolute -top-1.5 -right-2.5 bg-[#C41230] text-white text-[8px] min-w-[18px] text-center px-1 rounded-full font-bold leading-[16px]">99+</span></div>
        <Plus size={18} className="text-gray-600" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* 信用卡卡片 */}
        <div className="mx-3 mb-2.5 rounded-2xl p-6 text-white relative overflow-hidden animate-scale-in" style={{ background: 'linear-gradient(135deg, #C9A96E 0%, #A07840 60%, #8A6530 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3), transparent 60%)' }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-[8px] font-bold">BANK</div>
              <h3 className="text-base font-semibold">尊享白金卡</h3>
            </div>
            <p className="text-[12px] opacity-80 mb-1">5288 **** **** 6677</p>
            <div className="flex justify-between items-end mt-3">
              <div>
                <div className="text-[10px] opacity-70">可用额度</div>
                <div className="text-[20px] font-bold">¥45,671.50</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] opacity-70">总额度</div>
                <div className="text-[14px] font-semibold">¥50,000</div>
              </div>
            </div>
            <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 rounded-full" style={{ width: '8.7%' }} />
            </div>
            <div className="text-[10px] opacity-60 text-center mt-1.5">尊享品质生活</div>
          </div>
        </div>

        {/* AI账单分析 */}
        <div className="mx-3 mb-2.5 rounded-xl p-3.5 flex items-start gap-2.5 animate-slide-down" style={{ background: 'linear-gradient(135deg, #EFF4FF, #F3EFFF)', border: '1px solid rgba(46,107,237,0.12)' }}>
          <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center text-white text-[13px] flex-shrink-0 ai-glow" style={{ background: 'linear-gradient(135deg, #2E6BED, #5B8DEF)' }}>✦</div>
          <div className="flex-1">
            <span className="text-[9.5px] text-[#2E6BED] bg-[#EBF1FF] px-1.5 py-0.5 rounded font-semibold inline-block mb-1">账单分析</span>
            <div className="text-[13px] text-gray-800 leading-relaxed">
              本期账单 <b className="text-[#2E6BED] font-semibold">¥4,328.50</b>，较上期+12%。最大支出：餐饮 ¥1,860（43%）。还款日<b className="text-[#2E6BED] font-semibold">2月18日</b>，活期余额充足。
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => goPage('repay')} className="text-[11.5px] px-4 py-1.5 rounded-2xl bg-[#C41230] text-white border-none active:opacity-85 transition-opacity shadow-sm">一键还款 ¥4,328.50</button>
              <button className="text-[11.5px] px-3 py-1.5 rounded-2xl border border-gray-200 bg-transparent text-gray-500 active:bg-gray-50 transition-colors">查看明细</button>
            </div>
          </div>
        </div>

        {/* 功能网格 */}
        <div className="bg-white mx-3 mb-2.5 rounded-2xl p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-y-2.5">
            {[
              { icon: '👤', label: '申请办卡' }, { icon: '⏱', label: '申请进度' },
              { icon: '🔓', label: '卡片启用' }, { icon: '📱', label: '线上支付' },
              { icon: '🏠', label: '家装分期' }, { icon: '📅', label: '分期付款' },
              { icon: '💰', label: '消费分期' }, { icon: '🎁', label: '卡片权益' },
              { icon: '📲', label: '一键绑卡' }, { icon: '🛒', label: '积分商城' },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-1 active:opacity-70 active:scale-95 transition-all duration-150">
                <span className="text-xl w-8 h-8 flex items-center justify-center">{item.icon}</span>
                <span className="text-[10.5px] text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-5" />
      </div>
    </div>
  );
}
