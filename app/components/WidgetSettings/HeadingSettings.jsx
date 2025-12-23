export default function HeadingSettings({ node, dispatch }) {
    return (
      <label style={{ display: 'block', marginTop: 12 }}>
        Text
        <input
          type="text"
          value={node.settings.text}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_WIDGET',
              payload: { id: node.id, settings: { text: e.target.value } }
            })
          }
          style={{ width: '100%', marginTop: 6 }}
        />
      </label>
    );
  }
  