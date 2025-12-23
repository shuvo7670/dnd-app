'use client';

import { useDraggable } from '@dnd-kit/core';

function SidebarItem({ id, label }) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id,
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
        padding: 12,
        marginBottom: 8,
        border: '1px solid #ddd',
        background: '#fff',
        cursor: 'grab'
      }}
    >
      {label}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div style={{ width: 260, padding: 16, background: '#f5f5f5' }}>
      <h3>Layout</h3>

      <SidebarItem id="section-1col" label="Section (1 Column)" />
      <SidebarItem id="section-2col" label="Section (2 Columns)" />

      <hr />

      <h3>Widgets</h3>
      <SidebarItem id="text" label="Text" />
      <SidebarItem id="button" label="Button" />
    </div>
  );
}
