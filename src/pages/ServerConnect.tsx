
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navigation from "../components/Navigation";
import ChatBot from "../components/ChatBot";
import { 
  ServerIcon, 
  CloudIcon, 
  SettingsIcon, 
  DatabaseIcon,
  AlertCircleIcon,
  BookIcon,
  ShieldIcon,
  ActivityIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ArrowRightCircleIcon,
  WifiIcon,
  LockIcon
} from "lucide-react";

export default function ServerConnect() {
  const { toast } = useToast();
  const [serverType, setServerType] = useState("wardrobe");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [animateConnect, setAnimateConnect] = useState(false);
  const [serverConfig, setServerConfig] = useState({
    endpoint: "",
    apiKey: "",
    region: "us-west-1",
    maxConnections: "10",
    timeout: "30",
    ssl: true,
    advanced: false,
  });

  const handleConnect = () => {
    if (!serverConfig.endpoint || !serverConfig.apiKey) {
      toast({
        title: "Missing Information",
        description: "Please provide all required server information.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    setAnimateConnect(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${serverType} MCP server.`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    
    toast({
      title: "Disconnected",
      description: "You've been disconnected from the server.",
    });
  };

  const handleConfigChange = (field: string, value: string | boolean) => {
    setServerConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const serverTypeOptions = [
    { value: "wardrobe", label: "Wardrobe MCP" },
    { value: "scraping", label: "Scraping MCP" },
    { value: "custom", label: "Custom MCP Server" },
  ];

  const regionOptions = [
    { value: "us-west-1", label: "US West (N. California)" },
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "eu-central-1", label: "EU (Frankfurt)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="container mx-auto pt-20 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-gradient-primary">MCP Server Connection</h1>
              <p className="text-muted-foreground mt-1">
                Connect to your MCP servers and configure integration settings
              </p>
            </div>
            
            {isConnected ? (
              <div className="flex items-center gap-2 animate-scale-in">
                <div className="size-3 rounded-full bg-green-500 animate-pulse-glow"></div>
                <span className="text-green-500 font-medium">Connected</span>
              </div>
            ) : null}
          </div>

          <Tabs defaultValue="connect" className="w-full animate-fade-in">
            <TabsList className="grid grid-cols-3 mb-8 glass-morphism">
              <TabsTrigger value="connect" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <ServerIcon className="h-4 w-4 mr-2" />
                Connect
              </TabsTrigger>
              <TabsTrigger value="settings" disabled={!isConnected} className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Server Settings
              </TabsTrigger>
              <TabsTrigger value="logs" disabled={!isConnected} className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <ActivityIcon className="h-4 w-4 mr-2" />
                Connection Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connect">
              <Card className="mb-8 enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <CloudIcon className="h-5 w-5 mr-2 text-primary" />
                    Server Configuration
                  </CardTitle>
                  <CardDescription>
                    Enter your MCP server details to establish a secure connection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="server-type" className="text-sm font-medium">Server Type</Label>
                      <Select
                        value={serverType}
                        onValueChange={(value) => setServerType(value)}
                      >
                        <SelectTrigger id="server-type" className="bg-muted/30 border-border/40">
                          <SelectValue placeholder="Select server type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 backdrop-blur-lg">
                          {serverTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="hover:bg-muted/50">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 transition-all duration-300 ease-in-out">
                      <Label htmlFor="endpoint" className="text-sm font-medium">Server Endpoint</Label>
                      <div className="relative">
                        <Input
                          id="endpoint"
                          placeholder="https://your-mcp-endpoint.com"
                          value={serverConfig.endpoint}
                          onChange={(e) =>
                            handleConfigChange("endpoint", e.target.value)
                          }
                          className="bg-muted/30 border-border/40 pl-10"
                        />
                        <ServerIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2 transition-all duration-300 ease-in-out">
                      <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
                      <div className="relative">
                        <Input
                          id="api-key"
                          type="password"
                          placeholder="Enter your API key"
                          value={serverConfig.apiKey}
                          onChange={(e) =>
                            handleConfigChange("apiKey", e.target.value)
                          }
                          className="bg-muted/30 border-border/40 pl-10"
                        />
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-sm font-medium">Region</Label>
                      <Select
                        value={serverConfig.region}
                        onValueChange={(value) =>
                          handleConfigChange("region", value)
                        }
                      >
                        <SelectTrigger id="region" className="bg-muted/30 border-border/40">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 backdrop-blur-lg">
                          {regionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="hover:bg-muted/50">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator className="my-2 bg-border/40" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="advanced" className="text-sm font-medium">Advanced Settings</Label>
                        <p className="text-sm text-muted-foreground">
                          Configure additional connection parameters
                        </p>
                      </div>
                      <Switch
                        id="advanced"
                        checked={serverConfig.advanced}
                        onCheckedChange={(value) =>
                          handleConfigChange("advanced", value)
                        }
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>

                    {serverConfig.advanced && (
                      <div className="space-y-4 pt-4 border-t border-border/40 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="max-connections" className="text-sm font-medium">
                              Max Connections
                            </Label>
                            <Input
                              id="max-connections"
                              type="number"
                              value={serverConfig.maxConnections}
                              onChange={(e) =>
                                handleConfigChange(
                                  "maxConnections",
                                  e.target.value
                                )
                              }
                              className="bg-muted/30 border-border/40"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeout" className="text-sm font-medium">Timeout (seconds)</Label>
                            <Input
                              id="timeout"
                              type="number"
                              value={serverConfig.timeout}
                              onChange={(e) =>
                                handleConfigChange("timeout", e.target.value)
                              }
                              className="bg-muted/30 border-border/40"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="ssl"
                            checked={serverConfig.ssl}
                            onCheckedChange={(value) =>
                              handleConfigChange("ssl", value)
                            }
                            className="data-[state=checked]:bg-primary"
                          />
                          <Label htmlFor="ssl" className="text-sm font-medium">Enable SSL/TLS</Label>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/40 bg-muted/10">
                  {!isConnected ? (
                    <Button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className={`w-full glow-effect ${animateConnect ? 'animate-pulse-glow' : ''}`}
                    >
                      {isConnecting ? (
                        <div className="flex items-center">
                          <span className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent border-white rounded-full"></span>
                          Connecting...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <ArrowRightCircleIcon className="h-4 w-4 mr-2" />
                          Connect to Server
                        </div>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleDisconnect}
                      variant="destructive"
                      className="w-full hover:bg-destructive/90"
                    >
                      <XCircleIcon className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              {/* Documentation card */}
              <Card className="glow-effect hover-lift enterprise-card">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-2 text-primary" />
                    Connection Guide
                  </CardTitle>
                  <CardDescription>
                    How to find your MCP server information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3 animate-fade-in transition-all duration-300">
                      <div className="p-2 bg-primary/10 rounded-full shrink-0">
                        <LockIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Finding your API Key</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          You can find your API key in your MCP server dashboard under 
                          Settings &gt; API Access. If you don't have an API key yet, 
                          you'll need to generate one.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 animate-fade-in transition-all duration-300 delay-100">
                      <div className="p-2 bg-primary/10 rounded-full shrink-0">
                        <ServerIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Server Endpoint Format</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your server endpoint should follow this format:
                          <code className="ml-1 p-1 bg-muted/30 rounded text-xs">https://[server-name].[region].mcp-service.com</code>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 animate-fade-in transition-all duration-300 delay-200">
                      <div className="p-2 bg-primary/10 rounded-full shrink-0">
                        <AlertCircleIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Connection Issues?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Make sure your firewall settings allow outbound connections to 
                          the MCP service. For additional help, check our documentation 
                          or contact support.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              {isConnected && (
                <Card className="enterprise-card hover-lift">
                  <CardHeader className="border-b border-border/40">
                    <CardTitle className="flex items-center">
                      <SettingsIcon className="h-5 w-5 mr-2 text-primary" />
                      Server Settings
                    </CardTitle>
                    <CardDescription>
                      Configure your connected MCP server settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="pt-4">
                      <p className="text-muted-foreground mb-4">
                        These settings will be applied to your current MCP server connection.
                      </p>
                      {/* Settings content */}
                      <div className="space-y-6">
                        <div className="space-y-4 animate-fade-in">
                          <div className="flex items-center justify-between bg-muted/20 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <ActivityIcon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium text-sm">Connection Status</h3>
                                <p className="text-xs text-muted-foreground">Currently active</p>
                              </div>
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-500 py-1 px-2 rounded-full flex items-center">
                              <WifiIcon className="h-3 w-3 mr-1" />
                              Online
                            </span>
                          </div>

                          <div className="space-y-2">
                            <Label>Rate Limiting</Label>
                            <div className="flex gap-2">
                              <Input 
                                placeholder="100" 
                                className="bg-muted/30 border-border/40 w-20" 
                                defaultValue="100"
                              />
                              <span className="flex items-center text-sm text-muted-foreground">requests per minute</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Caching Strategy</Label>
                            <Select defaultValue="aggressive">
                              <SelectTrigger className="bg-muted/30 border-border/40">
                                <SelectValue placeholder="Select caching strategy" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border/40 backdrop-blur-lg">
                                <SelectItem value="aggressive" className="hover:bg-muted/50">Aggressive</SelectItem>
                                <SelectItem value="balanced" className="hover:bg-muted/50">Balanced</SelectItem>
                                <SelectItem value="minimal" className="hover:bg-muted/50">Minimal</SelectItem>
                                <SelectItem value="disabled" className="hover:bg-muted/50">Disabled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Separator className="my-4 bg-border/40" />
                        
                        <div className="space-y-4 animate-fade-in">
                          <h3 className="text-sm font-medium">Security Settings</h3>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                              <div className="flex items-center gap-2">
                                <ShieldIcon className="h-4 w-4 text-primary" />
                                <span className="text-sm">Request Encryption</span>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                              <div className="flex items-center gap-2">
                                <DatabaseIcon className="h-4 w-4 text-primary" />
                                <span className="text-sm">Payload Compression</span>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/40 bg-muted/10">
                    <Button className="w-full glow-effect">
                      <CheckCircle2Icon className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="logs">
              {isConnected && (
                <Card className="enterprise-card hover-lift">
                  <CardHeader className="border-b border-border/40">
                    <CardTitle className="flex items-center">
                      <ActivityIcon className="h-5 w-5 mr-2 text-primary" />
                      Connection Logs
                    </CardTitle>
                    <CardDescription>
                      View activity and connection logs for your MCP server
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-4 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 bg-muted/30 border-border/40">
                          Refresh
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-muted/30 border-border/40">
                          Clear
                        </Button>
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] h-8 bg-muted/30 border-border/40">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 backdrop-blur-lg">
                          <SelectItem value="all">All logs</SelectItem>
                          <SelectItem value="info">Info only</SelectItem>
                          <SelectItem value="error">Errors only</SelectItem>
                          <SelectItem value="debug">Debug only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="h-64 overflow-y-auto bg-muted/30 p-4 rounded-md font-mono text-sm border border-border/40 animate-fade-in">
                      <p className="text-green-500 opacity-0 animate-fade-in" style={{animationDelay: "100ms"}}>
                        [INFO] {new Date().toISOString()} - Connection established to {serverType} MCP server
                      </p>
                      <p className="text-muted-foreground opacity-0 animate-fade-in" style={{animationDelay: "200ms"}}>
                        [DEBUG] {new Date().toISOString()} - Handshake completed
                      </p>
                      <p className="text-muted-foreground opacity-0 animate-fade-in" style={{animationDelay: "300ms"}}>
                        [DEBUG] {new Date().toISOString()} - API Version: 2.1.0
                      </p>
                      <p className="text-blue-500 opacity-0 animate-fade-in" style={{animationDelay: "400ms"}}>
                        [INFO] {new Date().toISOString()} - Server capabilities: AI processing, data streaming, bulk operations
                      </p>
                      <p className="text-muted-foreground opacity-0 animate-fade-in" style={{animationDelay: "500ms"}}>
                        [DEBUG] {new Date().toISOString()} - Connection parameters configured
                      </p>
                      <p className="text-green-500 opacity-0 animate-fade-in" style={{animationDelay: "600ms"}}>
                        [INFO] {new Date().toISOString()} - Ready to process requests
                      </p>
                      <p className="text-muted-foreground opacity-0 animate-fade-in" style={{animationDelay: "700ms"}}>
                        [DEBUG] {new Date().toISOString()} - Initializing data pipeline
                      </p>
                      <p className="text-blue-500 opacity-0 animate-fade-in" style={{animationDelay: "800ms"}}>
                        [INFO] {new Date().toISOString()} - Data pipeline initialized successfully
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
}
