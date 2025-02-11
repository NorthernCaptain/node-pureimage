(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('fs'), require('util'), require('stream'), require('zlib'), require('assert'), require('buffer')) :
    typeof define === 'function' && define.amd ? define(['exports', 'fs', 'util', 'stream', 'zlib', 'assert', 'buffer'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PureImage = {}, global.require$$0, global.util, global.Stream, global.zlib, global.require$$0$1, global.require$$1));
}(this, (function (exports, require$$0, util, Stream, zlib, require$$0$1, require$$1) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
    var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
    var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
    var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
    var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
    var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

    /**
     * Enumeration containing popular colors
     * @enum {string}
     */
    const NAMED_COLORS = {
        transparent: 0x00000000,
        aliceblue: 0xf0f8ffff,
        antiquewhite: 0xfaebd7ff,
        aqua: 0x00ffffff,
        aquamarine: 0x7fffd4ff,
        azure: 0xf0ffffff,
        beige: 0xf5f5dcff,
        bisque: 0xffe4c4ff,
        black: 0x000000ff,
        blanchedalmond: 0xffebcdff,
        blue: 0x0000ffff,
        blueviolet: 0x8a2be2ff,
        brown: 0xa52a2aff,
        burlywood: 0xdeb887ff,
        cadetblue: 0x5f9ea0ff,
        chartreuse: 0x7fff00ff,
        chocolate: 0xd2691eff,
        coral: 0xff7f50ff,
        cornflowerblue: 0x6495edff,
        cornsilk: 0xfff8dcff,
        crimson: 0xdc143cff,
        cyan: 0x00ffffff,
        darkblue: 0x00008bff,
        darkcyan: 0x008b8bff,
        darkgoldenrod: 0xb8860bff,
        darkgray: 0xa9a9a9ff,
        darkgreen: 0x006400ff,
        darkgrey: 0xa9a9a9ff,
        darkkhaki: 0xbdb76bff,
        darkmagenta: 0x8b008bff,
        darkolivegreen: 0x556b2fff,
        darkorange: 0xff8c00ff,
        darkorchid: 0x9932ccff,
        darkred: 0x8b0000ff,
        darksalmon: 0xe9967aff,
        darkseagreen: 0x8fbc8fff,
        darkslateblue: 0x483d8bff,
        darkslategray: 0x2f4f4fff,
        darkslategrey: 0x2f4f4fff,
        darkturquoise: 0x00ced1ff,
        darkviolet: 0x9400d3ff,
        deeppink: 0xff1493ff,
        deepskyblue: 0x00bfffff,
        dimgray: 0x696969ff,
        dimgrey: 0x696969ff,
        dodgerblue: 0x1e90ffff,
        firebrick: 0xb22222ff,
        floralwhite: 0xfffaf0ff,
        forestgreen: 0x228b22ff,
        fuchsia: 0xff00ffff,
        gainsboro: 0xdcdcdcff,
        ghostwhite: 0xf8f8ffff,
        gold: 0xffd700ff,
        goldenrod: 0xdaa520ff,
        gray: 0x808080ff,
        green: 0x008000ff,
        greenyellow: 0xadff2fff,
        grey: 0x808080ff,
        honeydew: 0xf0fff0ff,
        hotpink: 0xff69b4ff,
        indianred: 0xcd5c5cff,
        indigo: 0x4b0082ff,
        ivory: 0xfffff0ff,
        khaki: 0xf0e68cff,
        lavender: 0xe6e6faff,
        lavenderblush: 0xfff0f5ff,
        lawngreen: 0x7cfc00ff,
        lemonchiffon: 0xfffacdff,
        lightblue: 0xadd8e6ff,
        lightcoral: 0xf08080ff,
        lightcyan: 0xe0ffffff,
        lightgoldenrodyellow: 0xfafad2ff,
        lightgray: 0xd3d3d3ff,
        lightgreen: 0x90ee90ff,
        lightgrey: 0xd3d3d3ff,
        lightpink: 0xffb6c1ff,
        lightsalmon: 0xffa07aff,
        lightseagreen: 0x20b2aaff,
        lightskyblue: 0x87cefaff,
        lightslategray: 0x778899ff,
        lightslategrey: 0x778899ff,
        lightsteelblue: 0xb0c4deff,
        lightyellow: 0xffffe0ff,
        lime: 0x00ff00ff,
        limegreen: 0x32cd32ff,
        linen: 0xfaf0e6ff,
        magenta: 0xff00ffff,
        maroon: 0x800000ff,
        mediumaquamarine: 0x66cdaaff,
        mediumblue: 0x0000cdff,
        mediumorchid: 0xba55d3ff,
        mediumpurple: 0x9370dbff,
        mediumseagreen: 0x3cb371ff,
        mediumslateblue: 0x7b68eeff,
        mediumspringgreen: 0x00fa9aff,
        mediumturquoise: 0x48d1ccff,
        mediumvioletred: 0xc71585ff,
        midnightblue: 0x191970ff,
        mintcream: 0xf5fffaff,
        mistyrose: 0xffe4e1ff,
        moccasin: 0xffe4b5ff,
        navajowhite: 0xffdeadff,
        navy: 0x000080ff,
        oldlace: 0xfdf5e6ff,
        olive: 0x808000ff,
        olivedrab: 0x6b8e23ff,
        orange: 0xffa500ff,
        orangered: 0xff4500ff,
        orchid: 0xda70d6ff,
        palegoldenrod: 0xeee8aaff,
        palegreen: 0x98fb98ff,
        paleturquoise: 0xafeeeeff,
        palevioletred: 0xdb7093ff,
        papayawhip: 0xffefd5ff,
        peachpuff: 0xffdab9ff,
        peru: 0xcd853fff,
        pink: 0xffc0cbff,
        plum: 0xdda0ddff,
        powderblue: 0xb0e0e6ff,
        purple: 0x800080ff,
        rebeccapurple: 0x663399ff,
        red: 0xff0000ff,
        rosybrown: 0xbc8f8fff,
        royalblue: 0x4169e1ff,
        saddlebrown: 0x8b4513ff,
        salmon: 0xfa8072ff,
        sandybrown: 0xf4a460ff,
        seagreen: 0x2e8b57ff,
        seashell: 0xfff5eeff,
        sienna: 0xa0522dff,
        silver: 0xc0c0c0ff,
        skyblue: 0x87ceebff,
        slateblue: 0x6a5acdff,
        slategray: 0x708090ff,
        slategrey: 0x708090ff,
        snow: 0xfffafaff,
        springgreen: 0x00ff7fff,
        steelblue: 0x4682b4ff,
        tan: 0xd2b48cff,
        teal: 0x008080ff,
        thistle: 0xd8bfd8ff,
        tomato: 0xff6347ff,
        turquoise: 0x40e0d0ff,
        violet: 0xee82eeff,
        wheat: 0xf5deb3ff,
        white: 0xffffffff,
        whitesmoke: 0xf5f5f5ff,
        yellow: 0xffff00ff,
        yellowgreen: 0x9acd32ff
    };

    /**
     * Represents a set of co-ordinates on a 2D plane
     *
     * @class Point
     */
    class Point {
        /**
         * Creates an instance of Point.
         * @param {number} x X position
         * @param {number} y Y position
         *
         * @memberof Point
         */
        constructor (x, y) {
            /**
             * @type {number}
             */
            this.x = x;

            /**
             * @type {number}
             */
            this.y = y;
        }
        clone() {
            return new Point(this.x,this.y)
        }
        distance(pt) {
            return Math.sqrt(
                Math.pow(pt.x-this.x,2)+
                Math.pow(pt.y-this.y,2)
            )
        }
        add(pt) {
            return new Point(this.x+pt.x, this.y+pt.y)
        }
        subtract(pt) {
            return new Point(this.x-pt.x, this.y-pt.y)
        }
        magnitude() {
            return Math.sqrt(this.dotProduct(this))
        }
        dotProduct(v) {
            return this.x*v.x + this.y*v.y
        }
        divide(scalar) {
            return new Point(this.x/scalar, this.y/scalar)
        }
        floor() {
            return new Point(Math.floor(this.x), Math.floor(this.y))
        }
        round() {
            return new Point(Math.round(this.x), Math.round(this.y))
        }
        unit() {
            return this.divide(this.magnitude())
        }
        rotate(theta) {
            return new Point(
                Math.cos(theta)*this.x - Math.sin(theta)*this.y,
                Math.sin(theta)*this.x + Math.cos(theta)*this.y
            )
        }
        scale(scalar) {
            return new Point(
                this.x*scalar,
                this.y*scalar
            )
        }
        equals(pt) {
            return this.x === pt.x && this.y === pt.y;
        }
    }

    const toRad = (deg) => Math.PI/180*deg;


    function calc_min_bounds(pts) {
        let x1 = Number.POSITIVE_INFINITY;
        let y1 = Number.POSITIVE_INFINITY;
        let x2 = Number.NEGATIVE_INFINITY;
        let y2 = Number.NEGATIVE_INFINITY;
        pts.forEach(pt => {
            x1 = Math.min(x1,pt.x);
            y1 = Math.min(y1,pt.y);
            x2 = Math.max(x2,pt.x);
            y2 = Math.max(y2,pt.y);
        });
        return new Bounds(x1,y1,x2,y2)
    }

    class Bounds {
        constructor(x1,y1,x2,y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        contains(pt) {
            if(pt.x < this.x1) return false
            if(pt.x >= this.x2) return false
            if(pt.y < this.y1) return false
            if(pt.y >= this.y2) return false
            return true
        }

        intersect(bds) {
            let x1 = Math.max(this.x1,bds.x1);
            let y1 = Math.max(this.y1,bds.y1);
            let x2 = Math.min(this.x2,bds.x2);
            let y2 = Math.min(this.y2,bds.y2);
            return new Bounds(x1,y1,x2,y2)
        }
    }

    /**
     * Create a line object represnting a set of two points in 2D space.
     *
     * Line objects can be constructed by passing in either 4 numbers (startX, startY, endX, endY) - or
     * two {@link Point} objects representing `start` and `end` respectively
     *
     * @class Line
     */
    class Line {
        /**
         * Construct a Line using two {@link Point} objects
         * .
         * @param {Point} start An instance of {@link Point} containing X and Y co-ordinates
         * @param {Point} end   An instance of {@link Point} containing X and Y co-ordinates
         * @memberof Line
         */
        /**
         * Construct a Line using 4 {@link number}s
         *
         * @param {number} startX Starting position on the X axis
         * @param {number} startY Starting position on the Y axis
         * @param {number} endX   Ending position on the X axis
         * @param {number} endY   Ending position on the Y acis
         * @memberof Line
         */
        constructor (){
            if (arguments.length === 4) {

                /**
                 * @type {Point}
                */
                this.start = {};

                /**
                 * @type {Point}
                */
                this.end   = {};

                [this.start.x, this.start.y, this.end.x, this.end.y] = arguments;
                for(let argument_index in arguments) {
                    if(arguments.hasOwnProperty(argument_index)) {
                        let argument = arguments[argument_index];
                        if(typeof argument !== 'number'){
                            throw TypeError('When passing 4 arguments, only numbers may be passed');
                        }
                    }
                }
            } else if(arguments.length === 2) {
                [this.start, this.end] = arguments;
            } else {
                throw Error('Please pass either two Point objects, or 4 integers to the constructor');
            }
        }

        /**
         * Get the line length
         *
         * @returns {number}
         *
         * @memberof Line
         */
        getLength() {
            return Math.sqrt(
                Math.pow(this.start.x - this.end.x, 2) + Math.pow(this.start.y - this.end.y, 2)
            );
        }

        is_invalid() {
            if(Number.isNaN(this.start.x)) return true
            if(Number.isNaN(this.end.x)) return true
            if(Number.isNaN(this.start.y)) return true
            if(Number.isNaN(this.end.y)) return true
            if(this.start.x > Number.MAX_SAFE_INTEGER) return true
            if(this.start.y > Number.MAX_SAFE_INTEGER) return true
            if(this.end.x > Number.MAX_SAFE_INTEGER) return true
            if(this.end.y > Number.MAX_SAFE_INTEGER) return true
            return false
        }
    }

    /** @ignore */

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var encoding = createCommonjsModule(function (module, exports) {

    var cffStandardStrings = [
        '.notdef', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
        'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
        'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
        'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
        'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', 'exclamdown', 'cent', 'sterling',
        'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle', 'quotedblleft', 'guillemotleft',
        'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'endash', 'dagger', 'daggerdbl', 'periodcentered', 'paragraph',
        'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright', 'guillemotright', 'ellipsis', 'perthousand',
        'questiondown', 'grave', 'acute', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'dieresis', 'ring',
        'cedilla', 'hungarumlaut', 'ogonek', 'caron', 'emdash', 'AE', 'ordfeminine', 'Lslash', 'Oslash', 'OE',
        'ordmasculine', 'ae', 'dotlessi', 'lslash', 'oslash', 'oe', 'germandbls', 'onesuperior', 'logicalnot', 'mu',
        'trademark', 'Eth', 'onehalf', 'plusminus', 'Thorn', 'onequarter', 'divide', 'brokenbar', 'degree', 'thorn',
        'threequarters', 'twosuperior', 'registered', 'minus', 'eth', 'multiply', 'threesuperior', 'copyright',
        'Aacute', 'Acircumflex', 'Adieresis', 'Agrave', 'Aring', 'Atilde', 'Ccedilla', 'Eacute', 'Ecircumflex',
        'Edieresis', 'Egrave', 'Iacute', 'Icircumflex', 'Idieresis', 'Igrave', 'Ntilde', 'Oacute', 'Ocircumflex',
        'Odieresis', 'Ograve', 'Otilde', 'Scaron', 'Uacute', 'Ucircumflex', 'Udieresis', 'Ugrave', 'Yacute',
        'Ydieresis', 'Zcaron', 'aacute', 'acircumflex', 'adieresis', 'agrave', 'aring', 'atilde', 'ccedilla', 'eacute',
        'ecircumflex', 'edieresis', 'egrave', 'iacute', 'icircumflex', 'idieresis', 'igrave', 'ntilde', 'oacute',
        'ocircumflex', 'odieresis', 'ograve', 'otilde', 'scaron', 'uacute', 'ucircumflex', 'udieresis', 'ugrave',
        'yacute', 'ydieresis', 'zcaron', 'exclamsmall', 'Hungarumlautsmall', 'dollaroldstyle', 'dollarsuperior',
        'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', '266 ff', 'onedotenleader',
        'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle', 'fouroldstyle', 'fiveoldstyle', 'sixoldstyle',
        'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'commasuperior', 'threequartersemdash', 'periodsuperior',
        'questionsmall', 'asuperior', 'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', 'isuperior', 'lsuperior',
        'msuperior', 'nsuperior', 'osuperior', 'rsuperior', 'ssuperior', 'tsuperior', 'ff', 'ffi', 'ffl',
        'parenleftinferior', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
        'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
        'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
        'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', 'exclamdownsmall',
        'centoldstyle', 'Lslashsmall', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall', 'Brevesmall', 'Caronsmall',
        'Dotaccentsmall', 'Macronsmall', 'figuredash', 'hypheninferior', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall',
        'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds',
        'zerosuperior', 'foursuperior', 'fivesuperior', 'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior',
        'zeroinferior', 'oneinferior', 'twoinferior', 'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior',
        'seveninferior', 'eightinferior', 'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior',
        'commainferior', 'Agravesmall', 'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall',
        'Aringsmall', 'AEsmall', 'Ccedillasmall', 'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall',
        'Igravesmall', 'Iacutesmall', 'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall',
        'Oacutesmall', 'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall',
        'Uacutesmall', 'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall', '001.000',
        '001.001', '001.002', '001.003', 'Black', 'Bold', 'Book', 'Light', 'Medium', 'Regular', 'Roman', 'Semibold'];

    var cffStandardEncoding = [
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
        'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
        'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
        'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
        'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        'exclamdown', 'cent', 'sterling', 'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle',
        'quotedblleft', 'guillemotleft', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', '', 'endash', 'dagger',
        'daggerdbl', 'periodcentered', '', 'paragraph', 'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright',
        'guillemotright', 'ellipsis', 'perthousand', '', 'questiondown', '', 'grave', 'acute', 'circumflex', 'tilde',
        'macron', 'breve', 'dotaccent', 'dieresis', '', 'ring', 'cedilla', '', 'hungarumlaut', 'ogonek', 'caron',
        'emdash', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'AE', '', 'ordfeminine', '', '', '',
        '', 'Lslash', 'Oslash', 'OE', 'ordmasculine', '', '', '', '', '', 'ae', '', '', '', 'dotlessi', '', '',
        'lslash', 'oslash', 'oe', 'germandbls'];

    var cffExpertEncoding = [
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', 'space', 'exclamsmall', 'Hungarumlautsmall', '', 'dollaroldstyle', 'dollarsuperior',
        'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', 'twodotenleader', 'onedotenleader',
        'comma', 'hyphen', 'period', 'fraction', 'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle',
        'fouroldstyle', 'fiveoldstyle', 'sixoldstyle', 'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'colon',
        'semicolon', 'commasuperior', 'threequartersemdash', 'periodsuperior', 'questionsmall', '', 'asuperior',
        'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', '', '', 'isuperior', '', '', 'lsuperior', 'msuperior',
        'nsuperior', 'osuperior', '', '', 'rsuperior', 'ssuperior', 'tsuperior', '', 'ff', 'fi', 'fl', 'ffi', 'ffl',
        'parenleftinferior', '', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
        'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
        'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
        'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        'exclamdownsmall', 'centoldstyle', 'Lslashsmall', '', '', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall',
        'Brevesmall', 'Caronsmall', '', 'Dotaccentsmall', '', '', 'Macronsmall', '', '', 'figuredash', 'hypheninferior',
        '', '', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall', '', '', '', 'onequarter', 'onehalf', 'threequarters',
        'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds', '',
        '', 'zerosuperior', 'onesuperior', 'twosuperior', 'threesuperior', 'foursuperior', 'fivesuperior',
        'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior', 'zeroinferior', 'oneinferior', 'twoinferior',
        'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior', 'seveninferior', 'eightinferior',
        'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior', 'commainferior', 'Agravesmall',
        'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall', 'Aringsmall', 'AEsmall', 'Ccedillasmall',
        'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall', 'Igravesmall', 'Iacutesmall',
        'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall', 'Oacutesmall',
        'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall', 'Uacutesmall',
        'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall'];

    var standardNames = [
        '.notdef', '.null', 'nonmarkingreturn', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent',
        'ampersand', 'quotesingle', 'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash',
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less',
        'equal', 'greater', 'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright',
        'asciicircum', 'underscore', 'grave', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde',
        'Adieresis', 'Aring', 'Ccedilla', 'Eacute', 'Ntilde', 'Odieresis', 'Udieresis', 'aacute', 'agrave',
        'acircumflex', 'adieresis', 'atilde', 'aring', 'ccedilla', 'eacute', 'egrave', 'ecircumflex', 'edieresis',
        'iacute', 'igrave', 'icircumflex', 'idieresis', 'ntilde', 'oacute', 'ograve', 'ocircumflex', 'odieresis',
        'otilde', 'uacute', 'ugrave', 'ucircumflex', 'udieresis', 'dagger', 'degree', 'cent', 'sterling', 'section',
        'bullet', 'paragraph', 'germandbls', 'registered', 'copyright', 'trademark', 'acute', 'dieresis', 'notequal',
        'AE', 'Oslash', 'infinity', 'plusminus', 'lessequal', 'greaterequal', 'yen', 'mu', 'partialdiff', 'summation',
        'product', 'pi', 'integral', 'ordfeminine', 'ordmasculine', 'Omega', 'ae', 'oslash', 'questiondown',
        'exclamdown', 'logicalnot', 'radical', 'florin', 'approxequal', 'Delta', 'guillemotleft', 'guillemotright',
        'ellipsis', 'nonbreakingspace', 'Agrave', 'Atilde', 'Otilde', 'OE', 'oe', 'endash', 'emdash', 'quotedblleft',
        'quotedblright', 'quoteleft', 'quoteright', 'divide', 'lozenge', 'ydieresis', 'Ydieresis', 'fraction',
        'currency', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'daggerdbl', 'periodcentered', 'quotesinglbase',
        'quotedblbase', 'perthousand', 'Acircumflex', 'Ecircumflex', 'Aacute', 'Edieresis', 'Egrave', 'Iacute',
        'Icircumflex', 'Idieresis', 'Igrave', 'Oacute', 'Ocircumflex', 'apple', 'Ograve', 'Uacute', 'Ucircumflex',
        'Ugrave', 'dotlessi', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'ring', 'cedilla', 'hungarumlaut',
        'ogonek', 'caron', 'Lslash', 'lslash', 'Scaron', 'scaron', 'Zcaron', 'zcaron', 'brokenbar', 'Eth', 'eth',
        'Yacute', 'yacute', 'Thorn', 'thorn', 'minus', 'multiply', 'onesuperior', 'twosuperior', 'threesuperior',
        'onehalf', 'onequarter', 'threequarters', 'franc', 'Gbreve', 'gbreve', 'Idotaccent', 'Scedilla', 'scedilla',
        'Cacute', 'cacute', 'Ccaron', 'ccaron', 'dcroat'];

    // This is the encoding used for fonts created from scratch.
    // It loops through all glyphs and finds the appropriate unicode value.
    // Since it's linear time, other encodings will be faster.
    function DefaultEncoding(font) {
        this.font = font;
    }

    DefaultEncoding.prototype.charToGlyphIndex = function(c) {
        var code = c.charCodeAt(0);
        var glyphs = this.font.glyphs;
        if (glyphs) {
            for (var i = 0; i < glyphs.length; i += 1) {
                var glyph = glyphs.get(i);
                for (var j = 0; j < glyph.unicodes.length; j += 1) {
                    if (glyph.unicodes[j] === code) {
                        return i;
                    }
                }
            }
        } else {
            return null;
        }
    };

    function CmapEncoding(cmap) {
        this.cmap = cmap;
    }

    CmapEncoding.prototype.charToGlyphIndex = function(c) {
        return this.cmap.glyphIndexMap[c.charCodeAt(0)] || 0;
    };

    function CffEncoding(encoding, charset) {
        this.encoding = encoding;
        this.charset = charset;
    }

    CffEncoding.prototype.charToGlyphIndex = function(s) {
        var code = s.charCodeAt(0);
        var charName = this.encoding[code];
        return this.charset.indexOf(charName);
    };

    function GlyphNames(post) {
        var i;
        switch (post.version) {
        case 1:
            this.names = exports.standardNames.slice();
            break;
        case 2:
            this.names = new Array(post.numberOfGlyphs);
            for (i = 0; i < post.numberOfGlyphs; i++) {
                if (post.glyphNameIndex[i] < exports.standardNames.length) {
                    this.names[i] = exports.standardNames[post.glyphNameIndex[i]];
                } else {
                    this.names[i] = post.names[post.glyphNameIndex[i] - exports.standardNames.length];
                }
            }

            break;
        case 2.5:
            this.names = new Array(post.numberOfGlyphs);
            for (i = 0; i < post.numberOfGlyphs; i++) {
                this.names[i] = exports.standardNames[i + post.glyphNameIndex[i]];
            }

            break;
        case 3:
            this.names = [];
            break;
        }
    }

    GlyphNames.prototype.nameToGlyphIndex = function(name) {
        return this.names.indexOf(name);
    };

    GlyphNames.prototype.glyphIndexToName = function(gid) {
        return this.names[gid];
    };

    function addGlyphNames(font) {
        var glyph;
        var glyphIndexMap = font.tables.cmap.glyphIndexMap;
        var charCodes = Object.keys(glyphIndexMap);

        for (var i = 0; i < charCodes.length; i += 1) {
            var c = charCodes[i];
            var glyphIndex = glyphIndexMap[c];
            glyph = font.glyphs.get(glyphIndex);
            glyph.addUnicode(parseInt(c));
        }

        for (i = 0; i < font.glyphs.length; i += 1) {
            glyph = font.glyphs.get(i);
            if (font.cffEncoding) {
                glyph.name = font.cffEncoding.charset[i];
            } else {
                glyph.name = font.glyphNames.glyphIndexToName(i);
            }
        }
    }

    exports.cffStandardStrings = cffStandardStrings;
    exports.cffStandardEncoding = cffStandardEncoding;
    exports.cffExpertEncoding = cffExpertEncoding;
    exports.standardNames = standardNames;
    exports.DefaultEncoding = DefaultEncoding;
    exports.CmapEncoding = CmapEncoding;
    exports.CffEncoding = CffEncoding;
    exports.GlyphNames = GlyphNames;
    exports.addGlyphNames = addGlyphNames;
    });

    // Geometric objects

    // A bézier path containing a set of path commands similar to a SVG path.
    // Paths can be drawn on a context using `draw`.
    function Path() {
        this.commands = [];
        this.fill = 'black';
        this.stroke = null;
        this.strokeWidth = 1;
    }

    Path.prototype.moveTo = function(x, y) {
        this.commands.push({
            type: 'M',
            x: x,
            y: y
        });
    };

    Path.prototype.lineTo = function(x, y) {
        this.commands.push({
            type: 'L',
            x: x,
            y: y
        });
    };

    Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x2, y2, x, y) {
        this.commands.push({
            type: 'C',
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            x: x,
            y: y
        });
    };

    Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x, y) {
        this.commands.push({
            type: 'Q',
            x1: x1,
            y1: y1,
            x: x,
            y: y
        });
    };

    Path.prototype.close = Path.prototype.closePath = function() {
        this.commands.push({
            type: 'Z'
        });
    };

    // Add the given path or list of commands to the commands of this path.
    Path.prototype.extend = function(pathOrCommands) {
        if (pathOrCommands.commands) {
            pathOrCommands = pathOrCommands.commands;
        }

        Array.prototype.push.apply(this.commands, pathOrCommands);
    };

    // Draw the path to a 2D context.
    Path.prototype.draw = function(ctx) {
        ctx.beginPath();
        for (var i = 0; i < this.commands.length; i += 1) {
            var cmd = this.commands[i];
            if (cmd.type === 'M') {
                ctx.moveTo(cmd.x, cmd.y);
            } else if (cmd.type === 'L') {
                ctx.lineTo(cmd.x, cmd.y);
            } else if (cmd.type === 'C') {
                ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
            } else if (cmd.type === 'Q') {
                ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
            } else if (cmd.type === 'Z') {
                ctx.closePath();
            }
        }

        if (this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fill();
        }

        if (this.stroke) {
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = this.strokeWidth;
            ctx.stroke();
        }
    };

    // Convert the Path to a string of path data instructions
    // See http://www.w3.org/TR/SVG/paths.html#PathData
    // Parameters:
    // - decimalPlaces: The amount of decimal places for floating-point values (default: 2)
    Path.prototype.toPathData = function(decimalPlaces) {
        decimalPlaces = decimalPlaces !== undefined ? decimalPlaces : 2;

        function floatToString(v) {
            if (Math.round(v) === v) {
                return '' + Math.round(v);
            } else {
                return v.toFixed(decimalPlaces);
            }
        }

        function packValues() {
            var s = '';
            for (var i = 0; i < arguments.length; i += 1) {
                var v = arguments[i];
                if (v >= 0 && i > 0) {
                    s += ' ';
                }

                s += floatToString(v);
            }

            return s;
        }

        var d = '';
        for (var i = 0; i < this.commands.length; i += 1) {
            var cmd = this.commands[i];
            if (cmd.type === 'M') {
                d += 'M' + packValues(cmd.x, cmd.y);
            } else if (cmd.type === 'L') {
                d += 'L' + packValues(cmd.x, cmd.y);
            } else if (cmd.type === 'C') {
                d += 'C' + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
            } else if (cmd.type === 'Q') {
                d += 'Q' + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
            } else if (cmd.type === 'Z') {
                d += 'Z';
            }
        }

        return d;
    };

    // Convert the path to a SVG <path> element, as a string.
    // Parameters:
    // - decimalPlaces: The amount of decimal places for floating-point values (default: 2)
    Path.prototype.toSVG = function(decimalPlaces) {
        var svg = '<path d="';
        svg += this.toPathData(decimalPlaces);
        svg += '"';
        if (this.fill & this.fill !== 'black') {
            if (this.fill === null) {
                svg += ' fill="none"';
            } else {
                svg += ' fill="' + this.fill + '"';
            }
        }

        if (this.stroke) {
            svg += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"';
        }

        svg += '/>';
        return svg;
    };

    var Path_1 = Path;

    var path = {
    	Path: Path_1
    };

    var check = createCommonjsModule(function (module, exports) {

    // Precondition function that checks if the given predicate is true.
    // If not, it will throw an error.
    exports.argument = function(predicate, message) {
        if (!predicate) {
            throw new Error(message);
        }
    };

    // Precondition function that checks if the given assertion is true.
    // If not, it will throw an error.
    exports.assert = exports.argument;
    });

    var LIMIT16 = 32768; // The limit at which a 16-bit number switches signs == 2^15
    var LIMIT32 = 2147483648; // The limit at which a 32-bit number switches signs == 2 ^ 31

    var decode$1 = {};
    var encode$2 = {};
    var sizeOf$1 = {};

    // Return a function that always returns the same value.
    function constant(v) {
        return function() {
            return v;
        };
    }

    // OpenType data types //////////////////////////////////////////////////////

    // Convert an 8-bit unsigned integer to a list of 1 byte.
    encode$2.BYTE = function(v) {
        check.argument(v >= 0 && v <= 255, 'Byte value should be between 0 and 255.');
        return [v];
    };

    sizeOf$1.BYTE = constant(1);

    // Convert a 8-bit signed integer to a list of 1 byte.
    encode$2.CHAR = function(v) {
        return [v.charCodeAt(0)];
    };

    sizeOf$1.CHAR = constant(1);

    // Convert an ASCII string to a list of bytes.
    encode$2.CHARARRAY = function(v) {
        var b = [];
        for (var i = 0; i < v.length; i += 1) {
            b.push(v.charCodeAt(i));
        }

        return b;
    };

    sizeOf$1.CHARARRAY = function(v) {
        return v.length;
    };

    // Convert a 16-bit unsigned integer to a list of 2 bytes.
    encode$2.USHORT = function(v) {
        return [(v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.USHORT = constant(2);

    // Convert a 16-bit signed integer to a list of 2 bytes.
    encode$2.SHORT = function(v) {
        // Two's complement
        if (v >= LIMIT16) {
            v = -(2 * LIMIT16 - v);
        }

        return [(v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.SHORT = constant(2);

    // Convert a 24-bit unsigned integer to a list of 3 bytes.
    encode$2.UINT24 = function(v) {
        return [(v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.UINT24 = constant(3);

    // Convert a 32-bit unsigned integer to a list of 4 bytes.
    encode$2.ULONG = function(v) {
        return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.ULONG = constant(4);

    // Convert a 32-bit unsigned integer to a list of 4 bytes.
    encode$2.LONG = function(v) {
        // Two's complement
        if (v >= LIMIT32) {
            v = -(2 * LIMIT32 - v);
        }

        return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.LONG = constant(4);

    encode$2.FIXED = encode$2.ULONG;
    sizeOf$1.FIXED = sizeOf$1.ULONG;

    encode$2.FWORD = encode$2.SHORT;
    sizeOf$1.FWORD = sizeOf$1.SHORT;

    encode$2.UFWORD = encode$2.USHORT;
    sizeOf$1.UFWORD = sizeOf$1.USHORT;

    // FIXME Implement LONGDATETIME
    encode$2.LONGDATETIME = function() {
        return [0, 0, 0, 0, 0, 0, 0, 0];
    };

    sizeOf$1.LONGDATETIME = constant(8);

    // Convert a 4-char tag to a list of 4 bytes.
    encode$2.TAG = function(v) {
        check.argument(v.length === 4, 'Tag should be exactly 4 ASCII characters.');
        return [v.charCodeAt(0),
                v.charCodeAt(1),
                v.charCodeAt(2),
                v.charCodeAt(3)];
    };

    sizeOf$1.TAG = constant(4);

    // CFF data types ///////////////////////////////////////////////////////////

    encode$2.Card8 = encode$2.BYTE;
    sizeOf$1.Card8 = sizeOf$1.BYTE;

    encode$2.Card16 = encode$2.USHORT;
    sizeOf$1.Card16 = sizeOf$1.USHORT;

    encode$2.OffSize = encode$2.BYTE;
    sizeOf$1.OffSize = sizeOf$1.BYTE;

    encode$2.SID = encode$2.USHORT;
    sizeOf$1.SID = sizeOf$1.USHORT;

    // Convert a numeric operand or charstring number to a variable-size list of bytes.
    encode$2.NUMBER = function(v) {
        if (v >= -107 && v <= 107) {
            return [v + 139];
        } else if (v >= 108 && v <= 1131) {
            v = v - 108;
            return [(v >> 8) + 247, v & 0xFF];
        } else if (v >= -1131 && v <= -108) {
            v = -v - 108;
            return [(v >> 8) + 251, v & 0xFF];
        } else if (v >= -32768 && v <= 32767) {
            return encode$2.NUMBER16(v);
        } else {
            return encode$2.NUMBER32(v);
        }
    };

    sizeOf$1.NUMBER = function(v) {
        return encode$2.NUMBER(v).length;
    };

    // Convert a signed number between -32768 and +32767 to a three-byte value.
    // This ensures we always use three bytes, but is not the most compact format.
    encode$2.NUMBER16 = function(v) {
        return [28, (v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.NUMBER16 = constant(3);

    // Convert a signed number between -(2^31) and +(2^31-1) to a five-byte value.
    // This is useful if you want to be sure you always use four bytes,
    // at the expense of wasting a few bytes for smaller numbers.
    encode$2.NUMBER32 = function(v) {
        return [29, (v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
    };

    sizeOf$1.NUMBER32 = constant(5);

    encode$2.REAL = function(v) {
        var value = v.toString();

        // Some numbers use an epsilon to encode the value. (e.g. JavaScript will store 0.0000001 as 1e-7)
        // This code converts it back to a number without the epsilon.
        var m = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);
        if (m) {
            var epsilon = parseFloat('1e' + ((m[2] ? +m[2] : 0) + m[1].length));
            value = (Math.round(v * epsilon) / epsilon).toString();
        }

        var nibbles = '';
        var i;
        var ii;
        for (i = 0, ii = value.length; i < ii; i += 1) {
            var c = value[i];
            if (c === 'e') {
                nibbles += value[++i] === '-' ? 'c' : 'b';
            } else if (c === '.') {
                nibbles += 'a';
            } else if (c === '-') {
                nibbles += 'e';
            } else {
                nibbles += c;
            }
        }

        nibbles += (nibbles.length & 1) ? 'f' : 'ff';
        var out = [30];
        for (i = 0, ii = nibbles.length; i < ii; i += 2) {
            out.push(parseInt(nibbles.substr(i, 2), 16));
        }

        return out;
    };

    sizeOf$1.REAL = function(v) {
        return encode$2.REAL(v).length;
    };

    encode$2.NAME = encode$2.CHARARRAY;
    sizeOf$1.NAME = sizeOf$1.CHARARRAY;

    encode$2.STRING = encode$2.CHARARRAY;
    sizeOf$1.STRING = sizeOf$1.CHARARRAY;

    decode$1.UTF16 = function(data, offset, numBytes) {
        var codePoints = [];
        var numChars = numBytes / 2;
        for (var j = 0; j < numChars; j++, offset += 2) {
            codePoints[j] = data.getUint16(offset);
        }

        return String.fromCharCode.apply(null, codePoints);
    };

    // Convert a JavaScript string to UTF16-BE.
    encode$2.UTF16 = function(v) {
        var b = [];
        for (var i = 0; i < v.length; i += 1) {
            var codepoint = v.charCodeAt(i);
            b.push((codepoint >> 8) & 0xFF);
            b.push(codepoint & 0xFF);
        }

        return b;
    };

    sizeOf$1.UTF16 = function(v) {
        return v.length * 2;
    };

    // Data for converting old eight-bit Macintosh encodings to Unicode.
    // This representation is optimized for decoding; encoding is slower
    // and needs more memory. The assumption is that all opentype.js users
    // want to open fonts, but saving a font will be comperatively rare
    // so it can be more expensive. Keyed by IANA character set name.
    //
    // Python script for generating these strings:
    //
    //     s = u''.join([chr(c).decode('mac_greek') for c in range(128, 256)])
    //     print(s.encode('utf-8'))
    var eightBitMacEncodings = {
        'x-mac-croatian':  // Python: 'mac_croatian'
            'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø' +
            '¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ',
        'x-mac-cyrillic':  // Python: 'mac_cyrillic'
            'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњ' +
            'јЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю',
        'x-mac-gaelic':
            // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/GAELIC.TXT
            'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæø' +
            'ṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ',
        'x-mac-greek':  // Python: 'mac_greek'
            'Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩ' +
            'άΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ\u00AD',
        'x-mac-icelandic':  // Python: 'mac_iceland'
            'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
            '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
        'x-mac-inuit':
            // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/INUIT.TXT
            'ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗ' +
            'ᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł',
        'x-mac-ce':  // Python: 'mac_latin2'
            'ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅ' +
            'ņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ',
        macintosh:  // Python: 'mac_roman'
            'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
            '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
        'x-mac-romanian':  // Python: 'mac_romanian'
            'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș' +
            '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
        'x-mac-turkish':  // Python: 'mac_turkish'
            'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
            '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ'
    };

    // Decodes an old-style Macintosh string. Returns either a Unicode JavaScript
    // string, or 'undefined' if the encoding is unsupported. For example, we do
    // not support Chinese, Japanese or Korean because these would need large
    // mapping tables.
    decode$1.MACSTRING = function(dataView, offset, dataLength, encoding) {
        var table = eightBitMacEncodings[encoding];
        if (table === undefined) {
            return undefined;
        }

        var result = '';
        for (var i = 0; i < dataLength; i++) {
            var c = dataView.getUint8(offset + i);
            // In all eight-bit Mac encodings, the characters 0x00..0x7F are
            // mapped to U+0000..U+007F; we only need to look up the others.
            if (c <= 0x7F) {
                result += String.fromCharCode(c);
            } else {
                result += table[c & 0x7F];
            }
        }

        return result;
    };

    // Helper function for encode.MACSTRING. Returns a dictionary for mapping
    // Unicode character codes to their 8-bit MacOS equivalent. This table
    // is not exactly a super cheap data structure, but we do not care because
    // encoding Macintosh strings is only rarely needed in typical applications.
    var macEncodingTableCache = typeof WeakMap === 'function' && new WeakMap();
    var macEncodingCacheKeys;
    var getMacEncodingTable = function(encoding) {
        // Since we use encoding as a cache key for WeakMap, it has to be
        // a String object and not a literal. And at least on NodeJS 2.10.1,
        // WeakMap requires that the same String instance is passed for cache hits.
        if (!macEncodingCacheKeys) {
            macEncodingCacheKeys = {};
            for (var e in eightBitMacEncodings) {
                /*jshint -W053 */  // Suppress "Do not use String as a constructor."
                macEncodingCacheKeys[e] = new String(e);
            }
        }

        var cacheKey = macEncodingCacheKeys[encoding];
        if (cacheKey === undefined) {
            return undefined;
        }

        // We can't do "if (cache.has(key)) {return cache.get(key)}" here:
        // since garbage collection may run at any time, it could also kick in
        // between the calls to cache.has() and cache.get(). In that case,
        // we would return 'undefined' even though we do support the encoding.
        if (macEncodingTableCache) {
            var cachedTable = macEncodingTableCache.get(cacheKey);
            if (cachedTable !== undefined) {
                return cachedTable;
            }
        }

        var decodingTable = eightBitMacEncodings[encoding];
        if (decodingTable === undefined) {
            return undefined;
        }

        var encodingTable = {};
        for (var i = 0; i < decodingTable.length; i++) {
            encodingTable[decodingTable.charCodeAt(i)] = i + 0x80;
        }

        if (macEncodingTableCache) {
            macEncodingTableCache.set(cacheKey, encodingTable);
        }

        return encodingTable;
    };

    // Encodes an old-style Macintosh string. Returns a byte array upon success.
    // If the requested encoding is unsupported, or if the input string contains
    // a character that cannot be expressed in the encoding, the function returns
    // 'undefined'.
    encode$2.MACSTRING = function(str, encoding) {
        var table = getMacEncodingTable(encoding);
        if (table === undefined) {
            return undefined;
        }

        var result = [];
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);

            // In all eight-bit Mac encodings, the characters 0x00..0x7F are
            // mapped to U+0000..U+007F; we only need to look up the others.
            if (c >= 0x80) {
                c = table[c];
                if (c === undefined) {
                    // str contains a Unicode character that cannot be encoded
                    // in the requested encoding.
                    return undefined;
                }
            }

            result.push(c);
        }

        return result;
    };

    sizeOf$1.MACSTRING = function(str, encoding) {
        var b = encode$2.MACSTRING(str, encoding);
        if (b !== undefined) {
            return b.length;
        } else {
            return 0;
        }
    };

    // Convert a list of values to a CFF INDEX structure.
    // The values should be objects containing name / type / value.
    encode$2.INDEX = function(l) {
        var i;
        //var offset, offsets, offsetEncoder, encodedOffsets, encodedOffset, data,
        //    dataSize, i, v;
        // Because we have to know which data type to use to encode the offsets,
        // we have to go through the values twice: once to encode the data and
        // calculate the offets, then again to encode the offsets using the fitting data type.
        var offset = 1; // First offset is always 1.
        var offsets = [offset];
        var data = [];
        var dataSize = 0;
        for (i = 0; i < l.length; i += 1) {
            var v = encode$2.OBJECT(l[i]);
            Array.prototype.push.apply(data, v);
            dataSize += v.length;
            offset += v.length;
            offsets.push(offset);
        }

        if (data.length === 0) {
            return [0, 0];
        }

        var encodedOffsets = [];
        var offSize = (1 + Math.floor(Math.log(dataSize) / Math.log(2)) / 8) | 0;
        var offsetEncoder = [undefined, encode$2.BYTE, encode$2.USHORT, encode$2.UINT24, encode$2.ULONG][offSize];
        for (i = 0; i < offsets.length; i += 1) {
            var encodedOffset = offsetEncoder(offsets[i]);
            Array.prototype.push.apply(encodedOffsets, encodedOffset);
        }

        return Array.prototype.concat(encode$2.Card16(l.length),
                               encode$2.OffSize(offSize),
                               encodedOffsets,
                               data);
    };

    sizeOf$1.INDEX = function(v) {
        return encode$2.INDEX(v).length;
    };

    // Convert an object to a CFF DICT structure.
    // The keys should be numeric.
    // The values should be objects containing name / type / value.
    encode$2.DICT = function(m) {
        var d = [];
        var keys = Object.keys(m);
        var length = keys.length;

        for (var i = 0; i < length; i += 1) {
            // Object.keys() return string keys, but our keys are always numeric.
            var k = parseInt(keys[i], 0);
            var v = m[k];
            // Value comes before the key.
            d = d.concat(encode$2.OPERAND(v.value, v.type));
            d = d.concat(encode$2.OPERATOR(k));
        }

        return d;
    };

    sizeOf$1.DICT = function(m) {
        return encode$2.DICT(m).length;
    };

    encode$2.OPERATOR = function(v) {
        if (v < 1200) {
            return [v];
        } else {
            return [12, v - 1200];
        }
    };

    encode$2.OPERAND = function(v, type) {
        var d = [];
        if (Array.isArray(type)) {
            for (var i = 0; i < type.length; i += 1) {
                check.argument(v.length === type.length, 'Not enough arguments given for type' + type);
                d = d.concat(encode$2.OPERAND(v[i], type[i]));
            }
        } else {
            if (type === 'SID') {
                d = d.concat(encode$2.NUMBER(v));
            } else if (type === 'offset') {
                // We make it easy for ourselves and always encode offsets as
                // 4 bytes. This makes offset calculation for the top dict easier.
                d = d.concat(encode$2.NUMBER32(v));
            } else if (type === 'number') {
                d = d.concat(encode$2.NUMBER(v));
            } else if (type === 'real') {
                d = d.concat(encode$2.REAL(v));
            } else {
                throw new Error('Unknown operand type ' + type);
                // FIXME Add support for booleans
            }
        }

        return d;
    };

    encode$2.OP = encode$2.BYTE;
    sizeOf$1.OP = sizeOf$1.BYTE;

    // memoize charstring encoding using WeakMap if available
    var wmm = typeof WeakMap === 'function' && new WeakMap();
    // Convert a list of CharString operations to bytes.
    encode$2.CHARSTRING = function(ops) {
        // See encode.MACSTRING for why we don't do "if (wmm && wmm.has(ops))".
        if (wmm) {
            var cachedValue = wmm.get(ops);
            if (cachedValue !== undefined) {
                return cachedValue;
            }
        }

        var d = [];
        var length = ops.length;

        for (var i = 0; i < length; i += 1) {
            var op = ops[i];
            d = d.concat(encode$2[op.type](op.value));
        }

        if (wmm) {
            wmm.set(ops, d);
        }

        return d;
    };

    sizeOf$1.CHARSTRING = function(ops) {
        return encode$2.CHARSTRING(ops).length;
    };

    // Utility functions ////////////////////////////////////////////////////////

    // Convert an object containing name / type / value to bytes.
    encode$2.OBJECT = function(v) {
        var encodingFunction = encode$2[v.type];
        check.argument(encodingFunction !== undefined, 'No encoding function for type ' + v.type);
        return encodingFunction(v.value);
    };

    sizeOf$1.OBJECT = function(v) {
        var sizeOfFunction = sizeOf$1[v.type];
        check.argument(sizeOfFunction !== undefined, 'No sizeOf function for type ' + v.type);
        return sizeOfFunction(v.value);
    };

    // Convert a table object to bytes.
    // A table contains a list of fields containing the metadata (name, type and default value).
    // The table itself has the field values set as attributes.
    encode$2.TABLE = function(table) {
        var d = [];
        var length = table.fields.length;

        for (var i = 0; i < length; i += 1) {
            var field = table.fields[i];
            var encodingFunction = encode$2[field.type];
            check.argument(encodingFunction !== undefined, 'No encoding function for field type ' + field.type);
            var value = table[field.name];
            if (value === undefined) {
                value = field.value;
            }

            var bytes = encodingFunction(value);
            d = d.concat(bytes);
        }

        return d;
    };

    sizeOf$1.TABLE = function(table) {
        var numBytes = 0;
        var length = table.fields.length;

        for (var i = 0; i < length; i += 1) {
            var field = table.fields[i];
            var sizeOfFunction = sizeOf$1[field.type];
            check.argument(sizeOfFunction !== undefined, 'No sizeOf function for field type ' + field.type);
            var value = table[field.name];
            if (value === undefined) {
                value = field.value;
            }

            numBytes += sizeOfFunction(value);
        }

        return numBytes;
    };

    // Merge in a list of bytes.
    encode$2.LITERAL = function(v) {
        return v;
    };

    sizeOf$1.LITERAL = function(v) {
        return v.length;
    };

    var decode_1 = decode$1;
    var encode_1 = encode$2;
    var sizeOf_1 = sizeOf$1;

    var types = {
    	decode: decode_1,
    	encode: encode_1,
    	sizeOf: sizeOf_1
    };

    var encode$1 = types.encode;
    var sizeOf = types.sizeOf;

    function Table(tableName, fields, options) {
        var i;
        for (i = 0; i < fields.length; i += 1) {
            var field = fields[i];
            this[field.name] = field.value;
        }

        this.tableName = tableName;
        this.fields = fields;
        if (options) {
            var optionKeys = Object.keys(options);
            for (i = 0; i < optionKeys.length; i += 1) {
                var k = optionKeys[i];
                var v = options[k];
                if (this[k] !== undefined) {
                    this[k] = v;
                }
            }
        }
    }

    Table.prototype.sizeOf = function() {
        var v = 0;
        for (var i = 0; i < this.fields.length; i += 1) {
            var field = this.fields[i];
            var value = this[field.name];
            if (value === undefined) {
                value = field.value;
            }

            if (typeof value.sizeOf === 'function') {
                v += value.sizeOf();
            } else {
                var sizeOfFunction = sizeOf[field.type];
                check.assert(typeof sizeOfFunction === 'function', 'Could not find sizeOf function for field' + field.name);
                v += sizeOfFunction(value);
            }
        }

        return v;
    };

    Table.prototype.encode = function() {
        return encode$1.TABLE(this);
    };

    var Table_1 = Table;

    var table = {
    	Table: Table_1
    };

    var parse = createCommonjsModule(function (module, exports) {

    // Retrieve an unsigned byte from the DataView.
    exports.getByte = function getByte(dataView, offset) {
        return dataView.getUint8(offset);
    };

    exports.getCard8 = exports.getByte;

    // Retrieve an unsigned 16-bit short from the DataView.
    // The value is stored in big endian.
    exports.getUShort = function(dataView, offset) {
        return dataView.getUint16(offset, false);
    };

    exports.getCard16 = exports.getUShort;

    // Retrieve a signed 16-bit short from the DataView.
    // The value is stored in big endian.
    exports.getShort = function(dataView, offset) {
        return dataView.getInt16(offset, false);
    };

    // Retrieve an unsigned 32-bit long from the DataView.
    // The value is stored in big endian.
    exports.getULong = function(dataView, offset) {
        return dataView.getUint32(offset, false);
    };

    // Retrieve a 32-bit signed fixed-point number (16.16) from the DataView.
    // The value is stored in big endian.
    exports.getFixed = function(dataView, offset) {
        var decimal = dataView.getInt16(offset, false);
        var fraction = dataView.getUint16(offset + 2, false);
        return decimal + fraction / 65535;
    };

    // Retrieve a 4-character tag from the DataView.
    // Tags are used to identify tables.
    exports.getTag = function(dataView, offset) {
        var tag = '';
        for (var i = offset; i < offset + 4; i += 1) {
            tag += String.fromCharCode(dataView.getInt8(i));
        }

        return tag;
    };

    // Retrieve an offset from the DataView.
    // Offsets are 1 to 4 bytes in length, depending on the offSize argument.
    exports.getOffset = function(dataView, offset, offSize) {
        var v = 0;
        for (var i = 0; i < offSize; i += 1) {
            v <<= 8;
            v += dataView.getUint8(offset + i);
        }

        return v;
    };

    // Retrieve a number of bytes from start offset to the end offset from the DataView.
    exports.getBytes = function(dataView, startOffset, endOffset) {
        var bytes = [];
        for (var i = startOffset; i < endOffset; i += 1) {
            bytes.push(dataView.getUint8(i));
        }

        return bytes;
    };

    // Convert the list of bytes to a string.
    exports.bytesToString = function(bytes) {
        var s = '';
        for (var i = 0; i < bytes.length; i += 1) {
            s += String.fromCharCode(bytes[i]);
        }

        return s;
    };

    var typeOffsets = {
        byte: 1,
        uShort: 2,
        short: 2,
        uLong: 4,
        fixed: 4,
        longDateTime: 8,
        tag: 4
    };

    // A stateful parser that changes the offset whenever a value is retrieved.
    // The data is a DataView.
    function Parser(data, offset) {
        this.data = data;
        this.offset = offset;
        this.relativeOffset = 0;
    }

    Parser.prototype.parseByte = function() {
        var v = this.data.getUint8(this.offset + this.relativeOffset);
        this.relativeOffset += 1;
        return v;
    };

    Parser.prototype.parseChar = function() {
        var v = this.data.getInt8(this.offset + this.relativeOffset);
        this.relativeOffset += 1;
        return v;
    };

    Parser.prototype.parseCard8 = Parser.prototype.parseByte;

    Parser.prototype.parseUShort = function() {
        var v = this.data.getUint16(this.offset + this.relativeOffset);
        this.relativeOffset += 2;
        return v;
    };

    Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
    Parser.prototype.parseSID = Parser.prototype.parseUShort;
    Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;

    Parser.prototype.parseShort = function() {
        var v = this.data.getInt16(this.offset + this.relativeOffset);
        this.relativeOffset += 2;
        return v;
    };

    Parser.prototype.parseF2Dot14 = function() {
        var v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
        this.relativeOffset += 2;
        return v;
    };

    Parser.prototype.parseULong = function() {
        var v = exports.getULong(this.data, this.offset + this.relativeOffset);
        this.relativeOffset += 4;
        return v;
    };

    Parser.prototype.parseFixed = function() {
        var v = exports.getFixed(this.data, this.offset + this.relativeOffset);
        this.relativeOffset += 4;
        return v;
    };

    Parser.prototype.parseOffset16List =
    Parser.prototype.parseUShortList = function(count) {
        var offsets = new Array(count);
        var dataView = this.data;
        var offset = this.offset + this.relativeOffset;
        for (var i = 0; i < count; i++) {
            offsets[i] = exports.getUShort(dataView, offset);
            offset += 2;
        }

        this.relativeOffset += count * 2;
        return offsets;
    };

    Parser.prototype.parseString = function(length) {
        var dataView = this.data;
        var offset = this.offset + this.relativeOffset;
        var string = '';
        this.relativeOffset += length;
        for (var i = 0; i < length; i++) {
            string += String.fromCharCode(dataView.getUint8(offset + i));
        }

        return string;
    };

    Parser.prototype.parseTag = function() {
        return this.parseString(4);
    };

    // LONGDATETIME is a 64-bit integer.
    // JavaScript and unix timestamps traditionally use 32 bits, so we
    // only take the last 32 bits.
    Parser.prototype.parseLongDateTime = function() {
        var v = exports.getULong(this.data, this.offset + this.relativeOffset + 4);
        this.relativeOffset += 8;
        return v;
    };

    Parser.prototype.parseFixed = function() {
        var v = exports.getULong(this.data, this.offset + this.relativeOffset);
        this.relativeOffset += 4;
        return v / 65536;
    };

    Parser.prototype.parseVersion = function() {
        var major = exports.getUShort(this.data, this.offset + this.relativeOffset);

        // How to interpret the minor version is very vague in the spec. 0x5000 is 5, 0x1000 is 1
        // This returns the correct number if minor = 0xN000 where N is 0-9
        var minor = exports.getUShort(this.data, this.offset + this.relativeOffset + 2);
        this.relativeOffset += 4;
        return major + minor / 0x1000 / 10;
    };

    Parser.prototype.skip = function(type, amount) {
        if (amount === undefined) {
            amount = 1;
        }

        this.relativeOffset += typeOffsets[type] * amount;
    };

    exports.Parser = Parser;
    });

    // Parse the `cmap` table. This table stores the mappings from characters to glyphs.
    // There are many available formats, but we only support the Windows format 4.
    // This function returns a `CmapEncoding` object or null if no supported format could be found.
    function parseCmapTable(data, start) {
        var i;
        var cmap = {};
        cmap.version = parse.getUShort(data, start);
        check.argument(cmap.version === 0, 'cmap table version should be 0.');

        // The cmap table can contain many sub-tables, each with their own format.
        // We're only interested in a "platform 3" table. This is a Windows format.
        cmap.numTables = parse.getUShort(data, start + 2);
        var offset = -1;
        for (i = 0; i < cmap.numTables; i += 1) {
            var platformId = parse.getUShort(data, start + 4 + (i * 8));
            var encodingId = parse.getUShort(data, start + 4 + (i * 8) + 2);
            if (platformId === 3 && (encodingId === 1 || encodingId === 0)) {
                offset = parse.getULong(data, start + 4 + (i * 8) + 4);
                break;
            }
        }

        if (offset === -1) {
            // There is no cmap table in the font that we support, so return null.
            // This font will be marked as unsupported.
            return null;
        }

        var p = new parse.Parser(data, start + offset);
        cmap.format = p.parseUShort();
        check.argument(cmap.format === 4, 'Only format 4 cmap tables are supported.');

        // Length in bytes of the sub-tables.
        cmap.length = p.parseUShort();
        cmap.language = p.parseUShort();

        // segCount is stored x 2.
        var segCount;
        cmap.segCount = segCount = p.parseUShort() >> 1;

        // Skip searchRange, entrySelector, rangeShift.
        p.skip('uShort', 3);

        // The "unrolled" mapping from character codes to glyph indices.
        cmap.glyphIndexMap = {};

        var endCountParser = new parse.Parser(data, start + offset + 14);
        var startCountParser = new parse.Parser(data, start + offset + 16 + segCount * 2);
        var idDeltaParser = new parse.Parser(data, start + offset + 16 + segCount * 4);
        var idRangeOffsetParser = new parse.Parser(data, start + offset + 16 + segCount * 6);
        var glyphIndexOffset = start + offset + 16 + segCount * 8;
        for (i = 0; i < segCount - 1; i += 1) {
            var glyphIndex;
            var endCount = endCountParser.parseUShort();
            var startCount = startCountParser.parseUShort();
            var idDelta = idDeltaParser.parseShort();
            var idRangeOffset = idRangeOffsetParser.parseUShort();
            for (var c = startCount; c <= endCount; c += 1) {
                if (idRangeOffset !== 0) {
                    // The idRangeOffset is relative to the current position in the idRangeOffset array.
                    // Take the current offset in the idRangeOffset array.
                    glyphIndexOffset = (idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2);

                    // Add the value of the idRangeOffset, which will move us into the glyphIndex array.
                    glyphIndexOffset += idRangeOffset;

                    // Then add the character index of the current segment, multiplied by 2 for USHORTs.
                    glyphIndexOffset += (c - startCount) * 2;
                    glyphIndex = parse.getUShort(data, glyphIndexOffset);
                    if (glyphIndex !== 0) {
                        glyphIndex = (glyphIndex + idDelta) & 0xFFFF;
                    }
                } else {
                    glyphIndex = (c + idDelta) & 0xFFFF;
                }

                cmap.glyphIndexMap[c] = glyphIndex;
            }
        }

        return cmap;
    }

    function addSegment(t, code, glyphIndex) {
        t.segments.push({
            end: code,
            start: code,
            delta: -(code - glyphIndex),
            offset: 0
        });
    }

    function addTerminatorSegment(t) {
        t.segments.push({
            end: 0xFFFF,
            start: 0xFFFF,
            delta: 1,
            offset: 0
        });
    }

    function makeCmapTable(glyphs) {
        var i;
        var t = new table.Table('cmap', [
            {name: 'version', type: 'USHORT', value: 0},
            {name: 'numTables', type: 'USHORT', value: 1},
            {name: 'platformID', type: 'USHORT', value: 3},
            {name: 'encodingID', type: 'USHORT', value: 1},
            {name: 'offset', type: 'ULONG', value: 12},
            {name: 'format', type: 'USHORT', value: 4},
            {name: 'length', type: 'USHORT', value: 0},
            {name: 'language', type: 'USHORT', value: 0},
            {name: 'segCountX2', type: 'USHORT', value: 0},
            {name: 'searchRange', type: 'USHORT', value: 0},
            {name: 'entrySelector', type: 'USHORT', value: 0},
            {name: 'rangeShift', type: 'USHORT', value: 0}
        ]);

        t.segments = [];
        for (i = 0; i < glyphs.length; i += 1) {
            var glyph = glyphs.get(i);
            for (var j = 0; j < glyph.unicodes.length; j += 1) {
                addSegment(t, glyph.unicodes[j], i);
            }

            t.segments = t.segments.sort(function(a, b) {
                return a.start - b.start;
            });
        }

        addTerminatorSegment(t);

        var segCount;
        segCount = t.segments.length;
        t.segCountX2 = segCount * 2;
        t.searchRange = Math.pow(2, Math.floor(Math.log(segCount) / Math.log(2))) * 2;
        t.entrySelector = Math.log(t.searchRange / 2) / Math.log(2);
        t.rangeShift = t.segCountX2 - t.searchRange;

        // Set up parallel segment arrays.
        var endCounts = [];
        var startCounts = [];
        var idDeltas = [];
        var idRangeOffsets = [];
        var glyphIds = [];

        for (i = 0; i < segCount; i += 1) {
            var segment = t.segments[i];
            endCounts = endCounts.concat({name: 'end_' + i, type: 'USHORT', value: segment.end});
            startCounts = startCounts.concat({name: 'start_' + i, type: 'USHORT', value: segment.start});
            idDeltas = idDeltas.concat({name: 'idDelta_' + i, type: 'SHORT', value: segment.delta});
            idRangeOffsets = idRangeOffsets.concat({name: 'idRangeOffset_' + i, type: 'USHORT', value: segment.offset});
            if (segment.glyphId !== undefined) {
                glyphIds = glyphIds.concat({name: 'glyph_' + i, type: 'USHORT', value: segment.glyphId});
            }
        }

        t.fields = t.fields.concat(endCounts);
        t.fields.push({name: 'reservedPad', type: 'USHORT', value: 0});
        t.fields = t.fields.concat(startCounts);
        t.fields = t.fields.concat(idDeltas);
        t.fields = t.fields.concat(idRangeOffsets);
        t.fields = t.fields.concat(glyphIds);

        t.length = 14 + // Subtable header
            endCounts.length * 2 +
            2 + // reservedPad
            startCounts.length * 2 +
            idDeltas.length * 2 +
            idRangeOffsets.length * 2 +
            glyphIds.length * 2;

        return t;
    }

    var parse_1$e = parseCmapTable;
    var make$c = makeCmapTable;

    var cmap = {
    	parse: parse_1$e,
    	make: make$c
    };

    // Drawing utility functions.

    // Draw a line on the given context from point `x1,y1` to point `x2,y2`.
    function line(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    var line_1 = line;

    var draw = {
    	line: line_1
    };

    function getPathDefinition(glyph, path) {
        var _path = path || { commands: [] };
        return {
            configurable: true,

            get: function() {
                if (typeof _path === 'function') {
                    _path = _path();
                }

                return _path;
            },

            set: function(p) {
                _path = p;
            }
        };
    }

    // A Glyph is an individual mark that often corresponds to a character.
    // Some glyphs, such as ligatures, are a combination of many characters.
    // Glyphs are the basic building blocks of a font.
    //
    // The `Glyph` class contains utility methods for drawing the path and its points.
    function Glyph(options) {
        // By putting all the code on a prototype function (which is only declared once)
        // we reduce the memory requirements for larger fonts by some 2%
        this.bindConstructorValues(options);
    }

    Glyph.prototype.bindConstructorValues = function(options) {
        this.index = options.index || 0;

        // These three values cannnot be deferred for memory optimization:
        this.name = options.name || null;
        this.unicode = options.unicode || undefined;
        this.unicodes = options.unicodes || options.unicode !== undefined ? [options.unicode] : [];

        // But by binding these values only when necessary, we reduce can
        // the memory requirements by almost 3% for larger fonts.
        if (options.xMin) {
            this.xMin = options.xMin;
        }

        if (options.yMin) {
            this.yMin = options.yMin;
        }

        if (options.xMax) {
            this.xMax = options.xMax;
        }

        if (options.yMax) {
            this.yMax = options.yMax;
        }

        if (options.advanceWidth) {
            this.advanceWidth = options.advanceWidth;
        }

        // The path for a glyph is the most memory intensive, and is bound as a value
        // with a getter/setter to ensure we actually do path parsing only once the
        // path is actually needed by anything.
        Object.defineProperty(this, 'path', getPathDefinition(this, options.path));
    };

    Glyph.prototype.addUnicode = function(unicode) {
        if (this.unicodes.length === 0) {
            this.unicode = unicode;
        }

        this.unicodes.push(unicode);
    };

    // Convert the glyph to a Path we can draw on a drawing context.
    //
    // x - Horizontal position of the glyph. (default: 0)
    // y - Vertical position of the *baseline* of the glyph. (default: 0)
    // fontSize - Font size, in pixels (default: 72).
    Glyph.prototype.getPath = function(x, y, fontSize) {
        x = x !== undefined ? x : 0;
        y = y !== undefined ? y : 0;
        fontSize = fontSize !== undefined ? fontSize : 72;
        var scale = 1 / this.path.unitsPerEm * fontSize;
        var p = new path.Path();
        var commands = this.path.commands;
        for (var i = 0; i < commands.length; i += 1) {
            var cmd = commands[i];
            if (cmd.type === 'M') {
                p.moveTo(x + (cmd.x * scale), y + (-cmd.y * scale));
            } else if (cmd.type === 'L') {
                p.lineTo(x + (cmd.x * scale), y + (-cmd.y * scale));
            } else if (cmd.type === 'Q') {
                p.quadraticCurveTo(x + (cmd.x1 * scale), y + (-cmd.y1 * scale),
                                   x + (cmd.x * scale), y + (-cmd.y * scale));
            } else if (cmd.type === 'C') {
                p.curveTo(x + (cmd.x1 * scale), y + (-cmd.y1 * scale),
                          x + (cmd.x2 * scale), y + (-cmd.y2 * scale),
                          x + (cmd.x * scale), y + (-cmd.y * scale));
            } else if (cmd.type === 'Z') {
                p.closePath();
            }
        }

        return p;
    };

    // Split the glyph into contours.
    // This function is here for backwards compatibility, and to
    // provide raw access to the TrueType glyph outlines.
    Glyph.prototype.getContours = function() {
        if (this.points === undefined) {
            return [];
        }

        var contours = [];
        var currentContour = [];
        for (var i = 0; i < this.points.length; i += 1) {
            var pt = this.points[i];
            currentContour.push(pt);
            if (pt.lastPointOfContour) {
                contours.push(currentContour);
                currentContour = [];
            }
        }

        check.argument(currentContour.length === 0, 'There are still points left in the current contour.');
        return contours;
    };

    // Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
    Glyph.prototype.getMetrics = function() {
        var commands = this.path.commands;
        var xCoords = [];
        var yCoords = [];
        for (var i = 0; i < commands.length; i += 1) {
            var cmd = commands[i];
            if (cmd.type !== 'Z') {
                xCoords.push(cmd.x);
                yCoords.push(cmd.y);
            }

            if (cmd.type === 'Q' || cmd.type === 'C') {
                xCoords.push(cmd.x1);
                yCoords.push(cmd.y1);
            }

            if (cmd.type === 'C') {
                xCoords.push(cmd.x2);
                yCoords.push(cmd.y2);
            }
        }

        var metrics = {
            xMin: Math.min.apply(null, xCoords),
            yMin: Math.min.apply(null, yCoords),
            xMax: Math.max.apply(null, xCoords),
            yMax: Math.max.apply(null, yCoords),
            leftSideBearing: 0
        };

        if (!isFinite(metrics.xMin)) {
            metrics.xMin = 0;
        }

        if (!isFinite(metrics.xMax)) {
            metrics.xMax = this.advanceWidth;
        }

        if (!isFinite(metrics.yMin)) {
            metrics.yMin = 0;
        }

        if (!isFinite(metrics.yMax)) {
            metrics.yMax = 0;
        }

        metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
        return metrics;
    };

    // Draw the glyph on the given context.
    //
    // ctx - The drawing context.
    // x - Horizontal position of the glyph. (default: 0)
    // y - Vertical position of the *baseline* of the glyph. (default: 0)
    // fontSize - Font size, in pixels (default: 72).
    Glyph.prototype.draw = function(ctx, x, y, fontSize) {
        this.getPath(x, y, fontSize).draw(ctx);
    };

    // Draw the points of the glyph.
    // On-curve points will be drawn in blue, off-curve points will be drawn in red.
    //
    // ctx - The drawing context.
    // x - Horizontal position of the glyph. (default: 0)
    // y - Vertical position of the *baseline* of the glyph. (default: 0)
    // fontSize - Font size, in pixels (default: 72).
    Glyph.prototype.drawPoints = function(ctx, x, y, fontSize) {

        function drawCircles(l, x, y, scale) {
            var PI_SQ = Math.PI * 2;
            ctx.beginPath();
            for (var j = 0; j < l.length; j += 1) {
                ctx.moveTo(x + (l[j].x * scale), y + (l[j].y * scale));
                ctx.arc(x + (l[j].x * scale), y + (l[j].y * scale), 2, 0, PI_SQ, false);
            }

            ctx.closePath();
            ctx.fill();
        }

        x = x !== undefined ? x : 0;
        y = y !== undefined ? y : 0;
        fontSize = fontSize !== undefined ? fontSize : 24;
        var scale = 1 / this.path.unitsPerEm * fontSize;

        var blueCircles = [];
        var redCircles = [];
        var path = this.path;
        for (var i = 0; i < path.commands.length; i += 1) {
            var cmd = path.commands[i];
            if (cmd.x !== undefined) {
                blueCircles.push({x: cmd.x, y: -cmd.y});
            }

            if (cmd.x1 !== undefined) {
                redCircles.push({x: cmd.x1, y: -cmd.y1});
            }

            if (cmd.x2 !== undefined) {
                redCircles.push({x: cmd.x2, y: -cmd.y2});
            }
        }

        ctx.fillStyle = 'blue';
        drawCircles(blueCircles, x, y, scale);
        ctx.fillStyle = 'red';
        drawCircles(redCircles, x, y, scale);
    };

    // Draw lines indicating important font measurements.
    // Black lines indicate the origin of the coordinate system (point 0,0).
    // Blue lines indicate the glyph bounding box.
    // Green line indicates the advance width of the glyph.
    //
    // ctx - The drawing context.
    // x - Horizontal position of the glyph. (default: 0)
    // y - Vertical position of the *baseline* of the glyph. (default: 0)
    // fontSize - Font size, in pixels (default: 72).
    Glyph.prototype.drawMetrics = function(ctx, x, y, fontSize) {
        var scale;
        x = x !== undefined ? x : 0;
        y = y !== undefined ? y : 0;
        fontSize = fontSize !== undefined ? fontSize : 24;
        scale = 1 / this.path.unitsPerEm * fontSize;
        ctx.lineWidth = 1;

        // Draw the origin
        ctx.strokeStyle = 'black';
        draw.line(ctx, x, -10000, x, 10000);
        draw.line(ctx, -10000, y, 10000, y);

        // This code is here due to memory optimization: by not using
        // defaults in the constructor, we save a notable amount of memory.
        var xMin = this.xMin || 0;
        var yMin = this.yMin || 0;
        var xMax = this.xMax || 0;
        var yMax = this.yMax || 0;
        var advanceWidth = this.advanceWidth || 0;

        // Draw the glyph box
        ctx.strokeStyle = 'blue';
        draw.line(ctx, x + (xMin * scale), -10000, x + (xMin * scale), 10000);
        draw.line(ctx, x + (xMax * scale), -10000, x + (xMax * scale), 10000);
        draw.line(ctx, -10000, y + (-yMin * scale), 10000, y + (-yMin * scale));
        draw.line(ctx, -10000, y + (-yMax * scale), 10000, y + (-yMax * scale));

        // Draw the advance width
        ctx.strokeStyle = 'green';
        draw.line(ctx, x + (advanceWidth * scale), -10000, x + (advanceWidth * scale), 10000);
    };

    var Glyph_1 = Glyph;

    var glyph = {
    	Glyph: Glyph_1
    };

    // A GlyphSet represents all glyphs available in the font, but modelled using
    // a deferred glyph loader, for retrieving glyphs only once they are absolutely
    // necessary, to keep the memory footprint down.
    function GlyphSet(font, glyphs) {
        this.font = font;
        this.glyphs = {};
        if (Array.isArray(glyphs)) {
            for (var i = 0; i < glyphs.length; i++) {
                this.glyphs[i] = glyphs[i];
            }
        }

        this.length = (glyphs && glyphs.length) || 0;
    }

    GlyphSet.prototype.get = function(index) {
        if (typeof this.glyphs[index] === 'function') {
            this.glyphs[index] = this.glyphs[index]();
        }

        return this.glyphs[index];
    };

    GlyphSet.prototype.push = function(index, loader) {
        this.glyphs[index] = loader;
        this.length++;
    };

    function glyphLoader(font, index) {
        return new glyph.Glyph({index: index, font: font});
    }

    /**
     * Generate a stub glyph that can be filled with all metadata *except*
     * the "points" and "path" properties, which must be loaded only once
     * the glyph's path is actually requested for text shaping.
     */

    function ttfGlyphLoader(font, index, parseGlyph, data, position, buildPath) {
        return function() {
            var glyph$1 = new glyph.Glyph({index: index, font: font});

            glyph$1.path = function() {
                parseGlyph(glyph$1, data, position);
                var path = buildPath(font.glyphs, glyph$1);
                path.unitsPerEm = font.unitsPerEm;
                return path;
            };

            return glyph$1;
        };
    }

    function cffGlyphLoader(font, index, parseCFFCharstring, charstring) {
        return function() {
            var glyph$1 = new glyph.Glyph({index: index, font: font});

            glyph$1.path = function() {
                var path = parseCFFCharstring(font, glyph$1, charstring);
                path.unitsPerEm = font.unitsPerEm;
                return path;
            };

            return glyph$1;
        };
    }

    var GlyphSet_1 = GlyphSet;
    var glyphLoader_1 = glyphLoader;
    var ttfGlyphLoader_1 = ttfGlyphLoader;
    var cffGlyphLoader_1 = cffGlyphLoader;

    var glyphset = {
    	GlyphSet: GlyphSet_1,
    	glyphLoader: glyphLoader_1,
    	ttfGlyphLoader: ttfGlyphLoader_1,
    	cffGlyphLoader: cffGlyphLoader_1
    };

    // Custom equals function that can also check lists.
    function equals(a, b) {
        if (a === b) {
            return true;
        } else if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) {
                return false;
            }

            for (var i = 0; i < a.length; i += 1) {
                if (!equals(a[i], b[i])) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    }

    // Parse a `CFF` INDEX array.
    // An index array consists of a list of offsets, then a list of objects at those offsets.
    function parseCFFIndex(data, start, conversionFn) {
        //var i, objectOffset, endOffset;
        var offsets = [];
        var objects = [];
        var count = parse.getCard16(data, start);
        var i;
        var objectOffset;
        var endOffset;
        if (count !== 0) {
            var offsetSize = parse.getByte(data, start + 2);
            objectOffset = start + ((count + 1) * offsetSize) + 2;
            var pos = start + 3;
            for (i = 0; i < count + 1; i += 1) {
                offsets.push(parse.getOffset(data, pos, offsetSize));
                pos += offsetSize;
            }

            // The total size of the index array is 4 header bytes + the value of the last offset.
            endOffset = objectOffset + offsets[count];
        } else {
            endOffset = start + 2;
        }

        for (i = 0; i < offsets.length - 1; i += 1) {
            var value = parse.getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
            if (conversionFn) {
                value = conversionFn(value);
            }

            objects.push(value);
        }

        return {objects: objects, startOffset: start, endOffset: endOffset};
    }

    // Parse a `CFF` DICT real value.
    function parseFloatOperand(parser) {
        var s = '';
        var eof = 15;
        var lookup = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'E', 'E-', null, '-'];
        while (true) {
            var b = parser.parseByte();
            var n1 = b >> 4;
            var n2 = b & 15;

            if (n1 === eof) {
                break;
            }

            s += lookup[n1];

            if (n2 === eof) {
                break;
            }

            s += lookup[n2];
        }

        return parseFloat(s);
    }

    // Parse a `CFF` DICT operand.
    function parseOperand(parser, b0) {
        var b1;
        var b2;
        var b3;
        var b4;
        if (b0 === 28) {
            b1 = parser.parseByte();
            b2 = parser.parseByte();
            return b1 << 8 | b2;
        }

        if (b0 === 29) {
            b1 = parser.parseByte();
            b2 = parser.parseByte();
            b3 = parser.parseByte();
            b4 = parser.parseByte();
            return b1 << 24 | b2 << 16 | b3 << 8 | b4;
        }

        if (b0 === 30) {
            return parseFloatOperand(parser);
        }

        if (b0 >= 32 && b0 <= 246) {
            return b0 - 139;
        }

        if (b0 >= 247 && b0 <= 250) {
            b1 = parser.parseByte();
            return (b0 - 247) * 256 + b1 + 108;
        }

        if (b0 >= 251 && b0 <= 254) {
            b1 = parser.parseByte();
            return -(b0 - 251) * 256 - b1 - 108;
        }

        throw new Error('Invalid b0 ' + b0);
    }

    // Convert the entries returned by `parseDict` to a proper dictionary.
    // If a value is a list of one, it is unpacked.
    function entriesToObject(entries) {
        var o = {};
        for (var i = 0; i < entries.length; i += 1) {
            var key = entries[i][0];
            var values = entries[i][1];
            var value;
            if (values.length === 1) {
                value = values[0];
            } else {
                value = values;
            }

            if (o.hasOwnProperty(key)) {
                throw new Error('Object ' + o + ' already has key ' + key);
            }

            o[key] = value;
        }

        return o;
    }

    // Parse a `CFF` DICT object.
    // A dictionary contains key-value pairs in a compact tokenized format.
    function parseCFFDict(data, start, size) {
        start = start !== undefined ? start : 0;
        var parser = new parse.Parser(data, start);
        var entries = [];
        var operands = [];
        size = size !== undefined ? size : data.length;

        while (parser.relativeOffset < size) {
            var op = parser.parseByte();

            // The first byte for each dict item distinguishes between operator (key) and operand (value).
            // Values <= 21 are operators.
            if (op <= 21) {
                // Two-byte operators have an initial escape byte of 12.
                if (op === 12) {
                    op = 1200 + parser.parseByte();
                }

                entries.push([op, operands]);
                operands = [];
            } else {
                // Since the operands (values) come before the operators (keys), we store all operands in a list
                // until we encounter an operator.
                operands.push(parseOperand(parser, op));
            }
        }

        return entriesToObject(entries);
    }

    // Given a String Index (SID), return the value of the string.
    // Strings below index 392 are standard CFF strings and are not encoded in the font.
    function getCFFString(strings, index) {
        if (index <= 390) {
            index = encoding.cffStandardStrings[index];
        } else {
            index = strings[index - 391];
        }

        return index;
    }

    // Interpret a dictionary and return a new dictionary with readable keys and values for missing entries.
    // This function takes `meta` which is a list of objects containing `operand`, `name` and `default`.
    function interpretDict(dict, meta, strings) {
        var newDict = {};

        // Because we also want to include missing values, we start out from the meta list
        // and lookup values in the dict.
        for (var i = 0; i < meta.length; i += 1) {
            var m = meta[i];
            var value = dict[m.op];
            if (value === undefined) {
                value = m.value !== undefined ? m.value : null;
            }

            if (m.type === 'SID') {
                value = getCFFString(strings, value);
            }

            newDict[m.name] = value;
        }

        return newDict;
    }

    // Parse the CFF header.
    function parseCFFHeader(data, start) {
        var header = {};
        header.formatMajor = parse.getCard8(data, start);
        header.formatMinor = parse.getCard8(data, start + 1);
        header.size = parse.getCard8(data, start + 2);
        header.offsetSize = parse.getCard8(data, start + 3);
        header.startOffset = start;
        header.endOffset = start + 4;
        return header;
    }

    var TOP_DICT_META = [
        {name: 'version', op: 0, type: 'SID'},
        {name: 'notice', op: 1, type: 'SID'},
        {name: 'copyright', op: 1200, type: 'SID'},
        {name: 'fullName', op: 2, type: 'SID'},
        {name: 'familyName', op: 3, type: 'SID'},
        {name: 'weight', op: 4, type: 'SID'},
        {name: 'isFixedPitch', op: 1201, type: 'number', value: 0},
        {name: 'italicAngle', op: 1202, type: 'number', value: 0},
        {name: 'underlinePosition', op: 1203, type: 'number', value: -100},
        {name: 'underlineThickness', op: 1204, type: 'number', value: 50},
        {name: 'paintType', op: 1205, type: 'number', value: 0},
        {name: 'charstringType', op: 1206, type: 'number', value: 2},
        {name: 'fontMatrix', op: 1207, type: ['real', 'real', 'real', 'real', 'real', 'real'], value: [0.001, 0, 0, 0.001, 0, 0]},
        {name: 'uniqueId', op: 13, type: 'number'},
        {name: 'fontBBox', op: 5, type: ['number', 'number', 'number', 'number'], value: [0, 0, 0, 0]},
        {name: 'strokeWidth', op: 1208, type: 'number', value: 0},
        {name: 'xuid', op: 14, type: [], value: null},
        {name: 'charset', op: 15, type: 'offset', value: 0},
        {name: 'encoding', op: 16, type: 'offset', value: 0},
        {name: 'charStrings', op: 17, type: 'offset', value: 0},
        {name: 'private', op: 18, type: ['number', 'offset'], value: [0, 0]}
    ];

    var PRIVATE_DICT_META = [
        {name: 'subrs', op: 19, type: 'offset', value: 0},
        {name: 'defaultWidthX', op: 20, type: 'number', value: 0},
        {name: 'nominalWidthX', op: 21, type: 'number', value: 0}
    ];

    // Parse the CFF top dictionary. A CFF table can contain multiple fonts, each with their own top dictionary.
    // The top dictionary contains the essential metadata for the font, together with the private dictionary.
    function parseCFFTopDict(data, strings) {
        var dict = parseCFFDict(data, 0, data.byteLength);
        return interpretDict(dict, TOP_DICT_META, strings);
    }

    // Parse the CFF private dictionary. We don't fully parse out all the values, only the ones we need.
    function parseCFFPrivateDict(data, start, size, strings) {
        var dict = parseCFFDict(data, start, size);
        return interpretDict(dict, PRIVATE_DICT_META, strings);
    }

    // Parse the CFF charset table, which contains internal names for all the glyphs.
    // This function will return a list of glyph names.
    // See Adobe TN #5176 chapter 13, "Charsets".
    function parseCFFCharset(data, start, nGlyphs, strings) {
        var i;
        var sid;
        var count;
        var parser = new parse.Parser(data, start);

        // The .notdef glyph is not included, so subtract 1.
        nGlyphs -= 1;
        var charset = ['.notdef'];

        var format = parser.parseCard8();
        if (format === 0) {
            for (i = 0; i < nGlyphs; i += 1) {
                sid = parser.parseSID();
                charset.push(getCFFString(strings, sid));
            }
        } else if (format === 1) {
            while (charset.length <= nGlyphs) {
                sid = parser.parseSID();
                count = parser.parseCard8();
                for (i = 0; i <= count; i += 1) {
                    charset.push(getCFFString(strings, sid));
                    sid += 1;
                }
            }
        } else if (format === 2) {
            while (charset.length <= nGlyphs) {
                sid = parser.parseSID();
                count = parser.parseCard16();
                for (i = 0; i <= count; i += 1) {
                    charset.push(getCFFString(strings, sid));
                    sid += 1;
                }
            }
        } else {
            throw new Error('Unknown charset format ' + format);
        }

        return charset;
    }

    // Parse the CFF encoding data. Only one encoding can be specified per font.
    // See Adobe TN #5176 chapter 12, "Encodings".
    function parseCFFEncoding(data, start, charset) {
        var i;
        var code;
        var enc = {};
        var parser = new parse.Parser(data, start);
        var format = parser.parseCard8();
        if (format === 0) {
            var nCodes = parser.parseCard8();
            for (i = 0; i < nCodes; i += 1) {
                code = parser.parseCard8();
                enc[code] = i;
            }
        } else if (format === 1) {
            var nRanges = parser.parseCard8();
            code = 1;
            for (i = 0; i < nRanges; i += 1) {
                var first = parser.parseCard8();
                var nLeft = parser.parseCard8();
                for (var j = first; j <= first + nLeft; j += 1) {
                    enc[j] = code;
                    code += 1;
                }
            }
        } else {
            throw new Error('Unknown encoding format ' + format);
        }

        return new encoding.CffEncoding(enc, charset);
    }

    // Take in charstring code and return a Glyph object.
    // The encoding is described in the Type 2 Charstring Format
    // https://www.microsoft.com/typography/OTSPEC/charstr2.htm
    function parseCFFCharstring(font, glyph, code) {
        var c1x;
        var c1y;
        var c2x;
        var c2y;
        var p = new path.Path();
        var stack = [];
        var nStems = 0;
        var haveWidth = false;
        var width = font.defaultWidthX;
        var open = false;
        var x = 0;
        var y = 0;

        function newContour(x, y) {
            if (open) {
                p.closePath();
            }

            p.moveTo(x, y);
            open = true;
        }

        function parseStems() {
            var hasWidthArg;

            // The number of stem operators on the stack is always even.
            // If the value is uneven, that means a width is specified.
            hasWidthArg = stack.length % 2 !== 0;
            if (hasWidthArg && !haveWidth) {
                width = stack.shift() + font.nominalWidthX;
            }

            nStems += stack.length >> 1;
            stack.length = 0;
            haveWidth = true;
        }

        function parse(code) {
            var b1;
            var b2;
            var b3;
            var b4;
            var codeIndex;
            var subrCode;
            var jpx;
            var jpy;
            var c3x;
            var c3y;
            var c4x;
            var c4y;

            var i = 0;
            while (i < code.length) {
                var v = code[i];
                i += 1;
                switch (v) {
                case 1: // hstem
                    parseStems();
                    break;
                case 3: // vstem
                    parseStems();
                    break;
                case 4: // vmoveto
                    if (stack.length > 1 && !haveWidth) {
                        width = stack.shift() + font.nominalWidthX;
                        haveWidth = true;
                    }

                    y += stack.pop();
                    newContour(x, y);
                    break;
                case 5: // rlineto
                    while (stack.length > 0) {
                        x += stack.shift();
                        y += stack.shift();
                        p.lineTo(x, y);
                    }

                    break;
                case 6: // hlineto
                    while (stack.length > 0) {
                        x += stack.shift();
                        p.lineTo(x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        y += stack.shift();
                        p.lineTo(x, y);
                    }

                    break;
                case 7: // vlineto
                    while (stack.length > 0) {
                        y += stack.shift();
                        p.lineTo(x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        x += stack.shift();
                        p.lineTo(x, y);
                    }

                    break;
                case 8: // rrcurveto
                    while (stack.length > 0) {
                        c1x = x + stack.shift();
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + stack.shift();
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 10: // callsubr
                    codeIndex = stack.pop() + font.subrsBias;
                    subrCode = font.subrs[codeIndex];
                    if (subrCode) {
                        parse(subrCode);
                    }

                    break;
                case 11: // return
                    return;
                case 12: // flex operators
                    v = code[i];
                    i += 1;
                    switch (v) {
                    case 35: // flex
                        // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 dx6 dy6 fd flex (12 35) |-
                        c1x = x   + stack.shift();    // dx1
                        c1y = y   + stack.shift();    // dy1
                        c2x = c1x + stack.shift();    // dx2
                        c2y = c1y + stack.shift();    // dy2
                        jpx = c2x + stack.shift();    // dx3
                        jpy = c2y + stack.shift();    // dy3
                        c3x = jpx + stack.shift();    // dx4
                        c3y = jpy + stack.shift();    // dy4
                        c4x = c3x + stack.shift();    // dx5
                        c4y = c3y + stack.shift();    // dy5
                        x = c4x + stack.shift();      // dx6
                        y = c4y + stack.shift();      // dy6
                        stack.shift();                // flex depth
                        p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                        p.curveTo(c3x, c3y, c4x, c4y, x, y);
                        break;
                    case 34: // hflex
                        // |- dx1 dx2 dy2 dx3 dx4 dx5 dx6 hflex (12 34) |-
                        c1x = x   + stack.shift();    // dx1
                        c1y = y;                      // dy1
                        c2x = c1x + stack.shift();    // dx2
                        c2y = c1y + stack.shift();    // dy2
                        jpx = c2x + stack.shift();    // dx3
                        jpy = c2y;                    // dy3
                        c3x = jpx + stack.shift();    // dx4
                        c3y = c2y;                    // dy4
                        c4x = c3x + stack.shift();    // dx5
                        c4y = y;                      // dy5
                        x = c4x + stack.shift();      // dx6
                        p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                        p.curveTo(c3x, c3y, c4x, c4y, x, y);
                        break;
                    case 36: // hflex1
                        // |- dx1 dy1 dx2 dy2 dx3 dx4 dx5 dy5 dx6 hflex1 (12 36) |-
                        c1x = x   + stack.shift();    // dx1
                        c1y = y   + stack.shift();    // dy1
                        c2x = c1x + stack.shift();    // dx2
                        c2y = c1y + stack.shift();    // dy2
                        jpx = c2x + stack.shift();    // dx3
                        jpy = c2y;                    // dy3
                        c3x = jpx + stack.shift();    // dx4
                        c3y = c2y;                    // dy4
                        c4x = c3x + stack.shift();    // dx5
                        c4y = c3y + stack.shift();    // dy5
                        x = c4x + stack.shift();      // dx6
                        p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                        p.curveTo(c3x, c3y, c4x, c4y, x, y);
                        break;
                    case 37: // flex1
                        // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 d6 flex1 (12 37) |-
                        c1x = x   + stack.shift();    // dx1
                        c1y = y   + stack.shift();    // dy1
                        c2x = c1x + stack.shift();    // dx2
                        c2y = c1y + stack.shift();    // dy2
                        jpx = c2x + stack.shift();    // dx3
                        jpy = c2y + stack.shift();    // dy3
                        c3x = jpx + stack.shift();    // dx4
                        c3y = jpy + stack.shift();    // dy4
                        c4x = c3x + stack.shift();    // dx5
                        c4y = c3y + stack.shift();    // dy5
                        if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
                            x = c4x + stack.shift();
                        } else {
                            y = c4y + stack.shift();
                        }

                        p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                        p.curveTo(c3x, c3y, c4x, c4y, x, y);
                        break;
                    default:
                        console.log('Glyph ' + glyph.index + ': unknown operator ' + 1200 + v);
                        stack.length = 0;
                    }
                    break;
                case 14: // endchar
                    if (stack.length > 0 && !haveWidth) {
                        width = stack.shift() + font.nominalWidthX;
                        haveWidth = true;
                    }

                    if (open) {
                        p.closePath();
                        open = false;
                    }

                    break;
                case 18: // hstemhm
                    parseStems();
                    break;
                case 19: // hintmask
                case 20: // cntrmask
                    parseStems();
                    i += (nStems + 7) >> 3;
                    break;
                case 21: // rmoveto
                    if (stack.length > 2 && !haveWidth) {
                        width = stack.shift() + font.nominalWidthX;
                        haveWidth = true;
                    }

                    y += stack.pop();
                    x += stack.pop();
                    newContour(x, y);
                    break;
                case 22: // hmoveto
                    if (stack.length > 1 && !haveWidth) {
                        width = stack.shift() + font.nominalWidthX;
                        haveWidth = true;
                    }

                    x += stack.pop();
                    newContour(x, y);
                    break;
                case 23: // vstemhm
                    parseStems();
                    break;
                case 24: // rcurveline
                    while (stack.length > 2) {
                        c1x = x + stack.shift();
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + stack.shift();
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    x += stack.shift();
                    y += stack.shift();
                    p.lineTo(x, y);
                    break;
                case 25: // rlinecurve
                    while (stack.length > 6) {
                        x += stack.shift();
                        y += stack.shift();
                        p.lineTo(x, y);
                    }

                    c1x = x + stack.shift();
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    break;
                case 26: // vvcurveto
                    if (stack.length % 2) {
                        x += stack.shift();
                    }

                    while (stack.length > 0) {
                        c1x = x;
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x;
                        y = c2y + stack.shift();
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 27: // hhcurveto
                    if (stack.length % 2) {
                        y += stack.shift();
                    }

                    while (stack.length > 0) {
                        c1x = x + stack.shift();
                        c1y = y;
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y;
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 28: // shortint
                    b1 = code[i];
                    b2 = code[i + 1];
                    stack.push(((b1 << 24) | (b2 << 16)) >> 16);
                    i += 2;
                    break;
                case 29: // callgsubr
                    codeIndex = stack.pop() + font.gsubrsBias;
                    subrCode = font.gsubrs[codeIndex];
                    if (subrCode) {
                        parse(subrCode);
                    }

                    break;
                case 30: // vhcurveto
                    while (stack.length > 0) {
                        c1x = x;
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        c1x = x + stack.shift();
                        c1y = y;
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        y = c2y + stack.shift();
                        x = c2x + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 31: // hvcurveto
                    while (stack.length > 0) {
                        c1x = x + stack.shift();
                        c1y = y;
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        y = c2y + stack.shift();
                        x = c2x + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        c1x = x;
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                default:
                    if (v < 32) {
                        console.log('Glyph ' + glyph.index + ': unknown operator ' + v);
                    } else if (v < 247) {
                        stack.push(v - 139);
                    } else if (v < 251) {
                        b1 = code[i];
                        i += 1;
                        stack.push((v - 247) * 256 + b1 + 108);
                    } else if (v < 255) {
                        b1 = code[i];
                        i += 1;
                        stack.push(-(v - 251) * 256 - b1 - 108);
                    } else {
                        b1 = code[i];
                        b2 = code[i + 1];
                        b3 = code[i + 2];
                        b4 = code[i + 3];
                        i += 4;
                        stack.push(((b1 << 24) | (b2 << 16) | (b3 << 8) | b4) / 65536);
                    }
                }
            }
        }

        parse(code);

        glyph.advanceWidth = width;
        return p;
    }

    // Subroutines are encoded using the negative half of the number space.
    // See type 2 chapter 4.7 "Subroutine operators".
    function calcCFFSubroutineBias(subrs) {
        var bias;
        if (subrs.length < 1240) {
            bias = 107;
        } else if (subrs.length < 33900) {
            bias = 1131;
        } else {
            bias = 32768;
        }

        return bias;
    }

    // Parse the `CFF` table, which contains the glyph outlines in PostScript format.
    function parseCFFTable(data, start, font) {
        font.tables.cff = {};
        var header = parseCFFHeader(data, start);
        var nameIndex = parseCFFIndex(data, header.endOffset, parse.bytesToString);
        var topDictIndex = parseCFFIndex(data, nameIndex.endOffset);
        var stringIndex = parseCFFIndex(data, topDictIndex.endOffset, parse.bytesToString);
        var globalSubrIndex = parseCFFIndex(data, stringIndex.endOffset);
        font.gsubrs = globalSubrIndex.objects;
        font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);

        var topDictData = new DataView(new Uint8Array(topDictIndex.objects[0]).buffer);
        var topDict = parseCFFTopDict(topDictData, stringIndex.objects);
        font.tables.cff.topDict = topDict;

        var privateDictOffset = start + topDict['private'][1];
        var privateDict = parseCFFPrivateDict(data, privateDictOffset, topDict['private'][0], stringIndex.objects);
        font.defaultWidthX = privateDict.defaultWidthX;
        font.nominalWidthX = privateDict.nominalWidthX;

        if (privateDict.subrs !== 0) {
            var subrOffset = privateDictOffset + privateDict.subrs;
            var subrIndex = parseCFFIndex(data, subrOffset);
            font.subrs = subrIndex.objects;
            font.subrsBias = calcCFFSubroutineBias(font.subrs);
        } else {
            font.subrs = [];
            font.subrsBias = 0;
        }

        // Offsets in the top dict are relative to the beginning of the CFF data, so add the CFF start offset.
        var charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
        font.nGlyphs = charStringsIndex.objects.length;

        var charset = parseCFFCharset(data, start + topDict.charset, font.nGlyphs, stringIndex.objects);
        if (topDict.encoding === 0) { // Standard encoding
            font.cffEncoding = new encoding.CffEncoding(encoding.cffStandardEncoding, charset);
        } else if (topDict.encoding === 1) { // Expert encoding
            font.cffEncoding = new encoding.CffEncoding(encoding.cffExpertEncoding, charset);
        } else {
            font.cffEncoding = parseCFFEncoding(data, start + topDict.encoding, charset);
        }

        // Prefer the CMAP encoding to the CFF encoding.
        font.encoding = font.encoding || font.cffEncoding;

        font.glyphs = new glyphset.GlyphSet(font);
        for (var i = 0; i < font.nGlyphs; i += 1) {
            var charString = charStringsIndex.objects[i];
            font.glyphs.push(i, glyphset.cffGlyphLoader(font, i, parseCFFCharstring, charString));
        }
    }

    // Convert a string to a String ID (SID).
    // The list of strings is modified in place.
    function encodeString(s, strings) {
        var sid;

        // Is the string in the CFF standard strings?
        var i = encoding.cffStandardStrings.indexOf(s);
        if (i >= 0) {
            sid = i;
        }

        // Is the string already in the string index?
        i = strings.indexOf(s);
        if (i >= 0) {
            sid = i + encoding.cffStandardStrings.length;
        } else {
            sid = encoding.cffStandardStrings.length + strings.length;
            strings.push(s);
        }

        return sid;
    }

    function makeHeader() {
        return new table.Table('Header', [
            {name: 'major', type: 'Card8', value: 1},
            {name: 'minor', type: 'Card8', value: 0},
            {name: 'hdrSize', type: 'Card8', value: 4},
            {name: 'major', type: 'Card8', value: 1}
        ]);
    }

    function makeNameIndex(fontNames) {
        var t = new table.Table('Name INDEX', [
            {name: 'names', type: 'INDEX', value: []}
        ]);
        t.names = [];
        for (var i = 0; i < fontNames.length; i += 1) {
            t.names.push({name: 'name_' + i, type: 'NAME', value: fontNames[i]});
        }

        return t;
    }

    // Given a dictionary's metadata, create a DICT structure.
    function makeDict(meta, attrs, strings) {
        var m = {};
        for (var i = 0; i < meta.length; i += 1) {
            var entry = meta[i];
            var value = attrs[entry.name];
            if (value !== undefined && !equals(value, entry.value)) {
                if (entry.type === 'SID') {
                    value = encodeString(value, strings);
                }

                m[entry.op] = {name: entry.name, type: entry.type, value: value};
            }
        }

        return m;
    }

    // The Top DICT houses the global font attributes.
    function makeTopDict(attrs, strings) {
        var t = new table.Table('Top DICT', [
            {name: 'dict', type: 'DICT', value: {}}
        ]);
        t.dict = makeDict(TOP_DICT_META, attrs, strings);
        return t;
    }

    function makeTopDictIndex(topDict) {
        var t = new table.Table('Top DICT INDEX', [
            {name: 'topDicts', type: 'INDEX', value: []}
        ]);
        t.topDicts = [{name: 'topDict_0', type: 'TABLE', value: topDict}];
        return t;
    }

    function makeStringIndex(strings) {
        var t = new table.Table('String INDEX', [
            {name: 'strings', type: 'INDEX', value: []}
        ]);
        t.strings = [];
        for (var i = 0; i < strings.length; i += 1) {
            t.strings.push({name: 'string_' + i, type: 'STRING', value: strings[i]});
        }

        return t;
    }

    function makeGlobalSubrIndex() {
        // Currently we don't use subroutines.
        return new table.Table('Global Subr INDEX', [
            {name: 'subrs', type: 'INDEX', value: []}
        ]);
    }

    function makeCharsets(glyphNames, strings) {
        var t = new table.Table('Charsets', [
            {name: 'format', type: 'Card8', value: 0}
        ]);
        for (var i = 0; i < glyphNames.length; i += 1) {
            var glyphName = glyphNames[i];
            var glyphSID = encodeString(glyphName, strings);
            t.fields.push({name: 'glyph_' + i, type: 'SID', value: glyphSID});
        }

        return t;
    }

    function glyphToOps(glyph) {
        var ops = [];
        var path = glyph.path;
        ops.push({name: 'width', type: 'NUMBER', value: glyph.advanceWidth});
        var x = 0;
        var y = 0;
        for (var i = 0; i < path.commands.length; i += 1) {
            var dx;
            var dy;
            var cmd = path.commands[i];
            if (cmd.type === 'Q') {
                // CFF only supports bézier curves, so convert the quad to a bézier.
                var _13 = 1 / 3;
                var _23 = 2 / 3;

                // We're going to create a new command so we don't change the original path.
                cmd = {
                    type: 'C',
                    x: cmd.x,
                    y: cmd.y,
                    x1: _13 * x + _23 * cmd.x1,
                    y1: _13 * y + _23 * cmd.y1,
                    x2: _13 * cmd.x + _23 * cmd.x1,
                    y2: _13 * cmd.y + _23 * cmd.y1
                };
            }

            if (cmd.type === 'M') {
                dx = Math.round(cmd.x - x);
                dy = Math.round(cmd.y - y);
                ops.push({name: 'dx', type: 'NUMBER', value: dx});
                ops.push({name: 'dy', type: 'NUMBER', value: dy});
                ops.push({name: 'rmoveto', type: 'OP', value: 21});
                x = Math.round(cmd.x);
                y = Math.round(cmd.y);
            } else if (cmd.type === 'L') {
                dx = Math.round(cmd.x - x);
                dy = Math.round(cmd.y - y);
                ops.push({name: 'dx', type: 'NUMBER', value: dx});
                ops.push({name: 'dy', type: 'NUMBER', value: dy});
                ops.push({name: 'rlineto', type: 'OP', value: 5});
                x = Math.round(cmd.x);
                y = Math.round(cmd.y);
            } else if (cmd.type === 'C') {
                var dx1 = Math.round(cmd.x1 - x);
                var dy1 = Math.round(cmd.y1 - y);
                var dx2 = Math.round(cmd.x2 - cmd.x1);
                var dy2 = Math.round(cmd.y2 - cmd.y1);
                dx = Math.round(cmd.x - cmd.x2);
                dy = Math.round(cmd.y - cmd.y2);
                ops.push({name: 'dx1', type: 'NUMBER', value: dx1});
                ops.push({name: 'dy1', type: 'NUMBER', value: dy1});
                ops.push({name: 'dx2', type: 'NUMBER', value: dx2});
                ops.push({name: 'dy2', type: 'NUMBER', value: dy2});
                ops.push({name: 'dx', type: 'NUMBER', value: dx});
                ops.push({name: 'dy', type: 'NUMBER', value: dy});
                ops.push({name: 'rrcurveto', type: 'OP', value: 8});
                x = Math.round(cmd.x);
                y = Math.round(cmd.y);
            }

            // Contours are closed automatically.

        }

        ops.push({name: 'endchar', type: 'OP', value: 14});
        return ops;
    }

    function makeCharStringsIndex(glyphs) {
        var t = new table.Table('CharStrings INDEX', [
            {name: 'charStrings', type: 'INDEX', value: []}
        ]);

        for (var i = 0; i < glyphs.length; i += 1) {
            var glyph = glyphs.get(i);
            var ops = glyphToOps(glyph);
            t.charStrings.push({name: glyph.name, type: 'CHARSTRING', value: ops});
        }

        return t;
    }

    function makePrivateDict(attrs, strings) {
        var t = new table.Table('Private DICT', [
            {name: 'dict', type: 'DICT', value: {}}
        ]);
        t.dict = makeDict(PRIVATE_DICT_META, attrs, strings);
        return t;
    }

    function makePrivateDictIndex(privateDict) {
        var t = new table.Table('Private DICT INDEX', [
            {name: 'privateDicts', type: 'INDEX', value: []}
        ]);
        t.privateDicts = [{name: 'privateDict_0', type: 'TABLE', value: privateDict}];
        return t;
    }

    function makeCFFTable(glyphs, options) {
        var t = new table.Table('CFF ', [
            {name: 'header', type: 'TABLE'},
            {name: 'nameIndex', type: 'TABLE'},
            {name: 'topDictIndex', type: 'TABLE'},
            {name: 'stringIndex', type: 'TABLE'},
            {name: 'globalSubrIndex', type: 'TABLE'},
            {name: 'charsets', type: 'TABLE'},
            {name: 'charStringsIndex', type: 'TABLE'},
            {name: 'privateDictIndex', type: 'TABLE'}
        ]);

        var fontScale = 1 / options.unitsPerEm;
        // We use non-zero values for the offsets so that the DICT encodes them.
        // This is important because the size of the Top DICT plays a role in offset calculation,
        // and the size shouldn't change after we've written correct offsets.
        var attrs = {
            version: options.version,
            fullName: options.fullName,
            familyName: options.familyName,
            weight: options.weightName,
            fontMatrix: [fontScale, 0, 0, fontScale, 0, 0],
            charset: 999,
            encoding: 0,
            charStrings: 999,
            private: [0, 999]
        };

        var privateAttrs = {};

        var glyphNames = [];
        var glyph;

        // Skip first glyph (.notdef)
        for (var i = 1; i < glyphs.length; i += 1) {
            glyph = glyphs.get(i);
            glyphNames.push(glyph.name);
        }

        var strings = [];

        t.header = makeHeader();
        t.nameIndex = makeNameIndex([options.postScriptName]);
        var topDict = makeTopDict(attrs, strings);
        t.topDictIndex = makeTopDictIndex(topDict);
        t.globalSubrIndex = makeGlobalSubrIndex();
        t.charsets = makeCharsets(glyphNames, strings);
        t.charStringsIndex = makeCharStringsIndex(glyphs);
        var privateDict = makePrivateDict(privateAttrs, strings);
        t.privateDictIndex = makePrivateDictIndex(privateDict);

        // Needs to come at the end, to encode all custom strings used in the font.
        t.stringIndex = makeStringIndex(strings);

        var startOffset = t.header.sizeOf() +
            t.nameIndex.sizeOf() +
            t.topDictIndex.sizeOf() +
            t.stringIndex.sizeOf() +
            t.globalSubrIndex.sizeOf();
        attrs.charset = startOffset;

        // We use the CFF standard encoding; proper encoding will be handled in cmap.
        attrs.encoding = 0;
        attrs.charStrings = attrs.charset + t.charsets.sizeOf();
        attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();

        // Recreate the Top DICT INDEX with the correct offsets.
        topDict = makeTopDict(attrs, strings);
        t.topDictIndex = makeTopDictIndex(topDict);

        return t;
    }

    var parse_1$d = parseCFFTable;
    var make$b = makeCFFTable;

    var cff = {
    	parse: parse_1$d,
    	make: make$b
    };

    // Parse the header `head` table
    function parseHeadTable(data, start) {
        var head = {};
        var p = new parse.Parser(data, start);
        head.version = p.parseVersion();
        head.fontRevision = Math.round(p.parseFixed() * 1000) / 1000;
        head.checkSumAdjustment = p.parseULong();
        head.magicNumber = p.parseULong();
        check.argument(head.magicNumber === 0x5F0F3CF5, 'Font header has wrong magic number.');
        head.flags = p.parseUShort();
        head.unitsPerEm = p.parseUShort();
        head.created = p.parseLongDateTime();
        head.modified = p.parseLongDateTime();
        head.xMin = p.parseShort();
        head.yMin = p.parseShort();
        head.xMax = p.parseShort();
        head.yMax = p.parseShort();
        head.macStyle = p.parseUShort();
        head.lowestRecPPEM = p.parseUShort();
        head.fontDirectionHint = p.parseShort();
        head.indexToLocFormat = p.parseShort();     // 50
        head.glyphDataFormat = p.parseShort();
        return head;
    }

    function makeHeadTable(options) {
        return new table.Table('head', [
            {name: 'version', type: 'FIXED', value: 0x00010000},
            {name: 'fontRevision', type: 'FIXED', value: 0x00010000},
            {name: 'checkSumAdjustment', type: 'ULONG', value: 0},
            {name: 'magicNumber', type: 'ULONG', value: 0x5F0F3CF5},
            {name: 'flags', type: 'USHORT', value: 0},
            {name: 'unitsPerEm', type: 'USHORT', value: 1000},
            {name: 'created', type: 'LONGDATETIME', value: 0},
            {name: 'modified', type: 'LONGDATETIME', value: 0},
            {name: 'xMin', type: 'SHORT', value: 0},
            {name: 'yMin', type: 'SHORT', value: 0},
            {name: 'xMax', type: 'SHORT', value: 0},
            {name: 'yMax', type: 'SHORT', value: 0},
            {name: 'macStyle', type: 'USHORT', value: 0},
            {name: 'lowestRecPPEM', type: 'USHORT', value: 0},
            {name: 'fontDirectionHint', type: 'SHORT', value: 2},
            {name: 'indexToLocFormat', type: 'SHORT', value: 0},
            {name: 'glyphDataFormat', type: 'SHORT', value: 0}
        ], options);
    }

    var parse_1$c = parseHeadTable;
    var make$a = makeHeadTable;

    var head = {
    	parse: parse_1$c,
    	make: make$a
    };

    // Parse the horizontal header `hhea` table
    function parseHheaTable(data, start) {
        var hhea = {};
        var p = new parse.Parser(data, start);
        hhea.version = p.parseVersion();
        hhea.ascender = p.parseShort();
        hhea.descender = p.parseShort();
        hhea.lineGap = p.parseShort();
        hhea.advanceWidthMax = p.parseUShort();
        hhea.minLeftSideBearing = p.parseShort();
        hhea.minRightSideBearing = p.parseShort();
        hhea.xMaxExtent = p.parseShort();
        hhea.caretSlopeRise = p.parseShort();
        hhea.caretSlopeRun = p.parseShort();
        hhea.caretOffset = p.parseShort();
        p.relativeOffset += 8;
        hhea.metricDataFormat = p.parseShort();
        hhea.numberOfHMetrics = p.parseUShort();
        return hhea;
    }

    function makeHheaTable(options) {
        return new table.Table('hhea', [
            {name: 'version', type: 'FIXED', value: 0x00010000},
            {name: 'ascender', type: 'FWORD', value: 0},
            {name: 'descender', type: 'FWORD', value: 0},
            {name: 'lineGap', type: 'FWORD', value: 0},
            {name: 'advanceWidthMax', type: 'UFWORD', value: 0},
            {name: 'minLeftSideBearing', type: 'FWORD', value: 0},
            {name: 'minRightSideBearing', type: 'FWORD', value: 0},
            {name: 'xMaxExtent', type: 'FWORD', value: 0},
            {name: 'caretSlopeRise', type: 'SHORT', value: 1},
            {name: 'caretSlopeRun', type: 'SHORT', value: 0},
            {name: 'caretOffset', type: 'SHORT', value: 0},
            {name: 'reserved1', type: 'SHORT', value: 0},
            {name: 'reserved2', type: 'SHORT', value: 0},
            {name: 'reserved3', type: 'SHORT', value: 0},
            {name: 'reserved4', type: 'SHORT', value: 0},
            {name: 'metricDataFormat', type: 'SHORT', value: 0},
            {name: 'numberOfHMetrics', type: 'USHORT', value: 0}
        ], options);
    }

    var parse_1$b = parseHheaTable;
    var make$9 = makeHheaTable;

    var hhea = {
    	parse: parse_1$b,
    	make: make$9
    };

    // Parse the `hmtx` table, which contains the horizontal metrics for all glyphs.
    // This function augments the glyph array, adding the advanceWidth and leftSideBearing to each glyph.
    function parseHmtxTable(data, start, numMetrics, numGlyphs, glyphs) {
        var advanceWidth;
        var leftSideBearing;
        var p = new parse.Parser(data, start);
        for (var i = 0; i < numGlyphs; i += 1) {
            // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
            if (i < numMetrics) {
                advanceWidth = p.parseUShort();
                leftSideBearing = p.parseShort();
            }

            var glyph = glyphs.get(i);
            glyph.advanceWidth = advanceWidth;
            glyph.leftSideBearing = leftSideBearing;
        }
    }

    function makeHmtxTable(glyphs) {
        var t = new table.Table('hmtx', []);
        for (var i = 0; i < glyphs.length; i += 1) {
            var glyph = glyphs.get(i);
            var advanceWidth = glyph.advanceWidth || 0;
            var leftSideBearing = glyph.leftSideBearing || 0;
            t.fields.push({name: 'advanceWidth_' + i, type: 'USHORT', value: advanceWidth});
            t.fields.push({name: 'leftSideBearing_' + i, type: 'SHORT', value: leftSideBearing});
        }

        return t;
    }

    var parse_1$a = parseHmtxTable;
    var make$8 = makeHmtxTable;

    var hmtx = {
    	parse: parse_1$a,
    	make: make$8
    };

    function makeLtagTable(tags) {
        var result = new table.Table('ltag', [
            {name: 'version', type: 'ULONG', value: 1},
            {name: 'flags', type: 'ULONG', value: 0},
            {name: 'numTags', type: 'ULONG', value: tags.length}
        ]);

        var stringPool = '';
        var stringPoolOffset = 12 + tags.length * 4;
        for (var i = 0; i < tags.length; ++i) {
            var pos = stringPool.indexOf(tags[i]);
            if (pos < 0) {
                pos = stringPool.length;
                stringPool += tags[i];
            }

            result.fields.push({name: 'offset ' + i, type: 'USHORT', value: stringPoolOffset + pos});
            result.fields.push({name: 'length ' + i, type: 'USHORT', value: tags[i].length});
        }

        result.fields.push({name: 'stringPool', type: 'CHARARRAY', value: stringPool});
        return result;
    }

    function parseLtagTable(data, start) {
        var p = new parse.Parser(data, start);
        var tableVersion = p.parseULong();
        check.argument(tableVersion === 1, 'Unsupported ltag table version.');
        // The 'ltag' specification does not define any flags; skip the field.
        p.skip('uLong', 1);
        var numTags = p.parseULong();

        var tags = [];
        for (var i = 0; i < numTags; i++) {
            var tag = '';
            var offset = start + p.parseUShort();
            var length = p.parseUShort();
            for (var j = offset; j < offset + length; ++j) {
                tag += String.fromCharCode(data.getInt8(j));
            }

            tags.push(tag);
        }

        return tags;
    }

    var make$7 = makeLtagTable;
    var parse_1$9 = parseLtagTable;

    var ltag = {
    	make: make$7,
    	parse: parse_1$9
    };

    // Parse the maximum profile `maxp` table.
    function parseMaxpTable(data, start) {
        var maxp = {};
        var p = new parse.Parser(data, start);
        maxp.version = p.parseVersion();
        maxp.numGlyphs = p.parseUShort();
        if (maxp.version === 1.0) {
            maxp.maxPoints = p.parseUShort();
            maxp.maxContours = p.parseUShort();
            maxp.maxCompositePoints = p.parseUShort();
            maxp.maxCompositeContours = p.parseUShort();
            maxp.maxZones = p.parseUShort();
            maxp.maxTwilightPoints = p.parseUShort();
            maxp.maxStorage = p.parseUShort();
            maxp.maxFunctionDefs = p.parseUShort();
            maxp.maxInstructionDefs = p.parseUShort();
            maxp.maxStackElements = p.parseUShort();
            maxp.maxSizeOfInstructions = p.parseUShort();
            maxp.maxComponentElements = p.parseUShort();
            maxp.maxComponentDepth = p.parseUShort();
        }

        return maxp;
    }

    function makeMaxpTable(numGlyphs) {
        return new table.Table('maxp', [
            {name: 'version', type: 'FIXED', value: 0x00005000},
            {name: 'numGlyphs', type: 'USHORT', value: numGlyphs}
        ]);
    }

    var parse_1$8 = parseMaxpTable;
    var make$6 = makeMaxpTable;

    var maxp = {
    	parse: parse_1$8,
    	make: make$6
    };

    var decode = types.decode;
    var encode = types.encode;



    // NameIDs for the name table.
    var nameTableNames = [
        'copyright',              // 0
        'fontFamily',             // 1
        'fontSubfamily',          // 2
        'uniqueID',               // 3
        'fullName',               // 4
        'version',                // 5
        'postScriptName',         // 6
        'trademark',              // 7
        'manufacturer',           // 8
        'designer',               // 9
        'description',            // 10
        'manufacturerURL',        // 11
        'designerURL',            // 12
        'licence',                // 13
        'licenceURL',             // 14
        'reserved',               // 15
        'preferredFamily',        // 16
        'preferredSubfamily',     // 17
        'compatibleFullName',     // 18
        'sampleText',             // 19
        'postScriptFindFontName', // 20
        'wwsFamily',              // 21
        'wwsSubfamily'            // 22
    ];

    var macLanguages = {
        0: 'en',
        1: 'fr',
        2: 'de',
        3: 'it',
        4: 'nl',
        5: 'sv',
        6: 'es',
        7: 'da',
        8: 'pt',
        9: 'no',
        10: 'he',
        11: 'ja',
        12: 'ar',
        13: 'fi',
        14: 'el',
        15: 'is',
        16: 'mt',
        17: 'tr',
        18: 'hr',
        19: 'zh-Hant',
        20: 'ur',
        21: 'hi',
        22: 'th',
        23: 'ko',
        24: 'lt',
        25: 'pl',
        26: 'hu',
        27: 'es',
        28: 'lv',
        29: 'se',
        30: 'fo',
        31: 'fa',
        32: 'ru',
        33: 'zh',
        34: 'nl-BE',
        35: 'ga',
        36: 'sq',
        37: 'ro',
        38: 'cz',
        39: 'sk',
        40: 'si',
        41: 'yi',
        42: 'sr',
        43: 'mk',
        44: 'bg',
        45: 'uk',
        46: 'be',
        47: 'uz',
        48: 'kk',
        49: 'az-Cyrl',
        50: 'az-Arab',
        51: 'hy',
        52: 'ka',
        53: 'mo',
        54: 'ky',
        55: 'tg',
        56: 'tk',
        57: 'mn-CN',
        58: 'mn',
        59: 'ps',
        60: 'ks',
        61: 'ku',
        62: 'sd',
        63: 'bo',
        64: 'ne',
        65: 'sa',
        66: 'mr',
        67: 'bn',
        68: 'as',
        69: 'gu',
        70: 'pa',
        71: 'or',
        72: 'ml',
        73: 'kn',
        74: 'ta',
        75: 'te',
        76: 'si',
        77: 'my',
        78: 'km',
        79: 'lo',
        80: 'vi',
        81: 'id',
        82: 'tl',
        83: 'ms',
        84: 'ms-Arab',
        85: 'am',
        86: 'ti',
        87: 'om',
        88: 'so',
        89: 'sw',
        90: 'rw',
        91: 'rn',
        92: 'ny',
        93: 'mg',
        94: 'eo',
        128: 'cy',
        129: 'eu',
        130: 'ca',
        131: 'la',
        132: 'qu',
        133: 'gn',
        134: 'ay',
        135: 'tt',
        136: 'ug',
        137: 'dz',
        138: 'jv',
        139: 'su',
        140: 'gl',
        141: 'af',
        142: 'br',
        143: 'iu',
        144: 'gd',
        145: 'gv',
        146: 'ga',
        147: 'to',
        148: 'el-polyton',
        149: 'kl',
        150: 'az',
        151: 'nn'
    };

    // MacOS language ID → MacOS script ID
    //
    // Note that the script ID is not sufficient to determine what encoding
    // to use in TrueType files. For some languages, MacOS used a modification
    // of a mainstream script. For example, an Icelandic name would be stored
    // with smRoman in the TrueType naming table, but the actual encoding
    // is a special Icelandic version of the normal Macintosh Roman encoding.
    // As another example, Inuktitut uses an 8-bit encoding for Canadian Aboriginal
    // Syllables but MacOS had run out of available script codes, so this was
    // done as a (pretty radical) "modification" of Ethiopic.
    //
    // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
    var macLanguageToScript = {
        0: 0,  // langEnglish → smRoman
        1: 0,  // langFrench → smRoman
        2: 0,  // langGerman → smRoman
        3: 0,  // langItalian → smRoman
        4: 0,  // langDutch → smRoman
        5: 0,  // langSwedish → smRoman
        6: 0,  // langSpanish → smRoman
        7: 0,  // langDanish → smRoman
        8: 0,  // langPortuguese → smRoman
        9: 0,  // langNorwegian → smRoman
        10: 5,  // langHebrew → smHebrew
        11: 1,  // langJapanese → smJapanese
        12: 4,  // langArabic → smArabic
        13: 0,  // langFinnish → smRoman
        14: 6,  // langGreek → smGreek
        15: 0,  // langIcelandic → smRoman (modified)
        16: 0,  // langMaltese → smRoman
        17: 0,  // langTurkish → smRoman (modified)
        18: 0,  // langCroatian → smRoman (modified)
        19: 2,  // langTradChinese → smTradChinese
        20: 4,  // langUrdu → smArabic
        21: 9,  // langHindi → smDevanagari
        22: 21,  // langThai → smThai
        23: 3,  // langKorean → smKorean
        24: 29,  // langLithuanian → smCentralEuroRoman
        25: 29,  // langPolish → smCentralEuroRoman
        26: 29,  // langHungarian → smCentralEuroRoman
        27: 29,  // langEstonian → smCentralEuroRoman
        28: 29,  // langLatvian → smCentralEuroRoman
        29: 0,  // langSami → smRoman
        30: 0,  // langFaroese → smRoman (modified)
        31: 4,  // langFarsi → smArabic (modified)
        32: 7,  // langRussian → smCyrillic
        33: 25,  // langSimpChinese → smSimpChinese
        34: 0,  // langFlemish → smRoman
        35: 0,  // langIrishGaelic → smRoman (modified)
        36: 0,  // langAlbanian → smRoman
        37: 0,  // langRomanian → smRoman (modified)
        38: 29,  // langCzech → smCentralEuroRoman
        39: 29,  // langSlovak → smCentralEuroRoman
        40: 0,  // langSlovenian → smRoman (modified)
        41: 5,  // langYiddish → smHebrew
        42: 7,  // langSerbian → smCyrillic
        43: 7,  // langMacedonian → smCyrillic
        44: 7,  // langBulgarian → smCyrillic
        45: 7,  // langUkrainian → smCyrillic (modified)
        46: 7,  // langByelorussian → smCyrillic
        47: 7,  // langUzbek → smCyrillic
        48: 7,  // langKazakh → smCyrillic
        49: 7,  // langAzerbaijani → smCyrillic
        50: 4,  // langAzerbaijanAr → smArabic
        51: 24,  // langArmenian → smArmenian
        52: 23,  // langGeorgian → smGeorgian
        53: 7,  // langMoldavian → smCyrillic
        54: 7,  // langKirghiz → smCyrillic
        55: 7,  // langTajiki → smCyrillic
        56: 7,  // langTurkmen → smCyrillic
        57: 27,  // langMongolian → smMongolian
        58: 7,  // langMongolianCyr → smCyrillic
        59: 4,  // langPashto → smArabic
        60: 4,  // langKurdish → smArabic
        61: 4,  // langKashmiri → smArabic
        62: 4,  // langSindhi → smArabic
        63: 26,  // langTibetan → smTibetan
        64: 9,  // langNepali → smDevanagari
        65: 9,  // langSanskrit → smDevanagari
        66: 9,  // langMarathi → smDevanagari
        67: 13,  // langBengali → smBengali
        68: 13,  // langAssamese → smBengali
        69: 11,  // langGujarati → smGujarati
        70: 10,  // langPunjabi → smGurmukhi
        71: 12,  // langOriya → smOriya
        72: 17,  // langMalayalam → smMalayalam
        73: 16,  // langKannada → smKannada
        74: 14,  // langTamil → smTamil
        75: 15,  // langTelugu → smTelugu
        76: 18,  // langSinhalese → smSinhalese
        77: 19,  // langBurmese → smBurmese
        78: 20,  // langKhmer → smKhmer
        79: 22,  // langLao → smLao
        80: 30,  // langVietnamese → smVietnamese
        81: 0,  // langIndonesian → smRoman
        82: 0,  // langTagalog → smRoman
        83: 0,  // langMalayRoman → smRoman
        84: 4,  // langMalayArabic → smArabic
        85: 28,  // langAmharic → smEthiopic
        86: 28,  // langTigrinya → smEthiopic
        87: 28,  // langOromo → smEthiopic
        88: 0,  // langSomali → smRoman
        89: 0,  // langSwahili → smRoman
        90: 0,  // langKinyarwanda → smRoman
        91: 0,  // langRundi → smRoman
        92: 0,  // langNyanja → smRoman
        93: 0,  // langMalagasy → smRoman
        94: 0,  // langEsperanto → smRoman
        128: 0,  // langWelsh → smRoman (modified)
        129: 0,  // langBasque → smRoman
        130: 0,  // langCatalan → smRoman
        131: 0,  // langLatin → smRoman
        132: 0,  // langQuechua → smRoman
        133: 0,  // langGuarani → smRoman
        134: 0,  // langAymara → smRoman
        135: 7,  // langTatar → smCyrillic
        136: 4,  // langUighur → smArabic
        137: 26,  // langDzongkha → smTibetan
        138: 0,  // langJavaneseRom → smRoman
        139: 0,  // langSundaneseRom → smRoman
        140: 0,  // langGalician → smRoman
        141: 0,  // langAfrikaans → smRoman
        142: 0,  // langBreton → smRoman (modified)
        143: 28,  // langInuktitut → smEthiopic (modified)
        144: 0,  // langScottishGaelic → smRoman (modified)
        145: 0,  // langManxGaelic → smRoman (modified)
        146: 0,  // langIrishGaelicScript → smRoman (modified)
        147: 0,  // langTongan → smRoman
        148: 6,  // langGreekAncient → smRoman
        149: 0,  // langGreenlandic → smRoman
        150: 0,  // langAzerbaijanRoman → smRoman
        151: 0   // langNynorsk → smRoman
    };

    // While Microsoft indicates a region/country for all its language
    // IDs, we omit the region code if it's equal to the "most likely
    // region subtag" according to Unicode CLDR. For scripts, we omit
    // the subtag if it is equal to the Suppress-Script entry in the
    // IANA language subtag registry for IETF BCP 47.
    //
    // For example, Microsoft states that its language code 0x041A is
    // Croatian in Croatia. We transform this to the BCP 47 language code 'hr'
    // and not 'hr-HR' because Croatia is the default country for Croatian,
    // according to Unicode CLDR. As another example, Microsoft states
    // that 0x101A is Croatian (Latin) in Bosnia-Herzegovina. We transform
    // this to 'hr-BA' and not 'hr-Latn-BA' because Latin is the default script
    // for the Croatian language, according to IANA.
    //
    // http://www.unicode.org/cldr/charts/latest/supplemental/likely_subtags.html
    // http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
    var windowsLanguages = {
        0x0436: 'af',
        0x041C: 'sq',
        0x0484: 'gsw',
        0x045E: 'am',
        0x1401: 'ar-DZ',
        0x3C01: 'ar-BH',
        0x0C01: 'ar',
        0x0801: 'ar-IQ',
        0x2C01: 'ar-JO',
        0x3401: 'ar-KW',
        0x3001: 'ar-LB',
        0x1001: 'ar-LY',
        0x1801: 'ary',
        0x2001: 'ar-OM',
        0x4001: 'ar-QA',
        0x0401: 'ar-SA',
        0x2801: 'ar-SY',
        0x1C01: 'aeb',
        0x3801: 'ar-AE',
        0x2401: 'ar-YE',
        0x042B: 'hy',
        0x044D: 'as',
        0x082C: 'az-Cyrl',
        0x042C: 'az',
        0x046D: 'ba',
        0x042D: 'eu',
        0x0423: 'be',
        0x0845: 'bn',
        0x0445: 'bn-IN',
        0x201A: 'bs-Cyrl',
        0x141A: 'bs',
        0x047E: 'br',
        0x0402: 'bg',
        0x0403: 'ca',
        0x0C04: 'zh-HK',
        0x1404: 'zh-MO',
        0x0804: 'zh',
        0x1004: 'zh-SG',
        0x0404: 'zh-TW',
        0x0483: 'co',
        0x041A: 'hr',
        0x101A: 'hr-BA',
        0x0405: 'cs',
        0x0406: 'da',
        0x048C: 'prs',
        0x0465: 'dv',
        0x0813: 'nl-BE',
        0x0413: 'nl',
        0x0C09: 'en-AU',
        0x2809: 'en-BZ',
        0x1009: 'en-CA',
        0x2409: 'en-029',
        0x4009: 'en-IN',
        0x1809: 'en-IE',
        0x2009: 'en-JM',
        0x4409: 'en-MY',
        0x1409: 'en-NZ',
        0x3409: 'en-PH',
        0x4809: 'en-SG',
        0x1C09: 'en-ZA',
        0x2C09: 'en-TT',
        0x0809: 'en-GB',
        0x0409: 'en',
        0x3009: 'en-ZW',
        0x0425: 'et',
        0x0438: 'fo',
        0x0464: 'fil',
        0x040B: 'fi',
        0x080C: 'fr-BE',
        0x0C0C: 'fr-CA',
        0x040C: 'fr',
        0x140C: 'fr-LU',
        0x180C: 'fr-MC',
        0x100C: 'fr-CH',
        0x0462: 'fy',
        0x0456: 'gl',
        0x0437: 'ka',
        0x0C07: 'de-AT',
        0x0407: 'de',
        0x1407: 'de-LI',
        0x1007: 'de-LU',
        0x0807: 'de-CH',
        0x0408: 'el',
        0x046F: 'kl',
        0x0447: 'gu',
        0x0468: 'ha',
        0x040D: 'he',
        0x0439: 'hi',
        0x040E: 'hu',
        0x040F: 'is',
        0x0470: 'ig',
        0x0421: 'id',
        0x045D: 'iu',
        0x085D: 'iu-Latn',
        0x083C: 'ga',
        0x0434: 'xh',
        0x0435: 'zu',
        0x0410: 'it',
        0x0810: 'it-CH',
        0x0411: 'ja',
        0x044B: 'kn',
        0x043F: 'kk',
        0x0453: 'km',
        0x0486: 'quc',
        0x0487: 'rw',
        0x0441: 'sw',
        0x0457: 'kok',
        0x0412: 'ko',
        0x0440: 'ky',
        0x0454: 'lo',
        0x0426: 'lv',
        0x0427: 'lt',
        0x082E: 'dsb',
        0x046E: 'lb',
        0x042F: 'mk',
        0x083E: 'ms-BN',
        0x043E: 'ms',
        0x044C: 'ml',
        0x043A: 'mt',
        0x0481: 'mi',
        0x047A: 'arn',
        0x044E: 'mr',
        0x047C: 'moh',
        0x0450: 'mn',
        0x0850: 'mn-CN',
        0x0461: 'ne',
        0x0414: 'nb',
        0x0814: 'nn',
        0x0482: 'oc',
        0x0448: 'or',
        0x0463: 'ps',
        0x0415: 'pl',
        0x0416: 'pt',
        0x0816: 'pt-PT',
        0x0446: 'pa',
        0x046B: 'qu-BO',
        0x086B: 'qu-EC',
        0x0C6B: 'qu',
        0x0418: 'ro',
        0x0417: 'rm',
        0x0419: 'ru',
        0x243B: 'smn',
        0x103B: 'smj-NO',
        0x143B: 'smj',
        0x0C3B: 'se-FI',
        0x043B: 'se',
        0x083B: 'se-SE',
        0x203B: 'sms',
        0x183B: 'sma-NO',
        0x1C3B: 'sms',
        0x044F: 'sa',
        0x1C1A: 'sr-Cyrl-BA',
        0x0C1A: 'sr',
        0x181A: 'sr-Latn-BA',
        0x081A: 'sr-Latn',
        0x046C: 'nso',
        0x0432: 'tn',
        0x045B: 'si',
        0x041B: 'sk',
        0x0424: 'sl',
        0x2C0A: 'es-AR',
        0x400A: 'es-BO',
        0x340A: 'es-CL',
        0x240A: 'es-CO',
        0x140A: 'es-CR',
        0x1C0A: 'es-DO',
        0x300A: 'es-EC',
        0x440A: 'es-SV',
        0x100A: 'es-GT',
        0x480A: 'es-HN',
        0x080A: 'es-MX',
        0x4C0A: 'es-NI',
        0x180A: 'es-PA',
        0x3C0A: 'es-PY',
        0x280A: 'es-PE',
        0x500A: 'es-PR',

        // Microsoft has defined two different language codes for
        // “Spanish with modern sorting” and “Spanish with traditional
        // sorting”. This makes sense for collation APIs, and it would be
        // possible to express this in BCP 47 language tags via Unicode
        // extensions (eg., es-u-co-trad is Spanish with traditional
        // sorting). However, for storing names in fonts, the distinction
        // does not make sense, so we give “es” in both cases.
        0x0C0A: 'es',
        0x040A: 'es',

        0x540A: 'es-US',
        0x380A: 'es-UY',
        0x200A: 'es-VE',
        0x081D: 'sv-FI',
        0x041D: 'sv',
        0x045A: 'syr',
        0x0428: 'tg',
        0x085F: 'tzm',
        0x0449: 'ta',
        0x0444: 'tt',
        0x044A: 'te',
        0x041E: 'th',
        0x0451: 'bo',
        0x041F: 'tr',
        0x0442: 'tk',
        0x0480: 'ug',
        0x0422: 'uk',
        0x042E: 'hsb',
        0x0420: 'ur',
        0x0843: 'uz-Cyrl',
        0x0443: 'uz',
        0x042A: 'vi',
        0x0452: 'cy',
        0x0488: 'wo',
        0x0485: 'sah',
        0x0478: 'ii',
        0x046A: 'yo'
    };

    // Returns a IETF BCP 47 language code, for example 'zh-Hant'
    // for 'Chinese in the traditional script'.
    function getLanguageCode(platformID, languageID, ltag) {
        switch (platformID) {
        case 0:  // Unicode
            if (languageID === 0xFFFF) {
                return 'und';
            } else if (ltag) {
                return ltag[languageID];
            }

            break;

        case 1:  // Macintosh
            return macLanguages[languageID];

        case 3:  // Windows
            return windowsLanguages[languageID];
        }

        return undefined;
    }

    var utf16 = 'utf-16';

    // MacOS script ID → encoding. This table stores the default case,
    // which can be overridden by macLanguageEncodings.
    var macScriptEncodings = {
        0: 'macintosh',           // smRoman
        1: 'x-mac-japanese',      // smJapanese
        2: 'x-mac-chinesetrad',   // smTradChinese
        3: 'x-mac-korean',        // smKorean
        6: 'x-mac-greek',         // smGreek
        7: 'x-mac-cyrillic',      // smCyrillic
        9: 'x-mac-devanagai',     // smDevanagari
        10: 'x-mac-gurmukhi',     // smGurmukhi
        11: 'x-mac-gujarati',     // smGujarati
        12: 'x-mac-oriya',        // smOriya
        13: 'x-mac-bengali',      // smBengali
        14: 'x-mac-tamil',        // smTamil
        15: 'x-mac-telugu',       // smTelugu
        16: 'x-mac-kannada',      // smKannada
        17: 'x-mac-malayalam',    // smMalayalam
        18: 'x-mac-sinhalese',    // smSinhalese
        19: 'x-mac-burmese',      // smBurmese
        20: 'x-mac-khmer',        // smKhmer
        21: 'x-mac-thai',         // smThai
        22: 'x-mac-lao',          // smLao
        23: 'x-mac-georgian',     // smGeorgian
        24: 'x-mac-armenian',     // smArmenian
        25: 'x-mac-chinesesimp',  // smSimpChinese
        26: 'x-mac-tibetan',      // smTibetan
        27: 'x-mac-mongolian',    // smMongolian
        28: 'x-mac-ethiopic',     // smEthiopic
        29: 'x-mac-ce',           // smCentralEuroRoman
        30: 'x-mac-vietnamese',   // smVietnamese
        31: 'x-mac-extarabic'     // smExtArabic
    };

    // MacOS language ID → encoding. This table stores the exceptional
    // cases, which override macScriptEncodings. For writing MacOS naming
    // tables, we need to emit a MacOS script ID. Therefore, we cannot
    // merge macScriptEncodings into macLanguageEncodings.
    //
    // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
    var macLanguageEncodings = {
        15: 'x-mac-icelandic',    // langIcelandic
        17: 'x-mac-turkish',      // langTurkish
        18: 'x-mac-croatian',     // langCroatian
        24: 'x-mac-ce',           // langLithuanian
        25: 'x-mac-ce',           // langPolish
        26: 'x-mac-ce',           // langHungarian
        27: 'x-mac-ce',           // langEstonian
        28: 'x-mac-ce',           // langLatvian
        30: 'x-mac-icelandic',    // langFaroese
        37: 'x-mac-romanian',     // langRomanian
        38: 'x-mac-ce',           // langCzech
        39: 'x-mac-ce',           // langSlovak
        40: 'x-mac-ce',           // langSlovenian
        143: 'x-mac-inuit',       // langInuktitut
        146: 'x-mac-gaelic'       // langIrishGaelicScript
    };

    function getEncoding(platformID, encodingID, languageID) {
        switch (platformID) {
        case 0:  // Unicode
            return utf16;

        case 1:  // Apple Macintosh
            return macLanguageEncodings[languageID] || macScriptEncodings[encodingID];

        case 3:  // Microsoft Windows
            if (encodingID === 1 || encodingID === 10) {
                return utf16;
            }

            break;
        }

        return undefined;
    }

    // Parse the naming `name` table.
    // FIXME: Format 1 additional fields are not supported yet.
    // ltag is the content of the `ltag' table, such as ['en', 'zh-Hans', 'de-CH-1904'].
    function parseNameTable(data, start, ltag) {
        var name = {};
        var p = new parse.Parser(data, start);
        var format = p.parseUShort();
        var count = p.parseUShort();
        var stringOffset = p.offset + p.parseUShort();
        for (var i = 0; i < count; i++) {
            var platformID = p.parseUShort();
            var encodingID = p.parseUShort();
            var languageID = p.parseUShort();
            var nameID = p.parseUShort();
            var property = nameTableNames[nameID] || nameID;
            var byteLength = p.parseUShort();
            var offset = p.parseUShort();
            var language = getLanguageCode(platformID, languageID, ltag);
            var encoding = getEncoding(platformID, encodingID, languageID);
            if (encoding !== undefined && language !== undefined) {
                var text;
                if (encoding === utf16) {
                    text = decode.UTF16(data, stringOffset + offset, byteLength);
                } else {
                    text = decode.MACSTRING(data, stringOffset + offset, byteLength, encoding);
                }

                if (text) {
                    var translations = name[property];
                    if (translations === undefined) {
                        translations = name[property] = {};
                    }

                    translations[language] = text;
                }
            }
        }
        if (format === 1) {
            // FIXME: Also handle Microsoft's 'name' table 1.
            p.parseUShort();
        }

        return name;
    }

    // {23: 'foo'} → {'foo': 23}
    // ['bar', 'baz'] → {'bar': 0, 'baz': 1}
    function reverseDict(dict) {
        var result = {};
        for (var key in dict) {
            result[dict[key]] = parseInt(key);
        }

        return result;
    }

    function makeNameRecord(platformID, encodingID, languageID, nameID, length, offset) {
        return new table.Table('NameRecord', [
            {name: 'platformID', type: 'USHORT', value: platformID},
            {name: 'encodingID', type: 'USHORT', value: encodingID},
            {name: 'languageID', type: 'USHORT', value: languageID},
            {name: 'nameID', type: 'USHORT', value: nameID},
            {name: 'length', type: 'USHORT', value: length},
            {name: 'offset', type: 'USHORT', value: offset}
        ]);
    }

    // Finds the position of needle in haystack, or -1 if not there.
    // Like String.indexOf(), but for arrays.
    function findSubArray(needle, haystack) {
        var needleLength = needle.length;
        var limit = haystack.length - needleLength + 1;

        loop:
        for (var pos = 0; pos < limit; pos++) {
            for (; pos < limit; pos++) {
                for (var k = 0; k < needleLength; k++) {
                    if (haystack[pos + k] !== needle[k]) {
                        continue loop;
                    }
                }

                return pos;
            }
        }

        return -1;
    }

    function addStringToPool(s, pool) {
        var offset = findSubArray(s, pool);
        if (offset < 0) {
            offset = pool.length;
            for (var i = 0, len = s.length; i < len; ++i) {
                pool.push(s[i]);
            }

        }

        return offset;
    }

    function makeNameTable(names, ltag) {
        var nameID;
        var nameIDs = [];

        var namesWithNumericKeys = {};
        var nameTableIds = reverseDict(nameTableNames);
        for (var key in names) {
            var id = nameTableIds[key];
            if (id === undefined) {
                id = key;
            }

            nameID = parseInt(id);
            namesWithNumericKeys[nameID] = names[key];
            nameIDs.push(nameID);
        }

        var macLanguageIds = reverseDict(macLanguages);
        var windowsLanguageIds = reverseDict(windowsLanguages);

        var nameRecords = [];
        var stringPool = [];

        for (var i = 0; i < nameIDs.length; i++) {
            nameID = nameIDs[i];
            var translations = namesWithNumericKeys[nameID];
            for (var lang in translations) {
                var text = translations[lang];

                // For MacOS, we try to emit the name in the form that was introduced
                // in the initial version of the TrueType spec (in the late 1980s).
                // However, this can fail for various reasons: the requested BCP 47
                // language code might not have an old-style Mac equivalent;
                // we might not have a codec for the needed character encoding;
                // or the name might contain characters that cannot be expressed
                // in the old-style Macintosh encoding. In case of failure, we emit
                // the name in a more modern fashion (Unicode encoding with BCP 47
                // language tags) that is recognized by MacOS 10.5, released in 2009.
                // If fonts were only read by operating systems, we could simply
                // emit all names in the modern form; this would be much easier.
                // However, there are many applications and libraries that read
                // 'name' tables directly, and these will usually only recognize
                // the ancient form (silently skipping the unrecognized names).
                var macPlatform = 1;  // Macintosh
                var macLanguage = macLanguageIds[lang];
                var macScript = macLanguageToScript[macLanguage];
                var macEncoding = getEncoding(macPlatform, macScript, macLanguage);
                var macName = encode.MACSTRING(text, macEncoding);
                if (macName === undefined) {
                    macPlatform = 0;  // Unicode
                    macLanguage = ltag.indexOf(lang);
                    if (macLanguage < 0) {
                        macLanguage = ltag.length;
                        ltag.push(lang);
                    }

                    macScript = 4;  // Unicode 2.0 and later
                    macName = encode.UTF16(text);
                }

                var macNameOffset = addStringToPool(macName, stringPool);
                nameRecords.push(makeNameRecord(macPlatform, macScript, macLanguage,
                                                nameID, macName.length, macNameOffset));

                var winLanguage = windowsLanguageIds[lang];
                if (winLanguage !== undefined) {
                    var winName = encode.UTF16(text);
                    var winNameOffset = addStringToPool(winName, stringPool);
                    nameRecords.push(makeNameRecord(3, 1, winLanguage,
                                                    nameID, winName.length, winNameOffset));
                }
            }
        }

        nameRecords.sort(function(a, b) {
            return ((a.platformID - b.platformID) ||
                    (a.encodingID - b.encodingID) ||
                    (a.languageID - b.languageID) ||
                    (a.nameID - b.nameID));
        });

        var t = new table.Table('name', [
            {name: 'format', type: 'USHORT', value: 0},
            {name: 'count', type: 'USHORT', value: nameRecords.length},
            {name: 'stringOffset', type: 'USHORT', value: 6 + nameRecords.length * 12}
        ]);

        for (var r = 0; r < nameRecords.length; r++) {
            t.fields.push({name: 'record_' + r, type: 'TABLE', value: nameRecords[r]});
        }

        t.fields.push({name: 'strings', type: 'LITERAL', value: stringPool});
        return t;
    }

    var parse_1$7 = parseNameTable;
    var make$5 = makeNameTable;

    var name = {
    	parse: parse_1$7,
    	make: make$5
    };

    var unicodeRanges = [
        {begin: 0x0000, end: 0x007F}, // Basic Latin
        {begin: 0x0080, end: 0x00FF}, // Latin-1 Supplement
        {begin: 0x0100, end: 0x017F}, // Latin Extended-A
        {begin: 0x0180, end: 0x024F}, // Latin Extended-B
        {begin: 0x0250, end: 0x02AF}, // IPA Extensions
        {begin: 0x02B0, end: 0x02FF}, // Spacing Modifier Letters
        {begin: 0x0300, end: 0x036F}, // Combining Diacritical Marks
        {begin: 0x0370, end: 0x03FF}, // Greek and Coptic
        {begin: 0x2C80, end: 0x2CFF}, // Coptic
        {begin: 0x0400, end: 0x04FF}, // Cyrillic
        {begin: 0x0530, end: 0x058F}, // Armenian
        {begin: 0x0590, end: 0x05FF}, // Hebrew
        {begin: 0xA500, end: 0xA63F}, // Vai
        {begin: 0x0600, end: 0x06FF}, // Arabic
        {begin: 0x07C0, end: 0x07FF}, // NKo
        {begin: 0x0900, end: 0x097F}, // Devanagari
        {begin: 0x0980, end: 0x09FF}, // Bengali
        {begin: 0x0A00, end: 0x0A7F}, // Gurmukhi
        {begin: 0x0A80, end: 0x0AFF}, // Gujarati
        {begin: 0x0B00, end: 0x0B7F}, // Oriya
        {begin: 0x0B80, end: 0x0BFF}, // Tamil
        {begin: 0x0C00, end: 0x0C7F}, // Telugu
        {begin: 0x0C80, end: 0x0CFF}, // Kannada
        {begin: 0x0D00, end: 0x0D7F}, // Malayalam
        {begin: 0x0E00, end: 0x0E7F}, // Thai
        {begin: 0x0E80, end: 0x0EFF}, // Lao
        {begin: 0x10A0, end: 0x10FF}, // Georgian
        {begin: 0x1B00, end: 0x1B7F}, // Balinese
        {begin: 0x1100, end: 0x11FF}, // Hangul Jamo
        {begin: 0x1E00, end: 0x1EFF}, // Latin Extended Additional
        {begin: 0x1F00, end: 0x1FFF}, // Greek Extended
        {begin: 0x2000, end: 0x206F}, // General Punctuation
        {begin: 0x2070, end: 0x209F}, // Superscripts And Subscripts
        {begin: 0x20A0, end: 0x20CF}, // Currency Symbol
        {begin: 0x20D0, end: 0x20FF}, // Combining Diacritical Marks For Symbols
        {begin: 0x2100, end: 0x214F}, // Letterlike Symbols
        {begin: 0x2150, end: 0x218F}, // Number Forms
        {begin: 0x2190, end: 0x21FF}, // Arrows
        {begin: 0x2200, end: 0x22FF}, // Mathematical Operators
        {begin: 0x2300, end: 0x23FF}, // Miscellaneous Technical
        {begin: 0x2400, end: 0x243F}, // Control Pictures
        {begin: 0x2440, end: 0x245F}, // Optical Character Recognition
        {begin: 0x2460, end: 0x24FF}, // Enclosed Alphanumerics
        {begin: 0x2500, end: 0x257F}, // Box Drawing
        {begin: 0x2580, end: 0x259F}, // Block Elements
        {begin: 0x25A0, end: 0x25FF}, // Geometric Shapes
        {begin: 0x2600, end: 0x26FF}, // Miscellaneous Symbols
        {begin: 0x2700, end: 0x27BF}, // Dingbats
        {begin: 0x3000, end: 0x303F}, // CJK Symbols And Punctuation
        {begin: 0x3040, end: 0x309F}, // Hiragana
        {begin: 0x30A0, end: 0x30FF}, // Katakana
        {begin: 0x3100, end: 0x312F}, // Bopomofo
        {begin: 0x3130, end: 0x318F}, // Hangul Compatibility Jamo
        {begin: 0xA840, end: 0xA87F}, // Phags-pa
        {begin: 0x3200, end: 0x32FF}, // Enclosed CJK Letters And Months
        {begin: 0x3300, end: 0x33FF}, // CJK Compatibility
        {begin: 0xAC00, end: 0xD7AF}, // Hangul Syllables
        {begin: 0xD800, end: 0xDFFF}, // Non-Plane 0 *
        {begin: 0x10900, end: 0x1091F}, // Phoenicia
        {begin: 0x4E00, end: 0x9FFF}, // CJK Unified Ideographs
        {begin: 0xE000, end: 0xF8FF}, // Private Use Area (plane 0)
        {begin: 0x31C0, end: 0x31EF}, // CJK Strokes
        {begin: 0xFB00, end: 0xFB4F}, // Alphabetic Presentation Forms
        {begin: 0xFB50, end: 0xFDFF}, // Arabic Presentation Forms-A
        {begin: 0xFE20, end: 0xFE2F}, // Combining Half Marks
        {begin: 0xFE10, end: 0xFE1F}, // Vertical Forms
        {begin: 0xFE50, end: 0xFE6F}, // Small Form Variants
        {begin: 0xFE70, end: 0xFEFF}, // Arabic Presentation Forms-B
        {begin: 0xFF00, end: 0xFFEF}, // Halfwidth And Fullwidth Forms
        {begin: 0xFFF0, end: 0xFFFF}, // Specials
        {begin: 0x0F00, end: 0x0FFF}, // Tibetan
        {begin: 0x0700, end: 0x074F}, // Syriac
        {begin: 0x0780, end: 0x07BF}, // Thaana
        {begin: 0x0D80, end: 0x0DFF}, // Sinhala
        {begin: 0x1000, end: 0x109F}, // Myanmar
        {begin: 0x1200, end: 0x137F}, // Ethiopic
        {begin: 0x13A0, end: 0x13FF}, // Cherokee
        {begin: 0x1400, end: 0x167F}, // Unified Canadian Aboriginal Syllabics
        {begin: 0x1680, end: 0x169F}, // Ogham
        {begin: 0x16A0, end: 0x16FF}, // Runic
        {begin: 0x1780, end: 0x17FF}, // Khmer
        {begin: 0x1800, end: 0x18AF}, // Mongolian
        {begin: 0x2800, end: 0x28FF}, // Braille Patterns
        {begin: 0xA000, end: 0xA48F}, // Yi Syllables
        {begin: 0x1700, end: 0x171F}, // Tagalog
        {begin: 0x10300, end: 0x1032F}, // Old Italic
        {begin: 0x10330, end: 0x1034F}, // Gothic
        {begin: 0x10400, end: 0x1044F}, // Deseret
        {begin: 0x1D000, end: 0x1D0FF}, // Byzantine Musical Symbols
        {begin: 0x1D400, end: 0x1D7FF}, // Mathematical Alphanumeric Symbols
        {begin: 0xFF000, end: 0xFFFFD}, // Private Use (plane 15)
        {begin: 0xFE00, end: 0xFE0F}, // Variation Selectors
        {begin: 0xE0000, end: 0xE007F}, // Tags
        {begin: 0x1900, end: 0x194F}, // Limbu
        {begin: 0x1950, end: 0x197F}, // Tai Le
        {begin: 0x1980, end: 0x19DF}, // New Tai Lue
        {begin: 0x1A00, end: 0x1A1F}, // Buginese
        {begin: 0x2C00, end: 0x2C5F}, // Glagolitic
        {begin: 0x2D30, end: 0x2D7F}, // Tifinagh
        {begin: 0x4DC0, end: 0x4DFF}, // Yijing Hexagram Symbols
        {begin: 0xA800, end: 0xA82F}, // Syloti Nagri
        {begin: 0x10000, end: 0x1007F}, // Linear B Syllabary
        {begin: 0x10140, end: 0x1018F}, // Ancient Greek Numbers
        {begin: 0x10380, end: 0x1039F}, // Ugaritic
        {begin: 0x103A0, end: 0x103DF}, // Old Persian
        {begin: 0x10450, end: 0x1047F}, // Shavian
        {begin: 0x10480, end: 0x104AF}, // Osmanya
        {begin: 0x10800, end: 0x1083F}, // Cypriot Syllabary
        {begin: 0x10A00, end: 0x10A5F}, // Kharoshthi
        {begin: 0x1D300, end: 0x1D35F}, // Tai Xuan Jing Symbols
        {begin: 0x12000, end: 0x123FF}, // Cuneiform
        {begin: 0x1D360, end: 0x1D37F}, // Counting Rod Numerals
        {begin: 0x1B80, end: 0x1BBF}, // Sundanese
        {begin: 0x1C00, end: 0x1C4F}, // Lepcha
        {begin: 0x1C50, end: 0x1C7F}, // Ol Chiki
        {begin: 0xA880, end: 0xA8DF}, // Saurashtra
        {begin: 0xA900, end: 0xA92F}, // Kayah Li
        {begin: 0xA930, end: 0xA95F}, // Rejang
        {begin: 0xAA00, end: 0xAA5F}, // Cham
        {begin: 0x10190, end: 0x101CF}, // Ancient Symbols
        {begin: 0x101D0, end: 0x101FF}, // Phaistos Disc
        {begin: 0x102A0, end: 0x102DF}, // Carian
        {begin: 0x1F030, end: 0x1F09F}  // Domino Tiles
    ];

    function getUnicodeRange(unicode) {
        for (var i = 0; i < unicodeRanges.length; i += 1) {
            var range = unicodeRanges[i];
            if (unicode >= range.begin && unicode < range.end) {
                return i;
            }
        }

        return -1;
    }

    // Parse the OS/2 and Windows metrics `OS/2` table
    function parseOS2Table(data, start) {
        var os2 = {};
        var p = new parse.Parser(data, start);
        os2.version = p.parseUShort();
        os2.xAvgCharWidth = p.parseShort();
        os2.usWeightClass = p.parseUShort();
        os2.usWidthClass = p.parseUShort();
        os2.fsType = p.parseUShort();
        os2.ySubscriptXSize = p.parseShort();
        os2.ySubscriptYSize = p.parseShort();
        os2.ySubscriptXOffset = p.parseShort();
        os2.ySubscriptYOffset = p.parseShort();
        os2.ySuperscriptXSize = p.parseShort();
        os2.ySuperscriptYSize = p.parseShort();
        os2.ySuperscriptXOffset = p.parseShort();
        os2.ySuperscriptYOffset = p.parseShort();
        os2.yStrikeoutSize = p.parseShort();
        os2.yStrikeoutPosition = p.parseShort();
        os2.sFamilyClass = p.parseShort();
        os2.panose = [];
        for (var i = 0; i < 10; i++) {
            os2.panose[i] = p.parseByte();
        }

        os2.ulUnicodeRange1 = p.parseULong();
        os2.ulUnicodeRange2 = p.parseULong();
        os2.ulUnicodeRange3 = p.parseULong();
        os2.ulUnicodeRange4 = p.parseULong();
        os2.achVendID = String.fromCharCode(p.parseByte(), p.parseByte(), p.parseByte(), p.parseByte());
        os2.fsSelection = p.parseUShort();
        os2.usFirstCharIndex = p.parseUShort();
        os2.usLastCharIndex = p.parseUShort();
        os2.sTypoAscender = p.parseShort();
        os2.sTypoDescender = p.parseShort();
        os2.sTypoLineGap = p.parseShort();
        os2.usWinAscent = p.parseUShort();
        os2.usWinDescent = p.parseUShort();
        if (os2.version >= 1) {
            os2.ulCodePageRange1 = p.parseULong();
            os2.ulCodePageRange2 = p.parseULong();
        }

        if (os2.version >= 2) {
            os2.sxHeight = p.parseShort();
            os2.sCapHeight = p.parseShort();
            os2.usDefaultChar = p.parseUShort();
            os2.usBreakChar = p.parseUShort();
            os2.usMaxContent = p.parseUShort();
        }

        return os2;
    }

    function makeOS2Table(options) {
        return new table.Table('OS/2', [
            {name: 'version', type: 'USHORT', value: 0x0003},
            {name: 'xAvgCharWidth', type: 'SHORT', value: 0},
            {name: 'usWeightClass', type: 'USHORT', value: 0},
            {name: 'usWidthClass', type: 'USHORT', value: 0},
            {name: 'fsType', type: 'USHORT', value: 0},
            {name: 'ySubscriptXSize', type: 'SHORT', value: 650},
            {name: 'ySubscriptYSize', type: 'SHORT', value: 699},
            {name: 'ySubscriptXOffset', type: 'SHORT', value: 0},
            {name: 'ySubscriptYOffset', type: 'SHORT', value: 140},
            {name: 'ySuperscriptXSize', type: 'SHORT', value: 650},
            {name: 'ySuperscriptYSize', type: 'SHORT', value: 699},
            {name: 'ySuperscriptXOffset', type: 'SHORT', value: 0},
            {name: 'ySuperscriptYOffset', type: 'SHORT', value: 479},
            {name: 'yStrikeoutSize', type: 'SHORT', value: 49},
            {name: 'yStrikeoutPosition', type: 'SHORT', value: 258},
            {name: 'sFamilyClass', type: 'SHORT', value: 0},
            {name: 'bFamilyType', type: 'BYTE', value: 0},
            {name: 'bSerifStyle', type: 'BYTE', value: 0},
            {name: 'bWeight', type: 'BYTE', value: 0},
            {name: 'bProportion', type: 'BYTE', value: 0},
            {name: 'bContrast', type: 'BYTE', value: 0},
            {name: 'bStrokeVariation', type: 'BYTE', value: 0},
            {name: 'bArmStyle', type: 'BYTE', value: 0},
            {name: 'bLetterform', type: 'BYTE', value: 0},
            {name: 'bMidline', type: 'BYTE', value: 0},
            {name: 'bXHeight', type: 'BYTE', value: 0},
            {name: 'ulUnicodeRange1', type: 'ULONG', value: 0},
            {name: 'ulUnicodeRange2', type: 'ULONG', value: 0},
            {name: 'ulUnicodeRange3', type: 'ULONG', value: 0},
            {name: 'ulUnicodeRange4', type: 'ULONG', value: 0},
            {name: 'achVendID', type: 'CHARARRAY', value: 'XXXX'},
            {name: 'fsSelection', type: 'USHORT', value: 0},
            {name: 'usFirstCharIndex', type: 'USHORT', value: 0},
            {name: 'usLastCharIndex', type: 'USHORT', value: 0},
            {name: 'sTypoAscender', type: 'SHORT', value: 0},
            {name: 'sTypoDescender', type: 'SHORT', value: 0},
            {name: 'sTypoLineGap', type: 'SHORT', value: 0},
            {name: 'usWinAscent', type: 'USHORT', value: 0},
            {name: 'usWinDescent', type: 'USHORT', value: 0},
            {name: 'ulCodePageRange1', type: 'ULONG', value: 0},
            {name: 'ulCodePageRange2', type: 'ULONG', value: 0},
            {name: 'sxHeight', type: 'SHORT', value: 0},
            {name: 'sCapHeight', type: 'SHORT', value: 0},
            {name: 'usDefaultChar', type: 'USHORT', value: 0},
            {name: 'usBreakChar', type: 'USHORT', value: 0},
            {name: 'usMaxContext', type: 'USHORT', value: 0}
        ], options);
    }

    var unicodeRanges_1 = unicodeRanges;
    var getUnicodeRange_1 = getUnicodeRange;
    var parse_1$6 = parseOS2Table;
    var make$4 = makeOS2Table;

    var os2 = {
    	unicodeRanges: unicodeRanges_1,
    	getUnicodeRange: getUnicodeRange_1,
    	parse: parse_1$6,
    	make: make$4
    };

    // Parse the PostScript `post` table
    function parsePostTable(data, start) {
        var post = {};
        var p = new parse.Parser(data, start);
        var i;
        post.version = p.parseVersion();
        post.italicAngle = p.parseFixed();
        post.underlinePosition = p.parseShort();
        post.underlineThickness = p.parseShort();
        post.isFixedPitch = p.parseULong();
        post.minMemType42 = p.parseULong();
        post.maxMemType42 = p.parseULong();
        post.minMemType1 = p.parseULong();
        post.maxMemType1 = p.parseULong();
        switch (post.version) {
        case 1:
            post.names = encoding.standardNames.slice();
            break;
        case 2:
            post.numberOfGlyphs = p.parseUShort();
            post.glyphNameIndex = new Array(post.numberOfGlyphs);
            for (i = 0; i < post.numberOfGlyphs; i++) {
                post.glyphNameIndex[i] = p.parseUShort();
            }

            post.names = [];
            for (i = 0; i < post.numberOfGlyphs; i++) {
                if (post.glyphNameIndex[i] >= encoding.standardNames.length) {
                    var nameLength = p.parseChar();
                    post.names.push(p.parseString(nameLength));
                }
            }

            break;
        case 2.5:
            post.numberOfGlyphs = p.parseUShort();
            post.offset = new Array(post.numberOfGlyphs);
            for (i = 0; i < post.numberOfGlyphs; i++) {
                post.offset[i] = p.parseChar();
            }

            break;
        }
        return post;
    }

    function makePostTable() {
        return new table.Table('post', [
            {name: 'version', type: 'FIXED', value: 0x00030000},
            {name: 'italicAngle', type: 'FIXED', value: 0},
            {name: 'underlinePosition', type: 'FWORD', value: 0},
            {name: 'underlineThickness', type: 'FWORD', value: 0},
            {name: 'isFixedPitch', type: 'ULONG', value: 0},
            {name: 'minMemType42', type: 'ULONG', value: 0},
            {name: 'maxMemType42', type: 'ULONG', value: 0},
            {name: 'minMemType1', type: 'ULONG', value: 0},
            {name: 'maxMemType1', type: 'ULONG', value: 0}
        ]);
    }

    var parse_1$5 = parsePostTable;
    var make$3 = makePostTable;

    var post = {
    	parse: parse_1$5,
    	make: make$3
    };

    function log2(v) {
        return Math.log(v) / Math.log(2) | 0;
    }

    function computeCheckSum(bytes) {
        while (bytes.length % 4 !== 0) {
            bytes.push(0);
        }

        var sum = 0;
        for (var i = 0; i < bytes.length; i += 4) {
            sum += (bytes[i] << 24) +
                (bytes[i + 1] << 16) +
                (bytes[i + 2] << 8) +
                (bytes[i + 3]);
        }

        sum %= Math.pow(2, 32);
        return sum;
    }

    function makeTableRecord(tag, checkSum, offset, length) {
        return new table.Table('Table Record', [
            {name: 'tag', type: 'TAG', value: tag !== undefined ? tag : ''},
            {name: 'checkSum', type: 'ULONG', value: checkSum !== undefined ? checkSum : 0},
            {name: 'offset', type: 'ULONG', value: offset !== undefined ? offset : 0},
            {name: 'length', type: 'ULONG', value: length !== undefined ? length : 0}
        ]);
    }

    function makeSfntTable(tables) {
        var sfnt = new table.Table('sfnt', [
            {name: 'version', type: 'TAG', value: 'OTTO'},
            {name: 'numTables', type: 'USHORT', value: 0},
            {name: 'searchRange', type: 'USHORT', value: 0},
            {name: 'entrySelector', type: 'USHORT', value: 0},
            {name: 'rangeShift', type: 'USHORT', value: 0}
        ]);
        sfnt.tables = tables;
        sfnt.numTables = tables.length;
        var highestPowerOf2 = Math.pow(2, log2(sfnt.numTables));
        sfnt.searchRange = 16 * highestPowerOf2;
        sfnt.entrySelector = log2(highestPowerOf2);
        sfnt.rangeShift = sfnt.numTables * 16 - sfnt.searchRange;

        var recordFields = [];
        var tableFields = [];

        var offset = sfnt.sizeOf() + (makeTableRecord().sizeOf() * sfnt.numTables);
        while (offset % 4 !== 0) {
            offset += 1;
            tableFields.push({name: 'padding', type: 'BYTE', value: 0});
        }

        for (var i = 0; i < tables.length; i += 1) {
            var t = tables[i];
            check.argument(t.tableName.length === 4, 'Table name' + t.tableName + ' is invalid.');
            var tableLength = t.sizeOf();
            var tableRecord = makeTableRecord(t.tableName, computeCheckSum(t.encode()), offset, tableLength);
            recordFields.push({name: tableRecord.tag + ' Table Record', type: 'TABLE', value: tableRecord});
            tableFields.push({name: t.tableName + ' table', type: 'TABLE', value: t});
            offset += tableLength;
            check.argument(!isNaN(offset), 'Something went wrong calculating the offset.');
            while (offset % 4 !== 0) {
                offset += 1;
                tableFields.push({name: 'padding', type: 'BYTE', value: 0});
            }
        }

        // Table records need to be sorted alphabetically.
        recordFields.sort(function(r1, r2) {
            if (r1.value.tag > r2.value.tag) {
                return 1;
            } else {
                return -1;
            }
        });

        sfnt.fields = sfnt.fields.concat(recordFields);
        sfnt.fields = sfnt.fields.concat(tableFields);
        return sfnt;
    }

    // Get the metrics for a character. If the string has more than one character
    // this function returns metrics for the first available character.
    // You can provide optional fallback metrics if no characters are available.
    function metricsForChar(font, chars, notFoundMetrics) {
        for (var i = 0; i < chars.length; i += 1) {
            var glyphIndex = font.charToGlyphIndex(chars[i]);
            if (glyphIndex > 0) {
                var glyph = font.glyphs.get(glyphIndex);
                return glyph.getMetrics();
            }
        }

        return notFoundMetrics;
    }

    function average(vs) {
        var sum = 0;
        for (var i = 0; i < vs.length; i += 1) {
            sum += vs[i];
        }

        return sum / vs.length;
    }

    // Convert the font object to a SFNT data structure.
    // This structure contains all the necessary tables and metadata to create a binary OTF file.
    function fontToSfntTable(font) {
        var xMins = [];
        var yMins = [];
        var xMaxs = [];
        var yMaxs = [];
        var advanceWidths = [];
        var leftSideBearings = [];
        var rightSideBearings = [];
        var firstCharIndex;
        var lastCharIndex = 0;
        var ulUnicodeRange1 = 0;
        var ulUnicodeRange2 = 0;
        var ulUnicodeRange3 = 0;
        var ulUnicodeRange4 = 0;

        for (var i = 0; i < font.glyphs.length; i += 1) {
            var glyph = font.glyphs.get(i);
            var unicode = glyph.unicode | 0;
            if (firstCharIndex > unicode || firstCharIndex === null) {
                firstCharIndex = unicode;
            }

            if (lastCharIndex < unicode) {
                lastCharIndex = unicode;
            }

            var position = os2.getUnicodeRange(unicode);
            if (position < 32) {
                ulUnicodeRange1 |= 1 << position;
            } else if (position < 64) {
                ulUnicodeRange2 |= 1 << position - 32;
            } else if (position < 96) {
                ulUnicodeRange3 |= 1 << position - 64;
            } else if (position < 123) {
                ulUnicodeRange4 |= 1 << position - 96;
            } else {
                throw new Error('Unicode ranges bits > 123 are reserved for internal usage');
            }
            // Skip non-important characters.
            if (glyph.name === '.notdef') continue;
            var metrics = glyph.getMetrics();
            xMins.push(metrics.xMin);
            yMins.push(metrics.yMin);
            xMaxs.push(metrics.xMax);
            yMaxs.push(metrics.yMax);
            leftSideBearings.push(metrics.leftSideBearing);
            rightSideBearings.push(metrics.rightSideBearing);
            advanceWidths.push(glyph.advanceWidth);
        }

        var globals = {
            xMin: Math.min.apply(null, xMins),
            yMin: Math.min.apply(null, yMins),
            xMax: Math.max.apply(null, xMaxs),
            yMax: Math.max.apply(null, yMaxs),
            advanceWidthMax: Math.max.apply(null, advanceWidths),
            advanceWidthAvg: average(advanceWidths),
            minLeftSideBearing: Math.min.apply(null, leftSideBearings),
            maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
            minRightSideBearing: Math.min.apply(null, rightSideBearings)
        };
        globals.ascender = font.ascender !== undefined ? font.ascender : globals.yMax;
        globals.descender = font.descender !== undefined ? font.descender : globals.yMin;

        var headTable = head.make({
            unitsPerEm: font.unitsPerEm,
            xMin: globals.xMin,
            yMin: globals.yMin,
            xMax: globals.xMax,
            yMax: globals.yMax
        });

        var hheaTable = hhea.make({
            ascender: globals.ascender,
            descender: globals.descender,
            advanceWidthMax: globals.advanceWidthMax,
            minLeftSideBearing: globals.minLeftSideBearing,
            minRightSideBearing: globals.minRightSideBearing,
            xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
            numberOfHMetrics: font.glyphs.length
        });

        var maxpTable = maxp.make(font.glyphs.length);

        var os2Table = os2.make({
            xAvgCharWidth: Math.round(globals.advanceWidthAvg),
            usWeightClass: 500, // Medium FIXME Make this configurable
            usWidthClass: 5, // Medium (normal) FIXME Make this configurable
            usFirstCharIndex: firstCharIndex,
            usLastCharIndex: lastCharIndex,
            ulUnicodeRange1: ulUnicodeRange1,
            ulUnicodeRange2: ulUnicodeRange2,
            ulUnicodeRange3: ulUnicodeRange3,
            ulUnicodeRange4: ulUnicodeRange4,
            // See http://typophile.com/node/13081 for more info on vertical metrics.
            // We get metrics for typical characters (such as "x" for xHeight).
            // We provide some fallback characters if characters are unavailable: their
            // ordering was chosen experimentally.
            sTypoAscender: globals.ascender,
            sTypoDescender: globals.descender,
            sTypoLineGap: 0,
            usWinAscent: globals.ascender,
            usWinDescent: -globals.descender,
            sxHeight: metricsForChar(font, 'xyvw', {yMax: 0}).yMax,
            sCapHeight: metricsForChar(font, 'HIKLEFJMNTZBDPRAGOQSUVWXY', globals).yMax,
            usBreakChar: font.hasChar(' ') ? 32 : 0 // Use space as the break character, if available.
        });

        var hmtxTable = hmtx.make(font.glyphs);
        var cmapTable = cmap.make(font.glyphs);

        var englishFamilyName = font.getEnglishName('fontFamily');
        var englishStyleName = font.getEnglishName('fontSubfamily');
        var englishFullName = englishFamilyName + ' ' + englishStyleName;
        var postScriptName = font.getEnglishName('postScriptName');
        if (!postScriptName) {
            postScriptName = englishFamilyName.replace(/\s/g, '') + '-' + englishStyleName;
        }

        var names = {};
        for (var n in font.names) {
            names[n] = font.names[n];
        }

        if (!names.uniqueID) {
            names.uniqueID = {en: font.getEnglishName('manufacturer') + ':' + englishFullName};
        }

        if (!names.postScriptName) {
            names.postScriptName = {en: postScriptName};
        }

        if (!names.preferredFamily) {
            names.preferredFamily = font.names.fontFamily;
        }

        if (!names.preferredSubfamily) {
            names.preferredSubfamily = font.names.fontSubfamily;
        }

        var languageTags = [];
        var nameTable = name.make(names, languageTags);
        var ltagTable = (languageTags.length > 0 ? ltag.make(languageTags) : undefined);

        var postTable = post.make();
        var cffTable = cff.make(font.glyphs, {
            version: font.getEnglishName('version'),
            fullName: englishFullName,
            familyName: englishFamilyName,
            weightName: englishStyleName,
            postScriptName: postScriptName,
            unitsPerEm: font.unitsPerEm
        });

        // The order does not matter because makeSfntTable() will sort them.
        var tables = [headTable, hheaTable, maxpTable, os2Table, nameTable, cmapTable, postTable, cffTable, hmtxTable];
        if (ltagTable) {
            tables.push(ltagTable);
        }

        var sfntTable = makeSfntTable(tables);

        // Compute the font's checkSum and store it in head.checkSumAdjustment.
        var bytes = sfntTable.encode();
        var checkSum = computeCheckSum(bytes);
        var tableFields = sfntTable.fields;
        var checkSumAdjusted = false;
        for (i = 0; i < tableFields.length; i += 1) {
            if (tableFields[i].name === 'head table') {
                tableFields[i].value.checkSumAdjustment = 0xB1B0AFBA - checkSum;
                checkSumAdjusted = true;
                break;
            }
        }

        if (!checkSumAdjusted) {
            throw new Error('Could not find head table with checkSum to adjust.');
        }

        return sfntTable;
    }

    var computeCheckSum_1 = computeCheckSum;
    var make$2 = makeSfntTable;
    var fontToTable = fontToSfntTable;

    var sfnt = {
    	computeCheckSum: computeCheckSum_1,
    	make: make$2,
    	fontToTable: fontToTable
    };

    // A Font represents a loaded OpenType font file.
    // It contains a set of glyphs and methods to draw text on a drawing context,
    // or to get a path representing the text.
    function Font(options) {
        options = options || {};

        // OS X will complain if the names are empty, so we put a single space everywhere by default.
        this.names = {
            fontFamily: {en: options.familyName || ' '},
            fontSubfamily: {en: options.styleName || ' '},
            designer: {en: options.designer || ' '},
            designerURL: {en: options.designerURL || ' '},
            manufacturer: {en: options.manufacturer || ' '},
            manufacturerURL: {en: options.manufacturerURL || ' '},
            license: {en: options.license || ' '},
            licenseURL: {en: options.licenseURL || ' '},
            version: {en: options.version || 'Version 0.1'},
            description: {en: options.description || ' '},
            copyright: {en: options.copyright || ' '},
            trademark: {en: options.trademark || ' '}
        };
        this.unitsPerEm = options.unitsPerEm || 1000;
        this.ascender = options.ascender;
        this.descender = options.descender;
        this.supported = true; // Deprecated: parseBuffer will throw an error if font is not supported.
        this.glyphs = new glyphset.GlyphSet(this, options.glyphs || []);
        this.encoding = new encoding.DefaultEncoding(this);
        this.tables = {};
    }

    // Check if the font has a glyph for the given character.
    Font.prototype.hasChar = function(c) {
        return this.encoding.charToGlyphIndex(c) !== null;
    };

    // Convert the given character to a single glyph index.
    // Note that this function assumes that there is a one-to-one mapping between
    // the given character and a glyph; for complex scripts this might not be the case.
    Font.prototype.charToGlyphIndex = function(s) {
        return this.encoding.charToGlyphIndex(s);
    };

    // Convert the given character to a single Glyph object.
    // Note that this function assumes that there is a one-to-one mapping between
    // the given character and a glyph; for complex scripts this might not be the case.
    Font.prototype.charToGlyph = function(c) {
        var glyphIndex = this.charToGlyphIndex(c);
        var glyph = this.glyphs.get(glyphIndex);
        if (!glyph) {
            // .notdef
            glyph = this.glyphs.get(0);
        }

        return glyph;
    };

    // Convert the given text to a list of Glyph objects.
    // Note that there is no strict one-to-one mapping between characters and
    // glyphs, so the list of returned glyphs can be larger or smaller than the
    // length of the given string.
    Font.prototype.stringToGlyphs = function(s) {
        var glyphs = [];
        for (var i = 0; i < s.length; i += 1) {
            var c = s[i];
            glyphs.push(this.charToGlyph(c));
        }

        return glyphs;
    };

    Font.prototype.nameToGlyphIndex = function(name) {
        return this.glyphNames.nameToGlyphIndex(name);
    };

    Font.prototype.nameToGlyph = function(name) {
        var glyphIndex = this.nametoGlyphIndex(name);
        var glyph = this.glyphs.get(glyphIndex);
        if (!glyph) {
            // .notdef
            glyph = this.glyphs.get(0);
        }

        return glyph;
    };

    Font.prototype.glyphIndexToName = function(gid) {
        if (!this.glyphNames.glyphIndexToName) {
            return '';
        }

        return this.glyphNames.glyphIndexToName(gid);
    };

    // Retrieve the value of the kerning pair between the left glyph (or its index)
    // and the right glyph (or its index). If no kerning pair is found, return 0.
    // The kerning value gets added to the advance width when calculating the spacing
    // between glyphs.
    Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
        leftGlyph = leftGlyph.index || leftGlyph;
        rightGlyph = rightGlyph.index || rightGlyph;
        var gposKerning = this.getGposKerningValue;
        return gposKerning ? gposKerning(leftGlyph, rightGlyph) :
            (this.kerningPairs[leftGlyph + ',' + rightGlyph] || 0);
    };

    // Helper function that invokes the given callback for each glyph in the given text.
    // The callback gets `(glyph, x, y, fontSize, options)`.
    Font.prototype.forEachGlyph = function(text, x, y, fontSize, options, callback) {
        x = x !== undefined ? x : 0;
        y = y !== undefined ? y : 0;
        fontSize = fontSize !== undefined ? fontSize : 72;
        options = options || {};
        var kerning = options.kerning === undefined ? true : options.kerning;
        var fontScale = 1 / this.unitsPerEm * fontSize;
        var glyphs = this.stringToGlyphs(text);
        for (var i = 0; i < glyphs.length; i += 1) {
            var glyph = glyphs[i];
            callback(glyph, x, y, fontSize, options);
            if (glyph.advanceWidth) {
                x += glyph.advanceWidth * fontScale;
            }

            if (kerning && i < glyphs.length - 1) {
                var kerningValue = this.getKerningValue(glyph, glyphs[i + 1]);
                x += kerningValue * fontScale;
            }
        }
    };

    // Create a Path object that represents the given text.
    //
    // text - The text to create.
    // x - Horizontal position of the beginning of the text. (default: 0)
    // y - Vertical position of the *baseline* of the text. (default: 0)
    // fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
    // Options is an optional object that contains:
    // - kerning - Whether to take kerning information into account. (default: true)
    //
    // Returns a Path object.
    Font.prototype.getPath = function(text, x, y, fontSize, options) {
        var fullPath = new path.Path();
        this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
            var glyphPath = glyph.getPath(gX, gY, gFontSize);
            fullPath.extend(glyphPath);
        });

        return fullPath;
    };

    // Draw the text on the given drawing context.
    //
    // ctx - A 2D drawing context, like Canvas.
    // text - The text to create.
    // x - Horizontal position of the beginning of the text. (default: 0)
    // y - Vertical position of the *baseline* of the text. (default: 0)
    // fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
    // Options is an optional object that contains:
    // - kerning - Whether to take kerning information into account. (default: true)
    Font.prototype.draw = function(ctx, text, x, y, fontSize, options) {
        this.getPath(text, x, y, fontSize, options).draw(ctx);
    };

    // Draw the points of all glyphs in the text.
    // On-curve points will be drawn in blue, off-curve points will be drawn in red.
    //
    // ctx - A 2D drawing context, like Canvas.
    // text - The text to create.
    // x - Horizontal position of the beginning of the text. (default: 0)
    // y - Vertical position of the *baseline* of the text. (default: 0)
    // fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
    // Options is an optional object that contains:
    // - kerning - Whether to take kerning information into account. (default: true)
    Font.prototype.drawPoints = function(ctx, text, x, y, fontSize, options) {
        this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
            glyph.drawPoints(ctx, gX, gY, gFontSize);
        });
    };

    // Draw lines indicating important font measurements for all glyphs in the text.
    // Black lines indicate the origin of the coordinate system (point 0,0).
    // Blue lines indicate the glyph bounding box.
    // Green line indicates the advance width of the glyph.
    //
    // ctx - A 2D drawing context, like Canvas.
    // text - The text to create.
    // x - Horizontal position of the beginning of the text. (default: 0)
    // y - Vertical position of the *baseline* of the text. (default: 0)
    // fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
    // Options is an optional object that contains:
    // - kerning - Whether to take kerning information into account. (default: true)
    Font.prototype.drawMetrics = function(ctx, text, x, y, fontSize, options) {
        this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
            glyph.drawMetrics(ctx, gX, gY, gFontSize);
        });
    };

    Font.prototype.getEnglishName = function(name) {
        var translations = this.names[name];
        if (translations) {
            return translations.en;
        }
    };

    // Validate
    Font.prototype.validate = function() {
        var _this = this;

        function assert(predicate, message) {
        }

        function assertNamePresent(name) {
            var englishName = _this.getEnglishName(name);
            assert(englishName && englishName.trim().length > 0);
        }

        // Identification information
        assertNamePresent('fontFamily');
        assertNamePresent('weightName');
        assertNamePresent('manufacturer');
        assertNamePresent('copyright');
        assertNamePresent('version');

        // Dimension information
        assert(this.unitsPerEm > 0);
    };

    // Convert the font object to a SFNT data structure.
    // This structure contains all the necessary tables and metadata to create a binary OTF file.
    Font.prototype.toTables = function() {
        return sfnt.fontToTable(this);
    };

    Font.prototype.toBuffer = function() {
        var sfntTable = this.toTables();
        var bytes = sfntTable.encode();
        var buffer = new ArrayBuffer(bytes.length);
        var intArray = new Uint8Array(buffer);
        for (var i = 0; i < bytes.length; i++) {
            intArray[i] = bytes[i];
        }

        return buffer;
    };

    // Initiate a download of the OpenType font.
    Font.prototype.download = function() {
        var familyName = this.getEnglishName('fontFamily');
        var styleName = this.getEnglishName('fontSubfamily');
        var fileName = familyName.replace(/\s/g, '') + '-' + styleName + '.otf';
        var buffer = this.toBuffer();

        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.TEMPORARY, buffer.byteLength, function(fs) {
            fs.root.getFile(fileName, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(writer) {
                    var dataView = new DataView(buffer);
                    var blob = new Blob([dataView], {type: 'font/opentype'});
                    writer.write(blob);

                    writer.addEventListener('writeend', function() {
                        // Navigating to the file will download it.
                        location.href = fileEntry.toURL();
                    }, false);
                });
            });
        },

        function(err) {
            throw err;
        });
    };

    var Font_1 = Font;

    var font = {
    	Font: Font_1
    };

    function addName(name, names) {
        var nameString = JSON.stringify(name);
        var nameID = 256;
        for (var nameKey in names) {
            var n = parseInt(nameKey);
            if (!n || n < 256) {
                continue;
            }

            if (JSON.stringify(names[nameKey]) === nameString) {
                return n;
            }

            if (nameID <= n) {
                nameID = n + 1;
            }
        }

        names[nameID] = name;
        return nameID;
    }

    function makeFvarAxis(axis, names) {
        var nameID = addName(axis.name, names);
        return new table.Table('fvarAxis', [
            {name: 'tag', type: 'TAG', value: axis.tag},
            {name: 'minValue', type: 'FIXED', value: axis.minValue << 16},
            {name: 'defaultValue', type: 'FIXED', value: axis.defaultValue << 16},
            {name: 'maxValue', type: 'FIXED', value: axis.maxValue << 16},
            {name: 'flags', type: 'USHORT', value: 0},
            {name: 'nameID', type: 'USHORT', value: nameID}
        ]);
    }

    function parseFvarAxis(data, start, names) {
        var axis = {};
        var p = new parse.Parser(data, start);
        axis.tag = p.parseTag();
        axis.minValue = p.parseFixed();
        axis.defaultValue = p.parseFixed();
        axis.maxValue = p.parseFixed();
        p.skip('uShort', 1);  // reserved for flags; no values defined
        axis.name = names[p.parseUShort()] || {};
        return axis;
    }

    function makeFvarInstance(inst, axes, names) {
        var nameID = addName(inst.name, names);
        var fields = [
            {name: 'nameID', type: 'USHORT', value: nameID},
            {name: 'flags', type: 'USHORT', value: 0}
        ];

        for (var i = 0; i < axes.length; ++i) {
            var axisTag = axes[i].tag;
            fields.push({
                name: 'axis ' + axisTag,
                type: 'FIXED',
                value: inst.coordinates[axisTag] << 16
            });
        }

        return new table.Table('fvarInstance', fields);
    }

    function parseFvarInstance(data, start, axes, names) {
        var inst = {};
        var p = new parse.Parser(data, start);
        inst.name = names[p.parseUShort()] || {};
        p.skip('uShort', 1);  // reserved for flags; no values defined

        inst.coordinates = {};
        for (var i = 0; i < axes.length; ++i) {
            inst.coordinates[axes[i].tag] = p.parseFixed();
        }

        return inst;
    }

    function makeFvarTable(fvar, names) {
        var result = new table.Table('fvar', [
            {name: 'version', type: 'ULONG', value: 0x10000},
            {name: 'offsetToData', type: 'USHORT', value: 0},
            {name: 'countSizePairs', type: 'USHORT', value: 2},
            {name: 'axisCount', type: 'USHORT', value: fvar.axes.length},
            {name: 'axisSize', type: 'USHORT', value: 20},
            {name: 'instanceCount', type: 'USHORT', value: fvar.instances.length},
            {name: 'instanceSize', type: 'USHORT', value: 4 + fvar.axes.length * 4}
        ]);
        result.offsetToData = result.sizeOf();

        for (var i = 0; i < fvar.axes.length; i++) {
            result.fields.push({
                name: 'axis ' + i,
                type: 'TABLE',
                value: makeFvarAxis(fvar.axes[i], names)});
        }

        for (var j = 0; j < fvar.instances.length; j++) {
            result.fields.push({
                name: 'instance ' + j,
                type: 'TABLE',
                value: makeFvarInstance(fvar.instances[j], fvar.axes, names)
            });
        }

        return result;
    }

    function parseFvarTable(data, start, names) {
        var p = new parse.Parser(data, start);
        var tableVersion = p.parseULong();
        check.argument(tableVersion === 0x00010000, 'Unsupported fvar table version.');
        var offsetToData = p.parseOffset16();
        // Skip countSizePairs.
        p.skip('uShort', 1);
        var axisCount = p.parseUShort();
        var axisSize = p.parseUShort();
        var instanceCount = p.parseUShort();
        var instanceSize = p.parseUShort();

        var axes = [];
        for (var i = 0; i < axisCount; i++) {
            axes.push(parseFvarAxis(data, start + offsetToData + i * axisSize, names));
        }

        var instances = [];
        var instanceStart = start + offsetToData + axisCount * axisSize;
        for (var j = 0; j < instanceCount; j++) {
            instances.push(parseFvarInstance(data, instanceStart + j * instanceSize, axes, names));
        }

        return {axes:axes, instances:instances};
    }

    var make$1 = makeFvarTable;
    var parse_1$4 = parseFvarTable;

    var fvar = {
    	make: make$1,
    	parse: parse_1$4
    };

    // Parse the coordinate data for a glyph.
    function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
        var v;
        if ((flag & shortVectorBitMask) > 0) {
            // The coordinate is 1 byte long.
            v = p.parseByte();
            // The `same` bit is re-used for short values to signify the sign of the value.
            if ((flag & sameBitMask) === 0) {
                v = -v;
            }

            v = previousValue + v;
        } else {
            //  The coordinate is 2 bytes long.
            // If the `same` bit is set, the coordinate is the same as the previous coordinate.
            if ((flag & sameBitMask) > 0) {
                v = previousValue;
            } else {
                // Parse the coordinate as a signed 16-bit delta value.
                v = previousValue + p.parseShort();
            }
        }

        return v;
    }

    // Parse a TrueType glyph.
    function parseGlyph(glyph, data, start) {
        var p = new parse.Parser(data, start);
        glyph.numberOfContours = p.parseShort();
        glyph.xMin = p.parseShort();
        glyph.yMin = p.parseShort();
        glyph.xMax = p.parseShort();
        glyph.yMax = p.parseShort();
        var flags;
        var flag;
        if (glyph.numberOfContours > 0) {
            var i;
            // This glyph is not a composite.
            var endPointIndices = glyph.endPointIndices = [];
            for (i = 0; i < glyph.numberOfContours; i += 1) {
                endPointIndices.push(p.parseUShort());
            }

            glyph.instructionLength = p.parseUShort();
            glyph.instructions = [];
            for (i = 0; i < glyph.instructionLength; i += 1) {
                glyph.instructions.push(p.parseByte());
            }

            var numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
            flags = [];
            for (i = 0; i < numberOfCoordinates; i += 1) {
                flag = p.parseByte();
                flags.push(flag);
                // If bit 3 is set, we repeat this flag n times, where n is the next byte.
                if ((flag & 8) > 0) {
                    var repeatCount = p.parseByte();
                    for (var j = 0; j < repeatCount; j += 1) {
                        flags.push(flag);
                        i += 1;
                    }
                }
            }

            check.argument(flags.length === numberOfCoordinates, 'Bad flags.');

            if (endPointIndices.length > 0) {
                var points = [];
                var point;
                // X/Y coordinates are relative to the previous point, except for the first point which is relative to 0,0.
                if (numberOfCoordinates > 0) {
                    for (i = 0; i < numberOfCoordinates; i += 1) {
                        flag = flags[i];
                        point = {};
                        point.onCurve = !!(flag & 1);
                        point.lastPointOfContour = endPointIndices.indexOf(i) >= 0;
                        points.push(point);
                    }

                    var px = 0;
                    for (i = 0; i < numberOfCoordinates; i += 1) {
                        flag = flags[i];
                        point = points[i];
                        point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
                        px = point.x;
                    }

                    var py = 0;
                    for (i = 0; i < numberOfCoordinates; i += 1) {
                        flag = flags[i];
                        point = points[i];
                        point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
                        py = point.y;
                    }
                }

                glyph.points = points;
            } else {
                glyph.points = [];
            }
        } else if (glyph.numberOfContours === 0) {
            glyph.points = [];
        } else {
            glyph.isComposite = true;
            glyph.points = [];
            glyph.components = [];
            var moreComponents = true;
            while (moreComponents) {
                flags = p.parseUShort();
                var component = {
                    glyphIndex: p.parseUShort(),
                    xScale: 1,
                    scale01: 0,
                    scale10: 0,
                    yScale: 1,
                    dx: 0,
                    dy: 0
                };
                if ((flags & 1) > 0) {
                    // The arguments are words
                    component.dx = p.parseShort();
                    component.dy = p.parseShort();
                } else {
                    // The arguments are bytes
                    component.dx = p.parseChar();
                    component.dy = p.parseChar();
                }

                if ((flags & 8) > 0) {
                    // We have a scale
                    component.xScale = component.yScale = p.parseF2Dot14();
                } else if ((flags & 64) > 0) {
                    // We have an X / Y scale
                    component.xScale = p.parseF2Dot14();
                    component.yScale = p.parseF2Dot14();
                } else if ((flags & 128) > 0) {
                    // We have a 2x2 transformation
                    component.xScale = p.parseF2Dot14();
                    component.scale01 = p.parseF2Dot14();
                    component.scale10 = p.parseF2Dot14();
                    component.yScale = p.parseF2Dot14();
                }

                glyph.components.push(component);
                moreComponents = !!(flags & 32);
            }
        }
    }

    // Transform an array of points and return a new array.
    function transformPoints(points, transform) {
        var newPoints = [];
        for (var i = 0; i < points.length; i += 1) {
            var pt = points[i];
            var newPt = {
                x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
                y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
                onCurve: pt.onCurve,
                lastPointOfContour: pt.lastPointOfContour
            };
            newPoints.push(newPt);
        }

        return newPoints;
    }

    function getContours(points) {
        var contours = [];
        var currentContour = [];
        for (var i = 0; i < points.length; i += 1) {
            var pt = points[i];
            currentContour.push(pt);
            if (pt.lastPointOfContour) {
                contours.push(currentContour);
                currentContour = [];
            }
        }

        check.argument(currentContour.length === 0, 'There are still points left in the current contour.');
        return contours;
    }

    // Convert the TrueType glyph outline to a Path.
    function getPath(points) {
        var p = new path.Path();
        if (!points) {
            return p;
        }

        var contours = getContours(points);
        for (var i = 0; i < contours.length; i += 1) {
            var contour = contours[i];
            var firstPt = contour[0];
            var lastPt = contour[contour.length - 1];
            var curvePt;
            var realFirstPoint;
            if (firstPt.onCurve) {
                curvePt = null;
                // The first point will be consumed by the moveTo command,
                // so skip it in the loop.
                realFirstPoint = true;
            } else {
                if (lastPt.onCurve) {
                    // If the first point is off-curve and the last point is on-curve,
                    // start at the last point.
                    firstPt = lastPt;
                } else {
                    // If both first and last points are off-curve, start at their middle.
                    firstPt = { x: (firstPt.x + lastPt.x) / 2, y: (firstPt.y + lastPt.y) / 2 };
                }

                curvePt = firstPt;
                // The first point is synthesized, so don't skip the real first point.
                realFirstPoint = false;
            }

            p.moveTo(firstPt.x, firstPt.y);

            for (var j = realFirstPoint ? 1 : 0; j < contour.length; j += 1) {
                var pt = contour[j];
                var prevPt = j === 0 ? firstPt : contour[j - 1];
                if (prevPt.onCurve && pt.onCurve) {
                    // This is a straight line.
                    p.lineTo(pt.x, pt.y);
                } else if (prevPt.onCurve && !pt.onCurve) {
                    curvePt = pt;
                } else if (!prevPt.onCurve && !pt.onCurve) {
                    var midPt = { x: (prevPt.x + pt.x) / 2, y: (prevPt.y + pt.y) / 2 };
                    p.quadraticCurveTo(prevPt.x, prevPt.y, midPt.x, midPt.y);
                    curvePt = pt;
                } else if (!prevPt.onCurve && pt.onCurve) {
                    // Previous point off-curve, this point on-curve.
                    p.quadraticCurveTo(curvePt.x, curvePt.y, pt.x, pt.y);
                    curvePt = null;
                } else {
                    throw new Error('Invalid state.');
                }
            }

            if (firstPt !== lastPt) {
                // Connect the last and first points
                if (curvePt) {
                    p.quadraticCurveTo(curvePt.x, curvePt.y, firstPt.x, firstPt.y);
                } else {
                    p.lineTo(firstPt.x, firstPt.y);
                }
            }
        }

        p.closePath();
        return p;
    }

    function buildPath(glyphs, glyph) {
        if (glyph.isComposite) {
            for (var j = 0; j < glyph.components.length; j += 1) {
                var component = glyph.components[j];
                var componentGlyph = glyphs.get(component.glyphIndex);
                // Force the ttfGlyphLoader to parse the glyph.
                componentGlyph.getPath();
                if (componentGlyph.points) {
                    var transformedPoints = transformPoints(componentGlyph.points, component);
                    glyph.points = glyph.points.concat(transformedPoints);
                }
            }
        }

        return getPath(glyph.points);
    }

    // Parse all the glyphs according to the offsets from the `loca` table.
    function parseGlyfTable(data, start, loca, font) {
        var glyphs = new glyphset.GlyphSet(font);
        var i;

        // The last element of the loca table is invalid.
        for (i = 0; i < loca.length - 1; i += 1) {
            var offset = loca[i];
            var nextOffset = loca[i + 1];
            if (offset !== nextOffset) {
                glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
            } else {
                glyphs.push(i, glyphset.glyphLoader(font, i));
            }
        }

        return glyphs;
    }

    var parse_1$3 = parseGlyfTable;

    var glyf = {
    	parse: parse_1$3
    };

    // Parse ScriptList and FeatureList tables of GPOS, GSUB, GDEF, BASE, JSTF tables.
    // These lists are unused by now, this function is just the basis for a real parsing.
    function parseTaggedListTable(data, start) {
        var p = new parse.Parser(data, start);
        var n = p.parseUShort();
        var list = [];
        for (var i = 0; i < n; i++) {
            list[p.parseTag()] = { offset: p.parseUShort() };
        }

        return list;
    }

    // Parse a coverage table in a GSUB, GPOS or GDEF table.
    // Format 1 is a simple list of glyph ids,
    // Format 2 is a list of ranges. It is expanded in a list of glyphs, maybe not the best idea.
    function parseCoverageTable(data, start) {
        var p = new parse.Parser(data, start);
        var format = p.parseUShort();
        var count =  p.parseUShort();
        if (format === 1) {
            return p.parseUShortList(count);
        }
        else if (format === 2) {
            var coverage = [];
            for (; count--;) {
                var begin = p.parseUShort();
                var end = p.parseUShort();
                var index = p.parseUShort();
                for (var i = begin; i <= end; i++) {
                    coverage[index++] = i;
                }
            }

            return coverage;
        }
    }

    // Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
    // Returns a function that gets a class value from a glyph ID.
    function parseClassDefTable(data, start) {
        var p = new parse.Parser(data, start);
        var format = p.parseUShort();
        if (format === 1) {
            // Format 1 specifies a range of consecutive glyph indices, one class per glyph ID.
            var startGlyph = p.parseUShort();
            var glyphCount = p.parseUShort();
            var classes = p.parseUShortList(glyphCount);
            return function(glyphID) {
                return classes[glyphID - startGlyph] || 0;
            };
        }
        else if (format === 2) {
            // Format 2 defines multiple groups of glyph indices that belong to the same class.
            var rangeCount = p.parseUShort();
            var startGlyphs = [];
            var endGlyphs = [];
            var classValues = [];
            for (var i = 0; i < rangeCount; i++) {
                startGlyphs[i] = p.parseUShort();
                endGlyphs[i] = p.parseUShort();
                classValues[i] = p.parseUShort();
            }

            return function(glyphID) {
                var l = 0;
                var r = startGlyphs.length - 1;
                while (l < r) {
                    var c = (l + r + 1) >> 1;
                    if (glyphID < startGlyphs[c]) {
                        r = c - 1;
                    } else {
                        l = c;
                    }
                }

                if (startGlyphs[l] <= glyphID && glyphID <= endGlyphs[l]) {
                    return classValues[l] || 0;
                }

                return 0;
            };
        }
    }

    // Parse a pair adjustment positioning subtable, format 1 or format 2
    // The subtable is returned in the form of a lookup function.
    function parsePairPosSubTable(data, start) {
        var p = new parse.Parser(data, start);
        // This part is common to format 1 and format 2 subtables
        var format = p.parseUShort();
        var coverageOffset = p.parseUShort();
        var coverage = parseCoverageTable(data, start + coverageOffset);
        // valueFormat 4: XAdvance only, 1: XPlacement only, 0: no ValueRecord for second glyph
        // Only valueFormat1=4 and valueFormat2=0 is supported.
        var valueFormat1 = p.parseUShort();
        var valueFormat2 = p.parseUShort();
        var value1;
        if (valueFormat1 !== 4 || valueFormat2 !== 0) return;
        var sharedPairSets = {};
        if (format === 1) {
            // Pair Positioning Adjustment: Format 1
            var pairSetCount = p.parseUShort();
            var pairSet = [];
            // Array of offsets to PairSet tables-from beginning of PairPos subtable-ordered by Coverage Index
            var pairSetOffsets = p.parseOffset16List(pairSetCount);
            for (var firstGlyph = 0; firstGlyph < pairSetCount; firstGlyph++) {
                var pairSetOffset = pairSetOffsets[firstGlyph];
                var sharedPairSet = sharedPairSets[pairSetOffset];
                if (!sharedPairSet) {
                    // Parse a pairset table in a pair adjustment subtable format 1
                    sharedPairSet = {};
                    p.relativeOffset = pairSetOffset;
                    var pairValueCount = p.parseUShort();
                    for (; pairValueCount--;) {
                        var secondGlyph = p.parseUShort();
                        if (valueFormat1) value1 = p.parseShort();
                        if (valueFormat2) p.parseShort();
                        // We only support valueFormat1 = 4 and valueFormat2 = 0,
                        // so value1 is the XAdvance and value2 is empty.
                        sharedPairSet[secondGlyph] = value1;
                    }
                }

                pairSet[coverage[firstGlyph]] = sharedPairSet;
            }

            return function(leftGlyph, rightGlyph) {
                var pairs = pairSet[leftGlyph];
                if (pairs) return pairs[rightGlyph];
            };
        }
        else if (format === 2) {
            // Pair Positioning Adjustment: Format 2
            var classDef1Offset = p.parseUShort();
            var classDef2Offset = p.parseUShort();
            var class1Count = p.parseUShort();
            var class2Count = p.parseUShort();
            var getClass1 = parseClassDefTable(data, start + classDef1Offset);
            var getClass2 = parseClassDefTable(data, start + classDef2Offset);

            // Parse kerning values by class pair.
            var kerningMatrix = [];
            for (var i = 0; i < class1Count; i++) {
                var kerningRow = kerningMatrix[i] = [];
                for (var j = 0; j < class2Count; j++) {
                    if (valueFormat1) value1 = p.parseShort();
                    if (valueFormat2) p.parseShort();
                    // We only support valueFormat1 = 4 and valueFormat2 = 0,
                    // so value1 is the XAdvance and value2 is empty.
                    kerningRow[j] = value1;
                }
            }

            // Convert coverage list to a hash
            var covered = {};
            for (i = 0; i < coverage.length; i++) covered[coverage[i]] = 1;

            // Get the kerning value for a specific glyph pair.
            return function(leftGlyph, rightGlyph) {
                if (!covered[leftGlyph]) return;
                var class1 = getClass1(leftGlyph);
                var class2 = getClass2(rightGlyph);
                var kerningRow = kerningMatrix[class1];

                if (kerningRow) {
                    return kerningRow[class2];
                }
            };
        }
    }

    // Parse a LookupTable (present in of GPOS, GSUB, GDEF, BASE, JSTF tables).
    function parseLookupTable(data, start) {
        var p = new parse.Parser(data, start);
        var lookupType = p.parseUShort();
        var lookupFlag = p.parseUShort();
        var useMarkFilteringSet = lookupFlag & 0x10;
        var subTableCount = p.parseUShort();
        var subTableOffsets = p.parseOffset16List(subTableCount);
        var table = {
            lookupType: lookupType,
            lookupFlag: lookupFlag,
            markFilteringSet: useMarkFilteringSet ? p.parseUShort() : -1
        };
        // LookupType 2, Pair adjustment
        if (lookupType === 2) {
            var subtables = [];
            for (var i = 0; i < subTableCount; i++) {
                subtables.push(parsePairPosSubTable(data, start + subTableOffsets[i]));
            }
            // Return a function which finds the kerning values in the subtables.
            table.getKerningValue = function(leftGlyph, rightGlyph) {
                for (var i = subtables.length; i--;) {
                    var value = subtables[i](leftGlyph, rightGlyph);
                    if (value !== undefined) return value;
                }

                return 0;
            };
        }

        return table;
    }

    // Parse the `GPOS` table which contains, among other things, kerning pairs.
    // https://www.microsoft.com/typography/OTSPEC/gpos.htm
    function parseGposTable(data, start, font) {
        var p = new parse.Parser(data, start);
        var tableVersion = p.parseFixed();
        check.argument(tableVersion === 1, 'Unsupported GPOS table version.');

        // ScriptList and FeatureList - ignored for now
        parseTaggedListTable(data, start + p.parseUShort());
        // 'kern' is the feature we are looking for.
        parseTaggedListTable(data, start + p.parseUShort());

        // LookupList
        var lookupListOffset = p.parseUShort();
        p.relativeOffset = lookupListOffset;
        var lookupCount = p.parseUShort();
        var lookupTableOffsets = p.parseOffset16List(lookupCount);
        var lookupListAbsoluteOffset = start + lookupListOffset;
        for (var i = 0; i < lookupCount; i++) {
            var table = parseLookupTable(data, lookupListAbsoluteOffset + lookupTableOffsets[i]);
            if (table.lookupType === 2 && !font.getGposKerningValue) font.getGposKerningValue = table.getKerningValue;
        }
    }

    var parse_1$2 = parseGposTable;

    var gpos = {
    	parse: parse_1$2
    };

    // Parse the `kern` table which contains kerning pairs.
    function parseKernTable(data, start) {
        var pairs = {};
        var p = new parse.Parser(data, start);
        var tableVersion = p.parseUShort();
        check.argument(tableVersion === 0, 'Unsupported kern table version.');
        // Skip nTables.
        p.skip('uShort', 1);
        var subTableVersion = p.parseUShort();
        check.argument(subTableVersion === 0, 'Unsupported kern sub-table version.');
        // Skip subTableLength, subTableCoverage
        p.skip('uShort', 2);
        var nPairs = p.parseUShort();
        // Skip searchRange, entrySelector, rangeShift.
        p.skip('uShort', 3);
        for (var i = 0; i < nPairs; i += 1) {
            var leftIndex = p.parseUShort();
            var rightIndex = p.parseUShort();
            var value = p.parseShort();
            pairs[leftIndex + ',' + rightIndex] = value;
        }

        return pairs;
    }

    var parse_1$1 = parseKernTable;

    var kern = {
    	parse: parse_1$1
    };

    // Parse the `loca` table. This table stores the offsets to the locations of the glyphs in the font,
    // relative to the beginning of the glyphData table.
    // The number of glyphs stored in the `loca` table is specified in the `maxp` table (under numGlyphs)
    // The loca table has two versions: a short version where offsets are stored as uShorts, and a long
    // version where offsets are stored as uLongs. The `head` table specifies which version to use
    // (under indexToLocFormat).
    function parseLocaTable(data, start, numGlyphs, shortVersion) {
        var p = new parse.Parser(data, start);
        var parseFn = shortVersion ? p.parseUShort : p.parseULong;
        // There is an extra entry after the last index element to compute the length of the last glyph.
        // That's why we use numGlyphs + 1.
        var glyphOffsets = [];
        for (var i = 0; i < numGlyphs + 1; i += 1) {
            var glyphOffset = parseFn.call(p);
            if (shortVersion) {
                // The short table version stores the actual offset divided by 2.
                glyphOffset *= 2;
            }

            glyphOffsets.push(glyphOffset);
        }

        return glyphOffsets;
    }

    var parse_1 = parseLocaTable;

    var loca = {
    	parse: parse_1
    };

    // File loaders /////////////////////////////////////////////////////////

    // Convert a Node.js Buffer to an ArrayBuffer
    function toArrayBuffer(buffer) {
        var arrayBuffer = new ArrayBuffer(buffer.length);
        var data = new Uint8Array(arrayBuffer);
        for (var i = 0; i < buffer.length; i += 1) {
            data[i] = buffer[i];
        }

        return arrayBuffer;
    }

    function loadFromFile(path, callback) {
        var fs = require$$0__default['default'];
        fs.readFile(path, function(err, buffer) {
            if (err) {
                return callback(err.message);
            }

            callback(null, toArrayBuffer(buffer));
        });
    }

    function loadFromUrl(url, callback) {
        var request = new XMLHttpRequest();
        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            if (request.status !== 200) {
                return callback('Font could not be loaded: ' + request.statusText);
            }

            return callback(null, request.response);
        };

        request.send();
    }

    // Public API ///////////////////////////////////////////////////////////

    // Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
    // Throws an error if the font could not be parsed.
    function parseBuffer(buffer) {
        var indexToLocFormat;
        var ltagTable;

        var cffOffset;
        var fvarOffset;
        var glyfOffset;
        var gposOffset;
        var hmtxOffset;
        var kernOffset;
        var locaOffset;
        var nameOffset;

        // OpenType fonts use big endian byte ordering.
        // We can't rely on typed array view types, because they operate with the endianness of the host computer.
        // Instead we use DataViews where we can specify endianness.

        var font$1 = new font.Font();
        var data = new DataView(buffer, 0);

        var version = parse.getFixed(data, 0);
        if (version === 1.0) {
            font$1.outlinesFormat = 'truetype';
        } else {
            version = parse.getTag(data, 0);
            if (version === 'OTTO') {
                font$1.outlinesFormat = 'cff';
            } else {
                throw new Error('Unsupported OpenType version ' + version);
            }
        }

        var numTables = parse.getUShort(data, 4);

        // Offset into the table records.
        var p = 12;
        for (var i = 0; i < numTables; i += 1) {
            var tag = parse.getTag(data, p);
            var offset = parse.getULong(data, p + 8);
            switch (tag) {
            case 'cmap':
                font$1.tables.cmap = cmap.parse(data, offset);
                font$1.encoding = new encoding.CmapEncoding(font$1.tables.cmap);
                break;
            case 'fvar':
                fvarOffset = offset;
                break;
            case 'head':
                font$1.tables.head = head.parse(data, offset);
                font$1.unitsPerEm = font$1.tables.head.unitsPerEm;
                indexToLocFormat = font$1.tables.head.indexToLocFormat;
                break;
            case 'hhea':
                font$1.tables.hhea = hhea.parse(data, offset);
                font$1.ascender = font$1.tables.hhea.ascender;
                font$1.descender = font$1.tables.hhea.descender;
                font$1.numberOfHMetrics = font$1.tables.hhea.numberOfHMetrics;
                break;
            case 'hmtx':
                hmtxOffset = offset;
                break;
            case 'ltag':
                ltagTable = ltag.parse(data, offset);
                break;
            case 'maxp':
                font$1.tables.maxp = maxp.parse(data, offset);
                font$1.numGlyphs = font$1.tables.maxp.numGlyphs;
                break;
            case 'name':
                nameOffset = offset;
                break;
            case 'OS/2':
                font$1.tables.os2 = os2.parse(data, offset);
                break;
            case 'post':
                font$1.tables.post = post.parse(data, offset);
                font$1.glyphNames = new encoding.GlyphNames(font$1.tables.post);
                break;
            case 'glyf':
                glyfOffset = offset;
                break;
            case 'loca':
                locaOffset = offset;
                break;
            case 'CFF ':
                cffOffset = offset;
                break;
            case 'kern':
                kernOffset = offset;
                break;
            case 'GPOS':
                gposOffset = offset;
                break;
            }
            p += 16;
        }

        font$1.tables.name = name.parse(data, nameOffset, ltagTable);
        font$1.names = font$1.tables.name;

        if (glyfOffset && locaOffset) {
            var shortVersion = indexToLocFormat === 0;
            var locaTable = loca.parse(data, locaOffset, font$1.numGlyphs, shortVersion);
            font$1.glyphs = glyf.parse(data, glyfOffset, locaTable, font$1);
        } else if (cffOffset) {
            cff.parse(data, cffOffset, font$1);
        } else {
            throw new Error('Font doesn\'t contain TrueType or CFF outlines.');
        }

        hmtx.parse(data, hmtxOffset, font$1.numberOfHMetrics, font$1.numGlyphs, font$1.glyphs);
        encoding.addGlyphNames(font$1);

        if (kernOffset) {
            font$1.kerningPairs = kern.parse(data, kernOffset);
        } else {
            font$1.kerningPairs = {};
        }

        if (gposOffset) {
            gpos.parse(data, gposOffset, font$1);
        }

        if (fvarOffset) {
            font$1.tables.fvar = fvar.parse(data, fvarOffset, font$1.names);
        }

        return font$1;
    }

    // Asynchronously load the font from a URL or a filesystem. When done, call the callback
    // with two arguments `(err, font)`. The `err` will be null on success,
    // the `font` is a Font object.
    //
    // We use the node.js callback convention so that
    // opentype.js can integrate with frameworks like async.js.
    function load(url, callback) {
        var isNode = typeof window === 'undefined';
        var loadFn = isNode ? loadFromFile : loadFromUrl;
        loadFn(url, function(err, arrayBuffer) {
            if (err) {
                return callback(err);
            }

            var font = parseBuffer(arrayBuffer);
            return callback(null, font);
        });
    }

    // Syncronously load the font from a URL or file.
    // When done, return the font object or throw an error.
    function loadSync(url) {
        var fs = require$$0__default['default'];
        var buffer = fs.readFileSync(url);
        return parseBuffer(toArrayBuffer(buffer));
    }
    var load_1 = load;
    var loadSync_1 = loadSync;

    /**
     * @type {object} Map containing all the fonts available for use
     */
    const _fonts = {};

    /**
     * Register Font
     *
     * @param {string} binaryPath Path to the font binary file(.eot, .ttf etc.)
     * @param {string} family     The name to give the font
     * @param {number} weight     The font weight to use
     * @param {string} style      Font style
     * @param {string} variant    Font variant
     *
     * @returns {font} Font instance
     */
    function registerFont(binaryPath, family, weight, style, variant) {
        _fonts[family] = {
            binary: binaryPath,
            family: family,
            weight: weight,
            style: style,
            variant: variant,
            loaded: false,
            font: null,
            load: function(cb) {
                if(this.loaded) {
                    if(cb)cb();
                    return;
                }
                const self = this;
                load_1(binaryPath, function (err, font) {
                    if (err) throw new Error('Could not load font: ' + err);
                    self.loaded = true;
                    self.font = font;
                    if(cb)cb();
                });
            },
            loadSync: function() {
                if(this.loaded) {
                    return;
                }
                try {
                    this.font = loadSync_1(binaryPath);
                    this.loaded = true;
                    return this;
                } catch (err) {
                    throw new Error('Could not load font: ' + err);
                }
            },
            loadPromise: function() {
                return new Promise((res,rej)=>{
                    this.load(()=>res());
                })
            }
        };
        return _fonts[family];
    }
    /**@ignore */
    const debug_list_of_fonts = _fonts;

    /**
     * Find Font
     *
     * Search the `fonts` array for a given font family name
     *
     * @param {string} family The name of the font family to search for
     *
     * @returns {object}
     */
    function findFont(family) {
        if(_fonts[family]) return _fonts[family];
        family =  Object.keys(_fonts)[0];
        return _fonts[family];
    }

    /**
     * Process Text Path
     *
     * @param {Context} ctx  The {@link Context} to paint on
     * @param {string}  text The text to write to the given Context
     * @param {number}  x    X position
     * @param {number}  y    Y position
     * @param {boolean} fill Indicates wether or not the font should be filled
     *
     * @returns {void}
     */
    function processTextPath(ctx,text,x,y, fill, hAlign, vAlign) {
        let font = findFont(ctx._font.family);
        if(!font) {
            console.warn("Font missing",ctx._font);
        }
        const metrics = measureText(ctx,text);
        if(hAlign === 'end'   || hAlign === 'right')  x = x - metrics.width;
        if(hAlign === 'center')  x = x - metrics.width/2;
        if(vAlign === 'top') y = y + metrics.emHeightAscent;
        if(vAlign === 'middle') y = y + metrics.emHeightAscent/2+metrics.emHeightDescent/2;
        if(vAlign === 'bottom') y = y + metrics.emHeightDescent;
        const size = ctx._font.size;
        font.load(function(){
            const path = font.font.getPath(text, x, y, size);
            ctx.beginPath();
            path.commands.forEach(function(cmd) {
                switch(cmd.type) {
                    case 'M': ctx.moveTo(cmd.x,cmd.y); break;
                    case 'Q': ctx.quadraticCurveTo(cmd.x1,cmd.y1,cmd.x,cmd.y); break;
                    case 'L': ctx.lineTo(cmd.x,cmd.y); break;
                    case 'Z':
                    {
                        ctx.closePath();
                        fill ? ctx.fill() : ctx.stroke();
                        ctx.beginPath();
                        break;
                    }
                }
            });
        });
    }

    /**
     * Process Text Path
     *
     * @param {Context} ctx The {@link Context} to paint on
     * @param {string} text The name to give the font
     *
     * @returns {object}
     */
    function measureText(ctx,text) {
        let font = findFont(ctx._font.family);
        if(!font) console.warn("WARNING. Can't find font family ", ctx._font);
        if(!font.font) console.warn("WARNING. Can't find font family ", ctx._font);
        const fsize = ctx._font.size;
        const glyphs = font.font.stringToGlyphs(text);
        let advance = 0;
        glyphs.forEach(function(g) { advance += g.advanceWidth; });

        return {
            width: advance/font.font.unitsPerEm*fsize,
            emHeightAscent: font.font.ascender/font.font.unitsPerEm*fsize,
            emHeightDescent: font.font.descender/font.font.unitsPerEm*fsize,
        }
    }

    //transform code from https://github.com/kcmoot/transform-tracker/blob/master/transform-tracker.js

    /**
     * @ignore
     */
    function Transform(context) {
        this.context = context;
        this.matrix = [1,0,0,1,0,0]; //initialize with the identity matrix
        this.stack = [];

        //==========================================
        // Constructor, getter/setter
        //==========================================

        this.setContext = function(context) {
            this.context = context;
        };

        this.getMatrix = function() {
            return this.matrix;
        };

        this.setMatrix = function(m) {
            this.matrix = [m[0],m[1],m[2],m[3],m[4],m[5]];
            this.setTransform();
        };

        this.cloneMatrix = function(m) {
            return [m[0],m[1],m[2],m[3],m[4],m[5]];
        };

        this.cloneTransform = function() {
            let trans = new Transform();
            trans.setMatrix(this.getMatrix());
            return trans
        };

        //==========================================
        // Stack
        //==========================================

        this.save = function() {
            let matrix = this.cloneMatrix(this.getMatrix());
            this.stack.push(matrix);

            if (this.context) this.context.save();
        };

        this.restore = function() {
            if (this.stack.length > 0) {
                let matrix = this.stack.pop();
                this.setMatrix(matrix);
            }

            if (this.context) this.context.restore();
        };

        //==========================================
        // Matrix
        //==========================================

        this.setTransform = function() {
            if (this.context) {
                this.context.setTransform(
                    this.matrix[0],
                    this.matrix[1],
                    this.matrix[2],
                    this.matrix[3],
                    this.matrix[4],
                    this.matrix[5]
                );
            }
        };

        this.translate = function(x, y) {
            this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
            this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;

            this.setTransform();
        };

        this.rotate = function(rad) {
            const c = Math.cos(rad);
            const s = Math.sin(rad);
            const m11 = this.matrix[0] * c + this.matrix[2] * s;
            const m12 = this.matrix[1] * c + this.matrix[3] * s;
            const m21 = this.matrix[0] * -s + this.matrix[2] * c;
            const m22 = this.matrix[1] * -s + this.matrix[3] * c;
            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;

            this.setTransform();
        };

        this.scale = function(sx, sy) {
            this.matrix[0] *= sx;
            this.matrix[1] *= sx;
            this.matrix[2] *= sy;
            this.matrix[3] *= sy;

            this.setTransform();
        };

        //==========================================
        // Matrix extensions
        //==========================================

        this.rotateDegrees = function(deg) {
            const rad = deg * Math.PI / 180;
            this.rotate(rad);
        };

        this.rotateAbout = function(rad, x, y) {
            this.translate(x, y);
            this.rotate(rad);
            this.translate(-x, -y);
            this.setTransform();
        };

        this.rotateDegreesAbout = function(deg, x, y) {
            this.translate(x, y);
            this.rotateDegrees(deg);
            this.translate(-x, -y);
            this.setTransform();
        };

        this.identity = function() {
            this.m = [1,0,0,1,0,0];
            this.setTransform();
        };

        this.multiply = function(matrix) {
            const m11 = this.matrix[0] * matrix.m[0] + this.matrix[2] * matrix.m[1];
            const m12 = this.matrix[1] * matrix.m[0] + this.matrix[3] * matrix.m[1];

            const m21 = this.matrix[0] * matrix.m[2] + this.matrix[2] * matrix.m[3];
            const m22 = this.matrix[1] * matrix.m[2] + this.matrix[3] * matrix.m[3];

            const dx = this.matrix[0] * matrix.m[4] + this.matrix[2] * matrix.m[5] + this.matrix[4];
            const dy = this.matrix[1] * matrix.m[4] + this.matrix[3] * matrix.m[5] + this.matrix[5];

            this.matrix[0] = m11;
            this.matrix[1] = m12;
            this.matrix[2] = m21;
            this.matrix[3] = m22;
            this.matrix[4] = dx;
            this.matrix[5] = dy;
            this.setTransform();
        };

        this.invert = function() {
            const d = 1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
            const m0 = this.matrix[3] * d;
            const m1 = -this.matrix[1] * d;
            const m2 = -this.matrix[2] * d;
            const m3 = this.matrix[0] * d;
            const m4 = d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]);
            const m5 = d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5]);
            this.matrix[0] = m0;
            this.matrix[1] = m1;
            this.matrix[2] = m2;
            this.matrix[3] = m3;
            this.matrix[4] = m4;
            this.matrix[5] = m5;
            this.setTransform();
        };

         //==========================================
        // Helpers
        //==========================================

        this.transformPoint = function(pt) {
            const x = pt.x;
            const y = pt.y;
            return new Point(
                x * this.matrix[0] + y * this.matrix[2] + this.matrix[4],
                x * this.matrix[1] + y * this.matrix[3] + this.matrix[5],
            )
        };
    }

    //from https://github.com/fxa/uint32.js

    //  Creating and Extracting
    //

    /**
     *  Creates an uint32 from the given bytes in big endian order.
     *  @param {Number} highByte the high byte
     *  @param {Number} secondHighByte the 2nd high byte
     *  @param {Number} thirdHighByte the 3rd high byte
     *  @param {Number} lowByte the low byte
     *  @returns highByte concat secondHighByte concat thirdHighByte concat lowByte
     */
    const fromBytesBigEndian = function (highByte, secondHighByte, thirdHighByte, lowByte) {
        return ((highByte << 24) | (secondHighByte << 16) | (thirdHighByte << 8) | lowByte) >>> 0;
    };

        /**
         *  Returns the byte.
         *  e.g. when byteNo is 0, the high byte is returned, when byteNo = 3 the low byte is returned.
         *  @param {Number} uint32value the source to be extracted
         *  @param {Number} byteNo 0-3 the byte number, 0 is the high byte, 3 the low byte
         *  @returns {Number} the 0-255 byte according byteNo
         */
        const getByteBigEndian = function (uint32value, byteNo) {
            return (uint32value >>> (8 * (3 - byteNo))) & 0xff;
        };

        /**
         *  Returns the bytes as array.
         *  @param {Number} uint32value the source to be extracted
         *  @returns {Array} the array [highByte, 2ndHighByte, 3rdHighByte, lowByte]
         */
        const getBytesBigEndian = function (uint32value) {
            return [
                getByteBigEndian(uint32value, 0),
                getByteBigEndian(uint32value, 1),
                getByteBigEndian(uint32value, 2),
                getByteBigEndian(uint32value, 3)
            ];
        };

        /**
         *  Converts a number to an uint32.
         *  @param {Number} number the number to be converted.
         *  @return {Number} an uint32 value
         */
        const toUint32 = function (number) {
            // the shift operator forces js to perform the internal ToUint32 (see ecmascript spec 9.6)
            return number >>> 0;
        };

        //
        //  Bitwise Logical Operators
        //

        /**
         *  Returns a bitwise OR operation on two or more values.
         *  @param {Number} uint32val0 first uint32 value
         *  @param {Number} argv one or more uint32 values
         *  @return {Number} the bitwise OR uint32 value
         */
        const or = function (uint32val0, argv) {
            let result = uint32val0;
            for (let index = 1; index < arguments.length; index += 1) {
                result = (result | arguments[index]);
            }
            return result >>> 0;
        };

        /**
         *  Returns a bitwise AND operation on two or more values.
         *  @param {Number} uint32val0 first uint32 value
         *  @param {Number} argv one or more uint32 values
         *  @return {Number} the bitwise AND uint32 value
         */
        const and = function (uint32val0, argv) {
            let result = uint32val0;
            for (let index = 1; index < arguments.length; index += 1) {
                result = (result & arguments[index]);
            }
            return result >>> 0;
        };

        //
        // Shifting and Rotating
        //

        /**
         *  Returns the uint32 representation of a << operation.
         *  @param {Number} uint32val the word to be shifted
         *  @param {Number} numBits the number of bits to be shifted (0-31)
         *  @returns {Number} the uint32 value of the shifted word
         */
        const shiftLeft = function (uint32val, numBits) {
            return (uint32val << numBits) >>> 0;
        };

    /**
     * Clamping is the process of limiting a position to an area
     *
     * @see https://en.wikipedia.org/wiki/Clamping_(graphics)
     *
     * @param {number} value The value to apply the clamp restriction to
     * @param {number} min   Lower limit
     * @param {number} max   Upper limit
     *
     * @returns {number}
     */
    function clamp(value,min,max) {
        if(value < min) return min;
        if(value > max) return max;
        return value;
    }


    /**
     * Linear Interpolation
     *
     * In mathematics, linear interpolation is a method of curve fitting using linear polynomials to construct new data
     * points within the range of a discrete set of known data points.
     *
     * @param {number} a
     * @param {number} b
     * @param {number} t
     *
     * @ignore
     *
     * @see https://en.wikipedia.org/wiki/Linear_interpolation
     *
     * @returns {number}
     */
    const lerp = function(a,b,t) {  return a + (b-a)*t; };


    const colorStringToUint32 = function(str) {
        if(!str) return 0x000000;
        //hex values always get 255 for the alpha channel
        if(str.indexOf('#')===0) {
            let int = uint32.toUint32(parseInt(str.substring(1),16));
            int = uint32.shiftLeft(int,8);
            int = uint32.or(int,0xff);
            return int;
        }
        if(str.indexOf('rgba')===0) {
            const parts = str.trim().substring(4).replace('(','').replace(')','').split(',');
            return uint32.fromBytesBigEndian(
                parseInt(parts[0]),
                parseInt(parts[1]),
                parseInt(parts[2]),
                Math.floor(parseFloat(parts[3])*255));
        }
        if(str.indexOf('rgb')===0) {
            const parts = str.trim().substring(3).replace('(','').replace(')','').split(',');
            return uint32.fromBytesBigEndian(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]), 255);
        }
        if(NAMED_COLORS[str]) {
            return NAMED_COLORS[str];
        }
        throw new Error("unknown style format: " + str );
    };

    class CanvasGradient {
        constructor() {
            this.stops = [];
        }
        addColorStop(t,colorstring) {
            const color = colorStringToUint32(colorstring);
            this.stops.push({t:t,color:color});
        }
        _lerpStops(t) {
            const first = getBytesBigEndian(this.stops[0].color).map(b=>b/255);
            const second = getBytesBigEndian(this.stops[1].color).map(b=>b/255);
            const fc = first.map((f,i) => lerp(f,second[i],t)).map(c=>c*255);
            return fromBytesBigEndian(fc[0],fc[1],fc[2],0xFF)
        }
    }

    class LinearGradient extends CanvasGradient {
        constructor(x0,y0,x1,y1) {
            super();
            this.start = new Point(x0,y0);
            this.end = new Point(x1,y1);
        }

        colorAt(x,y) {
            const pc = new Point(x,y); //convert to a point
            //calculate V
            let V = this.end.subtract(this.start); // subtract
            const d = V.magnitude(); // get magnitude
            V = V.divide(d); // normalize

            //calculate V0
            const V0 = pc.subtract(this.start);
            //project V0 onto V
            let t = V0.dotProduct(V);
            //convert to t value and clamp
            t = clamp(t/d,0,1);
            return this._lerpStops(t)
        }
    }


    class RadialGradient extends CanvasGradient {
        constructor(x0, y0, x1, y1) {
            super();
            this.start = new Point(x0,y0);
        }

        colorAt(x,y) {
            const pc = new Point(x, y); //convert to a point
            const dist =  pc.distance(this.start);
            let t = clamp(dist/10,0,1);
            return this._lerpStops(t)
        }
    }

    /**
     * Enum for path commands (used for encoding and decoding lines, curves etc. to and from a path)
     * @enum {string}
     */
    const PATH_COMMAND = {
        MOVE: 'm',
        LINE: 'l',
        QUADRATIC_CURVE: 'q',
        BEZIER_CURVE: 'b'
    };

    /**
     * Used for drawing rectangles, text, images and other objects onto the canvas element. It provides the 2D rendering context for a drawing surface.
     *
     * It has the same API as [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) from the HTML5 canvas spec
     *
     * @class Context
     */
    class Context {
        /**
         * Creates a new pure image Context
         *
         * @param {Bitmap} bitmap An instance of the {@link Bitmap} class
         * @memberof Context
         */
        constructor(bitmap) {
            /**
             * An instance of the {@link Bitmap} class. Used for direct pixel manipulation(for example setting pixel colours)
             * @type {Bitmap}
             */
            this.bitmap = bitmap;

            /**
             *  A 32-bit unsigned integer (uint32) number representing the fill color of the 2D drawing context
             *
             * @type {number}
             */
            this._fillColor = NAMED_COLORS.black;

            /**
             * @type {number}
             */
            this._strokeColor = NAMED_COLORS.black;

            /**
             * @type {number}
             */
            this._lineWidth = 1;

            /**
             * @type {number}
             */
            this._globalAlpha = 1;

            /**
             * @type {Transform}
             */
            this.transform = new Transform();

            /**
             * @type {object} Plain js object wrapping the font name and size
             */
            this._font = {
                family:'invalid',
                size:12
            };

            /** @type {string} horizontal text alignment, one of start, end, left, center, right. start is the default */
            this.textAlign = 'start';

            /** @type {string} vertical text alignment, relative to the baseline. one of top, middle, alphabetic(default) and bottom. */
            this.textBaseline = 'alphabetic';


            /**
             * @type {boolean} Enable or disable image smoothing(anti-aliasing)
             */
            this.imageSmoothingEnabled = true;

            /**
             * @type {?any}
             */
            this._clip = null;

            /**
             * @type {string}
             */
            this._fillStyle_text = '';

            /**
             * @type {string}
             */
            this._strokeStyle_text = '';

            /**
             * @type {string}
             * @private
             */
            this._globalCompositeOperation = 'source-over';
        }

        /**
         * Global composite operation. Can be one of the following: source-over or copy
         * @return {string}
         */
        get globalCompositeOperation () {
            return this._globalCompositeOperation;
        }

        /**
         * Set global composite operation. Can be one of the following: source-over or copy
         * @param value
         */
        set globalCompositeOperation (value) {
            this._globalCompositeOperation = value;
        }
        /**
         * The color or style to use inside shapes. The default is #000 (black).
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         * @type {string}
         */
        get fillStyle () {
            return this._fillStyle_text;
        };

        /**
         * @param {string} val
         * @example ctx.fillStyle = 'rgba(0, 25, 234, 0.6)';
         */
        set fillStyle (val) {
            if(val instanceof CanvasGradient) {
                this._fillColor = val;
            } else {
                this._fillColor = Context.colorStringToUint32(val);
                this._fillStyle_text = val;
            }
        };

        /**
         * The color or style to use for the lines around shapes. The default is #000 (black).
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
         * @type {string}
         */
        get strokeStyle () {
            return this._strokeStyle_text
        };

        /**
         * @param {number} val
         * @example ctx.strokeStyle = 'rgba(0, 25, 234, 0.6)';
         */
        set strokeStyle (val) {
            this._strokeColor = Context.colorStringToUint32(val);
            this._strokeStyle_text = val;
        };

        /**
         * The thickness of lines in space units. When getting, it returns the current value (1.0 by default). When setting, zero, negative, `Infinity` and `NaN` values are ignored; otherwise the current value is set to the new value.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         * @type {number}
         */
        get lineWidth() {
            return this._lineWidth;
        };

        /**
         * @param {string} val
         * @example ctx.lineWidth = 15;
         */
        set lineWidth(val) {
            this._lineWidth = val;
        };

        /**
         * The alpha value that is applied to shapes and images before they are drawn onto the canvas. The value is in the range from 0.0 (fully transparent) to 1.0 (fully opaque).
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         * @type {Boolean}
         */
        get globalAlpha() {
            return this._globalAlpha;
        };

        /**
         * @param {boolean} val
         * @example ctx.globalAlpha = 1;
         */
        set globalAlpha(val) {
            this._globalAlpha = clamp(val,0,1);
        }

        /**
         * The current text style being used when drawing text. This string uses the same syntax as the CSS font specifier
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
         * @type {object}
         * @property {number} size   The an integer representing the font size to use
         * @property {string} family The font family to set
         */
        get font() {};

        /**
         * @param {object} font
         * @example ctx.globalAlpha = 1;
         */
        set font(val) {
            const n = val.trim().indexOf(' ');
            const font_size = parseInt(val.slice(0, n));
            const font_name = val.slice(n).trim();

            this._font.family = font_name;
            this._font.size   = font_size;
        }


        createLinearGradient(x0,y0, x1,y1) {
            return new LinearGradient(x0,y0,x1,y1)
        }
        createRadialGradient(x0,y0) {
            return new RadialGradient(x0,y0)
        }


        /**
         * Saves the entire state of the canvas by pushing the current state onto a stack
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
         *
         * @returns {void}
         *
         * @memberof Context
         */
        save() {
            this.transform.save();
        }

        /**
         * Adds a translation transformation by moving the canvas and its origin `x` horizontally and `y` vertically on the grid
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
         *
         * @param {number} x X position
         * @param {number} y Y position
         *
         * @returns {void}
         *
         * @memberof Context
         */
        translate(x,y) {
            this.transform.translate(x,y);
        }

        /**
         * Add a rotation to the transformation matrix. The angle argument represents a clockwise rotation angle and is expressed in adians
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
         *
         * @param {number} angle Degrees of rotation (in radians)
         *
         * @returns {void}
         *
         * @memberof Context
         */
        rotate(angle) {
            this.transform.rotate(angle);
        }

        /**
         * Adds a scaling transformation to the canvas units by `x` horizontally and by `y` vertically
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
         *
         * @param {number} sx Scale X amount
         * @param {number} sy Scale Y amount
         *
         * @returns {void}
         *
         * @memberof Context
         */
        scale(sx,sy) {
            this.transform.scale(sx,sy);
        }

        /**
         * Restores the most recently saved canvas state by popping the top entry in the drawing state stack. If there is no saved state, this method does nothing.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         *
         * @returns {void}
         *
         * @memberof Context
         */
        restore() {
            this.transform.restore();
        }


        /**
         * Draws a filled rectangle whose starting point is at the coordinates `(x, y)` with the specified width and height and whose style is determined by the fillStyle attribute.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
         *
         * @param {number} x X position
         * @param {number} y Y position
         * @param {number} w Width
         * @param {number} h Height
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fillRect(x,y,w,h) {
            for(let i=x; i<x+w; i++) {
                for(let j=y; j<y+h; j++) {
                    this.fillPixel(i,j);
                }
            }
        }

        /**
         * Sets all pixels in the rectangle defined by starting point `(x, y)` and size `(width, height)` to transparent black, erasing any previously drawn content.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
         *
         * @param {number} x X position
         * @param {number} y Y position
         * @param {number} w Width
         * @param {number} h Height
         *
         * @returns {void}
         *
         * @memberof Context
         */
        clearRect(x,y,w,h) {
            for(let i=x; i<x+w; i++) {
                for(let j=y; j<y+h; j++) {
                    this.bitmap.setPixelRGBA(i,j,0x00000000);
                }
            }
        }

        /**
         * Paints a rectangle which has a starting point at `(x, y)` and has a `w` width and an `h` height onto the canvas, using the current stroke style.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
         *
         * @param {number} x X position
         * @param {number} y Y position
         * @param {number} w Width
         * @param {number} h Height
         *
         * @returns {void}
         *
         * @memberof Context
         */
        strokeRect(x,y,w,h) {
            for(let i=x; i<x+w; i++) {
                this.bitmap.setPixelRGBA(i, y, this._strokeColor);
                this.bitmap.setPixelRGBA(i, y+h, this._strokeColor);
            }
            for(let j=y; j<y+h; j++) {
                this.bitmap.setPixelRGBA(x, j, this._strokeColor);
                this.bitmap.setPixelRGBA(x+w, j, this._strokeColor);
            }
        }

        /**
         * Set the background colour of a single pixel denoted by the `x` and `y` co-ordinates
         *
         * @param {number} x The x axis of the pixel
         * @param {number} y The y axis of the pixel
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fillPixel(x,y) {
            if(!this.pixelInsideClip(x,y)) {
                return
            }

            const new_pixel = this.calculateRGBA(x, y);
            let final_pixel = new_pixel;
            if(this._globalCompositeOperation === 'source-over') {
                const old_pixel = this.bitmap.getPixelRGBA(x, y);
                final_pixel = this.composite(x, y, old_pixel, new_pixel);
            }
            this.bitmap.setPixelRGBA(x,y,final_pixel);
        }

        /**
         * Paints a pixel which has an x axis position of `x` and a y axis position of `y`
         *
         * @param {number} x The x axis of the pixel to stroke
         * @param {number} y The y axis of the pixel to stroke
         *
         * @returns {void}
         *
         * @memberof Context
         */
        strokePixel(x,y) {
            if(!this.pixelInsideClip(x,y)) {
                return
            }

            const new_pixel = this.calculateRGBA_stroke(x, y);
            let final_pixel = new_pixel;
            if(this._globalCompositeOperation === 'source-over') {
                const old_pixel = this.bitmap.getPixelRGBA(x, y);
                final_pixel = this.composite(x, y, old_pixel, new_pixel);
            }

            this.bitmap.setPixelRGBA(x,y,final_pixel);
        }

        /**
         * Fill Pixel With Color
         *
         * @param {number} x   The x axis of the pixel to fill
         * @param {number} y   The y axis of the pixel to fill
         * @param {number} col
         *
         * @ignore
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fillPixelWithColor(x,y,col) {
            if(!this.pixelInsideClip(x,y)) {
                return
            }

            let final_pixel = col;
            if(this._globalCompositeOperation === 'source-over') {
                const new_pixel = col;
                const old_pixel = this.bitmap.getPixelRGBA(x, y);
                final_pixel = this.composite(x, y, old_pixel, new_pixel);
            }
            this.bitmap.setPixelRGBA(x, y, final_pixel);
        }

        /**
         * Composite
         *
         * @param {number} i Unused
         * @param {number} j Unused
         * @param {number} old_pixel
         * @param {number} new_pixel
         *
         * @ignore
         *
         * @returns {void}
         *
         * @memberof Context
         */
        composite(i,j,old_pixel, new_pixel) {
            const old_rgba = getBytesBigEndian(old_pixel);
            const new_rgba = getBytesBigEndian(new_pixel);

            // convert to range of 0->1
            const A = new_rgba.map((b) => b / 255);
            const B = old_rgba.map((b) => b / 255);

            // multiply by global alpha
            A[3] = A[3] * this._globalAlpha;

            // do a standard composite (SRC_OVER) on RGB values
            function compit(ca, cb, aa, ab) {
                return (ca*aa + cb*ab * (1-aa)) / (aa+ab*(1-aa));
            }
            const C = A.slice(0, 3).map((comp, i) => compit(A[i], B[i], A[3], B[3]));

            // convert back to 0->255 range
            const Cf = C.map((c) => c * 255);

            // convert back to int
            return fromBytesBigEndian(
                Cf[0], Cf[1], Cf[2], // R, G, B,
                Math.max(old_rgba[3], new_rgba[3]) // alpha
            );
        }

        /**
         * Calculate RGBA
         *
         * @param {number} x X position
         * @param {number} y Y position
         *
         * @ignore
         *
         * @returns {number}
         *
         * @memberof Context
         */
        calculateRGBA(x,y) {
            if(this._fillColor instanceof CanvasGradient) {
                return this._fillColor.colorAt(x,y)
            }
            return this._fillColor;
        }

        /**
         * Calculate RGBA Stroke
         *
         * @param {number} x X position
         * @param {number} y Y position
         *
         * @ignore
         *
         * @returns {number}
         *
         * @memberof Context
         */
        calculateRGBA_stroke(x,y) {
            return this._strokeColor;
        }


        /**
         * Get Image Data
         *
         * @param {number} x X position
         * @param {number} y Y position
         * @param {number} w Width
         * @param {number} h Height
         *
         * @ignore
         *
         * @returns {Bitmap}
         *
         * @memberof Context
         */
        getImageData(x,y,w,h) {
            return this.bitmap._copySubBitmap(x,y,w,h)
        }

        /**
         * *Put Image Data
         *
         * @param {number} id Image ID
         * @param {number} x  X position
         * @param {number} y  Y position
         *
         * @ignore
         *
         * @returns {void}
         *
         * @memberof Context
         */
        putImageData(id, x, y) {
            this.bitmap._pasteSubBitmap(id,x,y);
        }

        /**
         * Provides different ways to draw an image onto the canvas.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
         *
         * @param {Bitmap} bitmap An instance of the {@link Bitmap} class to use for drawing
         * @param {number} sx     The X coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
         * @param {number} sy     The Y coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
         * @param {number} sw     The width of the sub-rectangle of the source {@link Bitmap} to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by `sx` and `sy` to the bottom-right corner of the image is used.
         * @param {number} sh     The height of the sub-rectangle of the source {@link Bitmap} to draw into the destination context.
         * @param {number} dx     The X coordinate in the destination canvas at which to place the top-left corner of the source {@link Bitmap}
         * @param {number} dy     The Y coordinate in the destination canvas at which to place the top-left corner of the source {@link Bitmap}
         * @param {number} dw     The width to draw the {@link Bitmap} in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn
         * @param {number} dh     The height to draw the {@link Bitmap} in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn
         *
         * @returns {void}
         *
         * @memberof Context
         */
        drawImage(bitmap, sx,sy,sw,sh, dx, dy, dw, dh) {
            // two argument form
            if(typeof sw === 'undefined') return this.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, sx, sy, bitmap.width, bitmap.height)
            // four argument form
            if(typeof dx === 'undefined') return this.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, sx, sy, sw, sh)

            let src_bounds = new Bounds(sx,sy,sx+sw,sy+sh);
            let pts = [
                new Point(dx,dy),
                new Point(dx+dw,dy),
                new Point(dx+dw,dy+dh),
                new Point(dx,dy+dh),
                ];
            pts = pts.map(pt => this.transform.transformPoint(pt));
            let dst_bounds = calc_min_bounds(pts);

            let bitmap_bounds = new Bounds(0,0, this.bitmap.width, this.bitmap.height);
            dst_bounds = dst_bounds.intersect(bitmap_bounds);

            let inv = this.transform.cloneTransform();
            inv.invert();

            //map dx to dx+dw  from sx to sx+sw
            function remap(n, a1, a2, b1, b2) {
                let t = (n-a1)/(a2-a1);
                return t*(b2-b1) + b1
            }

            for(let i=dst_bounds.x1; i<dst_bounds.x2; i++) {
                for(let j=dst_bounds.y1; j<dst_bounds.y2; j++) {
                    let dst_pt = new Point(i,j);
                    let src_pt = inv.transformPoint(dst_pt).round();
                    src_pt = new Point(
                        remap(src_pt.x, dx,dx+dw, sx,sx+sw),
                        remap(src_pt.y, dy,dy+dh, sy,sy+sh)
                    );
                    if(src_bounds.contains(src_pt)) {
                        const rgba = bitmap.getPixelRGBA(src_pt.x, src_pt.y);
                        if(this.pixelInsideClip(dst_pt.x,dst_pt.y)) {
                            this.bitmap.setPixelRGBA(dst_pt.x, dst_pt.y, rgba);
                        }
                    }
                }
            }
        }


        /**
         * Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
         *
         * @returns {void}
         *
         * @memberof Context
         */
        beginPath() {
            /**
             * @type {Array}
             */
            this.path = [];
            this._closed = false;
        }

        /**
         * Moves the starting point of a new sub-path to the (x, y) coordinates.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo
         *
         * @param {number} x The x axis of the point.
         * @param {number} y The y axis of the point.
         *
         * @returns {void}
         *
         * @memberof Context
        * */
        moveTo(x,y) {
            return this._moveTo(new Point(x, y));
        }

        /**
         * Moves the starting point of a new sub-path to the (x, y) coordinates.
         *
         * @param {Point} pt A `point` object representing a set of co-ordinates to move the "pen" to.
         *
         * @example
         * //All of the following are valid:
         * this._moveTo({x: 20, y: 40})
         * this._moveTo(new Point(20, 40))
         *
         * @returns {void}
         *
         * @memberof Context
        * */
        _moveTo(pt) {
            pt = this.transform.transformPoint(pt);
            /**
             * Set the starting co-ordinates for the path starting point
             * @type {Point}
             */
            this.pathstart = pt;
            this.path.push([PATH_COMMAND.MOVE, pt]);
        }

        /**
         * Connects the last point in the sub-path to the x, y coordinates with a straight line (but does not actually draw it).
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
         *
         * @param {number} x The x axis of the coordinate for the end of the line.
         * @param {number} y The y axis of the coordinate for the end of the line.
         *
         * @returns {void}
         *
         * @memberof Context
         */
        lineTo(x,y) {
            return this._lineTo(new Point(x, y));
        }

        /**
         * Connects the last point in the sub-path to the x, y coordinates with a straight line (but does not actually draw it).
         *
         * @param {Point} pt A point object to draw a line to from the current set of co-ordinates
         *
         * @returns {void}
         *
         * @memberof Context
         */
        _lineTo(pt) {
            this.path.push([PATH_COMMAND.LINE, this.transform.transformPoint(pt)]);
        }

        /**
         * Adds a quadratic Bézier curve to the path. It requires two points. The first point is a control point and the second one is the end point. The starting point is the last point in the current path, which can be changed using moveTo() before creating the quadratic Bézier curve.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
         *
         * @param {number} cp1x The x axis of the coordinate for the control point.
         * @param {number} cp1y The y axis of the coordinate for the control point.
         * @param {number} x    The x axis of the coordinate for the end point.
         * @param {number} y    The y axis of the coordinate for the end point.
         *
         * @returns {void}
         *
         * @memberof Context
         */
        quadraticCurveTo(cp1x, cp1y, x,y) {
            let cp1 = this.transform.transformPoint(new Point(cp1x, cp1y));
            let pt  = this.transform.transformPoint(new Point(x, y));
            this.path.push([PATH_COMMAND.QUADRATIC_CURVE, cp1, pt]);
        }

        /**
         * Adds a cubic Bézier curve to the path. It requires three points. The first two points are control points and the third one is the end point. The starting point is the last point in the current path, which can be changed using moveTo() before creating the Bézier curve.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
         *
         * @param {number} cp1x The x axis of the coordinate for the first control point.
         * @param {number} cp1y The y axis of the coordinate for first control point.
         * @param {number} cp2x The x axis of the coordinate for the second control point.
         * @param {number} cp2y The y axis of the coordinate for the second control point.
         * @param {number} x    The x axis of the coordinate for the end point.
         * @param {number} y    The y axis of the coordinate for the end point.
         *
         * @returns {void}
         *
         * @memberof Context
         */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            this._bezierCurveTo(new Point(cp1x, cp1y), new Point(cp2x, cp2y), new Point(x, y));
        }

        /**
         * Bezier Curve To
         *
         * @param {number} cp1 Curve point 1
         * @param {number} cp2 Curve point 2
         * @param {Point}  pt
         *
         * @returns {void}
         *
         * @memberof Context
        * */
        _bezierCurveTo(cp1, cp2, pt) {
            cp1 = this.transform.transformPoint(cp1);
            cp2 = this.transform.transformPoint(cp2);
            pt  = this.transform.transformPoint(pt);
            this.path.push([PATH_COMMAND.BEZIER_CURVE, cp1, cp2, pt]);
        }

        /**
         * Adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
         *
         * @param {number}  x         The x coordinate of the arc's center
         * @param {number}  y         The y coordinate of the arc's center
         * @param {number}  rad       The arc's radius
         * @param {number}  start     The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians
         * @param {number}  end       The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians
         * @param {boolean} anticlockwise A boolean which, if true, causes the arc to be drawn anticlockwise between the two angles.
         *
         * @returns {void}
         *
         * @memberof Context
         */
        arc(x,y, rad, start, end, anticlockwise) {
            function calcPoint(angle) {
                let px = x + Math.cos(angle)*rad;
                let py = y + Math.sin(angle)*rad;
                return new Point(px, py);
            }

            if(start > end) end += Math.PI*2;

            let step = Math.PI / 16;
            if (anticlockwise) {
                let temp = end;
                end = start + Math.PI * 2;
                start = temp;
            }
            this._moveTo(calcPoint(start));
            for (let a = start; a <= end; a += step) {
                this._lineTo(calcPoint(a));
            }
            this._lineTo(calcPoint(end));
        }

        /**
         * Arc To
         *
         * @ignore
         *
         * @throws {Error} Method is not yet implemented
         *
         * @memberof Context
         */
        arcTo() {
            throw new Error("arcTo not yet supported");
        }

        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect
         * Draws a rectangle with the upper left corner at the specified (x, y)
         *
         * @returns {void}
         *
         * @memberof Context
         *
         *
         * @param {number}  x         The x coordinate of the rectangle
         * @param {number}  y         The y coordinate of the rectangle
         * @param {number}  width     The width of the rectangle
         * @param {number}  height    The height of the rectangle
         *
         *
         * @memberof Context
         */
        rect(x,y,width,height) {
            this.moveTo(x,y);
            this.lineTo(x+width,y);
            this.lineTo(x+width,y+height);
            this.lineTo(x,y+height);
            this.lineTo(x,y);
        }

        /**
         * Ellipse
         *
         * @ignore
         *
         * @throws {Error} Method is not yet implemented
         *
         * @memberof Context
         */
        ellipse() {
            throw new Error("ellipse not yet supported");
        }

        /**
         * Turns the path currently being built into the current clipping path.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         *
         * @returns {void}
         *
         * @memberof Context
         */
        clip() {
            this._clip = pathToLines(this.path);
        }

        /**
         * Measure Text
         *
         * @ignore
         *
         * @throws {Error} Method is not yet implemented
         *
         * @memberof Context
         */
        measureText(string) {
            return measureText(this,string)
        }

        /**
         * Causes the point of the pen to move back to the start of the current sub-path. It tries to add a straight line (but does not actually draw it) from the current point to the start. If the shape has already been closed or has only one point, this function does nothing.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath
         *
         * @returns {void}
         *
         * @memberof Context
         */
        closePath() {
            if(!this._closed) {
                this.path.push([PATH_COMMAND.LINE, this.pathstart]);
                this._closed = true;
            }
        }


        /**
         * Strokes the current or given path with the current stroke style
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
         *
         * @returns {void}
         *
         * @memberof Context
         */
        stroke() {
            let flat_path = flatten_path(this.path);
            let stroke_path = path_to_stroked_path(flat_path,this.lineWidth/2);
            const lines = pathToLines(stroke_path);
            const old_fillStyle = this.fillStyle;
            this.fillStyle = this.strokeStyle;
            this.imageSmoothingEnabled ? this.fill_aa(lines) : this.fill_noaa(lines);
            this.fillStyle = old_fillStyle;

            if(this.debug) {
                this.save();
                let old_ss = this.strokeStyle;
                let old_lw = this.lineWidth;
                this.strokeStyle = 'red';
                this.lineWidth = 1;
                console.log("path is",this.path);
                pathToLines(this.path).forEach((line) => this.drawLine(line));
                console.log("flat path is",flat_path);
                pathToLines(flat_path).forEach((line) => this.drawLine(line));
                console.log("stroke path is",stroke_path);
                pathToLines(stroke_path).forEach(line => this.drawLine(line));
                console.log("final lines are",lines);
                this.strokeStyle = old_ss;
                this.lineWidth = old_lw;
                this.restore();
            }
        }

        /**
         * Draw a line using the correct anti-aliased, or non-anti-aliased line drawing function based on the value of {@link imageSmoothingEnabled}
         *
         * @param {Line} line A set of co-ordinates representing the start and end of the line. You can also pass a plain js object if you wish
         * @example
         * //All of the following are valid:
         * ctx.drawLine({start: {x: 20, y:42}, end: {x: 20, y:90}})
         * ctx.drawLine(new Line(new Point(20, 42), new Point(20, 90)))
         * ctx.drawLine(new Line(20, 42, 20, 90))
         *
         * @returns {void}
         *
         * @memberof Context
         */
        drawLine(line) {
            if(line.is_invalid()) return console.error('cannot draw line',line)
            this.imageSmoothingEnabled?this.drawLine_aa(line):this.drawLine_noaa(line);
        }

        /**
         *
         * Draw a line without anti-aliasing using Bresenham's algorithm
         *
         * @param {Line} line A set of co-ordinates representing the start and end of the line. You can also pass a plain js object if you wish
         * @example
         * //All of the following are valid:
         * ctx.drawLine({start: {x: 20, y:42}, end: {x: 20, y:90}})
         * ctx.drawLine(new Line(new Point(20, 42), new Point(20, 90)))
         * ctx.drawLine(new Line(20, 42, 20, 90))
         *
         * @returns {void}
         *
         * @memberof Context
         */
        drawLine_noaa(line) {
            //Bresenham's from Rosetta Code
            // http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm#JavaScript
            let x0 = Math.floor(line.start.x);
            let y0 = Math.floor(line.start.y);
            const x1 = Math.floor(line.end.x);
            const y1 = Math.floor(line.end.y);
            const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
            const dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
            let err = (dx > dy ? dx : -dy) / 2;

            while (true) {
                this.strokePixel(x0,y0);
                if (x0 === x1 && y0 === y1) break;
                const e2 = err;
                if (e2 > -dx) { err -= dy; x0 += sx; }
                if (e2 < dy) { err += dx; y0 += sy; }
            }
        }

        /**
         * Draw Line Anti-aliased
         *
         * Draw anti-aliased line using Bresenham's algorithm
         *
         * @see http://members.chello.at/~easyfilter/bresenham.html
         *
         * @param {Line} line A set of co-ordinates representing the start and end of the line. You can also pass a plain js object if you wish
         * @example
         * //All of the following are valid:
         * ctx.drawLine({start: {x: 20, y:42}, end: {x: 20, y:90}})
         * ctx.drawLine(new Line(new Point(20, 42), new Point(20, 90)))
         * ctx.drawLine(new Line(20, 42, 20, 90))
         *
         * @memberof Context
         */
        drawLine_aa(line) {
            let width = this._lineWidth;
            let x0 = Math.floor(line.start.x);
            let y0 = Math.floor(line.start.y);
            let x1 = Math.floor(line.end.x);
            let y1 = Math.floor(line.end.y);
            let dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
            let dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;

            let err = dx - dy, e2, x2, y2;
            let ed = dx + dy === 0 ? 1 : Math.sqrt(dx * dx + dy * dy);
            let rgb = and(this._strokeColor, 0xFFFFFF00);
            let a1 = and(this._strokeColor,0x000000FF);
            for (width = (width+1)/2; ; ) {
                const alpha = ~~Math.max(0, 255 * (Math.abs(err - dx + dy) / ed - width + 1));
                const a2 = 255-alpha;
                const color = or(rgb,(a1*a2)/255);
                this.fillPixelWithColor(x0,y0,color);
                e2 = err; x2 = x0;
                if (2*e2 >= -dx) {
                    for (e2 += dy, y2 = y0; e2 < ed*width && (y1 !== y2 || dx > dy); e2 += dx) {
                        const alpha = ~~Math.max(0, 255 * (Math.abs(e2) / ed - width + 1));
                        const a2 = 255-alpha;
                        const color = or(rgb,(a1*a2)/255);
                        this.fillPixelWithColor(x0, y2 += sy, color);
                    }
                    if (x0 === x1) break;
                    e2 = err; err -= dy; x0 += sx;
                }
                if (2*e2 <= dy) {
                    for (e2 = dx-e2; e2 < ed*width && (x1 !== x2 || dx < dy); e2 += dy) {
                        const alpha = ~~Math.max(0, 255 * (Math.abs(e2) / ed - width + 1));
                        const a2 = 255-alpha;
                        const color = or(rgb,(a1*a2)/255);
                        this.fillPixelWithColor(x2 += sx, y0, color);
                    }
                    if (y0 === y1) break;
                    err += dx; y0 += sy;
                }
            }
        }

        /**
         * Fills the current or given path with the current fill style. Uses {@link fill_aa} and {@link fill_noaa} depending on the the value of {@link imageSmoothingEnabled}
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fill() {
            if(!this._closed) this.closePath();
            const lines = pathToLines(this.path);
            this.imageSmoothingEnabled ? this.fill_aa(lines) : this.fill_noaa(lines);
        }

        /**
         * Fill Anti-aliased
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fill_aa(lines) {
            //get just the color part
            const rgb = and(this._fillColor, 0xFFFFFF00);
            const alpha = and(this._fillColor, 0xFF);
            const bounds = calcMinimumBounds(lines);

            const startY = Math.min(bounds.y2 - 1, this.bitmap.height);
            const endY = Math.max(bounds.y, 0);

            for(let j=startY; j>=endY; j--) {
                const ints = calcSortedIntersections(lines, j);
                //fill between each pair of intersections
                // if(ints.length %2 !==0) console.log("warning. uneven number of intersections");
                for(let i=0; i<ints.length; i+=2) {
                    const fstartf = fract(ints[i]);
                    const fendf = fract(ints[i + 1]);
                    const start = Math.floor(ints[i]);
                    const end = Math.floor(ints[i + 1]);
                    for(let ii=start; ii<=end; ii++) {
                        if(ii === start) {
                            //first
                            const int = or(rgb,(1-fstartf)*alpha);
                            this.fillPixelWithColor(ii,j, int);
                            continue;
                        }
                        if(ii === end) {
                            //last
                            const int = or(rgb,fendf*alpha);
                            this.fillPixelWithColor(ii,j, int);
                            continue;
                        }
                        //console.log("filling",ii,j);
                        this.fillPixelWithColor(ii,j, this._fillColor);
                    }
                }
            }
        }

        /**
         * Fill No Anti-aliased
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fill_noaa(lines) {
            //get just the color part
            and(this._fillColor, 0xFFFFFF00);
            const bounds = calcMinimumBounds(lines);
            for(let j=bounds.y2-1; j>=bounds.y; j--) {
                const ints = calcSortedIntersections(lines, j);
                //fill between each pair of intersections
                for(let i=0; i<ints.length; i+=2) {
                    const start = Math.floor(ints[i]);
                    const end = Math.floor(ints[i + 1]);
                    for(let ii=start; ii<=end; ii++) {
                        if(ii === start) {
                            //first
                            this.fillPixel(ii,j);
                            continue;
                        }
                        if(ii === end) {
                            //last
                            this.fillPixel(ii,j);
                            continue;
                        }
                        this.fillPixel(ii,j);
                    }
                }
            }
        }

        /**
         * Pixel Inside Clip
         *
         * Even/odd rule. https://en.wikipedia.org/wiki/Point_in_polygon
         * technically this is not correct as the default algorithm for
         * html canvas is supposed to be the non-zero winding rule instead
         *
         * @see https://en.wikipedia.org/wiki/Point_in_polygon
         *
         * @param {number} x
         * @param {number} y
         *
         * @returns {void}
         *
         * @memberof Context
         */
        pixelInsideClip(x,y) {
            if(!this._clip) return true;
            //turn into a list of lines
            // calculate intersections with a horizontal line at j
            const ints = calcSortedIntersections(this._clip, y);
            // find the intersections to the left of i (where x < i)
            const left = ints.filter((inter) => inter < x);
            if(left.length%2 === 0) {
                return false;
            } else {
                return true;
            }
        }

        /**
         *  Draws a text string at the specified coordinates, filling the string's characters with the current foreground color
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
         *
         * @param {string} text A string specifying the text string to render into the context. The text is rendered using the settings specified by {@link font}.
         * @param {number} x    The x -coordinate of the point at which to begin drawing the text, in pixels.
         * @param {number} y    The y-coordinate of the point at which to begin drawing the text, in pixels.
         *
         * @returns {void}
         *
         * @memberof Context
         */
        fillText(text, x ,y) { processTextPath(this, text, x,y, true, this.textAlign, this.textBaseline);  }

        /**
         * Draws the outlines of the characters of a specified text string at the given (x, y) position.
         *
         * @param {string} text The text to draw using the current {@link font} values.
         * @param {number} x    The x axis of the coordinate for the text starting point.
         * @param {number} y    The y axis of the coordinate for the text starting point.
         *
         * @returns {void}
         *
         * @memberof Context
         */
        strokeText(text, x ,y) { processTextPath(this, text, x,y, false, this.textAlign, this.textBaseline);  }


        /**
         * Color String To Unint32
         *
         * Convert a color string to Uint32 notation
         *
         * @static
         * @param {string} str The color string to convert
         *
         * @returns {number}
         *
         * @example
         * var uInt32 = colorStringToUint32('#FF00FF');
         * console.log(uInt32); // Prints 4278255615
         *
         * @memberof Context
         */
        static colorStringToUint32(str) {
            if(!str) return 0x000000;
            if(str.indexOf('#')===0) {
                if(str.length===4) {
                    //Color format is #RGB
                    //Will get 255 for the alpha channel
                    let redNibble = parseInt(str[1], 16);
                    let red = (redNibble << 4) | redNibble;
                    let greenNibble = parseInt(str[2], 16);
                    let green = (greenNibble << 4) | greenNibble;
                    let blueNibble = parseInt(str[3], 16);
                    let blue = (blueNibble << 4) | blueNibble;

                    let int = toUint32(red << 16 | green << 8 | blue);
                    int = shiftLeft(int,8);
                    return or(int,0xff);
                } else if(str.length===5) {
                    //Color format is #RGBA
                    let redNibble = parseInt(str[1], 16);
                    let red = (redNibble << 4) | redNibble;
                    let greenNibble = parseInt(str[2], 16);
                    let green = (greenNibble << 4) | greenNibble;
                    let blueNibble = parseInt(str[3], 16);
                    let blue = (blueNibble << 4) | blueNibble;
                    let alphaNibble = parseInt(str[4], 16);
                    let alpha = (alphaNibble << 4) | alphaNibble;

                    let int = toUint32(red << 16 | green << 8 | blue);
                    int = shiftLeft(int,8);
                    return or(int,alpha);
                } else if(str.length===7) {
                    //Color format is #RRGGBB
                    //Will get 255 for the alpha channel
                    let int = toUint32(parseInt(str.substring(1),16));
                    int = shiftLeft(int,8);
                    return or(int,0xff);
                } else if(str.length===9) {
                    //Color format is #RRGGBBAA
                    return toUint32(parseInt(str.substring(1),16));
                }
            }
            if(str.indexOf('rgba')===0) {
                let parts = str.trim().substring(4).replace('(','').replace(')','').split(',');
                return fromBytesBigEndian(
                    parseInt(parts[0]),
                    parseInt(parts[1]),
                    parseInt(parts[2]),
                    Math.floor(parseFloat(parts[3])*255));
            }
            if(str.indexOf('rgb')===0) {
                let parts = str.trim().substring(3).replace('(','').replace(')','').split(',');
                return fromBytesBigEndian(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]), 255);
            }
            if(NAMED_COLORS.hasOwnProperty(str)) {
                return NAMED_COLORS[str];
            }
            throw new Error("unknown style format: " + str );
        }

    }

    /**
     * Returns the decimal portion of a given floating point number
     *
     * @param {number} v The number to return the declimal fration of
     * @example
     * console.log(fract(12.35))
     * // Prints out 0.34999999999999964
     *
     * @returns {number}
     */
    function fract(v) {  return v-Math.floor(v);   }

    /**
     * Convert a path of points to an array of lines
     *
     * @param {Array} path List of sub-paths
     *
     * @returns {Array<Line>}
     */
    function pathToLines(path) {
        const lines = [];
        let curr = null;

        path.forEach(function(cmd) {
            if(cmd[0] === PATH_COMMAND.MOVE) {
                curr = cmd[1];
            }
            if(cmd[0] === PATH_COMMAND.LINE) {
                const pt = cmd[1];
                lines.push(new Line(curr, pt));
                curr = pt;
            }
            if(cmd[0] === PATH_COMMAND.QUADRATIC_CURVE) {
                const pts = [curr, cmd[1], cmd[2]];
                for(let t=0; t<1; t+=0.1) {
                    let pt = calcQuadraticAtT(pts,t);
                    lines.push(new Line(curr, pt));
                    curr = pt;
                }
            }
            if(cmd[0] === PATH_COMMAND.BEZIER_CURVE) {
                const pts = [curr, cmd[1], cmd[2], cmd[3]];
                bezierToLines(pts,10).forEach(pt => {
                    lines.push(new Line(curr,pt));
                    curr = pt;
                });
            }
        });
        return lines;
    }

    function flatten_path(A) {
        let B = [];
        let curr = null;
        A.forEach(cmd => {
            if(cmd[0] === PATH_COMMAND.MOVE) {
                curr = cmd[1];
                // console.log("move",curr)
                return B.push([PATH_COMMAND.MOVE, new Point(curr.x,curr.y)])
            }
            if(cmd[0] === PATH_COMMAND.LINE) {
                curr = cmd[1];
                // console.log("line",curr)
                return B.push([PATH_COMMAND.LINE, new Point(curr.x,curr.y)])
            }
            if(cmd[0] === PATH_COMMAND.BEZIER_CURVE) {
                const pts = [curr, cmd[1], cmd[2], cmd[3]];
                let pts2 = bezierToLines(pts,10);
                for(let i=1; i<pts2.length; i+=2) {
                    B.push([PATH_COMMAND.LINE,new Point(pts2[i].x,pts2[i].y)]);
                }
                curr = cmd[3];
            }
        });
        return B
    }

    function path_to_stroked_path(path, w) {
        let curr = null;
        let outside = [];
        let inside = [];
        let path_start = 0;

        function project(A,B,scale) {
            if(A.equals(B)) console.log("same points!",A,B);
            let delta_unit = A.subtract(B).unit();
            let C_unit = delta_unit.rotate(toRad(90));
            let D_unit = delta_unit.rotate(toRad(-90));
            // console.log(C_unit, D_unit)
            return [
                C_unit.scale(scale).add(B),
                D_unit.scale(scale).add(B)
            ]
        }


        let prev_cmd = null;

        function normalize_angle(turn) {
            if(turn < -Math.PI) return turn + Math.PI*2
            if(turn > +Math.PI) return turn - Math.PI*2
            return turn
        }

        path.forEach(function(cmd,i) {
            // console.log("converting",cmd)
            if(cmd[0] === PATH_COMMAND.MOVE) {
                curr = cmd[1];
                prev_cmd = cmd;
                path_start = curr.clone();
                outside.push([PATH_COMMAND.MOVE,path_start.clone()]);
            }

            if(cmd[0] === PATH_COMMAND.LINE) {
                const A = curr;
                const B = cmd[1];
                if(A.equals(B)) return console.log("can't project the same paths",i,cmd,A,B)
                // console.log(i,"====",B)
                let next = path[i+1];
                //if first
                if(prev_cmd[0] === PATH_COMMAND.MOVE) {
                    // console.log("doing the first")
                    let pts1 = project(B,A,w);
                    outside.push([PATH_COMMAND.LINE, pts1[1]]);
                    inside.push([PATH_COMMAND.LINE,pts1[0]]);
                }
                prev_cmd = cmd;
                // if last
                if(!next) {
                    // console.log("doing last")
                    let pts1 = project(A,B,w);
                    outside.push([PATH_COMMAND.LINE, pts1[0]]);
                    inside.push([PATH_COMMAND.LINE, pts1[1]]);
                    return
                }
                const C = next[1];
                if(C.equals(B)) return console.log("can't project the same paths",i,cmd,A,B)
                // console.log(i,A,B,C)
                // console.log("next",next)
                let BA = A.subtract(B);
                let BC = C.subtract(B);
                // console.log(i,'B',B,'BA',BA,'BC',BC)
                let BA_angle = Math.atan2(BA.y,BA.x);
                let BC_angle = Math.atan2(BC.y,BC.x);
                // console.log("angles",toDeg(turn))
                let turn = normalize_angle(BC_angle-BA_angle);

                let pts1 = project(A,B,w);
                let pts2 = project(C,B,w);
                // console.log(i,'B',pts1)
                // console.log(i,'B',pts2)
                if(turn < 0) {
                    //if turning right
                    //outside is normal
                    outside.push([PATH_COMMAND.LINE, pts1[0]]);
                    outside.push([PATH_COMMAND.LINE, pts2[1]]);
                    //adjust inside
                    let h = w/Math.cos((Math.PI+turn)/2);
                    let C_unit = A.subtract(B).unit().rotate(turn/2).scale(h).add(B);
                    inside.push([PATH_COMMAND.LINE,C_unit]);

                } else {
                    //if turning left
                    //adjust outside
                    let h = w/Math.cos(-(Math.PI-turn)/2);
                    let C_unit = C.subtract(B).unit().rotate(-turn/2).scale(h).add(B);
                    outside.push([PATH_COMMAND.LINE,C_unit]);
                    //inside is normal
                    inside.push([PATH_COMMAND.LINE, pts1[1]]);
                    inside.push([PATH_COMMAND.LINE, pts2[0]]);
                }
                curr = B;
            }
        });

        inside.reverse();
        let final = [].concat(outside).concat(inside);
        // console.log("path_to_stroked_path output")
        // console.log('outside',outside)
        // console.log('inside',inside)
        final.push([PATH_COMMAND.LINE, path_start]);
        // console.log("final")
        // console.log(final)
        return final
    }

    /**
     * Calculate Quadratic
     *
     * @param {number} p
     * @param {number} t
     *
     * @ignore
     *
     * @returns {Point}
     */
    function calcQuadraticAtT(p, t) {
        const x = (1 - t) * (1 - t) * p[0].x + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
        const y = (1 - t) * (1 - t) * p[0].y + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;
        return new Point(x, y);
    }

    function bezierToLines(curve, THRESHOLD) {
        function recurse(curve) {
            if(flatness(curve) < THRESHOLD) return [curve[0],curve[3]]
            const split = splitCurveAtT(curve,0.5);
            return recurse(split[0]).concat(recurse(split[1]))
        }
        return recurse(curve)
    }

    function splitCurveAtT(p,t, debug) {
        let p1 = p[0];
        let p2 = p[1];
        let p3 = p[2];
        let p4 = p[3];

        let p12 = midpoint(p1,p2,t);
        let p23 = midpoint(p2,p3,t);
        let p34 = midpoint(p4,p3,t);


        let p123 = midpoint(p12,p23,t);
        let p234 = midpoint(p23, p34,t);
        let p1234 = { x: (p234.x-p123.x)*t+p123.x, y: (p234.y-p123.y)*t+p123.y};

        return [[p1, p12, p123, p1234],[p1234,p234,p34,p4]]
    }

    function flatness(curve) {
        const pointA = curve[0];
        const controlPointA = curve[1];
        const controlPointB = curve[2];
        const pointB = curve[3];
        let ux = Math.pow( 3 * controlPointA.x - 2 * pointA.x - pointB.x, 2 );
        let uy = Math.pow( 3 * controlPointA.y - 2 * pointA.y - pointB.y, 2 );
        let vx = Math.pow( 3 * controlPointB.x - 2 * pointB.x - pointA.x, 2 );
        let vy = Math.pow( 3 * controlPointB.y - 2 * pointB.y - pointA.y, 2 );
        if( ux < vx )
            ux = vx;
        if( uy < vy )
            uy = vy;
        return ux + uy;
    }

    function midpoint(p1,p2,t) {
        return { x: (p2.x-p1.x)*t+p1.x, y: (p2.y-p1.y)*t+p1.y}
    }

    /**
     * Calculate Minimum Bounds
     *
     * @param {Array} lines
     *
     * @ignore
     *
     * @returns {{x: Number.MAX_VALUE, y: Number.MAX_VALUE, x2: Number.MIN_VALUE, y2: Number.MIN_VALUE}}
     */
    function calcMinimumBounds(lines) {
        const bounds = {
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE,
            x2: Number.MIN_VALUE,
            y2: Number.MIN_VALUE
        };

        function checkPoint(pt) {
            bounds.x  = Math.min(bounds.x,pt.x);
            bounds.y  = Math.min(bounds.y,pt.y);
            bounds.x2 = Math.max(bounds.x2,pt.x);
            bounds.y2 = Math.max(bounds.y2,pt.y);
        }
        lines.forEach(function(line) {
            checkPoint(line.start);
            checkPoint(line.end);
        });
        return bounds;
    }


    /**
     * Calculate Sorted Intersections
     *
     * Adopted from http://alienryderflex.com/polygon
     *
     * @see http://alienryderflex.com/polygon
     *
     * @param {Array} lines An {@link Array} of Line
     * @param {number} y
     *
     * @ignore
     *
     * @returns {Array}
     */
    function calcSortedIntersections(lines,y) {
        const xlist = [];
        for(let i=0; i<lines.length; i++) {
            const A = lines[i].start;
            const B = lines[i].end;
            if(A.y<y && B.y>=y || B.y<y && A.y>=y) {
                const xval = A.x + (y - A.y) / (B.y - A.y) * (B.x - A.x);
                xlist.push(xval);
            }
        }
        return xlist.sort(function(a,b) {  return a-b; });
    }

    /**
     * The Bitmap class is used for direct pixel manipulation(for example setting a pixel colour,
     * transparency etc). It also provides a factory method for creating new instances of
     * {@link Context}
     *
     * @class Bitmap
     */
    class Bitmap {

        /**
         * Creates an instance of Bitmap.
         * @param {number} w      Width
         * @param {number} h      Height
         * @param {any}   options Currently unused
         * @memberof Bitmap
         */
        constructor(w,h, options) {

            /**
             * @type {number}
             */
            this.width = Math.floor(w);

            /**
             * @type {number}
             */
            this.height = Math.floor(h);

            /**
             * @type {ArrayBuffer}
             */
            this.data = Buffer.alloc(w*h*4);

            const fillval = NAMED_COLORS.transparent;
            for(let j=0; j<h; j++) {
                for (let i = 0; i < w; i++) {
                    this.setPixelRGBA(i, j, fillval);
                }
            }

        }

        /**
         * Calculate Index
         *
         * @param {number} x X position
         * @param {number} y Y position
         *
         * @returns {number}
         *
         * @memberof Bitmap
         */
        calculateIndex (x,y) {
            x = Math.floor(x);
            y = Math.floor(y);
            if (x<0 || y<0 || x >= this.width || y >= this.height) return 0;
            return (this.width*y+x)*4;
        }

        /**
         * Set the RGBA(Red, Green, Blue, Alpha) values on an individual pixel level
         *
         * @param {number} x    X axis position
         * @param {number} y    Y axis position
         * @param {number} rgba A hex representation of the RGBA value of the pixel. See {@link NAMED_COLORS} for examples
         *
         * @returns {void}
         *
         * @memberof Bitmap
         */
        setPixelRGBA(x,y,rgba) {
            let i = this.calculateIndex(x, y);
            const bytes = getBytesBigEndian(rgba);
            this.data[i+0] = bytes[0];
            this.data[i+1] = bytes[1];
            this.data[i+2] = bytes[2];
            this.data[i+3] = bytes[3];
        }

        /**
         * Set the individual red, green, blue and alpha levels of an individual pixel
         *
         * @param {number} x X axis position
         * @param {number} y Y axis position
         * @param {number} r Red level
         * @param {number} g Green level
         * @param {number} b Blue level
         * @param {number} a Alpha level
         *
         * @returns {void}
         *
         * @memberof Bitmap
         */
        setPixelRGBA_i(x,y,r,g,b,a) {
            let i = this.calculateIndex(x, y);
            this.data[i+0] = r;
            this.data[i+1] = g;
            this.data[i+2] = b;
            this.data[i+3] = a;
        }

        /**
         * Get the RGBA value of an individual pixel as a hexadecimal number(See {@link NAMED_COLORS} for examples)
         *
         * @param {number} x X axis potiion
         * @param {number} y Y axis position
         *
         * @returns {number}
         *
         * @memberof Bitmap
         */
        getPixelRGBA(x,y) {
            let i = this.calculateIndex(x, y);
            return fromBytesBigEndian(
                this.data[i+0],
                this.data[i+1],
                this.data[i+2],
                this.data[i+3]);
        }

        /**
         * Get Pixel RGBA Seperate
         *
         * @param {number} x X axis position
         * @param {number} y Y axis position
         *
         * @ignore
         *
         * @returns {Array}
         *
         * @memberof Bitmap
         */
        getPixelRGBA_separate(x,y) {
            const i = this.calculateIndex(x, y);
            return this.data.slice(i,i+4);
        }

        /**
         * {@link Context} factory. Creates a new {@link Context} instance object for the current bitmap object
         *
         * @returns {Context}
         *
         * @memberof Bitmap
         */
        getContext(type) {
            return new Context(this);
        }

        _copySubBitmap(x,y,w,h) {
            let dst = new Bitmap(w,h,{});
            for(let i=0; i<w; i++) {
                for(let j=0; j<h; j++) {
                    let indexA = this.calculateIndex(x+i,y+j);
                    let indexB = dst.calculateIndex(i,j);
                    for(let k=0; k<4; k++) {
                        dst.data[indexB+k] = this.data[indexA+k];
                    }
                }
            }
            return dst
        }

        _pasteSubBitmap(src,x,y) {
            for(let i=0; i<src.width; i++) {
                for(let j=0; j<src.height; j++) {
                    let indexA = this.calculateIndex(x+i,y+j);
                    let indexB = src.calculateIndex(i,j);
                    for(let k=0; k<4; k++) {
                        this.data[indexA+k] = src.data[indexB+k];
                    }
                }
            }
        }

    }

    var chunkstream = createCommonjsModule(function (module) {






    var ChunkStream = module.exports = function() {
      Stream__default['default'].call(this);

      this._buffers = [];
      this._buffered = 0;

      this._reads = [];
      this._paused = false;

      this._encoding = 'utf8';
      this.writable = true;
    };
    util__default['default'].inherits(ChunkStream, Stream__default['default']);


    ChunkStream.prototype.read = function(length, callback) {

      this._reads.push({
        length: Math.abs(length),  // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });

      process.nextTick(function() {
        this._process();

        // its paused and there is not enought data then ask for more
        if (this._paused && this._reads.length > 0) {
          this._paused = false;

          this.emit('drain');
        }
      }.bind(this));
    };

    ChunkStream.prototype.write = function(data, encoding) {

      if (!this.writable) {
        this.emit('error', new Error('Stream not writable'));
        return false;
      }

      var dataBuffer;
      if (Buffer.isBuffer(data)) {
        dataBuffer = data;
      }
      else {
        dataBuffer = new Buffer(data, encoding || this._encoding);
      }

      this._buffers.push(dataBuffer);
      this._buffered += dataBuffer.length;

      this._process();

      // ok if there are no more read requests
      if (this._reads && this._reads.length === 0) {
        this._paused = true;
      }

      return this.writable && !this._paused;
    };

    ChunkStream.prototype.end = function(data, encoding) {

      if (data) {
        this.write(data, encoding);
      }

      this.writable = false;

      // already destroyed
      if (!this._buffers) {
        return;
      }

      // enqueue or handle end
      if (this._buffers.length === 0) {
        this._end();
      }
      else {
        this._buffers.push(null);
        this._process();
      }
    };

    ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;

    ChunkStream.prototype._end = function() {

      if (this._reads.length > 0) {
        this.emit('error',
          new Error('There are some read requests waiting on finished stream')
        );
      }

      this.destroy();
    };

    ChunkStream.prototype.destroy = function() {

      if (!this._buffers) {
        return;
      }

      this.writable = false;
      this._reads = null;
      this._buffers = null;

      this.emit('close');
    };

    ChunkStream.prototype._processReadAllowingLess = function(read) {
      // ok there is any data so that we can satisfy this request
      this._reads.shift(); // == read

      // first we need to peek into first buffer
      var smallerBuf = this._buffers[0];

      // ok there is more data than we need
      if (smallerBuf.length > read.length) {

        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);

        read.func.call(this, smallerBuf.slice(0, read.length));

      }
      else {
        // ok this is less than maximum length so use it all
        this._buffered -= smallerBuf.length;
        this._buffers.shift(); // == smallerBuf

        read.func.call(this, smallerBuf);
      }
    };

    ChunkStream.prototype._processRead = function(read) {
      this._reads.shift(); // == read

      var pos = 0;
      var count = 0;
      var data = new Buffer(read.length);

      // create buffer for all data
      while (pos < read.length) {

        var buf = this._buffers[count++];
        var len = Math.min(buf.length, read.length - pos);

        buf.copy(data, pos, 0, len);
        pos += len;

        // last buffer wasn't used all so just slice it and leave
        if (len !== buf.length) {
          this._buffers[--count] = buf.slice(len);
        }
      }

      // remove all used buffers
      if (count > 0) {
        this._buffers.splice(0, count);
      }

      this._buffered -= read.length;

      read.func.call(this, data);
    };

    ChunkStream.prototype._process = function() {

      try {
        // as long as there is any data and read requests
        while (this._buffered > 0 && this._reads && this._reads.length > 0) {

          var read = this._reads[0];

          // read any data (but no more than length)
          if (read.allowLess) {
            this._processReadAllowingLess(read);

          }
          else if (this._buffered >= read.length) {
            // ok we can meet some expectations

            this._processRead(read);
          }
          else {
            // not enought data to satisfy first request in queue
            // so we need to wait for more
            break;
          }
        }

        if (this._buffers && this._buffers.length > 0 && this._buffers[0] === null) {
          this._end();
        }
      }
      catch (ex) {
        this.emit('error', ex);
      }
    };
    });

    // Adam 7
    //   0 1 2 3 4 5 6 7
    // 0 x 6 4 6 x 6 4 6
    // 1 7 7 7 7 7 7 7 7
    // 2 5 6 5 6 5 6 5 6
    // 3 7 7 7 7 7 7 7 7
    // 4 3 6 4 6 3 6 4 6
    // 5 7 7 7 7 7 7 7 7
    // 6 5 6 5 6 5 6 5 6
    // 7 7 7 7 7 7 7 7 7


    var imagePasses = [
      { // pass 1 - 1px
        x: [0],
        y: [0]
      },
      { // pass 2 - 1px
        x: [4],
        y: [0]
      },
      { // pass 3 - 2px
        x: [0, 4],
        y: [4]
      },
      { // pass 4 - 4px
        x: [2, 6],
        y: [0, 4]
      },
      { // pass 5 - 8px
        x: [0, 2, 4, 6],
        y: [2, 6]
      },
      { // pass 6 - 16px
        x: [1, 3, 5, 7],
        y: [0, 2, 4, 6]
      },
      { // pass 7 - 32px
        x: [0, 1, 2, 3, 4, 5, 6, 7],
        y: [1, 3, 5, 7]
      }
    ];

    var getImagePasses = function(width, height) {
      var images = [];
      var xLeftOver = width % 8;
      var yLeftOver = height % 8;
      var xRepeats = (width - xLeftOver) / 8;
      var yRepeats = (height - yLeftOver) / 8;
      for (var i = 0; i < imagePasses.length; i++) {
        var pass = imagePasses[i];
        var passWidth = xRepeats * pass.x.length;
        var passHeight = yRepeats * pass.y.length;
        for (var j = 0; j < pass.x.length; j++) {
          if (pass.x[j] < xLeftOver) {
            passWidth++;
          }
          else {
            break;
          }
        }
        for (j = 0; j < pass.y.length; j++) {
          if (pass.y[j] < yLeftOver) {
            passHeight++;
          }
          else {
            break;
          }
        }
        if (passWidth > 0 && passHeight > 0) {
          images.push({ width: passWidth, height: passHeight, index: i });
        }
      }
      return images;
    };

    var getInterlaceIterator = function(width) {
      return function(x, y, pass) {
        var outerXLeftOver = x % imagePasses[pass].x.length;
        var outerX = (((x - outerXLeftOver) / imagePasses[pass].x.length) * 8) + imagePasses[pass].x[outerXLeftOver];
        var outerYLeftOver = y % imagePasses[pass].y.length;
        var outerY = (((y - outerYLeftOver) / imagePasses[pass].y.length) * 8) + imagePasses[pass].y[outerYLeftOver];
        return (outerX * 4) + (outerY * width * 4);
      };
    };

    var interlace = {
    	getImagePasses: getImagePasses,
    	getInterlaceIterator: getInterlaceIterator
    };

    var paethPredictor = function paethPredictor(left, above, upLeft) {

      var paeth = left + above - upLeft;
      var pLeft = Math.abs(paeth - left);
      var pAbove = Math.abs(paeth - above);
      var pUpLeft = Math.abs(paeth - upLeft);

      if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
      }
      if (pAbove <= pUpLeft) {
        return above;
      }
      return upLeft;
    };

    var filterParse = createCommonjsModule(function (module) {




    function getByteWidth(width, bpp, depth) {
      var byteWidth = width * bpp;
      if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
      }
      return byteWidth;
    }

    var Filter = module.exports = function(bitmapInfo, dependencies) {

      var width = bitmapInfo.width;
      var height = bitmapInfo.height;
      var interlace$1 = bitmapInfo.interlace;
      var bpp = bitmapInfo.bpp;
      var depth = bitmapInfo.depth;

      this.read = dependencies.read;
      this.write = dependencies.write;
      this.complete = dependencies.complete;

      this._imageIndex = 0;
      this._images = [];
      if (interlace$1) {
        var passes = interlace.getImagePasses(width, height);
        for (var i = 0; i < passes.length; i++) {
          this._images.push({
            byteWidth: getByteWidth(passes[i].width, bpp, depth),
            height: passes[i].height,
            lineIndex: 0
          });
        }
      }
      else {
        this._images.push({
          byteWidth: getByteWidth(width, bpp, depth),
          height: height,
          lineIndex: 0
        });
      }

      // when filtering the line we look at the pixel to the left
      // the spec also says it is done on a byte level regardless of the number of pixels
      // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
      // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
      if (depth === 8) {
        this._xComparison = bpp;
      }
      else if (depth === 16) {
        this._xComparison = bpp * 2;
      }
      else {
        this._xComparison = 1;
      }
    };

    Filter.prototype.start = function() {
      this.read(this._images[this._imageIndex].byteWidth + 1, this._reverseFilterLine.bind(this));
    };

    Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {

      var xComparison = this._xComparison;
      var xBiggerThan = xComparison - 1;

      for (var x = 0; x < byteWidth; x++) {
        var rawByte = rawData[1 + x];
        var f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
      }
    };

    Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {

      var lastLine = this._lastLine;

      for (var x = 0; x < byteWidth; x++) {
        var rawByte = rawData[1 + x];
        var f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
      }
    };

    Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {

      var xComparison = this._xComparison;
      var xBiggerThan = xComparison - 1;
      var lastLine = this._lastLine;

      for (var x = 0; x < byteWidth; x++) {
        var rawByte = rawData[1 + x];
        var f3Up = lastLine ? lastLine[x] : 0;
        var f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        var f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
      }
    };

    Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {

      var xComparison = this._xComparison;
      var xBiggerThan = xComparison - 1;
      var lastLine = this._lastLine;

      for (var x = 0; x < byteWidth; x++) {
        var rawByte = rawData[1 + x];
        var f4Up = lastLine ? lastLine[x] : 0;
        var f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        var f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        var f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
      }
    };

    Filter.prototype._reverseFilterLine = function(rawData) {

      var filter = rawData[0];
      var unfilteredLine;
      var currentImage = this._images[this._imageIndex];
      var byteWidth = currentImage.byteWidth;

      if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
      }
      else {

        unfilteredLine = new Buffer(byteWidth);

        switch (filter) {
          case 1:
            this._unFilterType1(rawData, unfilteredLine, byteWidth);
            break;
          case 2:
            this._unFilterType2(rawData, unfilteredLine, byteWidth);
            break;
          case 3:
            this._unFilterType3(rawData, unfilteredLine, byteWidth);
            break;
          case 4:
            this._unFilterType4(rawData, unfilteredLine, byteWidth);
            break;
          default:
            throw new Error('Unrecognised filter type - ' + filter);
        }
      }

      this.write(unfilteredLine);

      currentImage.lineIndex++;
      if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
      }
      else {
        this._lastLine = unfilteredLine;
      }

      if (currentImage) {
        // read, using the byte width that may be from the new current image
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
      }
      else {
        this._lastLine = null;
        this.complete();
      }
    };
    });

    var filterParseAsync = createCommonjsModule(function (module) {






    var FilterAsync = module.exports = function(bitmapInfo) {
      chunkstream.call(this);

      var buffers = [];
      var that = this;
      this._filter = new filterParse(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer) {
          buffers.push(buffer);
        },
        complete: function() {
          that.emit('complete', Buffer.concat(buffers));
        }
      });

      this._filter.start();
    };
    util__default['default'].inherits(FilterAsync, chunkstream);
    });

    var constants = {

      PNG_SIGNATURE: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],

      TYPE_IHDR: 0x49484452,
      TYPE_IEND: 0x49454e44,
      TYPE_IDAT: 0x49444154,
      TYPE_PLTE: 0x504c5445,
      TYPE_tRNS: 0x74524e53, // eslint-disable-line camelcase
      TYPE_gAMA: 0x67414d41, // eslint-disable-line camelcase

      // color-type bits
      COLORTYPE_GRAYSCALE: 0,
      COLORTYPE_PALETTE: 1,
      COLORTYPE_COLOR: 2,
      COLORTYPE_ALPHA: 4, // e.g. grayscale and alpha

      // color-type combinations
      COLORTYPE_PALETTE_COLOR: 3,
      COLORTYPE_COLOR_ALPHA: 6,

      COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
      },

      GAMMA_DIVISION: 100000
    };

    var crc = createCommonjsModule(function (module) {

    var crcTable = [];

    (function() {
      for (var i = 0; i < 256; i++) {
        var currentCrc = i;
        for (var j = 0; j < 8; j++) {
          if (currentCrc & 1) {
            currentCrc = 0xedb88320 ^ (currentCrc >>> 1);
          }
          else {
            currentCrc = currentCrc >>> 1;
          }
        }
        crcTable[i] = currentCrc;
      }
    }());

    var CrcCalculator = module.exports = function() {
      this._crc = -1;
    };

    CrcCalculator.prototype.write = function(data) {

      for (var i = 0; i < data.length; i++) {
        this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ (this._crc >>> 8);
      }
      return true;
    };

    CrcCalculator.prototype.crc32 = function() {
      return this._crc ^ -1;
    };


    CrcCalculator.crc32 = function(buf) {

      var crc = -1;
      for (var i = 0; i < buf.length; i++) {
        crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
      }
      return crc ^ -1;
    };
    });

    var parser = createCommonjsModule(function (module) {





    var Parser = module.exports = function(options, dependencies) {

      this._options = options;
      options.checkCRC = options.checkCRC !== false;

      this._hasIHDR = false;
      this._hasIEND = false;

      // input flags/metadata
      this._palette = [];
      this._colorType = 0;

      this._chunks = {};
      this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
      this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
      this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
      this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
      this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
      this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);

      this.read = dependencies.read;
      this.error = dependencies.error;
      this.metadata = dependencies.metadata;
      this.gamma = dependencies.gamma;
      this.transColor = dependencies.transColor;
      this.palette = dependencies.palette;
      this.parsed = dependencies.parsed;
      this.inflateData = dependencies.inflateData;
      this.finished = dependencies.finished;
    };

    Parser.prototype.start = function() {
      this.read(constants.PNG_SIGNATURE.length,
        this._parseSignature.bind(this)
      );
    };

    Parser.prototype._parseSignature = function(data) {

      var signature = constants.PNG_SIGNATURE;

      for (var i = 0; i < signature.length; i++) {
        if (data[i] !== signature[i]) {
          this.error(new Error('Invalid file signature'));
          return;
        }
      }
      this.read(8, this._parseChunkBegin.bind(this));
    };

    Parser.prototype._parseChunkBegin = function(data) {

      // chunk content length
      var length = data.readUInt32BE(0);

      // chunk type
      var type = data.readUInt32BE(4);
      var name = '';
      for (var i = 4; i < 8; i++) {
        name += String.fromCharCode(data[i]);
      }

      //console.log('chunk ', name, length);

      // chunk flags
      var ancillary = Boolean(data[4] & 0x20); // or critical
    //    priv = Boolean(data[5] & 0x20), // or public
    //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe

      if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
        this.error(new Error('Expected IHDR on beggining'));
        return;
      }

      this._crc = new crc();
      this._crc.write(new Buffer(name));

      if (this._chunks[type]) {
        return this._chunks[type](length);
      }

      if (!ancillary) {
        this.error(new Error('Unsupported critical chunk type ' + name));
        return;
      }

      this.read(length + 4, this._skipChunk.bind(this));
    };

    Parser.prototype._skipChunk = function(/*data*/) {
      this.read(8, this._parseChunkBegin.bind(this));
    };

    Parser.prototype._handleChunkEnd = function() {
      this.read(4, this._parseChunkEnd.bind(this));
    };

    Parser.prototype._parseChunkEnd = function(data) {

      var fileCrc = data.readInt32BE(0);
      var calcCrc = this._crc.crc32();

      // check CRC
      if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error('Crc error - ' + fileCrc + ' - ' + calcCrc));
        return;
      }

      if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
      }
    };

    Parser.prototype._handleIHDR = function(length) {
      this.read(length, this._parseIHDR.bind(this));
    };
    Parser.prototype._parseIHDR = function(data) {

      this._crc.write(data);

      var width = data.readUInt32BE(0);
      var height = data.readUInt32BE(4);
      var depth = data[8];
      var colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
      var compr = data[10];
      var filter = data[11];
      var interlace = data[12];

      // console.log('    width', width, 'height', height,
      //     'depth', depth, 'colorType', colorType,
      //     'compr', compr, 'filter', filter, 'interlace', interlace
      // );

      if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error('Unsupported bit depth ' + depth));
        return;
      }
      if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error('Unsupported color type'));
        return;
      }
      if (compr !== 0) {
        this.error(new Error('Unsupported compression method'));
        return;
      }
      if (filter !== 0) {
        this.error(new Error('Unsupported filter method'));
        return;
      }
      if (interlace !== 0 && interlace !== 1) {
        this.error(new Error('Unsupported interlace method'));
        return;
      }

      this._colorType = colorType;

      var bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];

      this._hasIHDR = true;

      this.metadata({
        width: width,
        height: height,
        depth: depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
        bpp: bpp,
        colorType: colorType
      });

      this._handleChunkEnd();
    };


    Parser.prototype._handlePLTE = function(length) {
      this.read(length, this._parsePLTE.bind(this));
    };
    Parser.prototype._parsePLTE = function(data) {

      this._crc.write(data);

      var entries = Math.floor(data.length / 3);
      // console.log('Palette:', entries);

      for (var i = 0; i < entries; i++) {
        this._palette.push([
          data[i * 3],
          data[i * 3 + 1],
          data[i * 3 + 2],
          0xff
        ]);
      }

      this.palette(this._palette);

      this._handleChunkEnd();
    };

    Parser.prototype._handleTRNS = function(length) {
      this.read(length, this._parseTRNS.bind(this));
    };
    Parser.prototype._parseTRNS = function(data) {

      this._crc.write(data);

      // palette
      if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
          this.error(new Error('Transparency chunk must be after palette'));
          return;
        }
        if (data.length > this._palette.length) {
          this.error(new Error('More transparent colors than palette size'));
          return;
        }
        for (var i = 0; i < data.length; i++) {
          this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
      }

      // for colorType 0 (grayscale) and 2 (rgb)
      // there might be one gray/color defined as transparent
      if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
        // grey, 2 bytes
        this.transColor([data.readUInt16BE(0)]);
      }
      if (this._colorType === constants.COLORTYPE_COLOR) {
        this.transColor([data.readUInt16BE(0), data.readUInt16BE(2), data.readUInt16BE(4)]);
      }

      this._handleChunkEnd();
    };

    Parser.prototype._handleGAMA = function(length) {
      this.read(length, this._parseGAMA.bind(this));
    };
    Parser.prototype._parseGAMA = function(data) {

      this._crc.write(data);
      this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);

      this._handleChunkEnd();
    };

    Parser.prototype._handleIDAT = function(length) {
      this.read(-length, this._parseIDAT.bind(this, length));
    };
    Parser.prototype._parseIDAT = function(length, data) {

      this._crc.write(data);

      if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error('Expected palette not found');
      }

      this.inflateData(data);
      var leftOverLength = length - data.length;

      if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
      }
      else {
        this._handleChunkEnd();
      }
    };

    Parser.prototype._handleIEND = function(length) {
      this.read(length, this._parseIEND.bind(this));
    };
    Parser.prototype._parseIEND = function(data) {

      this._crc.write(data);

      this._hasIEND = true;
      this._handleChunkEnd();

      if (this.finished) {
        this.finished();
      }
    };
    });

    var pixelBppMap = {
      1: { // L
        0: 0,
        1: 0,
        2: 0,
        3: 0xff
      },
      2: { // LA
        0: 0,
        1: 0,
        2: 0,
        3: 1
      },
      3: { // RGB
        0: 0,
        1: 1,
        2: 2,
        3: 0xff
      },
      4: { // RGBA
        0: 0,
        1: 1,
        2: 2,
        3: 3
      }
    };

    function bitRetriever(data, depth) {

      var leftOver = [];
      var i = 0;

      function split() {
        if (i === data.length) {
          throw new Error('Ran out of data');
        }
        var byte = data[i];
        i++;
        var byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
        switch (depth) {
          default:
            throw new Error('unrecognised depth');
          case 16:
            byte2 = data[i];
            i++;
            leftOver.push(((byte << 8) + byte2));
            break;
          case 4:
            byte2 = byte & 0x0f;
            byte1 = byte >> 4;
            leftOver.push(byte1, byte2);
            break;
          case 2:
            byte4 = byte & 3;
            byte3 = byte >> 2 & 3;
            byte2 = byte >> 4 & 3;
            byte1 = byte >> 6 & 3;
            leftOver.push(byte1, byte2, byte3, byte4);
            break;
          case 1:
            byte8 = byte & 1;
            byte7 = byte >> 1 & 1;
            byte6 = byte >> 2 & 1;
            byte5 = byte >> 3 & 1;
            byte4 = byte >> 4 & 1;
            byte3 = byte >> 5 & 1;
            byte2 = byte >> 6 & 1;
            byte1 = byte >> 7 & 1;
            leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
            break;
        }
      }

      return {
        get: function(count) {
          while (leftOver.length < count) {
            split();
          }
          var returner = leftOver.slice(0, count);
          leftOver = leftOver.slice(count);
          return returner;
        },
        resetAfterLine: function() {
          leftOver.length = 0;
        },
        end: function() {
          if (i !== data.length) {
            throw new Error('extra data found');
          }
        }
      };
    }

    function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) { // eslint-disable-line max-params
      var imageWidth = image.width;
      var imageHeight = image.height;
      var imagePass = image.index;
      for (var y = 0; y < imageHeight; y++) {
        for (var x = 0; x < imageWidth; x++) {
          var pxPos = getPxPos(x, y, imagePass);

          for (var i = 0; i < 4; i++) {
            var idx = pixelBppMap[bpp][i];
            if (idx === 0xff) {
              pxData[pxPos + i] = 0xff;
            } else {
              var dataPos = idx + rawPos;
              if (dataPos === data.length) {
                throw new Error('Ran out of data');
              }
              pxData[pxPos + i] = data[dataPos];
            }
          }
          rawPos += bpp; //eslint-disable-line no-param-reassign
        }
      }
      return rawPos;
    }

    function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) { // eslint-disable-line max-params
      var imageWidth = image.width;
      var imageHeight = image.height;
      var imagePass = image.index;
      for (var y = 0; y < imageHeight; y++) {
        for (var x = 0; x < imageWidth; x++) {
          var pixelData = bits.get(bpp);
          var pxPos = getPxPos(x, y, imagePass);

          for (var i = 0; i < 4; i++) {
            var idx = pixelBppMap[bpp][i];
            pxData[pxPos + i] = idx !== 0xff ? pixelData[idx] : maxBit;
          }
        }
        bits.resetAfterLine();
      }
    }

    var dataToBitMap = function(data, bitmapInfo) {

      var width = bitmapInfo.width;
      var height = bitmapInfo.height;
      var depth = bitmapInfo.depth;
      var bpp = bitmapInfo.bpp;
      var interlace$1 = bitmapInfo.interlace;

      if (depth !== 8) {
        var bits = bitRetriever(data, depth);
      }
      var pxData;
      if (depth <= 8) {
        pxData = new Buffer(width * height * 4);
      }
      else {
        pxData = new Uint16Array(width * height * 4);
      }
      var maxBit = Math.pow(2, depth) - 1;
      var rawPos = 0;
      var images;
      var getPxPos;

      if (interlace$1) {
        images = interlace.getImagePasses(width, height);
        getPxPos = interlace.getInterlaceIterator(width, height);
      }
      else {
        var nonInterlacedPxPos = 0;
        getPxPos = function() {
          var returner = nonInterlacedPxPos;
          nonInterlacedPxPos += 4;
          return returner;
        };
        images = [{ width: width, height: height }];
      }

      for (var imageIndex = 0; imageIndex < images.length; imageIndex++) {
        if (depth === 8) {
          rawPos = mapImage8Bit(images[imageIndex], pxData, getPxPos, bpp, data, rawPos);
        }
        else {
          mapImageCustomBit(images[imageIndex], pxData, getPxPos, bpp, bits, maxBit);
        }
      }
      if (depth === 8) {
        if (rawPos !== data.length) {
          throw new Error('extra data found');
        }
      }
      else {
        bits.end();
      }

      return pxData;
    };

    var bitmapper = {
    	dataToBitMap: dataToBitMap
    };

    function dePalette(indata, outdata, width, height, palette) {
      var pxPos = 0;
      // use values from palette
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var color = palette[indata[pxPos]];

          if (!color) {
            throw new Error('index ' + indata[pxPos] + ' not in palette');
          }

          for (var i = 0; i < 4; i++) {
            outdata[pxPos + i] = color[i];
          }
          pxPos += 4;
        }
      }
    }

    function replaceTransparentColor(indata, outdata, width, height, transColor) {
      var pxPos = 0;
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var makeTrans = false;

          if (transColor.length === 1) {
            if (transColor[0] === indata[pxPos]) {
              makeTrans = true;
            }
          }
          else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
            makeTrans = true;
          }
          if (makeTrans) {
            for (var i = 0; i < 4; i++) {
              outdata[pxPos + i] = 0;
            }
          }
          pxPos += 4;
        }
      }
    }

    function scaleDepth(indata, outdata, width, height, depth) {
      var maxOutSample = 255;
      var maxInSample = Math.pow(2, depth) - 1;
      var pxPos = 0;

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          for (var i = 0; i < 4; i++) {
            outdata[pxPos + i] = Math.floor((indata[pxPos + i] * maxOutSample) / maxInSample + 0.5);
          }
          pxPos += 4;
        }
      }
    }

    var formatNormaliser = function(indata, imageData) {

      var depth = imageData.depth;
      var width = imageData.width;
      var height = imageData.height;
      var colorType = imageData.colorType;
      var transColor = imageData.transColor;
      var palette = imageData.palette;

      var outdata = indata; // only different for 16 bits

      if (colorType === 3) { // paletted
        dePalette(indata, outdata, width, height, palette);
      }
      else {
        if (transColor) {
          replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        // if it needs scaling
        if (depth !== 8) {
          // if we need to change the buffer size
          if (depth === 16) {
            outdata = new Buffer(width * height * 4);
          }
          scaleDepth(indata, outdata, width, height, depth);
        }
      }
      return outdata;
    };

    var parserAsync = createCommonjsModule(function (module) {









    var ParserAsync = module.exports = function(options) {
      chunkstream.call(this);

      this._parser = new parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, 'gamma'),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this)
      });
      this._options = options;
      this.writable = true;

      this._parser.start();
    };
    util__default['default'].inherits(ParserAsync, chunkstream);


    ParserAsync.prototype._handleError = function(err) {

      this.emit('error', err);

      this.writable = false;

      this.destroy();

      if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
      }

      this.errord = true;
    };

    ParserAsync.prototype._inflateData = function(data) {
      if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
          this._inflate = zlib__default['default'].createInflate();

          this._inflate.on('error', this.emit.bind(this, 'error'));
          this._filter.on('complete', this._complete.bind(this));

          this._inflate.pipe(this._filter);
        } else {
          var rowSize = ((this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7) >> 3) + 1;
          var imageSize = rowSize * this._bitmapInfo.height;
          var chunkSize = Math.max(imageSize, zlib__default['default'].Z_MIN_CHUNK);
          
          this._inflate = zlib__default['default'].createInflate({ chunkSize: chunkSize });
          var leftToInflate = imageSize;

          var emitError = this.emit.bind(this, 'error');
          this._inflate.on('error', function(err) {
            if (!leftToInflate) {
              return;
            }

            emitError(err);
          });
          this._filter.on('complete', this._complete.bind(this));

          var filterWrite = this._filter.write.bind(this._filter);
          this._inflate.on('data', function(chunk) {
            if (!leftToInflate) {
              return;
            }

            if (chunk.length > leftToInflate) {
              chunk = chunk.slice(0, leftToInflate);
            }

            leftToInflate -= chunk.length;

            filterWrite(chunk);
          });

          this._inflate.on('end', this._filter.end.bind(this._filter));
        }
      }
      this._inflate.write(data);
    };

    ParserAsync.prototype._handleMetaData = function(metaData) {

      this.emit('metadata', metaData);

      this._bitmapInfo = Object.create(metaData);

      this._filter = new filterParseAsync(this._bitmapInfo);
    };

    ParserAsync.prototype._handleTransColor = function(transColor) {
      this._bitmapInfo.transColor = transColor;
    };

    ParserAsync.prototype._handlePalette = function(palette) {
      this._bitmapInfo.palette = palette;
    };


    ParserAsync.prototype._finished = function() {
      if (this.errord) {
        return;
      }

      if (!this._inflate) {
        this.emit('error', 'No Inflate block');
      }
      else {
        // no more data to inflate
        this._inflate.end();
      }
      this.destroySoon();
    };

    ParserAsync.prototype._complete = function(filteredData) {

      if (this.errord) {
        return;
      }

      try {
        var bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);

        var normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
        bitmapData = null;
      }
      catch (ex) {
        this._handleError(ex);
        return;
      }

      this.emit('parsed', normalisedBitmapData);
    };
    });

    var bitpacker = function(dataIn, width, height, options) {
      var outHasAlpha = [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(options.colorType) !== -1;
      if (options.colorType === options.inputColorType) {
        var bigEndian = (function() {
          var buffer = new ArrayBuffer(2);
          new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
          // Int16Array uses the platform's endianness.
          return new Int16Array(buffer)[0] !== 256;
        })();
        // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
         if (options.bitDepth === 8 || (options.bitDepth === 16 && bigEndian)){
             return dataIn;
        }
      }

      // map to a UInt16 array if data is 16bit, fix endianness below
      var data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);

      var maxValue = 255;
      var inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
      if (inBpp == 4 && !options.inputHasAlpha) inBpp = 3;
      var outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
      if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
      }
      var outData = new Buffer(width * height * outBpp);

      var inIndex = 0;
      var outIndex = 0;

      var bgColor = options.bgColor || {};
      if (bgColor.red === undefined) {
        bgColor.red = maxValue;
      }
      if (bgColor.green === undefined) {
        bgColor.green = maxValue;
      }
      if (bgColor.blue === undefined) {
        bgColor.blue = maxValue;
      }

      function getRGBA(data, inIndex) {
        var red, green, blue, alpha = maxValue;
        switch (options.inputColorType) {
          case constants.COLORTYPE_COLOR_ALPHA:
            alpha = data[inIndex + 3];
            red = data[inIndex];
            green = data[inIndex+1];
            blue = data[inIndex+2];
            break;
          case constants.COLORTYPE_COLOR:
            red = data[inIndex];
            green = data[inIndex+1];
            blue = data[inIndex+2];
            break;
          case constants.COLORTYPE_ALPHA:
            alpha = data[inIndex + 1];
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          case constants.COLORTYPE_GRAYSCALE:
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          default:
            throw new Error('input color type:' + options.inputColorType + ' is not supported at present');
        }

        if (options.inputHasAlpha) {
          if (!outHasAlpha) {
            alpha /= maxValue;
            red = Math.min(Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0), maxValue);
            green = Math.min(Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0), maxValue);
            blue = Math.min(Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0), maxValue);
          }
        }
        return {red: red, green: green, blue: blue, alpha: alpha};
      }

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var rgba = getRGBA(data, inIndex);

          switch (options.colorType) {
            case constants.COLORTYPE_COLOR_ALPHA:
            case constants.COLORTYPE_COLOR:
              if (options.bitDepth === 8) {
                outData[outIndex] = rgba.red;
                outData[outIndex + 1] = rgba.green;
                outData[outIndex + 2] = rgba.blue;
                if (outHasAlpha) {
                  outData[outIndex + 3] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(rgba.red, outIndex);
                outData.writeUInt16BE(rgba.green, outIndex + 2);
                outData.writeUInt16BE(rgba.blue, outIndex + 4);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                }
              }
              break;
            case constants.COLORTYPE_ALPHA:
            case constants.COLORTYPE_GRAYSCALE:
              // Convert to grayscale and alpha
              var grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
              if (options.bitDepth === 8) {
                outData[outIndex] = grayscale;
                if (outHasAlpha) {
                  outData[outIndex + 1] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(grayscale, outIndex);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                }
              }
              break;
          }

          inIndex += inBpp;
          outIndex += outBpp;
        }
      }

      return outData;
    };

    function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
      pxData.copy(rawData, rawPos, pxPos, pxPos + byteWidth);
    }

    function filterSumNone(pxData, pxPos, byteWidth) {

      var sum = 0;
      var length = pxPos + byteWidth;

      for (var i = pxPos; i < length; i++) {
        sum += Math.abs(pxData[i]);
      }
      return sum;
    }

    function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {

      for (var x = 0; x < byteWidth; x++) {

        var left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        var val = pxData[pxPos + x] - left;

        rawData[rawPos + x] = val;
      }
    }

    function filterSumSub(pxData, pxPos, byteWidth, bpp) {

      var sum = 0;
      for (var x = 0; x < byteWidth; x++) {

        var left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        var val = pxData[pxPos + x] - left;

        sum += Math.abs(val);
      }

      return sum;
    }

    function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {

      for (var x = 0; x < byteWidth; x++) {

        var up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        var val = pxData[pxPos + x] - up;

        rawData[rawPos + x] = val;
      }
    }

    function filterSumUp(pxData, pxPos, byteWidth) {

      var sum = 0;
      var length = pxPos + byteWidth;
      for (var x = pxPos; x < length; x++) {

        var up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        var val = pxData[x] - up;

        sum += Math.abs(val);
      }

      return sum;
    }

    function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {

      for (var x = 0; x < byteWidth; x++) {

        var left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        var up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        var val = pxData[pxPos + x] - ((left + up) >> 1);

        rawData[rawPos + x] = val;
      }
    }

    function filterSumAvg(pxData, pxPos, byteWidth, bpp) {

      var sum = 0;
      for (var x = 0; x < byteWidth; x++) {

        var left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        var up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        var val = pxData[pxPos + x] - ((left + up) >> 1);

        sum += Math.abs(val);
      }

      return sum;
    }

    function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {

      for (var x = 0; x < byteWidth; x++) {

        var left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        var up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        var upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        var val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

        rawData[rawPos + x] = val;
      }
    }

    function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
      var sum = 0;
      for (var x = 0; x < byteWidth; x++) {

        var left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        var up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        var upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        var val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

        sum += Math.abs(val);
      }

      return sum;
    }

    var filters = {
      0: filterNone,
      1: filterSub,
      2: filterUp,
      3: filterAvg,
      4: filterPaeth
    };

    var filterSums = {
      0: filterSumNone,
      1: filterSumSub,
      2: filterSumUp,
      3: filterSumAvg,
      4: filterSumPaeth
    };

    var filterPack = function(pxData, width, height, options, bpp) {

      var filterTypes;
      if (!('filterType' in options) || options.filterType === -1) {
        filterTypes = [0, 1, 2, 3, 4];
      }
      else if (typeof options.filterType === 'number') {
        filterTypes = [options.filterType];
      }
      else {
        throw new Error('unrecognised filter types');
      }

      if (options.bitDepth === 16) bpp *= 2;
      var byteWidth = width * bpp;
      var rawPos = 0;
      var pxPos = 0;
      var rawData = new Buffer((byteWidth + 1) * height);

      var sel = filterTypes[0];

      for (var y = 0; y < height; y++) {

        if (filterTypes.length > 1) {
          // find best filter for this line (with lowest sum of values)
          var min = Infinity;

          for (var i = 0; i < filterTypes.length; i++) {
            var sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
            if (sum < min) {
              sel = filterTypes[i];
              min = sum;
            }
          }
        }

        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
      }
      return rawData;
    };

    var packer = createCommonjsModule(function (module) {







    var Packer = module.exports = function(options) {
      this._options = options;

      options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
      options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
      options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
      options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
      options.deflateFactory = options.deflateFactory || zlib__default['default'].createDeflate;
      options.bitDepth = options.bitDepth || 8;
      // This is outputColorType
      options.colorType = (typeof options.colorType === 'number') ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
      options.inputColorType = (typeof options.inputColorType === 'number') ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;

      if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
      ].indexOf(options.colorType) === -1) {
        throw new Error('option color type:' + options.colorType + ' is not supported at present');
      }
      if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
      ].indexOf(options.inputColorType) === -1) {
        throw new Error('option input color type:' + options.inputColorType + ' is not supported at present');
      }
      if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error('option bit depth:' + options.bitDepth + ' is not supported at present');
      }
    };

    Packer.prototype.getDeflateOptions = function() {
      return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
      };
    };

    Packer.prototype.createDeflate = function() {
      return this._options.deflateFactory(this.getDeflateOptions());
    };

    Packer.prototype.filterData = function(data, width, height) {
      // convert to correct format for filtering (e.g. right bpp and bit depth)
      var packedData = bitpacker(data, width, height, this._options);

      // filter pixel data
      var bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
      var filteredData = filterPack(packedData, width, height, this._options, bpp);
      return filteredData;
    };

    Packer.prototype._packChunk = function(type, data) {

      var len = (data ? data.length : 0);
      var buf = new Buffer(len + 12);

      buf.writeUInt32BE(len, 0);
      buf.writeUInt32BE(type, 4);

      if (data) {
        data.copy(buf, 8);
      }

      buf.writeInt32BE(crc.crc32(buf.slice(4, buf.length - 4)), buf.length - 4);
      return buf;
    };

    Packer.prototype.packGAMA = function(gamma) {
      var buf = new Buffer(4);
      buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
      return this._packChunk(constants.TYPE_gAMA, buf);
    };

    Packer.prototype.packIHDR = function(width, height) {

      var buf = new Buffer(13);
      buf.writeUInt32BE(width, 0);
      buf.writeUInt32BE(height, 4);
      buf[8] = this._options.bitDepth; // Bit depth
      buf[9] = this._options.colorType; // colorType
      buf[10] = 0; // compression
      buf[11] = 0; // filter
      buf[12] = 0; // interlace

      return this._packChunk(constants.TYPE_IHDR, buf);
    };

    Packer.prototype.packIDAT = function(data) {
      return this._packChunk(constants.TYPE_IDAT, data);
    };

    Packer.prototype.packIEND = function() {
      return this._packChunk(constants.TYPE_IEND, null);
    };
    });

    var packerAsync = createCommonjsModule(function (module) {






    var PackerAsync = module.exports = function(opt) {
      Stream__default['default'].call(this);

      var options = opt || {};

      this._packer = new packer(options);
      this._deflate = this._packer.createDeflate();

      this.readable = true;
    };
    util__default['default'].inherits(PackerAsync, Stream__default['default']);


    PackerAsync.prototype.pack = function(data, width, height, gamma) {
      // Signature
      this.emit('data', new Buffer(constants.PNG_SIGNATURE));
      this.emit('data', this._packer.packIHDR(width, height));

      if (gamma) {
        this.emit('data', this._packer.packGAMA(gamma));
      }

      var filteredData = this._packer.filterData(data, width, height);

      // compress it
      this._deflate.on('error', this.emit.bind(this, 'error'));

      this._deflate.on('data', function(compressedData) {
        this.emit('data', this._packer.packIDAT(compressedData));
      }.bind(this));

      this._deflate.on('end', function() {
        this.emit('data', this._packer.packIEND());
        this.emit('end');
      }.bind(this));

      this._deflate.end(filteredData);
    };
    });

    var syncInflate = createCommonjsModule(function (module, exports) {

    var assert = require$$0__default$1['default'].ok;



    var kMaxLength = require$$1__default['default'].kMaxLength;

    function Inflate(opts) {
      if (!(this instanceof Inflate)) {
        return new Inflate(opts);
      }

      if (opts && opts.chunkSize < zlib__default['default'].Z_MIN_CHUNK) {
        opts.chunkSize = zlib__default['default'].Z_MIN_CHUNK;
      }

      zlib__default['default'].Inflate.call(this, opts);

      if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
      }
    }

    function createInflate(opts) {
      return new Inflate(opts);
    }

    function _close(engine, callback) {
      if (callback) {
        process.nextTick(callback);
      }

      // Caller may invoke .close after a zlib error (which will null _handle).
      if (!engine._handle) {
        return;
      }

      engine._handle.close();
      engine._handle = null;
    }

    Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
      if (typeof asyncCb === 'function') {
        return zlib__default['default'].Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
      }

      var self = this;

      var availInBefore = chunk && chunk.length;
      var availOutBefore = this._chunkSize - this._offset;
      var leftToInflate = this._maxLength;
      var inOff = 0;

      var buffers = [];
      var nread = 0;

      var error;
      this.on('error', function(err) {
        error = err;
      });

      function handleChunk(availInAfter, availOutAfter) {
        if (self._hadError) {
          return;
        }

        var have = availOutBefore - availOutAfter;
        assert(have >= 0, 'have should not go down');

        if (have > 0) {
          var out = self._buffer.slice(self._offset, self._offset + have);
          self._offset += have;

          if (out.length > leftToInflate) {
            out = out.slice(0, leftToInflate);
          }

          buffers.push(out);
          nread += out.length;
          leftToInflate -= out.length;

          if (leftToInflate === 0) {
            return false;
          }
        }

        if (availOutAfter === 0 || self._offset >= self._chunkSize) {
          availOutBefore = self._chunkSize;
          self._offset = 0;
          self._buffer = Buffer.allocUnsafe(self._chunkSize);
        }

        if (availOutAfter === 0) {
          inOff += (availInBefore - availInAfter);
          availInBefore = availInAfter;

          return true;
        }

        return false;
      }

      assert(this._handle, 'zlib binding closed');
      do {
        var res = this._handle.writeSync(flushFlag,
                                         chunk, // in
                                         inOff, // in_off
                                         availInBefore, // in_len
                                         this._buffer, // out
                                         this._offset, //out_off
                                         availOutBefore); // out_len
      } while (!this._hadError && handleChunk(res[0], res[1]));

      if (this._hadError) {
        throw error;
      }

      if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError('Cannot create final Buffer. It would be larger than 0x' + kMaxLength.toString(16) + ' bytes');
      }

      var buf = Buffer.concat(buffers, nread);
      _close(this);

      return buf;
    };

    util__default['default'].inherits(Inflate, zlib__default['default'].Inflate);

    function zlibBufferSync(engine, buffer) {
      if (typeof buffer === 'string') {
        buffer = Buffer.from(buffer);
      }
      if (!(buffer instanceof Buffer)) {
        throw new TypeError('Not a string or buffer');
      }

      var flushFlag = engine._finishFlushFlag;
      if (flushFlag == null) {
        flushFlag = zlib__default['default'].Z_FINISH;
      }

      return engine._processChunk(buffer, flushFlag);
    }

    function inflateSync(buffer, opts) {
      return zlibBufferSync(new Inflate(opts), buffer);
    }

    module.exports = exports = inflateSync;
    exports.Inflate = Inflate;
    exports.createInflate = createInflate;
    exports.inflateSync = inflateSync;
    });

    var syncReader = createCommonjsModule(function (module) {

    var SyncReader = module.exports = function(buffer) {

      this._buffer = buffer;
      this._reads = [];
    };

    SyncReader.prototype.read = function(length, callback) {

      this._reads.push({
        length: Math.abs(length),  // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
    };

    SyncReader.prototype.process = function() {

      // as long as there is any data and read requests
      while (this._reads.length > 0 && this._buffer.length) {

        var read = this._reads[0];

        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {

          // ok there is any data so that we can satisfy this request
          this._reads.shift(); // == read

          var buf = this._buffer;

          this._buffer = buf.slice(read.length);

          read.func.call(this, buf.slice(0, read.length));

        }
        else {
          break;
        }

      }

      if (this._reads.length > 0) {
        return new Error('There are some read requests waitng on finished stream');
      }

      if (this._buffer.length > 0) {
        return new Error('unrecognised content at end of stream');
      }

    };
    });

    var process$1 = function(inBuffer, bitmapInfo) {

      var outBuffers = [];
      var reader = new syncReader(inBuffer);
      var filter = new filterParse(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
          outBuffers.push(bufferPart);
        },
        complete: function() {
        }
      });

      filter.start();
      reader.process();

      return Buffer.concat(outBuffers);
    };

    var filterParseSync = {
    	process: process$1
    };

    var hasSyncZlib$1 = true;


    if (!zlib__default['default'].deflateSync) {
      hasSyncZlib$1 = false;
    }







    var parserSync = function(buffer, options) {

      if (!hasSyncZlib$1) {
        throw new Error('To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0');
      }

      var err;
      function handleError(_err_) {
        err = _err_;
      }

      var metaData;
      function handleMetaData(_metaData_) {
        metaData = _metaData_;
      }

      function handleTransColor(transColor) {
        metaData.transColor = transColor;
      }

      function handlePalette(palette) {
        metaData.palette = palette;
      }

      var gamma;
      function handleGamma(_gamma_) {
        gamma = _gamma_;
      }

      var inflateDataList = [];
      function handleInflateData(inflatedData) {
        inflateDataList.push(inflatedData);
      }

      var reader = new syncReader(buffer);

      var parser$1 = new parser(options, {
        read: reader.read.bind(reader),
        error: handleError,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData
      });

      parser$1.start();
      reader.process();

      if (err) {
        throw err;
      }

      //join together the inflate datas
      var inflateData = Buffer.concat(inflateDataList);
      inflateDataList.length = 0;

      var inflatedData;
      if (metaData.interlace) {
        inflatedData = zlib__default['default'].inflateSync(inflateData);
      } else {
        var rowSize = ((metaData.width * metaData.bpp * metaData.depth + 7) >> 3) + 1;
        var imageSize = rowSize * metaData.height;
        inflatedData = syncInflate(inflateData, { chunkSize: imageSize, maxLength: imageSize });
      }
      inflateData = null;

      if (!inflatedData || !inflatedData.length) {
        throw new Error('bad png - invalid inflate data response');
      }

      var unfilteredData = filterParseSync.process(inflatedData, metaData);
      inflateData = null;

      var bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
      unfilteredData = null;

      var normalisedBitmapData = formatNormaliser(bitmapData, metaData);

      metaData.data = normalisedBitmapData;
      metaData.gamma = gamma || 0;

      return metaData;
    };

    var hasSyncZlib = true;

    if (!zlib__default['default'].deflateSync) {
      hasSyncZlib = false;
    }



    var packerSync = function(metaData, opt) {

      if (!hasSyncZlib) {
        throw new Error('To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0');
      }

      var options = opt || {};

      var packer$1 = new packer(options);

      var chunks = [];

      // Signature
      chunks.push(new Buffer(constants.PNG_SIGNATURE));

      // Header
      chunks.push(packer$1.packIHDR(metaData.width, metaData.height));

      if (metaData.gamma) {
        chunks.push(packer$1.packGAMA(metaData.gamma));
      }

      var filteredData = packer$1.filterData(metaData.data, metaData.width, metaData.height);

      // compress it
      var compressedData = zlib__default['default'].deflateSync(filteredData, packer$1.getDeflateOptions());
      filteredData = null;

      if (!compressedData || !compressedData.length) {
        throw new Error('bad png - invalid compressed data response');
      }
      chunks.push(packer$1.packIDAT(compressedData));

      // End
      chunks.push(packer$1.packIEND());

      return Buffer.concat(chunks);
    };

    var read = function(buffer, options) {

      return parserSync(buffer, options || {});
    };

    var write = function(png, options) {

      return packerSync(png, options);
    };

    var pngSync = {
    	read: read,
    	write: write
    };

    var png = createCommonjsModule(function (module, exports) {








    var PNG = exports.PNG = function(options) {
      Stream__default['default'].call(this);

      options = options || {}; // eslint-disable-line no-param-reassign

      // coerce pixel dimensions to integers (also coerces undefined -> 0):
      this.width = options.width | 0;
      this.height = options.height | 0;

      this.data = this.width > 0 && this.height > 0 ?
        new Buffer(4 * this.width * this.height) : null;

      if (options.fill && this.data) {
        this.data.fill(0);
      }

      this.gamma = 0;
      this.readable = this.writable = true;

      this._parser = new parserAsync(options);

      this._parser.on('error', this.emit.bind(this, 'error'));
      this._parser.on('close', this._handleClose.bind(this));
      this._parser.on('metadata', this._metadata.bind(this));
      this._parser.on('gamma', this._gamma.bind(this));
      this._parser.on('parsed', function(data) {
        this.data = data;
        this.emit('parsed', data);
      }.bind(this));

      this._packer = new packerAsync(options);
      this._packer.on('data', this.emit.bind(this, 'data'));
      this._packer.on('end', this.emit.bind(this, 'end'));
      this._parser.on('close', this._handleClose.bind(this));
      this._packer.on('error', this.emit.bind(this, 'error'));

    };
    util__default['default'].inherits(PNG, Stream__default['default']);

    PNG.sync = pngSync;

    PNG.prototype.pack = function() {

      if (!this.data || !this.data.length) {
        this.emit('error', 'No data provided');
        return this;
      }

      process.nextTick(function() {
        this._packer.pack(this.data, this.width, this.height, this.gamma);
      }.bind(this));

      return this;
    };


    PNG.prototype.parse = function(data, callback) {

      if (callback) {
        var onParsed, onError;

        onParsed = function(parsedData) {
          this.removeListener('error', onError);

          this.data = parsedData;
          callback(null, this);
        }.bind(this);

        onError = function(err) {
          this.removeListener('parsed', onParsed);

          callback(err, null);
        }.bind(this);

        this.once('parsed', onParsed);
        this.once('error', onError);
      }

      this.end(data);
      return this;
    };

    PNG.prototype.write = function(data) {
      this._parser.write(data);
      return true;
    };

    PNG.prototype.end = function(data) {
      this._parser.end(data);
    };

    PNG.prototype._metadata = function(metadata) {
      this.width = metadata.width;
      this.height = metadata.height;

      this.emit('metadata', metadata);
    };

    PNG.prototype._gamma = function(gamma) {
      this.gamma = gamma;
    };

    PNG.prototype._handleClose = function() {
      if (!this._parser.writable && !this._packer.readable) {
        this.emit('close');
      }
    };


    PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) { // eslint-disable-line max-params
      // coerce pixel dimensions to integers (also coerces undefined -> 0):
      /* eslint-disable no-param-reassign */
      srcX |= 0;
      srcY |= 0;
      width |= 0;
      height |= 0;
      deltaX |= 0;
      deltaY |= 0;
      /* eslint-enable no-param-reassign */

      if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error('bitblt reading outside image');
      }

      if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error('bitblt writing outside image');
      }

      for (var y = 0; y < height; y++) {
        src.data.copy(dst.data,
          ((deltaY + y) * dst.width + deltaX) << 2,
          ((srcY + y) * src.width + srcX) << 2,
          ((srcY + y) * src.width + srcX + width) << 2
        );
      }
    };


    PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) { // eslint-disable-line max-params

      PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
      return this;
    };

    PNG.adjustGamma = function(src) {
      if (src.gamma) {
        for (var y = 0; y < src.height; y++) {
          for (var x = 0; x < src.width; x++) {
            var idx = (src.width * y + x) << 2;

            for (var i = 0; i < 3; i++) {
              var sample = src.data[idx + i] / 255;
              sample = Math.pow(sample, 1 / 2.2 / src.gamma);
              src.data[idx + i] = Math.round(sample * 255);
            }
          }
        }
        src.gamma = 0;
      }
    };

    PNG.prototype.adjustGamma = function() {
      PNG.adjustGamma(this);
    };
    });

    /*
      Copyright (c) 2008, Adobe Systems Incorporated
      All rights reserved.

      Redistribution and use in source and binary forms, with or without 
      modification, are permitted provided that the following conditions are
      met:

      * Redistributions of source code must retain the above copyright notice, 
        this list of conditions and the following disclaimer.
      
      * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the 
        documentation and/or other materials provided with the distribution.
      
      * Neither the name of Adobe Systems Incorporated nor the names of its 
        contributors may be used to endorse or promote products derived from 
        this software without specific prior written permission.

      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
      IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
      THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
      PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
      CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
      EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
      PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
      PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
      LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
      SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

    var encoder = createCommonjsModule(function (module) {

    function JPEGEncoder(quality) {
    	var ffloor = Math.floor;
    	var YTable = new Array(64);
    	var UVTable = new Array(64);
    	var fdtbl_Y = new Array(64);
    	var fdtbl_UV = new Array(64);
    	var YDC_HT;
    	var UVDC_HT;
    	var YAC_HT;
    	var UVAC_HT;
    	
    	var bitcode = new Array(65535);
    	var category = new Array(65535);
    	var outputfDCTQuant = new Array(64);
    	var DU = new Array(64);
    	var byteout = [];
    	var bytenew = 0;
    	var bytepos = 7;
    	
    	var YDU = new Array(64);
    	var UDU = new Array(64);
    	var VDU = new Array(64);
    	var clt = new Array(256);
    	var RGB_YUV_TABLE = new Array(2048);
    	var currentQuality;
    	
    	var ZigZag = [
    			 0, 1, 5, 6,14,15,27,28,
    			 2, 4, 7,13,16,26,29,42,
    			 3, 8,12,17,25,30,41,43,
    			 9,11,18,24,31,40,44,53,
    			10,19,23,32,39,45,52,54,
    			20,22,33,38,46,51,55,60,
    			21,34,37,47,50,56,59,61,
    			35,36,48,49,57,58,62,63
    		];
    	
    	var std_dc_luminance_nrcodes = [0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0];
    	var std_dc_luminance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
    	var std_ac_luminance_nrcodes = [0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,0x7d];
    	var std_ac_luminance_values = [
    			0x01,0x02,0x03,0x00,0x04,0x11,0x05,0x12,
    			0x21,0x31,0x41,0x06,0x13,0x51,0x61,0x07,
    			0x22,0x71,0x14,0x32,0x81,0x91,0xa1,0x08,
    			0x23,0x42,0xb1,0xc1,0x15,0x52,0xd1,0xf0,
    			0x24,0x33,0x62,0x72,0x82,0x09,0x0a,0x16,
    			0x17,0x18,0x19,0x1a,0x25,0x26,0x27,0x28,
    			0x29,0x2a,0x34,0x35,0x36,0x37,0x38,0x39,
    			0x3a,0x43,0x44,0x45,0x46,0x47,0x48,0x49,
    			0x4a,0x53,0x54,0x55,0x56,0x57,0x58,0x59,
    			0x5a,0x63,0x64,0x65,0x66,0x67,0x68,0x69,
    			0x6a,0x73,0x74,0x75,0x76,0x77,0x78,0x79,
    			0x7a,0x83,0x84,0x85,0x86,0x87,0x88,0x89,
    			0x8a,0x92,0x93,0x94,0x95,0x96,0x97,0x98,
    			0x99,0x9a,0xa2,0xa3,0xa4,0xa5,0xa6,0xa7,
    			0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,0xb5,0xb6,
    			0xb7,0xb8,0xb9,0xba,0xc2,0xc3,0xc4,0xc5,
    			0xc6,0xc7,0xc8,0xc9,0xca,0xd2,0xd3,0xd4,
    			0xd5,0xd6,0xd7,0xd8,0xd9,0xda,0xe1,0xe2,
    			0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,0xea,
    			0xf1,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
    			0xf9,0xfa
    		];
    	
    	var std_dc_chrominance_nrcodes = [0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0];
    	var std_dc_chrominance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
    	var std_ac_chrominance_nrcodes = [0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,0x77];
    	var std_ac_chrominance_values = [
    			0x00,0x01,0x02,0x03,0x11,0x04,0x05,0x21,
    			0x31,0x06,0x12,0x41,0x51,0x07,0x61,0x71,
    			0x13,0x22,0x32,0x81,0x08,0x14,0x42,0x91,
    			0xa1,0xb1,0xc1,0x09,0x23,0x33,0x52,0xf0,
    			0x15,0x62,0x72,0xd1,0x0a,0x16,0x24,0x34,
    			0xe1,0x25,0xf1,0x17,0x18,0x19,0x1a,0x26,
    			0x27,0x28,0x29,0x2a,0x35,0x36,0x37,0x38,
    			0x39,0x3a,0x43,0x44,0x45,0x46,0x47,0x48,
    			0x49,0x4a,0x53,0x54,0x55,0x56,0x57,0x58,
    			0x59,0x5a,0x63,0x64,0x65,0x66,0x67,0x68,
    			0x69,0x6a,0x73,0x74,0x75,0x76,0x77,0x78,
    			0x79,0x7a,0x82,0x83,0x84,0x85,0x86,0x87,
    			0x88,0x89,0x8a,0x92,0x93,0x94,0x95,0x96,
    			0x97,0x98,0x99,0x9a,0xa2,0xa3,0xa4,0xa5,
    			0xa6,0xa7,0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,
    			0xb5,0xb6,0xb7,0xb8,0xb9,0xba,0xc2,0xc3,
    			0xc4,0xc5,0xc6,0xc7,0xc8,0xc9,0xca,0xd2,
    			0xd3,0xd4,0xd5,0xd6,0xd7,0xd8,0xd9,0xda,
    			0xe2,0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,
    			0xea,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
    			0xf9,0xfa
    		];
    	
    	function initQuantTables(sf){
    			var YQT = [
    				16, 11, 10, 16, 24, 40, 51, 61,
    				12, 12, 14, 19, 26, 58, 60, 55,
    				14, 13, 16, 24, 40, 57, 69, 56,
    				14, 17, 22, 29, 51, 87, 80, 62,
    				18, 22, 37, 56, 68,109,103, 77,
    				24, 35, 55, 64, 81,104,113, 92,
    				49, 64, 78, 87,103,121,120,101,
    				72, 92, 95, 98,112,100,103, 99
    			];
    			
    			for (var i = 0; i < 64; i++) {
    				var t = ffloor((YQT[i]*sf+50)/100);
    				if (t < 1) {
    					t = 1;
    				} else if (t > 255) {
    					t = 255;
    				}
    				YTable[ZigZag[i]] = t;
    			}
    			var UVQT = [
    				17, 18, 24, 47, 99, 99, 99, 99,
    				18, 21, 26, 66, 99, 99, 99, 99,
    				24, 26, 56, 99, 99, 99, 99, 99,
    				47, 66, 99, 99, 99, 99, 99, 99,
    				99, 99, 99, 99, 99, 99, 99, 99,
    				99, 99, 99, 99, 99, 99, 99, 99,
    				99, 99, 99, 99, 99, 99, 99, 99,
    				99, 99, 99, 99, 99, 99, 99, 99
    			];
    			for (var j = 0; j < 64; j++) {
    				var u = ffloor((UVQT[j]*sf+50)/100);
    				if (u < 1) {
    					u = 1;
    				} else if (u > 255) {
    					u = 255;
    				}
    				UVTable[ZigZag[j]] = u;
    			}
    			var aasf = [
    				1.0, 1.387039845, 1.306562965, 1.175875602,
    				1.0, 0.785694958, 0.541196100, 0.275899379
    			];
    			var k = 0;
    			for (var row = 0; row < 8; row++)
    			{
    				for (var col = 0; col < 8; col++)
    				{
    					fdtbl_Y[k]  = (1.0 / (YTable [ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
    					fdtbl_UV[k] = (1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
    					k++;
    				}
    			}
    		}
    		
    		function computeHuffmanTbl(nrcodes, std_table){
    			var codevalue = 0;
    			var pos_in_table = 0;
    			var HT = new Array();
    			for (var k = 1; k <= 16; k++) {
    				for (var j = 1; j <= nrcodes[k]; j++) {
    					HT[std_table[pos_in_table]] = [];
    					HT[std_table[pos_in_table]][0] = codevalue;
    					HT[std_table[pos_in_table]][1] = k;
    					pos_in_table++;
    					codevalue++;
    				}
    				codevalue*=2;
    			}
    			return HT;
    		}
    		
    		function initHuffmanTbl()
    		{
    			YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes,std_dc_luminance_values);
    			UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes,std_dc_chrominance_values);
    			YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes,std_ac_luminance_values);
    			UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes,std_ac_chrominance_values);
    		}
    	
    		function initCategoryNumber()
    		{
    			var nrlower = 1;
    			var nrupper = 2;
    			for (var cat = 1; cat <= 15; cat++) {
    				//Positive numbers
    				for (var nr = nrlower; nr<nrupper; nr++) {
    					category[32767+nr] = cat;
    					bitcode[32767+nr] = [];
    					bitcode[32767+nr][1] = cat;
    					bitcode[32767+nr][0] = nr;
    				}
    				//Negative numbers
    				for (var nrneg =-(nrupper-1); nrneg<=-nrlower; nrneg++) {
    					category[32767+nrneg] = cat;
    					bitcode[32767+nrneg] = [];
    					bitcode[32767+nrneg][1] = cat;
    					bitcode[32767+nrneg][0] = nrupper-1+nrneg;
    				}
    				nrlower <<= 1;
    				nrupper <<= 1;
    			}
    		}
    		
    		function initRGBYUVTable() {
    			for(var i = 0; i < 256;i++) {
    				RGB_YUV_TABLE[i]      		=  19595 * i;
    				RGB_YUV_TABLE[(i+ 256)>>0] 	=  38470 * i;
    				RGB_YUV_TABLE[(i+ 512)>>0] 	=   7471 * i + 0x8000;
    				RGB_YUV_TABLE[(i+ 768)>>0] 	= -11059 * i;
    				RGB_YUV_TABLE[(i+1024)>>0] 	= -21709 * i;
    				RGB_YUV_TABLE[(i+1280)>>0] 	=  32768 * i + 0x807FFF;
    				RGB_YUV_TABLE[(i+1536)>>0] 	= -27439 * i;
    				RGB_YUV_TABLE[(i+1792)>>0] 	= - 5329 * i;
    			}
    		}
    		
    		// IO functions
    		function writeBits(bs)
    		{
    			var value = bs[0];
    			var posval = bs[1]-1;
    			while ( posval >= 0 ) {
    				if (value & (1 << posval) ) {
    					bytenew |= (1 << bytepos);
    				}
    				posval--;
    				bytepos--;
    				if (bytepos < 0) {
    					if (bytenew == 0xFF) {
    						writeByte(0xFF);
    						writeByte(0);
    					}
    					else {
    						writeByte(bytenew);
    					}
    					bytepos=7;
    					bytenew=0;
    				}
    			}
    		}
    	
    		function writeByte(value)
    		{
    			//byteout.push(clt[value]); // write char directly instead of converting later
          byteout.push(value);
    		}
    	
    		function writeWord(value)
    		{
    			writeByte((value>>8)&0xFF);
    			writeByte((value   )&0xFF);
    		}
    		
    		// DCT & quantization core
    		function fDCTQuant(data, fdtbl)
    		{
    			var d0, d1, d2, d3, d4, d5, d6, d7;
    			/* Pass 1: process rows. */
    			var dataOff=0;
    			var i;
    			var I8 = 8;
    			var I64 = 64;
    			for (i=0; i<I8; ++i)
    			{
    				d0 = data[dataOff];
    				d1 = data[dataOff+1];
    				d2 = data[dataOff+2];
    				d3 = data[dataOff+3];
    				d4 = data[dataOff+4];
    				d5 = data[dataOff+5];
    				d6 = data[dataOff+6];
    				d7 = data[dataOff+7];
    				
    				var tmp0 = d0 + d7;
    				var tmp7 = d0 - d7;
    				var tmp1 = d1 + d6;
    				var tmp6 = d1 - d6;
    				var tmp2 = d2 + d5;
    				var tmp5 = d2 - d5;
    				var tmp3 = d3 + d4;
    				var tmp4 = d3 - d4;
    	
    				/* Even part */
    				var tmp10 = tmp0 + tmp3;	/* phase 2 */
    				var tmp13 = tmp0 - tmp3;
    				var tmp11 = tmp1 + tmp2;
    				var tmp12 = tmp1 - tmp2;
    	
    				data[dataOff] = tmp10 + tmp11; /* phase 3 */
    				data[dataOff+4] = tmp10 - tmp11;
    	
    				var z1 = (tmp12 + tmp13) * 0.707106781; /* c4 */
    				data[dataOff+2] = tmp13 + z1; /* phase 5 */
    				data[dataOff+6] = tmp13 - z1;
    	
    				/* Odd part */
    				tmp10 = tmp4 + tmp5; /* phase 2 */
    				tmp11 = tmp5 + tmp6;
    				tmp12 = tmp6 + tmp7;
    	
    				/* The rotator is modified from fig 4-8 to avoid extra negations. */
    				var z5 = (tmp10 - tmp12) * 0.382683433; /* c6 */
    				var z2 = 0.541196100 * tmp10 + z5; /* c2-c6 */
    				var z4 = 1.306562965 * tmp12 + z5; /* c2+c6 */
    				var z3 = tmp11 * 0.707106781; /* c4 */
    	
    				var z11 = tmp7 + z3;	/* phase 5 */
    				var z13 = tmp7 - z3;
    	
    				data[dataOff+5] = z13 + z2;	/* phase 6 */
    				data[dataOff+3] = z13 - z2;
    				data[dataOff+1] = z11 + z4;
    				data[dataOff+7] = z11 - z4;
    	
    				dataOff += 8; /* advance pointer to next row */
    			}
    	
    			/* Pass 2: process columns. */
    			dataOff = 0;
    			for (i=0; i<I8; ++i)
    			{
    				d0 = data[dataOff];
    				d1 = data[dataOff + 8];
    				d2 = data[dataOff + 16];
    				d3 = data[dataOff + 24];
    				d4 = data[dataOff + 32];
    				d5 = data[dataOff + 40];
    				d6 = data[dataOff + 48];
    				d7 = data[dataOff + 56];
    				
    				var tmp0p2 = d0 + d7;
    				var tmp7p2 = d0 - d7;
    				var tmp1p2 = d1 + d6;
    				var tmp6p2 = d1 - d6;
    				var tmp2p2 = d2 + d5;
    				var tmp5p2 = d2 - d5;
    				var tmp3p2 = d3 + d4;
    				var tmp4p2 = d3 - d4;
    	
    				/* Even part */
    				var tmp10p2 = tmp0p2 + tmp3p2;	/* phase 2 */
    				var tmp13p2 = tmp0p2 - tmp3p2;
    				var tmp11p2 = tmp1p2 + tmp2p2;
    				var tmp12p2 = tmp1p2 - tmp2p2;
    	
    				data[dataOff] = tmp10p2 + tmp11p2; /* phase 3 */
    				data[dataOff+32] = tmp10p2 - tmp11p2;
    	
    				var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781; /* c4 */
    				data[dataOff+16] = tmp13p2 + z1p2; /* phase 5 */
    				data[dataOff+48] = tmp13p2 - z1p2;
    	
    				/* Odd part */
    				tmp10p2 = tmp4p2 + tmp5p2; /* phase 2 */
    				tmp11p2 = tmp5p2 + tmp6p2;
    				tmp12p2 = tmp6p2 + tmp7p2;
    	
    				/* The rotator is modified from fig 4-8 to avoid extra negations. */
    				var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433; /* c6 */
    				var z2p2 = 0.541196100 * tmp10p2 + z5p2; /* c2-c6 */
    				var z4p2 = 1.306562965 * tmp12p2 + z5p2; /* c2+c6 */
    				var z3p2 = tmp11p2 * 0.707106781; /* c4 */
    	
    				var z11p2 = tmp7p2 + z3p2;	/* phase 5 */
    				var z13p2 = tmp7p2 - z3p2;
    	
    				data[dataOff+40] = z13p2 + z2p2; /* phase 6 */
    				data[dataOff+24] = z13p2 - z2p2;
    				data[dataOff+ 8] = z11p2 + z4p2;
    				data[dataOff+56] = z11p2 - z4p2;
    	
    				dataOff++; /* advance pointer to next column */
    			}
    	
    			// Quantize/descale the coefficients
    			var fDCTQuant;
    			for (i=0; i<I64; ++i)
    			{
    				// Apply the quantization and scaling factor & Round to nearest integer
    				fDCTQuant = data[i]*fdtbl[i];
    				outputfDCTQuant[i] = (fDCTQuant > 0.0) ? ((fDCTQuant + 0.5)|0) : ((fDCTQuant - 0.5)|0);
    				//outputfDCTQuant[i] = fround(fDCTQuant);

    			}
    			return outputfDCTQuant;
    		}
    		
    		function writeAPP0()
    		{
    			writeWord(0xFFE0); // marker
    			writeWord(16); // length
    			writeByte(0x4A); // J
    			writeByte(0x46); // F
    			writeByte(0x49); // I
    			writeByte(0x46); // F
    			writeByte(0); // = "JFIF",'\0'
    			writeByte(1); // versionhi
    			writeByte(1); // versionlo
    			writeByte(0); // xyunits
    			writeWord(1); // xdensity
    			writeWord(1); // ydensity
    			writeByte(0); // thumbnwidth
    			writeByte(0); // thumbnheight
    		}

    		function writeAPP1(exifBuffer) {
    			if (!exifBuffer) return;

    			writeWord(0xFFE1); // APP1 marker

    			if (exifBuffer[0] === 0x45 &&
    					exifBuffer[1] === 0x78 &&
    					exifBuffer[2] === 0x69 &&
    					exifBuffer[3] === 0x66) {
    				// Buffer already starts with EXIF, just use it directly
    				writeWord(exifBuffer.length + 2); // length is buffer + length itself!
    			} else {
    				// Buffer doesn't start with EXIF, write it for them
    				writeWord(exifBuffer.length + 5 + 2); // length is buffer + EXIF\0 + length itself!
    				writeByte(0x45); // E
    				writeByte(0x78); // X
    				writeByte(0x69); // I
    				writeByte(0x66); // F
    				writeByte(0); // = "EXIF",'\0'
    			}

    			for (var i = 0; i < exifBuffer.length; i++) {
    				writeByte(exifBuffer[i]);
    			}
    		}

    		function writeSOF0(width, height)
    		{
    			writeWord(0xFFC0); // marker
    			writeWord(17);   // length, truecolor YUV JPG
    			writeByte(8);    // precision
    			writeWord(height);
    			writeWord(width);
    			writeByte(3);    // nrofcomponents
    			writeByte(1);    // IdY
    			writeByte(0x11); // HVY
    			writeByte(0);    // QTY
    			writeByte(2);    // IdU
    			writeByte(0x11); // HVU
    			writeByte(1);    // QTU
    			writeByte(3);    // IdV
    			writeByte(0x11); // HVV
    			writeByte(1);    // QTV
    		}
    	
    		function writeDQT()
    		{
    			writeWord(0xFFDB); // marker
    			writeWord(132);	   // length
    			writeByte(0);
    			for (var i=0; i<64; i++) {
    				writeByte(YTable[i]);
    			}
    			writeByte(1);
    			for (var j=0; j<64; j++) {
    				writeByte(UVTable[j]);
    			}
    		}
    	
    		function writeDHT()
    		{
    			writeWord(0xFFC4); // marker
    			writeWord(0x01A2); // length
    	
    			writeByte(0); // HTYDCinfo
    			for (var i=0; i<16; i++) {
    				writeByte(std_dc_luminance_nrcodes[i+1]);
    			}
    			for (var j=0; j<=11; j++) {
    				writeByte(std_dc_luminance_values[j]);
    			}
    	
    			writeByte(0x10); // HTYACinfo
    			for (var k=0; k<16; k++) {
    				writeByte(std_ac_luminance_nrcodes[k+1]);
    			}
    			for (var l=0; l<=161; l++) {
    				writeByte(std_ac_luminance_values[l]);
    			}
    	
    			writeByte(1); // HTUDCinfo
    			for (var m=0; m<16; m++) {
    				writeByte(std_dc_chrominance_nrcodes[m+1]);
    			}
    			for (var n=0; n<=11; n++) {
    				writeByte(std_dc_chrominance_values[n]);
    			}
    	
    			writeByte(0x11); // HTUACinfo
    			for (var o=0; o<16; o++) {
    				writeByte(std_ac_chrominance_nrcodes[o+1]);
    			}
    			for (var p=0; p<=161; p++) {
    				writeByte(std_ac_chrominance_values[p]);
    			}
    		}
    	
    		function writeSOS()
    		{
    			writeWord(0xFFDA); // marker
    			writeWord(12); // length
    			writeByte(3); // nrofcomponents
    			writeByte(1); // IdY
    			writeByte(0); // HTY
    			writeByte(2); // IdU
    			writeByte(0x11); // HTU
    			writeByte(3); // IdV
    			writeByte(0x11); // HTV
    			writeByte(0); // Ss
    			writeByte(0x3f); // Se
    			writeByte(0); // Bf
    		}
    		
    		function processDU(CDU, fdtbl, DC, HTDC, HTAC){
    			var EOB = HTAC[0x00];
    			var M16zeroes = HTAC[0xF0];
    			var pos;
    			var I16 = 16;
    			var I63 = 63;
    			var I64 = 64;
    			var DU_DCT = fDCTQuant(CDU, fdtbl);
    			//ZigZag reorder
    			for (var j=0;j<I64;++j) {
    				DU[ZigZag[j]]=DU_DCT[j];
    			}
    			var Diff = DU[0] - DC; DC = DU[0];
    			//Encode DC
    			if (Diff==0) {
    				writeBits(HTDC[0]); // Diff might be 0
    			} else {
    				pos = 32767+Diff;
    				writeBits(HTDC[category[pos]]);
    				writeBits(bitcode[pos]);
    			}
    			//Encode ACs
    			var end0pos = 63; // was const... which is crazy
    			for (; (end0pos>0)&&(DU[end0pos]==0); end0pos--) {}			//end0pos = first element in reverse order !=0
    			if ( end0pos == 0) {
    				writeBits(EOB);
    				return DC;
    			}
    			var i = 1;
    			var lng;
    			while ( i <= end0pos ) {
    				var startpos = i;
    				for (; (DU[i]==0) && (i<=end0pos); ++i) {}
    				var nrzeroes = i-startpos;
    				if ( nrzeroes >= I16 ) {
    					lng = nrzeroes>>4;
    					for (var nrmarker=1; nrmarker <= lng; ++nrmarker)
    						writeBits(M16zeroes);
    					nrzeroes = nrzeroes&0xF;
    				}
    				pos = 32767+DU[i];
    				writeBits(HTAC[(nrzeroes<<4)+category[pos]]);
    				writeBits(bitcode[pos]);
    				i++;
    			}
    			if ( end0pos != I63 ) {
    				writeBits(EOB);
    			}
    			return DC;
    		}

    		function initCharLookupTable(){
    			var sfcc = String.fromCharCode;
    			for(var i=0; i < 256; i++){ ///// ACHTUNG // 255
    				clt[i] = sfcc(i);
    			}
    		}
    		
    		this.encode = function(image,quality) // image data object
    		{
    			new Date().getTime();
    			
    			if(quality) setQuality(quality);
    			
    			// Initialize bit writer
    			byteout = new Array();
    			bytenew=0;
    			bytepos=7;
    	
    			// Add JPEG headers
    			writeWord(0xFFD8); // SOI
    			writeAPP0();
    			writeAPP1(image.exifBuffer);
    			writeDQT();
    			writeSOF0(image.width,image.height);
    			writeDHT();
    			writeSOS();

    	
    			// Encode 8x8 macroblocks
    			var DCY=0;
    			var DCU=0;
    			var DCV=0;
    			
    			bytenew=0;
    			bytepos=7;
    			
    			
    			this.encode.displayName = "_encode_";

    			var imageData = image.data;
    			var width = image.width;
    			var height = image.height;

    			var quadWidth = width*4;
    			
    			var x, y = 0;
    			var r, g, b;
    			var start,p, col,row,pos;
    			while(y < height){
    				x = 0;
    				while(x < quadWidth){
    				start = quadWidth * y + x;
    				p = start;
    				col = -1;
    				row = 0;
    				
    				for(pos=0; pos < 64; pos++){
    					row = pos >> 3;// /8
    					col = ( pos & 7 ) * 4; // %8
    					p = start + ( row * quadWidth ) + col;		
    					
    					if(y+row >= height){ // padding bottom
    						p-= (quadWidth*(y+1+row-height));
    					}

    					if(x+col >= quadWidth){ // padding right	
    						p-= ((x+col) - quadWidth +4);
    					}
    					
    					r = imageData[ p++ ];
    					g = imageData[ p++ ];
    					b = imageData[ p++ ];
    					
    					
    					/* // calculate YUV values dynamically
    					YDU[pos]=((( 0.29900)*r+( 0.58700)*g+( 0.11400)*b))-128; //-0x80
    					UDU[pos]=(((-0.16874)*r+(-0.33126)*g+( 0.50000)*b));
    					VDU[pos]=((( 0.50000)*r+(-0.41869)*g+(-0.08131)*b));
    					*/
    					
    					// use lookup table (slightly faster)
    					YDU[pos] = ((RGB_YUV_TABLE[r]             + RGB_YUV_TABLE[(g +  256)>>0] + RGB_YUV_TABLE[(b +  512)>>0]) >> 16)-128;
    					UDU[pos] = ((RGB_YUV_TABLE[(r +  768)>>0] + RGB_YUV_TABLE[(g + 1024)>>0] + RGB_YUV_TABLE[(b + 1280)>>0]) >> 16)-128;
    					VDU[pos] = ((RGB_YUV_TABLE[(r + 1280)>>0] + RGB_YUV_TABLE[(g + 1536)>>0] + RGB_YUV_TABLE[(b + 1792)>>0]) >> 16)-128;

    				}
    				
    				DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
    				DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
    				DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
    				x+=32;
    				}
    				y+=8;
    			}
    			
    			
    			////////////////////////////////////////////////////////////////
    	
    			// Do the bit alignment of the EOI marker
    			if ( bytepos >= 0 ) {
    				var fillbits = [];
    				fillbits[1] = bytepos+1;
    				fillbits[0] = (1<<(bytepos+1))-1;
    				writeBits(fillbits);
    			}
    	
    			writeWord(0xFFD9); //EOI
          return new Buffer(byteout);
    	};
    	
    	function setQuality(quality){
    		if (quality <= 0) {
    			quality = 1;
    		}
    		if (quality > 100) {
    			quality = 100;
    		}
    		
    		if(currentQuality == quality) return // don't recalc if unchanged
    		
    		var sf = 0;
    		if (quality < 50) {
    			sf = Math.floor(5000 / quality);
    		} else {
    			sf = Math.floor(200 - quality*2);
    		}
    		
    		initQuantTables(sf);
    		currentQuality = quality;
    		//console.log('Quality set to: '+quality +'%');
    	}
    	
    	function init(){
    		var time_start = new Date().getTime();
    		if(!quality) quality = 50;
    		// Create tables
    		initCharLookupTable();
    		initHuffmanTbl();
    		initCategoryNumber();
    		initRGBYUVTable();
    		
    		setQuality(quality);
    		new Date().getTime() - time_start;
        	//console.log('Initialization '+ duration + 'ms');
    	}
    	
    	init();
    	
    }
    {
    	module.exports = encode;
    }

    function encode(imgData, qu) {
      if (typeof qu === 'undefined') qu = 50;
      var encoder = new JPEGEncoder(qu);
    	var data = encoder.encode(imgData, qu);
      return {
        data: data,
        width: imgData.width,
        height: imgData.height
      };
    }
    });

    /* -*- tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
    /* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

    var decoder = createCommonjsModule(function (module) {
    /*
       Copyright 2011 notmasteryet

       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    */

    // - The JPEG specification can be found in the ITU CCITT Recommendation T.81
    //   (www.w3.org/Graphics/JPEG/itu-t81.pdf)
    // - The JFIF specification can be found in the JPEG File Interchange Format
    //   (www.w3.org/Graphics/JPEG/jfif3.pdf)
    // - The Adobe Application-Specific JPEG markers in the Supporting the DCT Filters
    //   in PostScript Level 2, Technical Note #5116
    //   (partners.adobe.com/public/developer/en/ps/sdk/5116.DCT_Filter.pdf)

    var JpegImage = (function jpegImage() {
      var dctZigZag = new Int32Array([
         0,
         1,  8,
        16,  9,  2,
         3, 10, 17, 24,
        32, 25, 18, 11, 4,
         5, 12, 19, 26, 33, 40,
        48, 41, 34, 27, 20, 13,  6,
         7, 14, 21, 28, 35, 42, 49, 56,
        57, 50, 43, 36, 29, 22, 15,
        23, 30, 37, 44, 51, 58,
        59, 52, 45, 38, 31,
        39, 46, 53, 60,
        61, 54, 47,
        55, 62,
        63
      ]);

      var dctCos1  =  4017;   // cos(pi/16)
      var dctSin1  =   799;   // sin(pi/16)
      var dctCos3  =  3406;   // cos(3*pi/16)
      var dctSin3  =  2276;   // sin(3*pi/16)
      var dctCos6  =  1567;   // cos(6*pi/16)
      var dctSin6  =  3784;   // sin(6*pi/16)
      var dctSqrt2 =  5793;   // sqrt(2)
      var dctSqrt1d2 = 2896;  // sqrt(2) / 2

      function constructor() {
      }

      function buildHuffmanTable(codeLengths, values) {
        var k = 0, code = [], i, j, length = 16;
        while (length > 0 && !codeLengths[length - 1])
          length--;
        code.push({children: [], index: 0});
        var p = code[0], q;
        for (i = 0; i < length; i++) {
          for (j = 0; j < codeLengths[i]; j++) {
            p = code.pop();
            p.children[p.index] = values[k];
            while (p.index > 0) {
              if (code.length === 0)
                throw new Error('Could not recreate Huffman Table');
              p = code.pop();
            }
            p.index++;
            code.push(p);
            while (code.length <= i) {
              code.push(q = {children: [], index: 0});
              p.children[p.index] = q.children;
              p = q;
            }
            k++;
          }
          if (i + 1 < length) {
            // p here points to last code
            code.push(q = {children: [], index: 0});
            p.children[p.index] = q.children;
            p = q;
          }
        }
        return code[0].children;
      }

      function decodeScan(data, offset,
                          frame, components, resetInterval,
                          spectralStart, spectralEnd,
                          successivePrev, successive, opts) {
        frame.precision;
        frame.samplesPerLine;
        frame.scanLines;
        var mcusPerLine = frame.mcusPerLine;
        var progressive = frame.progressive;
        frame.maxH; frame.maxV;

        var startOffset = offset, bitsData = 0, bitsCount = 0;
        function readBit() {
          if (bitsCount > 0) {
            bitsCount--;
            return (bitsData >> bitsCount) & 1;
          }
          bitsData = data[offset++];
          if (bitsData == 0xFF) {
            var nextByte = data[offset++];
            if (nextByte) {
              throw new Error("unexpected marker: " + ((bitsData << 8) | nextByte).toString(16));
            }
            // unstuff 0
          }
          bitsCount = 7;
          return bitsData >>> 7;
        }
        function decodeHuffman(tree) {
          var node = tree, bit;
          while ((bit = readBit()) !== null) {
            node = node[bit];
            if (typeof node === 'number')
              return node;
            if (typeof node !== 'object')
              throw new Error("invalid huffman sequence");
          }
          return null;
        }
        function receive(length) {
          var n = 0;
          while (length > 0) {
            var bit = readBit();
            if (bit === null) return;
            n = (n << 1) | bit;
            length--;
          }
          return n;
        }
        function receiveAndExtend(length) {
          var n = receive(length);
          if (n >= 1 << (length - 1))
            return n;
          return n + (-1 << length) + 1;
        }
        function decodeBaseline(component, zz) {
          var t = decodeHuffman(component.huffmanTableDC);
          var diff = t === 0 ? 0 : receiveAndExtend(t);
          zz[0]= (component.pred += diff);
          var k = 1;
          while (k < 64) {
            var rs = decodeHuffman(component.huffmanTableAC);
            var s = rs & 15, r = rs >> 4;
            if (s === 0) {
              if (r < 15)
                break;
              k += 16;
              continue;
            }
            k += r;
            var z = dctZigZag[k];
            zz[z] = receiveAndExtend(s);
            k++;
          }
        }
        function decodeDCFirst(component, zz) {
          var t = decodeHuffman(component.huffmanTableDC);
          var diff = t === 0 ? 0 : (receiveAndExtend(t) << successive);
          zz[0] = (component.pred += diff);
        }
        function decodeDCSuccessive(component, zz) {
          zz[0] |= readBit() << successive;
        }
        var eobrun = 0;
        function decodeACFirst(component, zz) {
          if (eobrun > 0) {
            eobrun--;
            return;
          }
          var k = spectralStart, e = spectralEnd;
          while (k <= e) {
            var rs = decodeHuffman(component.huffmanTableAC);
            var s = rs & 15, r = rs >> 4;
            if (s === 0) {
              if (r < 15) {
                eobrun = receive(r) + (1 << r) - 1;
                break;
              }
              k += 16;
              continue;
            }
            k += r;
            var z = dctZigZag[k];
            zz[z] = receiveAndExtend(s) * (1 << successive);
            k++;
          }
        }
        var successiveACState = 0, successiveACNextValue;
        function decodeACSuccessive(component, zz) {
          var k = spectralStart, e = spectralEnd, r = 0;
          while (k <= e) {
            var z = dctZigZag[k];
            var direction = zz[z] < 0 ? -1 : 1;
            switch (successiveACState) {
            case 0: // initial state
              var rs = decodeHuffman(component.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15) {
                  eobrun = receive(r) + (1 << r);
                  successiveACState = 4;
                } else {
                  r = 16;
                  successiveACState = 1;
                }
              } else {
                if (s !== 1)
                  throw new Error("invalid ACn encoding");
                successiveACNextValue = receiveAndExtend(s);
                successiveACState = r ? 2 : 3;
              }
              continue;
            case 1: // skipping r zero items
            case 2:
              if (zz[z])
                zz[z] += (readBit() << successive) * direction;
              else {
                r--;
                if (r === 0)
                  successiveACState = successiveACState == 2 ? 3 : 0;
              }
              break;
            case 3: // set value for a zero item
              if (zz[z])
                zz[z] += (readBit() << successive) * direction;
              else {
                zz[z] = successiveACNextValue << successive;
                successiveACState = 0;
              }
              break;
            case 4: // eob
              if (zz[z])
                zz[z] += (readBit() << successive) * direction;
              break;
            }
            k++;
          }
          if (successiveACState === 4) {
            eobrun--;
            if (eobrun === 0)
              successiveACState = 0;
          }
        }
        function decodeMcu(component, decode, mcu, row, col) {
          var mcuRow = (mcu / mcusPerLine) | 0;
          var mcuCol = mcu % mcusPerLine;
          var blockRow = mcuRow * component.v + row;
          var blockCol = mcuCol * component.h + col;
          // If the block is missing and we're in tolerant mode, just skip it.
          if (component.blocks[blockRow] === undefined && opts.tolerantDecoding)
            return;
          decode(component, component.blocks[blockRow][blockCol]);
        }
        function decodeBlock(component, decode, mcu) {
          var blockRow = (mcu / component.blocksPerLine) | 0;
          var blockCol = mcu % component.blocksPerLine;
          // If the block is missing and we're in tolerant mode, just skip it.
          if (component.blocks[blockRow] === undefined && opts.tolerantDecoding)
            return;
          decode(component, component.blocks[blockRow][blockCol]);
        }

        var componentsLength = components.length;
        var component, i, j, k, n;
        var decodeFn;
        if (progressive) {
          if (spectralStart === 0)
            decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
          else
            decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
        } else {
          decodeFn = decodeBaseline;
        }

        var mcu = 0, marker;
        var mcuExpected;
        if (componentsLength == 1) {
          mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
        } else {
          mcuExpected = mcusPerLine * frame.mcusPerColumn;
        }
        if (!resetInterval) resetInterval = mcuExpected;

        var h, v;
        while (mcu < mcuExpected) {
          // reset interval stuff
          for (i = 0; i < componentsLength; i++)
            components[i].pred = 0;
          eobrun = 0;

          if (componentsLength == 1) {
            component = components[0];
            for (n = 0; n < resetInterval; n++) {
              decodeBlock(component, decodeFn, mcu);
              mcu++;
            }
          } else {
            for (n = 0; n < resetInterval; n++) {
              for (i = 0; i < componentsLength; i++) {
                component = components[i];
                h = component.h;
                v = component.v;
                for (j = 0; j < v; j++) {
                  for (k = 0; k < h; k++) {
                    decodeMcu(component, decodeFn, mcu, j, k);
                  }
                }
              }
              mcu++;

              // If we've reached our expected MCU's, stop decoding
              if (mcu === mcuExpected) break;
            }
          }

          if (mcu === mcuExpected) {
            // Skip trailing bytes at the end of the scan - until we reach the next marker
            do {
              if (data[offset] === 0xFF) {
                if (data[offset + 1] !== 0x00) {
                  break;
                }
              }
              offset += 1;
            } while (offset < data.length - 2);
          }

          // find marker
          bitsCount = 0;
          marker = (data[offset] << 8) | data[offset + 1];
          if (marker < 0xFF00) {
            throw new Error("marker was not found");
          }

          if (marker >= 0xFFD0 && marker <= 0xFFD7) { // RSTx
            offset += 2;
          }
          else
            break;
        }

        return offset - startOffset;
      }

      function buildComponentData(frame, component) {
        var lines = [];
        var blocksPerLine = component.blocksPerLine;
        var blocksPerColumn = component.blocksPerColumn;
        var samplesPerLine = blocksPerLine << 3;
        // Only 1 used per invocation of this function and garbage collected after invocation, so no need to account for its memory footprint.
        var R = new Int32Array(64), r = new Uint8Array(64);

        // A port of poppler's IDCT method which in turn is taken from:
        //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
        //   "Practical Fast 1-D DCT Algorithms with 11 Multiplications",
        //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
        //   988-991.
        function quantizeAndInverse(zz, dataOut, dataIn) {
          var qt = component.quantizationTable;
          var v0, v1, v2, v3, v4, v5, v6, v7, t;
          var p = dataIn;
          var i;

          // dequant
          for (i = 0; i < 64; i++)
            p[i] = zz[i] * qt[i];

          // inverse DCT on rows
          for (i = 0; i < 8; ++i) {
            var row = 8 * i;

            // check for all-zero AC coefficients
            if (p[1 + row] == 0 && p[2 + row] == 0 && p[3 + row] == 0 &&
                p[4 + row] == 0 && p[5 + row] == 0 && p[6 + row] == 0 &&
                p[7 + row] == 0) {
              t = (dctSqrt2 * p[0 + row] + 512) >> 10;
              p[0 + row] = t;
              p[1 + row] = t;
              p[2 + row] = t;
              p[3 + row] = t;
              p[4 + row] = t;
              p[5 + row] = t;
              p[6 + row] = t;
              p[7 + row] = t;
              continue;
            }

            // stage 4
            v0 = (dctSqrt2 * p[0 + row] + 128) >> 8;
            v1 = (dctSqrt2 * p[4 + row] + 128) >> 8;
            v2 = p[2 + row];
            v3 = p[6 + row];
            v4 = (dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128) >> 8;
            v7 = (dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128) >> 8;
            v5 = p[3 + row] << 4;
            v6 = p[5 + row] << 4;

            // stage 3
            t = (v0 - v1+ 1) >> 1;
            v0 = (v0 + v1 + 1) >> 1;
            v1 = t;
            t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
            v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
            v3 = t;
            t = (v4 - v6 + 1) >> 1;
            v4 = (v4 + v6 + 1) >> 1;
            v6 = t;
            t = (v7 + v5 + 1) >> 1;
            v5 = (v7 - v5 + 1) >> 1;
            v7 = t;

            // stage 2
            t = (v0 - v3 + 1) >> 1;
            v0 = (v0 + v3 + 1) >> 1;
            v3 = t;
            t = (v1 - v2 + 1) >> 1;
            v1 = (v1 + v2 + 1) >> 1;
            v2 = t;
            t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
            v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
            v7 = t;
            t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
            v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
            v6 = t;

            // stage 1
            p[0 + row] = v0 + v7;
            p[7 + row] = v0 - v7;
            p[1 + row] = v1 + v6;
            p[6 + row] = v1 - v6;
            p[2 + row] = v2 + v5;
            p[5 + row] = v2 - v5;
            p[3 + row] = v3 + v4;
            p[4 + row] = v3 - v4;
          }

          // inverse DCT on columns
          for (i = 0; i < 8; ++i) {
            var col = i;

            // check for all-zero AC coefficients
            if (p[1*8 + col] == 0 && p[2*8 + col] == 0 && p[3*8 + col] == 0 &&
                p[4*8 + col] == 0 && p[5*8 + col] == 0 && p[6*8 + col] == 0 &&
                p[7*8 + col] == 0) {
              t = (dctSqrt2 * dataIn[i+0] + 8192) >> 14;
              p[0*8 + col] = t;
              p[1*8 + col] = t;
              p[2*8 + col] = t;
              p[3*8 + col] = t;
              p[4*8 + col] = t;
              p[5*8 + col] = t;
              p[6*8 + col] = t;
              p[7*8 + col] = t;
              continue;
            }

            // stage 4
            v0 = (dctSqrt2 * p[0*8 + col] + 2048) >> 12;
            v1 = (dctSqrt2 * p[4*8 + col] + 2048) >> 12;
            v2 = p[2*8 + col];
            v3 = p[6*8 + col];
            v4 = (dctSqrt1d2 * (p[1*8 + col] - p[7*8 + col]) + 2048) >> 12;
            v7 = (dctSqrt1d2 * (p[1*8 + col] + p[7*8 + col]) + 2048) >> 12;
            v5 = p[3*8 + col];
            v6 = p[5*8 + col];

            // stage 3
            t = (v0 - v1 + 1) >> 1;
            v0 = (v0 + v1 + 1) >> 1;
            v1 = t;
            t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
            v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
            v3 = t;
            t = (v4 - v6 + 1) >> 1;
            v4 = (v4 + v6 + 1) >> 1;
            v6 = t;
            t = (v7 + v5 + 1) >> 1;
            v5 = (v7 - v5 + 1) >> 1;
            v7 = t;

            // stage 2
            t = (v0 - v3 + 1) >> 1;
            v0 = (v0 + v3 + 1) >> 1;
            v3 = t;
            t = (v1 - v2 + 1) >> 1;
            v1 = (v1 + v2 + 1) >> 1;
            v2 = t;
            t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
            v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
            v7 = t;
            t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
            v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
            v6 = t;

            // stage 1
            p[0*8 + col] = v0 + v7;
            p[7*8 + col] = v0 - v7;
            p[1*8 + col] = v1 + v6;
            p[6*8 + col] = v1 - v6;
            p[2*8 + col] = v2 + v5;
            p[5*8 + col] = v2 - v5;
            p[3*8 + col] = v3 + v4;
            p[4*8 + col] = v3 - v4;
          }

          // convert to 8-bit integers
          for (i = 0; i < 64; ++i) {
            var sample = 128 + ((p[i] + 8) >> 4);
            dataOut[i] = sample < 0 ? 0 : sample > 0xFF ? 0xFF : sample;
          }
        }

        requestMemoryAllocation(samplesPerLine * blocksPerColumn * 8);

        var i, j;
        for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
          var scanLine = blockRow << 3;
          for (i = 0; i < 8; i++)
            lines.push(new Uint8Array(samplesPerLine));
          for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
            quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);

            var offset = 0, sample = blockCol << 3;
            for (j = 0; j < 8; j++) {
              var line = lines[scanLine + j];
              for (i = 0; i < 8; i++)
                line[sample + i] = r[offset++];
            }
          }
        }
        return lines;
      }

      function clampTo8bit(a) {
        return a < 0 ? 0 : a > 255 ? 255 : a;
      }

      constructor.prototype = {
        load: function load(path) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", path, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = (function() {
            // TODO catch parse error
            var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
            this.parse(data);
            if (this.onload)
              this.onload();
          }).bind(this);
          xhr.send(null);
        },
        parse: function parse(data) {
          var maxResolutionInPixels = this.opts.maxResolutionInMP * 1000 * 1000;
          var offset = 0; data.length;
          function readUint16() {
            var value = (data[offset] << 8) | data[offset + 1];
            offset += 2;
            return value;
          }
          function readDataBlock() {
            var length = readUint16();
            var array = data.subarray(offset, offset + length - 2);
            offset += array.length;
            return array;
          }
          function prepareComponents(frame) {
            var maxH = 0, maxV = 0;
            var component, componentId;
            for (componentId in frame.components) {
              if (frame.components.hasOwnProperty(componentId)) {
                component = frame.components[componentId];
                if (maxH < component.h) maxH = component.h;
                if (maxV < component.v) maxV = component.v;
              }
            }
            var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
            var mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);
            for (componentId in frame.components) {
              if (frame.components.hasOwnProperty(componentId)) {
                component = frame.components[componentId];
                var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
                var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines  / 8) * component.v / maxV);
                var blocksPerLineForMcu = mcusPerLine * component.h;
                var blocksPerColumnForMcu = mcusPerColumn * component.v;
                var blocksToAllocate = blocksPerColumnForMcu * blocksPerLineForMcu;
                var blocks = [];

                // Each block is a Int32Array of length 64 (4 x 64 = 256 bytes)
                requestMemoryAllocation(blocksToAllocate * 256);

                for (var i = 0; i < blocksPerColumnForMcu; i++) {
                  var row = [];
                  for (var j = 0; j < blocksPerLineForMcu; j++)
                    row.push(new Int32Array(64));
                  blocks.push(row);
                }
                component.blocksPerLine = blocksPerLine;
                component.blocksPerColumn = blocksPerColumn;
                component.blocks = blocks;
              }
            }
            frame.maxH = maxH;
            frame.maxV = maxV;
            frame.mcusPerLine = mcusPerLine;
            frame.mcusPerColumn = mcusPerColumn;
          }
          var jfif = null;
          var adobe = null;
          var frame, resetInterval;
          var quantizationTables = [], frames = [];
          var huffmanTablesAC = [], huffmanTablesDC = [];
          var fileMarker = readUint16();
          this.comments = [];
          if (fileMarker != 0xFFD8) { // SOI (Start of Image)
            throw new Error("SOI not found");
          }

          fileMarker = readUint16();
          while (fileMarker != 0xFFD9) { // EOI (End of image)
            var i, j;
            switch(fileMarker) {
              case 0xFF00: break;
              case 0xFFE0: // APP0 (Application Specific)
              case 0xFFE1: // APP1
              case 0xFFE2: // APP2
              case 0xFFE3: // APP3
              case 0xFFE4: // APP4
              case 0xFFE5: // APP5
              case 0xFFE6: // APP6
              case 0xFFE7: // APP7
              case 0xFFE8: // APP8
              case 0xFFE9: // APP9
              case 0xFFEA: // APP10
              case 0xFFEB: // APP11
              case 0xFFEC: // APP12
              case 0xFFED: // APP13
              case 0xFFEE: // APP14
              case 0xFFEF: // APP15
              case 0xFFFE: // COM (Comment)
                var appData = readDataBlock();

                if (fileMarker === 0xFFFE) {
                  var comment = String.fromCharCode.apply(null, appData);
                  this.comments.push(comment);
                }

                if (fileMarker === 0xFFE0) {
                  if (appData[0] === 0x4A && appData[1] === 0x46 && appData[2] === 0x49 &&
                    appData[3] === 0x46 && appData[4] === 0) { // 'JFIF\x00'
                    jfif = {
                      version: { major: appData[5], minor: appData[6] },
                      densityUnits: appData[7],
                      xDensity: (appData[8] << 8) | appData[9],
                      yDensity: (appData[10] << 8) | appData[11],
                      thumbWidth: appData[12],
                      thumbHeight: appData[13],
                      thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                    };
                  }
                }
                // TODO APP1 - Exif
                if (fileMarker === 0xFFE1) {
                  if (appData[0] === 0x45 &&
                    appData[1] === 0x78 &&
                    appData[2] === 0x69 &&
                    appData[3] === 0x66 &&
                    appData[4] === 0) { // 'EXIF\x00'
                    this.exifBuffer = appData.subarray(5, appData.length);
                  }
                }

                if (fileMarker === 0xFFEE) {
                  if (appData[0] === 0x41 && appData[1] === 0x64 && appData[2] === 0x6F &&
                    appData[3] === 0x62 && appData[4] === 0x65 && appData[5] === 0) { // 'Adobe\x00'
                    adobe = {
                      version: appData[6],
                      flags0: (appData[7] << 8) | appData[8],
                      flags1: (appData[9] << 8) | appData[10],
                      transformCode: appData[11]
                    };
                  }
                }
                break;

              case 0xFFDB: // DQT (Define Quantization Tables)
                var quantizationTablesLength = readUint16();
                var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                while (offset < quantizationTablesEnd) {
                  var quantizationTableSpec = data[offset++];
                  requestMemoryAllocation(64 * 4);
                  var tableData = new Int32Array(64);
                  if ((quantizationTableSpec >> 4) === 0) { // 8 bit values
                    for (j = 0; j < 64; j++) {
                      var z = dctZigZag[j];
                      tableData[z] = data[offset++];
                    }
                  } else if ((quantizationTableSpec >> 4) === 1) { //16 bit
                    for (j = 0; j < 64; j++) {
                      var z = dctZigZag[j];
                      tableData[z] = readUint16();
                    }
                  } else
                    throw new Error("DQT: invalid table spec");
                  quantizationTables[quantizationTableSpec & 15] = tableData;
                }
                break;

              case 0xFFC0: // SOF0 (Start of Frame, Baseline DCT)
              case 0xFFC1: // SOF1 (Start of Frame, Extended DCT)
              case 0xFFC2: // SOF2 (Start of Frame, Progressive DCT)
                readUint16(); // skip data length
                frame = {};
                frame.extended = (fileMarker === 0xFFC1);
                frame.progressive = (fileMarker === 0xFFC2);
                frame.precision = data[offset++];
                frame.scanLines = readUint16();
                frame.samplesPerLine = readUint16();
                frame.components = {};
                frame.componentsOrder = [];

                var pixelsInFrame = frame.scanLines * frame.samplesPerLine;
                if (pixelsInFrame > maxResolutionInPixels) {
                  var exceededAmount = Math.ceil((pixelsInFrame - maxResolutionInPixels) / 1e6);
                  throw new Error(`maxResolutionInMP limit exceeded by ${exceededAmount}MP`);
                }

                var componentsCount = data[offset++], componentId;
                for (i = 0; i < componentsCount; i++) {
                  componentId = data[offset];
                  var h = data[offset + 1] >> 4;
                  var v = data[offset + 1] & 15;
                  var qId = data[offset + 2];
                  frame.componentsOrder.push(componentId);
                  frame.components[componentId] = {
                    h: h,
                    v: v,
                    quantizationIdx: qId
                  };
                  offset += 3;
                }
                prepareComponents(frame);
                frames.push(frame);
                break;

              case 0xFFC4: // DHT (Define Huffman Tables)
                var huffmanLength = readUint16();
                for (i = 2; i < huffmanLength;) {
                  var huffmanTableSpec = data[offset++];
                  var codeLengths = new Uint8Array(16);
                  var codeLengthSum = 0;
                  for (j = 0; j < 16; j++, offset++) {
                    codeLengthSum += (codeLengths[j] = data[offset]);
                  }
                  requestMemoryAllocation(16 + codeLengthSum);
                  var huffmanValues = new Uint8Array(codeLengthSum);
                  for (j = 0; j < codeLengthSum; j++, offset++)
                    huffmanValues[j] = data[offset];
                  i += 17 + codeLengthSum;

                  ((huffmanTableSpec >> 4) === 0 ?
                    huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] =
                    buildHuffmanTable(codeLengths, huffmanValues);
                }
                break;

              case 0xFFDD: // DRI (Define Restart Interval)
                readUint16(); // skip data length
                resetInterval = readUint16();
                break;

              case 0xFFDA: // SOS (Start of Scan)
                readUint16();
                var selectorsCount = data[offset++];
                var components = [], component;
                for (i = 0; i < selectorsCount; i++) {
                  component = frame.components[data[offset++]];
                  var tableSpec = data[offset++];
                  component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                  component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                  components.push(component);
                }
                var spectralStart = data[offset++];
                var spectralEnd = data[offset++];
                var successiveApproximation = data[offset++];
                var processed = decodeScan(data, offset,
                  frame, components, resetInterval,
                  spectralStart, spectralEnd,
                  successiveApproximation >> 4, successiveApproximation & 15, this.opts);
                offset += processed;
                break;

              case 0xFFFF: // Fill bytes
                if (data[offset] !== 0xFF) { // Avoid skipping a valid marker.
                  offset--;
                }
                break;

              default:
                if (data[offset - 3] == 0xFF &&
                    data[offset - 2] >= 0xC0 && data[offset - 2] <= 0xFE) {
                  // could be incorrect encoding -- last 0xFF byte of the previous
                  // block was eaten by the encoder
                  offset -= 3;
                  break;
                }
                throw new Error("unknown JPEG marker " + fileMarker.toString(16));
            }
            fileMarker = readUint16();
          }
          if (frames.length != 1)
            throw new Error("only single frame JPEGs supported");

          // set each frame's components quantization table
          for (var i = 0; i < frames.length; i++) {
            var cp = frames[i].components;
            for (var j in cp) {
              cp[j].quantizationTable = quantizationTables[cp[j].quantizationIdx];
              delete cp[j].quantizationIdx;
            }
          }

          this.width = frame.samplesPerLine;
          this.height = frame.scanLines;
          this.jfif = jfif;
          this.adobe = adobe;
          this.components = [];
          for (var i = 0; i < frame.componentsOrder.length; i++) {
            var component = frame.components[frame.componentsOrder[i]];
            this.components.push({
              lines: buildComponentData(frame, component),
              scaleX: component.h / frame.maxH,
              scaleY: component.v / frame.maxV
            });
          }
        },
        getData: function getData(width, height) {
          var scaleX = this.width / width, scaleY = this.height / height;

          var component1, component2, component3, component4;
          var component1Line, component2Line, component3Line, component4Line;
          var x, y;
          var offset = 0;
          var Y, Cb, Cr, K, C, M, Ye, R, G, B;
          var colorTransform;
          var dataLength = width * height * this.components.length;
          requestMemoryAllocation(dataLength);
          var data = new Uint8Array(dataLength);
          switch (this.components.length) {
            case 1:
              component1 = this.components[0];
              for (y = 0; y < height; y++) {
                component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
                for (x = 0; x < width; x++) {
                  Y = component1Line[0 | (x * component1.scaleX * scaleX)];

                  data[offset++] = Y;
                }
              }
              break;
            case 2:
              // PDF might compress two component data in custom colorspace
              component1 = this.components[0];
              component2 = this.components[1];
              for (y = 0; y < height; y++) {
                component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
                component2Line = component2.lines[0 | (y * component2.scaleY * scaleY)];
                for (x = 0; x < width; x++) {
                  Y = component1Line[0 | (x * component1.scaleX * scaleX)];
                  data[offset++] = Y;
                  Y = component2Line[0 | (x * component2.scaleX * scaleX)];
                  data[offset++] = Y;
                }
              }
              break;
            case 3:
              // The default transform for three components is true
              colorTransform = true;
              // The adobe transform marker overrides any previous setting
              if (this.adobe && this.adobe.transformCode)
                colorTransform = true;
              else if (typeof this.opts.colorTransform !== 'undefined')
                colorTransform = !!this.opts.colorTransform;

              component1 = this.components[0];
              component2 = this.components[1];
              component3 = this.components[2];
              for (y = 0; y < height; y++) {
                component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
                component2Line = component2.lines[0 | (y * component2.scaleY * scaleY)];
                component3Line = component3.lines[0 | (y * component3.scaleY * scaleY)];
                for (x = 0; x < width; x++) {
                  if (!colorTransform) {
                    R = component1Line[0 | (x * component1.scaleX * scaleX)];
                    G = component2Line[0 | (x * component2.scaleX * scaleX)];
                    B = component3Line[0 | (x * component3.scaleX * scaleX)];
                  } else {
                    Y = component1Line[0 | (x * component1.scaleX * scaleX)];
                    Cb = component2Line[0 | (x * component2.scaleX * scaleX)];
                    Cr = component3Line[0 | (x * component3.scaleX * scaleX)];

                    R = clampTo8bit(Y + 1.402 * (Cr - 128));
                    G = clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
                    B = clampTo8bit(Y + 1.772 * (Cb - 128));
                  }

                  data[offset++] = R;
                  data[offset++] = G;
                  data[offset++] = B;
                }
              }
              break;
            case 4:
              if (!this.adobe)
                throw new Error('Unsupported color mode (4 components)');
              // The default transform for four components is false
              colorTransform = false;
              // The adobe transform marker overrides any previous setting
              if (this.adobe && this.adobe.transformCode)
                colorTransform = true;
              else if (typeof this.opts.colorTransform !== 'undefined')
                colorTransform = !!this.opts.colorTransform;

              component1 = this.components[0];
              component2 = this.components[1];
              component3 = this.components[2];
              component4 = this.components[3];
              for (y = 0; y < height; y++) {
                component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
                component2Line = component2.lines[0 | (y * component2.scaleY * scaleY)];
                component3Line = component3.lines[0 | (y * component3.scaleY * scaleY)];
                component4Line = component4.lines[0 | (y * component4.scaleY * scaleY)];
                for (x = 0; x < width; x++) {
                  if (!colorTransform) {
                    C = component1Line[0 | (x * component1.scaleX * scaleX)];
                    M = component2Line[0 | (x * component2.scaleX * scaleX)];
                    Ye = component3Line[0 | (x * component3.scaleX * scaleX)];
                    K = component4Line[0 | (x * component4.scaleX * scaleX)];
                  } else {
                    Y = component1Line[0 | (x * component1.scaleX * scaleX)];
                    Cb = component2Line[0 | (x * component2.scaleX * scaleX)];
                    Cr = component3Line[0 | (x * component3.scaleX * scaleX)];
                    K = component4Line[0 | (x * component4.scaleX * scaleX)];

                    C = 255 - clampTo8bit(Y + 1.402 * (Cr - 128));
                    M = 255 - clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
                    Ye = 255 - clampTo8bit(Y + 1.772 * (Cb - 128));
                  }
                  data[offset++] = 255-C;
                  data[offset++] = 255-M;
                  data[offset++] = 255-Ye;
                  data[offset++] = 255-K;
                }
              }
              break;
            default:
              throw new Error('Unsupported color mode');
          }
          return data;
        },
        copyToImageData: function copyToImageData(imageData, formatAsRGBA) {
          var width = imageData.width, height = imageData.height;
          var imageDataArray = imageData.data;
          var data = this.getData(width, height);
          var i = 0, j = 0, x, y;
          var Y, K, C, M, R, G, B;
          switch (this.components.length) {
            case 1:
              for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                  Y = data[i++];

                  imageDataArray[j++] = Y;
                  imageDataArray[j++] = Y;
                  imageDataArray[j++] = Y;
                  if (formatAsRGBA) {
                    imageDataArray[j++] = 255;
                  }
                }
              }
              break;
            case 3:
              for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                  R = data[i++];
                  G = data[i++];
                  B = data[i++];

                  imageDataArray[j++] = R;
                  imageDataArray[j++] = G;
                  imageDataArray[j++] = B;
                  if (formatAsRGBA) {
                    imageDataArray[j++] = 255;
                  }
                }
              }
              break;
            case 4:
              for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                  C = data[i++];
                  M = data[i++];
                  Y = data[i++];
                  K = data[i++];

                  R = 255 - clampTo8bit(C * (1 - K / 255) + K);
                  G = 255 - clampTo8bit(M * (1 - K / 255) + K);
                  B = 255 - clampTo8bit(Y * (1 - K / 255) + K);

                  imageDataArray[j++] = R;
                  imageDataArray[j++] = G;
                  imageDataArray[j++] = B;
                  if (formatAsRGBA) {
                    imageDataArray[j++] = 255;
                  }
                }
              }
              break;
            default:
              throw new Error('Unsupported color mode');
          }
        }
      };


      // We cap the amount of memory used by jpeg-js to avoid unexpected OOMs from untrusted content.
      var totalBytesAllocated = 0;
      var maxMemoryUsageBytes = 0;
      function requestMemoryAllocation(increaseAmount = 0) {
        var totalMemoryImpactBytes = totalBytesAllocated + increaseAmount;
        if (totalMemoryImpactBytes > maxMemoryUsageBytes) {
          var exceededAmount = Math.ceil((totalMemoryImpactBytes - maxMemoryUsageBytes) / 1024 / 1024);
          throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${exceededAmount}MB`);
        }

        totalBytesAllocated = totalMemoryImpactBytes;
      }

      constructor.resetMaxMemoryUsage = function (maxMemoryUsageBytes_) {
        totalBytesAllocated = 0;
        maxMemoryUsageBytes = maxMemoryUsageBytes_;
      };

      constructor.getBytesAllocated = function () {
        return totalBytesAllocated;
      };

      constructor.requestMemoryAllocation = requestMemoryAllocation;

      return constructor;
    })();

    {
    	module.exports = decode;
    }

    function decode(jpegData, userOpts = {}) {
      var defaultOpts = {
        // "undefined" means "Choose whether to transform colors based on the image’s color model."
        colorTransform: undefined,
        useTArray: false,
        formatAsRGBA: true,
        tolerantDecoding: true,
        maxResolutionInMP: 100, // Don't decode more than 100 megapixels
        maxMemoryUsageInMB: 512, // Don't decode if memory footprint is more than 512MB
      };

      var opts = {...defaultOpts, ...userOpts};
      var arr = new Uint8Array(jpegData);
      var decoder = new JpegImage();
      decoder.opts = opts;
      // If this constructor ever supports async decoding this will need to be done differently.
      // Until then, treating as singleton limit is fine.
      JpegImage.resetMaxMemoryUsage(opts.maxMemoryUsageInMB * 1024 * 1024);
      decoder.parse(arr);

      var channels = (opts.formatAsRGBA) ? 4 : 3;
      var bytesNeeded = decoder.width * decoder.height * channels;
      try {
        JpegImage.requestMemoryAllocation(bytesNeeded);
        var image = {
          width: decoder.width,
          height: decoder.height,
          exifBuffer: decoder.exifBuffer,
          data: opts.useTArray ?
            new Uint8Array(bytesNeeded) :
            new Buffer(bytesNeeded)
        };
        if(decoder.comments.length > 0) {
          image["comments"] = decoder.comments;
        }
      } catch (err){
        if (err instanceof RangeError){
          throw new Error("Could not allocate enough memory for the image. " +
                          "Required: " + bytesNeeded);
        } else {
          throw err;
        }
      }

      decoder.copyToImageData(image, opts.formatAsRGBA);

      return image;
    }
    });

    var jpegJs = {
      encode: encoder,
      decode: decoder
    };

    function make (w,h,options) {
        return new Bitmap(w,h,options)
    }

    /**
     * Encode the PNG image to output stream
     *
     * @param {Bitmap} bitmap    An instance of {@link Bitmap} to be encoded to PNG, `bitmap.data` must be a buffer of raw PNG data
     * @param {Stream} outstream The stream to write the PNG file to
     *
     * @returns {Promise<void>}
     */
    function encodePNGToStream(bitmap, outstream) {
        return new Promise((res,rej)=>{
            if(!bitmap.hasOwnProperty('data') || !bitmap.hasOwnProperty('width') || !bitmap.hasOwnProperty('height')) {
                return rej(new TypeError('Invalid bitmap image provided'));
            }

            const png$1 = new png.PNG({
                width: bitmap.width,
                height: bitmap.height
            });

            for(let i=0; i<bitmap.width; i++) {
                for(let j=0; j<bitmap.height; j++) {
                    const rgba = bitmap.getPixelRGBA(i, j);
                    const n = (j * bitmap.width + i) * 4;
                    const bytes = getBytesBigEndian(rgba);
                    for(let k=0; k<4; k++) {
                        png$1.data[n+k] = bytes[k];
                    }
                }
            }

            png$1
                .on('error', (err) => { rej(err); })
                .pack()
                .pipe(outstream)
                .on('finish', () => { res(); })
                .on('error', (err) => { rej(err); });
        });
    }


    /**
     * Decode PNG From Stream
     *
     * Decode a PNG file from an incoming readable stream
     *
     * @param {Stream} instream A readable stream containing raw PNG data
     *
     * @returns {Promise<Bitmap>}
     */
    function decodePNGFromStream(instream) {
        return new Promise((res,rej)=>{
            instream.pipe(new png.PNG())
                .on("parsed", function() {
                    const bitmap = new Bitmap(this.width, this.height,{});
                    for(let i=0; i<bitmap.data.length; i++) {
                        bitmap.data[i] = this.data[i];
                    }
                    res(bitmap);
                }).on("error", function(err) {
                rej(err);
            });
        })
    }

    /**
     * Encode JPEG To Stream
     *
     * Encode the JPEG image to output stream
     *
     * @param {Bitmap} img       An instance of {@link Bitmap} to be encoded to JPEG, `img.data` must be a buffer of raw JPEG data
     * @param {Stream} outstream The stream to write the raw JPEG buffer to
     * @param {Int} Number between 0 and 100 setting the JPEG quality
     * @returns {Promise<void>}
     */
    function encodeJPEGToStream(img, outstream, quality) {
        quality = quality || 90;
        return new Promise((res,rej)=> {
            if(!img.hasOwnProperty('data') || !img.hasOwnProperty('width') || !img.hasOwnProperty('height')) {
                return rej(new TypeError('Invalid bitmap image provided'));
            }
            const data = {
                data: img.data,
                width: img.width,
                height: img.height
            };
            outstream.on('error', (err) => rej(err));
            outstream.write(jpegJs.encode(data, quality).data, () => {
                outstream.end();
                res();
            });
        });
    }

    /**
     * Decode JPEG From Stream
     *
     * Decode a JPEG image from an incoming stream of data
     *
     * @param {Stream} data A readable stream to decode JPEG data from
     *
     * @returns {Promise<Bitmap>}
     */
    function decodeJPEGFromStream(data) {
        return new Promise((res,rej)=>{
            try {
                const chunks = [];
                data.on('data', chunk => chunks.push(chunk));
                data.on('end',() => {
                    const buf = Buffer.concat(chunks);
                    let rawImageData = null;
                    try {
                        rawImageData = jpegJs.decode(buf);
                    } catch(err) {
                        rej(err);
                        return
                    }
                    const bitmap = new Bitmap(rawImageData.width, rawImageData.height,{});
                    for (let x_axis = 0; x_axis < rawImageData.width; x_axis++) {
                        for (let y_axis = 0; y_axis < rawImageData.height; y_axis++) {
                            const n = (y_axis * rawImageData.width + x_axis) * 4;
                            bitmap.setPixelRGBA_i(x_axis, y_axis,
                                rawImageData.data[n + 0],
                                rawImageData.data[n + 1],
                                rawImageData.data[n + 2],
                                rawImageData.data[n + 3]
                            );
                        }
                    }
                    res(bitmap);
                });
                data.on("error", (err) => {
                    rej(err);
                });
            } catch (e) {
                console.log(e);
                rej(e);
            }
        })
    }

    exports.debug_list_of_fonts = debug_list_of_fonts;
    exports.decodeJPEGFromStream = decodeJPEGFromStream;
    exports.decodePNGFromStream = decodePNGFromStream;
    exports.encodeJPEGToStream = encodeJPEGToStream;
    exports.encodePNGToStream = encodePNGToStream;
    exports.make = make;
    exports.measureText = measureText;
    exports.processTextPath = processTextPath;
    exports.registerFont = registerFont;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
