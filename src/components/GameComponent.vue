<template>
  <div class="pattern-slide active">
    <div class="pattern-content">
      <div class="pattern-info">
        <h2 class="pattern-title">Character Customizer</h2>
        <p class="pattern-description">
          Explore and customize your game character with our interactive Character Customizer.
        </p>
        <div class="game-controls">
          <button 
            @click="toggleFullscreen" 
            class="pattern-action"
          >
            Toggle Fullscreen
          </button>
          <button 
            v-if="!isGameLoaded"
            @click="loadUnityGame" 
            class="pattern-action start-game"
          >
            Start Game
          </button>
        </div>
      </div>
      
      <div class="code-showcase">
        <div id="unity-container" ref="unityContainer" class="unity-desktop">
          <canvas 
            id="unity-canvas" 
            ref="unityCanvas"
            width="960" 
            height="600" 
            tabindex="-1"
          ></canvas>
          <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
              <div id="unity-progress-bar-full"></div>
            </div>
            <div class="loading-text">Loading...</div>
          </div>
          <div id="unity-warning"></div>
          <div id="unity-footer">
            <div id="unity-logo-title-footer"></div>
            <div id="unity-fullscreen-button"></div>
            <div id="unity-build-title">Character Customizer</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameComponent',
  data() {
    return {
      unityInstance: null,
      isGameLoaded: false,
      isUnityLoaded: false
    }
  },
  mounted() {
    // Dynamically load Unity WebGL loader script
    this.loadUnityLoaderScript()
  },
  methods: {
    loadUnityLoaderScript() {
      if (document.querySelector('#unity-loader-script')) return

      const script = document.createElement('script')
      script.id = 'unity-loader-script'
      script.src = "/Build/JUEG_UNITY_WEB.loader.js"
      script.async = true
      script.onload = () => {
        console.log('Unity loader script loaded successfully')
        this.isUnityLoaded = true
      }
      script.onerror = () => {
        console.error('Failed to load Unity loader script')
        this.showErrorMessage('Failed to load game resources')
      }
      document.body.appendChild(script)
    },
    loadUnityGame() {
      // Ensure Unity loader script is loaded first
      if (!this.isUnityLoaded) {
        this.showErrorMessage('Unity resources not ready. Please wait and try again.')
        return
      }

      const canvas = this.$refs.unityCanvas
      const buildUrl = "/Build"

      // Check if createUnityInstance is available
      if (typeof createUnityInstance !== 'function') {
        this.showErrorMessage('Unity instance creator not found')
        return
      }

      // Mobile device detection and viewport setup
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes'
        document.getElementsByTagName('head')[0].appendChild(meta)
        this.$refs.unityContainer.className = "unity-mobile"
        canvas.className = "unity-mobile"
      } else {
        canvas.style.width = "960px"
        canvas.style.height = "600px"
      }

      // Show loading bar
      document.querySelector("#unity-loading-bar").style.display = "block"

      const config = {
        dataUrl: buildUrl + "/JUEG_UNITY_WEB.data.br",
        frameworkUrl: buildUrl + "/JUEG_UNITY_WEB.framework.js.br",
        codeUrl: buildUrl + "/JUEG_UNITY_WEB.wasm.br",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Diego Alejandro Ocampo Madroñero",
        productName: "Character Customizer",
        productVersion: "1.0",
        showBanner: this.unityShowBanner,
      }

      createUnityInstance(canvas, config, (progress) => {
        // Update progress bar
        document.querySelector("#unity-progress-bar-full").style.width = 100 * progress + "%"
      }).then((unityInstance) => {
        this.unityInstance = unityInstance
        this.isGameLoaded = true
        document.querySelector("#unity-loading-bar").style.display = "none"
        console.log('Unity game loaded successfully')
      }).catch((message) => {
        console.error('Unity instance creation failed:', message)
        this.showErrorMessage(message)
      })
    },
    unityShowBanner(msg, type) {
      const warningBanner = document.querySelector("#unity-warning")
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none'
      }
      const div = document.createElement('div')
      div.innerHTML = msg
      warningBanner.appendChild(div)
      
      if (type === 'error') {
        div.style = 'background: red; color: white; padding: 10px;'
      } else if (type === 'warning') {
        div.style = 'background: yellow; color: black; padding: 10px;'
        setTimeout(() => {
          warningBanner.removeChild(div)
          updateBannerVisibility()
        }, 5000)
      }
      updateBannerVisibility()
    },
    toggleFullscreen() {
      if (this.unityInstance) {
        this.unityInstance.SetFullscreen(1)
      } else {
        this.showErrorMessage('Game not loaded. Start the game first.')
      }
    },
    showErrorMessage(message) {
      const warningBanner = document.querySelector("#unity-warning")
      warningBanner.innerHTML = `<div style="background: red; color: white; padding: 10px;">${message}</div>`
      warningBanner.style.display = 'block'
    }
  },
  beforeUnmount() {
    if (this.unityInstance) {
      try {
        this.unityInstance.Quit()
      } catch (error) {
        console.error('Error quitting Unity instance:', error)
      }
    }
  }
}
</script>  
<style scoped>
  :root {
    --accent-color: #3498db;
    --accent-color-light: #5dade2;
    --accent-color-dark: #2980b9;
    --background-primary: #f4f6f7;
    --text-secondary: #545454;
  }
  
  *::-webkit-scrollbar {
    width: 8px;
  }
  
  *::-webkit-scrollbar-track {
    background: var(--background-primary);
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 20px;
  }
  
  .pattern-slide {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .pattern-slide.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .pattern-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    background: #fff;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .pattern-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
  }
  
  .pattern-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--accent-color-light);
    margin-bottom: 1.5rem;
    transform: translateX(-20px);
    opacity: 0;
    transition: all 0.6s ease;
  }
  
  .pattern-slide.active .pattern-title {
    transform: translateX(0);
    opacity: 1;
  }
  
  .pattern-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    transform: translateX(-30px);
    opacity: 0;
    transition: all 0.6s ease 0.2s;
  }
  
  .pattern-slide.active .pattern-description {
    transform: translateX(0);
    opacity: 1;
  }
  
  .code-showcase {
    background: #0a0a15;
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
  }
  
  .pattern-action {
    display: inline-block;
    background: #333;
    color: white;
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    margin-top: 1.5rem;
    transform: translateY(20px);
    opacity: 0;
    border: none;
    cursor: pointer;
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
    'DejaVu Sans Mono', monospace;
  }
  
  .pattern-slide.active .pattern-action {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.7s;
  }
  
  .pattern-action:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  .game-controls {
    display: flex;
    gap: 1rem;
  }

  .loading-text {
    color: white;
    text-align: center;
    margin-top: 10px;
    font-size: 1rem;
  }

  #unity-warning {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%);
    width: 100%;
    text-align: center;
    z-index: 100;
  }
  
  @media (max-width: 1024px) {
    .pattern-content {
      grid-template-columns: 1fr;
      padding: 2rem;
    }
  
    .pattern-title {
      font-size: 2rem;
    }
  
    .pattern-description {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    .pattern-slide {
      padding: 1rem;
    }
  
    .pattern-content {
      border-radius: 10px;
      padding: 1.5rem;
    }
  
    .pattern-title {
      font-size: 1.8rem;
    }
  }
  #unity-container.unity-desktop canvas {
    width: 960px;
    height: 600px;
  }
  
  #unity-loading-bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  
  #unity-progress-bar-empty {
    width: 200px;
    height: 18px;
    margin: 10px auto 0 auto;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
  }
  
  #unity-progress-bar-full {
    width: 0%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
  }
  
  #unity-warning {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%);
    background: transparent;
    width: 100%;
    text-align: center;
  }
  </style>