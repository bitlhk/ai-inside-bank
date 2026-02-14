import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { StatusBar } from '@/components/PhoneShell';
import { callAI, type CardData } from '@/lib/ai-service';
import { Send } from 'lucide-react';

const GXZ_AVATAR = "https://private-us-east-1.manuscdn.com/sessionFile/sq7QwQbi32cJJ8M0z2eyjy/sandbox/IgQQaoRoo1Up0Sao5oCVJu_1771039093619_na1fn_Z3h6LWF2YXRhcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc3E3UXdRYmkzMmNKSjhNMHoyZXlqeS9zYW5kYm94L0lnUVFhb1JvbzFVcDBTYW81b0NWSnVfMTc3MTAzOTA5MzYxOV9uYTFmbl9aM2g2TFdGMllYUmhjZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jRjIjyOUsQmsEV~eCT5fKdv8FIheeLRQPc7K4H44SQevBhRhHIRw-8~2KtlNE7anqznhJGF1R6cUO~hOiHA--wccQHLvrgW7SJGRZRwBdeLr1KWU5M9tmibPtSbnIhb-Rqlp5EeluFvATyL-zpZl33fIs4Cs0HKwWyE7g-7lgmf6jF4HIYFUmVvt6HuO9eE70zrkCcKVH8-hpGP2YC~rbMpEoxjZoBwye4ZnU5iHEOnG5G1IxrhjKHQOXb1s6-KCcouq0hAaRi9Ks4pclsTO6j6AONH90~OBzDCayM-5Q4slo-l2~0M~Hu-OoDLAIbSh6pfl2xmTrG~lFPO34O6jZQ__";

interface ChatMsg {
  type: 'user' | 'ai' | 'card' | 'process';
  text?: string;
  cardData?: CardData;
  processStep?: number;
}

// AI已了解面板
function AIKnownPanel() {
  return (
    <div className="mx-3 mb-3 bg-white rounded-xl p-3.5 shadow-sm animate-scale-in">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-[26px] h-[26px] bg-[#EBF1FF] rounded-[7px] flex items-center justify-center text-[13px]">🧠</div>
        <span className="text-[13.5px] font-semibold text-gray-900">AI 已了解</span>
        <span className="text-[11.5px] text-[#2E6BED] ml-auto font-medium">管理 ›</span>
      </div>
      {[
        { text: '不考虑权益类/股票型产品', tag: '您告知', tagType: 'user' },
        { text: '偏好短期（3个月内）理财', tag: '您告知', tagType: 'user' },
        { text: '每月约15号给母亲转账¥2,000', tag: 'AI推测', tagType: 'ai' },
        { text: '月收入约25,600元，储蓄率较高', tag: 'AI推测', tagType: 'ai' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-none">
          <span className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${item.tagType === 'user' ? 'bg-[#2E6BED]' : 'bg-[#F59E0B]'}`} />
          <span className="text-[12.5px] text-gray-800 flex-1">{item.text}</span>
          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-medium ${item.tagType === 'user' ? 'text-[#2E6BED] bg-[#EBF1FF]' : 'text-[#D97706] bg-[#FFFBEB]'}`}>{item.tag}</span>
        </div>
      ))}
    </div>
  );
}

