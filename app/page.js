'use client';

import { DndContext } from '@dnd-kit/core';
import { useReducer } from 'react';
import { nanoid } from 'nanoid';

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
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

      if (variant === 'section-1col') {
        columns = [{ id: nanoid(), type: 'column', children: [] }];
      }

      if (variant === 'section-2col') {
        columns = [
          { id: nanoid(), type: 'column', children: [] },
          { id: nanoid(), type: 'column', children: [] }
        ];
      }

      const section = {
        id: nanoid(),
        type: 'section',
        children: columns
      };

      return {
        ...state,
        layout: [...state.layout, section],
        selectedId: section.id
      };
    }

    case 'SELECT_NODE':
      return {
        ...state,
        selectedId: action.payload
      };

    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (over.id !== 'canvas-dropzone') return;
    if (active.data.current?.from !== 'sidebar') return;

    if (active.id.startsWith('section')) {
      dispatch({
        type: 'ADD_SECTION',
        payload: { variant: active.id }
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Canvas
          layout={state.layout}
          selectedId={state.selectedId}
          dispatch={dispatch}
        />
      </div>
    </DndContext>
  );
}
