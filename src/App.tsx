import React, { FC } from 'react';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar/Sidebar';

const App: FC = () => {
  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
      <Sidebar />
      <main>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
