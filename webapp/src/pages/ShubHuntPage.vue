<template>
  <q-page>

    <div>
      <div style="background-color:#ff931e; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h3 class="text-weight-bolder">Introducing "Shub Hunt"</h3>
          <h4>The Ultimate Prop-and-Seek Adventure!</h4>
          <p class="text-subtitle1">Embark on an exhilarating journey into the world of Shub Studio with our latest video
            game
            sensation, "Shub Hunt"! This unique and thrilling game combines the excitement of hide-and-seek with the
            strategic twist of prop hunting, creating an immersive experience for all players.</p>
          <q-img src="/images/shubhunt0.png" spinner-color="white"
            style="width: 100%; max-height: 400px; margin-top: 20px; margin-bottom: 20px;" fit="cover" />

          <p class="text-h5">Dynamic Gameplay</p>
          <p>Immerse yourself in a dynamic and ever-evolving gameplay experience. Whether you're a shub in disguise or a
            hunter seeking the props, every round brings new challenges and surprises.</p>

          <p class="text-h5">Randomized Roles</p>
          <p>Are you a master of disguise or an expert tracker? Roles are randomized each round, ensuring a
            balanced and engaging experience for everyone involved.</p>


          <q-img src="/images/shubhunt1.png" spinner-color="white"
            style="width: 100%; max-height: 500px; margin-top: 20px; margin-bottom: 20px;" fit="cover">
            <div class="absolute-bottom desktop-only">
              <p class="text-h5">Strategic Prop Placement</p>
              <p>Hiders, get ready to transform into everyday objects within the game environment. From furniture to
                plants,
                your creativity is the key to successful concealment. Hunters, sharpen your observation skills to spot the
                shubs in their clever disguises!</p>
            </div>
          </q-img>
          <!-- <div class="mobile-only">
            <p class="text-h5">Strategic Prop Placement</p>
            <p>Hiders, get ready to transform into everyday objects within the game environment. From furniture to
              plants,
              your creativity is the key to successful concealment. Hunters, sharpen your observation skills to spot the
              shubs in their clever disguises!</p>
          </div> -->


          <p class="text-h5">Team Collaboration</p>
          <p> "Shub Hunt" is all about teamwork. Communicate with your fellow players, strategize your approach, and
            coordinate your movements to outsmart the opposing team.</p>

          <p class="text-h5">Unique Environments</p>
          <p>Explore a variety of vibrant and visually stunning environments, each designed to challenge both hiders and
            hunters. From cozy shub spaces to bustling cityscapes, every level offers a fresh and exciting setting.</p>

          <p class="text-h5">Power-Ups and Boosts</p>
          <p>Spice up the game with power-ups and boosts that add an extra layer of strategy. Whether it's a temporary
            speed boost for hunters or a special hiding ability for shubs, these enhancements keep the gameplay dynamic.
          </p>
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

    return {};
  }
});
</script>
