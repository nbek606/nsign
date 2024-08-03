export const useRules = () => {
    const rulesEmpty = (value: string, name: string): boolean | string => {
        if (value) return true

        return `You must enter a ${name}.`
    }

    const rulesMinCharacter = (value: string, name: string, min: number ): boolean | string => {
        if (value?.length > min) return true

        return `${name} must be at least ${min} characters.`
    }

    return {
        rulesEmpty,
        rulesMinCharacter
    }
}