<template>
  <q-page>

    <div>
      <div style="background-color:#ff931e; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h3 class="text-weight-bolder">Introducing "Shub Hunt"</h3>
          <h4>The Ultimate Hide-and-Seek Adventure!</h4>
          <div style="padding: 10px;">
            <q-card dark>
              <q-parallax :height="400" src="/images/shubhunt0.png" />
              <q-card-section>
                <p class="text-subtitle1">Embark on an exhilarating journey into the world of Shub Studio with our
                  latest
                  video
                  game
                  sensation, "Shub Hunt"! This unique and thrilling game combines the excitement of hide-and-seek with
                  the
                  strategic twist of prop hunting, creating an immersive experience for all players.</p>
              </q-card-section>
            </q-card>
          </div>


          <div class="row">
            <div class="my-card col-lg-4 col-sm-6 col-xs-12" style="padding: 10px;" v-for="feat in gameFeatures"
              v-bind:key="feat.title">
              <q-card>
                <q-img :src="feat.imageURL">
                  <div class="absolute-bottom text-h6">
                    {{ feat.title }}
                  </div>
                </q-img>

                <q-card-section style="color: #232524;">
                  {{ feat.desc }}
                </q-card-section>
              </q-card>
            </div>

          </div>

          <div class="row justify-center" style="margin-top: 50px;">
            <q-btn outline icon="fa-solid fa-download" label="download"
              href="https://shubstudio.com/files/shubhuntsetup_v0.2.1.exe" />
          </div>


          <div style="height: 50px; width: 100%;"></div>

        </div>
        <br />
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
