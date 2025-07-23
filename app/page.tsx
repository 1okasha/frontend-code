"use client"

import { useState } from "react"
import Dashboard from "../components/dashboard/dashboard"
import CreateAgent from "../components/create-agent/create-agent"
import AgentsPage from "../components/pages/agents-page"
import KnowledgeBasePage from "../components/pages/knowledge-base-page"
import ToolsPage from "../components/pages/tools-page"
import VoicesPage from "../components/pages/voices-page"
import IntegrationsPage from "../components/pages/integrations-page"
import PhoneNumbersPage from "../components/pages/phone-numbers-page"
import OutboundPage from "../components/pages/outbound-page"
import SettingsPage from "../components/pages/settings-page"

export type ViewType =
  | "dashboard"
  | "agents"
  | "create-agent"
  | "knowledge-base"
  | "tools"
  | "voices"
  | "integrations"
  | "phone-numbers"
  | "outbound"
  | "settings"

export default function Page() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onCreateAgent={() => setCurrentView("create-agent")} onNavigate={handleNavigation} />
      case "agents":
        return <AgentsPage onCreateAgent={() => setCurrentView("create-agent")} onNavigate={handleNavigation} />
      case "create-agent":
        return <CreateAgent onBackToDashboard={() => setCurrentView("agents")} onNavigate={handleNavigation} />
      case "knowledge-base":
        return <KnowledgeBasePage onNavigate={handleNavigation} />
      case "tools":
        return <ToolsPage onNavigate={handleNavigation} />
      case "voices":
        return <VoicesPage onNavigate={handleNavigation} />
      case "integrations":
        return <IntegrationsPage onNavigate={handleNavigation} />
      case "phone-numbers":
        return <PhoneNumbersPage onNavigate={handleNavigation} />
      case "outbound":
        return <OutboundPage onNavigate={handleNavigation} />
      case "settings":
        return <SettingsPage onNavigate={handleNavigation} />
      default:
        return <Dashboard onCreateAgent={() => setCurrentView("create-agent")} onNavigate={handleNavigation} />
    }
  }

  return renderCurrentView()
}
