/**
 * Timing.js 1.0.1
 * Copyright 2014 Addy Osmani
 */
(function(window) {
    'use strict';

    /**
     * Navigation Timing API helpers
     * timing.getTimes();
     **/
    window.timing = window.timing || {
        /**
         * Outputs extended measurements using Navigation Timing API
         * @param  Object opts Options (simple (bool) - opts out of full data view)
         * @return Object      measurements
         */
        getTimes: function(opts) {
            var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
            var timing = performance.timing;
            var api = {};
            opts = opts || {};

            if (timing) {
                if (opts && !opts.simple) {
                    for (var k in timing) {
                        if (timing.hasOwnProperty(k)) {
                            api[k] = timing[k];
                        }
                    }
                }


                // Time to first paint
                if (api.firstPaint === undefined) {
                    // All times are relative times to the start time within the
                    // same objects
                    var firstPaint = 0;

                    // Chrome
                    if (window.chrome && window.chrome.loadTimes) {
                        // Convert to ms
                        firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
                        api.firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime * 1000);
                    }
                    // IE
                    else if (typeof window.performance.timing.msFirstPaint === 'number') {
                        firstPaint = window.performance.timing.msFirstPaint;
                        api.firstPaintTime = firstPaint - window.performance.timing.navigationStart;
                    }
                    // Firefox
                    // This will use the first times after MozAfterPaint fires
                    //else if (window.performance.timing.navigationStart && typeof InstallTrigger !== 'undefined') {
                    //    api.firstPaint = window.performance.timing.navigationStart;
                    //    api.firstPaintTime = mozFirstPaintTime - window.performance.timing.navigationStart;
                    //}
                    if (opts && !opts.simple) {
                        api.firstPaint = firstPaint;
                    }
                }

                // Total time from start to load
                api.loadTime = timing.loadEventEnd - timing.navigationStart;
                // Time spent constructing the DOM tree
                api.domReadyTime = timing.domComplete - timing.domInteractive;
                // Time consumed prepaing the new page
                api.readyStart = timing.fetchStart - timing.navigationStart;
                // Time spent during redirection
                api.redirectTime = timing.redirectEnd - timing.redirectStart;
                // AppCache
                api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
                // Time spent unloading documents
                api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
                // DNS query time
                api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
                // TCP connection time
                api.connectTime = timing.connectEnd - timing.connectStart;
                // Time spent during the request
                api.requestTime = timing.responseEnd - timing.requestStart;
                // Request to completion of the DOM loading
                api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
                // Load event time
                api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
            }

            return api;
        },
        /**
         * Uses console.table() to print a complete table of timing information
         * @param  Object opts Options (simple (bool) - opts out of full data view)
         */
        printTable: function(opts) {
            var table = {};
            var data = this.getTimes(opts);
            Object.keys(data).sort().forEach(function(k) {
                table[k] = {
                    ms: data[k],
                    s: +((data[k] / 1000).toFixed(2))
                };
            });
            console.table(table);
        },
        /**
         * Uses console.table() to print a summary table of timing information
         */
        printSimpleTable: function() {
            this.printTable({
                simple: true
            });
        }
    };

    // By default, print the simple table
    return timing.printSimpleTable();

})(this);
