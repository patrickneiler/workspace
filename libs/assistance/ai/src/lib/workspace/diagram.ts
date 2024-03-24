
/**
 * Represents a diagram of a monorepo workspace.
 */
export const diagram = `
    graph TD

    monorepo{{"Monorepo Workspace"}}
    subgraph scope1["Scope 1"]
        lib1a(("Lib 1A"))
        lib1b(("Lib 1B"))
    end

    subgraph scope2["Scope 2"]
        lib2a(("Lib 2A"))
        lib2b(("Lib 2B"))
        module2a>Module 2A]
        module2b>Module 2B]
    end

    monorepo --> scope1
    monorepo --> scope2
    scope1 --> lib1a
    scope1 --> lib1b
    scope2 --> lib2a
    scope2 --> lib2b
    lib2a --> module2a
    lib2b --> module2b

    classDef scope fill:#335,stroke:#bbf,stroke-width:4px;
    classDef library fill:#f66,stroke:#fbb,stroke-width:2px,stroke-dasharray: 5, 5;
    classDef module fill:#393,stroke:#bfb,stroke-width:2px;

    class scope1,scope2 scope;
    class lib1a,lib1b,lib2a,lib2b library;
    class module2a,module2b module;
`