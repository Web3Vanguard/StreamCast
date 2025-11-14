import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";

const Resolved = () => {
  const resolvedMarkets = [
    {
      question: "Will BTC dominance fall below 48% by end of month?",
      category: "Market Data",
      finalValue: "52.1%",
      outcome: "NO",
      totalPool: 3250.5,
      userBet: { side: "NO", amount: 250, payout: 384.62 },
      resolvedDate: "2025-01-08",
    },
    {
      question: "Will daily transactions exceed 100k today?",
      category: "Protocol Metrics",
      finalValue: "89,234",
      outcome: "NO",
      totalPool: 2100.0,
      userBet: { side: "YES", amount: 180, payout: 0 },
      resolvedDate: "2025-01-07",
    },
    {
      question: "Will AVAX break $50 this week?",
      category: "Token Price",
      finalValue: "$52.30",
      outcome: "YES",
      totalPool: 4850.0,
      userBet: null,
      resolvedDate: "2025-01-06",
    },
    {
      question: "Will protocol TVL exceed $40M by month end?",
      category: "Protocol Metrics",
      finalValue: "$43.2M",
      outcome: "YES",
      totalPool: 3600.0,
      userBet: { side: "YES", amount: 300, payout: 485.71 },
      resolvedDate: "2025-01-05",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resolved Markets</h1>
        <p className="text-muted-foreground">
          View past prediction markets and their final outcomes
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Resolved</p>
          <p className="text-2xl font-bold">{resolvedMarkets.length}</p>
        </Card>
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Volume</p>
          <p className="text-2xl font-bold">
            {resolvedMarkets.reduce((sum, m) => sum + m.totalPool, 0).toFixed(0)} SOMI
          </p>
        </Card>
        <Card className="p-4 bg-card/50 border-2 border-border">
          <p className="text-sm text-muted-foreground mb-1">Markets Participated</p>
          <p className="text-2xl font-bold text-primary">
            {resolvedMarkets.filter(m => m.userBet).length}
          </p>
        </Card>
      </div>

      {/* Markets List */}
      <div className="space-y-4">
        {resolvedMarkets.map((market, index) => (
          <Card 
            key={index} 
            className="p-6 bg-card border-2 border-border hover:border-muted transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    {market.outcome === "YES" ? (
                      <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{market.question}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="border-secondary/30 text-secondary">
                          {market.category}
                        </Badge>
                        <Badge 
                          className={market.outcome === "YES" 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-destructive/20 text-destructive border-destructive"
                          }
                        >
                          Resolved: {market.outcome}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(market.resolvedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Final Value</p>
                  <p className="text-lg font-semibold font-mono">{market.finalValue}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pool</p>
                  <p className="text-lg font-semibold font-mono">{market.totalPool.toFixed(2)} SOMI</p>
                </div>
                {market.userBet && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Your Position</p>
                      <p className="text-lg font-semibold">
                        {market.userBet.side} • {market.userBet.amount} SOMI
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Your Payout</p>
                      <p className={`text-lg font-semibold font-mono ${
                        market.userBet.payout > 0 ? 'text-accent' : 'text-destructive'
                      }`}>
                        {market.userBet.payout > 0 
                          ? `${market.userBet.payout.toFixed(2)} SOMI`
                          : '0 SOMI'
                        }
                      </p>
                    </div>
                  </>
                )}
              </div>

              {market.userBet && (
                <div className={`flex items-center gap-2 pt-2 ${
                  market.userBet.payout > 0 ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">
                    {market.userBet.payout > 0 
                      ? `Profit: +${(market.userBet.payout - market.userBet.amount).toFixed(2)} SOMI`
                      : `Loss: -${market.userBet.amount.toFixed(2)} SOMI`
                    }
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resolved;
