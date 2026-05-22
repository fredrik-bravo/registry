import { Button } from "@/components/ui/button";

export function FishyButton() {
  return (
    <Button onClick={() => alert("snarf snarf linus")} className="bg-blue-800">
      Fish
    </Button>
  );
}
