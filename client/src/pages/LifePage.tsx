import { StatusBar } from '@/components/PhoneShell';
import { Search, Headphones, MessageSquare, Plus } from 'lucide-react';

export default function LifePage() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      <StatusBar />
      <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0">
        <span className="text-[13px] text-gray-500">📍 北京</span>
        <div className="flex-1 bg-[#EDEDF0] rounded-[20px] px-3.5 py-2 text-[13px] text-gray-400 flex items-center gap-1.5">
          <Search size={14} /> 新客专区
        </div>
        <Headphones size={18} className="text-gray-600" />
        <div className="relative"><MessageSquare size={18} className="text-gray-600" /><span className="absolute -top-1.5 -right-2.5 bg-[#C41230] text-white text-[8px] min-w-[18px] text-center px-1 rounded-full font-bold leading-[16px]">99+</span></div>
        <Plus size={18} className="text-gray-600" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* Banner */}
        <div className="mx-3 mb-2.5 rounded-2xl h-[130px] text-white p-5 flex flex-col justify-center relative overflow-hidden animate-scale-in" style={{ background: 'linear-gradient(135deg, #4A9BD9, #2E7BBF)' }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 90% 30%, rgba(255,255,255,0.4), transparent 60%)' }} />
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-1">老友出行 选携程</h3>
            <p className="text-[12px] opacity-85">来老友会 享工行支付优惠</p>
          </div>
        </div>

        {/* AI生活提醒 */}
        <div className="mx-3 mb-2.5 rounded-xl p-3.5 flex items-start gap-2.5 animate-slide-down" style={{ background: 'linear-gradient(135deg, #ECFDF5, #F0FFF8)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <div className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center text-white text-[13px] flex-shrink-0 ai-glow" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>💡</div>
          <div className="flex-1">
            <span className="text-[9.5px] text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded font-semibold inline-block mb-1">生活提醒</span>
            <div className="text-[13px] text-gray-800 leading-relaxed">
              您的<b className="text-[#059669] font-semibold">电费</b>上月扣费失败，欠费 ¥186.40。<b className="text-[#059669] font-semibold">燃气费</b>已缴 ¥67.00。
            </div>
            <div className="text-[12px] text-[#059669] mt-1.5 font-medium">立即缴费 →</div>
          </div>
          <button className="text-gray-400 text-base flex-shrink-0 hover:text-gray-600 transition-colors" onClick={(e) => { e.stopPropagation(); (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}>×</button>
        </div>

        {/* 功能网格 */}
        <div className="bg-white mx-3 mb-2.5 rounded-2xl p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-y-2.5">
            {[
              { icon: '🎁', label: 'i豆乐园' }, { icon: '🎉', label: '悦享生活' },
              { icon: '👑', label: '权益中心' }, { icon: '🏪', label: '百城万店' },
              { icon: '🛒', label: 'i豆商城' }, { icon: '📱', label: '生活缴费' },
              { icon: '📦', label: '快递专区' }, { icon: '📄', label: '资信助手' },
              { icon: '💼', label: '企业年金' }, { icon: '🏠', label: '查房价' },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-1 active:opacity-70 active:scale-95 transition-all duration-150">
                <span className="text-xl w-8 h-8 flex items-center justify-center">{item.icon}</span>
                <span className="text-[10.5px] text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 品牌特惠 */}
        <div className="mx-3 mb-2.5 bg-white rounded-2xl p-3.5 shadow-sm">
          <h3 className="text-[15px] font-bold mb-2.5">品牌特惠</h3>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
            {[
              { icon: '📺', label: '央视频', color: '#E8394A' },
              { icon: '✈', label: '携程老友会', color: '#2E6BED' },
              { icon: '🎬', label: '猫眼电影', color: '#F59E0B' },
            ].map((item, i) => (
              <div key={i} className="min-w-[100px] h-[75px] bg-[#F8F8FA] rounded-xl flex flex-col items-center justify-center text-[12px] text-gray-600 flex-shrink-0 border border-gray-100 gap-1 active:scale-95 transition-all duration-150">
                <span className="text-xl">{item.icon}</span>
                <span className="text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-5" />
      </div>
    </div>
  );
}
