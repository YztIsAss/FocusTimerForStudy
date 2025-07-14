import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, RotateCcw } from "lucide-react";

export default function Counter() {
  const [count, setCount] = useState(42);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4">
        <h3 className="text-lg font-semibold">Interactive Counter</h3>
        <p className="text-gray-300 text-sm">State management with React hooks</p>
      </div>
      <div className="p-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-6">{count}</div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setCount(count - 1)}
              variant="destructive"
              size="lg"
              className="px-6"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setCount(42)}
              variant="secondary"
              size="lg"
              className="px-6"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setCount(count + 1)}
              size="lg"
              className="px-6 bg-success hover:bg-success/90"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
