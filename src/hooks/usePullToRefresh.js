// hooks/usePullToRefresh.js
import { useState, useEffect } from 'react';

const usePullToRefresh = (onRefresh) => {
  const [pulling, setPulling] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const handlePointerDown = (e) => {
      setStartY(e.clientY);
      setPulling(true);
    };

    const handlePointerMove = (e) => {
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

export default usePullToRefresh;
