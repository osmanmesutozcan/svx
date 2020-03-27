/**
 * Export your components to apps.
 * More:
 * - https://github.com/sveltejs/component-template#consuming-components
 * - https://github.com/rollup/rollup-plugin-svelte#pkgsvelte
 * @see {@link ../package.json}
 */

import Group from './group/Group.svelte'

import Bar from './shape/Bar.svelte'
import Circle from './shape/Circle.svelte'
import LinePath from './shape/LinePath.svelte'

import LinearGradient from './gradient/LinearGradient.svelte'
import GradientPinkRed from './gradient/GradientPinkRed.svelte'
import GradientTealBlue from './gradient/GradientTealBlue.svelte'

const group = {
    Group,
}

const shape = {
    Bar,
    Circle,
    LinePath,
}

const gradient = {
    LinearGradient,
    GradientPinkRed,
    GradientTealBlue,
}

export { shape, group, gradient }
