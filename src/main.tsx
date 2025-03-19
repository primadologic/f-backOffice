
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './components/providers/theme-provider'
import { AuthProvider } from './components/providers/auth-provider'
import { Toaster }  from "sonner"
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/custom-ui/error-fallback'
import "@/index.css"
import "@/App.css"



const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
              <Toaster 
                richColors
                position="bottom-left" 
                duration={5500}
                closeButton={true}
              />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>,
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}