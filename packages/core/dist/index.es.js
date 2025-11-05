class g {
  static handle(e, r) {
    const o = {
      "config:fail": "微信配置失败，请检查签名",
      "permission denied": "用户拒绝了权限申请"
    }, t = e.errMsg in o ? o[e.errMsg] : `微信API调用失败: ${e.errMsg}`;
    console.error(`[${r}] ${t}`);
  }
}
class u {
  /**
   * 请求微信JSAPI配置
   * @param url 当前页面URL
   * @returns Promise<WechatJsConfig> 配置响应
   */
  async requestConfig(e) {
    const r = i(e);
    if (!r)
      throw new Error("无效的URL格式");
    const { url: o, params: t } = r;
    if (!o)
      throw new Error("无效的URL格式");
    try {
      const n = new URL(o), a = `${n.protocol}//${n.host}`;
      let c = `${a.endsWith("/") ? a.slice(0, -1) : a}/api/v1/wechat/jsapi?url=${encodeURIComponent(o)}`;
      t && (t.u !== void 0 && t.u !== null || t.o !== void 0 && t.o !== null) && (c += `&params=${encodeURIComponent(JSON.stringify(t))}`);
      const l = await fetch(c, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!l.ok)
        throw new Error(`HTTP错误! 状态码: ${l.status}`);
      return await l.json();
    } catch (n) {
      throw g.handle(n, "WechatApiConfigService"), n;
    }
  }
}
function i(s) {
  try {
    if (!s || typeof s != "string")
      return console.error("无效的URL:", s), {
        url: "",
        params: { u: null, o: null }
      };
    let e = s;
    try {
      e = decodeURIComponent(s);
    } catch (a) {
      console.warn("URL解码失败，使用原始URL:", a);
    }
    console.log("尝试解析的URL:", e), console.log("URL长度:", e.length), console.log("URL前100个字符:", e.substring(0, 100)), console.log("URL后100个字符:", e.substring(Math.max(0, e.length - 100)));
    const r = new URL(e), o = r.searchParams.get("unionId"), t = r.searchParams.get("openId");
    r.searchParams.delete("unionId"), r.searchParams.delete("openId");
    const n = r.toString();
    return console.log("解析成功，处理后的URL:", n), console.log("提取的参数:", { u: o, o: t }), {
      url: n,
      params: { u: o, o: t }
    };
  } catch (e) {
    return console.error("URL解析失败:", e), console.error("失败的URL:", s), {
      url: s || "",
      params: { u: null, o: null }
    };
  }
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WechatApiConfigService: u,
  extractParamsFromUrl: i
}, Symbol.toStringTag, { value: "Module" }));
class h {
  /**
   * 构造函数
   * @param prefix 存储键前缀，用于区分不同应用
   */
  constructor(e = "app") {
    this.prefix = e;
  }
  /**
   * 获取带前缀的存储键
   * @param key 原始键名
   * @returns 带前缀的键名
   */
  getKey(e) {
    return `${this.prefix}:${e}`;
  }
  /**
   * 存储数据到localStorage
   * @param key 键名
   * @param value 存储的值
   * @param expiry 过期时间（毫秒），可选
   */
  setLocal(e, r, o) {
    const t = {
      value: r,
      expiry: o ? Date.now() + o : null
    };
    localStorage.setItem(this.getKey(e), JSON.stringify(t));
  }
  /**
   * 从localStorage获取数据
   * @param key 键名
   * @returns 存储的值，如果过期则返回null
   */
  getLocal(e) {
    const r = localStorage.getItem(this.getKey(e));
    if (!r) return null;
    try {
      const o = JSON.parse(r);
      return o.expiry && Date.now() > o.expiry ? (this.removeLocal(e), null) : o.value;
    } catch (o) {
      return console.error("解析存储数据失败:", o), null;
    }
  }
  /**
   * 从localStorage移除数据
   * @param key 键名
   */
  removeLocal(e) {
    localStorage.removeItem(this.getKey(e));
  }
  /**
   * 存储数据到sessionStorage
   * @param key 键名
   * @param value 存储的值
   */
  setSession(e, r) {
    sessionStorage.setItem(this.getKey(e), JSON.stringify(r));
  }
  /**
   * 从sessionStorage获取数据
   * @param key 键名
   * @returns 存储的值
   */
  getSession(e) {
    const r = sessionStorage.getItem(this.getKey(e));
    if (!r) return null;
    try {
      return JSON.parse(r);
    } catch (o) {
      return console.error("解析存储数据失败:", o), null;
    }
  }
  /**
   * 从sessionStorage移除数据
   * @param key 键名
   */
  removeSession(e) {
    sessionStorage.removeItem(this.getKey(e));
  }
  /**
   * 清除所有存储数据
   * @param type 存储类型，可选值: 'local', 'session', 'all'
   */
  clear(e = "all") {
    (e === "local" || e === "all") && Object.keys(localStorage).filter((r) => r.startsWith(this.prefix)).forEach((r) => localStorage.removeItem(r)), (e === "session" || e === "all") && Object.keys(sessionStorage).filter((r) => r.startsWith(this.prefix)).forEach((r) => sessionStorage.removeItem(r));
  }
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  StorageService: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as api,
  f as storage
};
//# sourceMappingURL=index.es.js.map
