'use client';

import { useDroppable } from '@dnd-kit/core';
import NodeRenderer from './NodeRenderer';

export default function Canvas({ layout, selectedId, dispatch }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-dropzone'
  });

  if (!layout.length) {
    return (
      <div
        ref={setNodeRef}
        style={{
          flex: 1,
          padding: 24,
          border: isOver ? '2px dashed #0070f3' : '2px dashed #ddd'
        }}
      >
        Drop sections here
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: 24,
        border: isOver ? '2px dashed #0070f3' : '2px dashed transparent'
      }}
      onPointerDown={() =>
        dispatch({ type: 'SELECT_NODE', payload: null })
      }
    >
      {layout.map(section => (
        <NodeRenderer
          key={section.id}
          node={section}
          selectedId={selectedId}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
