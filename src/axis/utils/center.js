/**
 * Returns a function that applies a centering transform to a scaled value,
 * if `Output` is of type `number` and `scale.bandwidth()` is defined
 */
export function center(scale) {
    let offset = scale.bandwidth ? scale.bandwidth() / 2 : 0;
    if (scale.round && scale.round()) offset = Math.round(offset);

    return (d) => {
        const scaledValue = scale(d);
        if (typeof scaledValue === 'number') return scaledValue + offset;
        // quantize scales return an array of values
        if (Array.isArray(scaledValue)) return Number(scaledValue[0]) + offset;
        return scaledValue;
    };
}
