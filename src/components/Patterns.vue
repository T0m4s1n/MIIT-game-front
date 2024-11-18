<script>
export default {
  name: 'PatternsComponent',
  data(){
    return{
        hover: null
    }
  }
}
</script>
<template>
    <section class="pattern-container">
        <div class="pattern-grid">
            <div class="pattern-panel"
                @mouseover="hover = 'pattern1'"
                @mouseleave="hover = null"
                :class="{ 'active': hover === 'pattern1' }">
                <h2 class="pattern-title">Singleton</h2>
                <div class="pattern-content">
                    <p> 
                        <span class="highlight">Singleton Pattern</span> is a design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to <span class="emphasis">coordinate actions across the system.</span>
                    </p>
                </div>
            </div>   
        </div>
    </section>
</template>