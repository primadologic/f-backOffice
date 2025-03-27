import { ShieldX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6 text-center">
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <ShieldX className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Access Denied</h1>

        <div className="space-y-3">
          <p className="text-muted-foreground text-lg">You don't have permission to access this resource.</p>
          <p className="text-muted-foreground">
            If you believe this is an error, please contact your administrator or try signing in with a different
            account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild>
            <Link to="/accounts">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}