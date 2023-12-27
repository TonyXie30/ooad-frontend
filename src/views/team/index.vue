<template>
  <div class="team-page">
    <!-- Introduction Section -->
    <div class="introduction">
      <h2 class="title">Welcome to the Team Module!</h2>
      <div class="content">
        <p>In this module, you can:</p>
        <ul>
          <li>Search for teams and join one of them if you want.</li>
          <li>View your team information.</li>
          <li>Manage your team members if you are a leader.</li>
        </ul>
      </div>
    </div>

    <!-- Button Section -->
    <div class="flex-container">
      <router-link to="/team/join-team">
        <el-button class="button">Join Team</el-button>
      </router-link>
      <router-link to="/team/view-my-team">
        <el-button class="button">View My Team</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamPage',
  methods: {
  }
}
</script>

<style scoped>
.team-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.introduction .title {
  font-family: Algerian,fantasy;
  font-size: 30px;
  margin-bottom: 10px;
}

.introduction .content {
  font-family: Algerian,serif;
  font-size: 25px;
  text-align: left;
  max-width: 800px;
  line-height: 60px;
}

.flex-container {
  display: flex;
  justify-content: space-around;
  width: 60%;
  .button {
    font-family: 'Your Font Family', sans-serif; /* Match the font family of your page */
    font-weight: bold; /* Assuming the font on your page is bold */
    font-size: 20px;
    color: white; /* A color that contrasts well with your button background */
    background-color: #7d7d7f; /* A yellow shade that matches your design */
    border-radius: 10px; /* Adjust as per your design preference */
    border: none; /* Assuming you want a flat design without borders */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow for depth */
    transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transition for hover effects */
    margin-top: 30px;
  }

  el-button:hover {
    background-color: #4d4d4d; /* A slightly lighter shade for the hover state */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Optional: more pronounced shadow on hover */
  }
}

</style>
