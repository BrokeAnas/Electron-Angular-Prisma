// ── Particles background ──────────────────────────────────────────────────
const canvas = document.getElementById('bg-canvas')
const ctx    = canvas.getContext('2d')

let W, H, particles

function resize() {
  W = canvas.width  = window.innerWidth
  H = canvas.height = window.innerHeight
}

function randomParticle() {
  return {
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     Math.random() * 1.2 + .3,
    vx:    (Math.random() - .5) * .25,
    vy:    (Math.random() - .5) * .25,
    alpha: Math.random() * .4 + .05
  }
}

function initParticles() {
  particles = Array.from({ length: 120 }, randomParticle)
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H)

  // Draw lines between nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x
      const dy   = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 130) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(79,158,255,${.08 * (1 - dist / 130)})`
        ctx.lineWidth = .5
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }

  // Draw dots
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(79,158,255,${p.alpha})`
    ctx.fill()

    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > W) p.vx *= -1
    if (p.y < 0 || p.y > H) p.vy *= -1
  }

  requestAnimationFrame(drawParticles)
}

window.addEventListener('resize', () => { resize(); initParticles() })
resize()
initParticles()
drawParticles()

// ── Scroll reveal ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      observer.unobserve(e.target)
    }
  }
}, { threshold: .12 })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
