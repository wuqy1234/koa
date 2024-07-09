#### 文件夹使用中文名字，在docker中会报错吗?

在Docker中使用中文命名的文件夹作为数据卷（volume）挂载时，可能会遇到一些问题，这主要取决于几个因素：

1. **操作系统**: 如果你的Docker守护进程运行在Linux上，通常对于UTF-8编码的文件系统来说，中文文件名应该不会引起问题。但是，如果文件系统不是UTF-8编码的，或者有其他字符集限制，可能会出现乱码或无法识别的情况。
2. **Docker版本**: Docker的不同版本可能对非ASCII字符的支持程度不同。较新的Docker版本通常对Unicode字符有更好的支持。
3. **挂载方式**: 使用`--mount`类型选项或`-v`参数挂载数据卷时，如果路径包含中文字符，确保路径正确转义或使用双引号包围。
4. **容器内的应用**: 容器内的应用程序如何处理文件名也会影响结果。有些应用可能不完全支持非ASCII字符。
5. **文件系统类型**: 某些文件系统（如ext4）对Unicode字符支持较好，而其他文件系统（如FAT32）则不支持长文件名或非ASCII字符。

如果你在尝试挂载中文命名的文件夹时遇到问题，可以尝试以下步骤来解决：

- 确保你的主机文件系统支持UTF-8编码。
- 使用双引号包围包含空格或特殊字符的路径。
- 验证Docker守护进程使用的文件系统类型和编码。
- 更新Docker到最新版本。
- 检查容器内的应用程序是否能正确处理非ASCII字符。

例如，正确的挂载命令可能看起来像这样：

```javascript
docker run -d --name some-container -v "/path/到/中文文件夹:/container/path" some-image
```

注意路径中的中文字符需要被正确地表示，并且路径被双引号包围。如果仍然遇到问题，考虑将文件夹重命名为英文或其他ASCII字符组成的名称。



运行一个MySQL镜像

```sh
docker run -d --name my_mysql -p 3306:3306 --network my_network -e TZ=Asia/Shanghai 
-e MYSQL_ROOT_PASSWORD=12345 mysql 
```

容器名字是my_mysql ，镜像的名字是mysql。



构建容器

```sh
docker build -t my_name .
```



构建网络

```sh
docker network create my_network
```

加入网络

```sh
docker network connet my_network my_container_name
```

删除网络

```javascript
docker network rm my_network
```



Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。下面是一些常用的 Docker 指令：

### 基本操作

- **`docker --help`**
  - 显示 Docker 命令的帮助信息。
- **`docker info`**
  - 显示 Docker 系统的信息，包括版本和存储驱动等。
- **`docker version`**
  - 显示 Docker 的版本信息。

### 镜像操作

- **`docker images`** 或 **`docker image ls`**
  - 列出本地的 Docker 镜像。
- **`docker pull <image>`**
  - 从 Docker Hub 或其他注册表下载镜像。
- **`docker build -t <tag> .`**
  - 使用当前目录下的 Dockerfile 构建镜像，并给镜像打上标签。
- **`docker push <image>`**
  - 将本地镜像推送到 Docker Hub 或其他注册表。
- **`docker rmi <image>`**
  - 删除本地的一个或多个镜像。

### 容器操作

- **`docker container ls`** 或 **`docker ps`**
  - 列出所有正在运行的容器。
- **`docker container ls -a`** 或 **`docker ps -a`**
  - 列出所有容器，包括停止的。
- **`docker run <image>`**
  - 创建并运行一个新的容器。
- **`docker create <image>`**
  - 创建一个新的容器但不启动它。
- **`docker start <container>`**
  - 启动一个已停止的容器。
- **`docker stop <container>`**
  - 停止一个正在运行的容器。
- **`docker restart <container>`**
  - 重启一个容器。
- **`docker exec -it <container> /bin/bash`**
  - 登录到一个正在运行的容器内。
- **`docker rm <container>`**
  - 删除一个或多个容器。
- **`docker logs <container>`**
  - 查看容器的日志输出。

### 网络操作

- **`docker network ls`**
  - 列出所有的网络。
- **`docker network create <network>`**
  - 创建一个网络。
- **`docker network connect <network> <container>`**
  - 将容器连接到网络。
- **`docker network disconnect <network> <container>`**
  - 将容器从网络断开。

### 服务操作

- **`docker service ls`**
  - 列出所有服务。
- **`docker service create`**
  - 创建一个新的服务。
- **`docker service scale`**
  - 调整服务的副本数量。

### 其他

- `docker system prune`
  - 清理系统，删除未使用的容器、网络、数据卷和镜像。

这些命令覆盖了 Docker 的基本操作，但 Docker 提供了更多高级功能和选项，具体可以通过 `docker COMMAND --help` 来查看每个命令的详细用法。