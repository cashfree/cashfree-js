"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var V3_URL = "https://sdk.cashfree.com/js/v3/cashfree.js";
var V3_URL_REGEX = /^https:\/\/sdk\.cashfree\.com\/js\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "load was called but an existing Cashfree.js script already exists in the document; existing script parameters will be used";

// Checks whether v3 js script exists in the website
var findScript = function findScript() {
    var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));

    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];

        if (!V3_URL_REGEX.test(script.src)) {
            continue;
        }

        return script;
    }

    return null;
};

// Injects v3 js script to the website
var injectScript = function injectScript(params) {
    var queryString = "";
    var script = document.createElement("script");
    script.src = "".concat(V3_URL).concat(queryString);
    var headOrBody = document.head || document.body;

    if (!headOrBody) {
        throw new Error("Expected document.body not to be null. Cashfree.js requires a <body> element.");
    }

    headOrBody.appendChild(script);
    return script;
};

var cashfreePromise = null;
var loadScript = function loadScript(params) {
    // Ensure that we only attempt to load Cashfree.js at most once
    if (cashfreePromise !== null) {
        return cashfreePromise;
    }

    cashfreePromise = new Promise(function (resolve, reject) {
        if (typeof window === "undefined" || typeof document === "undefined") {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }

        if (window.Cashfree && params) {
            console.warn(EXISTING_SCRIPT_MESSAGE);
        }

        if (window.Cashfree) {
            resolve(window.Cashfree);
            return;
        }

        try {
            var script = findScript();

            if (script && params) {
                console.warn(EXISTING_SCRIPT_MESSAGE);
            } else if (!script) {
                script = injectScript(params);
            }

            script.addEventListener("load", function () {
                if (window.Cashfree) {
                    resolve(window.Cashfree);
                } else {
                    reject(new Error("Cashfree.js not available"));
                }
            });
            script.addEventListener("error", function () {
                reject(new Error("Failed to load Cashfree.js"));
            });
        } catch (error) {
            reject(error);
            return;
        }
    });
    return cashfreePromise;
};
var initCashfree = function initCashfree(maybeCashfree, args, startTime) {
    if (maybeCashfree === null) {
        return null;
    }

    var cashfree = maybeCashfree.apply(undefined, args);
    return cashfree;
};

var cashfreePromise$1 = Promise.resolve().then(function () {
    return loadScript(null);
});
var loadCalled = false;
cashfreePromise$1["catch"](function (err) {
    if (!loadCalled) {
        console.warn(err);
    }
});
var load = async function load() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    loadCalled = true;
    var startTime = Date.now();
    const maybeCashfree = await cashfreePromise$1;
    return initCashfree(maybeCashfree, args, startTime);
};
exports.load = load;
