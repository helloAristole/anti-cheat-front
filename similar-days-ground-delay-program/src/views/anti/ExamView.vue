<template>
  <div>
    <video ref="videoElement" autoplay></video>
    <canvas ref="canvas" style="display: none;"></canvas>
    <button @click="toggleCamera">{{ isCameraOn ? '关闭摄像头' : '启动摄像头' }}</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ExamPage',
  data() {
    return {
      isCameraOn: false,
      videoStream: null,
      timerId: null, // 用于存储定时器ID
    };
  },
  mounted() {
    this.startCamera();
    this.startScreenshotTimer(); // 启动定时器

    // 添加页面可见性变化的事件监听器
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // 监听鼠标离开屏幕事件
    document.addEventListener('mouseleave', this.handleMouseLeave);
  },
  methods: {
    // 启动摄像头
    async startCamera() {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.videoElement.srcObject = this.videoStream;
        this.isCameraOn = true;
        console.log('Camera started successfully');
      } catch (error) {
        console.error('Error accessing the camera:', error);
        this.isCameraOn = false;
      }
    },
    // 关闭摄像头
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
    // 截图并上传
    async captureAndSubmit() {
      const videoElement = this.$refs.videoElement;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');

      // 设置Canvas尺寸为视频尺寸
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // 在Canvas上绘制当前视频帧
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // 将Canvas内容转换为Base64编码的JPEG格式
      const imageData = canvas.toDataURL('image/jpeg');

      // 将Base64数据转换为Blob对象
      const blob = await this.base64ToBlob(imageData);

      // 创建FormData对象，用于发送文件
      const formData = new FormData();
      formData.append('file', blob, 'screenshot.jpg');

      // 发送POST请求到后端接口
      try {
        const response = await axios.post('/api/upload', formData);
        if (response.status === 200) {
          console.log('截图上传成功:', response.data);
          // 处理成功上传后的逻辑
        } else {
          console.error('截图上传失败:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    // 切换摄像头状态
    toggleCamera() {
      if (this.isCameraOn) {
        this.stopCamera();
      } else {
        this.startCamera();
      }
    },
    // 辅助方法：将Base64数据转换为Blob对象
    base64ToBlob(base64) {
      const parts = base64.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },
    // 启动定时器，每隔一分钟执行一次截图和上传操作
    startScreenshotTimer() {
      this.timerId = setInterval(() => {
        this.captureAndSubmit();
      }, 5000); // 每分钟执行一次
    },
    // 停止定时器
    stopScreenshotTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
    },
    // 处理页面可见性变化的事件
    handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        // 页面隐藏时停止摄像头和定时器，并发出警告
        this.stopCamera();
        this.stopScreenshotTimer();
        alert('警告：您离开了页面！');
      } else {
        // 页面可见时重新启动摄像头和定时器
        this.startCamera();
        this.startScreenshotTimer();
      }
    },
    // 处理鼠标离开屏幕的事件
    handleMouseLeave() {
      if (document.visibilityState === 'visible') {
        // 如果页面可见，但鼠标离开了当前屏幕，发出警告
        alert('警告：鼠标离开了当前屏幕！');
      }
    }
  },
  beforeDestroy() {
    this.stopCamera();
    this.stopScreenshotTimer(); // 清除定时器

    // 移除页面可见性变化的事件监听器
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    // 移除鼠标离开屏幕事件监听器
    document.removeEventListener('mouseleave', this.handleMouseLeave);
  }
};
</script>

<style scoped>
/* 可选的样式 */
</style>
