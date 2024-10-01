"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
// hooks/usePullToRefresh.js

const usePullToRefresh = onRefresh => {
  const [pulling, setPulling] = (0, _react.useState)(false);
  const [startY, setStartY] = (0, _react.useState)(0);
  const [currentY, setCurrentY] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    const handlePointerDown = e => {
      setStartY(e.clientY);
      setPulling(true);
    };
    const handlePointerMove = e => {
      if (!pulling) return;
      setCurrentY(e.clientY);
    };
    const handlePointerUp = () => {
      if (pulling && startY < currentY) {
        onRefresh();
      }
      setPulling(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [pulling, startY, currentY, onRefresh]);
  return pulling;
};
var _default = exports.default = usePullToRefresh;