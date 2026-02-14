import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { DB } from '@/lib/data';

export default function TransferPage() {
  const { goBack } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F4F4F6] overflow-hidden">
      <StatusBar />
      <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0 bg-white">
        <button className="text-[22px] text-gray-700 active:opacity-60 transition-opacity" onClick={goBack}>‹</button>
        <span className="flex-1 text-center text-[17px] font-semibold">转账汇款</span>
        <span className="text-lg">🎧</span>
        <span className="text-lg">⋯</span>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* 转账类型 */}
        <div className="flex justify-around mx-3 mb-2.5 rounded-2xl p-[18px] animate-scale-in" style={{ background: 'linear-gradient(135deg, #FFF5F0, #FFEEE8)' }}>
          {[
            { icon: '👤', label: '注册账户转账' },
            { icon: '¥', label: '境内汇款' },
            { icon: '🌐', label: '跨境汇款' },
          ].map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-2 active:opacity-70 active:scale-95 transition-all duration-150">
              <span className="text-[28px]">{item.icon}</span>
              <span className="text-[12.5px] font-medium text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-5 gap-y-3.5 mx-3 bg-white rounded-2xl p-4 shadow-sm mb-2.5">
          {[
            { icon: '🎤', label: '语音转账' }, { icon: '📅', label: '预约转账' },
            { icon: '🏦', label: '他行转入' }, { icon: '🔄', label: '资金归集' },
            { icon: '📱', label: '手机号转账', badge: '免卡号' },
            { icon: '📋', label: '汇款明细' }, { icon: '🧾', label: '电子回单' },
            { icon: '🔒', label: '转账限额' }, { icon: '🛡', label: '安全中心' },
            { icon: '📇', label: '我的收款人' },
          ].map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-1.5 active:opacity-70 active:scale-95 transition-all duration-150 relative">
              <span className="text-[22px]">{item.icon}</span>
              <span className="text-[10.5px] text-gray-600">{item.label}</span>
              {(item as any).badge && <span className="absolute -top-0.5 right-2 text-[8px] bg-[#C41230] text-white px-1 py-0.5 rounded-md">{(item as any).badge}</span>}
            </button>
          ))}
        </div>

        {/* AI建议 - 自动转账 */}
        <div className="mx-3 mb-2.5 rounded-xl p-3.5 flex items-center gap-2.5 animate-slide-down" style={{ border: '1px dashed rgba(46,107,237,0.25)', background: 'linear-gradient(135deg, #EFF4FF, #F3EFFF)' }}>
          <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-white text-[11px] flex-shrink-0 ai-glow" style={{ background: 'linear-gradient(135deg, #2E6BED, #5B8DEF)' }}>✦</div>
          <div className="flex-1 text-[12px] text-gray-800">
            您每月15号前后向 <b className="text-[#2E6BED] font-semibold">赵丽华（母亲）</b>转账 ¥2,000，要设为自动转账吗？
          </div>
          <button className="text-[11px] px-3 py-1.5 rounded-2xl bg-[#2E6BED] text-white border-none whitespace-nowrap active:bg-[#2558C4] transition-colors shadow-sm">设为自动</button>
          <button className="text-gray-400 text-sm active:text-gray-600 transition-colors" onClick={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}>×</button>
        </div>

        {/* 快速转账 */}
        <div className="flex items-center px-4 pt-3.5 pb-2 gap-2">
          <h3 className="text-[15px] font-bold">快速转账</h3>
          <span className="text-[10px] bg-[#C41230] text-white px-2 py-0.5 rounded-lg font-semibold">一点即转</span>
          <span className="ml-auto text-[12px] text-gray-400">更多</span>
        </div>

        {/* 联系人列表 */}
        <div className="stagger-children">
          {DB.contacts.map((contact, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 bg-white mx-3 active:bg-gray-50 transition-colors ${i === 0 ? 'rounded-t-xl' : ''} ${i === DB.contacts.length - 1 ? 'rounded-b-xl mb-2.5' : 'mb-px'}`}>
              <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-sm" style={{ background: contact.color }}>
                {contact.initial}
              </div>
              <div>
                <div className="text-[13.5px] font-medium flex items-center gap-1.5 text-gray-900">
                  {contact.name}
                  <span className="text-[9px] bg-[#FFF1F0] text-[#C41230] px-1.5 py-0.5 rounded">借记卡</span>
                  {contact.relation && <span className="text-[11px] text-gray-400">{contact.relation}</span>}
                </div>
                <div className="text-[11.5px] text-gray-400 mt-0.5">{contact.acct} {contact.bank}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-5" />
      </div>
    </div>
  );
}
