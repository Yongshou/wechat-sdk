class i {
  static handle(e, r) {
    const s = {
      "config:fail": "微信配置失败，请检查签名",
      "permission denied": "用户拒绝了权限申请"
    }, o = e.errMsg in s ? s[e.errMsg] : `微信API调用失败: ${e.errMsg}`;
    console.error(`[${r}] ${o}`);
  }
}
class h {
  /**
   * 请求微信JSAPI配置
   * @param url 当前页面URL
   * @returns Promise<WechatJsConfig> 配置响应
   */
  async requestConfig(e) {
    const r = d(e);
    if (!r)
      throw new Error("无效的URL格式");
    const { url: s, params: o } = r;
    if (!s)
      throw new Error("无效的URL格式");
    try {
      const t = new URL(s), a = `${t.protocol}//${t.host}`;
      let l = `${a.endsWith("/") ? a.slice(0, -1) : a}/api/v1/wechat/jsapi?url=${encodeURIComponent(s)}`;
      o && (o.u !== void 0 && o.u !== null || o.o !== void 0 && o.o !== null) && (l += `&params=${encodeURIComponent(JSON.stringify(o))}`);
      const c = await fetch(l, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!c.ok)
        throw new Error(`HTTP错误! 状态码: ${c.status}`);
      return await c.json();
    } catch (t) {
      throw i.handle(t, "WechatApiConfigService"), t;
    }
  }
}
function d(n) {
  try {
    if (!n || typeof n != "string")
      return console.error("无效的URL:", n), {
        url: "",
        params: { u: null, o: null }
      };
    let e = n;
    try {
      e = decodeURIComponent(n);
    } catch (a) {
      console.warn("URL解码失败，使用原始URL:", a);
    }
    console.log("尝试解析的URL:", e), console.log("URL长度:", e.length), console.log("URL前100个字符:", e.substring(0, 100)), console.log("URL后100个字符:", e.substring(Math.max(0, e.length - 100)));
    const r = new URL(e), s = r.searchParams.get("unionId"), o = r.searchParams.get("openId");
    r.searchParams.delete("unionId"), r.searchParams.delete("openId");
    const t = r.toString();
    return console.log("解析成功，处理后的URL:", t), console.log("提取的参数:", { u: s, o }), {
      url: t,
      params: { u: s, o }
    };
  } catch (e) {
    return console.error("URL解析失败:", e), console.error("失败的URL:", n), {
      url: n || "",
      params: { u: null, o: null }
    };
  }
}
export {
  h as WechatApiConfigService,
  d as extractParamsFromUrl
};
