<script>
    import { onMount } from 'svelte'

    import Lines from './demo-charts/Lines.svelte'
    import Bars from './demo-charts/Dots.svelte'
    import Dots from './demo-charts/Bars.svelte'

    let width = 490
    let demoContainer

    $: {
        console.log(width)
    }

    onMount(() => {
        width = (demoContainer.clientWidth - 70) / 3
    })

    const handleResize = (function debounce(ms) {
        let updateHandle
        let shouldUpdate = true

        return function _handleResize(e) {
            if (!shouldUpdate) {
                return
            }

            // Block updates and schedule release.
            shouldUpdate = false
            setTimeout(() => {
                shouldUpdate = true
            }, ms)

            // Do the real job.
            clearTimeout(updateHandle)
            updateHandle = setTimeout(() => {
                width = (demoContainer.clientWidth - 70) / 3
            }, ms)

        }
    })(1000)
</script>

<style>
    nav {
        height: 60px;

        padding: 0 2rem;

        display: flex;
        align-items: center;
    }

    .demo {
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .logo {
        font-weight: 600;
    }

    span:nth-child(2) {
        margin: 0 5px;
    }
</style>

<nav>
    <span class="logo">SVX</span>
</nav>

<div bind:this={demoContainer} class="demo">
    <span>
        <Lines width={width}/>
    </span>
    <span>
        <Dots width={width}/>
    </span>
    <span>
        <Bars width={width}/>
    </span>
</div>

<svelte:head>
    <style>
        body {
            margin: 0;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
    </style>
</svelte:head>

<svelte:window on:resize={handleResize}/>
