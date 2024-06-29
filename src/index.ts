export type Dependencies = Record<string, unknown>

export type PatchContext<T, D extends Dependencies> = {
    setup: (dependencies: D) => T
    dependencies: D
}

const usePrepatch = () => {
    const patch = <D extends Dependencies>(dependencies: D) => {
        return <T>(
            setup: (dependencies: D) => T,
        ): T & { _context: PatchContext<T, D> } => {
            return {
                ...setup(dependencies),
                _context: { setup, dependencies },
            }
        }
    }

    return {
        apply: <T>(
            setup: (args: { patch: typeof patch }) => T,
        ) => setup({ patch })
    }
}

export default usePrepatch
