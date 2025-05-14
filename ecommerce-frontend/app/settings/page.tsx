"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [keycloakSettings, setKeycloakSettings] = useState({
    issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || "http://localhost:8080/realms/my_realm_name",
    clientId: "",
    redirectUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/api/auth/callback/keycloak`,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setKeycloakSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // In a real app, this would save to a database or environment variables
      alert("Keycloak settings saved!")
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Failed to save settings")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your Keycloak OAuth2 and application settings</p>
        </div>

        <Tabs defaultValue="oauth">
          <TabsList>
            <TabsTrigger value="oauth">Keycloak OAuth Settings</TabsTrigger>
            <TabsTrigger value="general">General Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="oauth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Keycloak OAuth</CardTitle>
                <CardDescription>Configure your Keycloak OAuth settings for authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issuer">Keycloak Issuer URL</Label>
                    <Input id="issuer" name="issuer" value={keycloakSettings.issuer} onChange={handleChange} />
                    <p className="text-sm text-muted-foreground">
                      The URL of your Keycloak realm, e.g., http://localhost:8080/realms/my_realm_name
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="redirectUrl">Redirect URL</Label>
                    <Input
                      id="redirectUrl"
                      name="redirectUrl"
                      value={keycloakSettings.redirectUrl}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Use this URL in your Keycloak client settings as a valid redirect URI
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input id="clientId" name="clientId" value={keycloakSettings.clientId} onChange={handleChange} />
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="font-medium">Keycloak Client Setup Instructions (PKCE Flow):</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Create a new client in your Keycloak realm</li>
                      <li>Set "Client Protocol" to "openid-connect"</li>
                      <li>Set "Access Type" to "public" (for PKCE flow)</li>
                      <li>Enable "Standard Flow" and "Direct Access Grants"</li>
                      <li>Add the Redirect URL above to "Valid Redirect URIs"</li>
                      <li>No client secret is needed for PKCE flow</li>
                    </ol>
                  </div>

                  <Button type="submit">Save Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general application settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>General settings would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
