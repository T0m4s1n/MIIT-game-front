<script>
import { h } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import Vue from '../assets/vue.svg'

export default {
  name: 'Document',
  data() {
    return {
      projectName: 'M.I.T.T Game',
      projectSubtitle: 'Documentation',
      projectDescription: 'The documentation provides detailed information about the M.I.T.T Game project, including its purpose, features, and how to use it. This documentation is intended to help developers and users understand the projects structure, components, and functionalities.',
      projectVersion: 'v1.0.0',
      projectImage: new URL('../assets/opa.png', import.meta.url).href,
      technologies: [
        { 
          name: 'Vue.js', 
          icon: Vue, 
          proficiency: 91.6 
        },
        { 
          name: 'TypeScript', 
          icon: 'Code', 
          proficiency: 3.3 
        },
        {
          name: 'CSS',
          icon: 'Css3',
          proficiency: 4.7
        },
        {
          name: 'HTML',
          icon: 'Css3',
          proficiency: 0.4
        }
      ],
      socialLinks: [
        { 
          name: 'GitHub', 
          url: 'https://github.com/T0m4s1n/MIIT-game-front', 
          icon: 'Github' 
        },
      ]
    }
  },
  components: {
    ...Object.keys(LucideIcons).reduce((components, iconName) => {
      components[iconName] = LucideIcons[iconName]
      return components
    }, {})
  },
  methods: {
    renderIcon(iconName) {
      return h(LucideIcons[iconName], {
        size: 24, 
        class: 'text-gray-500 mr-2'
      })
    }
  },
  render() {
    return h('div', [
      h('div', { class: 'technologies' }, 
        this.technologies.map(tech => 
          h('div', { class: 'flex items-center' }, [
            this.renderIcon(tech.icon),
            h('span', tech.name)
          ])
        )
      ),
      h('div', { class: 'social-links' }, 
        this.socialLinks.map(link => 
          h('a', { href: link.url }, [
            this.renderIcon(link.icon),
            h('span', link.name)
          ])
        )
      )
    ])
  }
}
</script>
<template>
    <div class="about-container">
      <div class="about-wrapper">
        <div class="about-content">
          <div class="about-text">
            <div class="text-container">
              <h1>{{ projectName }}</h1>
              <h2>{{ projectSubtitle }}</h2>
              <p>{{ projectDescription }}</p>
            </div>
  
            <section class="skills-section">
              <h3>Key Technologies</h3>
              <div class="skill-grid">
                <div v-for="(tech, index) in technologies" :key="index" class="skill-item">
                  <div class="skill-icon">
                    <i :class="tech.icon"></i>
                  </div>
                  <div class="skill-details">
                    <span class="skill-name">{{ tech.name }}</span>
                    <div class="skill-bar">
                      <div 
                        class="skill-progress" 
                        :style="{ width: `${tech.proficiency}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
  
            <div class="action-buttons">
              <a 
                v-for="(link, index) in socialLinks" 
                :key="index" 
                :href="link.url" 
                target="_blank" 
                class="social-link"
              >
                <i :class="link.icon"></i>
                {{ link.name }}
              </a>
            </div>
          </div>
  
          <div class="about-visual">
            <div class="profile-card">
              <div class="profile-image-wrapper">
                <img 
                  :src="projectImage" 
                  alt="Project Screenshot" 
                  class="profile-image"
                />
                <div class="profile-overlay"></div>
              </div>
              <div class="profile-details">
                <h2>{{ projectName }}</h2>
                <p>{{ projectVersion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="css">
.about-container {
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 2rem;
  z-index: 1001;
}
.about-wrapper {
  max-width: 1200px;
  width: 100%;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  overflow: hidden;
  background: var(--bg-secondary);
}
.about-content {
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }

.about-text {
  flex: 1;
  padding: 3rem;
  background-color: var(--bg-secondary);
}

.text-container h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.text-container h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.text-container p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.skills-section {
  margin-bottom: 2rem;
}

.skills-section h3 {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-details {
  flex-grow: 1;
}

.skill-name {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.skill-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: #4a90e2;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
}

.about-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: 2rem;
}

.profile-card {
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  background-color: var(--bg-secondary);
}

.profile-image-wrapper {
  position: relative;
  height: 300px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg, 
    rgba(0,0,0,0.2) 0%, 
    rgba(0,0,0,0.5) 100%
  );
}

.profile-details {
  padding: 1.5rem;
  background-color: var(--bg-primary);
}

.profile-details h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
}

.profile-details p {
  margin: 0.5rem 0 0;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .about-content {
    flex-direction: column;
    text-align: center;
  }

  .about-text, .about-visual {
    width: 100%;
    padding: 2rem;
  }

  .skill-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 1rem;
  }

  .text-container h1 {
    font-size: 2rem;
  }

  .text-container h2 {
    font-size: 1.2rem;
  }

  .profile-image-wrapper {
    height: 250px;
  }
}
</style>