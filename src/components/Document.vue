<script>
import { h } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

export default {
  name: 'Document',
  data() {
    return {
      projectName: 'MITT Game',
      projectSubtitle: 'Documentation',
      projectDescription: 'A detailed overview of the project, its purpose, key features, and technological stack. This section provides an in-depth explanation of the project\'s goals, architecture, and unique value proposition.',
      projectVersion: 'v1.0.0',
      projectImage: '/path/to/project/screenshot.png',
      technologies: [
        { 
          name: 'Vue.js', 
          icon: 'Vue', 
          proficiency: 92.8 
        },
        { 
          name: 'TypeScript', 
          icon: 'Code', 
          proficiency: 2.2 
        },
        {
          name: 'CSS',
          icon: 'Css3',
          proficiency: 5.0
        }
      ],
      socialLinks: [
        { 
          name: 'GitHub', 
          url: 'https://github.com/T0m4s1n/MIIT-game-front', 
          icon: 'Github' 
        },
        { 
          name: 'Documentation', 
          url: 'https://docs.yourproject.com', 
          icon: 'Book' 
        }
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
      // Example of rendering technologies with icons
      h('div', { class: 'technologies' }, 
        this.technologies.map(tech => 
          h('div', { class: 'flex items-center' }, [
            this.renderIcon(tech.icon),
            h('span', tech.name)
          ])
        )
      ),
      // Example of rendering social links with icons
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
  background-color: #f4f4f4;
  padding: 2rem;
  background: #fff;
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
  background: #fff;
}
.about-content {
    background: #fff;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }

.about-text {
  flex: 1;
  padding: 3rem;
  background: #fff;
  background-color: #fff;
}

.text-container h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.text-container h2 {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 1rem;
}

.text-container p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.skills-section {
  margin-bottom: 2rem;
}

.skills-section h3 {
  font-size: 1.2rem;
  color: #333;
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

.skill-icon {
  background-color: #f0f0f0;
  padding: 0.75rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-details {
  flex-grow: 1;
}

.skill-name {
  display: block;
  margin-bottom: 0.5rem;
  color: #444;
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
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #f0f0f0;
  transform: translateY(-3px);
}

.about-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
}

.profile-card {
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
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
  background-color: white;
}

.profile-details h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.profile-details p {
  margin: 0.5rem 0 0;
  color: #666;
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