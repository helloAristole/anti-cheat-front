<template>
    <div class="login-page">
        <h1 class="login-title">机场相似日选择与地面等待预测系统 V1.0</h1>

        <div class="login-form">
            <el-input placeholder="请输人账号" v-model="username"></el-input>
            <el-input placeholder="请输人密码" v-model="password" type="password"></el-input>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
        <!-- 将这一行移到下方，并设置相应的样式 -->
        <h2 class="institution-title">南京航空航天大学 民航学院</h2>
    </div>

</template>

<script>
// 引入axios
import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },

    methods: {
        async login() {
            try {
                // 发送登录请求
                const response = await axios.post('/api/login', {
                    username: this.username,
                    password: this.password
                });

                if (response.data.code === 1) {
                    // 登录成功的处理逻辑，比如保存token，跳转页面等
                    console.log('登录成功', response.data);
                    this.$router.push('/dashboard'); // 跳转到'/dashboard'页面
                } else if (response.data.code === 0) {
                    console.error('登录失败，后端返回失败状态');
                    alert('登录失败，请检查用户名和密码！');
                } else {
                    console.warn('未预期的后端返回码：', response.data.code);
                    alert('登录过程中遇到未知错误！');
                }
            } catch (error) {
                // 这里可以进一步区分错误类型，比如网络错误、后端抛出的特定异常等
                if (error.response && error.response.status === 404) {
                    console.error('用户不存在或查询错误', error.response);
                    alert('用户不存在，请检查用户名！');
                } else {
                    console.error('登录请求发生错误：', error);
                    alert('登录请求失败，请稍后再试！');
                }
            }
        }
    }
};
</script>

<style scoped>
.login-page {
    position: relative;
    /* 使login-page成为relative定位，以便子元素可以absolute定位 */
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #333;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}

button {
    cursor: pointer;
}

.login-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    /* 背景图片设置 */
    background-image: url('D:\code\Vue_Project\similar-days-ground-delay-program\src\assets\air2.jpg');
    /* 替换为你的图片路径 */
    background-size: cover;
    /* 图片尺寸覆盖整个容器 */
    background-repeat: no-repeat;
    /* 图片不重复 */
    background-position: center center;
    /* 图片位置居中 */
}

.login-title {
    position: absolute;
    /* 使用绝对定位 */
    top: 150px;
    color: #303133;
    /* 文字颜色调整 */
    text-align: center;
    /* 文本居中 */
}

.login-form {
    width: 300px;
    /* 设置表单宽度，根据实际情况调整 */
}

.institution-title {
    position: absolute;
    /* 使用绝对定位 */
    bottom: 50px;
    /* 与底部保持50px距离 */
    text-align: center;
    font-family: "KaiTi", "楷体", serif;
    width: 100%;
    /* 确保标题横跨全宽，可根据需要调整 */
    /* 注意：使用绝对定位后，该元素可能会覆盖其他内容，需谨慎处理 */
}
</style>