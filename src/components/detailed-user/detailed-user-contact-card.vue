<template>
  <v-card height="100%">
    <v-card-title class="pb-0">
      Contact Info
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="item in contactDetailsMap"
          :key="item.label"
          class="align-start">
          <v-icon
            class="mr-2 mt-2"
            color="primary">
            {{item.icon}}
          </v-icon>
          <v-list-item-content>
            <b>{{item.label}}</b>
            <div>
              <a
                v-if="item.link"
                class="text-decoration-none"
                :href="item.link"
                :target="item.target ? item.target : ''">
                <span>
                  {{item.value.toLowerCase()}}
                </span>
                <v-icon
                  v-if="item.target"
                  x-small
                  color="primary">
                  mdi-open-in-new
                </v-icon>
              </a>
              <span v-else>
                {{item.value}}
              </span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    detailedUser: {
      type: Object,
      required: true,
    }
  },

  computed: {
    contactDetailsMap() {
      return [
        {
          label: 'Username',
          value: this.detailedUser.username,
          icon: 'mdi-account-circle-outline'
        },
        {
          label: 'Email',
          value: this.detailedUser.email,
          link: `mailto:${this.detailedUser.email}`,
          icon: 'mdi-email-outline',
        },
        {
          label: 'Phone',
          value: this.detailedUser.phone,
          link: `tel:${this.detailedUser.phone}`,
          icon: 'mdi-phone-outline',
        },
        {
          label: 'Website',
          value: this.detailedUser.website,
          link: `http://${this.detailedUser.website}`,
          target: '_blank',
          icon: 'mdi-web',
        }
      ]
    }
  }
}
</script>

