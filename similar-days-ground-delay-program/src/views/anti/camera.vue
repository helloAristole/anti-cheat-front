<template>
    <div class="camera-component">
      <h2>Camera with Face Detection</h2>
      <div class="video-container">
        <video ref="videoElement" autoplay></video>
      </div>
      <div class="button-container">
        <label for="readPolicy">
          <input 
            type="checkbox" 
            id="readPolicy" 
            v-model="hasReadPolicy" 
          />
          我已阅读考试规范
        </label>
        <button 
          @click="toggleCamera" 
          :disabled="!hasReadPolicy"
        >
          {{ isCameraOn ? '停止录像' : '打开摄像头' }}
        </button>
        <button @click="navigateToExamPage" :disabled="!faceDetected">跳转到考试页面</button>
      </div>
      <div v-if="!isCameraOn" class="message-container">
        <p>摄像头未启动</p>
      </div>
      <div v-if="isCameraOn && !faceDetected" class="message-container">
        <p>未检测到人脸</p>
      </div>
    </div>
  </template>
  
  <script>
  import * as faceapi from 'face-api.js';
  
  export default {
    name: 'CameraWithFaceDetection',
    data() {
      return {
        videoStream: null,
        isCameraOn: false,
        faceDetected: false,
        loading: false,
        hasReadPolicy: false // 记录复选框状态
      };
    },
    async mounted() {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('./models')
        ]);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    },
    watch: {
      // 监听 hasReadPolicy 的变化
      hasReadPolicy(newValue) {
        if (!newValue && this.isCameraOn) {
          this.stopCamera();
        }
      }
    },
    methods: {
      async startCamera() {
        if (!this.hasReadPolicy) {
          console.warn('Please read the policy before starting the camera.');
          return;
        }
  
        try {
          this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.$refs.videoElement.srcObject = this.videoStream;
          this.isCameraOn = true;
          console.log('Camera started successfully');
          // 等待 video 元素准备好后再开始人脸检测
          await new Promise(resolve => this.$refs.videoElement.onloadedmetadata = resolve);
          await this.detectFaces();
        } catch (error) {
          console.error('Error accessing the camera:', error);
          this.isCameraOn = false;
        }
      },
      stopCamera() {
        if (this.videoStream) {
          this.videoStream.getTracks().forEach(track => {
            track.stop();
          });
          this.$refs.videoElement.srcObject = null;
          this.videoStream = null;
          this.isCameraOn = false;
        }
      },
      async detectFaces() {
        if (!this.isCameraOn) return;
  
        this.loading = true;
        const videoElement = this.$refs.videoElement;
        const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        this.loading = false;
  
        if (detections.length > 0) {
          console.log('Face detected!');
          this.faceDetected = true;
        } else {
          console.log('未检测到人脸');
          this.faceDetected = false;
        }
  
        // 使用 requestAnimationFrame 来连续检测人脸
        if (this.isCameraOn) {
          requestAnimationFrame(() => this.detectFaces());
        }
      },
      toggleCamera() {
        if (this.isCameraOn) {
          this.stopCamera();
        } else {
          this.startCamera();
        }
      },
      navigateToExamPage() {
        if (this.faceDetected) {
          console.log('Navigate to exam page');
          this.$router.push('/exam');
        }
      }
    },
    beforeDestroy() {
      this.stopCamera();
    }
  };
  </script>
  
  <style scoped>
  .camera-component {
    max-width: 600px;
    margin: auto;
    text-align: center;
  }
  
  .video-container {
    margin-top: 20px;
  }
  
  .button-container {
    margin-top: 10px;
    display: flex;
    flex-direction: column; /* Changed to column for better spacing */
    gap: 10px;
    align-items: center;
  }
  
  .message-container {
    margin-top: 10px;
    font-size: 18px;
    color: red;
  }
  
  button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
  
  label {
    margin-left: 8px;
    display: flex;
    align-items: center;
  }
  </style>
  