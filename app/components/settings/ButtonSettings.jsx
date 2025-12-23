export function ButtonSettings({ widget, dispatch }) {
    return (
      <label style={{ display: 'block', marginTop: 12 }}>
        Label
        <input
          type="text"
          value={widget.settings.label || ''}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_WIDGET',
              payload: {
                id: widget.id,
                settings: {
                  label: e.target.value
                }
              }
            })
          }
          style={{ width: '100%', marginTop: 6 }}
        />
      </label>
    );
  }
  