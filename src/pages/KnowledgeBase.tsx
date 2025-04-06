
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileIcon, 
  FileTextIcon, 
  ImageIcon, 
  XIcon, 
  UploadIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  DownloadIcon,
  FolderIcon,
  BookOpenIcon,
  ClipboardIcon,
  SettingsIcon,
  RefreshCwIcon
} from "lucide-react";
import Navigation from "../components/Navigation";
import ChatBot from "../components/ChatBot";

export default function KnowledgeBase() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);

  const [files, setFiles] = useState<Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    status: string;
    preview?: string;
  }>>([
    {
      id: "1",
      name: "company-overview.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2023-04-06",
      status: "Processed",
      preview: "This document contains an overview of the company structure, mission statement, and key executives. The company was founded in 2010 with a mission to revolutionize...",
    },
    {
      id: "2",
      name: "financial-report-2023.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadDate: "2023-04-05",
      status: "Processed",
      preview: "Financial Report for Q1 2023\n\nRevenue: $1,245,000\nExpenses: $780,000\nNet Profit: $465,000\n\nKey Highlights:\n- 15% increase in revenue compared to Q4 2022\n- Expanded market share in North America...",
    },
    {
      id: "3",
      name: "product-specifications.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2023-04-04",
      status: "Processing",
    },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    
    setIsUploading(true);
    setShowUploadAnimation(true);
    
    // Simulate file upload with progress
    const totalFiles = uploadedFiles.length;
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + (100 / 20); // 20 steps to complete
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 120);
    
    // Simulate file upload and processing
    setTimeout(() => {
      const newFiles = Array.from(uploadedFiles).map((file, index) => {
        const fileExtension = file.name.split('.').pop()?.toUpperCase() || '';
        
        return {
          id: `new-${Date.now()}-${index}`,
          name: file.name,
          type: fileExtension,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: "Processing",
        };
      });
      
      setFiles([...newFiles, ...files]);
      setIsUploading(false);
      setUploadProgress(0);
      
      toast({
        title: "Files Uploaded",
        description: `${newFiles.length} file(s) have been uploaded and are being processed.`,
      });
      
      // Simulate processing completion after some time
      setTimeout(() => {
        setShowUploadAnimation(false);
        
        setFiles(prevFiles => 
          prevFiles.map(file => {
            if (file.status === "Processing" && newFiles.some(newFile => newFile.id === file.id)) {
              return {
                ...file,
                status: "Processed",
                preview: "This is the automatically extracted content from the uploaded document. In a real implementation, this would contain actual text extracted from the document.",
              };
            }
            return file;
          })
        );
        
        toast({
          title: "Processing Complete",
          description: "Your files have been processed and are now ready for use.",
        });
      }, 5000);
    }, 2000);
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    
    toast({
      title: "File Deleted",
      description: "The file has been removed from your knowledge base.",
    });
  };

  const handlePreviewToggle = (id: string) => {
    if (activePreview === id) {
      setActivePreview(null);
    } else {
      setActivePreview(id);
    }
  };

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF':
        return <FileIcon className="h-5 w-5 text-red-500" />;
      case 'DOCX':
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      case 'JPG':
      case 'PNG':
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />

      <div className="container mx-auto pt-20 px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient-primary">Knowledge Base</h1>
            <p className="text-muted-foreground mt-1">
              Upload and manage documents to train your AI model with domain-specific knowledge
            </p>
          </div>

          <Tabs defaultValue="upload" className="w-full animate-fade-in">
            <TabsList className="grid grid-cols-3 mb-8 glass-morphism">
              <TabsTrigger value="upload" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:shadow-[0_0_15px_rgba(127,90,240,0.5)]">
                <SettingsIcon className="h-4 w-4 mr-2" />
                KB Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <UploadIcon className="h-5 w-5 mr-2 text-primary" />
                    Upload Documents
                  </CardTitle>
                  <CardDescription>
                    Add documents to your knowledge base to enhance AI capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8 pt-4">
                    <div className={`border-2 border-dashed border-muted rounded-lg p-10 text-center transition-all duration-300 ${showUploadAnimation ? 'glow-effect' : ''}`}>
                      <div className="flex flex-col items-center gap-4">
                        <div className={`p-6 bg-primary/10 rounded-full transition-all duration-500 ${isUploading ? 'animate-pulse' : 'animate-float'}`}>
                          <UploadIcon className="h-12 w-12 text-primary" />
                        </div>
                        <div className="max-w-sm mx-auto">
                          <h3 className="font-semibold text-lg mb-1">
                            {isUploading ? 'Uploading files...' : 'Drag files here or click to upload'}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Supported formats: PDF, DOCX, TXT, CSV, XLSX
                          </p>
                          
                          {isUploading && (
                            <div className="w-full mb-4">
                              <Progress value={uploadProgress} className="h-2 bg-muted" />
                              <p className="text-xs text-muted-foreground mt-1">{Math.round(uploadProgress)}% uploaded</p>
                            </div>
                          )}
                          
                          <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            multiple
                            accept=".pdf,.docx,.txt,.csv,.xlsx"
                            onChange={handleFileUpload}
                          />
                          <Label htmlFor="file-upload">
                            <Button 
                              variant="outline" 
                              disabled={isUploading} 
                              className="relative cursor-pointer bg-muted/30 border-border/40 hover:bg-muted"
                            >
                              {isUploading ? "Uploading..." : "Select Files"}
                            </Button>
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <BookOpenIcon className="h-5 w-5 mr-2 text-primary" />
                        Document Processing
                      </h3>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-muted/20 p-6 rounded-lg border border-border/40 hover-lift enterprise-card">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <FileTextIcon className="h-4 w-4 text-primary" />
                            </div>
                            <h4 className="font-medium">Text Extraction</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            We extract and index all text content for advanced search and retrieval
                          </p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-lg border border-border/40 hover-lift enterprise-card">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <ClipboardIcon className="h-4 w-4 text-primary" />
                            </div>
                            <h4 className="font-medium">Semantic Analysis</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Documents are analyzed to understand meaning, context and relationships
                          </p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-lg border border-border/40 hover-lift enterprise-card">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <RefreshCwIcon className="h-4 w-4 text-primary" />
                            </div>
                            <h4 className="font-medium">AI Training</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Information is used to improve your AI model responses and understanding
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <FolderIcon className="h-5 w-5 mr-2 text-primary" />
                    Document Library
                  </CardTitle>
                  <CardDescription>
                    Manage your uploaded documents and knowledge sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 pt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="relative w-full sm:max-w-sm">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search documents..." 
                          className="pl-9 bg-muted/30 border-border/40" 
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="h-8 bg-muted/30 border-border/40">
                          <FilterIcon className="h-3 w-3 mr-1" />
                          Filter
                        </Button>
                        <Badge variant="outline" className="bg-muted/50">
                          {files.length} documents
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {files.map((file, index) => (
                        <div 
                          key={file.id} 
                          className={`border border-border/40 rounded-lg overflow-hidden bg-card/30 hover:bg-card/50 transition-colors animate-fade-in hover-lift`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted/50 rounded">
                                {getFileIcon(file.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{file.name}</h4>
                                <div className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-1">
                                  <Badge variant="outline" className="bg-muted/20 text-xs">
                                    {file.type}
                                  </Badge>
                                  <span>{file.size}</span>
                                  <span>Uploaded: {file.uploadDate}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <span 
                                  className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                    file.status === "Processed" ? "bg-green-500" : "bg-yellow-500"
                                  }`}
                                />
                                <span className="text-xs">{file.status}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handlePreviewToggle(file.id)}
                                  disabled={file.status !== "Processed"}
                                  className="h-8"
                                >
                                  <EyeIcon className="h-3.5 w-3.5 mr-1" />
                                  {activePreview === file.id ? "Hide" : "Preview"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteFile(file.id)}
                                  className="h-8 w-8"
                                >
                                  <TrashIcon className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {activePreview === file.id && file.preview && (
                            <div className="px-4 py-3 bg-muted/30 border-t border-border/40 animate-fade-in">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-sm flex items-center">
                                  <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
                                  Document Preview
                                </h5>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    <DownloadIcon className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm whitespace-pre-line bg-background/50 p-4 rounded border border-border/40">
                                {file.preview}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {files.length === 0 && (
                        <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border/40">
                          <div className="flex flex-col items-center gap-2">
                            <FolderIcon className="h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground">No documents have been uploaded yet.</p>
                            <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                              Upload Documents
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="enterprise-card hover-lift">
                <CardHeader className="border-b border-border/40">
                  <CardTitle className="flex items-center">
                    <SettingsIcon className="h-5 w-5 mr-2 text-primary" />
                    Knowledge Base Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your knowledge base processing settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3 animate-fade-in">
                        <Label className="text-sm font-medium">Processing Priority</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" className="bg-muted/30 border-border/40">Low</Button>
                          <Button variant="secondary" className="bg-primary text-primary-foreground shadow-[0_0_10px_rgba(127,90,240,0.3)]">Medium</Button>
                          <Button variant="outline" className="bg-muted/30 border-border/40">High</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Determines how quickly new documents are processed</p>
                      </div>
                    
                      <div className="space-y-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
                        <Label className="text-sm font-medium">Document Indexing</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="bg-muted/30 border-border/40">Basic</Button>
                          <Button variant="secondary" className="bg-primary text-primary-foreground shadow-[0_0_10px_rgba(127,90,240,0.3)]">Advanced</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Advanced indexing includes semantic understanding</p>
                      </div>
                    </div>

                    <Separator className="my-6 bg-border/40" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Extraction Features</Label>
                          <Badge variant="outline" className="bg-primary/10 text-primary">3/4 Enabled</Badge>
                        </div>
                        <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/40">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Text Content</span>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 px-3 py-1 bg-primary text-primary-foreground">Enabled</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Tables & Graphs</span>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 px-3 py-1 bg-primary text-primary-foreground">Enabled</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">Image Analysis</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-7 px-3 py-1 bg-muted/30 border-border/40">Disabled</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Metadata Extraction</span>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 px-3 py-1 bg-primary text-primary-foreground">Enabled</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Context Generation</Label>
                          <Badge variant="outline" className="bg-primary/10 text-primary">2/4 Enabled</Badge>
                        </div>
                        <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/40">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Semantic Matching</span>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 px-3 py-1 bg-primary text-primary-foreground">Enabled</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Cross-Document Links</span>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 px-3 py-1 bg-primary text-primary-foreground">Enabled</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">Auto-Summarization</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-7 px-3 py-1 bg-muted/30 border-border/40">Disabled</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">Topic Clustering</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-7 px-3 py-1 bg-muted/30 border-border/40">Disabled</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="glow-effect">Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
}
