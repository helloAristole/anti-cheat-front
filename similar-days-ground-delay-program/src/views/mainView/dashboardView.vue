<template>
    <el-container>
        <el-header class="header-container header-title highlighted-header">相似日与地面等待策略预测
            <!-- <div class="header-title highlighted-header">相似日与地面等待策略预测</div> -->
            <el-dropdown trigger="click" @command="handleUserMenuClick" class="user-dropdown" >
                <span class="el-dropdown-link">
                    {{ currentUser }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside width="300px">
                <el-menu router :default-active="$route.path">
                    <!-- 流量统计直接作为一级菜单项 -->
                    <el-menu-item index="/meteorological-analysis">流量统计</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">相似日选择</template>
                        <el-menu-item-group title="模块">
                            <el-menu-item index="/meteorological-analysis">气象报文分析</el-menu-item>
                            <el-menu-item index="/similar-day-judgment">相似日判断</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">

                        <template slot="title">地面等待发生概率预测</template>
                        <el-menu-item-group title="模块">
                            <el-menu-item index="/probability-prediction">概率预测</el-menu-item>
                            <el-menu-item index="/shap-analysis">SHAP分析</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">

                        <template slot="title">地面等待措施对航班运行影响</template>
                        <el-menu-item-group title="模块">
                            <el-menu-item index="/departure-delay-prediction">离港航班延误时间预测</el-menu-item>
                            <el-menu-item index="/ground-wait-duration-prediction">地面等待持续时间预测</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'YourComponentName',
    data() {
        return {
            currentUser: 'admain' // 实际情况下，应从Vuex或其他状态管理中获取
        };
    },
    methods: {
        handleUserMenuClick(command) {
            if (command === 'logout') {
                // 退出登录的逻辑，如调用Vuex action
            } else if (command === 'changePassword') {
                // 修改密码的逻辑
            }
        }
    }
};
</script>

<style scoped>
/* 更新样式以确保页面高度充满屏幕 */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.el-container {
    height: 100%;
}

.el-header {
    background-color: #88b8f7;
    text-align: center;
    /* 保证高度足以让文本居中，您可以根据实际字体大小调整此值 */
    height: 80px;
    /* 使文本垂直居中 */
    display: flex;
    align-items: center;
    justify-content: center;

}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* 为了适应高度变化，移除固定行高 */
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* 让主内容区填充剩余空间 */
    flex-grow: 1;
}

/* 移除之前影响布局的特定样式 */
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside,
.el-container:nth-child(7) .el-aside {
    line-height: initial;
}

.highlighted-header {
    font-size: 28px;
    /* 增大字体大小 */
    font-weight: bold;
    /* 加粗字体 */
    color: #333;
    /* 更改字体颜色，根据背景选择对比度高的颜色 */
    /* 可选：添加背景色或悬停效果等其他样式 */
    /* background-color: #f1f1f1; */
    /* transition: background-color 0.3s ease; */
    /* &:hover {
        background-color: #ddd;
    } */
}

.header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
}

.header-title {
    display: inline-block;
    text-align: right; /* 修改为right以使标题居右 */
    font-size: 28px;
    font-weight: bold;
    color: #333;
}

.user-dropdown {

    background-color: transparent;
    margin-left: 400px; /* 保持这一行，用于将按钮推到右侧 */


}
.el-dropdown-link {
    font-size: 18px; /* 或者您希望的其他字体大小 */
    /* 可以根据需要调整行高以保持良好的视觉效果 */
    line-height: 1.5;
    background-color: transparent;
}


/* 二级菜单项的字体样式 */
.el-submenu .el-menu-item {
    font-size: 14px; /* 或您想要的大小 */
    font-weight: bold; /* 可选：加粗以突出显示 */
}



</style>
