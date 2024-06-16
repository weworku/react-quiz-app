github pagesへのデプロイ手順
1. `npm run build:gh-pages`
  - github pages向けの環境変数でビルドを実行
  - distフォルダにビルド物を配置
2. `npm run deploy`
  - distフォルダからgithub pagesにデプロイするコマンド、反映に数分かかる
  