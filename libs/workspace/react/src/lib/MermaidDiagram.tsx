import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart }: { chart: string }) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded();
    }, []);

    useEffect(() => {
        const svg = document.querySelector('.mermaid');
        if (!svg) return;

        const nodes = svg.querySelectorAll('.node');
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                const nodeId = node?.querySelector('text')?.textContent;
                console.log(`Node ${nodeId} was clicked.`);
                // Here you can handle the click event, e.g., navigate to a different page
            });
        });
    }, []);

    return <div className="mermaid">{chart}</div>;
};

export default MermaidDiagram;