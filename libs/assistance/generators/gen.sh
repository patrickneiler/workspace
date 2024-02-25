#!/bin/bash
# npx nx generate @nx/next:library --name=assistance-feature-next --directory=libs/assistance/feature/next --buildable=true --component=false --importPath=@ranthology/assistance/feature/next --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive
npx nx generate @nx/react:library --name=assistance-feature-react --directory=libs/assistance/feature/react --buildable=true --component=false --importPath=@ranthology/assistance/feature/react --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=feature --unitTestRunner=none --no-interactive
npx nx generate @nx/react:hook --name=useAssistance --directory=libs/assistance/feature/react/hooks --project=assistance-feature-react --skipFormat=true --no-interactive
npx nx generate @nx/react:library --name=assistance-data-access --directory=libs/assistance/data-access --buildable=true --component=false --importPath=@ranthology/assistance/data-access --projectNameAndRootFormat=as-provided --publishable=true --skipFormat=true --tags=data-access --unitTestRunner=none --no-interactive
npx nx generate @nx/react:component --assistance-data-access-state --directory=libs/assistance/data-access/state --project=assistance-data-access --skipFormat=true --no-interactive

 