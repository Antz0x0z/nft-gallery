let tl = gsap.timeline();

tl.to('.loading', {
    left: '100%',
    duration: 0.75
})

tl.to('.loading', {
    display: 'none'
})