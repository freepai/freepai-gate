# Docker要使用的变量
DOCKER_REPO=freepai
APP_NAME=freepai-gate
APP_IMAGE=gate
DOCKER_REVISION=0.1.0

# 本地文件映射目录
LOCAL_DIST_DIR=./dist


.PHONY: init build push run stop

# 初始化应用程序所需的设置
init:
	# 安装依赖
	npm install

	# 构建应用
	npm run build

# 生成Docker镜像
build:
	docker build -t $(DOCKER_REPO)/$(APP_IMAGE):$(DOCKER_REVISION) .

push:
	docker push $(DOCKER_REPO)/$(APP_IMAGE):$(DOCKER_REVISION)

# 运行Docker容器
run:
	docker run -p 8001:80 $(DOCKER_REPO)/$(APP_IMAGE):$(DOCKER_REVISION)

# 停止Docker容器
stop:
	docker container stop $(APP_NAME)
