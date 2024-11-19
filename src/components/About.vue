<script setup lang="ts">
import { ref } from 'vue'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Code, 
  PenTool, 
  Database, 
  Server,
  Beef 
} from 'lucide-vue-next'

interface Skill {
  name: string
  percentage: number
  icon?: any
}

interface SocialLink {
  name: string
  url: string
  icon?: any
}

interface CardData {
  title: string
  subtitle: string
  name: string
  profession: string
  description: string
  profileImage: string
  skills: Skill[]
  socialLinks: SocialLink[]
}

const firstCard = ref<CardData>({
  title: 'About Maka',
  subtitle: 'Developer of Backend',
  name: 'Maka',
  profession: 'Complete developer',
  description: 'Passionate about creating innovative solutions and pushing technological boundaries very interesting man, he made the NASA, and he can make river be very happy ',
  profileImage: new URL('../assets/maka.jpeg', import.meta.url).href,
  skills: [
    { name: 'Frontend', percentage: 95, icon: Code },
    { name: 'Design', percentage: 95, icon: PenTool },
    { name: 'Backend', percentage: 54, icon: Server },
    { name: 'Database', percentage: 48, icon: Database }
  ],
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/MAKEBUZ', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { name: 'Steam', url: 'https://twitter.com', icon: Beef }
  ]
})

const secondCard = ref<CardData>({
  title: 'About T0m4s1n',
  subtitle: 'Developer of frontend',
  name: 'T0m4s1n',
  profession: 'Frontend and JSON',
  description: 't0m4s1n loves red dead redemption and plays dark souls and elden ring all the time, but it also likes to do things like idunno, pollo asado?',
  profileImage: new URL('../assets/t0m4s1n.jpg', import.meta.url).href,
  skills: [
    { name: 'Frontend', percentage: 93, icon: Code },
    { name: 'Design', percentage: 78, icon: PenTool },
    { name: 'Backend', percentage: 25, icon: Server },
    { name: 'Database', percentage: 45, icon: Database }
  ],
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/company', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/company', icon: Linkedin },
    { name: 'Steam', url: 'https://twitter.com/company', icon: Beef}
  ]
})

const updateCardContent = (cardNumber: 1 | 2, newData: Partial<CardData>) => {
  if (cardNumber === 1) {
    firstCard.value = { ...firstCard.value, ...newData }
  } else {
    secondCard.value = { ...secondCard.value, ...newData }
  }
}

const updateField = (cardNumber: 1 | 2, field: keyof CardData, value: any) => {
  if (cardNumber === 1) {
    firstCard.value[field] = value
  } else {
    secondCard.value[field] = value
  }
}

const updateSkills = (cardNumber: 1 | 2, newSkills: Skill[]) => {
  if (cardNumber === 1) {
    firstCard.value.skills = newSkills
  } else {
    secondCard.value.skills = newSkills
  }
}

const updateSocialLinks = (cardNumber: 1 | 2, newLinks: SocialLink[]) => {
  if (cardNumber === 1) {
    firstCard.value.socialLinks = newLinks
  } else {
    secondCard.value.socialLinks = newLinks
  }
}

defineExpose({
  updateCardContent,
  updateField,
  updateSkills,
  updateSocialLinks,
  firstCard,
  secondCard
})
</script>
<template>
  <div class="container">
    <!-- First Card -->
    <div class="about-container">
      <div class="about-wrapper">
        <div class="about-content">
          <div class="about-text">
            <div class="text-container">
              <h1>{{ firstCard.title }}</h1>
              <h2>{{ firstCard.subtitle }}</h2>
              <p>{{ firstCard.description }}</p>
              
              <div class="skills-section">
                <h3>Skills</h3>
                <div class="skill-grid">
                  <div 
                    v-for="skill in firstCard.skills" 
                    :key="skill.name" 
                    class="skill-item"
                  >
                    <div class="skill-icon">
                      <component :is="skill.icon" v-if="skill.icon" />
                    </div>
                    <div class="skill-details">
                      <span class="skill-name">{{ skill.name }}</span>
                      <div class="skill-bar">
                        <div 
                          class="skill-progress" 
                          :style="{ width: `${skill.percentage}%` }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="action-buttons">
                <a 
                  v-for="link in firstCard.socialLinks" 
                  :key="link.name"
                  :href="link.url"
                  class="social-link"
                  target="_blank"
                >
                  <component :is="link.icon" />
                  <span>{{ link.name }}</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="about-visual">
            <div class="profile-card">
              <div class="profile-image-wrapper">
                <img :src="firstCard.profileImage" :alt="firstCard.title" class="profile-image" />
              </div>
              <div class="profile-details">
                <h2>{{ firstCard.name }}</h2>
                <p>{{ firstCard.profession }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-container">
      <div class="about-wrapper">
        <div class="about-content">
          <div class="about-text">
            <div class="text-container">
              <h1>{{ secondCard.title }}</h1>
              <h2>{{ secondCard.subtitle }}</h2>
              <p>{{ secondCard.description }}</p>
              
              <div class="skills-section">
                <h3>Skills</h3>
                <div class="skill-grid">
                  <div 
                    v-for="skill in secondCard.skills" 
                    :key="skill.name" 
                    class="skill-item"
                  >
                    <div class="skill-icon">
                      <component :is="skill.icon" v-if="skill.icon" />
                    </div>
                    <div class="skill-details">
                      <span class="skill-name">{{ skill.name }}</span>
                      <div class="skill-bar">
                        <div 
                          class="skill-progress" 
                          :style="{ width: `${skill.percentage}%` }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="action-buttons">
                <a 
                  v-for="link in secondCard.socialLinks" 
                  :key="link.name"
                  :href="link.url"
                  class="social-link"
                  target="_blank"
                >
                  <component :is="link.icon" />
                  <span>{{ link.name }}</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="about-visual">
            <div class="profile-card">
              <div class="profile-image-wrapper">
                <img :src="secondCard.profileImage" :alt="secondCard.title" class="profile-image" />
              </div>
              <div class="profile-details">
                <h2>{{ secondCard.name }}</h2>
                <p>{{ secondCard.profession }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.about-container{
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