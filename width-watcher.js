(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.WidthWatcher = factory();
    }
}(this, function () {
    'use strict';

    return function() {
        var mediaQueries = {}, wrappedListeners = {};

        /**
         * Adds breakpoints
         */
        function add() {
            var i, breakpoints = getIntArray(arguments);

            for (i = 0; i < breakpoints.length; i++) {
                if (typeof breakpoints[i] !== 'number' || breakpoints[i] <= 0) {
                    throw new Error('WidthWatcher only accepts unsigned integers');
                }

                if (typeof mediaQueries[breakpoints[i]] !== 'undefined') {
                    continue;
                }

                mediaQueries[breakpoints[i]] = {
                    "max": matchMedia('screen and (max-width: ' + breakpoints[i] + 'px)'),
                    "min": matchMedia('screen and (min-width: ' + breakpoints[i] + 'px)')
                };
            }
        }

        /**
         * Converts arguments to plain array
         * @param args
         * @returns {Array}
         */
        function getIntArray(args) {
            var i, retval = [];

            for (i = 0; i < args.length; i++) {
                if (Object.prototype.toString.call(args[i]) === '[object Array]') {
                    retval = retval.concat(args[i]);
                } else {
                    retval.push(args[i]);
                }
            }

            return retval;
        }

        /**
         * Remove breakpoint
         * @param breakpoint
         */
        function remove(breakpoint) {
            if (mediaQueries.hasOwnProperty(breakpoint)) {
                // TODO: remove
            }
        }

        /**
         * Adds and removes listeners to breakpoints
         * @param fn
         * @param breakpoint
         * @param direction
         * @param type
         */
        function toggleListener(fn, breakpoint, direction, type) {
            var i;

            type = type || 'add';

            if (typeof fn !== 'object') {
                fn = {
                    fn: fn,
                    direction: direction,
                    breakpoint: breakpoint
                };
            }

            console.log(wrapListener(fn.fn) == wrapListener(fn.fn));

            for (i in mediaQueries) {
                if (!mediaQueries.hasOwnProperty(i)) continue;

                if (typeof fn.breakpoint == 'undefined' || fn.breakpoint === parseInt(i)) {
                    if (typeof fn.direction == 'undefined' || fn.direction == 'up' || fn.direction == 'increase') {
                        if (type === 'add') {
                            mediaQueries[i].min.addListener(wrapListener(fn.fn));
                        } else {
                            mediaQueries[i].min.removeListener(wrapListener(fn.fn));
                        }
                    }

                    if (typeof fn.direction == 'undefined' || fn.direction == 'down' || fn.direction == 'decrease') {
                        if (type === 'add') {
                            mediaQueries[i].max.addListener(wrapListener(fn.fn));
                        } else {
                            mediaQueries[i].max.removeListener(wrapListener(fn.fn));
                        }
                    }
                }
            }
        }

        /**
         * Adds listener
         * @param fn
         * @param breakpoint
         * @param direction
         */
        function addListener(fn, breakpoint, direction) {
            toggleListener(fn, breakpoint, direction, 'add');
        }

        /**
         * Removes listener
         * @param fn
         * @param breakpoint
         * @param direction
         */
        function removeListener(fn, breakpoint, direction) {
            toggleListener(fn, breakpoint, direction, 'remove');
        }

        /**
         * Wrap listeners so they will ne executed only on match
         * @param fn
         * @returns {Function}
         */
        function wrapListener(fn) {
            // cache wrapped listeners to correctly remove them if needed
            if (typeof wrappedListeners[fn] === 'undefined') {
                wrappedListeners[fn] = function (mq) {
                    if (!mq.matches) return;
                    fn(customMediaQuery(mq));
                };
            }

            return wrappedListeners[fn];
        }

        /**
         * Shorthand for adding increase listener
         * @param fn
         * @param breakpoint
         */
        function addIncreaseListener(fn, breakpoint) {
            addListener({
                fn: fn,
                breakpoint: breakpoint,
                direction: 'increase'
            });
        }

        /**
         * Shorthand for adding decrease listener
         * @param fn
         * @param breakpoint
         */
        function addDecreaseListener(fn, breakpoint) {
            addListener({
                fn: fn,
                breakpoint: breakpoint,
                direction: 'decrease'
            });
        }

        /**
         * Returns array of added breakpoints
         * @returns {Array}
         */
        function getBreakpoints() {
            var retval = [];

            for (var i in mediaQueries) {
                if (!mediaQueries.hasOwnProperty(i)) continue;
                retval.push(parseInt(i));
            }

            return retval;
        }

        /**
         * Decorates native mediaQuery object
         * @param mediaQuery
         * @returns {*}
         */
        function customMediaQuery(mediaQuery) {
            mediaQuery.getValue = function () {
                var match = mediaQuery.media.match(/\d+/);
                return match ? match[0] : false;
            };

            return mediaQuery;
        }

        return {
            add: add,
            remove: remove,
            addListener: addListener,
            addDecreaseListener: addDecreaseListener,
            addIncreaseListener: addIncreaseListener,
            removeListener: removeListener,
            getBreakpoints: getBreakpoints
        };
    };
}));