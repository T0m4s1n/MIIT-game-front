<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { House, UserRound, Gamepad2, X, Menu, Gamepad, BringToFront} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) {
    isMenuOpen.value = false;
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const goTo = (path: string) => {
  router.push(path);
  closeMenu();
};

router.beforeEach((to, from, next) => {
  closeMenu();
  next();
});

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  document.body.style.overflow = '';
});

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

const clickOutside = (e: Event) => {
  const target = e.target as HTMLElement;
  if (isMenuOpen.value && !target.closest('.menu-btn')) {
    closeMenu();
  }
};
</script>
<template>
  <header class="header" :class="{ 'menu-open': isMenuOpen }">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <Gamepad :size="32" color="white"/>
      </router-link>
    </div>

    <button 
      class="menu-btn" 
      @click="toggleMenu" 
      :class="{ 'active': isMenuOpen }"
      aria-label="Toggle menu"
    >
      <div class="icon-wrapper">
        <Transition name="icon" mode="out-in">
          <Menu v-if="!isMenuOpen" key="menu" :size="32" color="white"/>
          <X v-else key="close" :size="32" color="white"/>
        </Transition>
      </div>
    </button>

    <nav class="desktop-nav" :class="{ 'hidden': isMobile }">
      <router-link to="/" class="nav-item" active-class="active">
        <House :size="24" color="white"/>
        <span>Home</span>
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active">
        <UserRound :size="24" color="white"/>
        <span>About</span>
      </router-link>
      <router-link to="/patterns" class="nav-item" active-class="active">
        <BringToFront :size="24" color="white"/>
        <span>Patterns</span>
      </router-link>
      <button class="play-btn" @click="goTo('/game')">
        <Gamepad2 :size="24" color="Black"/>
        <span class="play-btn-glow"></span>
      </button>
    </nav>
    <Transition name="mobile-menu">
      <nav v-if="isMenuOpen && isMobile" class="mobile-menu" v-click-outside="clickOutside">
        <div class="menu-content">
          <router-link to="/" class="menu-item" @click="closeMenu" active-class="active">
            <House :size="24" color="white"/>
            <span>Home</span>
          </router-link>
          <router-link to="/about" class="menu-item" @click="closeMenu" active-class="active">
            <UserRound :size="24" color="white"/>
            <span>About</span>
          </router-link>
          <router-link to="/patterns" class="menu-item" @click="closeMenu" active-class="active">
            <BringToFront :size="24" color="white"/>
            <span>Patterns</span>
          </router-link>
          <button class="play-btn mobile" @click="goTo('/game')">
            <Gamepad2 :size="24" color="Black"/>
            <span class="play-btn-glow"></span>
          </button>
        </div>
      </nav>
    </Transition>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(17, 17, 17, 0.93);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  height: 72px;
  transition: background-color 0.3s ease;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
    'DejaVu Sans Mono', monospace;
}

.header.menu-open::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 45;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.logo {
  position: relative;
  z-index: 52;
}

.logo-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-link:hover {
  transform: scale(1.1) rotate(-5deg);
  background-color: rgba(255, 255, 255, 0.1);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover::before {
  transform: translateY(0);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-item span {
  position: relative;
  z-index: 1;
  font-weight: 500;
}

.menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 52;
}

.menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon-wrapper {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background-color: rgba(17, 17, 17, 0.8);
  padding-top: 5rem;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 51;
}

.menu-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.menu-item span {
  font-size: 1.1rem;
  font-weight: 500;
}

.play-btn {
  padding: 0.75rem 2rem;
  background-color: #fff;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.play-btn:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.play-btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.play-btn:hover .play-btn-glow {
  transform: translateY(-30%);
  opacity: 1;
}

.play-btn.mobile {
  margin-top: 1rem;
  width: 100%;
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(100%);
}

.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
}

@media screen and (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .desktop-nav.hidden {
    display: none;
  }

  .menu-btn {
    display: flex;
  }
}
</style>