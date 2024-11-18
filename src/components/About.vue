<script>
import profileImage1 from '../assets/yo.png';
import profileImage2 from '../assets/maka.png';

export default {
  name: 'AboutComponent',
  data() {
    return {
      aboutDescription: 'Passionate developers creating this application for the use of software patterns with a focus on clean, efficient code.',
      skills: [
        { name: 'Vue.js', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'Design', level: 75 },
        { name: 'Backend', level: 30 }
      ],
      contactLinks: [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'Portfolio', url: '#' }
      ],
      images: [profileImage1, profileImage2],
      currentImageIndex: 0
    }
  },
  mounted() {
    this.setupScrollObserver();
    this.animateSkillBars();
    this.startImageRotation();
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  methods: {
    setupScrollObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              this.animateSkillBars();
            }
          });
        },
        {
          threshold: 0.3
        }
      );

      if (this.$refs.aboutSlide) {
        observer.observe(this.$refs.aboutSlide);
      }
    },
    animateSkillBars() {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach((bar, index) => {
        const skillLevel = this.skills[index].level;
        setTimeout(() => {
          bar.style.width = `${skillLevel}%`;
        }, 500);
      });
    },
    startImageRotation() {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 5000);
    }
  }
}
</script>

<template>
  <div class="about-container">
    <main>
      <div class="about-slide" ref="aboutSlide">
        <div class="about-content">
          <div class="about__visual">
            <div class="animated-element profile-element">
              <div class="profile-container">
                <div class="profile-image">
                  <div class="profile-overlay">
                    <img :src="currentImage" alt="Profile" />
                  </div>
                </div>
                <div class="profile-details">
                  <div class="skill-bar" v-for="(skill, index) in skills" :key="index">
                    <div class="skill-name">{{ skill.name }}</div>
                    <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="about__info">
            <h2>About Us</h2>
            <p>{{ aboutDescription }}</p>
            <div class="contact-links">
              <a 
                v-for="(link, index) in contactLinks" 
                :key="index" 
                :href="link.url" 
                target="_blank"
                class="contact-link"
              >
                {{ link.name }}
              </a>
            </div>
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
  
  .about-container {
    margin-top: 100px;
    min-height: 100vh;
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
      'DejaVu Sans Mono', monospace;
    background: #ffffff;
    position: relative;
    overflow-x: hidden;
  }
  
  .about-container::before {
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
  
  .about-slide {
    margin-left: 6rem;
    height: 100vh;
    position: relative;
  }
  
  .about-content {
    height: 100%;
    display: flex;
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .about__visual {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    right: 2rem;
    top: 0;
  }
  
  .about__info {
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
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .active .animated-element {
    opacity: 1;
    transform: translateY(0);
  }
  
  .profile-container {
    width: 100%;
    max-width: 500px;
    background: #2a2a2a;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
  }
  
  .profile-container:hover {
    transform: scale(1.025);
  }
  
  .profile-image {
    width: 100%;
    height: 300px;
    background: #121212;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  
  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg, 
      rgba(0,0,0,0.1) 0%, 
      rgba(0,0,0,0.3) 100%
    );
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    }

    .profile-image img.active {
    opacity: 1;
    }
    
  .skill-bar {
    margin: 15px 0;
    background: #333;
    border-radius: 10px;
    height: 30px;
    position: relative;
    overflow: hidden;
  }
  
  .skill-name {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    z-index: 2;
    font-size: 0.9rem;
  }
  
  .skill-progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #404040;
    z-index: 1;
    transition: width 1.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  h2 {
    text-transform: uppercase;
    font-size: 2.5rem;
    margin: 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.2s;
  }
  
  .active h2 {
    opacity: 1;
    transform: translateY(0);
  }
  
  p {
    margin: 1.5rem 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.4s;
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 90%;
  }
  
  .active p {
    opacity: 1;
    transform: translateY(0);
  }
  
  .contact-links {
    display: flex;
    gap: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.6s;
  }
  
  .active .contact-links {
    opacity: 1;
    transform: translateY(0);
  }
  
  .contact-link {
    text-transform: uppercase;
    font-weight: 600;
    color: hsl(0 0% 98%);
    background: hsl(0 0% 0%);
    padding: 1rem 2rem;
    text-decoration: none;
    word-spacing: 0.2rem;
    font-size: 1rem;
    border-radius: 6px;
    transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    position: relative;
    overflow: hidden;
  }
  
  .contact-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg, 
      transparent, 
      hsla(0, 0%, 40%, 0.3), 
      transparent
    );
    transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  
  .contact-link:hover::before {
    left: 100%;
  }
  
  .contact-link:hover {
    background: hsl(0 0% 40%);
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 1440px) {
    .about-slide {
      margin-left: 4rem;
    }
  }
  
  @media (max-width: 1200px) {
    .about-slide {
      margin-left: 2rem;
    }
  }
  
  @media (max-width: 992px) {
    .about-content {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .about-slide {
      margin-left: 0;
    }
    
    .about__visual,
    .about__info {
      position: static;
      width: 100%;
      height: auto;
      padding: 1rem;
    }
    
    .about__visual {
      margin-bottom: 2rem;
    }
    
    .profile-container {
      max-width: 600px;
    }
    
    .profile-image {
      height: 250px;
    }
  }
  
  @media (max-width: 576px) {
    .profile-image {
      height: 200px;
    }
    
    h2 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
    
    .contact-links {
      flex-direction: column;
      align-items: center;
    }
    
    .contact-link {
      width: 100%;
      text-align: center;
      margin-bottom: 0.5rem;
    }
  }
  </style>