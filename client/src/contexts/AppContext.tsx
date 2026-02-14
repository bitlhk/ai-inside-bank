import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { defaultRules, type AutoRule } from '@/lib/data';

type PageId = 'home' | 'cc' | 'wealth' | 'life' | 'prof' | 'gxz' | 'xfer' | 'repay' | 'deposit-plan';

interface AppState {
  currentPage: PageId;
  prevPage: PageId;
  gxzTab: 'chat' | 'mem' | 'rules';
  rules: AutoRule[];
  chatHistory: { role: string; content: string }[];
  showRepaySuccess: boolean;
}

interface AppContextType extends AppState {
  goTab: (id: PageId) => void;
  goPage: (id: PageId) => void;
  goBack: () => void;
  setGxzTab: (tab: 'chat' | 'mem' | 'rules') => void;
  addRule: (rule: AutoRule) => void;
  removeRule: (id: string) => void;
  toggleRule: (id: string) => void;
  removeRuleByKeyword: (keyword: string) => boolean;
  addChatMessage: (msg: { role: string; content: string }) => void;
  trimChatHistory: () => void;
  setShowRepaySuccess: (v: boolean) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentPage: 'home',
    prevPage: 'home',
    gxzTab: 'chat',
    rules: defaultRules,
    chatHistory: [],
    showRepaySuccess: false,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const goTab = useCallback((id: PageId) => {
    setState(s => ({
      ...s,
      currentPage: id,
      prevPage: ['gxz', 'xfer', 'repay', 'deposit-plan'].includes(id) ? s.prevPage : id,
    }));
  }, []);

  const goPage = useCallback((id: PageId) => {
    setState(s => ({ ...s, currentPage: id }));
  }, []);

  const goBack = useCallback(() => {
    setState(s => ({ ...s, currentPage: s.prevPage }));
  }, []);

  const setGxzTab = useCallback((tab: 'chat' | 'mem' | 'rules') => {
    setState(s => ({ ...s, gxzTab: tab }));
  }, []);

  const addRule = useCallback((rule: AutoRule) => {
    setState(s => ({ ...s, rules: [...s.rules, rule] }));
  }, []);

  const removeRule = useCallback((id: string) => {
    setState(s => ({ ...s, rules: s.rules.filter(r => r.id !== id) }));
  }, []);

  const toggleRule = useCallback((id: string) => {
    setState(s => ({
      ...s,
      rules: s.rules.map(r =>
        r.id === id ? { ...r, status: r.status === 'running' ? 'paused' as const : 'running' as const } : r
      )
    }));
  }, []);

  const removeRuleByKeyword = useCallback((keyword: string): boolean => {
    let found = false;
    setState(s => {
      const newRules = s.rules.filter(r => {
        const match = r.title.includes(keyword) || r.rows.some(row => row.value.includes(keyword));
        if (match) found = true;
        return !match;
      });
      return { ...s, rules: newRules };
    });
    return found;
  }, []);

  const addChatMessage = useCallback((msg: { role: string; content: string }) => {
    setState(s => ({ ...s, chatHistory: [...s.chatHistory, msg] }));
  }, []);

  const trimChatHistory = useCallback(() => {
    setState(s => ({
      ...s,
      chatHistory: s.chatHistory.length > 20 ? s.chatHistory.slice(-16) : s.chatHistory
    }));
  }, []);

  const setShowRepaySuccess = useCallback((v: boolean) => {
    setState(s => ({ ...s, showRepaySuccess: v }));
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      goTab, goPage, goBack, setGxzTab,
      addRule, removeRule, toggleRule, removeRuleByKeyword,
      addChatMessage, trimChatHistory, setShowRepaySuccess,
      scrollRef,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
