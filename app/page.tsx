'use client';

import { DndContext } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import { useReducer } from 'react';

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { arrayMove } from '@dnd-kit/sortable';

/**
 * Initial Builder State
 */
const initialState = {
  widgets: []
};

/**
 * Reducer (pure function)
 */
function builderReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        widgets: [
          ...state.widgets,
          {
            id: nanoid(),
            type: action.payload.type,
            settings: {}
          }
        ]
      };
    case 'MOVE_WIDGET': {
      const { activeId, overId } = action.payload;

      // @ts-ignore 
      const oldIndex = state.widgets.findIndex(w => w.id === activeId);
      // @ts-ignore 
      const newIndex = state.widgets.findIndex(w => w.id === overId);

      if (oldIndex === -1 || newIndex === -1) return state;

      return {
        ...state,
        widgets: arrayMove(state.widgets, oldIndex, newIndex)
      };
    }
    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    // Sidebar → Canvas (clone)
    if (active.data.current?.from === 'sidebar' && over.id === 'canvas') {
      dispatch({
        type: 'ADD_WIDGET',
        payload: {
          type: active.id
        }
      });
    }
     // Canvas → Canvas (reorder)
    if (active.data.current?.from === 'canvas') {
      dispatch({
        type: 'MOVE_WIDGET',
        payload: {
          activeId: active.id,
          overId: over.id
        }
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Canvas widgets={state.widgets} />
      </div>
    </DndContext>
  );
}
