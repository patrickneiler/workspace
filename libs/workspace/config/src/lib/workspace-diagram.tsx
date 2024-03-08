graph TD
    style ranthology fill:#f9f,stroke:#333,stroke-width:2px
    ranthology{{"Ranthology Workspace"}}

    subgraph assistance["Assistance"]
        reactLib(("assistant-feature-react"))
        nextLib(("assistant-feature-next"))
        domainLib(("assistance-domain"))
        useAssistance>useAssistance]
        AssistanceHost>Assistance]
        AssistanceChat>AssistanceChat]
        AssistancePage>Assistance]
        AssistanceApiRoute>AssistanceApiRoute]
    end

    ranthology --> assistance
    assistance --> reactLib
    assistance --> nextLib
    assistance --> domainLib
    reactLib --> useAssistance
    reactLib --> AssistanceHost
    reactLib --> AssistanceChat
    nextLib --> AssistancePage
    nextLib --> AssistanceApiRoute

    classDef scope fill:#bbf,stroke:#333,stroke-width:4px;
    classDef library fill:#fbb,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    classDef module fill:#bfb,stroke:#393,stroke-width:2px;
    
    class assistance scope;
    class reactLib,nextLib,domainLib library;
    class useAssistance,AssistanceHost,AssistanceChat,AssistancePage,AssistanceApiRoute module;