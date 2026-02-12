'use client';

import { unstableSetRender } from 'antd';
import { createRoot, Root } from 'react-dom/client';

if (typeof window !== 'undefined') {
  unstableSetRender((node, container) => {
    const customContainer = container as Element & { _reactRoot?: Root };
    customContainer._reactRoot ||= createRoot(customContainer);
    const root = customContainer._reactRoot;
    root.render(node);

    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });
}
