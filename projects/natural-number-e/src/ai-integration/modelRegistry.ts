/**
 * AI模型注册表
 * 包含23个预设模型 + 自定义模型支持
 * @author PlayWithMath Team
 * @date 2025-12-17
 */

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  apiEndpoint: string;
  modelName: string;
  description: string;
  features?: string[];
  pricing: string;
  freeQuota?: string;
  websiteUrl?: string;
  icon: string;
  recommended?: boolean;
  locale?: 'zh-CN' | 'en-US';
  configurable?: boolean;
  fields?: CustomField[];
}

export interface CustomField {
  key: string;
  label: string;
  type: 'text' | 'url' | 'password' | 'textarea';
  placeholder?: string;
  required: boolean;
}

/**
 * 完整的AI模型列表
 * 国际10个 + 国内11个 + DeepSeek 2个 = 23个预设模型
 */
export const AI_MODELS = {
  // 🌍 国际主流模型 (10个)
  international: [
    {
      id: 'openai-gpt4',
      name: 'OpenAI GPT-4',
      provider: 'OpenAI',
      apiEndpoint: 'https://api.openai.com/v1/chat/completions',
      modelName: 'gpt-4',
      description: '最强大的通用AI模型',
      features: ['逻辑推理强', '数学能力优秀', '多语言支持'],
      pricing: '约$0.03/1K tokens',
      freeQuota: '无',
      websiteUrl: 'https://platform.openai.com',
      icon: '🤖',
      recommended: true
    },
    {
      id: 'openai-gpt4-turbo',
      name: 'OpenAI GPT-4 Turbo',
      provider: 'OpenAI',
      apiEndpoint: 'https://api.openai.com/v1/chat/completions',
      modelName: 'gpt-4-turbo-preview',
      description: '速度更快的GPT-4版本',
      features: ['速度快', '成本更低'],
      pricing: '约$0.01/1K tokens',
      websiteUrl: 'https://platform.openai.com',
      icon: '⚡'
    },
    {
      id: 'openai-gpt35-turbo',
      name: 'OpenAI GPT-3.5 Turbo',
      provider: 'OpenAI',
      apiEndpoint: 'https://api.openai.com/v1/chat/completions',
      modelName: 'gpt-3.5-turbo',
      description: '性价比之选',
      features: ['速度快', '成本低'],
      pricing: '约$0.0015/1K tokens',
      websiteUrl: 'https://platform.openai.com',
      icon: '💰',
      recommended: true
    },
    {
      id: 'anthropic-claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      apiEndpoint: 'https://api.anthropic.com/v1/messages',
      modelName: 'claude-3-opus-20240229',
      description: '擅长复杂推理和数学',
      features: ['思维链条清晰', '解释详细', '数学推理强'],
      pricing: '约$0.015/1K tokens',
      websiteUrl: 'https://www.anthropic.com',
      icon: '🎭'
    },
    {
      id: 'anthropic-claude-3-sonnet',
      name: 'Claude 3 Sonnet',
      provider: 'Anthropic',
      apiEndpoint: 'https://api.anthropic.com/v1/messages',
      modelName: 'claude-3-sonnet-20240229',
      description: '平衡性能与成本',
      features: ['均衡表现'],
      pricing: '约$0.003/1K tokens',
      websiteUrl: 'https://www.anthropic.com',
      icon: '🎼'
    },
    {
      id: 'google-gemini-pro',
      name: 'Google Gemini Pro',
      provider: 'Google',
      apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      modelName: 'gemini-pro',
      description: 'Google最新AI模型',
      features: ['多模态能力', '有免费额度'],
      pricing: '有免费额度',
      freeQuota: '60次/分钟',
      websiteUrl: 'https://ai.google.dev',
      icon: '💎',
      recommended: true
    },
    {
      id: 'google-gemini-ultra',
      name: 'Google Gemini Ultra',
      provider: 'Google',
      apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-ultra:generateContent',
      modelName: 'gemini-ultra',
      description: '最强性能版本',
      features: ['顶级性能'],
      pricing: '按量计费',
      websiteUrl: 'https://ai.google.dev',
      icon: '🌟'
    },
    {
      id: 'meta-llama3-70b',
      name: 'Meta Llama 3 70B',
      provider: 'Meta (via Together.ai)',
      apiEndpoint: 'https://api.together.xyz/v1/chat/completions',
      modelName: 'meta-llama/Llama-3-70b-chat-hf',
      description: '开源最强模型',
      features: ['开源可控', '数学能力强'],
      pricing: '约$0.0008/1K tokens',
      websiteUrl: 'https://www.together.ai',
      icon: '🦙'
    },
    {
      id: 'mistral-large',
      name: 'Mistral Large',
      provider: 'Mistral AI',
      apiEndpoint: 'https://api.mistral.ai/v1/chat/completions',
      modelName: 'mistral-large-latest',
      description: '欧洲顶级AI模型',
      features: ['多语言支持'],
      pricing: '约$0.004/1K tokens',
      websiteUrl: 'https://mistral.ai',
      icon: '🇪🇺'
    },
    {
      id: 'cohere-command-r-plus',
      name: 'Cohere Command R+',
      provider: 'Cohere',
      apiEndpoint: 'https://api.cohere.ai/v1/chat',
      modelName: 'command-r-plus',
      description: '企业级AI助手',
      features: ['企业级安全'],
      pricing: '约$0.003/1K tokens',
      websiteUrl: 'https://cohere.com',
      icon: '🔷'
    }
  ],

  // 🇨🇳 国内主流模型 (11个)
  domestic: [
    {
      id: 'zhipu-glm4',
      name: '智谱 GLM-4',
      provider: '智谱AI',
      apiEndpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      modelName: 'glm-4',
      description: '国内顶尖AI大模型',
      features: ['中文理解好', '数学推理强', '逻辑清晰'],
      pricing: '约¥0.1/千tokens',
      freeQuota: '新用户送1800万tokens',
      websiteUrl: 'https://open.bigmodel.cn',
      icon: '🧠',
      recommended: true,
      locale: 'zh-CN'
    },
    {
      id: 'zhipu-glm4-air',
      name: '智谱 GLM-4-Air',
      provider: '智谱AI',
      apiEndpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      modelName: 'glm-4-air',
      description: '免费版本，速度快',
      features: ['完全免费', '速度快'],
      pricing: '免费',
      freeQuota: '无限制（有速率限制）',
      websiteUrl: 'https://open.bigmodel.cn',
      icon: '🆓',
      recommended: true,
      locale: 'zh-CN'
    },
    {
      id: 'baidu-ernie-4',
      name: '百度文心一言 4.0',
      provider: '百度',
      apiEndpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
      modelName: 'ERNIE-4.0-8K',
      description: '文心大模型旗舰版',
      features: ['中文理解优秀', '多轮对话'],
      pricing: '约¥0.12/千tokens',
      freeQuota: '新用户送100万tokens',
      websiteUrl: 'https://cloud.baidu.com/product/wenxinworkshop',
      icon: '🐻',
      locale: 'zh-CN'
    },
    {
      id: 'baidu-ernie-35',
      name: '百度文心一言 3.5',
      provider: '百度',
      apiEndpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
      modelName: 'ERNIE-3.5-8K',
      description: '性价比版本',
      features: ['性价比高'],
      pricing: '约¥0.012/千tokens',
      websiteUrl: 'https://cloud.baidu.com/product/wenxinworkshop',
      icon: '🐼',
      locale: 'zh-CN'
    },
    {
      id: 'alibaba-qwen-max',
      name: '阿里通义千问 Max',
      provider: '阿里云',
      apiEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      modelName: 'qwen-max',
      description: '通义千问最强版',
      features: ['推理能力强', '多语言'],
      pricing: '约¥0.12/千tokens',
      freeQuota: '新用户送100万tokens',
      websiteUrl: 'https://help.aliyun.com/zh/dashscope',
      icon: '🔶',
      locale: 'zh-CN'
    },
    {
      id: 'alibaba-qwen-plus',
      name: '阿里通义千问 Plus',
      provider: '阿里云',
      apiEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      modelName: 'qwen-plus',
      description: '平衡性能与成本',
      features: ['性价比高'],
      pricing: '约¥0.008/千tokens',
      websiteUrl: 'https://help.aliyun.com/zh/dashscope',
      icon: '🟧',
      locale: 'zh-CN'
    },
    {
      id: 'xfyun-spark-max',
      name: '讯飞星火 Max',
      provider: '科大讯飞',
      apiEndpoint: 'wss://spark-api.xf-yun.com/v3.5/chat',
      modelName: 'generalv3.5',
      description: '讯飞星火最强版',
      features: ['语音能力强', '多模态'],
      pricing: '约¥0.036/千tokens',
      freeQuota: '新用户送200万tokens',
      websiteUrl: 'https://xinghuo.xfyun.cn/sparkapi',
      icon: '✨',
      locale: 'zh-CN'
    },
    {
      id: 'xfyun-spark-pro',
      name: '讯飞星火 Pro',
      provider: '科大讯飞',
      apiEndpoint: 'wss://spark-api.xf-yun.com/v3.1/chat',
      modelName: 'generalv3',
      description: '性价比选择',
      features: ['性价比高'],
      pricing: '约¥0.003/千tokens',
      websiteUrl: 'https://xinghuo.xfyun.cn/sparkapi',
      icon: '⚡',
      locale: 'zh-CN'
    },
    {
      id: 'moonshot-v1',
      name: 'Moonshot（Kimi）',
      provider: '月之暗面',
      apiEndpoint: 'https://api.moonshot.cn/v1/chat/completions',
      modelName: 'moonshot-v1-8k',
      description: '超长上下文，擅长理解',
      features: ['长文本处理', '理解能力强', '上下文32K'],
      pricing: '约¥0.012/千tokens',
      freeQuota: '新用户送15元',
      websiteUrl: 'https://platform.moonshot.cn',
      icon: '🌙',
      locale: 'zh-CN'
    },
    {
      id: 'baichuan-2',
      name: '百川智能 Baichuan2',
      provider: '百川智能',
      apiEndpoint: 'https://api.baichuan-ai.com/v1/chat/completions',
      modelName: 'Baichuan2-Turbo',
      description: '开源友好的大模型',
      features: ['开源友好', '性价比高'],
      pricing: '约¥0.008/千tokens',
      freeQuota: '新用户送100万tokens',
      websiteUrl: 'https://platform.baichuan-ai.com',
      icon: '🏔️',
      locale: 'zh-CN'
    },
    {
      id: 'minimax-abab',
      name: 'MiniMax ABAB',
      provider: 'MiniMax',
      apiEndpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
      modelName: 'abab6-chat',
      description: '多模态能力强',
      features: ['多模态', '语音生成'],
      pricing: '约¥0.015/千tokens',
      websiteUrl: 'https://www.minimaxi.com',
      icon: '🎨',
      locale: 'zh-CN'
    }
  ],

  // 🔍 DeepSeek系列 (2个)
  deepseek: [
    {
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      provider: 'DeepSeek',
      apiEndpoint: 'https://api.deepseek.com/v1/chat/completions',
      modelName: 'deepseek-chat',
      description: '深度求索通用对话模型',
      features: ['中英双语', '逻辑推理强', '代码能力优秀', '超高性价比'],
      pricing: '约¥0.001/千tokens（超低价）',
      freeQuota: '新用户送500万tokens',
      websiteUrl: 'https://platform.deepseek.com',
      icon: '🔍',
      recommended: true,
      locale: 'zh-CN'
    },
    {
      id: 'deepseek-coder',
      name: 'DeepSeek Coder',
      provider: 'DeepSeek',
      apiEndpoint: 'https://api.deepseek.com/v1/chat/completions',
      modelName: 'deepseek-coder',
      description: '专注代码和数学推理',
      features: ['数学推理顶尖', '代码生成优秀', '适合技术讲解'],
      pricing: '约¥0.001/千tokens',
      websiteUrl: 'https://platform.deepseek.com',
      icon: '💻',
      locale: 'zh-CN'
    }
  ],

  // ⚙️ 自定义模型配置
  custom: {
    id: 'custom-model',
    name: '自定义模型',
    provider: '自定义',
    apiEndpoint: '',
    modelName: '',
    description: '支持任何兼容OpenAI格式的API（包括Ollama本地模型、第三方代理等）',
    features: ['完全自定义', '支持本地部署', '隐私保护'],
    pricing: '取决于您的配置',
    icon: '⚙️',
    configurable: true,
    fields: [
      {
        key: 'name',
        label: '配置名称',
        type: 'text',
        placeholder: '给这个配置起个名字，如：我的本地Llama',
        required: true
      },
      {
        key: 'apiEndpoint',
        label: 'API端点',
        type: 'url',
        placeholder: 'https://api.example.com/v1/chat/completions',
        required: true
      },
      {
        key: 'modelName',
        label: '模型名称',
        type: 'text',
        placeholder: 'gpt-3.5-turbo 或 llama2:7b',
        required: true
      },
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        placeholder: '如果需要认证请填写（可选）',
        required: false
      },
      {
        key: 'headers',
        label: '自定义请求头 (JSON格式)',
        type: 'textarea',
        placeholder: '{"X-Custom-Header": "value"}',
        required: false
      },
      {
        key: 'systemPrompt',
        label: '系统提示词（可选）',
        type: 'textarea',
        placeholder: '你是一个专业的数学助教，擅长用通俗易懂的方式解释数学概念...',
        required: false
      }
    ]
  }
};

