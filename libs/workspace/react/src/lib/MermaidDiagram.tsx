import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart }: { chart: string }) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded();
    }, []);

    return <div className="mermaid">{chart}</div>;
};

export default MermaidDiagram;