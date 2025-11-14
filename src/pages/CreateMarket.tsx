import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StreamIndicator } from "@/components/StreamIndicator";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

const CreateMarket = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Market</h1>
        <p className="text-muted-foreground">
          Deploy a new prediction market connected to live Somnia data streams
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="lg:col-span-2 p-6 space-y-6 bg-card border-2 border-border">
          <div className="space-y-2">
            <Label htmlFor="question">Market Question</Label>
            <Textarea
              id="question"
              placeholder="e.g., Will SOMI price exceed $0.10 by 12:00 PM UTC?"
              className="min-h-[100px] bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="token">Token Price</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="protocol">Protocol Metrics</SelectItem>
                <SelectItem value="market">Market Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stream">Data Source (SDS Stream)</Label>
            <Select>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select data stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="somi-usd">SOMI/USD Price Feed</SelectItem>
                <SelectItem value="eth-usd">ETH/USD Price Feed</SelectItem>
                <SelectItem value="btc-usd">BTC/USD Price Feed</SelectItem>
                <SelectItem value="governance">Governance Vote Count</SelectItem>
                <SelectItem value="users">Daily Active Users</SelectItem>
                <SelectItem value="tvl">Total Value Locked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Trigger Condition</Label>
              <Select>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater">Value &gt;</SelectItem>
                  <SelectItem value="less">Value &lt;</SelectItem>
                  <SelectItem value="equal">Value =</SelectItem>
                  <SelectItem value="between">Value Between</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Target Value</Label>
              <Input 
                id="value"
                type="text" 
                placeholder="e.g., 0.10"
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">End Date</Label>
              <Input 
                id="date"
                type="date" 
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">End Time (UTC)</Label>
              <Input 
                id="time"
                type="time" 
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initial">Initial Liquidity (SOMI)</Label>
            <Input 
              id="initial"
              type="number" 
              placeholder="100"
              className="bg-input border-border"
            />
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan">
            <Sparkles className="mr-2 h-4 w-4" />
            Deploy Market
          </Button>
        </Card>

        {/* Preview */}
        <div className="space-y-6">
          <Card className="p-6 bg-card/50 border-2 border-accent/30">
            <h3 className="text-lg font-semibold mb-4">Live Stream Preview</h3>
            <div className="space-y-4">
              <StreamIndicator value="$0.087" label="Current Value" />
              
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stream Type</span>
                  <span className="font-medium">Price Feed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Update Frequency</span>
                  <span className="font-medium">Real-time</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Update</span>
                  <span className="font-medium">2s ago</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="text-xs text-muted-foreground mb-2">Recent Values</div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between">
                    <span>12:34:56</span>
                    <span className="text-primary">$0.087</span>
                  </div>
                  <div className="flex justify-between">
                    <span>12:34:51</span>
                    <span>$0.086</span>
                  </div>
                  <div className="flex justify-between">
                    <span>12:34:46</span>
                    <span>$0.087</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-secondary/10 border border-secondary/30">
            <p className="text-sm text-muted-foreground">
              Your market will automatically resolve based on the selected data stream when the condition is met or time expires.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateMarket;
