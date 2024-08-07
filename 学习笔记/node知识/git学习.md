### 版本回退


> ```sh
> git reset --hard [commit id] 
> git checkout [commit id] 
> ```
>
> 这两条指令有什么区别吗?

`git reset --hard [commit_id]` 和 `git checkout [commit_id]` 都可以用来将你的工作目录和暂存区回退到指定的提交状态，但是它们在操作上有一些关键的区别：

#### git reset --hard [commit_id]

- **影响工作目录和暂存区**：这个命令会将你的工作目录和暂存区的内容重置到指定的提交状态。
- **丢失未提交的更改**：如果你的工作目录中有未提交的更改，这些更改会被丢弃。
- **不改变HEAD指向**：除非你指定了一个不同的分支或提交ID，否则HEAD仍然指向当前分支的最新提交。
- **通常用于同一个分支**：这个命令通常用于回退当前分支的历史记录。

#### git checkout [commit_id]

- **创建一个新的临时分支**：当你使用`git checkout`检查一个特定的提交时，Git会创建一个临时的“分离的HEAD”状态或者一个新的分支（如果提供了`-b`选项）。
- **不丢失未提交的更改**：在执行`git checkout [commit_id]`之前，如果工作目录中有未提交的更改，Git会提示你保存或放弃更改，因为这会创建一个新的分支或分离的HEAD。
- **改变HEAD指向**：HEAD现在指向你所检查的提交。
- **可用于任何提交**：你可以使用这个命令来检查任何提交，无论它是否在当前分支上。

#### 总结

- `git reset --hard` 更像是在一个分支内部进行历史回退。
- `git checkout` 则更像是在分支之间切换，或者创建一个新分支并将其初始化到特定提交的状态。

在使用这些命令时要小心，尤其是`git reset --hard`，因为它会永久地删除未提交的更改。如果你不确定，最好先保存或提交你的工作。







### 创建分支、合并分支

> git中怎么设置分支，怎么合并分支?

在Git中，创建和管理分支是一项非常常见的操作。下面是如何创建和合并分支的基本步骤：

#### 创建分支

1. **查看现有分支**：

```bash
git branch
```

这将列出所有本地分支，当前所在的分支会用星号(*)标记。

1. **创建新分支**：

```bash
git branch <branch-name>
```

或者，如果你想在创建分支的同时立即切换到新分支，可以使用：

```bash
git checkout -b <branch-name>  //-b为branch的缩写
```

1. **切换分支**： 如果你已经创建了分支但尚未切换，可以使用：

```bash
git checkout <branch-name>
```

#### 合并分支

1. **切换到目标分支**： 假设你想将`feature`分支合并到`main`分支，首先切换到`main`分支：

```bash
git checkout main
```

1. **合并分支**： 使用`git merge`命令将`feature`分支合并到当前分支：

```bash
git merge feature
```

如果在合并过程中有冲突，Git会停止并让你解决冲突。解决冲突后，你需要添加解决冲突后的文件，并再次提交：

```bash   
git add <conflicted-file>
   git commit
```

1. **推送更改**： 将合并后的更改推送到远程仓库：

```bash
git push origin main
```

### 解决合并冲突

- 当两个分支修改了同一文件的同一部分时，Git不能自动合并，你需要手动解决冲突。
- Git会标记出冲突的位置，你可以在文本编辑器中看到冲突标记，例如：

```
diff  <<<<<<< HEAD
  your changes here...
  =======
  other branch changes here...
  >>>>>>> feature
```

- 编辑文件，移除冲突标记，并保留你想要的版本。
- 使用`git add`将解决冲突的文件添加到暂存区。
- 使用`git commit`提交解决冲突后的文件。

以上就是创建和合并分支的基本流程。在实际开发中，可能还会涉及到一些更复杂的场景，比如重新基底（rebase）、拉取（pull）最新的更改等。





----

