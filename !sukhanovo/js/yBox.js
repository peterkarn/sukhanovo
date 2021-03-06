/*! yBox - v1.0 - 2020-08-07
 * By Yuval Ashkenazi and Yoav Leshem
 * https://github.com/Leshemiko/Ybox */

function yBox() {
  let e = this;
  this.init = function () {
    let t = document.querySelectorAll(".yBox");
    for (let o = 0; o < t.length; o++) t[o].addEventListener("click", function (t) {
      t.preventDefault(), e.yBox("", this)
    });
    document.body.addEventListener("keyup", function (t) {
      e.onKeyup(t)
    })
  }, this.onKeyup = function (t) {
    let o = document.querySelector(".yBoxImg");
    if (!o) return;
    let n = o.getAttribute("src"),
      r = document.querySelector(`.yBox[href="${n}"`);
    39 === t.keyCode && e.yBoxPrevItem(r), 37 === t.keyCode && e.yBoxNextItem(r), 27 === t.keyCode && e.closeYbox()
  }, this.onYboxOpen = function (e) {
    return e && "function" == typeof e && e()
  }, this.onYboxClose = function (e) {
    return e && "function" == typeof e && e()
  }, this.onNextItemClick = function (e) {
    return e && "function" == typeof e && e()
  }, this.onPrevItemClick = function (e) {
    return e && "function" == typeof e && e()
  }, this.yBox = function (t, o) {
    let n = "",
      r = !0,
      i = "",
      l = "";
    void 0 === o && (r = !1), r && (n = o.getAttribute("data-ybox-class") ? o.getAttribute("data-ybox-class") : "", i = o.getAttribute("href")), l = document.createRange().createContextualFragment(`<div class="yBoxOverlay">\n                    <div class="yBoxFrame ${n}">\n                        <div class="insertYboxAjaxHere"></div>\n                        <button type="button" class="closeYbox" title="Close"></button>\n                    </div>\n                </div>`), document.addEventListener("click", function (t) {
      "yBoxOverlay active" != t.target.className && "closeYbox" != t.target.className || e.closeYbox()
    });
    let c = document.querySelector(".yBoxPlaceHolder"),
      a = document.querySelector(".insertYboxAjaxHere");
    if (document.querySelector(".yBoxFrame"))
      if (document.querySelector(".yBoxFrame.yBoxImgWrap")) {
        if (c) c.parentNode.insertBefore(a, c), c.parentNode.removeChild(c);
        else {
          (c = document.createElement("div")).classList.add("yBoxPlaceHolder");
          let e = document.querySelector(".yBoxImg");
          c.style.width = e ? e.width : 0, c.style.height = e ? e.height : 0
        }
        a.appendChild(c), e.insertYboxHtml(o, r, i, t, function () {
          e.onYboxOpen()
        })
      } else e.helpers.animate(a, "opacity", 0, .2, function () {
        c && c.parentNode && (c.parentNode.removeChild(c), c.remove()), a.innerHTML = "", e.insertYboxHtml(o, r, i, t, function () {
          e.onYboxOpen()
        }), e.helpers.animate(a, "opacity", 1, .2)
      });
    else document.body.appendChild(l), e.insertYboxHtml(o, r, i, t, function () {
      setTimeout(function () {
        document.querySelector(".yBoxOverlay").classList.add("active")
      }, 200), e.onYboxOpen()
    })
  }, this.insertYboxHtml = function (t, o, n, r, i) {
    let l = document.querySelector(".yBoxFrame"),
      c = document.querySelector(".yBoxPlaceHolder"),
      a = document.querySelector(".insertYboxAjaxHere");
    if (o)
      if (t.classList.contains("yBox_iframe")) {
        if (l.classList.add("yBoxIframeWrap"), n.toLowerCase().indexOf("youtube") > -1 || n.toLowerCase().indexOf("youtu.be") > -1) {
          let e = n.replace(/^[^v]+v.(.{11}).*/, "$1").replace("https://youtu.be/", "").replace(/.*youtube.com\/embed\//, "");
          n = `https://www.youtube.com/embed/${e}?wmode=transparent&rel=0&autoplay=1`
        }
        a.innerHTML = `<iframe src="${n}"  frameborder="0" wmode="Opaque" allowfullscreen class="yBoxIframe"></iframe>`
      } else if (t.classList.contains("yBox_ajax")) {
      let e = new XMLHttpRequest;
      e.onload = function () {
        e.status >= 200 && e.status < 300 ? (console.log("success!", e), a.innerHTML = e.response) : (a.innerHTML = "Oops - something went wrong :(", console.log("The request failed!"))
      }, e.onerror = function (e) {
        console.warn(e), a.innerHTML = "Oops - something went wrong :("
      }, e.open("GET", n), e.send()
    } else if (-1 == n.indexOf("#")) {
      l.classList.add("yBoxImgWrap"), c && c.parentNode.removeChild(c), document.querySelector(".yBoxImg") ? a.appendChild(document.createRange().createContextualFragment('<div class="yBoxLoaderWrap"><div class="yBoxLoader"></div></div>')) : a.appendChild(document.createRange().createContextualFragment('<div style="text-align:center;"><div class="yBoxLoader"></div></div>'));
      let o = new Image;
      o.src = n, o.className = "yBoxImg", o.onload = function () {
        let o = `<div class="yBoxImgZoom"><img src="${n}" alt="" class="yBoxImg" /></div>`,
          r = t.getAttribute("data-ybox-group");
        r && document.querySelector(`.yBox[data-ybox-group="${r}"]`) && (o = `<button type="button" class="yBoxNextImg" title="Next"></button>${o}<button type="button" class="yBoxPrevImg" title="Prev"></button>`), a.innerHTML = o, window.screen.width <= 767 && zoom({
          zoom: "yBoxImgZoom"
        }), document.querySelector(".yBoxNextImg").addEventListener("click", function () {
          e.yBoxNextItem(t)
        }), document.querySelector(".yBoxPrevImg").addEventListener("click", function () {
          e.yBoxPrevItem(t)
        })
      }
    } else {
      let t = document.querySelector(n),
        o = c || document.createRange().createContextualFragment('<div class="yBoxPlaceHolder"></div>');
      t.parentNode.insertBefore(o, t.nextSibling);
      let r = document.createElement("div");
      r.className = "yBoxInnerHtmlDiv", r.innerHTML = t.innerHTML, a.appendChild(r), e.init()
    } else a.innerHTML = r;
    i && i()
  }, this.yBoxNextItem = function (t) {
    let o, n = t.getAttribute("data-ybox-group"),
      r = !1,
      i = document.querySelectorAll(`.yBox[data-ybox-group=${n}]`);
    for (let e = 0; e < i.length; e++) {
      let n = i[e];
      r || n.getAttribute("href") == t.getAttribute("href") && (r = !0, o = e + 1 < i.length ? i[e + 1] : i[0])
    }
    o && (o.click(), e.onNextItemClick())
  }, this.yBoxPrevItem = function (t) {
    let o, n = t.getAttribute("data-ybox-group"),
      r = !1,
      i = document.querySelectorAll(`.yBox[data-ybox-group=${n}]`);
    for (let e = 0; e < i.length; e++) {
      let n = i[e];
      r || n.getAttribute("href") == t.getAttribute("href") && (r = !0, o = e - 1 >= 0 ? i[0] : i[i.length - 1])
    }
    o && (o.click(), e.onPrevItemClick())
  }, this.closeYbox = function () {
    let t = document.querySelector(".yBoxOverlay"),
      o = document.querySelector(".insertYboxAjaxHere"),
      n = document.querySelector(".yBoxPlaceHolder");
    t.classList.remove("active"), setTimeout(function () {
      n && n.parentNode && (n.appendChild(document.createRange().createContextualFragment(o.innerHTML)), n.parentNode.removeChild(n)), t && t.parentNode && t.parentNode.removeChild(t), e.onYboxClose(), document.body.removeEventListener("keyup", function (t) {
        e.onKeyup(t)
      })
    }, 600)
  }, this.helpers = {
    animate: function (e, t, o, n, r) {
      e.style.transition = `all ${n}s`, e.style[t] = `${o}`, setTimeout(() => {
        e.style.transition = "initial", r && r()
      }, 1e3 * n)
    }
  }
}