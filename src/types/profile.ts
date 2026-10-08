export interface StudentProfile {
  name: string
  gender: string
  nation: string
  id_number: string
  nian: number | string
  yue: number | string
  ri: number | string

  // 本科/基本高等学籍
  school: string
  academic_qualification: string // 层次: 本科 / 专科
  educational_system: string // 学制: 4 年
  major: string
  xltype: string // 形式: 普通全日制
  xllb: string // 类别: 普通高等教育
  fenyuan: string
  xisuo: string
  banji: string
  xuehao: string
  ru_nian: number | string
  ru_yue: number | string
  ru_ri: number | string
  li_nian: number | string
  li_yue: number | string
  li_ri: number | string
  zhuangtai: string // 学籍状态: 在籍(注册学籍) / 毕业
  principal: string // 校（院）长姓名
  diploma_no: string // 证书编号
  image_a: string // 录取照片 Base64
  image_b: string // 学历照片 Base64

  // 学位
  degree_level?: string
  degree_cat?: string
  degree_cert?: string
  degree_date?: string

  // 研究生扩展
  has_grad: boolean
  grad_level: string // 硕士 / 博士
  grad_school: string
  grad_major: string
  grad_degree_type: string
  grad_educational_system: string
  grad_enroll_type: string
  grad_train_mode: string
  grad_research: string
  grad_supervisor: string
  grad_fenyuan: string
  grad_xuehao: string
  grad_ru_nian: number | string
  grad_ru_yue: number | string
  grad_ru_ri: number | string
  grad_li_nian: number | string
  grad_li_yue: number | string
  grad_li_ri: number | string
  grad_zhuangtai: string
  grad_image_a: string
  grad_image_b: string

  // 有效期配置
  valid_days: number // 3, 7, 30, 0(永久)
  create_time: number
  expire_time: number
}

export const createDefaultProfile = (): StudentProfile => ({
  name: '',
  gender: '男',
  nation: '汉族',
  id_number: '',
  nian: '',
  yue: '',
  ri: '',
  school: '',
  major: '',
  xltype: '普通全日制',
  academic_qualification: '本科',
  educational_system: '4',
  xllb: '普通高等教育',
  fenyuan: '',
  xisuo: '',
  banji: '',
  xuehao: '',
  zhuangtai: '在籍(注册学籍)',
  principal: '',
  diploma_no: '',
  ru_nian: '',
  ru_yue: '09',
  ru_ri: '01',
  li_nian: '',
  li_yue: '06',
  li_ri: '30',
  image_a: '',
  image_b: '',
  degree_level: '学士',
  degree_cat: '',
  degree_cert: '',
  degree_date: '',
  has_grad: false,
  grad_level: '硕士',
  grad_school: '',
  grad_major: '',
  grad_degree_type: '学术型',
  grad_educational_system: '3',
  grad_enroll_type: '全国统考',
  grad_train_mode: '全日制',
  grad_research: '',
  grad_supervisor: '',
  grad_fenyuan: '',
  grad_xuehao: '',
  grad_zhuangtai: '在籍(注册学籍)',
  grad_ru_nian: '',
  grad_ru_yue: '09',
  grad_ru_ri: '01',
  grad_li_nian: '',
  grad_li_yue: '06',
  grad_li_ri: '30',
  grad_image_a: '',
  grad_image_b: '',
  valid_days: 30,
  create_time: Date.now(),
  expire_time: 0
})
