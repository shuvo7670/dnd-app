export function findNode(nodes, id) {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children?.length) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }
  
  export function removeNode(nodes, id) {
    return nodes
      .map(node => ({
        ...node,
        children: removeNode(node.children || [], id)
      }))
      .filter(node => node.id !== id);
  }
  
  export function insertNode(nodes, parentId, newNode) {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, newNode]
        };
      }
  
      return {
        ...node,
        children: insertNode(node.children || [], parentId, newNode)
      };
    });
  }
  