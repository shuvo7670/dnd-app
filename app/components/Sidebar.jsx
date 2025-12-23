'use client';

import { useDraggable } from '@dnd-kit/core';

const WIDGETS = [
  { id: 'text', label: 'Text' },
  { id: 'button', label: 'Button' },
  { id: 'image', label: 'Image' }
];

function SidebarItem({ widget }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: widget.id,
    // this is like a props
    data: {
      from: 'sidebar'
    }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: '12px',
        marginBottom: '8px',
        background: '#fff',
        border: '1px solid #ddd',
        cursor: 'grab',
        color: '#000'
      }}
    >
      {widget.label}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div style={{ width: 250, padding: 16, background: '#f5f5f5' }}>
      <h3>Widgets</h3>
      {WIDGETS.map((widget) => (
        <SidebarItem key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
