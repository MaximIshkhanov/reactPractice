import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx'
import './index.css'
import store from './reducers/store.ts';

const Main = () => {
  
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <App /> 
   
    </Provider>,
)

export default Main;