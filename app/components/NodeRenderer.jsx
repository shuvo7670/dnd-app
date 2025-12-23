// NodeRenderer.jsx
'use client';
import { useDroppable } from '@dnd-kit/core';

export default function NodeRenderer({ node, selectedId, dispatch }) {
  const isSelected = selectedId === node.id;

  const { setNodeRef, isOver } = useDroppable({
    id: node.type === 'column' ? node.id : undefined
  });

  const styles = {
    section: {
      border: isSelected ? '2px solid blue' : '1px solid #ccc',
      padding: 16,
      marginBottom: 16
    },
    column: {
      border: isOver ? '2px dashed #0070f3' : '1px dashed #aaa',
      padding: 12,
      marginRight: 8,
      flex: 1,
      minHeight: 60
    }
  };

  return (
    <div
      style={node.type === 'column' ? styles.column : styles[node.type]}
      ref={node.type === 'column' ? setNodeRef : null}
      onPointerDown={(e) => {
        e.stopPropagation();
        dispatch({ type: 'SELECT_NODE', payload: node.id });
      }}
    >
      {node.type === 'section' && (
        <div style={{ display: 'flex' }}>
          {node.children.map((child) => (
            <NodeRenderer
              key={child.id}
              node={child}
              selectedId={selectedId}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}

      {node.type === 'column' &&
        node.children.map((child) => (
          <NodeRenderer
            key={child.id}
            node={child}
            selectedId={selectedId}
            dispatch={dispatch}
          />
        ))}

      {node.type === 'column' && node.children.length === 0 && <div style={{ color: '#888' }}>Drop widgets here</div>}

      {['heading', 'paragraph', 'button'].includes(node.type) && (
        node.type === 'heading' ? <h2>{node.settings.text}</h2> :
        node.type === 'paragraph' ? <p>{node.settings.text}</p> :
        <button>{node.settings.label}</button>
      )}
    </div>
  );
}
