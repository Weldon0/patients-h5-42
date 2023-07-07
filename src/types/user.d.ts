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
