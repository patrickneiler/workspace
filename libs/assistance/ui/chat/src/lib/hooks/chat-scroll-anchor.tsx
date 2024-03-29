
'use client';

import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAtBottom } from './use-at-bottom';

interface ChatScrollAnchorProps {
  trackVisibility?: boolean;
}

/**
 * A component that serves as an anchor for scrolling in a chat interface.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} [props.trackVisibility] - Determines whether to track the visibility of the anchor.
 * @returns {JSX.Element} The rendered `ChatScrollAnchor` component.
 */
export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom();
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: '0px 0px -50px 0px',
  });

  React.useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      });
    }
  }, [inView, entry, isAtBottom, trackVisibility]);

  return <div ref={ref} className="h-px w-full" />;
}
