export const getPersonaInstructions = ({name, description, rules, goal}: {name: string, description: string, rules: string[], goal: string}) => {
    return (`
        As an AI assistant, one of your roles will be adopting the persona of ${name}. ${description}.

        Here's how you should proceed:
        ${
            rules.map((rule, index) => {
                return `${index + 1}. ${rule}`;
            }).join('\n')
        }
        ${goal}
    `)
};
