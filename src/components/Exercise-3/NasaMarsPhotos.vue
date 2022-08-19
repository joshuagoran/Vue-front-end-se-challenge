<template>
  <div class="nasa-mars-photos">
    <img alt="NASA logo" class="nasa-mars-photos__nasa-logo" src="@/assets/nasa-logo.png">

    <h3 class="nasa-mars-photos__title">
      Mars Curiosity Rover Photos
    </h3>
    <div class="nasa-mars-photos__sol">
      Mission sol (Mars solar date): {{ randomSol }}
    </div>

    <div v-if="!photos.length">
      Loading...
    </div>
    <div v-else class="nasa-mars-photos__info">
      <div>
        <FontAwesomeIcon :icon="['fas', 'earth']" />
        Earth date: {{ photos[0]?.earth_date }}
      </div>
      <div>
        <FontAwesomeIcon :icon="['fas', 'rocket']" />
        Launch date: {{ photos[0]?.rover.launch_date }}
      </div>
      <div>
        <FontAwesomeIcon :icon="['fas', 'meteor']" />
        Landing date: {{ photos[0]?.rover.landing_date }}
      </div>

      <!-- begin carousel -->
      <div id="photoCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-indicators">
            <button
              v-for="(photo, index) in photos"
              :key="photo.id"
              type="button"
              data-bs-target="#photoCarousel"
              :data-bs-slide-to="index"
              :class="{ 'active': index === 0 }"
            />
          </div>
          <template v-for="(photo, index) in photos" :key="photo.id">
            <div :class="{ 'active': index === 0 }" class="carousel-item ">
              <img class="d-block w-100 nasa-mars-photos__image" :src="photo.img_src" alt="mars rover photo">
              <div class="carousel-caption d-none d-md-block">
                <h5>
                  {{ photo.camera.full_name }}
                  <a class="nasa-mars-photos__image-link" :href="photo.img_src" target="_blank">
                    <FontAwesomeIcon :icon="['fas', 'arrow-up-right-from-square']" />
                  </a>
                </h5>
              </div>
            </div>
          </template>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true" />
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true" />
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- end carousel -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { uniqBy } from 'lodash'
  import { onMounted, reactive } from 'vue'

  type Photo = {
    camera: Camera,
    earth_date: string,
    id: number,
    img_src: string,
    rover: Rover,
    sol: number,
  }

  type Camera = {
    id: number,
    name: string,
    rover_id: number,
    full_name: string,
  }

  type Rover = {
    id: number,
    landing_date: string,
    launch_date: string,
    name: string,
    status: string,
  }

  const photos: Photo[] = reactive([])

  const CURRENT_SOL_DATE = 3562
  const randomSol = Math.floor(Math.random() * CURRENT_SOL_DATE)

  // in production, this would be saved as an environment variable or by some other secure means
  const API_KEY = 'igjq0Rthgv3rczb4lQWKfISttQh55qmSbB8v6xRt'

  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomSol}&api_key=${API_KEY}&page=1`

  onMounted(async () => {
    const response = await fetch(url)
    const data = await response.json()

    // this API endpoint includes many redundant photos. we only want to display unique photos based on the rover camera name
    const uniquePhotos = uniqBy(data.photos as Photo[], 'camera.name')
    photos.push(...uniquePhotos)
    console.log(photos)
  })
</script>

<style lang="scss">
.nasa-mars-photos {
  padding: 24px 12px;
}

.nasa-mars-photos__nasa-logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
}

.nasa-mars-photos__title {
  margin-top: 0;
  text-align: center;
}

.nasa-mars-photos__sol {
  padding: 0.5rem;
  font-size: 1.25rem;
  text-align: center;
}

.nasa-mars-photos__info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 24px;
}

.nasa-mars-photos__image-link {
  padding-left: 0.5rem;
  color: black;

  &:hover {
    color: white;
  }
}

.carousel {
  width: 100%;
}

.carousel-caption {
  bottom: 40px;
  height: 4rem;
  color: black;
  background: rgba(255, 255, 255, 0.75);
}
</style>