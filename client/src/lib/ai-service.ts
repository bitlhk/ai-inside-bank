import { AI_CONFIG, DB } from './data';

export interface CardData {
  type: 'rule' | 'analysis' | 'tx';
  data: any;
}

export interface AIResponse {
  text: string;
  cards: CardData[];
  isCloseRule?: boolean;
  closeKeyword?: string;
}

const FIN_KEYWORDS = [
  '消费', '账单', '转账', '理财', '存款', '余额', '账户', '基金', '保险',
  '信用卡', '还款', '支出', '收入', '收支', '交易', '到期', '规则', '自动',
  '缴费', '工资', '定期', '活期', '持仓', '资产', '负债', '利率', '收益',
  '分期', '贷款', '汇款', '限额', '扣款', '归集', '留', '买', '天天盈',
  '鑫享', '货币', '保障', '赵丽华', '妈妈', '母亲', '房东', '陈浩宇'
];

const CLOSE_INTENTS = ['暂停', '关闭', '取消', '停止'];

function isFinanceQuery(text: string): boolean {
  return FIN_KEYWORDS.some(k => text.includes(k));
}

function isCloseRuleIntent(text: string): boolean {
  return CLOSE_INTENTS.some(k => text.includes(k)) &&
    (text.includes('自动') || text.includes('规则') || text.includes('转账'));
}

// 本地规则匹配处理（不需要大模型）
export function handleLocalQuery(text: string): AIResponse | null {
  // 关闭规则
  if (isCloseRuleIntent(text)) {
    const nameMatch = text.match(/(?:给|向)([\u4e00-\u9fa5]{2,4})/);
    return {
      text: '',
      cards: [],
      isCloseRule: true,
      closeKeyword: nameMatch ? nameMatch[1] : '转账'
    };
  }

  // 消费分析
  if (text.includes('消费') && (text.includes('分析') || text.includes('情况'))) {
    return {
      text: '为您分析本月消费：',
      cards: [{
        type: 'analysis',
        data: {
          title: '2月消费分析',
          bars: DB.expense.cats.map(c => ({ label: c.name, value: c.amount, pct: c.pct, color: c.color })),
          total: { label: '本月总支出', value: '¥' + DB.expense.total.toLocaleString() },
          insight: `餐饮占比最高30%，较上月+23%。储蓄率${((1 - DB.expense.total / DB.expense.income) * 100).toFixed(0)}%，优于同龄平均。`
        }
      }]
    };
  }

  // 交易记录
  if (text.includes('交易') || text.includes('转账记录')) {
    return {
      text: '最近转账记录：',
      cards: [{
        type: 'tx',
        data: {
          title: '最近转账记录',
          rows: DB.transfers.slice(0, 8).map(x => ({
            date: x.date + ' · ' + x.bank,
            desc: '转给 ' + x.to,
            amount: '-¥' + x.amount.toLocaleString()
          }))
        }
      }]
    };
  }

  // 理财到期
  if (text.includes('理财') && (text.includes('到期') || text.includes('情况'))) {
    return {
      text: '理财持仓和到期情况：',
      cards: [{
        type: 'rule',
        data: {
          title: '理财持仓总览',
          rows: [
            { label: '定期存款', value: '¥200,000 · 2月15日到期' },
            { label: '工银理财·鑫享固收30天', value: '¥50,000 · 3月1日到期' },
            { label: '天天盈1号(货币基金)', value: '¥32,380.56 · 随时可取' },
            { label: '工银安盈保障计划', value: '年缴¥12,000 保额¥50万' }
          ],
          isInfo: true,
          insight: '定期存款20万将于明天到期，建议提前规划续接。'
        }
      }]
    };
  }

  // 自动转账设置
  if (text.includes('自动') && (text.includes('转账') || text.includes('妈') || text.includes('母亲'))) {
    return {
      text: '为您设置自动转账规则：',
      cards: [{
        type: 'rule',
        data: {
          title: '自动转账规则',
          rows: [
            { label: '触发', value: '每月15日' },
            { label: '收款人', value: '赵丽华(母亲)' },
            { label: '账户', value: '6217****2303 建设银行' },
            { label: '金额', value: '¥2,000' },
            { label: '付款', value: '活期 6222****8862' }
          ],
          confirmText: '确认开启',
          isRule: true
        }
      }]
    };
  }

  // 信用卡/账单
  if (text.includes('信用卡') || text.includes('账单')) {
    return {
      text: `信用卡（牡丹超惠卡 尾号6677）：\n\n本期账单：¥4,328.50\n还款日：2月18日（还有4天）\n额度：¥50,000 已用8.7%`,
      cards: [{
        type: 'tx',
        data: {
          title: '近期信用卡消费',
          rows: DB.creditCard.bills.slice(0, 6).map(b => ({
            date: b.date,
            desc: b.desc + ' [' + b.cat + ']',
            amount: '¥' + Math.abs(b.amount).toFixed(2)
          }))
        }
      }]
    };
  }

  // 余额/账户 (排除"余额留"这种操作型指令)
  if ((text.includes('余额') && !text.includes('留') && !text.includes('买')) || (text.includes('账户') && !text.includes('买'))) {
    const total = DB.accounts.reduce((s, a) => s + a.balance, 0) +
      DB.finance.reduce((s, f) => s + ((f as any).amount || 0), 0);
    return {
      text: `账户概览：\n\n活期：¥${DB.accounts[0].balance.toLocaleString()}\n定期：¥${DB.accounts[1].balance.toLocaleString()}(${DB.accounts[1].maturityDate}到期)\n理财：¥${(DB.finance[0] as any).amount.toLocaleString()}\n货基：¥${(DB.finance[1] as any).amount.toLocaleString()}\n\n总资产约 ¥${total.toLocaleString()}`,
      cards: []
    };
  }

  // 规则查询
  if (text.includes('规则') || (text.includes('自动') && !text.includes('转账'))) {
    return {
      text: '当前自动规则：\n\n1. 💰 工资归集(运行中) - 留¥8,000余额转天天盈\n2. 📱 自动缴费(运行中) - 电费燃气费\n3. 💳 信用卡还款(已暂停) - 全额每月18日\n\n可说"启用信用卡自动还款"来管理。',
      cards: []
    };
  }

  return null;
}

