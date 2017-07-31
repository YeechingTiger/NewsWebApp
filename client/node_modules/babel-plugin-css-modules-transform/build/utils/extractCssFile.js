'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PATH_VARIABLES = undefined;
exports.default = extractCssFile;

var _writeCssFile = require('./writeCssFile');

var _writeCssFile2 = _interopRequireDefault(_writeCssFile);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH_VARIABLES = exports.PATH_VARIABLES = ['[path]', '[name]'];

/**
 * Extracts CSS to file
 *
 * @param {String} cwd
 * @param {Map} cssMap
 * @param {String|Object} extractCss
 * @returns {null}
 */
function extractCssFile(cwd, cssMap, extractCss) {
    // this is the case where a single extractCss is requested
    if (typeof extractCss === 'string') {
        // check if extractCss contains some from pattern variables, if yes throw!
        PATH_VARIABLES.forEach(function (VARIABLE) {
            if (extractCss.indexOf(VARIABLE) !== -1) {
                throw new Error('extractCss cannot contain variables');
            }
        });

        var css = Array.from(cssMap.values()).join('');

        return (0, _writeCssFile2.default)(extractCss, css);
    }

    // This is the case where each css file is written in
    // its own file.
    var _extractCss$dir = extractCss.dir,
        dir = _extractCss$dir === undefined ? 'dist' : _extractCss$dir,
        _extractCss$filename = extractCss.filename,
        filename = _extractCss$filename === undefined ? '[name].css' : _extractCss$filename,
        _extractCss$relativeR = extractCss.relativeRoot,
        relativeRoot = _extractCss$relativeR === undefined ? '' : _extractCss$relativeR;

    // check if filename contains at least [name] variable

    if (filename.indexOf('[name]') === -1) {
        throw new Error('[name] variable has to be used in extractCss.filename option');
    }

    cssMap.forEach(function (css, filepath) {
        // Make css file name relative to relativeRoot
        var relativePath = (0, _path.relative)((0, _path.resolve)(cwd, relativeRoot), filepath);

        var destination = (0, _path.join)((0, _path.resolve)(cwd, dir), filename).replace(/\[name]/, (0, _path.basename)(filepath, (0, _path.extname)(filepath))).replace(/\[path]/, (0, _path.dirname)(relativePath));

        (0, _writeCssFile2.default)(destination, css);
    });
}