export interface Product {
  price: number;
  quantity: number;
}

export type MemberLevel = '普通' | '白银' | '黄金' | '钻石';

export type CouponType = '满200减30' | '满500减100' | '9折百分比券' | '固定减20元' | null;

export type Region = '大陆' | '港澳台' | '海外';

export interface OrderResult {
  基础金额: number;
  运费: number;
  会员折扣后金额: number;
  优惠券抵扣金额: number;
  税费: number;
  跨境服务费: number;
  最终支付金额: number;
  实际购买数量: number;
  支付超时时间: number; // 分钟
  订单状态: '成功' | '失败';
  失败原因?: string;
}

export class OrderProcessor {
  calculate_order(
    products: Product[],
    memberLevel: MemberLevel,
    couponType: CouponType,
    region: Region,
    stockQuantity: number
  ): OrderResult {
    // 1. 库存检查与调整
    let totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    let actualQuantity = totalQuantity;
    
    if (stockQuantity < totalQuantity) {
      if (stockQuantity === 0) {
        return {
          基础金额: 0,
          运费: 0,
          会员折扣后金额: 0,
          优惠券抵扣金额: 0,
          税费: 0,
          跨境服务费: 0,
          最终支付金额: 0,
          实际购买数量: 0,
          支付超时时间: 0,
          订单状态: '失败',
          失败原因: '商品无库存，订单创建失败'
        };
      }
      actualQuantity = stockQuantity;
      // 按比例调整每个商品的数量
      const ratio = actualQuantity / totalQuantity;
      products = products.map(product => ({
        ...product,
        quantity: Math.round(product.quantity * ratio)
      }));
    }
    
    // 2. 基础金额计算
    let baseAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    
    // 3. 运费计算
    let shippingFee = baseAmount < 50 ? 10 : 0;
    let baseWithShipping = baseAmount + shippingFee;
    
    // 4. 会员折扣计算
    let memberDiscount = 1;
    switch (memberLevel) {
      case '白银':
        memberDiscount = 0.95;
        break;
      case '黄金':
        memberDiscount = 0.9;
        break;
      case '钻石':
        memberDiscount = 0.85;
        break;
      default:
        memberDiscount = 1;
    }
    let memberDiscountedAmount = baseWithShipping * memberDiscount;
    
    // 5. 优惠券计算
    let couponDiscount = 0;
    let couponDiscountedAmount = memberDiscountedAmount;
    
    if (couponType) {
      // 优惠券优先级：固定金额券 > 满减券 > 百分比券
      if (couponType === '固定减20元') {
        couponDiscount = 20;
        couponDiscountedAmount = Math.max(memberDiscountedAmount - couponDiscount, 0);
      } else if (couponType.startsWith('满')) {
        // 满减券仅对基础金额生效
        if (couponType === '满200减30' && baseAmount >= 200) {
          couponDiscount = 30;
        } else if (couponType === '满500减100' && baseAmount >= 500) {
          couponDiscount = 100;
        }
        couponDiscountedAmount = Math.max(memberDiscountedAmount - couponDiscount, 0);
      } else if (couponType === '9折百分比券') {
        // 百分比券与会员折扣取力度更大的
        const couponDiscountRate = 0.9;
        const couponAmount = baseWithShipping * couponDiscountRate;
        if (couponAmount < memberDiscountedAmount) {
          couponDiscountedAmount = couponAmount;
          couponDiscount = memberDiscountedAmount - couponAmount;
        }
      }
    }
    
    // 6. 地区税费计算
    let tax = 0;
    let crossBorderFee = 0;
    
    switch (region) {
      case '大陆':
        tax = couponDiscountedAmount * 0.03;
        break;
      case '港澳台':
        tax = couponDiscountedAmount * 0.05;
        break;
      case '海外':
        tax = couponDiscountedAmount * 0.1;
        crossBorderFee = 30;
        break;
    }
    
    // 7. 最终支付金额
    let finalAmount = couponDiscountedAmount + tax + crossBorderFee;
    
    // 8. 支付超时时间
    let paymentTimeout = 30;
    if (memberLevel === '黄金' || memberLevel === '钻石') {
      paymentTimeout = 60;
    }
    
    return {
      基础金额: baseAmount,
      运费: shippingFee,
      会员折扣后金额: memberDiscountedAmount,
      优惠券抵扣金额: couponDiscount,
      税费: tax,
      跨境服务费: crossBorderFee,
      最终支付金额: finalAmount,
      实际购买数量: actualQuantity,
      支付超时时间: paymentTimeout,
      订单状态: '成功'
    };
  }
}