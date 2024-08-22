(function () {
    var adConfig = {
        "ads_host": "a.pemsrv.com",
        "syndication_host": "s.pemsrv.com",
        "idzone": 5391286,
        "popup_fallback": false,
        "popup_force": false,
        "chrome_enabled": true,
        "new_tab": false,
        "frequency_period": 1,
        "frequency_count": 3,
        "trigger_method": 3,
        "trigger_class": "",
        "trigger_delay": 0,
        "capping_enabled": false,
        "only_inline": false
    };

    window.document.querySelectorAll || (document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function e(o, i, t, n, r) {
        var a = document,
            c = a.createStyleSheet();
        for (r = a.all, i = [], t = (o = o.replace(/\[for\b/gi, "[htmlFor").split(",")).length; t--;) {
            for (c.addRule(o[t], "k:v"), n = r.length; n--;) r[n].currentStyle.k && i.push(r[n]);
            c.removeRule(0);
        }
        return i;
    });

    var popMagic = {
        version: 1,
        cookie_name: "",
        url: "",
        config: {},
        open_count: 0,
        top: null,
        browser: null,
        venor_loaded: !1,
        venor: !1,
        configTpl: {
            ads_host: "",
            syndication_host: "",
            idzone: "",
            frequency_period: 720,
            frequency_count: 1,
            trigger_method: 1,
            trigger_class: "",
            popup_force: !1,
            popup_fallback: !1,
            chrome_enabled: !0,
            new_tab: !1,
            cat: "",
            tags: "",
            el: "",
            sub: "",
            sub2: "",
            sub3: "",
            only_inline: !1,
            trigger_delay: 0,
            capping_enabled: !1,
            cookieconsent: !0
        },
        init: function (e) {
            if (void 0 !== e.idzone && e.idzone) {
                void 0 === e.customTargeting && (e.customTargeting = []);
                window.customTargeting = e.customTargeting || null;
                var o = Object.keys(e.customTargeting).filter(function (e) {
                    return e.search("ex_") >= 0;
                });
                for (var i in o.length && o.forEach(function (e) {
                    return this.configTpl[e] = null;
                }.bind(this)), this.configTpl) {
                    Object.prototype.hasOwnProperty.call(this.configTpl, i) && (void 0 !== e[i] ? this.config[i] = e[i] : this.config[i] = this.configTpl[i]);
                }
                void 0 !== this.config.idzone && "" !== this.config.idzone && (!0 !== this.config.only_inline && this.loadHosted(), this.addEventToElement(window, "load", this.preparePop));
            }
        },
        getCountFromCookie: function () {
            if (!this.config.cookieconsent) return 0;
            var e = popMagic.getCookie(popMagic.cookie_name),
                o = void 0 === e ? 0 : parseInt(e);
            return isNaN(o) && (o = 0), o;
        },
        getLastOpenedTimeFromCookie: function () {
            var e = popMagic.getCookie(popMagic.cookie_name),
                o = null;
            if (void 0 !== e) {
                var i = e.split(";")[1];
                o = i > 0 ? parseInt(i) : 0;
            }
            return isNaN(o) && (o = null), o;
        },
        shouldShow: function () {
            if (!popMagic.config.capping_enabled) return 0 === popMagic.open_count;
            if (popMagic.open_count >= popMagic.config.frequency_count) return !1;
            var e = popMagic.getCountFromCookie();
            let o = popMagic.getLastOpenedTimeFromCookie(),
                i = Math.floor(Date.now() / 1e3),
                t = o + popMagic.config.trigger_delay;
            return (!o || !(t > i)) && (popMagic.open_count = e, !(e >= popMagic.config.frequency_count));
        },
        venorShouldShow: function () {
            return popMagic.venor_loaded && "0" === popMagic.venor;
        },
        setAsOpened: function (e) {
            var o = e ? e.target || e.srcElement : null,
                i = {
                    id: "",
                    tagName: "",
                    classes: "",
                    text: "",
                    href: "",
                    elm: ""
                };
            void 0 !== o && null != o && (i = {
                id: void 0 !== o.id && null != o.id ? o.id : "",
                tagName: void 0 !== o.tagName && null != o.tagName ? o.tagName : "",
                classes: void 0 !== o.classList && null != o.classList ? o.classList : "",
                text: void 0 !== o.outerText && null != o.outerText ? o.outerText : "",
                href: void 0 !== o.href && null != o.href ? o.href : "",
                elm: o
            });
            var t = new CustomEvent("creativeDisplayed-" + popMagic.config.idzone, {
                detail: i
            });
            if (document.dispatchEvent(t), !popMagic.config.capping_enabled) {
                ++popMagic.open_count;
                return;
            }
            var n = 1;
            n = 0 !== popMagic.open_count ? popMagic.open_count + 1 : popMagic.getCountFromCookie() + 1;
            let r = Math.floor(Date.now() / 1e3);
            popMagic.config.cookieconsent && popMagic.setCookie(popMagic.cookie_name, `${n};${r}`, popMagic.config.frequency_period);
        },
        loadHosted: function () {
            var e = document.createElement("script");
            for (var o in e.type = "application/javascript", e.async = !0, e.src = "//" + this.config.ads_host + "/popunder1000.js", e.id = "popmagicldr", this.config) {
                Object.prototype.hasOwnProperty.call(this.config, o) && "ads_host" !== o && "syndication_host" !== o && e.setAttribute("data-exo-" + o, this.config[o]);
            }
            var i = document.getElementsByTagName("body").item(0);
            i.firstChild ? i.insertBefore(e, i.firstChild) : i.appendChild(e);
        },
        preparePop: function () {
            if (!("object" == typeof exoJsPop101 && Object.prototype.hasOwnProperty.call(exoJsPop101, "add"))) {
                if (popMagic.top = self, popMagic.top !== self)
                    try {
                        top.document.location.toString() && (popMagic.top = top);
                    } catch (e) { }
                if (popMagic.cookie_name = "zone-cap-" + popMagic.config.idzone, popMagic.shouldShow()) {
                    var o = new XMLHttpRequest;
                    o.onreadystatechange = function () {
                        o.readyState == XMLHttpRequest.DONE && (popMagic.venor_loaded = !0, 200 == o.status ? popMagic.venor = o.responseText : popMagic.venor = "0");
                    };
                    var i = "https:" !== document.location.protocol && "http:" !== document.location.protocol ? "https:" : document.location.protocol;
                    o.open("GET", i + "//" + popMagic.config.syndication_host + "/venor.php", !0);
                    try {
                        o.send();
                    } catch (t) {
                        popMagic.venor_loaded = !0;
                    }
                }
                if (popMagic.buildUrl(), popMagic.browser = popMagic.browserDetector.detectBrowser(navigator.userAgent), popMagic.config.chrome_enabled || "chrome" !== popMagic.browser.name && "crios" !== popMagic.browser.name) {
                    var n = popMagic.getPopMethod(popMagic.browser);
                    popMagic.addEvent("click", n);
                }
            }
        },
        getPopMethod: function (e) {
            return popMagic.config.popup_force || popMagic.config.popup_fallback && "chrome" === e.name && e.version >= 68 && !e.isMobile ? popMagic.methods.popup : e.isMobile ? popMagic.methods.default : "chrome" === e.name ? popMagic.methods.chromeTab : popMagic.methods.default;
        },
        buildUrl: function () {
            var e, o, i = "https:" !== document.location.protocol && "http:" !== document.location.protocol ? "https:" : document.location.protocol,
                t = top === self ? document.URL : document.referrer,
                n = {
                    type: "inline",
                    name: "popMagic",
                    ver: this.version
                },
                r = "";
            customTargeting && Object.keys(customTargeting).length && ("object" == typeof customTargeting ? Object.keys(customTargeting) : customTargeting).forEach(function (o) {
                "object" == typeof customTargeting ? e = customTargeting[o] : e = customTargeting[o] && customTargeting[o][0], r += "&" + o + "=" + encodeURIComponent(e);
            });
            r += "&page=" + encodeURIComponent(t);
            this.url = i + "//" + this.config.ads_host + "/?type=popup" + "&id=" + this.config.idzone + "&method=" + this.config.trigger_method + "&ver=" + this.version + r;
        },
        methods: {
            default: function () {
                popMagic.open_count++;
                var e = popMagic.url,
                    o = "popup";
                popMagic.open_count++;
                var i = window.open(e, o, "width=600,height=600");
                i && i.blur(), window.focus();
            },
            chromeTab: function () {
                popMagic.open_count++;
                var e = popMagic.url,
                    o = "popup";
                window.open(e, o, "width=600,height=600");
            },
            popup: function () {
                popMagic.open_count++;
                var e = popMagic.url,
                    o = "popup";
                popMagic.open_count++;
                var i = window.open(e, o, "width=600,height=600");
                i && i.blur(), window.focus();
            }
        },
        addEventToElement: function (e, o, i) {
            if ("string" == typeof e) {
                e = document.querySelector(e);
            }
            if (e && e.addEventListener) {
                e.addEventListener(o, i, !1);
            }
        },
        addEvent: function (e, o) {
            popMagic.addEventToElement(document, e, o), popMagic.addEventToElement(window, e, o);
        },
        getCookie: function (e) {
            var o = null;
            if (document.cookie.length) {
                var i = document.cookie.indexOf(e + "=");
                if (i >= 0) {
                    i += e.length + 1;
                    var t = document.cookie.indexOf(";", i);
                    if (-1 === t) t = document.cookie.length;
                    o = decodeURIComponent(document.cookie.substring(i, t));
                }
            }
            return o;
        },
        setCookie: function (e, o, i) {
            var t = new Date;
            t.setTime(t.getTime() + 24 * i * 60 * 60 * 1e3), document.cookie = e + "=" + encodeURIComponent(o) + "; expires=" + t.toUTCString() + "; path=/";
        },
        browserDetector: {
            detectBrowser: function (e) {
                var o = {
                    name: "unknown",
                    version: 0,
                    isMobile: !1
                };
                e.search(/(opera|opr)/i) > -1 ? (o.name = "opera", e.search(/(opera|opr)\/([\d.]+)/i) > -1 && (o.version = parseFloat(RegExp.$2))) : e.search(/chrome|crios/i) > -1 ? (o.name = "chrome", e.search(/(chrome|crios)\/([\d.]+)/i) > -1 && (o.version = parseFloat(RegExp.$2))) : e.search(/safari/i) > -1 ? (o.name = "safari", e.search(/version\/([\d.]+)/i) > -1 && (o.version = parseFloat(RegExp.$1))) : e.search(/firefox/i) > -1 ? (o.name = "firefox", e.search(/firefox\/([\d.]+)/i) > -1 && (o.version = parseFloat(RegExp.$1))) : e.search(/msie|trident/i) > -1 ? (o.name = "msie", e.search(/(msie|rv)[: ]([\d.]+)/i) > -1 && (o.version = parseFloat(RegExp.$2))) : e.search(/edge/i) > -1 ? (o.name = "edge", e.search(/edge\/([\d.]+)/i) > -1 && (o.version = parseFloat(RegExp.$1))) : o.name = "unknown";
                return o;
            }
        }
    };

    popMagic.init({
        idzone: 5391286,
        ads_host: "a.pemsrv.com",
        syndication_host: "s.pemsrv.com",
        frequency_count: 3,
        frequency_period: 1
    });
})();
