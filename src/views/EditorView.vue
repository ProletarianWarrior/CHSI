<template>
  <div class="page pg4">
    <NavBar title="学信档案信息编辑" back-route="/" theme="white" />

    <div class="form-container">
      <!-- 1. 基础信息 -->
      <div class="form-section">
        <div class="form-section-title">
          <span class="icon">👤</span> 个人基本信息
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">姓名 <span class="req">*</span></label>
            <input v-model="formData.name" class="form-input" placeholder="例如: 张三" />
          </div>
          <div class="form-group">
            <label class="form-label">性别</label>
            <select v-model="formData.gender" class="form-select">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">民族</label>
            <input v-model="formData.nation" class="form-input" placeholder="汉族" />
          </div>
          <div class="form-group">
            <label class="form-label">身份证号</label>
            <input v-model="formData.id_number" class="form-input" placeholder="18位身份证号" @blur="autoFillBirthFromId" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">出生日期</label>
          <div class="date-row">
            <input v-model="formData.nian" type="number" class="form-input date-input" placeholder="年 (2002)" />
            <span class="date-sep">-</span>
            <input v-model="formData.yue" type="number" class="form-input date-input" placeholder="月 (08)" />
            <span class="date-sep">-</span>
            <input v-model="formData.ri" type="number" class="form-input date-input" placeholder="日 (15)" />
          </div>
        </div>
      </div>

      <!-- 2. 本科/本专科高等教育信息 -->
      <div class="form-section">
        <div class="form-section-title">
          <span class="icon">🎓</span> 高等学籍与学历信息
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">院校名称 <span class="req">*</span></label>
            <input v-model="formData.school" class="form-input" placeholder="例如: 北京大学" />
          </div>
          <div class="form-group">
            <label class="form-label">层次</label>
            <select v-model="formData.academic_qualification" class="form-select">
              <option value="本科">本科</option>
              <option value="专科">专科</option>
              <option value="第二学士学位">第二学士学位</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">专业名称</label>
            <input v-model="formData.major" class="form-input" placeholder="例如: 计算机科学与技术" />
          </div>
          <div class="form-group">
            <label class="form-label">学制 (年)</label>
            <input v-model="formData.educational_system" class="form-input" placeholder="4" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">学历类别</label>
            <select v-model="formData.xllb" class="form-select">
              <option value="普通高等教育">普通高等教育</option>
              <option value="成人高等教育">成人高等教育</option>
              <option value="自学考试">自学考试</option>
              <option value="开放教育">开放教育</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">学习形式</label>
            <select v-model="formData.xltype" class="form-select">
              <option value="普通全日制">普通全日制</option>
              <option value="非全日制">非全日制</option>
              <option value="业余">业余</option>
              <option value="函授">函授</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">院系 (分院)</label>
            <input v-model="formData.fenyuan" class="form-input" placeholder="例如: 信息工程学院" />
          </div>
          <div class="form-group">
            <label class="form-label">系(所)</label>
            <input v-model="formData.xisuo" class="form-input" placeholder="例如: 软件工程" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">班级</label>
            <input v-model="formData.banji" class="form-input" placeholder="例如: 软工2101" />
          </div>
          <div class="form-group">
            <label class="form-label">学号</label>
            <input v-model="formData.xuehao" class="form-input" placeholder="例如: 2021001" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">入学年份/月/日</label>
            <div class="date-row">
              <input v-model="formData.ru_nian" type="number" class="form-input date-input" placeholder="年" />
              <input v-model="formData.ru_yue" type="number" class="form-input date-input" placeholder="月" />
              <input v-model="formData.ru_ri" type="number" class="form-input date-input" placeholder="日" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">预计毕业/结业</label>
            <div class="date-row">
              <input v-model="formData.li_nian" type="number" class="form-input date-input" placeholder="年" />
              <input v-model="formData.li_yue" type="number" class="form-input date-input" placeholder="月" />
              <input v-model="formData.li_ri" type="number" class="form-input date-input" placeholder="日" />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">学籍状态</label>
            <select v-model="formData.zhuangtai" class="form-select">
              <option value="在籍(注册学籍)">在籍(注册学籍)</option>
              <option value="毕业">毕业</option>
              <option value="结业">结业</option>
              <option value="休学">休学</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">校（院）长姓名</label>
            <input v-model="formData.principal" class="form-input" placeholder="例如: 毛小兵" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">证书编号</label>
          <input v-model="formData.diploma_no" class="form-input" placeholder="例如: 1344 1120 2605 0038 98" />
        </div>
      </div>

      <!-- 3. 研究生信息 (可选折叠) -->
      <div class="toggle-section" :class="{ open: formData.has_grad }">
        <div class="toggle-header" @click="formData.has_grad = !formData.has_grad">
          <div class="toggle-header-left">
            <span class="toggle-title">📚 {{ formData.grad_level || '硕士' }}研究生信息 (可选)</span>
            <span class="toggle-hint">{{ formData.has_grad ? '点击收起' : '点击展开填写' }}</span>
          </div>
          <div class="toggle-arrow">▶</div>
        </div>

        <div v-if="formData.has_grad" class="toggle-body">
          <div class="grad-type-tabs">
            <div
              class="grad-type-tab"
              :class="{ active: formData.grad_level === '硕士' }"
              @click="formData.grad_level = '硕士'"
            >
              硕士研究生
            </div>
            <div
              class="grad-type-tab"
              :class="{ active: formData.grad_level === '博士' }"
              @click="formData.grad_level = '博士'"
            >
              博士研究生
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">研究生院校</label>
              <input v-model="formData.grad_school" class="form-input" placeholder="例如: 清华大学" />
            </div>
            <div class="form-group">
              <label class="form-label">专业名称</label>
              <input v-model="formData.grad_major" class="form-input" placeholder="例如: 人工智能" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">学位类型</label>
              <select v-model="formData.grad_degree_type" class="form-select">
                <option value="学术型">学术型</option>
                <option value="专业型">专业型</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">导师姓名</label>
              <input v-model="formData.grad_supervisor" class="form-input" placeholder="例如: 李教授" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">培养模式</label>
              <select v-model="formData.grad_train_mode" class="form-select">
                <option value="全日制">全日制</option>
                <option value="非全日制">非全日制</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">学籍状态</label>
              <select v-model="formData.grad_zhuangtai" class="form-select">
                <option value="在籍(注册学籍)">在籍(注册学籍)</option>
                <option value="毕业">毕业</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">学制 (年)</label>
              <input v-model="formData.grad_educational_system" class="form-input" placeholder="3" />
            </div>
            <div class="form-group">
              <label class="form-label">研究生学号</label>
              <input v-model="formData.grad_xuehao" class="form-input" placeholder="20240901" />
            </div>
          </div>
        </div>
      </div>

      <!-- 4. 照片上传 (原图无损) -->
      <div class="form-section">
        <div class="form-section-title">
          <span class="icon">📷</span> 照片上传
        </div>
        <div class="photo-upload-grid">
          <!-- 录取照片 -->
          <div class="photo-uploader">
            <div class="uploader-preview" @click="triggerUpload('inputPhotoA')">
              <img v-if="formData.image_a" :src="formData.image_a" alt="录取照片" />
              <div v-else class="uploader-placeholder">
                <span>+</span>
                <span class="txt">录取照片</span>
              </div>
            </div>
            <input id="inputPhotoA" type="file" accept="image/*" class="hide-file" @change="e => handleFileSelect(e, 'image_a')" />
            <div class="uploader-label">录取照片 (image_a)</div>
          </div>

          <!-- 学历照片 -->
          <div class="photo-uploader">
            <div class="uploader-preview" @click="triggerUpload('inputPhotoB')">
              <img v-if="formData.image_b" :src="formData.image_b" alt="学历照片" />
              <div v-else class="uploader-placeholder">
                <span>+</span>
                <span class="txt">学历照片</span>
              </div>
            </div>
            <input id="inputPhotoB" type="file" accept="image/*" class="hide-file" @change="e => handleFileSelect(e, 'image_b')" />
            <div class="uploader-label">学历照片 (image_b)</div>
          </div>
        </div>
      </div>

      <!-- 5. 链接有效期 (3天、7天、30天、永久) -->
      <div class="validity-section">
        <div class="validity-title">
          <span>⏱️ 链接有效期</span>
          <span class="validity-sub">(到期后链接自动失效，永久有效无限制)</span>
        </div>
        <div class="validity-tabs">
          <div
            class="validity-tab"
            :class="{ active: formData.valid_days === 3 }"
            @click="setValidity(3)"
          >
            3天
          </div>
          <div
            class="validity-tab"
            :class="{ active: formData.valid_days === 7 }"
            @click="setValidity(7)"
          >
            7天
          </div>
          <div
            class="validity-tab"
            :class="{ active: formData.valid_days === 30 }"
            @click="setValidity(30)"
          >
            30天
          </div>
          <div
            class="validity-tab"
            :class="{ active: formData.valid_days === 0 }"
            @click="setValidity(0)"
          >
            永久
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <button class="form-submit" @click="saveAndPreview">👁️ 保存并预览效果</button>
        <button class="form-submit secondary" @click="openShareDialog">🔗 生成在线分享短链接</button>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <ShareModal
      :visible="shareVisible"
      :short-url="shortUrl"
      :full-url="fullUrl"
      :valid-days="formData.valid_days"
      :expire-time="formData.expire_time"
      @close="shareVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfile } from '../composables/useProfile'
