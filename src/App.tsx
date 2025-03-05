
import Page from './app/login/page'
import { ModeToggle } from './components/custom-ui/theme-toggle'


function App() {

  return (

    <>
      <header className="w-full flex justify-end items-end px-7 py-4">
        <ModeToggle />
      </header>
      <main>
        <Page />
      </main>
    </>

  )
}

export default App
