'use client';

export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case 'text':
      return <p>Text Widget</p>;

    case 'button':
      return <button>Button Widget</button>;

    case 'image':
      return <div>Image Widget</div>;

    default:
      return null;
  }
}
