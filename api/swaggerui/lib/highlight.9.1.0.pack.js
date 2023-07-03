/*! highlight.js v9.1.0 | BSD3 License | git.io/hljslicense */
!(function (e) {
  "undefined" != typeof exports
    ? e(exports)
    : ((self.hljs = e({})),
      "function" == typeof define &&
        define.amd &&
        define("hljs", [], function () {
          return self.hljs;
        }));
})(function (e) {
  function n(e) {
    return e
      .replace(/&/gm, "&amp;")
      .replace(/</gm, "&lt;")
      .replace(/>/gm, "&gt;");
  }
  function t(e) {
    return e.nodeName.toLowerCase();
  }
  function r(e, n) {
    var t = e && e.exec(n);
    return t && 0 == t.index;
  }
  function a(e) {
    return /^(no-?highlight|plain|text)$/i.test(e);
  }
  function i(e) {
    var n,
      t,
      r,
      i = e.className + " ";
    if (
      ((i += e.parentNode ? e.parentNode.className : ""),
      (t = /\blang(?:uage)?-([\w-]+)\b/i.exec(i)))
    )
      return E(t[1]) ? t[1] : "no-highlight";
    for (i = i.split(/\s+/), n = 0, r = i.length; r > n; n++)
      if (E(i[n]) || a(i[n])) return i[n];
  }
  function o(e, n) {
    var t,
      r = {};
    for (t in e) r[t] = e[t];
    if (n) for (t in n) r[t] = n[t];
    return r;
  }
  function u(e) {
    var n = [];
    return (
      (function r(e, a) {
        for (var i = e.firstChild; i; i = i.nextSibling)
          3 == i.nodeType
            ? (a += i.nodeValue.length)
            : 1 == i.nodeType &&
              (n.push({ event: "start", offset: a, node: i }),
              (a = r(i, a)),
              t(i).match(/br|hr|img|input/) ||
                n.push({ event: "stop", offset: a, node: i }));
        return a;
      })(e, 0),
      n
    );
  }
  function c(e, r, a) {
    function i() {
      return e.length && r.length
        ? e[0].offset != r[0].offset
          ? e[0].offset < r[0].offset
            ? e
            : r
          : "start" == r[0].event
          ? e
          : r
        : e.length
        ? e
        : r;
    }
    function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value) + '"';
      }
      l +=
        "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
    }
    function u(e) {
      l += "</" + t(e) + ">";
    }
    function c(e) {
      ("start" == e.event ? o : u)(e.node);
    }
    for (var s = 0, l = "", f = []; e.length || r.length; ) {
      var g = i();
      if (((l += n(a.substr(s, g[0].offset - s))), (s = g[0].offset), g == e)) {
        f.reverse().forEach(u);
        do c(g.splice(0, 1)[0]), (g = i());
        while (g == e && g.length && g[0].offset == s);
        f.reverse().forEach(o);
      } else
        "start" == g[0].event ? f.push(g[0].node) : f.pop(),
          c(g.splice(0, 1)[0]);
    }
    return l + n(a.substr(s));
  }
  function s(e) {
    function n(e) {
      return (e && e.source) || e;
    }
    function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }
    function r(a, i) {
      if (!a.compiled) {
        if (((a.compiled = !0), (a.k = a.k || a.bK), a.k)) {
          var u = {},
            c = function (n, t) {
              e.cI && (t = t.toLowerCase()),
                t.split(" ").forEach(function (e) {
                  var t = e.split("|");
                  u[t[0]] = [n, t[1] ? Number(t[1]) : 1];
                });
            };
          "string" == typeof a.k
            ? c("keyword", a.k)
            : Object.keys(a.k).forEach(function (e) {
                c(e, a.k[e]);
              }),
            (a.k = u);
        }
        (a.lR = t(a.l || /\b\w+\b/, !0)),
          i &&
            (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"),
            a.b || (a.b = /\B|\b/),
            (a.bR = t(a.b)),
            a.e || a.eW || (a.e = /\B|\b/),
            a.e && (a.eR = t(a.e)),
            (a.tE = n(a.e) || ""),
            a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)),
          a.i && (a.iR = t(a.i)),
          void 0 === a.r && (a.r = 1),
          a.c || (a.c = []);
        var s = [];
        a.c.forEach(function (e) {
          e.v
            ? e.v.forEach(function (n) {
                s.push(o(e, n));
              })
            : s.push("self" == e ? a : e);
        }),
          (a.c = s),
          a.c.forEach(function (e) {
            r(e, a);
          }),
          a.starts && r(a.starts, i);
        var l = a.c
          .map(function (e) {
            return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
          })
          .concat([a.tE, a.i])
          .map(n)
          .filter(Boolean);
        a.t = l.length
          ? t(l.join("|"), !0)
          : {
              exec: function () {
                return null;
              },
            };
      }
    }
    r(e);
  }
  function l(e, t, a, i) {
    function o(e, n) {
      for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) return n.c[t];
    }
    function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent; ) e = e.parent;
        return e;
      }
      return e.eW ? u(e.parent, n) : void 0;
    }
    function c(e, n) {
      return !a && r(n.iR, e);
    }
    function g(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];
      return e.k.hasOwnProperty(t) && e.k[t];
    }
    function h(e, n, t, r) {
      var a = r ? "" : x.classPrefix,
        i = '<span class="' + a,
        o = t ? "" : "</span>";
      return (i += e + '">'), i + n + o;
    }
    function p() {
      if (!L.k) return n(M);
      var e = "",
        t = 0;
      L.lR.lastIndex = 0;
      for (var r = L.lR.exec(M); r; ) {
        e += n(M.substr(t, r.index - t));
        var a = g(L, r);
        a ? ((B += a[1]), (e += h(a[0], n(r[0])))) : (e += n(r[0])),
          (t = L.lR.lastIndex),
          (r = L.lR.exec(M));
      }
      return e + n(M.substr(t));
    }
    function d() {
      var e = "string" == typeof L.sL;
      if (e && !R[L.sL]) return n(M);
      var t = e ? l(L.sL, M, !0, y[L.sL]) : f(M, L.sL.length ? L.sL : void 0);
      return (
        L.r > 0 && (B += t.r),
        e && (y[L.sL] = t.top),
        h(t.language, t.value, !1, !0)
      );
    }
    function b() {
      return void 0 !== L.sL ? d() : p();
    }
    function v(e, t) {
      var r = e.cN ? h(e.cN, "", !0) : "";
      e.rB
        ? ((k += r), (M = ""))
        : e.eB
        ? ((k += n(t) + r), (M = ""))
        : ((k += r), (M = t)),
        (L = Object.create(e, { parent: { value: L } }));
    }
    function m(e, t) {
      if (((M += e), void 0 === t)) return (k += b()), 0;
      var r = o(t, L);
      if (r) return (k += b()), v(r, t), r.rB ? 0 : t.length;
      var a = u(L, t);
      if (a) {
        var i = L;
        i.rE || i.eE || (M += t), (k += b());
        do L.cN && (k += "</span>"), (B += L.r), (L = L.parent);
        while (L != a.parent);
        return (
          i.eE && (k += n(t)),
          (M = ""),
          a.starts && v(a.starts, ""),
          i.rE ? 0 : t.length
        );
      }
      if (c(t, L))
        throw new Error(
          'Illegal lexeme "' + t + '" for mode "' + (L.cN || "<unnamed>") + '"'
        );
      return (M += t), t.length || 1;
    }
    var N = E(e);
    if (!N) throw new Error('Unknown language: "' + e + '"');
    s(N);
    var w,
      L = i || N,
      y = {},
      k = "";
    for (w = L; w != N; w = w.parent) w.cN && (k = h(w.cN, "", !0) + k);
    var M = "",
      B = 0;
    try {
      for (var C, j, I = 0; ; ) {
        if (((L.t.lastIndex = I), (C = L.t.exec(t)), !C)) break;
        (j = m(t.substr(I, C.index - I), C[0])), (I = C.index + j);
      }
      for (m(t.substr(I)), w = L; w.parent; w = w.parent)
        w.cN && (k += "</span>");
      return { r: B, value: k, language: e, top: L };
    } catch (O) {
      if (-1 != O.message.indexOf("Illegal")) return { r: 0, value: n(t) };
      throw O;
    }
  }
  function f(e, t) {
    t = t || x.languages || Object.keys(R);
    var r = { r: 0, value: n(e) },
      a = r;
    return (
      t.forEach(function (n) {
        if (E(n)) {
          var t = l(n, e, !1);
          (t.language = n),
            t.r > a.r && (a = t),
            t.r > r.r && ((a = r), (r = t));
        }
      }),
      a.language && (r.second_best = a),
      r
    );
  }
  function g(e) {
    return (
      x.tabReplace &&
        (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
          return n.replace(/\t/g, x.tabReplace);
        })),
      x.useBR && (e = e.replace(/\n/g, "<br>")),
      e
    );
  }
  function h(e, n, t) {
    var r = n ? w[n] : t,
      a = [e.trim()];
    return (
      e.match(/\bhljs\b/) || a.push("hljs"),
      -1 === e.indexOf(r) && a.push(r),
      a.join(" ").trim()
    );
  }
  function p(e) {
    var n = i(e);
    if (!a(n)) {
      var t;
      x.useBR
        ? ((t = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "div"
          )),
          (t.innerHTML = e.innerHTML
            .replace(/\n/g, "")
            .replace(/<br[ \/]*>/g, "\n")))
        : (t = e);
      var r = t.textContent,
        o = n ? l(n, r, !0) : f(r),
        s = u(t);
      if (s.length) {
        var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        (p.innerHTML = o.value), (o.value = c(s, u(p), r));
      }
      (o.value = g(o.value)),
        (e.innerHTML = o.value),
        (e.className = h(e.className, n, o.language)),
        (e.result = { language: o.language, re: o.r }),
        o.second_best &&
          (e.second_best = {
            language: o.second_best.language,
            re: o.second_best.r,
          });
    }
  }
  function d(e) {
    x = o(x, e);
  }
  function b() {
    if (!b.called) {
      b.called = !0;
      var e = document.querySelectorAll("pre code");
      Array.prototype.forEach.call(e, p);
    }
  }
  function v() {
    addEventListener("DOMContentLoaded", b, !1),
      addEventListener("load", b, !1);
  }
  function m(n, t) {
    var r = (R[n] = t(e));
    r.aliases &&
      r.aliases.forEach(function (e) {
        w[e] = n;
      });
  }
  function N() {
    return Object.keys(R);
  }
  function E(e) {
    return (e = (e || "").toLowerCase()), R[e] || R[w[e]];
  }
  var x = {
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: !1,
      languages: void 0,
    },
    R = {},
    w = {};
  return (
    (e.highlight = l),
    (e.highlightAuto = f),
    (e.fixMarkup = g),
    (e.highlightBlock = p),
    (e.configure = d),
    (e.initHighlighting = b),
    (e.initHighlightingOnLoad = v),
    (e.registerLanguage = m),
    (e.listLanguages = N),
    (e.getLanguage = E),
    (e.inherit = o),
    (e.IR = "[a-zA-Z]\\w*"),
    (e.UIR = "[a-zA-Z_]\\w*"),
    (e.NR = "\\b\\d+(\\.\\d+)?"),
    (e.CNR =
      "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
    (e.BNR = "\\b(0b[01]+)"),
    (e.RSR =
      "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
    (e.BE = { b: "\\\\[\\s\\S]", r: 0 }),
    (e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }),
    (e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }),
    (e.PWM = {
      b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/,
    }),
    (e.C = function (n, t, r) {
      var a = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});
      return (
        a.c.push(e.PWM),
        a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }),
        a
      );
    }),
    (e.CLCM = e.C("//", "$")),
    (e.CBCM = e.C("/\\*", "\\*/")),
    (e.HCM = e.C("#", "$")),
    (e.NM = { cN: "number", b: e.NR, r: 0 }),
    (e.CNM = { cN: "number", b: e.CNR, r: 0 }),
    (e.BNM = { cN: "number", b: e.BNR, r: 0 }),
    (e.CSSNM = {
      cN: "number",
      b:
        e.NR +
        "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      r: 0,
    }),
    (e.RM = {
      cN: "regexp",
      b: /\//,
      e: /\/[gimuy]*/,
      i: /\n/,
      c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }],
    }),
    (e.TM = { cN: "title", b: e.IR, r: 0 }),
    (e.UTM = { cN: "title", b: e.UIR, r: 0 }),
    e
  );
});
hljs.registerLanguage("json", function (e) {
  var t = { literal: "true false null" },
    i = [e.QSM, e.CNM],
    r = { e: ",", eW: !0, eE: !0, c: i, k: t },
    s = {
      b: "{",
      e: "}",
      c: [
        {
          cN: "attr",
          b: '\\s*"',
          e: '"\\s*:\\s*',
          eB: !0,
          eE: !0,
          c: [e.BE],
          i: "\\n",
          starts: r,
        },
      ],
      i: "\\S",
    },
    n = { b: "\\[", e: "\\]", c: [e.inherit(r)], i: "\\S" };
  return i.splice(i.length, 0, s, n), { c: i, k: t, i: "\\S" };
});
hljs.registerLanguage("xml", function (s) {
  var t = "[A-Za-z0-9\\._:-]+",
    e = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php" },
    r = {
      eW: !0,
      i: /</,
      r: 0,
      c: [
        e,
        { cN: "attr", b: t, r: 0 },
        {
          b: "=",
          r: 0,
          c: [
            {
              cN: "string",
              c: [e],
              v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }],
            },
          ],
        },
      ],
    };
  return {
    aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
    cI: !0,
    c: [
      {
        cN: "meta",
        b: "<!DOCTYPE",
        e: ">",
        r: 10,
        c: [{ b: "\\[", e: "\\]" }],
      },
      s.C("<!--", "-->", { r: 10 }),
      { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 },
      {
        cN: "tag",
        b: "<style(?=\\s|>|$)",
        e: ">",
        k: { name: "style" },
        c: [r],
        starts: { e: "</style>", rE: !0, sL: ["css", "xml"] },
      },
      {
        cN: "tag",
        b: "<script(?=\\s|>|$)",
        e: ">",
        k: { name: "script" },
        c: [r],
        starts: {
          e: "</script>",
          rE: !0,
          sL: ["actionscript", "javascript", "handlebars", "xml"],
        },
      },
      e,
      { cN: "meta", b: /<\?\w+/, e: /\?>/, r: 10 },
      {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, r],
      },
    ],
  };
});
hljs.registerLanguage("javascript", function (e) {
  return {
    aliases: ["js"],
    k: {
      keyword:
        "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import from as",
      literal: "true false null undefined NaN Infinity",
      built_in:
        "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise",
    },
    c: [
      { cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ },
      { cN: "meta", b: /^#!/, e: /$/ },
      e.ASM,
      e.QSM,
      {
        cN: "string",
        b: "`",
        e: "`",
        c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }],
      },
      e.CLCM,
      e.CBCM,
      {
        cN: "number",
        v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }],
        r: 0,
      },
      {
        b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: />\s*[);\]]/, r: 0, sL: "xml" }],
        r: 0,
      },
      {
        cN: "function",
        bK: "function",
        e: /\{/,
        eE: !0,
        c: [
          e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }),
          {
            cN: "params",
            b: /\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            c: [e.CLCM, e.CBCM],
          },
        ],
        i: /\[|%/,
      },
      { b: /\$[(.]/ },
      { b: "\\." + e.IR, r: 0 },
      {
        cN: "class",
        bK: "class",
        e: /[{;=]/,
        eE: !0,
        i: /[:"\[\]]/,
        c: [{ bK: "extends" }, e.UTM],
      },
      { bK: "constructor", e: /\{/, eE: !0 },
    ],
    i: /#(?!!)/,
  };
});
hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
    t = {
      b: /[A-Z\_\.\-]+\s*:/,
      rB: !0,
      e: ";",
      eW: !0,
      c: [
        {
          cN: "attribute",
          b: /\S/,
          e: ":",
          eE: !0,
          starts: {
            eW: !0,
            eE: !0,
            c: [
              {
                b: /[\w-]+\s*\(/,
                rB: !0,
                c: [{ cN: "built_in", b: /[\w-]+/ }],
              },
              e.CSSNM,
              e.QSM,
              e.ASM,
              e.CBCM,
              { cN: "number", b: "#[0-9A-Fa-f]+" },
              { cN: "meta", b: "!important" },
            ],
          },
        },
      ],
    };
  return {
    cI: !0,
    i: /[=\/|'\$]/,
    c: [
      e.CBCM,
      { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ },
      { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ },
      { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" },
      { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },
      { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" },
      {
        b: "@",
        e: "[{;]",
        c: [
          { cN: "keyword", b: /\S+/ },
          { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] },
        ],
      },
      { cN: "selector-tag", b: c, r: 0 },
      { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] },
    ],
  };
});
