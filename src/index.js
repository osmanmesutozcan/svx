/**
 * Export your components to apps.
 * More:
 * - https://github.com/sveltejs/component-template#consuming-components
 * - https://github.com/rollup/rollup-plugin-svelte#pkgsvelte
 * @see {@link ../package.json}
 */

import Group from './components/group/Group.svelte'

import Bar from './components/shape/Bar.svelte'
import Circle from './components/shape/Circle.svelte'
import LinePath from './components/shape/LinePath.svelte'

import LinearGradient from './components/gradient/LinearGradient.svelte'
import GradientPinkRed from './components/gradient/GradientPinkRed.svelte'
import GradientTealBlue from './components/gradient/GradientTealBlue.svelte'

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
