<script>
export default {
  name: 'HeroComponent',
  data() {
    return {
      activeIndex: 0,
      slides: [
        {
          title: 'Maka y t0m4s1n',
          description: 'Test the demo version of the game',
          buttonText: 'Play now',
          link: '/game',
          element: 'game'
        },
        {
          title: 'Project made in VUE and JAVA',
          description: 'Works online :)',
          buttonText: 'Check the git',
          link: 'https://github.com',
          element: 'code'
        },
        {
          title: 'Patterns of software',
          description: 'The patterns of software are included in the game, but you can check the code for this documentation',
          buttonText: 'Document',
          link: '/documentation',
          element: 'codetwo'
        }
      ]
    }
  },
  mounted() {
    this.setupScrollObserver();
  },
  methods: {
    setupScrollObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index'));
              this.activeIndex = index;
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '0px'
        }
      );
      this.$el.querySelectorAll('.slide').forEach(article => {
        observer.observe(article);
      });
    }
  }
}
</script>

<template>
  <div class="hero-container">
    <main>
      <div 
        v-for="(item, index) in slides" 
        :key="index"
        class="slide"
        :data-index="index"
        :class="{ active: activeIndex === index }"
      >
        <div class="slide__content">
          <div class="slide__visual">
            <div v-if="item.element === 'game'" class="animated-element game-element">
              <div class="game-container">
                <div class="game-screen">
                  <div class="pixel-art"></div>
                  <div class="game-controls">
                    <div class="d-pad">
                      <div class="d-pad-button up"></div>
                      <div class="d-pad-button right"></div>
                      <div class="d-pad-button down"></div>
                      <div class="d-pad-button left"></div>
                    </div>
                    <div class="action-buttons">
                      <div class="action-button"></div>
                      <div class="action-button"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.element === 'code'" class="animated-element code-element">
              <div class="code-container">
                <div class="code-line">This is the game of Diego Ocampo</div>
                <div class="code-line">And T0m4s1n are the papus</div>
                <div class="code-line">that created the code for this</div>
                <div class="code-line">game that works wow</div>
                <div class="code-line">with JAVA and VUE Framework</div>
              </div>
            </div>
            <div v-if="item.element === 'codetwo'" class="animated-element code-element">
              <div class="code-container">
                <div class="code-line">The game is made with the patterns of</div>
                <div class="code-line">software and being specially</div>
                <div class="code-line">selected for the application :3</div>
                <div class="code-line">game that works wow</div>
                <div class="code-line">with JAVA and VUE Framework</div>
              </div>
            </div>
          </div>
          <div class="slide__info">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <a :href="item.link">{{ item.buttonText }}</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  display: none;
}

.hero-container {
  min-height: 100vh;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
    'DejaVu Sans Mono', monospace;
  background: #ffffff;
  position: relative;
}

.hero-container::before {
  --size: 45px;
  --line: color-mix(in lch, canvasText, transparent 70%);
  content: '';
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: linear-gradient(
        90deg,
        var(--line) 1px,
        transparent 1px var(--size)
      )
      50% 50% / var(--size) var(--size),
    linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
      var(--size) var(--size);
  mask: linear-gradient(-20deg, transparent 50%, white);
  top: 0;
  transform-style: flat;
  pointer-events: none;
  z-index: 0;
}

main {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.slide {
  margin-left: 6rem;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
}

.slide__content {
  height: 100%;
  display: flex;
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

.slide__visual {
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  right: 2rem;
  top: 0;
}

.slide__info {
  width: 45%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.animated-element {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
  width: 100%;
  display: flex;
  justify-content: center;
}

.active .animated-element {
  opacity: 1;
  transform: translateY(0);
}

.game-container {
  width: 500px;
  height: 375px;
  background: #2a2a2a;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.game-screen {
  background: #121212;
  height: 250px;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.pixel-art {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #ff5252;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 2s ease-in-out infinite;
  border-radius: 10px;
}

.game-controls {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.d-pad {
  width: 100px;
  height: 100px;
  position: relative;
}

.d-pad-button {
  width: 30px;
  height: 30px;
  background: #404040;
  position: absolute;
  border-radius: 10px;
}

.d-pad-button.up { top: 0; left: 35px; }
.d-pad-button.right { right: 0; top: 35px; }
.d-pad-button.down { bottom: 0; left: 35px; }
.d-pad-button.left { left: 0; top: 35px; }

.action-buttons {
  display: flex;
  gap: 20px;
  align-items: center;
}

.action-button {
  width: 40px;
  height: 40px;
  background: #404040;
  border-radius: 50%;
}

.code-container {
  width: 600px;
  background: #1e1e1e;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.code-line {
  height: 30px;
  background: #333;
  color: #fff;
  margin: 15px 0;
  padding: 0 15px;
  line-height: 30px;
  border-radius: 6px;
  animation: typing 2s infinite;
  font-size: 16px;
}

.code-line:nth-child(1) { width: 85%; }
.code-line:nth-child(2) { width: 70%; }
.code-line:nth-child(3) { width: 80%; }
.code-line:nth-child(4) { width: 65%; }
.code-line:nth-child(5) { width: 75%; }

h2 {
  text-transform: uppercase;
  font-size: 2.5rem;
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.2s;
}

.active h2 {
  opacity: 1;
  transform: translateY(0);
}

p {
  margin: 1.5rem 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.4s;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 90%;
}

.active p {
  opacity: 1;
  transform: translateY(0);
}

a {
  text-transform: uppercase;
  font-weight: 600;
  color: hsl(0 0% 98%);
  background: hsl(0 0% 0%);
  padding: 1.2rem 2.4rem;
  text-decoration: none;
  word-spacing: 0.2rem;
  font-size: 1.25rem;
  border-radius: 6px;
  transition: all 0.3s;
  display: inline-block;
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.6s;
}

.active a {
  opacity: 1;
  transform: translateY(0);
}

a:hover {
  background: hsl(0 0% 40%);
  transform: translateY(-2px);
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, -60%); }
}

@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@media (max-width: 1200px) {
  .code-container {
    width: 500px;
  }
  
  .game-container {
    width: 450px;
    height: 340px;
  }
}

@media (max-width: 768px) {
  .slide__content {
    flex-direction: column;
    padding: 0;
  }
  
  .slide__visual {
    position: relative;
    width: 100%;
    height: 60vh;
    right: 0;
    padding: 1rem;
  }
  
  .slide__info {
    width: 100%;
    height: 40vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    align-items: center;
    text-align: center;
  }
  
  .game-container,
  .code-container {
    width: 90%;
    max-width: 500px;
  }
  
  .code-line {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .slide__visual {
    height: 50vh;
  }
  
  .slide__info {
    height: 50vh;
    padding: 1rem;
  }
  
  .game-controls {
    padding: 0 5px;
  }
  
  .code-line {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin: 10px 0;
  }
}
</style>