"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleKeycloakSignIn = async () => {
    setIsLoading(true)
    await signIn("keycloak", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Sign in to your account using Keycloak authentication with PKCE flow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleKeycloakSignIn} className="w-full" disabled={isLoading}>
            <Shield className="mr-2 h-4 w-4" />
            {isLoading ? "Signing in..." : "Sign in with Keycloak"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
