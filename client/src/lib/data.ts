// 手机银行 AI Inside Demo - 数据模型
// 模拟客户真实持仓、存款、理财、余额信息

export const DB = {
  user: { name: "李泓锟", level: "三星级" },
  accounts: [
    { type: "活期", number: "6222****8862", balance: 86520, bank: "银行" },
    { type: "定期", number: "6222****8863", balance: 200000, bank: "银行", maturityDate: "2026-02-15", rate: "2.15%" }
  ],
  creditCard: {
    name: "尊享白金卡",
    number: "5288****6677",
    limit: 50000,
    used: 4328.50,
    billDate: "2026-02-18",
    bills: [
      { date: "2026-02-07", desc: "美团外卖", amount: -86.5, cat: "餐饮" },
      { date: "2026-02-06", desc: "盒马鲜生", amount: -234.8, cat: "餐饮" },
      { date: "2026-02-05", desc: "京东商城", amount: -899, cat: "网购" },
      { date: "2026-02-04", desc: "星巴克", amount: -42, cat: "餐饮" },
      { date: "2026-02-03", desc: "滴滴出行", amount: -35.6, cat: "交通" },
      { date: "2026-02-02", desc: "中国石化", amount: -420, cat: "交通" },
      { date: "2026-02-01", desc: "美团外卖", amount: -68, cat: "餐饮" },
      { date: "2026-01-30", desc: "淘宝", amount: -356, cat: "网购" },
      { date: "2026-01-28", desc: "海底捞", amount: -286, cat: "餐饮" },
      { date: "2026-01-25", desc: "京东商城", amount: -1200, cat: "网购" }
    ]
  },
  finance: [
    { name: "稳享固收30天理财", amount: 50000, rate: "2.85%", risk: "R2", gain: 286.4, maturity: "2026-03-01", type: "理财" },
    { name: "天天盈1号(货币基金)", amount: 32380.56, rate: "2.15%", risk: "R1", gain: 12.35, maturity: null, type: "基金" },
    { name: "安盈保障计划", annualPay: 12000, coverage: 500000, nextPay: "2026-05-01", type: "保险" }
  ],
  transfers: [
    { date: "2026-01-28", to: "陈浩宇(同事)", bank: "银行", amount: 300, acct: "6222****1188" },
    { date: "2026-01-15", to: "赵丽华(母亲)", bank: "建设银行", amount: 2000, acct: "6217****2303" },
    { date: "2026-01-10", to: "李泓锟", bank: "华夏银行", amount: 10000, acct: "6230****9540" },
    { date: "2025-12-15", to: "赵丽华(母亲)", bank: "建设银行", amount: 2000, acct: "6217****2303" },
    { date: "2025-12-10", to: "刘先生(房东)", bank: "中国银行", amount: 4500, acct: "6216****3350" },
    { date: "2025-12-05", to: "陈浩宇(同事)", bank: "银行", amount: 500, acct: "6222****1188" },
    { date: "2025-11-15", to: "赵丽华(母亲)", bank: "建设银行", amount: 2000, acct: "6217****2303" },
    { date: "2025-11-10", to: "刘先生(房东)", bank: "中国银行", amount: 4500, acct: "6216****3350" }
  ],
  contacts: [
    { name: "赵丽华", relation: "母亲", bank: "建设银行", acct: "6217****2303", initial: "赵", color: "#2E7BC8" },
    { name: "李泓锟", relation: "", bank: "华夏银行", acct: "6230****9540", initial: "李", color: "#C41230" },
    { name: "李泓锟", relation: "", bank: "中国银行", acct: "6217****7335", initial: "李", color: "#C41230" },
    { name: "陈浩宇", relation: "同事", bank: "银行", acct: "6222****1188", initial: "陈", color: "#E8394A" },
    { name: "刘先生", relation: "房东", bank: "中国银行", acct: "6216****3350", initial: "刘", color: "#666" }
  ],
  expense: {
    total: 12847.3,
    income: 25600,
    cats: [
      { name: "餐饮", amount: 3860, pct: 30, color: "#E8394A" },
      { name: "房租", amount: 4500, pct: 35, color: "#2E6BED" },
      { name: "网购", amount: 2100, pct: 16, color: "#F59E0B" },
      { name: "交通", amount: 1287, pct: 10, color: "#10B981" },
      { name: "其他", amount: 1100.3, pct: 9, color: "#8B5CF6" }
    ]
  }
};

// 自动规则初始数据
export interface AutoRule {
  id: string;
  title: string;
  icon: string;
  status: 'running' | 'paused';
  rows: { label: string; value: string }[];
}

export const defaultRules: AutoRule[] = [
  {
    id: 'rule-salary',
    title: '工资自动归集',
    icon: '💰',
    status: 'running',
    rows: [
      { label: '触发', value: '工资入账时' },
      { label: '操作', value: '留¥8,000 余额转天天盈' }
    ]
  },
  {
    id: 'rule-bill',
    title: '自动缴费',
    icon: '📱',
    status: 'running',
    rows: [
      { label: '项目', value: '电费、燃气费' },
      { label: '方式', value: '余额不足时自动缴纳' }
    ]
  },
  {
    id: 'rule-cc',
    title: '信用卡自动还款',
    icon: '💳',
    status: 'paused',
    rows: [
      { label: '方式', value: '全额还款 每月18日前' },
      { label: '付款账户', value: '活期 6222****8862' }
    ]
  }
];

// AI API 配置 - 使用代理路径避免CORS
export const AI_CONFIG = {
  url: "/api/ai/chat/completions",
  key: "i0tyooAdw2LdT4YQXTSdQFiHRTm9X_BunE9Olh4niYAZDO4OjXcGbkNArJl6MynU88U7lihpIhOOgShih0eJMA",
  model: "DeepSeek-V3"
};
