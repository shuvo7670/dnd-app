export default function ButtonSettings({ node, dispatch }) {
    return (
      <label style={{ display: 'block', marginTop: 12 }}>
        Label
        <input
          type="text"
          value={node.settings.label}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_WIDGET',
              payload: { id: node.id, settings: { label: e.target.value } }
            })
          }
          style={{ width: '100%', marginTop: 6 }}
        />
      </label>
    );
  }
  