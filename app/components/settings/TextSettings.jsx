export function TextSettings({ widget, dispatch }) {
    return (
      <label style={{ display: 'block', marginTop: 12 }}>
        Text
        <input
          type="text"
          value={widget.settings.text || ''}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_WIDGET',
              payload: {
                id: widget.id,
                settings: {
                  text: e.target.value
                }
              }
            })
          }
          style={{ width: '100%', marginTop: 6 }}
        />
      </label>
    );
  }
  