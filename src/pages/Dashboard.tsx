import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StreamIndicator } from "@/components/StreamIndicator";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12 border-2 border-primary/20 animate-border-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-stream" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm">Powered by Somnia Data Streams</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Make Predictions That Evolve in Real Time
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Create and trade on prediction markets that automatically update based on live blockchain data streams.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
              onClick={() => navigate("/markets")}
            >
              View Active Markets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-secondary/50 hover:bg-secondary/10"
              onClick={() => navigate("/create")}
            >
              Create a Market
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card/50 border-2 border-border hover:border-primary/50 transition-all">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Markets</p>
            <p className="text-3xl font-bold text-primary">24</p>
            <StreamIndicator label="Live Updates" className="text-xs" />
          </div>
        </Card>
        
        <Card className="p-6 bg-card/50 border-2 border-border hover:border-secondary/50 transition-all">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Volume</p>
            <p className="text-3xl font-bold text-secondary">12,847 SOMI</p>
            <p className="text-xs text-accent">+23% this week</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-card/50 border-2 border-border hover:border-accent/50 transition-all">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your Active Bets</p>
            <p className="text-3xl font-bold text-accent">8</p>
            <p className="text-xs text-muted-foreground">Across 5 markets</p>
          </div>
        </Card>
      </div>

      {/* Stream Status */}
      <Card className="p-6 bg-card/30 border-2 border-accent/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Somnia Data Streams Status</h3>
            <p className="text-sm text-muted-foreground">
              Connected to 12 live data streams providing real-time market updates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-sm font-medium text-accent">Online</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
