'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const CursorToggle = () => {
  const { enableCustomCursor, setEnableCustomCursor, isSpotlight, setIsSpotlight } = useCursor();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-glass p-3 rounded-lg shadow-lg border border-white/5 flex flex-col space-y-2">
      <div className="flex items-center justify-between space-x-2">
        <span className="text-xs text-text-secondary">Cursor</span>
        <button
          onClick={() => setEnableCustomCursor(!enableCustomCursor)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          style={{
            backgroundColor: enableCustomCursor ? 'var(--color-primary)' : 'var(--color-card-hover)'
          }}
        >
          <span
            className={`${
              enableCustomCursor ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <span className="text-xs text-text-secondary">Spotlight</span>
        <button
          onClick={() => setIsSpotlight(!isSpotlight)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          style={{
            backgroundColor: isSpotlight ? 'var(--color-secondary)' : 'var(--color-card-hover)'
          }}
          disabled={!enableCustomCursor}
        >
          <span
            className={`${
              isSpotlight ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </button>
      </div>
    </div>
  );
};

export default CursorToggle;
