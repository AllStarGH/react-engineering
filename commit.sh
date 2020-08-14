# git config user.name "AllStarGH";
# git config user.email "duernna@163.com";

# git remote add origin https://github.com/AllStarGH/react-engineering.git

# error: 无法拉取，因为您有未合并的文件。(指README.md)
# 提示：请在工作区改正文件，然后酌情使用 'git add/rm <文件>' 命令标记
# 提示：解决方案并提交。
# fatal: 因为存在未解决的冲突而退出。
#
# 解决:
# git add README.md
# git commit -m 'Create README.md'
# git pull origin master
#
# OK.


git status

git add .

git commit -m "经过一番摆弄,已经可以启动运行."

git pull origin master

git push origin master