import { buildShareLinks } from '../utils/codec'
import { saveProfileToServer, getWorkerBaseUrl } from '../utils/api'
import NavBar from '../components/NavBar.vue'
import ShareModal from '../components/ShareModal.vue'
import { showToast } from '../components/Toast.vue'
import type { StudentProfile } from '../types/profile'

const router = useRouter()
const { profile, setProfile } = useProfile()

// 复制一份供表单编辑
const formData = ref<StudentProfile>({ ...profile.value })

const shareVisible = ref(false)
const shortUrl = ref('')
const fullUrl = ref('')

const setValidity = (days: number) => {
  formData.value.valid_days = days
  if (days > 0) {
    formData.value.expire_time = Date.now() + days * 24 * 60 * 60 * 1000
  } else {
    formData.value.expire_time = 0
  }
}

// 自动根据身份证填充出生日期
const autoFillBirthFromId = () => {
  const id = formData.value.id_number
  if (id && id.length === 18) {
    formData.value.nian = parseInt(id.substring(6, 10))
    formData.value.yue = parseInt(id.substring(10, 12))
    formData.value.ri = parseInt(id.substring(12, 14))
  }
}

const triggerUpload = (id: string) => {
  document.getElementById(id)?.click()
}

// 原始图片直接读取，取消自动压缩，保留原图
const handleFileSelect = (e: Event, field: 'image_a' | 'image_b') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (loadEvt) => {
    formData.value[field] = loadEvt.target?.result as string
    showToast('照片上传完成')
  }
  reader.readAsDataURL(file)
}

