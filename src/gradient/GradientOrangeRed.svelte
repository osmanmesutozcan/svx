<script>
    import LinearGradient from './LinearGradient.svelte';

    export let id;
</script>

<LinearGradient
        {id}
        {...$$props}
        from='#FCE38A'
        to='#F38181'
/>
