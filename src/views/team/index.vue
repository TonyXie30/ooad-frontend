<template>
  <div class="team-container">
    <div class="upper-container">
      <div class="col-intro-container">
        <h2 class="title">Team Module</h2>
        <div class="content">
          <ul>
            <li>Search and join teams.</li>
            <li>View your team information.</li>
            <li>Manage your team members if you are a leader.</li>
          </ul>
        </div>
      </div>
      <div class="col-img-container">
        <img src="/team.png" alt="Team Collaboration Image">
      </div>
    </div>
    <div class="bottom-container">
      <router-link to="/team/join-team">
        <el-button class="line-button">Join Team</el-button>
      </router-link>
      <router-link to="/team/view-my-team">
        <el-button class="line-button">View My Team</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamPage'
  // Other options and methods...
}
</script>

<style scoped>
.team-container {
  width: 100%;
  height: 93vh; /* Use 100% of the viewport height */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #CAFFFF;
  padding: 3rem;
}

.upper-container {
  flex: 1; /* Takes the remaining space minus the space taken by buttons */
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem; /* Space between upper and bottom parts */
}

.col-intro-container {
  width: 50%; /* Adjusted to provide space for the image */
}

.col-intro-container .title {
  font-family: "JetBrains Mono ExtraBold", emoji;
  color: #833600;
  font-size: 60px;
  margin-bottom: 10px;
}

.col-intro-container .content {
  font-family: -apple-system,system-ui;
  font-size: 28px;
  color: #833600;
  text-align: left;
  line-height: 90px;
  margin-top: 130px;
}

.col-intro-container .content ul {
  list-style: none; /* Removes bullet points */
  padding: 0; /* Resets default padding */
  margin: 0; /* Resets default margin */
}

.col-img-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-img-container img {
  max-width: 100%;
  height: auto;
}

.bottom-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.line-button {
  font-size: 20px;
  background-color: #CAFFFF;
  color: #833600;
  border-color: #833600;
  margin: 0 1rem; /* Adds space between buttons */
}

.line-button:hover {
  background-color: #833600;
  color: #CAFFFF;
}
</style>
