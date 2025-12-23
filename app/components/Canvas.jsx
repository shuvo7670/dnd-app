'use client';

import { useDroppable } from '@dnd-kit/core';
import SortableWidget from './SortableWidget';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Canvas({ widgets }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas'
  });
  console.log('widgets',widgets);
  
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: 24,
        background: '#fafafa',
        color: '#333'
      }}
    >
      {widgets.length === 0 && (
        <div style={{ color: '#999' }}>Drop widgets here</div>
      )}

      <SortableContext
        items={widgets.map(w => w.id)}
        strategy={verticalListSortingStrategy}
      >
        {widgets.map(widget => (
          <SortableWidget key={widget.id} widget={widget} />
        ))}
      </SortableContext>
    </div>
  );
}
