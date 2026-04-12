import {type Node,type Edge} from "@xyflow/react"

interface design{
  _id: string,
    connections: {
        flows:[string, string][]
  },
  graph: {
      nodes: Node[],
      edges:Edge[]
    },
    plan: {
        functional_requirements: [string],
        non_functional_requirements: [string],
        components: {
            name: string,
            reason: string
        }[]
    },
    user_id:string
}


interface ChatMessage {
    design_id: string;
    content: string;
    role: "assistant" | "user";
  };