// 调用大模型
export async function callAI(
  text: string,
  chatHistory: { role: string; content: string }[]
): Promise<AIResponse> {
  // 先尝试本地规则
  if (!isFinanceQuery(text)) {
    return {
      text: '抱歉，我是您的金融助手工小智，主要为您提供账户查询、消费分析、理财管理、转账设置等金融服务。\n\n您可以试试：\n📊 消费分析\n💰 理财到期查询\n🔍 交易记录\n⚙ 设置自动转账\n💳 信用卡账单',
      cards: []
    };
  }

  const localResult = handleLocalQuery(text);
  if (localResult) return localResult;

  // 需要大模型处理的复杂场景
  const sys = `你是工商银行手机银行AI助手"工小智"，只处理金融相关问题。非金融问题请拒绝回答。用户数据：${JSON.stringify(DB)}
回复规则：简洁中文，引用真实数据，不用markdown。设置规则输出===RULE_CARD===JSON===END_CARD===，消费分析输出===ANALYSIS_CARD===JSON===END_CARD===，交易查询输出===TX_CARD===JSON===END_CARD===。JSON格式：RULE_CARD:{"title":"x","rows":[{"label":"x","value":"x"}],"confirmText":"x","isRule":true} ANALYSIS_CARD:{"title":"x","bars":[{"label":"x","value":0,"pct":0,"color":"#xxx"}],"total":{"label":"x","value":"x"},"insight":"x"} TX_CARD:{"title":"x","rows":[{"date":"x","desc":"x","amount":"x"}]}
重要：当用户说"余额留X，其余买天天盈"这种复杂业务时，你需要：1.理解意图 2.计算具体金额 3.生成规则卡片。例如余额留5000其余买天天盈，活期86520-5000=81520，生成规则卡片操作为"从活期转¥81,520到天天盈"。`;

  try {
    const r = await fetch(AI_CONFIG.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AI_CONFIG.key}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        max_tokens: 1000,
        messages: [
          { role: "system", content: sys },
          ...chatHistory.slice(-16),
          { role: "user", content: text }
        ]
      })
    });

    const d = await r.json();
    let reply = d.choices?.[0]?.message?.content || '';

    if (!reply) {
      return {
        text: '我可以帮您：\n\n📊 消费分析\n💰 理财到期查询\n🔍 交易记录\n⚙ 设置自动转账/还款\n💳 信用卡账单\n💵 账户余额\n\n直接告诉我您需要什么！',
        cards: []
      };
    }

    // 解析卡片
    const cards: CardData[] = [];
    const cardTypes = ['RULE_CARD', 'ANALYSIS_CARD', 'TX_CARD'] as const;
    const typeMap = { RULE_CARD: 'rule', ANALYSIS_CARD: 'analysis', TX_CARD: 'tx' } as const;
    let textParts: string[] = [];
    let foundCard = false;

    for (const ct of cardTypes) {
      if (reply.includes('===' + ct + '===')) {
        foundCard = true;
        const parts = reply.split('===' + ct + '===');
        const before = parts[0].trim();
        const rest = parts[1].split('===END_CARD===');
        const cardJson = rest[0].trim();
        const after = (rest[1] || '').trim();

        if (before) textParts.push(before);
        if (after) textParts.push(after);

        try {
          const cardData = JSON.parse(cardJson);
          cards.push({ type: typeMap[ct], data: cardData });
        } catch {
          textParts.push(cardJson);
        }
        break;
      }
    }

    if (!foundCard) textParts.push(reply);

    // 检测关闭规则
    const closeKw = ['已关闭', '已暂停', '已停止', '已取消', '停用成功', '关闭成功', '暂停成功'];
    let isClose = isCloseRuleIntent(text) || closeKw.some(k => reply.includes(k));
    let closeKeyword = '';
    if (isClose) {
      const pKw = ['转账', '还款', '缴费', '归集'];
      for (const pk of pKw) {
        if (reply.includes(pk) || text.includes(pk)) { closeKeyword = pk; break; }
      }
      const nameMatch = text.match(/(?:给|向)([\u4e00-\u9fa5]{2,4})/);
      if (nameMatch) closeKeyword = nameMatch[1];
    }

    return {
      text: textParts.join('\n\n'),
      cards,
      isCloseRule: isClose,
      closeKeyword
    };
  } catch {
    // fallback to local
    const local = handleLocalQuery(text);
    if (local) return local;
    return {
      text: '网络暂时不稳定，请稍后再试。您也可以直接使用快捷功能。',
      cards: []
    };
  }
}
