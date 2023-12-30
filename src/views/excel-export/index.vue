<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <el-button :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
    </div>
  </div>
</template>

<script>
import { exportExcel } from '@/api/export-excel'
import FilenameOption from '@/views/excel/components/FilenameOption.vue'
export default {
  name: 'ExportExcel',
  components: { FilenameOption },
  data() {
    return {
      downloadLoading: false,
      filename: ''
    }
  },
  methods: {
    async handleDownload() {
      this.downloadLoading = true
      try {
        const response = await exportExcel(this.filename)
        // Check if the response is indeed a Blob
        if (response instanceof Blob) {
          const url = window.URL.createObjectURL(response)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', this.filename || 'exported_file.xlsx') // Provide a default filename if necessary
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url) // Clean up the URL object
        } else {
          console.error('Expected a Blob, but received:', response)
        }
      } catch (error) {
        console.error('Error during file download:', error)
      } finally {
        this.downloadLoading = false
      }
    }

  }
}
</script>
