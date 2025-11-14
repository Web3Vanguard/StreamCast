import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import { StreamIndicator } from "@/components/StreamIndicator";

const MyBets = () => {
  const bets = [
    {
      question: "Will SOMI price exceed $0.10 by 12:00 PM UTC?",
      side: "YES",
      amount: 150,
      currentValue: "$0.087",
      odds: 62,
      potentialPayout: 241.94,
      status: "active",
      timeLeft: "2h 34m",
    },
    {
      question: "Will governance proposal #42 pass with >60% approval?",
      side: "YES",
      amount: 200,
      currentValue: "58.3%",
      odds: 55,
      potentialPayout: 363.64,
      status: "active",
      timeLeft: "1d 8h",
    },
    {
      question: "Will ETH/USD break $3,000 in the next 24 hours?",
      side: "NO",
      amount: 100,
      currentValue: "$2,947",
      odds: 52,
      potentialPayout: 192.31,
      status: "active",
      timeLeft: "23h 12m",
    },
    {
      question: "Will BTC dominance fall below 48% by end of month?",
      side: "NO",
      amount: 250,
      currentValue: "52.1%",
      odds: 65,
      potentialPayout: 384.62,
      status: "won",
      profit: 134.62,
    },
    {
      question: "Will daily transactions exceed 100k today?",
      side: "YES",
      amount: 180,
      currentValue: "89.2k",
      odds: 45,
      potentialPayout: 0,
      status: "lost",
      profit: -180,
    },
  ];

  const BetCard = ({ bet }: { bet: typeof bets[0] }) => (
    <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{bet.question}</h3>
            <div className="flex items-center gap-2">
              <Badge 
                variant={bet.side === "YES" ? "default" : "outline"}
                className={bet.side === "YES" ? "bg-accent text-accent-foreground" : "border-destructive text-destructive"}
              >
                {bet.side}
              </Badge>
              {bet.status === "active" && (
                <>
                  <span className="text-sm text-muted-foreground">•</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {bet.timeLeft}
                  </div>
                </>
              )}
            </div>
          </div>
          {bet.status === "active" && <TrendingUp className="h-5 w-5 text-primary" />}
          {bet.status === "won" && (
            <div className="text-right">
              <Badge className="bg-accent text-accent-foreground">Won</Badge>
            </div>
          )}
          {bet.status === "lost" && (
            <div className="text-right">
              <Badge variant="outline" className="border-destructive text-destructive">Lost</Badge>
            </div>
          )}
        </div>

        {bet.status === "active" && (
          <StreamIndicator value={bet.currentValue} label="Current Value" />
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Amount Staked</p>
            <p className="text-lg font-semibold font-mono">{bet.amount} SOMI</p>
          </div>
          {bet.status === "active" && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Potential Payout</p>
              <p className="text-lg font-semibold font-mono text-primary">{bet.potentialPayout.toFixed(2)} SOMI</p>
            </div>
          )}
          {bet.status !== "active" && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Profit/Loss</p>
              <p className={`text-lg font-semibold font-mono ${bet.profit! > 0 ? 'text-accent' : 'text-destructive'}`}>
                {bet.profit! > 0 ? '+' : ''}{bet.profit!.toFixed(2)} SOMI
              </p>
            </div>
          )}
        </div>

        {bet.status === "active" && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Current Odds: </span>
              <span className="font-mono font-semibold text-primary">{bet.odds}%</span>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View Market
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );

  const activeBets = bets.filter(b => b.status === "active");
  const resolvedBets = bets.filter(b => b.status !== "active");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Bets</h1>
        <p className="text-muted-foreground">
          Track your active positions and betting history
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Active Bets</p>
          <p className="text-2xl font-bold text-primary">{activeBets.length}</p>
        </Card>
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Staked</p>
          <p className="text-2xl font-bold">
            {activeBets.reduce((sum, bet) => sum + bet.amount, 0)} SOMI
          </p>
        </Card>
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Potential Return</p>
          <p className="text-2xl font-bold text-accent">
            {activeBets.reduce((sum, bet) => sum + bet.potentialPayout, 0).toFixed(0)} SOMI
          </p>
        </Card>
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total P&L</p>
          <p className="text-2xl font-bold text-accent">
            +{resolvedBets.reduce((sum, bet) => sum + (bet.profit || 0), 0).toFixed(2)} SOMI
          </p>
        </Card>
      </div>

      {/* Bets List */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="active">Active ({activeBets.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedBets.length})</TabsTrigger>
          <TabsTrigger value="all">All Bets ({bets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeBets.map((bet, index) => (
            <BetCard key={index} bet={bet} />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedBets.map((bet, index) => (
            <BetCard key={index} bet={bet} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {bets.map((bet, index) => (
            <BetCard key={index} bet={bet} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBets;
