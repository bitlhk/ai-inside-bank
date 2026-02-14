import { StatusBar } from '@/components/PhoneShell';
import { MessageSquare, Plus, Settings } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      <StatusBar />
      <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0">
        <span className="text-[13px] text-gray-500">📍 北京</span>
        <div className="flex-1" />
        <Settings size={18} className="text-gray-600" />
        <div className="relative"><MessageSquare size={18} className="text-gray-600" /><span className="absolute -top-1 -right-2 bg-[#C41230] text-white text-[8px] px-1 rounded-full font-bold">99+</span></div>
        <Plus size={18} className="text-gray-600" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* 个人信息卡片 */}
        <div className="px-4 pb-4" style={{ background: 'linear-gradient(180deg, #FFF5F0, #F4F4F6)' }}>
          <div className="bg-white rounded-2xl p-4 shadow-sm animate-scale-in">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center text-2xl shadow-md" style={{ background: 'linear-gradient(135deg, #FFD4C4, #FFC4B4)' }}>👤</div>
              <div>
                <div className="text-[17px] font-semibold text-gray-900">*泓锟</div>
                <div className="text-[11px] text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-lg mt-0.5 inline-block">🛡 三星级</div>
              </div>
              <div className="ml-auto text-[13px] text-[#C5943A] font-semibold px-3 py-1.5 rounded-lg active:opacity-70 transition-opacity" style={{ background: '#F5E6C8' }}>权益中心 💎</div>
            </div>
            <div className="flex justify-around text-center pt-2.5 border-t border-gray-100">
              {[
                { n: '3', l: '银行卡' }, { n: '309', l: '积分' },
                { n: '0', l: '数字藏品' }, { n: '0', l: '礼券' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-lg font-bold text-gray-900">{item.n}</div>
                  <div className="text-[10.5px] text-gray-400 mt-0.5">{item.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 快捷功能 */}
        <div className="bg-white mx-3 mb-2.5 rounded-2xl p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-y-2.5">
            {[
              { icon: '📋', label: '年度账单' }, { icon: '📦', label: '商城订单' },
              { icon: '📄', label: '信用报告' }, { icon: '⏳', label: '办理进度' },
              { icon: '⊞', label: '更多' },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-1 active:opacity-70 active:scale-95 transition-all duration-150">
                <span className="text-xl w-8 h-8 flex items-center justify-center">{item.icon}</span>
                <span className="text-[10.5px] text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 资产总览 */}
        <div className="mx-3 mb-2.5 bg-white rounded-2xl p-3.5 shadow-sm">
          <h3 className="text-[15px] font-bold mb-2.5 flex items-center gap-1.5">📊 我的资产总览</h3>
          {[
            { l: '活期存款', v: '¥86,520.00' },
            { l: '定期存款 (2/15到期)', v: '¥200,000.00' },
            { l: '理财产品', v: '¥82,380.56' },
            { l: '保险 (年缴)', v: '¥12,000' },
            { l: '总资产', v: '¥368,900.56', highlight: true },
            { l: '信用卡待还', v: '-¥4,328.50' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 last:border-none text-[13px]">
              <span className="text-gray-500">{item.l}</span>
              <span className={`font-semibold ${item.highlight ? 'text-[#C41230] text-[15px]' : 'text-gray-900'}`}>{item.v}</span>
            </div>
          ))}
          <div className="mt-2.5 p-2.5 bg-[#F0F5FF] rounded-lg text-[12px] text-[#3A5BA0] leading-relaxed flex gap-1.5">
            <span className="ai-pulse">✦</span>
            <span>负债率1.2%健康。活期占比23%偏高，可配置短期理财提升收益。</span>
          </div>
        </div>

        {/* 本月收支 */}
        <div className="mx-3 mb-2.5 bg-white rounded-2xl p-3.5 shadow-sm">
          <h3 className="text-[15px] font-bold mb-2.5 flex items-center gap-1.5">📈 本月收支</h3>
          {[
            { l: '本月收入', v: '¥25,600.00', color: '#10B981' },
            { l: '本月支出', v: '¥12,847.30', color: '#C41230' },
            { l: '储蓄率', v: '50%', color: undefined },
          ].map((item, i) => (
            <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 last:border-none text-[13px]">
              <span className="text-gray-500">{item.l}</span>
              <span className="font-semibold" style={{ color: item.color || '#1a1a1a' }}>{item.v}</span>
            </div>
          ))}
          <div className="mt-2.5 p-2.5 bg-[#F0F5FF] rounded-lg text-[12px] text-[#3A5BA0] leading-relaxed flex gap-1.5">
            <span className="ai-pulse">✦</span>
            <span>餐饮¥3,860较上月+23%。储蓄率50%优于同龄平均。</span>
          </div>
        </div>

        {/* 安全护盾 */}
        <div className="mx-3 mb-2.5 bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3 active:bg-gray-50 transition-colors">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-sm" style={{ background: 'linear-gradient(135deg, #2E6BED, #5B8DEF)' }}>🛡</div>
          <div>
            <h4 className="text-[13.5px] font-semibold mb-0.5 text-gray-900">我的安全护盾</h4>
            <p className="text-[11px] text-[#10B981]">✓ 实时保护中</p>
          </div>
          <div className="ml-auto text-[12px] text-[#2E6BED] font-medium">去检测 ›</div>
        </div>

        <div className="h-5" />
      </div>
    </div>
  );
}
