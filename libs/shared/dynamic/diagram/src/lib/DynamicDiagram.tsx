'use client'
import { useEffect } from 'react';
import mermaid from 'mermaid';

/**
 * Renders a dynamic diagram using the Mermaid library.
 *
 * @param diagram - The diagram code to render.
 * @returns The rendered diagram component.
 */
export const DynamicDiagram = ({ diagram }: { diagram: string }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{diagram}</div>;
};

export default DynamicDiagram;
