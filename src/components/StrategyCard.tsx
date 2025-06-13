import { RenderingStrategy } from "@/types/crypto";

interface StrategyCardProps {
  strategy: RenderingStrategy;
  isActive?: boolean;
}

export default function StrategyCard({
  strategy,
  isActive = false,
}: StrategyCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 transition-all duration-300 ${
        isActive
          ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {strategy.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {strategy.description}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
            ✅ Advantages
          </h4>
          <ul className="space-y-1">
            {strategy.advantages.map((advantage, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
              >
                <span className="text-green-500 mr-2">•</span>
                {advantage}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
            ❌ Disadvantages
          </h4>
          <ul className="space-y-1">
            {strategy.disadvantages.map((disadvantage, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
              >
                <span className="text-red-500 mr-2">•</span>
                {disadvantage}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
            🎯 Best Use Cases
          </h4>
          <ul className="space-y-1">
            {strategy.useCases.map((useCase, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
              >
                <span className="text-blue-500 mr-2">•</span>
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
            🔧 Implementation
          </h4>
          <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block text-gray-800 dark:text-gray-200">
            {strategy.implementation}
          </code>
        </div>
      </div>
    </div>
  );
}
