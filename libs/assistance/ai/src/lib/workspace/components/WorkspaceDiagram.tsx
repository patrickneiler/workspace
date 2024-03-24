import { FunctionCard } from "@ranthology/ui/react"
import { DynamicDiagram } from "@ranthology/dynamic-diagram";

export const WorkspaceDiagram = ({ diagram }: { diagram: string }) => {
    return <FunctionCard><DynamicDiagram diagram={diagram} /></FunctionCard>
}