#!/bin/bash

   # 设置环境变量
   export LANG=en_US.UTF-8
   export LC_ALL=en_US.UTF-8

   # 打印欢迎信息
   echo "欢迎使用我的Shell脚本！"

   # 提示用户输入名字
   read -p "请输入您的名字: " username

   # 向用户问好
   echo "你好, $username! 很高兴见到你。"

   # 让脚本暂停，等待用户按键
   read -p "按任意键继续..." key
   