// 消息气泡
function MsgBubble({ msg }: { msg: ChatMsg }) {
  if (msg.type === 'process') {
    return <ProcessIndicator step={msg.processStep || 0} />;
  }
  if (msg.type === 'card' && msg.cardData) {
    return <CardRenderer card={msg.cardData} />;
  }
  const isUser = msg.type === 'user';
  return (
    <div className={`flex gap-2 max-w-[88%] animate-slide-up ${isUser ? 'self-end flex-row-reverse' : ''}`}>
      <div className={`w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center text-[12px] overflow-hidden shadow-sm ${isUser ? 'bg-gray-200 text-gray-500' : ''}`}>
        {isUser ? '👤' : <img src={GXZ_AVATAR} alt="AI" className="w-full h-full object-cover" />}
      </div>
      <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap break-words max-w-[260px] ${isUser ? 'bg-[#2E6BED] text-white rounded-[16px] rounded-tr-[4px]' : 'bg-white text-gray-900 border border-gray-100 rounded-[16px] rounded-tl-[4px] shadow-sm'}`}>
        {msg.text}
      </div>
    </div>
  );
}

// AI思考过程指示器
function ProcessIndicator({ step }: { step: number }) {
  const steps = ['理解需求...', '查询数据...', '生成方案...', '准备完成'];
  return (
    <div className="flex gap-2 max-w-[88%] animate-slide-up">
      <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
        <img src={GXZ_AVATAR} alt="AI" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white border border-gray-100 rounded-[16px] rounded-tl-[4px] shadow-sm px-3.5 py-2.5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 border-2 border-[#2E6BED]/30 border-t-[#2E6BED] rounded-full animate-spin" />
          <span className="text-[12px] text-[#2E6BED] font-medium">AI 正在思考</span>
        </div>
        <div className="space-y-1">
          {steps.map((s, i) => (
            <div key={i} className={`text-[11px] flex items-center gap-1.5 transition-all duration-300 ${i <= step ? 'text-gray-700' : 'text-gray-300'}`}>
              <span>{i < step ? '✓' : i === step ? '◉' : '○'}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 卡片渲染器
function CardRenderer({ card }: { card: CardData }) {
  const { addRule } = useApp();
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (card.data.isRule && card.data.confirmText) {
      addRule({
        id: 'rule-' + Date.now(),
        title: card.data.title,
        icon: '⚙',
        status: 'running',
        rows: card.data.rows
      });
      setConfirmed(true);
    }
  };

  if (card.type === 'analysis') {
    return (
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 animate-slide-up max-w-[92%]">
        <h4 className="text-[13px] font-semibold mb-2.5 text-gray-900">{card.data.title}</h4>
        <div className="space-y-2 mb-2.5">
          {card.data.bars?.map((bar: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500 w-8 flex-shrink-0">{bar.label}</span>
              <div className="flex-1 h-[14px] bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full animate-progress-fill" style={{ width: `${bar.pct}%`, background: bar.color }} />
              </div>
              <span className="text-[11px] font-medium text-gray-700 w-14 text-right">¥{bar.value?.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[12px] pt-2 border-t border-gray-100">
          <span className="text-gray-500">{card.data.total?.label}</span>
          <span className="font-bold text-gray-900">{card.data.total?.value}</span>
        </div>
        {card.data.insight && (
          <div className="mt-2 p-2 bg-[#F0F5FF] rounded-lg text-[11px] text-[#3A5BA0] leading-relaxed flex gap-1.5">
            <span className="ai-pulse flex-shrink-0">✦</span>
            <span>{card.data.insight}</span>
          </div>
        )}
      </div>
    );
  }

  if (card.type === 'tx') {
    return (
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 animate-slide-up max-w-[92%]">
        <h4 className="text-[13px] font-semibold mb-2 text-gray-900">{card.data.title}</h4>
        <div className="space-y-0">
          {card.data.rows?.map((row: any, i: number) => (
            <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 last:border-none text-[11.5px]">
              <div>
                <div className="text-gray-800">{row.desc}</div>
                <div className="text-[10px] text-gray-400">{row.date}</div>
              </div>
              <span className="font-medium text-gray-900">{row.amount}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // rule card
  return (
    <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 animate-slide-up max-w-[92%]">
      <h4 className="text-[13px] font-semibold mb-2 text-gray-900">{card.data.title}</h4>
      <div className="space-y-0">
        {card.data.rows?.map((row: any, i: number) => (
          <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 last:border-none text-[12px]">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>
      {card.data.insight && (
        <div className="mt-2 p-2 bg-[#F0F5FF] rounded-lg text-[11px] text-[#3A5BA0] leading-relaxed flex gap-1.5">
          <span className="ai-pulse flex-shrink-0">✦</span>
          <span>{card.data.insight}</span>
        </div>
      )}
      {card.data.confirmText && !card.data.isInfo && (
        confirmed ? (
          <div className="mt-2.5 text-center text-[12px] text-[#10B981] font-medium py-2 bg-[#ECFDF5] rounded-xl">
            ✓ 已确认，规则已添加到「自动规则」
          </div>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full mt-2.5 py-2 rounded-xl bg-[#2E6BED] text-white text-[13px] font-medium active:opacity-85 active:scale-[0.98] transition-all shadow-sm"
          >
            {card.data.confirmText}
          </button>
        )
      )}
    </div>
  );
}

// 记忆Tab
function MemoryTab() {
  return (
    <div className="p-3 stagger-children">
      <div className="bg-white rounded-xl p-3.5 shadow-sm mb-2.5">
        <h4 className="text-[14px] font-semibold mb-3 flex items-center gap-1.5">📌 您告知的偏好</h4>
        {['不考虑权益类/股票型产品', '偏好短期（3个月内）理财', '理财信息用简单语言解释'].map((text, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-none">
            <span className="w-[5px] h-[5px] rounded-full bg-[#2E6BED] flex-shrink-0" />
            <span className="text-[12.5px] text-gray-800 flex-1">{text}</span>
            <span className="text-[11px] text-[#C41230] font-medium">删除</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-3.5 shadow-sm">
        <h4 className="text-[14px] font-semibold mb-3 flex items-center gap-1.5">🔍 AI 推测的信息</h4>
        {[
          '每月约15号给母亲转账¥2,000',
          '月收入约¥25,600',
          '主要消费场景：餐饮、网购',
          '风险偏好保守（R2以下）'
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-none">
            <span className="w-[5px] h-[5px] rounded-full bg-[#F59E0B] flex-shrink-0" />
            <span className="text-[12.5px] text-gray-800 flex-1">{text}</span>
            <span className="text-[11px] text-gray-400 font-medium">纠正</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 自动规则Tab
function RulesTab() {
  const { rules, toggleRule } = useApp();

  return (
    <div className="p-3">
      {rules.length === 0 && (
        <div className="text-center text-gray-400 text-[13px] py-10">
          暂无自动规则，可在对话中设置
        </div>
      )}
      <div className="stagger-children">
        {rules.map(rule => (
          <div key={rule.id} className={`bg-white rounded-xl p-3.5 shadow-sm mb-2.5 border-l-[3px] transition-all ${rule.status === 'running' ? 'border-[#10B981]' : 'border-gray-400'}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-[14px] font-semibold">{rule.icon} {rule.title}</h4>
              <span className={`text-[11px] px-2 py-0.5 rounded-lg font-medium ${rule.status === 'running' ? 'text-[#10B981] bg-[#ECFDF5]' : 'text-gray-400 bg-gray-100'}`}>
                {rule.status === 'running' ? '● 运行中' : '○ 已暂停'}
              </span>
            </div>
            {rule.rows.map((r, i) => (
              <div key={i} className="flex justify-between py-1.5 text-[13px] border-b border-gray-50 last:border-none">
                <span className="text-gray-500">{r.label}</span>
                <span className="font-medium text-gray-900">{r.value}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-2.5">
              <button onClick={() => toggleRule(rule.id)} className={`flex-1 py-2 rounded-[20px] text-[12px] border transition-all ${rule.status === 'running' ? 'border-[#F59E0B] text-[#D97706] bg-[#FFFBEB]' : 'border-[#10B981] text-[#059669] bg-[#ECFDF5]'}`}>
                {rule.status === 'running' ? '暂停' : '启用'}
              </button>
              <button className="flex-1 py-2 rounded-[20px] text-[12px] border border-gray-200 bg-transparent text-gray-500">编辑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GxzPage() {
  const { goBack, gxzTab, setGxzTab, chatHistory, addChatMessage, trimChatHistory, removeRuleByKeyword } = useApp();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 80);
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    // 添加用户消息
    setMessages(prev => [...prev, { type: 'user', text: msg }]);

    setLoading(true);

    // 添加AI思考过程
    setMessages(prev => [...prev, { type: 'process', processStep: 0 }]);

    // 模拟步骤进度
    const stepDelays = [600, 1200, 1800];
    for (let i = 0; i < stepDelays.length; i++) {
      await new Promise(r => setTimeout(r, stepDelays[i] - (i > 0 ? stepDelays[i - 1] : 0)));
      setMessages(prev => {
        const updated = [...prev];
        const processIdx = updated.findLastIndex(m => m.type === 'process');
        if (processIdx >= 0) updated[processIdx] = { type: 'process', processStep: i + 1 };
        return updated;
      });
    }

    try {
      const result = await callAI(msg, chatHistory);

      // 移除思考过程
      setMessages(prev => prev.filter(m => m.type !== 'process'));

      // 完成步骤4
      setMessages(prev => [...prev, { type: 'process', processStep: 4 }]);
      await new Promise(r => setTimeout(r, 500));
      setMessages(prev => prev.filter(m => m.type !== 'process'));

      // 处理关闭规则
      if (result.isCloseRule && result.closeKeyword) {
        const removed = removeRuleByKeyword(result.closeKeyword);
        if (removed) {
          setMessages(prev => [...prev, { type: 'ai', text: '✅ 已为您关闭该自动规则。如需重新开启，随时告诉我。' }]);
        } else {
          setMessages(prev => [...prev, { type: 'ai', text: '当前没有找到匹配的自动规则。您可以在「自动规则」标签中查看所有规则。' }]);
        }
      } else {
        // 添加AI回复
        if (result.text) {
          setMessages(prev => [...prev, { type: 'ai', text: result.text }]);
        }
        // 添加卡片
        for (const card of result.cards) {
          await new Promise(r => setTimeout(r, 200));
          setMessages(prev => [...prev, { type: 'card', cardData: card }]);
        }
      }

      // 更新聊天历史
      addChatMessage({ role: 'user', content: msg });
      addChatMessage({ role: 'assistant', content: result.text || '' });
      trimChatHistory();
    } catch {
      setMessages(prev => prev.filter(m => m.type !== 'process'));
      setMessages(prev => [...prev, { type: 'ai', text: '抱歉，暂时无法处理您的请求，请稍后再试。' }]);
    }

    setLoading(false);
  }, [input, loading, chatHistory, addChatMessage, trimChatHistory, removeRuleByKeyword]);

  const quickActions = [
    { label: '📊 消费分析', text: '本月消费分析' },
    { label: '💰 理财到期', text: '我的理财到期情况' },
    { label: '⚙ 自动转账', text: '帮我设置每月自动给妈妈转2000块' },
    { label: '🔍 最近交易', text: '查询最近10笔交易' },
    { label: '💳 信用卡', text: '我的信用卡账单' },
  ];

  return (
    <div className="absolute inset-0 flex flex-col bg-[#FAFBFF] overflow-hidden">
      {/* 头部 */}
      <div className="bg-white flex-shrink-0 shadow-sm">
        <StatusBar />
        <div className="flex items-center px-4 pb-2.5 gap-2.5">
          <button className="text-[22px] text-gray-700 active:opacity-60 transition-opacity" onClick={goBack}>‹</button>
          <span className="flex-1 text-center text-[17px] font-semibold">AI助理</span>
          <span className="text-lg">🔊</span>
          <span className="text-lg">⋯</span>
        </div>
        {/* Tab切换 */}
        <div className="flex gap-6 px-4 border-b border-gray-100">
          {[
            { id: 'chat' as const, label: '对话' },
            { id: 'mem' as const, label: '我的记忆' },
            { id: 'rules' as const, label: '自动规则' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setGxzTab(tab.id)}
              className={`text-[13.5px] py-2 relative transition-colors ${gxzTab === tab.id ? 'text-[#2E6BED] font-semibold' : 'text-gray-500'}`}
            >
              {tab.label}
              {gxzTab === tab.id && <span className="absolute bottom-[-1px] left-[10%] right-[10%] h-[2px] bg-[#2E6BED] rounded-full transition-all" />}
            </button>
          ))}
        </div>
      </div>

      {/* 内容区 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar" style={{ paddingBottom: gxzTab === 'chat' ? '130px' : '20px', paddingTop: '8px' }}>
        {gxzTab === 'chat' && (
          <>
            <AIKnownPanel />
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-[12px] py-4 animate-fade-in">
                👋 您好！我是AI助理，您的智能金融助手。
                <br />试试点击下方快捷按钮或直接输入问题。
              </div>
            )}
            <div className="px-3 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <MsgBubble key={i} msg={msg} />
              ))}
            </div>
          </>
        )}
        {gxzTab === 'mem' && <MemoryTab />}
        {gxzTab === 'rules' && <RulesTab />}
      </div>

      {/* 输入区 - 仅对话tab显示 */}
      {gxzTab === 'chat' && (
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md px-3 pt-2 pb-8 border-t border-gray-100/80 z-20">
          {/* 快捷操作 */}
          <div className="flex gap-1.5 mb-2 overflow-x-auto no-scrollbar">
            {quickActions.map((qa, i) => (
              <button
                key={i}
                onClick={() => handleSend(qa.text)}
                disabled={loading}
                className="text-[11.5px] px-2.5 py-1.5 rounded-[14px] whitespace-nowrap flex-shrink-0 border border-gray-200 text-gray-500 bg-white active:border-[#2E6BED] active:text-[#2E6BED] active:bg-[#F0F5FF] transition-all disabled:opacity-50"
              >
                {qa.label}
              </button>
            ))}
          </div>
          {/* 输入框 */}
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              placeholder="输入或长按说话..."
              className="flex-1 bg-[#F2F2F5] rounded-[22px] px-4 py-2.5 text-[13.5px] text-gray-900 border-none outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#2E6BED]/20 transition-shadow"
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="w-[38px] h-[38px] rounded-full bg-[#2E6BED] flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 active:opacity-80 active:scale-95 transition-all shadow-md"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
