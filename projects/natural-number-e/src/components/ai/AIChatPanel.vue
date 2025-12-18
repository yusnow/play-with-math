<template>
  <div class="ai-chat-panel" :class="{ 'visible': visible }">
    <!-- 顶部栏 -->
    <div class="panel-header">
      <div class="header-left">
        <el-icon class="ai-icon"><Promotion /></el-icon>
        <span class="header-title">AI 学习助手</span>
        <el-tag size="small" type="success" v-if="currentModel">
          {{ getModelName(currentModel) }}
        </el-tag>
      </div>
      
      <div class="header-actions">
        <el-button 
          size="small" 
          :icon="Setting" 
          circle 
          @click="showSettings = true"
          title="设置"
        />
        <el-button 
          size="small" 
          :icon="Close" 
          circle 
          @click="emit('close')"
          title="关闭"
        />
      </div>
    </div>

    <!-- 聊天消息区 -->
    <div class="messages-container" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty-state">
        <div class="empty-icon">🤖</div>
        <p class="empty-text">你好!我是AI学习助手</p>
        <p class="empty-hint">有什么关于数学常数e的问题吗?</p>
        
        <!-- 快速问题 -->
        <div class="quick-questions">
          <div 
            v-for="(question, index) in quickQuestions" 
            :key="index"
            class="quick-question-btn"
            @click="sendQuickQuestion(question)"
          >
            {{ question }}
          </div>
        </div>
      </div>
      
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        class="message-item"
        :class="`message-${message.role}`"
      >
        <div class="message-avatar">
          <el-icon v-if="message.role === 'assistant'"><Service /></el-icon>
          <el-icon v-else><User /></el-icon>
        </div>
        
        <div class="message-content">
          <div class="message-text" v-html="formatMessage(message.content)"></div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
      
      <div v-if="isLoading" class="message-item message-assistant">
        <div class="message-avatar">
          <el-icon><Service /></el-icon>
        </div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区 -->
    <div class="input-container">
      <el-input
        v-model="inputText"
        type="textarea"
        :rows="3"
        placeholder="输入你的问题..."
        @keydown.ctrl.enter="sendMessage"
        :disabled="!currentModel || !apiKey"
      />
      
      <div class="input-actions">
        <div class="input-hint">
          <span v-if="!currentModel">请先选择AI模型</span>
          <span v-else-if="!apiKey">请先配置API Key</span>
          <span v-else>Ctrl + Enter 发送</span>
        </div>
        
        <el-button 
          type="primary" 
          :icon="Promotion"
          @click="sendMessage"
          :disabled="!inputText.trim() || !currentModel || !apiKey || isLoading"
          :loading="isLoading"
        >
          发送
        </el-button>
      </div>
    </div>

    <!-- 设置对话框 -->
    <el-dialog 
      v-model="showSettings" 
      title="AI 助手设置" 
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="settings-content">
        <!-- 模型选择 -->
        <div class="setting-section">
          <h4 class="setting-title">选择 AI 模型</h4>
          
          <el-tabs v-model="modelCategory">
            <el-tab-pane label="国际模型" name="international">
              <div class="models-grid">
                <div 
                  v-for="model in internationalModels" 
                  :key="model.id"
                  class="model-card"
                  :class="{ 'selected': currentModel === model.id }"
                  @click="selectModel(model.id)"
                >
                  <div class="model-name">{{ model.name }}</div>
                  <div class="model-provider">{{ model.provider }}</div>
                  <div class="model-features">
                    <el-tag v-for="feature in model.features" :key="feature" size="small">
                      {{ feature }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="国产模型" name="domestic">
              <div class="models-grid">
                <div 
                  v-for="model in domesticModels" 
                  :key="model.id"
                  class="model-card"
                  :class="{ 'selected': currentModel === model.id }"
                  @click="selectModel(model.id)"
                >
                  <div class="model-name">{{ model.name }}</div>
                  <div class="model-provider">{{ model.provider }}</div>
                  <div class="model-features">
                    <el-tag v-for="feature in model.features" :key="feature" size="small">
                      {{ feature }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="自定义" name="custom">
              <el-form label-width="120px">
                <el-form-item label="模型名称">
                  <el-input v-model="customModel.name" placeholder="例如: my-custom-model" />
                </el-form-item>
                <el-form-item label="API 端点">
                  <el-input v-model="customModel.endpoint" placeholder="https://api.example.com/v1/chat/completions" />
                </el-form-item>
                <el-form-item label="API Key">
                  <el-input v-model="customModel.apiKey" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveCustomModel">保存自定义模型</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- API Key 配置 -->
        <div class="setting-section" v-if="currentModel && !isCustomModel">
          <h4 class="setting-title">API Key 配置</h4>
          <el-alert 
            type="info" 
            :closable="false"
            show-icon
            style="margin-bottom: 1rem;"
          >
            <template #title>
              你的 API Key 仅保存在本地浏览器,不会上传到服务器
            </template>
          </el-alert>
          
          <el-input
            v-model="apiKey"
            type="password"
            show-password
            placeholder="输入你的 API Key"
            @change="saveApiKey"
          >
            <template #prepend>API Key</template>
          </el-input>
          
          <div class="api-key-hint">
            <p>如何获取 API Key?</p>
            <a :href="getModelDocUrl(currentModel)" target="_blank">
              查看 {{ getModelName(currentModel) }} 官方文档 →
            </a>
          </div>
        </div>

        <!-- 高级设置 -->
        <div class="setting-section">
          <h4 class="setting-title">高级设置</h4>
          
          <el-form label-width="120px">
            <el-form-item label="Temperature">
              <el-slider 
                v-model="temperature" 
                :min="0" 
                :max="2" 
                :step="0.1"
                show-input
                @change="saveSettings"
              />
              <span class="setting-hint">控制回答的随机性 (0=确定, 2=创造性)</span>
            </el-form-item>
            
            <el-form-item label="Max Tokens">
              <el-input-number 
                v-model="maxTokens" 
                :min="100" 
                :max="4000" 
                :step="100"
                @change="saveSettings"
              />
              <span class="setting-hint">单次回答的最大长度</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="showSettings = false">关闭</el-button>
        <el-button type="danger" @click="clearHistory">清空聊天记录</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { Promotion, Setting, Close, Service, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { marked } from 'marked'
import CryptoJS from 'crypto-js'
import { MODEL_REGISTRY } from '@/ai-integration/modelRegistry'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface Props {
  visible: boolean
  context?: string  // 当前页面上下文
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

// 状态
const messages = ref<Message[]>([])
const inputText = ref('')
const isLoading = ref(false)
const showSettings = ref(false)
const modelCategory = ref('domestic')

// 配置
const currentModel = ref<string>('')
const apiKey = ref<string>('')
const temperature = ref(0.7)
const maxTokens = ref(2000)

// 自定义模型
const customModel = ref({
  name: '',
  endpoint: '',
  apiKey: ''
})

const isCustomModel = computed(() => currentModel.value === 'custom')

// 快速问题
const quickQuestions = [
  'e等于多少?',
  'e为什么叫自然常数?',
  '欧拉公式是什么?',
  'e有什么实际应用?'
]

// 模型列表
const internationalModels = computed(() => {
  return MODEL_REGISTRY.international.map(model => ({
    id: model.id,
    name: model.name,
    provider: model.provider,
    features: model.features.slice(0, 2)
  }))
})

const domesticModels = computed(() => {
  // 合并国产模型和 DeepSeek 模型
  const allDomestic = [
    ...MODEL_REGISTRY.domestic,
    ...MODEL_REGISTRY.deepseek
  ]
  return allDomestic.map(model => ({
    id: model.id,
    name: model.name,
    provider: model.provider,
    features: model.features.slice(0, 2)
  }))
})

// 消息容器
const messagesContainer = ref<HTMLElement | null>(null)

// 初始化
onMounted(() => {
  loadSettings()
})

// 加载设置
function loadSettings() {
  const savedModel = localStorage.getItem('ai-model')
  const savedKey = localStorage.getItem('ai-api-key')
  const savedTemp = localStorage.getItem('ai-temperature')
  const savedTokens = localStorage.getItem('ai-max-tokens')
  
  if (savedModel) currentModel.value = savedModel
  if (savedKey) apiKey.value = decryptApiKey(savedKey)
  if (savedTemp) temperature.value = parseFloat(savedTemp)
  if (savedTokens) maxTokens.value = parseInt(savedTokens)
}

// 保存设置
function saveSettings() {
  localStorage.setItem('ai-temperature', temperature.value.toString())
  localStorage.setItem('ai-max-tokens', maxTokens.value.toString())
}

// 选择模型
function selectModel(modelId: string) {
  currentModel.value = modelId
  localStorage.setItem('ai-model', modelId)
  
  // 检查是否有保存的API Key
  const savedKey = localStorage.getItem(`ai-api-key-${modelId}`)
  if (savedKey) {
    apiKey.value = decryptApiKey(savedKey)
  } else {
    apiKey.value = ''
  }
}

// 保存API Key
function saveApiKey() {
  if (!currentModel.value) return
  
  const encrypted = encryptApiKey(apiKey.value)
  localStorage.setItem(`ai-api-key-${currentModel.value}`, encrypted)
  
  ElMessage.success('API Key 已保存到本地')
}

// 加密/解密 API Key
function encryptApiKey(key: string): string {
  return CryptoJS.AES.encrypt(key, 'playwithmath-secret').toString()
}

function decryptApiKey(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, 'playwithmath-secret')
  return bytes.toString(CryptoJS.enc.Utf8)
}

// 保存自定义模型
function saveCustomModel() {
  if (!customModel.value.name || !customModel.value.endpoint || !customModel.value.apiKey) {
    ElMessage.error('请填写完整的自定义模型信息')
    return
  }
  
  currentModel.value = 'custom'
  apiKey.value = customModel.value.apiKey
  
  localStorage.setItem('custom-model', JSON.stringify(customModel.value))
  localStorage.setItem('ai-model', 'custom')
  
  ElMessage.success('自定义模型已保存')
}

// 获取模型名称
function getModelName(modelId: string): string {
  if (modelId === 'custom') return customModel.value.name || '自定义模型'
  
  const allModels = [...MODEL_REGISTRY.international, ...MODEL_REGISTRY.domestic]
  const model = allModels.find(m => m.id === modelId)
  return model?.name || modelId
}

// 获取模型文档URL
function getModelDocUrl(modelId: string): string {
  const allModels = [...MODEL_REGISTRY.international, ...MODEL_REGISTRY.domestic]
  const model = allModels.find(m => m.id === modelId)
  return model?.docUrl || '#'
}

// 发送消息
async function sendMessage() {
  if (!inputText.value.trim() || !currentModel.value || !apiKey.value || isLoading.value) return
  
  const userMessage: Message = {
    role: 'user',
    content: inputText.value.trim(),
    timestamp: Date.now()
  }
  
  messages.value.push(userMessage)
  inputText.value = ''
  isLoading.value = true
  
  await nextTick()
  scrollToBottom()
  
  try {
    const response = await callAI(userMessage.content)
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    }
    
    messages.value.push(assistantMessage)
  } catch (error: any) {
    ElMessage.error(error.message || '请求失败,请检查API Key和网络连接')
    console.error('AI call error:', error)
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

// 调用AI API
async function callAI(userInput: string): Promise<string> {
  // 构建上下文增强的提示
  let systemPrompt = `你是一个专业的数学学习助手,专注于帮助学生理解自然常数e。
请用简洁易懂的语言回答问题,适合高一学生的水平。
如果涉及数学公式,请使用LaTeX格式(用$包裹)。`
  
  if (props.context) {
    systemPrompt += `\n\n当前学习上下文: ${props.context}`
  }
  
  // 获取模型配置
  const modelConfig = isCustomModel.value 
    ? {
        endpoint: customModel.value.endpoint,
        requiresApiKey: true
      }
    : getModelConfig(currentModel.value)
  
  if (!modelConfig) {
    throw new Error('模型配置不存在')
  }
  
  // 构建请求
  const requestBody = {
    model: currentModel.value,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.value.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userInput }
    ],
    temperature: temperature.value,
    max_tokens: maxTokens.value
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  
  if (modelConfig.requiresApiKey) {
    headers['Authorization'] = `Bearer ${apiKey.value}`
  }
  
  const response = await fetch(modelConfig.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  })
  
  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status} ${response.statusText}`)
  }
  
  const data = await response.json()
  
  return data.choices[0].message.content
}

// 获取模型配置
function getModelConfig(modelId: string) {
  const allModels = [
    ...MODEL_REGISTRY.international,
    ...MODEL_REGISTRY.domestic,
    ...MODEL_REGISTRY.deepseek
  ]
  return allModels.find(m => m.id === modelId)
}

// 发送快速问题
function sendQuickQuestion(question: string) {
  // 检查是否已配置模型和 API Key
  if (!currentModel.value) {
    ElMessage.warning('请先在设置中选择AI模型')
    showSettings.value = true
    return
  }
  if (!apiKey.value && !isCustomModel.value) {
    ElMessage.warning('请先在设置中配置API Key')
    showSettings.value = true
    return
  }
  inputText.value = question
  sendMessage()
}

// 格式化消息(支持Markdown)
function formatMessage(content: string): string {
  return marked(content) as string
}

// 格式化时间
function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

// 滚动到底部
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 清空聊天记录
function clearHistory() {
  messages.value = []
  ElMessage.success('聊天记录已清空')
  showSettings.value = false
}
</script>

<style scoped lang="scss">
.ai-chat-panel {
  position: fixed;
  right: -450px;
  top: 60px;
  bottom: 20px;
  width: 420px;
  background: white;
  border-radius: 20px 0 0 20px;
  box-shadow: -2px 0 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;
  z-index: 999;
  
  &.visible {
    right: 0;
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #5470c6 0%, #91cc75 100%);
  border-radius: 20px 0 0 0;
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .ai-icon {
      font-size: 1.5rem;
      color: white;
    }
    
    .header-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: white;
    }
  }
  
  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .empty-text {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .empty-hint {
      font-size: 0.95rem;
      color: #999;
      margin-bottom: 2rem;
    }
    
    .quick-questions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 300px;
      margin: 0 auto;
      
      .quick-question-btn {
        padding: 0.8rem;
        background: #f5f5f5;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: #5470c6;
          color: white;
          border-color: #5470c6;
        }
      }
    }
  }
  
  .message-item {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1rem;
    
    &.message-user {
      flex-direction: row-reverse;
      
      .message-content {
        background: #5470c6;
        color: white;
        align-items: flex-end;
      }
    }
    
    .message-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      
      .el-icon {
        font-size: 1.2rem;
      }
    }
    
    .message-content {
      max-width: 70%;
      padding: 0.8rem 1rem;
      border-radius: 12px;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .message-text {
        line-height: 1.6;
        word-break: break-word;
      }
      
      .message-time {
        font-size: 0.75rem;
        opacity: 0.7;
      }
    }
  }
  
  .typing-indicator {
    display: flex;
    gap: 0.3rem;
    
    span {
      width: 8px;
      height: 8px;
      background: #999;
      border-radius: 50%;
      animation: typing 1.4s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

.input-container {
  border-top: 2px solid #e0e0e0;
  padding: 1rem;
  
  .input-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    
    .input-hint {
      font-size: 0.85rem;
      color: #999;
    }
  }
}

.settings-content {
  .setting-section {
    margin-bottom: 2rem;
    
    .setting-title {
      font-size: 1.1rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    
    .models-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      
      .model-card {
        padding: 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: #5470c6;
          box-shadow: 0 2px 8px rgba(84, 112, 198, 0.2);
        }
        
        &.selected {
          border-color: #5470c6;
          background: #e6f7ff;
        }
        
        .model-name {
          font-weight: bold;
          margin-bottom: 0.3rem;
        }
        
        .model-provider {
          font-size: 0.85rem;
          color: #999;
          margin-bottom: 0.5rem;
        }
        
        .model-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          
          .el-tag {
            font-size: 0.75rem;
          }
        }
      }
    }
    
    .api-key-hint {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
      
      a {
        color: #5470c6;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    .setting-hint {
      display: block;
      margin-top: 0.3rem;
      font-size: 0.85rem;
      color: #999;
    }
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

// ============================================
// 移动端适配
// ============================================

@media (max-width: 768px) {
  .ai-chat-panel {
    // 全屏显示
    right: -100vw;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    max-width: 100%;
    border-radius: 0;
    
    &.visible {
      right: 0;
    }
  }
  
  .panel-header {
    padding: 1rem;
    border-radius: 0;
    
    .header-title {
      font-size: 1rem;
    }
  }
  
  .messages-container {
    padding: 0.75rem;
    
    .empty-state {
      padding: 2rem 1rem;
      
      .empty-icon {
        font-size: 3rem;
      }
      
      .quick-questions {
        max-width: 100%;
        
        .quick-question-btn {
          padding: 1rem;
          font-size: 0.95rem;
          // 增大触摸目标
          min-height: 48px;
        }
      }
    }
    
    .message-item {
      .message-content {
        max-width: 80%;
        
        .message-text {
          font-size: 0.95rem;
        }
      }
    }
  }
  
  .input-container {
    padding: 0.75rem;
    
    :deep(.el-textarea__inner) {
      // 防止 iOS 自动缩放
      font-size: 16px;
    }
    
    .input-actions {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      
      .input-hint {
        text-align: center;
      }
      
      :deep(.el-button) {
        width: 100%;
        // 增大触摸目标
        min-height: 44px;
      }
    }
  }
}

// 设置对话框移动端适配
:deep(.el-dialog) {
  @media (max-width: 768px) {
    width: 95vw !important;
    max-width: 95vw;
    margin: 5vh auto;
    max-height: 90vh;
    
    .el-dialog__body {
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .models-grid {
      grid-template-columns: 1fr !important;
      
      .model-card {
        // 增大触摸目标
        min-height: 80px;
      }
    }
    
    .el-form-item {
      margin-bottom: 1rem;
    }
    
    .el-input,
    .el-input-number {
      width: 100%;
      
      input {
        // 防止 iOS 自动缩放
        font-size: 16px;
      }
    }
  }
}
</style>
