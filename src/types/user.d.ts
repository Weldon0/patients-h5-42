export type User = {
  /* token令牌 */
  token: string
  /* 用户ID */
  id: string
  /* 用户名称 */
  account: string
  /* 手机号 */
  mobile: string
  /* 头像 */
  avatar: string
}

// 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

// 交叉类型

export interface UserInfo {
  /**
   * 用户名
   */
  account: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 收藏数量
   */
  collectionNumber: number
  /**
   * 我的优惠券数量
   */
  couponNumber: number
  /**
   * 用户id
   */
  id: string
  /**
   * 关注数量
   */
  likeNumber: number
  /**
   * 手机号
   */
  mobile: string
  /**
   * 订单信息对象
   */
  orderInfo: OrderInfo
  /**
   * 我的总积分
   */
  score: number
}

export interface OrderInfo {
  /**
   * 已完成
   */
  finishedNumber: number
  /**
   * 待付款
   */
  paidNumber: number
  /**
   * 待发货
   */
  receivedNumber: number
  /**
   * 待收货
   */
  shippedNumber: number
}

// 患者项类型
export interface Patient {
  /**
   * 年龄
   */
  age?: number
  /**
   * 是否设置为默认患者 0不是默认 1是默认患者
   */
  defaultFlag: number
  /**
   * 性别 1男 0女
   */
  gender?: 1 | 0
  /**
   * 性别值
   */
  genderValue?: '男' | '女'
  id?: string
  /**
   * 患者身份证号
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}

export type PatientList = Patient[]
