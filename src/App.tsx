import React, { lazy, Suspense } from 'react';

const LazyProcessBar = lazy(() => import('./views/process_bar'));

const App: React.FC = () => {
  return (
    <div className='App' data-testid='process-bar'>
      <div className='App-container'>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyProcessBar />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
