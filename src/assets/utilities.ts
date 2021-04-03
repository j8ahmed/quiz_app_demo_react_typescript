////Utility Functions folder


export const randomize = <Type>(arr: Type[]): Type[] => {
    const a = arr.slice()
    return a.sort( ans => Math.random() - 0.5)
}