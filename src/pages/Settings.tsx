import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, Bell, Wallet, Shield } from "lucide-react";

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and notifications
        </p>
      </div>

      {/* Wallet Settings */}
      <Card className="p-6 bg-card border-2 border-border">
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Wallet Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Connected Wallet</Label>
              <p className="text-sm text-muted-foreground">0x742d...5f8a</p>
            </div>
            <Button variant="outline">Disconnect</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Network</Label>
              <p className="text-sm text-muted-foreground">Somnia Testnet</p>
            </div>
            <Button variant="outline" size="sm">Switch Network</Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 bg-card border-2 border-border">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="market-resolved">Market Resolved</Label>
              <p className="text-sm text-muted-foreground">Get notified when markets you've bet on are resolved</p>
            </div>
            <Switch id="market-resolved" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="price-alerts">Price Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive alerts when odds change significantly</p>
            </div>
            <Switch id="price-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-markets">New Markets</Label>
              <p className="text-sm text-muted-foreground">Be notified of newly created markets</p>
            </div>
            <Switch id="new-markets" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ending-soon">Ending Soon</Label>
              <p className="text-sm text-muted-foreground">Alerts for markets ending within 1 hour</p>
            </div>
            <Switch id="ending-soon" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Trading Settings */}
      <Card className="p-6 bg-card border-2 border-border">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Trading Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-amount">Default Bet Amount (SOMI)</Label>
            <Input 
              id="default-amount" 
              type="number" 
              placeholder="100"
              className="bg-input border-border"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="confirmation">Require Confirmation</Label>
              <p className="text-sm text-muted-foreground">Ask for confirmation before placing bets</p>
            </div>
            <Switch id="confirmation" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="slippage">Show Slippage Warnings</Label>
              <p className="text-sm text-muted-foreground">Warn when odds change during transaction</p>
            </div>
            <Switch id="slippage" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 bg-card border-2 border-border">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Management</Label>
              <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
            </div>
            <Button variant="outline">Clear Sessions</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-approve">Auto-approve Transactions</Label>
              <p className="text-sm text-muted-foreground">Skip wallet approval for small amounts</p>
            </div>
            <Switch id="auto-approve" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
