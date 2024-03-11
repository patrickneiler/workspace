import { BotMessage, BotCard } from "../libs/ai/ui/message";
import LibraryConfigForm from "../libs/workspace/ui/LibraryConfigForm";
import ModuleConfigForm from "../libs/workspace/ui/ModuleConfigForm";
import WorkspaceConfigForm from "../libs/workspace/ui/WorkspaceConfigForm";
import { ConfirmConfiguration } from "./confirm";

export function ConfigForm({ params, update }: { params: any, update: (params: any) => void }) {
    switch (params.configType) {
        case 'workspace':
            return <WorkspaceConfigForm defaultValues={params} update={update} />;
        case 'library':
            return <LibraryConfigForm defaultValues={params} update={update} />;
        case 'module':
            return <ModuleConfigForm defaultValues={params} update={update} />;
        default:
            return <div>Invalid configuration type</div>;
    }

}

// An example of a flight card component.
export function ConfigurationCard({ params }: { params: any }) {
    switch (params.configType) {
        case 'workspace':
            return <>
                <BotMessage>
                    Sure!{' '}
                    {`Review the configuration for ${params.name} and confirm if it's correct.`}
                </BotMessage>
                <BotCard showAvatar={false}>
                    <ConfirmConfiguration
                        params={params}
                    />
                </BotCard>
            </>
        case 'library':
            return <>
                <ConfirmConfiguration
                    params={params}
                />
            </>
        case 'module':
            return <>
                <BotMessage>
                    Sure!{' '}
                    {`Review the configuration for ${params.name} and confirm if it's correct.`}
                </BotMessage>
                <BotCard showAvatar={false}>
                    <ConfirmConfiguration
                        params={params}
                    />
                </BotCard>
            </>
        default:
            return <div>Invalid configuration type</div>;
    }
}