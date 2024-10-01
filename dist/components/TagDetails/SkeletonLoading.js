"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SkeletonLoading = () => {
  // Define the number of skeleton rows you want to render
  const numberOfSkeletonRows = 5;

  // Render skeleton rows
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-loading-container"
  }, Array.from({
    length: numberOfSkeletonRows
  }).map((_, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-row",
    key: index
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-image"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-text"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-title"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-description"
  })))));
};
var _default = exports.default = SkeletonLoading;