```javascript
fatal: The current branch main has no upstream branch. To push the current branch and set the remote as upstream, use

git push --set-upstream koa main
To have this happen automatically for branches without a tracking upstream, see 'push.autoSetupRemote' in 'git help config'. 这个提示是什么情况?
```

### 设置上游分支

这个错误信息表明你在尝试推送（`git push`）当前分支`main`到远程仓库时，本地的`main`分支并没有与远程的一个特定分支建立关联，也就是没有所谓的“上游分支”（upstream branch）。在Git中，上游分支是指定的远程分支，当你执行`git pull`或`git push`时，Git会默认与之交互。

错误信息提供了两个解决方案：

1. **手动设置上游分支**: 使用`git push --set-upstream <remote-name> <branch-name>`命令，其中`<remote-name>`是你想要推送的远程仓库的名字（通常是`origin`），`<branch-name>`是本地分支的名字。在这个例子中，你应该运行：

   ```
   bash
   
   git push --set-upstream koa main
   ```

   这将会把`main`分支推送到名为`koa`的远程仓库，并且设置`main`分支的上游分支为`koa/main`。

2. **自动设置上游分支**: Git允许你配置`push.autoSetupRemote`选项，当推送一个没有上游分支的本地分支时，Git会自动创建一个与之对应的远程分支，并设置本地分支的上游。要启用此功能，你可以运行：

   ```
   bash
   
   git config push.autoSetupRemote true
   ```

   然后再次尝试`git push`，Git会自动为你设置上游分支。

通常情况下，推荐首先手动设置上游分支，以确保你清楚地知道本地分支与远程分支之间的关系。一旦你设置了上游分支，之后的`git push`命令就可以直接使用，而不需要再次指定`--set-upstream`参数。





### ==git add 的过程中怎么过滤掉node_modules文件?==

当你使用 `git add` 命令来添加文件到 Git 的暂存区时，如果想避免将 `node_modules` 文件夹添加进去，你可以采取以下几种方法：

**方法 1: 使用 `.gitignore` 文件**

最常用的方法是在项目的根目录下创建或更新 `.gitignore` 文件，然后将 `node_modules` 添加到其中。这样 Git 就会自动忽略这个文件夹。

1. **创建或编辑 `.gitignore` 文件**:

   ```bash
   echo "node_modules/" > .gitignore
   ```

2. **提交 `.gitignore` 文件**:

   ```bash
   git add .gitignore
   git commit -m "Add node_modules to .gitignore"
   ```

3. **推送 `.gitignore` 文件到远程仓库**:

   ```bash
   git push origin main
   ```

**方法 2: 使用 `--exclude` 选项**

如果你已经有一个 `.gitignore` 文件并且 `node_modules` 已经被添加到了版本控制中，你可以使用 `git rm --cached` 命令移除 `node_modules` 文件夹的跟踪状态，然后再执行 `git add` 时使用 `--exclude` 选项来排除 `node_modules`。

1. **移除 `node_modules` 的跟踪状态**:

   ```bash
   git rm --cached -r node_modules
   ```

2. **添加其他文件到暂存区同时排除 `node_modules`**:

   ```bash
   git add --exclude=node_modules .
   ```

**方法 3: 使用 `git add` 的 `-i` 交互式模式**

你还可以使用 `git add -i` 进入交互式模式，手动选择要添加的文件和文件夹。

1. **运行交互式添加**:

   ```bash
   git add -i
   ```

   在交互式模式中，你可以按提示选择文件或文件夹添加到暂存区。

**注意事项**

- 如果 `node_modules` 文件夹已经被添加到了版本控制中，你需要先用 `git rm --cached` 移除它的跟踪状态，然后再更新 `.gitignore` 文件。
- 如果 `node_modules` 文件夹非常大，可能会影响 Git 的性能，所以在大型项目中建议始终将其添加到 `.gitignore` 文件中。

这些方法可以帮助你在 `git add` 的过程中过滤掉 `node_modules` 文件夹。