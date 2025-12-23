export default function NodeRenderer({ node, dispatch, selectedId }) {
    const isSelected = node.id === selectedId;
  
    return (
      <div
        style={{
          border: isSelected ? '2px solid blue' : '1px dashed #ccc',
          padding: 8,
          marginBottom: 8
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          dispatch({
            type: 'SELECT_NODE',
            payload: node.id
          });
        }}
      >
        {node.type === 'text' && <p>{node.settings?.text || 'Text'}</p>}
  
        {node.children?.map(child => (
          <NodeRenderer
            key={child.id}
            node={child}
            dispatch={dispatch}
            selectedId={selectedId}
          />
        ))}
      </div>
    );
  }
  