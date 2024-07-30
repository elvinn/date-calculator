import { Analytics } from "@vercel/analytics/react"

import Card from './components/Card';
import './App.css';

function App() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Card />
      <Analytics />
    </div>
  );
}

export default App;
