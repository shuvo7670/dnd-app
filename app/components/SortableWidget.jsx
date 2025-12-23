'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import WidgetRenderer from './WidgetRenderer';

export default function SortableWidget({ widget, selectedId, dispatch }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: widget.id,
    data: {
      from: 'canvas'
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    border: selectedId ? '2px solid #ddd' : '1px solid #ddd',
    transition, 
    padding: 12,
    marginBottom: 12,
    background: selectedId ? '#f0f0f0' : '#fff',
    cursor: 'grab'
  };  

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => {
        e.stopPropagation();
        dispatch({
          type: 'SELECT_WIDGET',
          payload: widget.id
        });
      }}
    >
      {/* Drag Handle (ONLY this drags) */}
       <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          padding: '6px 10px',
          background: '#f3f4f6',
          borderBottom: '1px solid #ddd'
        }}
      >
        ⠿
      </div>
      <div
        style={{ padding: 12 }}
      >
        <WidgetRenderer widget={widget} />
      </div>
    </div>
  );
}
