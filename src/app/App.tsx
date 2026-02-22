import { useState, useEffect } from 'react';
import { PhaseCard } from './components/PhaseCard';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Brain, Rocket, Award } from 'lucide-react';

interface Phase {
  number: number;
  title: string;
  subtitle: string;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
  color: string;
}

const roadmapData: Phase[] = [
  {
    number: 1,
    title: "Escaping the Notebook",
    subtitle: "The Foundation",
    color: "blue",
    steps: [
      {
        number: 1,
        title: "Advanced Bash & Linux Mastery",
        description: "Master grep, awk, SSH, and writing .sh scripts. The cloud runs on Linux; you must speak its native language fluently."
      },
      {
        number: 2,
        title: "Git & GitHub (Version Control)",
        description: "Stop saving files as budget_final_v2.ipynb. Learn to initialize a repository, create feature branches, write proper commit messages, and merge code."
      },
      {
        number: 3,
        title: "Virtual Environments & Dependency Management",
        description: "Learn venv or Poetry. The requirements.txt file is your first structural brick for reproducible environments."
      }
    ]
  },
  {
    number: 2,
    title: "The Laboratory",
    subtitle: "Tracking & Serving",
    color: "green",
    steps: [
      {
        number: 4,
        title: "Modular Python Engineering",
        description: "Break your code into separate files: train.py, preprocess.py, and predict.py. An Architect builds interchangeable parts."
      },
      {
        number: 5,
        title: "Experiment Tracking (MLflow)",
        description: "Integrate MLflow into your training script. Build a dashboard of your experiments instead of trying to remember them."
      },
      {
        number: 6,
        title: "API Development (FastAPI)",
        description: "Wrap your trained .pkl model in FastAPI. Write endpoints so other computers can send JSON requests and get predictions back."
      }
    ]
  },
  {
    number: 3,
    title: "The Kitchen",
    subtitle: "Containerization",
    color: "purple",
    steps: [
      {
        number: 7,
        title: "Docker Basics",
        description: "Write a Dockerfile for your FastAPI app. Install Python, dependencies, copy your model, and start the server."
      },
      {
        number: 8,
        title: "Docker Image Building",
        description: "Build the Docker Image. Trap your code and the operating system into a single, unbreakable box."
      },
      {
        number: 9,
        title: "Docker Compose",
        description: "Run your FastAPI container and a PostgreSQL database container at the same time, networked together."
      }
    ]
  },
  {
    number: 4,
    title: "The Conveyor Belt",
    subtitle: "CI/CD & Cloud",
    color: "orange",
    steps: [
      {
        number: 10,
        title: "Continuous Integration (GitHub Actions)",
        description: "Write a YAML script so every push to GitHub runs automated tests to check if you broke anything."
      },
      {
        number: 11,
        title: "Container Registry",
        description: "Push your finished Docker Image to Docker Hub or AWS ECR. Store it in the cloud, ready to be pulled by any server."
      },
      {
        number: 12,
        title: "Cloud Deployment (AWS EC2 or DigitalOcean)",
        description: "Rent a Linux server, SSH into it, pull your Docker image, and run it. Your API is now live on the global internet."
      }
    ]
  },
  {
    number: 5,
    title: "The Head Chef's Audit",
    subtitle: "Monitoring & Orchestration",
    color: "red",
    steps: [
      {
        number: 13,
        title: "System Monitoring (Prometheus & Grafana)",
        description: "Set up dashboards that watch your server. Get alerts before your API crashes and the client notices."
      },
      {
        number: 14,
        title: "Data & Model Drift Monitoring (Evidently AI)",
        description: "Monitor statistical distribution of incoming data and trigger alerts when the model becomes stale."
      },
      {
        number: 15,
        title: "Workflow Orchestration (Apache Airflow)",
        description: "The Final Boss. Build pipelines that automatically pull fresh data, retrain models, package in Docker, and deploy—while you sleep."
      }
    ]
  }
];

export default function App() {
  const [completedSteps, setCompletedSteps] = useState<Record<number, number[]>>(() => {
    const saved = localStorage.getItem('mlops-progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('mlops-progress', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const handleStepToggle = (phaseNumber: number, stepNumber: number) => {
    setCompletedSteps(prev => {
      const phaseSteps = prev[phaseNumber] || [];
      const isCompleted = phaseSteps.includes(stepNumber);
      
      if (isCompleted) {
        return {
          ...prev,
          [phaseNumber]: phaseSteps.filter(s => s !== stepNumber)
        };
      } else {
        return {
          ...prev,
          [phaseNumber]: [...phaseSteps, stepNumber]
        };
      }
    });
  };

  const totalSteps = roadmapData.reduce((sum, phase) => sum + phase.steps.length, 0);
  const totalCompleted = Object.values(completedSteps).reduce((sum, steps) => sum + steps.length, 0);
  const overallProgress = Math.round((totalCompleted / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">MLOps Mastery Roadmap</h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            From Jupyter Notebooks to Production-Grade ML Systems
          </p>
          
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Rocket className="w-6 h-6" />
                <span className="font-semibold text-lg">Your Progress</span>
              </div>
              <Badge className="bg-white text-gray-900 px-3 py-1">
                {totalCompleted} / {totalSteps} steps
              </Badge>
            </div>
            <div className="relative">
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-white/90">{overallProgress}% Complete</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          {roadmapData.map((phase) => (
            <PhaseCard
              key={phase.number}
              phaseNumber={phase.number}
              title={phase.title}
              subtitle={phase.subtitle}
              steps={phase.steps}
              color={phase.color}
              completedSteps={completedSteps[phase.number] || []}
              onStepToggle={handleStepToggle}
            />
          ))}
        </div>

        {/* Footer Card */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 p-6">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">
                We Cannot Be an Architect if Our Code Only Lives in a Notebook
              </h3>
              <p className="text-gray-700 mb-3">
                This roadmap transforms us from a data scientist into an ML Engineer,Mlops engineer who builds production-grade systems. 
                Each phase builds on the previous one, creating a solid foundation for deploying machine learning at scale.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
