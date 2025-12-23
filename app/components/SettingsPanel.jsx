'use client';

import HeadingSettings from './WidgetSettings/HeadingSettings';
import ParagraphSettings from './WidgetSettings/ParagraphSettings';
import ButtonSettings from './WidgetSettings/ButtonSettings';
import { findNode } from '../helpers/treeUtils';

export default function SettingsPanel({ layout, selectedId, dispatch }) {
  const node = findNode(layout, selectedId);

  if (!node || ['section', 'column'].includes(node.type)) {
    return (
      <div style={{ width: 300, padding: 16, borderLeft: '1px solid #ddd' }}>
        <p>Select a widget to edit</p>
      </div>
    );
  }

  return (
    <div style={{ width: 300, padding: 16, borderLeft: '1px solid #ddd' }}>
      {node.type === 'heading' && <HeadingSettings node={node} dispatch={dispatch} />}
      {node.type === 'paragraph' && <ParagraphSettings node={node} dispatch={dispatch} />}
      {node.type === 'button' && <ButtonSettings node={node} dispatch={dispatch} />}
    </div>
  );
}
