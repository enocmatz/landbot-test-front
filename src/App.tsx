import './App.css'
import { BotProvider } from './components/application-wizard/context/BotProvider'
import { Wizard } from './components/application-wizard/Wizard'
function App() {

  return (
    <div className='App'>
      <BotProvider>
        <Wizard />
      </BotProvider>
    </div>
  )
}

export default App
