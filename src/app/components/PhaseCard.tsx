import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Step {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
}

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  subtitle: string;
  steps: Step[];
  color: string;
  completedSteps?: number[];
  onStepToggle?: (phaseNumber: number, stepNumber: number) => void;
}

export function PhaseCard({ 
  phaseNumber, 
  title, 
  subtitle, 
  steps, 
  color,
  completedSteps = [],
  onStepToggle
}: PhaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const completedCount = completedSteps.length;
  const totalSteps = steps.length;
  const progressPercentage = (completedCount / totalSteps) * 100;

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    green: 'bg-green-50 border-green-200 hover:border-green-300',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    orange: 'bg-orange-50 border-orange-200 hover:border-orange-300',
    red: 'bg-red-50 border-red-200 hover:border-red-300',
  };

  const badgeClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
  };

  return (
    <Card className={`${colorClasses[color as keyof typeof colorClasses]} border-2 transition-all duration-200`}>
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Badge className={`${badgeClasses[color as keyof typeof badgeClasses]} text-white px-3 py-1.5`}>
              Phase {phaseNumber}
            </Badge>
            <div className="flex-1">
              <h3 className="font-semibold text-xl mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{subtitle}</p>
              
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${badgeClasses[color as keyof typeof badgeClasses]} transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {completedCount}/{totalSteps} steps
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-6 h-6 text-gray-500" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-500" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-3">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            return (
              <div 
                key={step.number}
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onStepToggle?.(phaseNumber, step.number);
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium mb-1 ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    Step {step.number}: {step.title}
                  </h4>
                  <p className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
