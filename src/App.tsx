import { Suspense } from 'react';
import './index.css'
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor } from './store/store.js';
import LoadingPage from './components/LoadingPage.jsx';
import Router from './router/Router';
import { Toaster } from "@/components/ui/sonner"

function App() {

  return (
    <>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <Suspense fallback={<LoadingPage />}>
         <>
           <Toaster />
           <Router />
         </>
        </Suspense>
      </PersistGate>
    </>
  )
}

export default App
