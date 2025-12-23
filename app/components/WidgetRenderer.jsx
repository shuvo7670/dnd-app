export default function WidgetRenderer({ widget }) {
  switch (widget.type) {
    case 'text':
      return <p>{widget.settings.text || 'Text Widget'}</p>;

    case 'button':
      return <button>{widget.settings.label || 'Button'}</button>;

      
    case 'image':
      return <button>{widget.settings.label || 'Image'}</button>;

    default:
      return null;
  }
}
