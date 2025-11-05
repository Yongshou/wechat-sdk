export class ErrorHandler {
  static handle(err: any, module: string) {
    const errorMap = {
      'config:fail': '微信配置失败，请检查签名',
      'permission denied': '用户拒绝了权限申请'
    };
    const message = err.errMsg in errorMap ? errorMap[err.errMsg as keyof typeof errorMap] : `微信API调用失败: ${err.errMsg}`;
    console.error(`[${module}] ${message}`);
    // 可集成企业监控系统
    // reportToMonitor(module, err);
  }
}