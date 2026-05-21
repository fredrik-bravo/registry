import { Button } from "@/components/ui/button";

export function HelloFishy() {
  return (
    <div className="p-8 bg-neutral-300">
      <h1 className="text-2xl font-bold mb-4">Fisksås</h1>
      <Button onClick={() => alert("fisksås")}>Hello Fishy</Button>
    </div>
  );
}
