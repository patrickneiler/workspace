import { FunctionCard } from "@wrkspce/ui/react"
import { DynamicDiagram } from "@wrkspce/dynamic-diagram";

export const WorkspaceDiagram = ({ diagram }: { diagram: string }) => {
    return <FunctionCard><DynamicDiagram diagram={diagram} /></FunctionCard>
}