'use client';

export default function NodeRenderer({ node, selectedId, dispatch }) {
  const isSelected = selectedId === node.id;

  const styles = {
    section: {
      border: isSelected ? '2px solid blue' : '1px solid #ccc',
      padding: 16,
      marginBottom: 16
    },
    column: {
      border: '1px dashed #aaa',
      padding: 12,
      marginRight: 8,
      flex: 1
    }
  };

  return (
    <div
      style={styles[node.type]}
      onPointerDown={(e) => {
        e.stopPropagation();
        dispatch({ type: 'SELECT_NODE', payload: node.id });
      }}
    >
      {node.type === 'section' && (
        <div style={{ display: 'flex' }}>
          {node.children.map(child => (
            <NodeRenderer
              key={child.id}
              node={child}
              selectedId={selectedId}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}

      {node.type === 'column' && (
        <div style={{ minHeight: 60 }}>
          Empty Column
        </div>
      )}
    </div>
  );
}
