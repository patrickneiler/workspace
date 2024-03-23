import React from 'react';
import MermaidDiagram from './MermaidDiagram';

interface DiagramProps {
  diagram: Record<string, string[]>;
  classDefs: Record<string, string>;
}

export function Diagram({ diagram, classDefs }: DiagramProps) {
  // Convert the graph object to a Mermaid graph definition string

  return <MermaidDiagram chart={generateMermaidCode(diagram, classDefs)} />;
}

function generateMermaidCode(
  graphObject: Record<string, string[]>,
  classDefs: Record<string, string>,
) {
  let mermaidCode = 'graph TD\n';

  // Generate nodes and edges
  for (const node in graphObject) {
    const edges = graphObject[node];
    let tempCode = '';
    edges.forEach((edge) => {
      tempCode += `    ${node} --> ${edge}\n`;
    });
    mermaidCode += tempCode;
  }

  // Define styles
  mermaidCode += `
    classDef scope fill:#bbf,stroke:#333,stroke-width:4px;
    classDef library fill:#fbb,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    classDef module fill:#bfb,stroke:#393,stroke-width:2px;
    `;

  // Associate nodes with classes
  for (const node in classDefs) {
    mermaidCode += `    class ${node} ${classDefs[node]};\n`;
  }

  return mermaidCode;
}

export default Diagram;
