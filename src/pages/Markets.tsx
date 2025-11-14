import { MarketCard } from "@/components/MarketCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Markets = () => {
  const markets = [
    {
      question: "Will SOMI price exceed $0.10 by 12:00 PM UTC?",
      category: "Token Price",
      timeRemaining: "2h 34m",
      currentValue: "$0.087",
      yesOdds: 62,
      noOdds: 38,
      yesPool: 1240.5,
      noPool: 758.3,
    },
    {
      question: "Will governance proposal #42 pass with >60% approval?",
      category: "Governance",
      timeRemaining: "1d 8h",
      currentValue: "58.3%",
      yesOdds: 55,
      noOdds: 45,
      yesPool: 892.1,
      noPool: 730.9,
    },
    {
      question: "Will ETH/USD break $3,000 in the next 24 hours?",
      category: "Token Price",
      timeRemaining: "23h 12m",
      currentValue: "$2,947",
      yesOdds: 48,
      noOdds: 52,
      yesPool: 1560.0,
      noPool: 1690.5,
    },
    {
      question: "Will daily active users exceed 10,000 today?",
      category: "Protocol Metrics",
      timeRemaining: "5h 47m",
      currentValue: "8,742",
      yesOdds: 70,
      noOdds: 30,
      yesPool: 2100.0,
      noPool: 900.0,
    },
    {
      question: "Will BTC dominance stay above 50% this week?",
      category: "Market Data",
      timeRemaining: "3d 2h",
      currentValue: "52.1%",
      yesOdds: 65,
      noOdds: 35,
      yesPool: 1820.5,
      noPool: 980.3,
    },
    {
      question: "Will protocol TVL exceed $50M by month end?",
      category: "Protocol Metrics",
      timeRemaining: "8d 14h",
      currentValue: "$47.2M",
      yesOdds: 58,
      noOdds: 42,
      yesPool: 1450.0,
      noPool: 1050.0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Active Markets</h1>
          <p className="text-muted-foreground">
            Real-time prediction markets powered by live data streams
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search markets..." 
            className="pl-10 bg-input border-border"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="token">Token Price</SelectItem>
            <SelectItem value="governance">Governance</SelectItem>
            <SelectItem value="protocol">Protocol Metrics</SelectItem>
            <SelectItem value="market">Market Data</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="active">
          <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
            <SelectItem value="high-volume">High Volume</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {markets.map((market, index) => (
          <MarketCard key={index} {...market} />
        ))}
      </div>
    </div>
  );
};

export default Markets;
