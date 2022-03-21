# https://github.com/yx-chill/song.git
# git@github.com:yx-chill/song.git
#!/usr/bin/env sh

# 當發生錯誤時中止腳本
set -e

# 打包
npm run build

# cd 到打包输出的目錄下 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/yx-chill/song.git master:gh-pages

cd -
