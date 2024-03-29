'use client'
import * as Select from '@radix-ui/react-select';

export function Selector({ options, active, setActive }: { options: string[], active: string, setActive: (value: string) => void }) {
    return (
        <Select.Root value={active} onValueChange={setActive}>
            <Select.Trigger className="inline-flex items-center justify-center rounded-md px-4 py-1 text-sm leading-4 h-9 gap-1 bg-white text-violet-11 shadow-md">
                <Select.Value aria-label={active}>
                    {active}
                </Select.Value>
                <Select.Icon className="text-violet-11" />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg">
                    <Select.Viewport className="p-1">
                        {options.map((option) => (
                            <Select.Item key={option} value={option} className="text-sm leading-4 text-violet-11 rounded-md flex items-center h-6 px-7 relative select-none">
                                <Select.ItemText>{option}</Select.ItemText>
                                <Select.ItemIndicator>…</Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
