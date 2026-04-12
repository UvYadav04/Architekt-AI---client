import { RouterProvider } from 'react-router-dom'
import './index.css'

import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import router from './routes'
import { store } from './redux/store'
import { ReactFlowProvider } from '@xyflow/react'


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT}>
    <ReactFlowProvider>
        <Provider store={store}>
          <Toaster position='top-right' richColors />
          <RouterProvider router={router} />
      </Provider>
    </ReactFlowProvider>
     </GoogleOAuthProvider>
  )
}

export default App


