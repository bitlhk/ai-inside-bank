import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { CheckCircle } from 'lucide-react';

export default function RepayPage() {
  const { goBack, goTab } = useApp();
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
        <StatusBar />
        <div className="flex items-center px-4 pb-2.5 gap-2.5 flex-shrink-0">
          <button className="text-[22px] text-gray-700" onClick={() => { setSuccess(false); goTab('home'); }}>‹</button>
          <span className="flex-1 text-center text-[17px] font-semibold">还款结果</span>
          <span className="w-6" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="animate-slide-up flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mb-4">
              <CheckCircle size={40} className="text-[#10B981]" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">还款成功</h2>
            <p className="text-gray-500 text-sm text-center mb-6">已从活期账户(6222****8862)成功还款</p>
            <div className="text-3xl font-bold text-[#C41230] mb-8 animate-count-up">¥4,328.50</div>
            <div className="w-full bg-[#F0F5FF] rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-[7px] h-[7px] rounded-full bg-[#2E6BED] ai-pulse" />
                <span className="text-[11px] text-[#2E6BED] font-semibold">AI 建议</span>
              </div>
              <p className="text-[12.5px] text-[#3A5BA0] leading-relaxed">
                还款后活期余额 ¥82,191.50。建议开启<b className="font-semibold">信用卡自动还款</b>，避免忘记还款产生利息。
              </p>
              <button className="mt-2.5 text-[12px] px-4 py-1.5 rounded-2xl bg-[#2E6BED] text-white border-none active:bg-[#2558C4] transition-colors shadow-sm">开启自动还款</button>
            </div>
            <button onClick={() => { setSuccess(false); goTab('home'); }} className="w-full py-3 rounded-[22px] bg-[#C41230] text-white text-[15px] font-medium active:opacity-85 active:scale-[0.98] transition-all shadow-md">返回首页</button>
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
        <span className="flex-1 text-center text-[17px] font-semibold">信用卡还款</span>
        <span className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {/* AI预填提示 */}
        <div className="mx-3 mt-3 mb-3 rounded-xl p-3 flex items-center gap-2 shimmer animate-slide-down" style={{ background: 'linear-gradient(135deg, #F0F5FF, #F5F0FF)', border: '1px solid rgba(46,107,237,0.1)' }}>
          <span className="w-[7px] h-[7px] rounded-full bg-[#2E6BED] ai-pulse" />
          <span className="text-[12px] text-[#3A5BA0] font-medium">AI已为您预填还款信息，请确认后提交</span>
        </div>

        {/* 还款信息卡片 */}
        <div className="bg-white mx-3 rounded-2xl p-4 shadow-sm mb-3 animate-slide-up">
          <h4 className="text-[14px] font-semibold mb-3 text-gray-700">还款信息</h4>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-400 mb-1 block">还款卡号</label>
              <div className="bg-[#F8F8FA] rounded-xl p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #C41230, #E8394A)' }}>
                  <span className="text-white font-bold text-[10px]">BANK</span>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-gray-900">尊享白金卡</div>
                  <div className="text-[11px] text-gray-400">5288****6677</div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-400 mb-1 block">还款金额</label>
              <div className="bg-[#F8F8FA] rounded-xl p-3">
                <div className="text-[28px] font-bold text-[#C41230] animate-count-up">¥4,328.50</div>
                <div className="text-[11px] text-gray-400 mt-0.5">本期账单全额</div>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-400 mb-1 block">付款账户</label>
              <div className="bg-[#F8F8FA] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #C41230, #E8394A)' }}>
                    <span className="text-white font-bold text-[10px]">BANK</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-gray-900">活期储蓄账户</div>
                    <div className="text-[11px] text-gray-400">6222****8862</div>
                  </div>
                </div>
                <div className="text-[12px] text-gray-500">余额 ¥86,520.00</div>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-400 mb-1 block">还款日期</label>
              <div className="bg-[#F8F8FA] rounded-xl p-3 text-[13px] text-gray-900">
                立即还款 <span className="text-gray-400 text-[11px]">（最迟2月18日）</span>
              </div>
            </div>
          </div>
        </div>

        {/* 账单明细 */}
        <div className="bg-white mx-3 rounded-2xl p-4 shadow-sm mb-3">
          <h4 className="text-[14px] font-semibold mb-2 text-gray-700">账单摘要</h4>
          <div className="space-y-2">
            {[
              { cat: '餐饮', amount: '¥1,860.30', pct: '43%', color: '#E8394A' },
              { cat: '网购', amount: '¥1,255.00', pct: '29%', color: '#F59E0B' },
              { cat: '交通', amount: '¥455.60', pct: '11%', color: '#10B981' },
              { cat: '其他', amount: '¥757.60', pct: '17%', color: '#8B5CF6' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-[12px] text-gray-600 w-8">{item.cat}</span>
                <div className="flex-1 h-[14px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full animate-progress-fill" style={{ width: item.pct, background: item.color }} />
                </div>
                <span className="text-[12px] font-medium w-16 text-right text-gray-900">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 确认还款按钮 */}
        <div className="px-3 mb-5">
          <button
            onClick={() => setSuccess(true)}
            className="w-full py-3.5 rounded-[22px] bg-[#C41230] text-white text-[15px] font-medium active:opacity-85 active:scale-[0.98] transition-all shadow-lg"
          >
            确认还款 ¥4,328.50
          </button>
        </div>
      </div>
    </div>
  );
}
