import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useAccount, useWalletClient } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "sonner";
import { getStreamsSDK, createEvent, registerEventSchema } from "@/lib/streams";
import { Alert, AlertDescription } from "@/components/ui/alert";

const createMarketSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  currency: z.enum(["USDC", "USDT"]),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
});

type CreateMarketForm = z.infer<typeof createMarketSchema>;

const CreateMarket = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { open: openWallet } = useAppKit();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateMarketForm>({
    resolver: zodResolver(createMarketSchema),
    defaultValues: {
      currency: "USDC",
    },
  });

  const currency = watch("currency");

  const onSubmit = async (data: CreateMarketForm) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      openWallet();
      return;
    }

    if (!walletClient) {
      toast.error("Wallet client not available. Please try reconnecting your wallet.");
      return;
    }

    setIsSubmitting(true);

    try {

      // Get SDK with wallet client
      const sdk = getStreamsSDK(walletClient);
      
      // Register schema if needed (optional - continues even if already registered)
      try {
        await registerEventSchema(sdk);
      } catch (error) {
        // Schema registration is optional, continue even if it fails
        console.warn("Schema registration skipped:", error);
      }

      // Calculate end time timestamp
      const endDateTime = new Date(`${data.endDate}T${data.endTime}:00`);
      const endTime = BigInt(Math.floor(endDateTime.getTime() / 1000));

      // Create event
      const result = await createEvent(sdk, {
        creatorAddress: address as `0x${string}`,
        eventTitle: data.question,
        eventDescription: data.description,
        currency: data.currency,
        endTime,
      });

      toast.success("Market created successfully!", {
        description: `Transaction: ${result.txHash}`,
      });

      // Reset form
      window.location.href = "/markets";
    } catch (error: any) {
      console.error("Error creating market:", error);
      toast.error("Failed to create market", {
        description: error?.message || "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Market</h1>
          <p className="text-muted-foreground">
            Connect your wallet to create a prediction market
          </p>
        </div>

        <Card className="p-6 bg-card border-2 border-border">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to create a prediction market.
            </AlertDescription>
          </Alert>
          <Button
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
            onClick={() => openWallet()}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Market</h1>
        <p className="text-muted-foreground">
          Create a simple Yes/No prediction market. Users can stake USDC or USDT.
        </p>
      </div>

      <Card className="p-6 bg-card border-2 border-border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Market Question *</Label>
            <Textarea
              id="question"
              placeholder="e.g., Will Bitcoin reach $100,000 by end of 2024?"
              className="min-h-[100px] bg-input border-border"
              {...register("question")}
            />
            {errors.question && (
              <p className="text-sm text-destructive">{errors.question.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide more details about this prediction market..."
              className="min-h-[80px] bg-input border-border"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Staking Currency *</Label>
            <Select
              value={currency}
              onValueChange={(value) => setValue("currency", value as "USDC" | "USDT")}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
            {errors.currency && (
              <p className="text-sm text-destructive">{errors.currency.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                className="bg-input border-border"
                min={new Date().toISOString().split("T")[0]}
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time (UTC) *</Label>
              <Input
                id="endTime"
                type="time"
                className="bg-input border-border"
                {...register("endTime")}
              />
              {errors.endTime && (
                <p className="text-sm text-destructive">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Market...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Create Market
              </>
            )}
          </Button>
        </form>
      </Card>

      <Card className="p-4 bg-secondary/10 border border-secondary/30">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Creating a market will publish it to Somnia Data Streams. 
          The market will be active until the end date/time, after which an admin can resolve it.
        </p>
      </Card>
    </div>
  );
};

export default CreateMarket;
