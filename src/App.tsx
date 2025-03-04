
import { ThemeProvider } from './components/providers/theme-provider'
import { Link } from '@tanstack/react-router'

function App() {

  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col gap-8 w-full min-h-screen  justify-center items-center">
          <h1>FraudWall Backoffice is under redevelopment</h1>
          <Link to='.' className="font-medium text-2xl hover:underline">View dashboard</Link>
        </div>
      </ThemeProvider>
    </>

  )
}

export default App
