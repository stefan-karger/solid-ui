import type { Registry } from "@solid-ui/registry/schema"

export const aiExamples: Registry["items"] = [
  {
    name: "ai-chain-of-thought-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "badge",
      "bubble",
      "button",
      "code-block",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/chain-of-thought-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-chat-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "ai-demo-markdown",
      "bubble",
      "button",
      "code-block",
      "dropdown-menu",
      "empty",
      "input-group",
      "message",
      "message-scroller",
      "tooltip",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/chat-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-checkpoint-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "marker",
      "message"
    ],
    files: [
      {
        path: "examples/ai-elements/checkpoint-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-confirmation-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "item",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/confirmation-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-context-demo",
    type: "registry:example",
    registryDependencies: ["button", "hover-card", "progress"],
    files: [
      {
        path: "examples/ai-elements/context-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-file-tree-demo",
    type: "registry:example",
    registryDependencies: ["button", "collapsible", "utils"],
    files: [
      {
        path: "examples/ai-elements/file-tree-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-inline-citation-demo",
    type: "registry:example",
    registryDependencies: ["button", "hover-card"],
    files: [
      {
        path: "examples/ai-elements/inline-citation-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-message-pattern",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-markdown",
      "bubble",
      "button",
      "message",
      "tooltip"
    ],
    files: [
      {
        path: "examples/ai-elements/message-pattern.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-model-selector-demo",
    type: "registry:example",
    registryDependencies: ["dropdown-menu", "input-group"],
    files: [
      {
        path: "examples/ai-elements/model-selector-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-plan-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/plan-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-plan-description",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [
      {
        path: "examples/ai-elements/plan-description.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-prompt-input-demo",
    type: "registry:example",
    registryDependencies: ["attachment", "dropdown-menu", "input-group"],
    files: [
      {
        path: "examples/ai-elements/prompt-input-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-queue-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/queue-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-queue-descriptions",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [
      {
        path: "examples/ai-elements/queue-descriptions.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-reasoning-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/reasoning-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-reasoning-duration",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [
      {
        path: "examples/ai-elements/reasoning-duration.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-sources-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/sources-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-stack-trace-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "code-block",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/stack-trace-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-stack-trace-frames",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [
      {
        path: "examples/ai-elements/stack-trace-frames.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-subagent-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "code-block",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/subagent-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-subagent-details",
    type: "registry:example",
    registryDependencies: ["badge", "trace"],
    files: [
      {
        path: "examples/ai-elements/subagent-details.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-subagent-running",
    type: "registry:example",
    registryDependencies: ["trace"],
    files: [
      {
        path: "examples/ai-elements/subagent-running.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-suggestion-demo",
    type: "registry:example",
    registryDependencies: ["bubble", "button", "input-group", "message"],
    files: [
      {
        path: "examples/ai-elements/suggestion-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-task-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/task-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-terminal-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "code-block",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/terminal-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-terminal-error",
    type: "registry:example",
    registryDependencies: ["code-block", "trace"],
    files: [
      {
        path: "examples/ai-elements/terminal-error.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-test-results-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "code-block",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/test-results-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-test-results-suites",
    type: "registry:example",
    registryDependencies: ["code-block", "trace"],
    files: [
      {
        path: "examples/ai-elements/test-results-suites.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-tool-demo",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "code-block",
      "message",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/tool-demo.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-tool-sheet",
    type: "registry:example",
    registryDependencies: [
      "ai-demo-chat",
      "bubble",
      "button",
      "code-block",
      "message",
      "sheet",
      "trace"
    ],
    files: [
      {
        path: "examples/ai-elements/tool-sheet.tsx",
        type: "registry:example"
      }
    ]
  },
  {
    name: "ai-tool-states",
    type: "registry:example",
    registryDependencies: ["code-block", "trace"],
    files: [
      {
        path: "examples/ai-elements/tool-states.tsx",
        type: "registry:example"
      }
    ]
  }
]
