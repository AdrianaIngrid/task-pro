import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthPage from './AUTHPAGE/authPage';
import '../index.css';
import { Suspense } from 'react';
import Start from './START/start';

const isProduction = process.env.NODE_ENV === 'production';
const basename = isProduction ? '/task-pro' : '/';

function App() {
  return (
    <BrowserRouter basename={basename}>
      <div>
        <Suspense fallback={<p>Loading....</p>}>
          <Routes>
          <Route path="/auth/:id" element={<AuthPage />} />
            <Route path="/start" element={<Start />} />
            <Route path="*" element={<Start />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