// 推荐模型配置
export const RECOMMENDED_MODELS = {
  // 免费首选
  bestFree: ['zhipu-glm4-air', 'google-gemini-pro'],
  
  // 性价比之选
  bestValue: ['deepseek-chat', 'openai-gpt35-turbo', 'zhipu-glm4', 'alibaba-qwen-plus'],
  
  // 质量最佳
  bestQuality: ['openai-gpt4', 'anthropic-claude-3-opus', 'zhipu-glm4'],
  
  // 数学专项推荐
  bestForMath: ['openai-gpt4', 'anthropic-claude-3-opus', 'deepseek-coder', 'zhipu-glm4'],
  
  // 学生推荐（免费或低成本）
  studentsChoice: ['zhipu-glm4-air', 'deepseek-chat', 'google-gemini-pro', 'moonshot-v1']
};

/**
 * 获取所有模型列表
 */
export function getAllModels(): AIModel[] {
  return [
    ...AI_MODELS.international,
    ...AI_MODELS.domestic,
    ...AI_MODELS.deepseek,
    AI_MODELS.custom as AIModel
  ];
}

/**
 * 根据ID获取模型
 */
export function getModelById(id: string): AIModel | undefined {
  return getAllModels().find(model => model.id === id);
}

/**
 * 获取推荐模型
 */
export function getRecommendedModels(): AIModel[] {
  return getAllModels().filter(model => model.recommended);
}

/**
 * 按地区筛选模型
 */
export function getModelsByLocale(locale: 'zh-CN' | 'en-US' | 'all' = 'all'): AIModel[] {
  if (locale === 'all') return getAllModels();
  return getAllModels().filter(model => model.locale === locale || !model.locale);
}