const normalizeDates = () => {
  const pad = (v: any) => (v !== undefined && v !== null && String(v).trim() !== '') ? String(v).padStart(2, '0') : v
  if (formData.value.yue) formData.value.yue = pad(formData.value.yue)
  if (formData.value.ri) formData.value.ri = pad(formData.value.ri)
  if (formData.value.ru_yue) formData.value.ru_yue = pad(formData.value.ru_yue)
  if (formData.value.ru_ri) formData.value.ru_ri = pad(formData.value.ru_ri)
  if (formData.value.li_yue) formData.value.li_yue = pad(formData.value.li_yue)
  if (formData.value.li_ri) formData.value.li_ri = pad(formData.value.li_ri)
  if (formData.value.grad_ru_yue) formData.value.grad_ru_yue = pad(formData.value.grad_ru_yue)
  if (formData.value.grad_ru_ri) formData.value.grad_ru_ri = pad(formData.value.grad_ru_ri)
  if (formData.value.grad_li_yue) formData.value.grad_li_yue = pad(formData.value.grad_li_yue)
  if (formData.value.grad_li_ri) formData.value.grad_li_ri = pad(formData.value.grad_li_ri)
}

const saveAndPreview = () => {
  if (!formData.value.name || !formData.value.school) {
    showToast('请至少填写姓名和院校名称')
    return
  }
  normalizeDates()
  setProfile(formData.value)
  showToast('保存成功，跳转预览')
  setTimeout(() => {
    router.push('/education')
  }, 300)
}

const openShareDialog = async () => {
  if (!formData.value.name || !formData.value.school) {
    showToast('请至少填写姓名和院校名称')
    return
  }
  normalizeDates()
  setProfile(formData.value)
  showToast('正在生成极短分享链接...')

  const { workerShortUrl, onlineFullUrl } = buildShareLinks(formData.value)
  fullUrl.value = onlineFullUrl
  shortUrl.value = workerShortUrl

  try {
    const remoteId = await saveProfileToServer(formData.value)
    shortUrl.value = `${getWorkerBaseUrl()}/s/${remoteId}`
  } catch (e) {
    console.warn('Worker 保存异常，使用本地短码:', e)
  }

  shareVisible.value = true
}
</script>

<style lang="scss" scoped src="./EditorView.scss"></style>
