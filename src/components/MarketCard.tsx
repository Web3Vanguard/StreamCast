import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { StreamIndicator } from "./StreamIndicator";
import { Progress } from "./ui/progress";

interface MarketCardProps {
  question: string;
  category: string;
  timeRemaining: string;
  currentValue: string;
  yesOdds: number;
  noOdds: number;
  yesPool: number;
  noPool: number;
}

export const MarketCard = ({
  question,
  category,
  timeRemaining,
  currentValue,
  yesOdds,
  noOdds,
  yesPool,
  noPool,
}: MarketCardProps) => {
  const totalPool = yesPool + noPool;
  const yesPercentage = (yesPool / totalPool) * 100;

  return (
    <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 glow-cyan">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{question}</h3>
            <Badge variant="outline" className="border-secondary/30 text-secondary">
              {category}
            </Badge>
          </div>
          <TrendingUp className="h-5 w-5 text-accent" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{timeRemaining}</span>
          </div>
          <StreamIndicator value={currentValue} label="Current" />
        </div>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">YES</span>
              <span className="text-accent font-mono font-semibold">{yesOdds}%</span>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-green">
              Bet YES
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">NO</span>
              <span className="text-destructive font-mono font-semibold">{noOdds}%</span>
            </div>
            <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
              Bet NO
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Pool Distribution</span>
            <span>{totalPool.toFixed(2)} SOMI</span>
          </div>
          <Progress value={yesPercentage} className="h-2" />
          <div className="flex justify-between text-xs">
            <span className="text-accent">YES: {yesPool.toFixed(2)}</span>
            <span className="text-destructive">NO: {noPool.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
