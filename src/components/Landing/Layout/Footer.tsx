import type { ReactElement } from 'react';

export default function Footer(): ReactElement {
  return (
    <footer className="bg-background-2 fixed bottom-0 left-0 w-full z-20 border-t border-border-1">
      <div className="max-w-screen-xl mx-auto p-4">
        <p className="text-center text-text-1 text-sm">© 2024 Bedrock. All rights reserved.</p>
      </div>
    </footer>
  );
}
