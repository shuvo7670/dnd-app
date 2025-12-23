'use client';

import { DndContext } from '@dnd-kit/core';
import { useReducer } from 'react';
import { nanoid } from 'nanoid';

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import SettingsPanel from './components/SettingsPanel';
import { insertNode, removeNode, findNode } from './helpers/treeUtils';

const initialState = {
  layout: [],
  selectedId: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_SECTION': {
      const { variant } = action.payload;
      let columns = [];

      if (variant === 'section-1col') columns = [{ id: `column-${nanoid()}`, type: 'column', children: [] }];
      if (variant === 'section-2col')
        columns = [
          { id: `column-${nanoid()}`, type: 'column', children: [] },
          { id: `column-${nanoid()}`, type: 'column', children: [] }
        ];

      const section = { id: nanoid(), type: 'section', children: columns };
      return { ...state, layout: [...state.layout, section], selectedId: section.id };
    }

    case 'ADD_WIDGET': {
      const { columnId, widgetType } = action.payload;
      const widget = {
        id: nanoid(),
        type: widgetType,
        settings: widgetType === 'heading' ? { text: 'Heading' } :
                  widgetType === 'paragraph' ? { text: 'Paragraph' } :
                  { label: 'Click Me' },
        children: []
      };

      return { ...state, layout: insertNode(state.layout, columnId, widget), selectedId: widget.id };
    }

    case 'SELECT_NODE':
      return { ...state, selectedId: action.payload };

    case 'UPDATE_WIDGET': {
      const { id, settings } = action.payload;
      const node = findNode(state.layout, id);
      if (!node) return state;
      node.settings = { ...node.settings, ...settings };
      return { ...state };
    }

    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
  
    // Section drop
    if (active.data.current?.from === 'sidebar' && active.id.startsWith('section') && over.id === 'canvas-dropzone') {
      dispatch({ type: 'ADD_SECTION', payload: { variant: active.id } });
      return;
    }
    console.log('active.data.current?.from',active)
    // Widget drop
    console.log('over',over);

    if (active.data.current?.from === 'sidebar' && ['heading', 'paragraph', 'button'].includes(active.id)) {
      // Only drop if over a column
      
      if (over.id.startsWith('column-')) {
        dispatch({
          type: 'ADD_WIDGET',
          payload: { columnId: over.id, widgetType: active.id }
        });
        return;
      }
    }
  };
  

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Canvas layout={state.layout} selectedId={state.selectedId} dispatch={dispatch} />
        <SettingsPanel layout={state.layout} selectedId={state.selectedId} dispatch={dispatch} />
      </div>
    </DndContext>
  );
}
