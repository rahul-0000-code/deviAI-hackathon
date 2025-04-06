
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Settings as SettingsIcon, 
  Bell, 
  BarChart,
  Globe,
  FileText,
  MessageSquare,
  Sliders,
  Check,
  Save,
  AlertCircle,
  Terminal,
  Lock,
  PenLine,
  Zap
} from "lucide-react";
import Navigation from "../components/Navigation";
import ChatBot from "../components/ChatBot";

export default function Settings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    appName: "My AI Application",
    description: "An AI-powered application for data processing and analysis",
    notificationsEnabled: true,
    analyticsEnabled: true,
  });

  const [domainSettings, setDomainSettings] = useState({
    industry: "Technology",
    primaryDomain: "",
    contextualInformation: "",
    enabledFeatures: {
      documentAnalysis: true,
      semanticSearch: true,
      conversationalAI: true,
      dataSynthesis: false,
    },
  });

  const [promptSettings, setPromptSettings] = useState({
    systemPrompt: "You are an AI assistant specialized in technology and data analysis. Help the user with their queries in a professional and concise manner.",
    defaultTemperature: "0.7",
    maxResponseTokens: "1024",
    includeDomainContext: true,
  });

  const handleGeneralSettingsChange = (field: string, value: string | boolean) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDomainSettingsChange = (field: string, value: string | boolean | object) => {
    setDomainSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePromptSettingsChange = (field: string, value: string | boolean) => {
    setPromptSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleFeature = (feature: string) => {
    setDomainSettings((prev) => ({
      ...prev,
      enabledFeatures: {
        ...prev.enabledFeatures,
        [feature]: !prev.enabledFeatures[feature as keyof typeof prev.enabledFeatures],
      },
    }));
  };

  const handleSaveSettings = (section: string) => {
    setIsSaving(true);
    setShowSaveAnimation(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveAnimation(false);
      
      toast({
        title: "Settings Saved",
        description: `Your ${section} settings have been updated successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="container mx-auto pt-20 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient-primary">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your application, domain information and AI configuration
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full animate-fade-in">
            <TabsList className="grid grid-cols-3 mb-8 glass-morphism">
              <TabsTrigger value="general" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <SettingsIcon className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="domain" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <Globe className="h-4 w-4 mr-2" />
                Domain Settings
              </TabsTrigger>
              <TabsTrigger value="prompts" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <MessageSquare className="h-4 w-4 mr-2" />
                Prompt Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card className="enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <SettingsIcon className="h-5 w-5 mr-2 text-primary" />
                    General Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your application settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2 transition-all duration-300">
                      <Label htmlFor="app-name" className="text-sm font-medium">Application Name</Label>
                      <div className="relative">
                        <PenLine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="app-name"
                          value={generalSettings.appName}
                          onChange={(e) =>
                            handleGeneralSettingsChange("appName", e.target.value)
                          }
                          className="pl-10 bg-muted/30 border-border/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 transition-all duration-300">
                      <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        value={generalSettings.description}
                        onChange={(e) =>
                          handleGeneralSettingsChange("description", e.target.value)
                        }
                        className="bg-muted/30 border-border/40 resize-none"
                      />
                    </div>

                    <Separator className="my-6 bg-border/40" />

                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/40 hover-lift enterprise-card">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications" className="text-sm font-medium flex items-center">
                            <Bell className="h-4 w-4 mr-2 text-primary" />
                            Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about system updates and events
                          </p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={generalSettings.notificationsEnabled}
                          onCheckedChange={(value) =>
                            handleGeneralSettingsChange("notificationsEnabled", value)
                          }
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/40 hover-lift enterprise-card">
                        <div className="space-y-0.5">
                          <Label htmlFor="analytics" className="text-sm font-medium flex items-center">
                            <BarChart className="h-4 w-4 mr-2 text-primary" />
                            Usage Analytics
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow collection of anonymized usage data to improve the service
                          </p>
                        </div>
                        <Switch
                          id="analytics"
                          checked={generalSettings.analyticsEnabled}
                          onCheckedChange={(value) =>
                            handleGeneralSettingsChange("analyticsEnabled", value)
                          }
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20 hover-lift animated-gradient-border">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium flex items-center">
                            <Lock className="h-4 w-4 mr-2 text-primary" />
                            Security Settings
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Configure advanced security options
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="bg-muted/30 border-border/40">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`border-t border-border/40 bg-muted/10 ${showSaveAnimation ? 'animate-pulse' : ''}`}>
                  <Button
                    onClick={() => handleSaveSettings("general")}
                    disabled={isSaving}
                    className="ml-auto glow-effect"
                  >
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Settings
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="domain">
              <Card className="enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    Domain Settings
                  </CardTitle>
                  <CardDescription>
                    Configure domain-specific information for your AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg animate-fade-in mb-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full mt-0.5 shrink-0">
                          <AlertCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Why Domain Settings Matter</h3>
                          <p className="text-sm text-muted-foreground">
                            Providing domain-specific information helps tailor AI responses to your specific industry and use cases,
                            improving accuracy and relevance of generated content.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="industry"
                          value={domainSettings.industry}
                          onChange={(e) =>
                            handleDomainSettingsChange("industry", e.target.value)
                          }
                          className="pl-10 bg-muted/30 border-border/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primary-domain" className="text-sm font-medium">Primary Domain</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="primary-domain"
                          placeholder="e.g., healthcare.ai, finance.tech"
                          value={domainSettings.primaryDomain}
                          onChange={(e) =>
                            handleDomainSettingsChange("primaryDomain", e.target.value)
                          }
                          className="pl-10 bg-muted/30 border-border/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contextual-information" className="text-sm font-medium flex items-center justify-between">
                        <span>Contextual Information</span>
                        <Badge variant="outline" className="text-xs bg-muted/30">Recommended</Badge>
                      </Label>
                      <Textarea
                        id="contextual-information"
                        rows={5}
                        placeholder="Enter domain-specific information that will help improve AI responses..."
                        value={domainSettings.contextualInformation}
                        onChange={(e) =>
                          handleDomainSettingsChange(
                            "contextualInformation",
                            e.target.value
                          )
                        }
                        className="bg-muted/30 border-border/40 resize-none"
                      />
                    </div>

                    <Separator className="my-6 bg-border/40" />

                    <div className="animate-fade-in">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-primary" />
                          Enabled Features
                        </h3>
                        <Badge className="bg-primary/20 text-primary border-none">
                          {Object.values(domainSettings.enabledFeatures).filter(Boolean).length}/4 Enabled
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/40 hover-lift">
                          <Label htmlFor="document-analysis" className="cursor-pointer text-sm">
                            Document Analysis
                          </Label>
                          <Switch
                            id="document-analysis"
                            checked={domainSettings.enabledFeatures.documentAnalysis}
                            onCheckedChange={() => toggleFeature("documentAnalysis")}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/40 hover-lift">
                          <Label htmlFor="semantic-search" className="cursor-pointer text-sm">
                            Semantic Search
                          </Label>
                          <Switch
                            id="semantic-search"
                            checked={domainSettings.enabledFeatures.semanticSearch}
                            onCheckedChange={() => toggleFeature("semanticSearch")}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/40 hover-lift">
                          <Label htmlFor="conversational-ai" className="cursor-pointer text-sm">
                            Conversational AI
                          </Label>
                          <Switch
                            id="conversational-ai"
                            checked={domainSettings.enabledFeatures.conversationalAI}
                            onCheckedChange={() => toggleFeature("conversationalAI")}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/40 hover-lift">
                          <Label htmlFor="data-synthesis" className="cursor-pointer text-sm">
                            Data Synthesis
                          </Label>
                          <Switch
                            id="data-synthesis"
                            checked={domainSettings.enabledFeatures.dataSynthesis}
                            onCheckedChange={() => toggleFeature("dataSynthesis")}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`border-t border-border/40 bg-muted/10 ${showSaveAnimation ? 'animate-pulse' : ''}`}>
                  <Button
                    onClick={() => handleSaveSettings("domain")}
                    disabled={isSaving}
                    className="ml-auto glow-effect"
                  >
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Settings
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="prompts">
              <Card className="enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Prompt Settings
                  </CardTitle>
                  <CardDescription>
                    Configure AI prompts and parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="system-prompt" className="text-sm font-medium flex items-center justify-between">
                        <span className="flex items-center">
                          <Terminal className="h-4 w-4 mr-2 text-primary" />
                          Default System Prompt
                        </span>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-none">Critical</Badge>
                      </Label>
                      <Textarea
                        id="system-prompt"
                        rows={5}
                        value={promptSettings.systemPrompt}
                        onChange={(e) =>
                          handlePromptSettingsChange("systemPrompt", e.target.value)
                        }
                        className="font-mono text-sm bg-muted/30 border-border/40 resize-none"
                      />
                      <p className="text-sm text-muted-foreground">
                        This is the default prompt that will be used to guide AI responses. Be specific about tone, style and constraints.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-4">
                        <Label htmlFor="temperature" className="text-sm font-medium flex items-center justify-between">
                          <span>Default Temperature</span>
                          <span className="text-sm text-primary">{promptSettings.defaultTemperature}</span>
                        </Label>
                        <div className="space-y-5">
                          <Slider 
                            id="temperature"
                            min={0} 
                            max={1} 
                            step={0.1} 
                            value={[parseFloat(promptSettings.defaultTemperature)]}
                            onValueChange={(value) => handlePromptSettingsChange("defaultTemperature", String(value[0]))}
                            className="pt-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span className="flex flex-col items-center">
                              <span>0.0</span>
                              <span>Deterministic</span>
                            </span>
                            <span className="flex flex-col items-center">
                              <span>0.5</span>
                              <span>Balanced</span>
                            </span>
                            <span className="flex flex-col items-center">
                              <span>1.0</span>
                              <span>Creative</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="max-tokens" className="text-sm font-medium flex items-center justify-between">
                          <span>Max Response Tokens</span>
                          <span className="text-sm text-primary">{promptSettings.maxResponseTokens}</span>
                        </Label>
                        <div className="space-y-2">
                          <Slider
                            id="max-tokens"
                            min={100}
                            max={2000}
                            step={100}
                            value={[parseInt(promptSettings.maxResponseTokens)]}
                            onValueChange={(value) => handlePromptSettingsChange("maxResponseTokens", String(value[0]))}
                            className="pt-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Shorter</span>
                            <span>Longer</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6 bg-border/40" />

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/40 hover-lift">
                      <div className="space-y-0.5">
                        <Label htmlFor="include-domain" className="text-sm font-medium">
                          Include Domain Context
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically include your domain information in prompts
                        </p>
                      </div>
                      <Switch
                        id="include-domain"
                        checked={promptSettings.includeDomainContext}
                        onCheckedChange={(value) =>
                          handlePromptSettingsChange("includeDomainContext", value)
                        }
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>

                    <div className="bg-card/40 p-4 rounded-lg border border-border/40 space-y-3 mt-4 animate-fade-in">
                      <h4 className="font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        Prompt Templates
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Use these variables in your prompts:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="text-sm bg-muted/30 px-3 py-2 rounded flex items-center justify-between hover-lift">
                          <code className="text-primary">{"{{domain}}"}</code>
                          <span className="text-xs text-muted-foreground">Your domain/industry</span>
                        </div>
                        <div className="text-sm bg-muted/30 px-3 py-2 rounded flex items-center justify-between hover-lift">
                          <code className="text-primary">{"{{context}}"}</code>
                          <span className="text-xs text-muted-foreground">Contextual information</span>
                        </div>
                        <div className="text-sm bg-muted/30 px-3 py-2 rounded flex items-center justify-between hover-lift">
                          <code className="text-primary">{"{{user}}"}</code>
                          <span className="text-xs text-muted-foreground">Current user name</span>
                        </div>
                        <div className="text-sm bg-muted/30 px-3 py-2 rounded flex items-center justify-between hover-lift">
                          <code className="text-primary">{"{{query}}"}</code>
                          <span className="text-xs text-muted-foreground">User's question</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button size="sm" variant="outline" className="text-xs h-7 bg-muted/30 border-border/40">
                          <Sliders className="h-3 w-3 mr-1" />
                          Manage Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`border-t border-border/40 bg-muted/10 ${showSaveAnimation ? 'animate-pulse' : ''}`}>
                  <Button
                    onClick={() => handleSaveSettings("prompt")}
                    disabled={isSaving}
                    className="ml-auto glow-effect"
                  >
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Settings
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
}
