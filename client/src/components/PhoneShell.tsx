import { useApp } from '@/contexts/AppContext';
import { Home, CreditCard, TrendingUp, ShoppingBag, User } from 'lucide-react';

const GXZ_AVATAR = "https://private-us-east-1.manuscdn.com/sessionFile/sq7QwQbi32cJJ8M0z2eyjy/sandbox/IgQQaoRoo1Up0Sao5oCVJu_1771039093619_na1fn_Z3h6LWF2YXRhcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc3E3UXdRYmkzMmNKSjhNMHoyZXlqeS9zYW5kYm94L0lnUVFhb1JvbzFVcDBTYW81b0NWSnVfMTc3MTAzOTA5MzYxOV9uYTFmbl9aM2g2TFdGMllYUmhjZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jRjIjyOUsQmsEV~eCT5fKdv8FIheeLRQPc7K4H44SQevBhRhHIRw-8~2KtlNE7anqznhJGF1R6cUO~hOiHA--wccQHLvrgW7SJGRZRwBdeLr1KWU5M9tmibPtSbnIhb-Rqlp5EeluFvATyL-zpZl33fIs4Cs0HKwWyE7g-7lgmf6jF4HIYFUmVvt6HuO9eE70zrkCcKVH8-hpGP2YC~rbMpEoxjZoBwye4ZnU5iHEOnG5G1IxrhjKHQOXb1s6-KCcouq0hAaRi9Ks4pclsTO6j6AONH90~OBzDCayM-5Q4slo-l2~0M~Hu-OoDLAIbSh6pfl2xmTrG~lFPO34O6jZQ__";

const tabs = [
  { id: 'home' as const, label: '首页', icon: Home },
  { id: 'cc' as const, label: '信用卡', icon: CreditCard },
  { id: 'wealth' as const, label: '财富', icon: TrendingUp },
  { id: 'life' as const, label: '生活', icon: ShoppingBag },
  { id: 'prof' as const, label: '我的', icon: User },
];

export function TabBar() {
  const { currentPage, goTab } = useApp();
  const hideTabs = ['gxz', 'xfer', 'repay', 'deposit-plan'].includes(currentPage);
  if (hideTabs) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md flex justify-around pt-1.5 pb-7 border-t border-gray-100/80 z-50">
      {tabs.map(t => {
        const active = currentPage === t.id;
        return (
          <button
            key={t.id}
            onClick={() => goTab(t.id)}
            className={`flex flex-col items-center gap-0.5 text-[10px] px-2 py-0.5 transition-all duration-200 ${active ? 'text-[#C41230] scale-105' : 'text-gray-400'}`}
          >
            <t.icon size={21} strokeWidth={active ? 2.2 : 1.5} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function FAB() {
  const { currentPage, goPage, setGxzTab } = useApp();
  const hide = ['gxz', 'xfer', 'repay', 'deposit-plan'].includes(currentPage);
  if (hide) return null;

  return (
    <button
      onClick={() => { goPage('gxz'); setGxzTab('chat'); }}
      className="absolute bottom-[90px] right-4 w-[52px] h-[52px] rounded-full flex items-center justify-center text-white text-lg z-40 active:scale-90 transition-transform overflow-hidden fab-bounce ai-glow"
      style={{ background: 'linear-gradient(135deg, #2E6BED, #5B8DEF)', boxShadow: '0 4px 20px rgba(46,107,237,0.35)' }}
    >
      <img src={GXZ_AVATAR} alt="工小智" className="w-full h-full object-cover" />
    </button>
  );
}

export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex justify-between items-center px-7 pt-3.5 pb-1.5 text-sm font-semibold flex-shrink-0 ${light ? 'text-white' : 'text-gray-800'}`}>
      <span>10:42</span>
      <span className="text-[11px]">4G 🔋87</span>
    </div>
  );
}

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(160deg, #0a0a1a 0%, #141428 50%, #0f0f2a 100%)' }}>
      {/* Phone frame */}
      <div
        className="w-[390px] h-[844px] rounded-[48px] overflow-hidden relative flex-shrink-0"
        style={{
          background: '#F4F4F6',
          boxShadow: `
            0 0 0 2px #3a3a4a,
            0 0 0 4px #2a2a3a,
            0 0 0 7px #1a1a2a,
            0 30px 80px rgba(0,0,0,0.7),
            0 0 120px rgba(46,107,237,0.06)
          `
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-[20px] z-[100]" />
        {children}
      </div>
    </div>
  );
}
