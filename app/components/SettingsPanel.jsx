'use client';

import { ButtonSettings } from "./settings/ButtonSettings";
import { TextSettings } from "./settings/TextSettings";
import { ImageSettings } from "./settings/ImageSettings";

export default function SettingsPanel({
  layout,
  selectedId,
  dispatch
}) {
  const widget =   layout.find(w => w.id === selectedId);

  if (!widget) {
    return (
      <div style={{ width: 300, padding: 16, borderLeft: '1px solid #ddd' }}>
        <p>Select a widget to edit</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 300,
        padding: 16,
        borderLeft: '1px solid #ddd'
      }}
    >
      <h3>{widget.type.toUpperCase()} Settings</h3>

      {widget.type === 'text' && (
        <TextSettings widget={widget} dispatch={dispatch} />
      )}

      {widget.type === 'button' && (
        <ButtonSettings widget={widget} dispatch={dispatch} />
      )}
      {widget.type === 'image' && (
        <ImageSettings widget={widget} dispatch={dispatch} />
      )}
    </div>
  );
}
