import { OrderProcessor, Product, MemberLevel, CouponType, Region } from '../src/OrderProcessor';

const processor = new OrderProcessor();

// 示例1：商品A（单价80元，购买3件），白银会员，使用"满200减30"券，大陆地区，库存5件
const example1: Product[] = [{ price: 80, quantity: 3 }];
const result1 = processor.calculate_order(example1, '白银', '满200减30', '大陆', 5);
console.log('示例1结果：');
console.log(result1);
console.log('');

// 示例2：商品B（单价15元，购买2件），钻石会员，使用"固定减20元"券，海外地区，库存1件
const example2: Product[] = [{ price: 15, quantity: 2 }];
const result2 = processor.calculate_order(example2, '钻石', '固定减20元', '海外', 1);
console.log('示例2结果：');
console.log(result2);
console.log('');

// 示例3：商品C（单价300元，购买2件），普通会员，使用"9折百分比券"，港澳台地区，库存0件
const example3: Product[] = [{ price: 300, quantity: 2 }];
const result3 = processor.calculate_order(example3, '普通', '9折百分比券', '港澳台', 0);
console.log('示例3结果：');
console.log(result3);
console.log('');