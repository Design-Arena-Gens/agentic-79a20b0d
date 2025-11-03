'use client'

import { useState } from 'react'
import { Plus, Trash2, Settings, Play, Save } from 'lucide-react'

interface WorkflowStep {
  id: string
  action: 'generate' | 'post' | 'analyze' | 'wait'
  config: Record<string, any>
}

export default function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState<Array<{ id: string; name: string; steps: WorkflowStep[] }>>([
    {
      id: '1',
      name: 'Daily Instagram + Facebook',
      steps: [
        { id: '1', action: 'generate', config: { topic: 'trending', platform: 'instagram' } },
        { id: '2', action: 'post', config: { platforms: ['instagram', 'facebook'] } }
      ]
    }
  ])
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>('1')

  const currentWorkflow = workflows.find((w) => w.id === selectedWorkflow)

  const addStep = () => {
    if (!currentWorkflow) return

    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      action: 'generate',
      config: {}
    }

    setWorkflows(
      workflows.map((w) =>
        w.id === selectedWorkflow ? { ...w, steps: [...w.steps, newStep] } : w
      )
    )
  }

  const removeStep = (stepId: string) => {
    if (!currentWorkflow) return

    setWorkflows(
      workflows.map((w) =>
        w.id === selectedWorkflow
          ? { ...w, steps: w.steps.filter((s) => s.id !== stepId) }
          : w
      )
    )
  }

  const createNewWorkflow = () => {
    const newWorkflow = {
      id: Date.now().toString(),
      name: 'New Workflow',
      steps: []
    }
    setWorkflows([...workflows, newWorkflow])
    setSelectedWorkflow(newWorkflow.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Workflow Automation</h2>
        <button onClick={createNewWorkflow} className="btn-primary">
          <Plus className="w-5 h-5 inline mr-2" />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workflow List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-semibold mb-4">Your Workflows</h3>
            <div className="space-y-2">
              {workflows.map((workflow) => (
                <button
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedWorkflow === workflow.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{workflow.name}</div>
                  <div className="text-sm opacity-80">{workflow.steps.length} steps</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Editor */}
        <div className="lg:col-span-3">
          {currentWorkflow ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <input
                  type="text"
                  value={currentWorkflow.name}
                  onChange={(e) =>
                    setWorkflows(
                      workflows.map((w) =>
                        w.id === selectedWorkflow ? { ...w, name: e.target.value } : w
                      )
                    )
                  }
                  className="text-2xl font-bold bg-transparent border-none focus:outline-none"
                />
                <div className="flex gap-2">
                  <button className="btn-secondary">
                    <Save className="w-5 h-5 inline mr-2" />
                    Save
                  </button>
                  <button className="btn-primary">
                    <Play className="w-5 h-5 inline mr-2" />
                    Run Now
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {currentWorkflow.steps.map((step, index) => (
                  <div key={step.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <select
                            value={step.action}
                            onChange={(e) =>
                              setWorkflows(
                                workflows.map((w) =>
                                  w.id === selectedWorkflow
                                    ? {
                                        ...w,
                                        steps: w.steps.map((s) =>
                                          s.id === step.id
                                            ? { ...s, action: e.target.value as any }
                                            : s
                                        )
                                      }
                                    : w
                                )
                              )
                            }
                            className="input-field"
                          >
                            <option value="generate">Generate Content</option>
                            <option value="post">Post to Platforms</option>
                            <option value="analyze">Analyze Performance</option>
                            <option value="wait">Wait/Delay</option>
                          </select>
                        </div>

                        {/* Step Configuration */}
                        <div className="ml-11 space-y-3">
                          {step.action === 'generate' && (
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Topic"
                                className="input-field text-sm"
                              />
                              <select className="input-field text-sm">
                                <option>Instagram</option>
                                <option>YouTube</option>
                                <option>Facebook</option>
                                <option>Threads</option>
                                <option>Pinterest</option>
                              </select>
                            </div>
                          )}

                          {step.action === 'post' && (
                            <div className="flex flex-wrap gap-2">
                              {['Instagram', 'YouTube', 'Facebook', 'Threads', 'Pinterest'].map(
                                (platform) => (
                                  <label key={platform} className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm">{platform}</span>
                                  </label>
                                )
                              )}
                            </div>
                          )}

                          {step.action === 'wait' && (
                            <div className="flex gap-2">
                              <input
                                type="number"
                                placeholder="Duration"
                                className="input-field text-sm"
                              />
                              <select className="input-field text-sm">
                                <option>Minutes</option>
                                <option>Hours</option>
                                <option>Days</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeStep(step.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addStep}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-gray-500 hover:text-primary font-medium"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Add Step
                </button>
              </div>

              {/* Automation Settings */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Automation Settings
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Schedule</label>
                    <select className="input-field">
                      <option>Run Manually</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input type="time" className="input-field" defaultValue="09:00" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No workflow selected</p>
              <button onClick={createNewWorkflow} className="btn-primary">
                Create Your First Workflow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
