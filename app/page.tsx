'use client';

import { DndContext } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import { useReducer } from 'react';

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import SettingsPanel from './components/SettingsPanel';
import { arrayMove } from '@dnd-kit/sortable';
import { insertNode, removeNode } from './helper';
/**
 * Initial Builder State
 */
const initialState = {
  layout: [], // sections
  selectedId: null,
};

/**
 * Reducer (pure function)
 */
function builderReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD_SECTION': {
      const { variant } = action.payload;
    
      let columns : any = [];
    
      if (variant === 'section-1col') {
        columns = [
          { id: nanoid(), type: 'column', children: [] }
        ];
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
    
    case 'UPDATE_WIDGET': {
      const { id, settings } = action.payload;
      return {
        ...state,
        widgets: state.widgets.map((widget: { settings : any, id : any }): { settings : any } =>
          widget.id === id
            ? {
                ...widget,
                settings: {
                  ...widget.settings,
                  ...settings
                }
              }
            : widget
        )
      };
    }
    case 'SELECT_WIDGET':
    case 'REMOVE_NODE': {
      return {
        ...state,
        layout: removeNode(state.layout, action.payload.id),
        selectedId: null
      };
    }
      return {
        ...state,
        selectedId: action.payload
      };
    case 'ADD_WIDGET':
      const { columnId, widget } = action.payload;

      return {
        ...state,
        layout: insertNode(state.layout, columnId, widget),
        selectedId: widget.id
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

  const handleDragEnd = (event:any) => {
    const { active, over } = event;
    if (!over) return;
  
    // SIDEBAR → CANVAS OR WIDGET
    if (active.data.current?.from === 'sidebar') {
      dispatch({
        type: 'ADD_WIDGET',
        payload: {
          id: nanoid(),
          type: active.id
        }
      });
      return;
    }
  
    // CANVAS SORT
    if (active.data.current?.from === 'canvas') {
      if (active.id !== over.id) {
        dispatch({
          type: 'MOVE_WIDGET',
          payload: {
            activeId: active.id,
            overId: over.id
          }
        });
      }
    }
    
     // SECTION DROP
    if (active.id.startsWith('section')) {
      dispatch({
        type: 'ADD_SECTION',
        payload: {
          variant: active.id // section-1col, section-2col
        }
      });
      return;
    }
  };
  
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Canvas layout={state.layout} selectedId={state.selectedId} dispatch={dispatch} />
        <SettingsPanel
          layout={state.layout}
          selectedId={state.selectedId}
          dispatch={dispatch}
        />
      </div>
    </DndContext>
  );
}
