<template>
  <el-form ref="createTeamForm" class="el-form" :model="form" label-width="120px">
    <el-form-item label="Team Name:">
      <el-input v-model="form.teamName" />
    </el-form-item>

    <el-form-item label="Number of Members:" style="white-space: nowrap">
      <el-input-number v-model="form.members" class="el-input-number" :min="1" :max="4" />
    </el-form-item>

    <el-form-item label="Team Gender:">
      <el-select v-model="form.gender" class="el-select" placeholder="Select">
        <el-option label="Male Only" value="male" />
        <el-option label="Female Only" value="female" />
        <el-option label="Non-Binary" value="non-binary" />
      </el-select>
    </el-form-item>

    <el-form-item label="Description:">
      <el-input
        v-model="form.description"
        class="el-input"
        type="textarea"
        :rows="4"
        placeholder="A brief description of your team..."
      />
    </el-form-item>

    <el-form-item>
      <el-button class="el-button" type="primary" @click="onSubmit">Create Team</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CreateTeam',
  data() {
    return {
      form: {
        teamName: '',
        members: 1,
        gender: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit() {
      // Here you would implement the logic to handle form submission
      console.log('Form submitted:', this.form)
      // You might want to call a backend API to create the team with this data
    }
  }
}
</script>

<!-- Add your styles here -->
<style scoped>
.el-form {
  width: 600px;
  margin: 200px auto; /* Centers the form in the page with margin top and bottom */
  text-align: left;
}

.el-input {
  width: 80%;
  margin-left: 40px;
}

.el-input-number {
  width: 25%; /* Ensures the number input spans the full width */
  margin-left: 40px;
}

.el-select {
  width: 27%; /* Ensures the select input spans the full width */
  margin-left: 40px;
}

.el-button {
  margin-left: 40px;
}
</style>
