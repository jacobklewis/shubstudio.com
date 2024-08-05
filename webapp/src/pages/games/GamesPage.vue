<template>
  <q-page>

    <div>
      <div style="background-color:#22b573; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <q-card dark>
            <q-parallax :height="400" src="/images/shubhunt0.png" />
            <q-card-section>
              <h3 class="text-weight-bolder">Shub Hunt</h3>
              <p class="text-h5">The Ultimate Hide-and-Seek Adventure!</p>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="View More" color="primary" to="/games/shub-hunt" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const gameFeatures = [
      {
        imageURL: '/images/shubhunt0.png',
        title: 'Dynamic Gameplay',
        desc: 'Immerse yourself in a dynamic and ever-evolving gameplay experience. Whether you\'re a shub in disguise or a hunter seeking the props, every round brings new challenges and surprises.'
      },
      {
        imageURL: '/images/shubhunt0.png',
        title: 'Randomized Roles',
        desc: 'Are you a master of disguise or an expert tracker? Roles are randomized each round, ensuring a balanced and engaging experience for everyone involved.'
      },
      {
        imageURL: '/images/shubhunt1.png',
        title: 'Strategic Prop Placement',
        desc: 'Hiders, get ready to transform into everyday objects within the game environment. From furniture to plants, your creativity is the key to successful concealment. Hunters, sharpen your observation skills to spot the shubs in their clever disguises!'
      },
      {
        imageURL: '/images/shubhunt0.png',
        title: 'Team Collaboration',
        desc: '"Shub Hunt" is all about teamwork. Communicate with your fellow players, strategize your approach, and coordinate your movements to outsmart the opposing team.'
      },
      {
        imageURL: '/images/shubhunt0.png',
        title: 'Unique Environments',
        desc: 'Explore a variety of vibrant and visually stunning environments, each designed to challenge both hiders and hunters. From cozy shub spaces to bustling cityscapes, every level offers a fresh and exciting setting.'
      },
      {
        imageURL: '/images/shubhunt0.png',
        title: 'Power-Ups and Boosts',
        desc: 'Spice up the game with power-ups and boosts that add an extra layer of strategy. Whether it\'s a temporary speed boost for hunters or a special hiding ability for shubs, these enhancements keep the gameplay dynamic.'
      }
    ]
    return { gameFeatures };
  }
});
</script>
