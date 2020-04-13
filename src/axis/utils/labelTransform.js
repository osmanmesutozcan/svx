import { ORIENT } from '../constants/orientation';

export function labelTransform({ labelOffset, labelProps, orientation, range, tickLabelFontSize, tickLength }) {
    let x;
    let y;
    let transform;

    const sign =
        orientation === ORIENT.left || orientation === ORIENT.top ? -1 : 1;


    if (orientation === ORIENT.top || orientation === ORIENT.bottom) {
        const yBottomOffset =
            orientation === ORIENT.bottom &&
            typeof labelProps.fontSize === 'number'
                ? labelProps.fontSize
                : 0;

        x = (Number(range[0]) + Number(range[range.length - 1])) / 2;
        y =
            sign *
            (tickLength + labelOffset + tickLabelFontSize + yBottomOffset);
    } else {
        x = sign * ((Number(range[0]) + Number(range[range.length - 1])) / 2);
        y = -(tickLength + labelOffset);
        transform = `rotate(${sign * 90})`;
    }

    return { x, y, transform };
}
