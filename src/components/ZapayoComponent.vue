<script>
export default {
  name: 'ZapayoComponent',
  data() {
    return {
      unityInstance: null,
      isGameLoaded: false,
      isUnityLoaded: false,
      unityScriptLoaded: false,
    };
  },
  mounted() {
    this.loadUnityLoaderScript();
  },
  methods: {
    loadUnityLoaderScript() {
      if (document.getElementById('unity-loader-script')) {
        console.log('Unity loader script already loaded.');
        this.unityScriptLoaded = true;
        return;
      }

      const script = document.createElement('script');
      script.id = 'unity-loader-script';
      script.src = './Build/HOKLA.loader.js';
      script.async = true;

      script.onload = () => {
        console.log('Unity loader script loaded successfully.');
        this.unityScriptLoaded = true;
      };

      script.onerror = () => {
        console.error('Failed to load Unity loader script.');
        this.showErrorMessage('Failed to load game resources. Please check your connection or the server configuration.');
      };

      document.body.appendChild(script);
    },
    loadUnityGame() {
      if (!this.unityScriptLoaded) {
        this.showErrorMessage('Unity loader script not loaded. Please wait and try again.');
        return;
      }

      const canvas = this.$refs.unityCanvas;
      const config = {
        dataUrl: './Build/HOKLA.data.gz',
        frameworkUrl: './Build/HOKLA.framework.js.gz',
        codeUrl: './Build/HOKLA.wasm.gz',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'Diego Alejandro Ocampo Madroñero',
        productName: 'M.I.I.T Game',
        productVersion: '1.0',
        showBanner: this.unityShowBanner,
      };

      document.querySelector('#unity-loading-bar').style.display = 'block';

      createUnityInstance(canvas, config, (progress) => {
        this.$refs.progressBar.style.width = 100 * progress + '%';
      })
        .then((unityInstance) => {
          this.unityInstance = unityInstance;
          this.isGameLoaded = true;
          document.querySelector('#unity-loading-bar').style.display = 'none';
          console.log('Unity game loaded successfully.');
        })
        .catch((error) => {
          console.error('Unity instance creation failed:', error);
          this.showErrorMessage('Failed to load the Unity game. Please check your resources.');
        });
    },
    unityShowBanner(msg, type) {
      const warningBanner = this.$refs.warningBanner;
      const div = document.createElement('div');
      div.innerHTML = msg;

      if (type === 'error') {
        div.style = 'background: red; color: white; padding: 10px;';
      } else if (type === 'warning') {
        div.style = 'background: yellow; color: black; padding: 10px;';
        setTimeout(() => {
          if (warningBanner.contains(div)) {
            warningBanner.removeChild(div);
          }
        }, 5000);
      }

      warningBanner.appendChild(div);
      warningBanner.style.display = 'block';
    },
    toggleFullscreen() {
      if (this.unityInstance) {
        this.unityInstance.SetFullscreen(1);
      } else {
        this.showErrorMessage('Game not loaded. Start the game first.');
      }
    },
    showErrorMessage(message) {
      const warningBanner = this.$refs.warningBanner;
      warningBanner.innerHTML = `<div style="background: red; color: white; padding: 10px;">${message}</div>`;
      warningBanner.style.display = 'block';
    },
  },
  beforeUnmount() {
    if (this.unityInstance) {
      try {
        this.unityInstance.Quit();
      } catch (error) {
        console.error('Error quitting Unity instance:', error);
      }
    }
  },
};
</script>
<template>
  <div class="pattern-slide active">
    <div class="pattern-content">
      <div class="pattern-info">
        <h2 class="pattern-title">M.I.I.T Game</h2>
        <p class="pattern-description">
          The game of makabeuz the pro the awh
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
          <div id="unity-loading-bar" ref="loadingBar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
              <div id="unity-progress-bar-full" ref="progressBar"></div>
            </div>
            <div class="loading-text">Loading...</div>
          </div>
          <div id="unity-warning" ref="warningBanner"></div>
        </div>
      </div>
    </div>
  </div>
</template>
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
    margin-top: 5rem;
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
    grid-template-rows: auto 1fr;
    gap: 2rem;
    max-width: 1200px;
    background: var(--bg-secondary);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }

  .pattern-info {
    grid-row: 1;
    text-align: center;
  }

  .code-showcase {
    grid-row: 2;
    background: #0a0a15;
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
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
    background: var(--text-primary);
    color: var(--bg-primary);
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
    justify-content: center;
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