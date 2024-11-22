<script>
export default {
  name: 'PatternsComponent',
  data() {
    return {
      isActive: true,
      currentPatternIndex: 0,
      patterns: [
        {
          title: 'Observer Pattern',
          description: 'The observer pattern is used to check if the player has collected a coin. When the player collects a coin, the coin counter is updated.',
          codeSnippet: [
            'using UnityEngine;',
            'public class CoinCounter : MonoBehaviour{',
            '    public delegate void CoinCollected(int coin);',
            '    public static event CoinCollected onCoinCollected;',
            '    [SerializeField] private int coinValue;',
            '    private void OnTriggerEnter2D(Collider2D collision)',
            '    {',
            '        if (collision.CompareTag("Player"))',
            '        {',
            '            addCoin();',
            '            Destroy(gameObject);',
            '        }',
            '    }',
            '    public void addCoin()',
            '    {',
            '        onCoinCollected?.Invoke(coinValue);',
            '    }',
            '}'
          ]
        },
        {
          title: 'Builder Pattern',
          description: 'The builder pattern is used to create a potion object with different attributes. The builder pattern allows you to create an object step by step and produce different types of objects using the same construction code.',
          codeSnippet: [
          'public class PotionBuilder',
          '{',
              'private string name;',
              'private string effect;',
              'private int value;',
              'private float duration;',
              'public PotionBuilder SetName(string name)',
              '{',
                'this.name = name;',
                'return this;',
              '}',
              'public PotionBuilder SetEffect(string effect)',
              '{',
                  'this.effect = effect;',
                  'return this;',
              '}',
              'public PotionBuilder SetValue(int value)',
              '{',
                  'this.value = value;',
                  'return this;',
              '}',
              'public PotionBuilder SetDuration(float duration)',
              '{',
                  'this.duration = duration;',
                  'return this;',
              '}',
              'public Potion Build()',
              '{',
                  'return new Potion(name, effect, value, duration, GameObject.FindFirstObjectByType<Character>());',
              '}',
          '}',
          '',
          ]
        },
        {
          title: 'Plugin Pattern',
          description: 'The plugin pattern is used to create a theme plugin that allows the user to switch between light and dark mode. The plugin pattern is used to encapsulate the theme switching logic and make it reusable across different components.',
          codeSnippet: [
          'export const isDarkMode = ref(false)',
          'export const themeUtils = {',
          '  init() {',
          '    const savedTheme = localStorage.getItem("theme")',
          '    if (savedTheme === "dark" || ',
          '        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {',
          '      this.enableDarkMode()',
          '    } else {',
          '      this.enableLightMode()',
          '    }',
          '  },',
          '  toggleTheme() {',
          '    isDarkMode.value = !isDarkMode.value',
          '    if (isDarkMode.value) {',
          '      this.enableDarkMode()',
          '    } else {',
          '      this.enableLightMode()',
          '    }',
          '  },',
          'export const ThemePlugin = {',
          '  install: (app) => {',
          '    app.config.globalProperties.$theme = themeUtils',
          '    themeUtils.init()',
          '  }',
          '}'
          ]
        }
      ]
    }
  },
  computed: {
    currentPattern() {
      return this.patterns[this.currentPatternIndex];
    }
  },
  methods: {
    nextPattern() {
      this.isActive = false;
      setTimeout(() => {
        this.currentPatternIndex = 
          (this.currentPatternIndex + 1) % this.patterns.length;
        this.isActive = true;
      }, 500);
    },
    prevPattern() {
      this.isActive = false;
      setTimeout(() => {
        this.currentPatternIndex = 
          (this.currentPatternIndex - 1 + this.patterns.length) % this.patterns.length;
        this.isActive = true;
      }, 500);
    }
  }
}
</script>
<template>
    <div class="design-patterns-container">
      <section 
        class="pattern-slide" 
        :class="{ 'active': isActive }"
      >
        <div class="pattern-content">
          <div class="pattern-info">
            <h2 class="pattern-title">{{ currentPattern.title }}</h2>
            <p class="pattern-description">{{ currentPattern.description }}</p>
            <div class="navigation-buttons">
              <button 
                class="pattern-action prev-button" 
                @click="prevPattern"
              >
                Previous Pattern
              </button>
              <button 
                class="pattern-action next-button" 
                @click="nextPattern"
              >
                Next Pattern
              </button>
            </div>
          </div>
          <div class="code-showcase">
            <div 
              v-for="(line, index) in currentPattern.codeSnippet" 
              :key="index" 
              class="code-line"
            >
              {{ line }}
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<style scoped>  

.navigation-buttons {
  display: flex;
  gap: 1rem;
}

.prev-button {
  background: var(--accent-color-dark);
}

.prev-button:hover {
  background: color-mix(in srgb, var(--accent-color-dark) 80%, white);
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
    background: var(--bg-secondary);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    margin-top: 4rem;
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
  
  .code-line {
    background: color-mix(in srgb, var(--accent-color) 10%, transparent);
    color: #fff ;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }
  
  .pattern-slide.active .code-line {
    opacity: 1;
    transform: translateY(0);
  }
  
  .pattern-slide.active .code-line:nth-child(1) { transition-delay: 0.3s; }
  .pattern-slide.active .code-line:nth-child(2) { transition-delay: 0.4s; }
  .pattern-slide.active .code-line:nth-child(3) { transition-delay: 0.5s; }
  .pattern-slide.active .code-line:nth-child(4) { transition-delay: 0.6s; }
  
  .pattern-action {
    display: inline-block;
    background: var(--bg-primary);
    color: var(--text-primary);
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
  
    .code-showcase {
      padding: 1rem;
    }
  
    .code-line {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
  }
  </style>