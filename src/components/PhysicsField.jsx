import { useState, useEffect, useCallback } from 'react';
import FloatingItem from './FloatingItem';
import { mediaItems } from '../data/mediaItems';

const CARD_WIDTH = 200;
const CARD_HEIGHT = 290;
const PADDING = 40;

function getInitialPositions(count, vw, vh) {
  const positions = [];
  const cols = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = (vw - PADDING * 2) / cols;
    const cellH = (vh - PADDING * 2) / Math.ceil(count / cols);

    const jitterX = (Math.random() - 0.5) * cellW * 0.6;
    const jitterY = (Math.random() - 0.5) * cellH * 0.6;

    let x = PADDING + col * cellW + cellW / 2 - CARD_WIDTH / 2 + jitterX;
    let y = PADDING + row * cellH + cellH / 2 - CARD_HEIGHT / 2 + jitterY;

    x = Math.max(PADDING, Math.min(vw - CARD_WIDTH - PADDING, x));
    y = Math.max(PADDING, Math.min(vh - CARD_HEIGHT - PADDING, y));

    positions.push({ x, y });
  }
  return positions;
}

export default function PhysicsField({ onOpen, constraintsRef }) {
  const [positions, setPositions] = useState(null);

  const recalculate = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPositions(getInitialPositions(mediaItems.length, vw, vh));
  }, []);

  useEffect(() => {
    recalculate();
    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  }, [recalculate]);

  if (!constraintsRef?.current) return null;

  return (
    <>
      {positions &&
        mediaItems.map((item, i) => (
          <FloatingItem
            key={item.id}
            item={item}
            index={i}
            initialX={positions[i].x}
            initialY={positions[i].y}
            constraintsRef={constraintsRef}
            onOpen={onOpen}
          />
        ))}
    </>
  );
}
